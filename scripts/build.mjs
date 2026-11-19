#!/usr/bin/env node
/* =====================================================
   Builds the publishable site into _site/.

   Source of truth:
     content/works/<id>.json   one painting each (edited in the panel at /head-of-art)
     content/settings.json     starting prices, "more paintings coming" switch
     images/                   full-size photos

   What it does:
     1. checks every painting and stops with a clear message on mistakes
     2. copies the site, fixes oversized or geotagged photos, makes thumbnails
     3. writes _site/works.js in the shape site.js reads
     4. stamps ?v=<version> on the CSS and JS links so browsers reload them

   Needs Node 18+ and ImageMagick (magick, or convert/identify).
   Usage: node scripts/build.mjs [--out _site]
   ===================================================== */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.resolve(ROOT, argValue('--out') || '_site');

const FULL_MAX = 2000;      // long edge of a re-encoded full-size photo
const FULL_LIMIT = 2400;    // photos at or under this are published untouched
const THUMB_MAX = 1100;     // long edge of a gallery thumbnail
const ROOMS = ['sea', 'reef', 'violet', 'dusk', 'ink', 'ember'];
const STATUSES = ['available', 'sold'];
const TIERS = ['small', 'medium', 'large'];
const LOCALES = ['en', 'pl'];
const TEXT_FIELDS = ['title', 'medium', 'desc', 'alt'];
// Copied to _site as they are. Everything else (content/, scripts/, .github/ …) stays out.
const SITE_FILES = /\.(html|css)$|^site\.js$|^CNAME$/;
const SITE_DIRS = ['images', 'head-of-art'];

function argValue(name) {
  const i = process.argv.indexOf(name);
  return i > -1 ? process.argv[i + 1] : null;
}

/* ---------- ImageMagick ---------- */
const IM = (() => {
  try { execFileSync('magick', ['-version'], { stdio: 'ignore' }); return { convert: ['magick'], identify: ['magick', 'identify'] }; }
  catch { return { convert: ['convert'], identify: ['identify'] }; }
})();
const run = (cmd, args) => execFileSync(cmd[0], [...cmd.slice(1), ...args], { encoding: 'utf8' });
const inspect = file => {
  const [w, h, orientation, ...exif] = run(IM.identify, ['-quiet', '-format', '%w|%h|%[orientation]|%[EXIF:*]', `${file}[0]`]).split('|');
  return { w: Number(w), h: Number(h), gps: /exif:GPS(Latitude|Longitude)=/i.test(exif.join('|')), rotated: !['', 'Undefined', 'TopLeft'].includes(orientation.trim()) };
};

/* ---------- read content ---------- */
const problems = [];
const problem = (where, message) => problems.push(`${where}: ${message}`);
const readJson = file => {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (error) { problem(path.relative(ROOT, file), `not valid JSON (${error.message})`); return null; }
};

const settings = readJson(path.join(ROOT, 'content/settings.json')) || {};
const priceFrom = settings.price_from || {};
for (const tier of TIERS) {
  if (!Number.isFinite(priceFrom[tier])) problem('content/settings.json', `starting price "${tier}" must be a number`);
}

const worksDir = path.join(ROOT, 'content/works');
const entries = fs.readdirSync(worksDir).filter(name => name.endsWith('.json')).sort().map(name => {
  const id = name.replace(/\.json$/, '');
  return { id, file: `content/works/${name}`, data: readJson(path.join(worksDir, name)) };
}).filter(entry => entry.data);

const clean = value => (typeof value === 'string' ? value.trim() : value);
const localPath = src => clean(src || '').replace(/^\/+/, '');   // the panel saves "/images/x.jpg"

const works = entries.map(({ id, file, data }) => {
  const en = data.en || {};
  const pl = data.pl || {};
  // Shared (untranslated) fields live with the default language; also accept them at the top level or in pl.
  const shared = key => clean(en[key] ?? data[key] ?? pl[key]);
  const where = `${file} (${clean(en.title) || id})`;

  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) problem(where, 'file name must be lowercase words joined by dashes');
  if (shared('id') && shared('id') !== id) problem(where, `the "id" field says "${shared('id')}" but the file is named "${id}.json"; they must match`);

  const status = shared('status');
  if (!STATUSES.includes(status)) problem(where, `status must be "available" or "sold", not "${status ?? ''}"`);
  const room = shared('room') || 'ink';
  if (!ROOMS.includes(room)) problem(where, `wall colour must be one of ${ROOMS.join(', ')}`);

  for (const locale of LOCALES) {
    const text = data[locale] || {};
    for (const field of TEXT_FIELDS) {
      if (!clean(text[field])) problem(where, `${field} is missing in ${locale === 'en' ? 'English' : 'Polish'}`);
    }
  }

  // Price: "none" → empty (site shows "Price on request" for available work); a tier; or fixed text per language.
  let price = '';
  const priceType = shared('price_type') || 'none';
  if (priceType === 'tier') {
    const tier = shared('price_tier');
    if (!TIERS.includes(tier)) problem(where, `price tier must be one of ${TIERS.join(', ')}`);
    price = { tier };
  } else if (priceType === 'label') {
    const label = { en: clean(en.price_label) || '', pl: clean(pl.price_label) || '' };
    if (!label.en || !label.pl) problem(where, 'a fixed price needs its text in both English and Polish');
    price = { label };
  } else if (priceType !== 'none') {
    problem(where, `price type must be none, tier or label, not "${priceType}"`);
  }

  const img = localPath(shared('img'));
  if (!img) problem(where, 'main photo is missing');
  const enPhotos = Array.isArray(en.photos) ? en.photos : [];
  const plPhotos = Array.isArray(pl.photos) ? pl.photos : [];
  const photos = enPhotos.map((photo, i) => {
    const src = localPath(photo.src || plPhotos[i]?.src);
    const alt = { en: clean(photo.alt) || '', pl: clean(plPhotos[i]?.alt) || '' };
    if (!src) problem(where, `extra photo ${i + 1} has no image`);
    if (!alt.en || !alt.pl) problem(where, `extra photo ${i + 1} needs a description in both languages`);
    return { src, alt };
  });
  for (const src of [img, ...photos.map(p => p.src)].filter(Boolean)) {
    if (!fs.existsSync(path.join(ROOT, src))) problem(where, `photo ${src} does not exist`);
  }

  const number = key => {
    const value = shared(key);
    if (value === undefined || value === null || value === '') return undefined;
    const n = Number(value);
    if (!Number.isFinite(n)) problem(where, `${key} must be a number`);
    return n;
  };

  return {
    order: number('order') ?? 9999,
    id, img, photos, room, status, price,
    focus: shared('focus') || undefined,
    zoom: number('zoom'),
    crop: number('crop'),
    origin: shared('origin') || undefined,
    size: shared('size') || '',
    year: shared('year') === undefined || shared('year') === null ? '' : String(shared('year')),
    commission: Boolean(shared('commission')),
    text: Object.fromEntries(LOCALES.map(locale => [locale, Object.fromEntries(TEXT_FIELDS.map(f => [f, clean(data[locale]?.[f]) || '']))])),
  };
});

/* ---------- About page (content/about.json) ---------- */
const aboutData = readJson(path.join(ROOT, 'content/about.json')) || {};
const about = (() => {
  const where = 'content/about.json (About page)';
  const en = aboutData.en || {};
  const photo = localPath(en.photo ?? aboutData.photo ?? aboutData.pl?.photo);
  if (!photo) problem(where, 'photo is missing');
  else if (!fs.existsSync(path.join(ROOT, photo))) problem(where, `photo ${photo} does not exist`);
  const text = Object.fromEntries(LOCALES.map(locale => {
    const t = aboutData[locale] || {};
    const language = locale === 'en' ? 'English' : 'Polish';
    for (const [field, label] of [['title', 'headline'], ['lead', 'opening line'], ['body', 'text'], ['photo_alt', 'photo description'], ['description', 'search description']]) {
      if (!clean(t[field])) problem(where, `${label} is missing in ${language}`);
    }
    return [locale, {
      title: clean(t.title) || '',
      lead: clean(t.lead) || '',
      // One paragraph per block of text separated by an empty line.
      paragraphs: String(t.body || '').split(/\n\s*\n/).map(p => p.replace(/\s*\n\s*/g, ' ').trim()).filter(Boolean),
      alt: clean(t.photo_alt) || '',
      description: clean(t.description) || '',
    }];
  }));
  return { photo, text };
})();

/* ---------- page texts (content/home.json, gallery.json, …) ---------- */
// Each file holds both languages; every listed text is required in both.
const PAGE_TEXTS = {
  home: { label: 'Homepage', keys: ['hero_kicker', 'hero_title', 'hero_lede', 'statement', 'fact1', 'fact2', 'fact3', 'process_title',
    's1_title', 's1_desc', 's2_title', 's2_desc', 's3_title', 's3_desc', 's4_title', 's4_desc', 's4_note', 's5_title', 's5_desc', 'closing_title'] },
  gallery: { label: 'Gallery page', keys: ['gallery_title', 'gallery_intro', 'band_title', 'band_sub', 'more_coming'] },
  contact: { label: 'Contact page', keys: ['contact_title', 'contact_intro', 'contact_email_copy', 'contact_whatsapp_copy', 'contact_instagram_copy', 'contact_form_copy'] },
  buying: { label: 'Buying and inquiries', keys: ['avail_note', 'delivery_note', 'modal_sub', 'modal_sub_buy'] },
  footer: { label: 'Footer', keys: ['footer_legal', 'privacy_note'] },
};
// Shown as HTML: *stars* in these become the gold accent.
const HTML_KEYS = new Set(['hero_title', 'process_title', 'closing_title', 'gallery_title', 'band_title', 'contact_title']);
const languageName = locale => (locale === 'en' ? 'English' : 'Polish');
const pageText = Object.fromEntries(LOCALES.map(locale => [locale, {}]));
const pageData = {};
for (const [name, { label, keys }] of Object.entries(PAGE_TEXTS)) {
  const file = `content/${name}.json`;
  const data = readJson(path.join(ROOT, file)) || {};
  pageData[name] = data;
  for (const locale of LOCALES) {
    for (const key of keys) {
      const value = clean(data[locale]?.[key]);
      if (!value) problem(`${file} (${label})`, `text “${key}” is missing in ${languageName(locale)}`);
      pageText[locale][key] = value || '';
    }
  }
}

/* ---------- commissions open or closed (content/commissions.json) ---------- */
const commissionsData = readJson(path.join(ROOT, 'content/commissions.json')) || {};
const commissionsOpen = (commissionsData.en?.open ?? commissionsData.open ?? true) !== false;
for (const locale of LOCALES) {
  for (const key of ['open_text', 'closed_text']) {
    if (!clean(commissionsData[locale]?.[key])) problem('content/commissions.json (Commissions)', `the ${key === 'open_text' ? '“open”' : '“closed”'} note is missing in ${languageName(locale)}`);
  }
  pageText[locale].footer_text = clean(commissionsData[locale]?.[commissionsOpen ? 'open_text' : 'closed_text']) || '';
}

/* ---------- contact links (content/settings.json → contact) ---------- */
// The pages are written with these addresses; the build swaps in whatever is set in the panel.
const LINK_TEMPLATES = {
  email: 'mailto:marta@ciesielska.art',
  whatsapp: 'https://wa.me/ciesielska.art',
  instagram: 'https://www.instagram.com/ciesielska.art/',
  pinterest: 'https://pl.pinterest.com/martaciesielskaart/',
};
const links = (() => {
  const where = 'content/settings.json (Contact links)';
  const contact = settings.contact || {};
  const safeUrl = value => /^https:\/\/[^\s'"`<>\\]+$/.test(value) && !value.includes('${');
  const result = {};
  const email = clean(contact.email) || '';
  if (/^[^\s@'"`<>\\]+@[^\s@'"`<>\\]+\.[a-z]{2,}$/i.test(email)) result.email = `mailto:${email}`;
  else problem(where, `“${email}” is not an email address`);
  const whatsapp = clean(contact.whatsapp) || '';
  if (/^\+?[\d\s()-]{7,}$/.test(whatsapp)) result.whatsapp = `https://wa.me/${whatsapp.replace(/\D/g, '')}`;   // phone number → wa.me link
  else if (safeUrl(whatsapp)) result.whatsapp = whatsapp;
  else problem(where, 'WhatsApp must be a phone number with country code (e.g. +48 600 000 000) or an https:// link');
  for (const kind of ['instagram', 'pinterest']) {
    const url = clean(contact[kind]) || '';
    if (safeUrl(url)) result[kind] = url;
    else problem(where, `${kind[0].toUpperCase()}${kind.slice(1)} must be a full https:// link`);
  }
  return result;
})();

const ids = new Set();
for (const work of works) {
  if (ids.has(work.id)) problem(`content/works/${work.id}.json`, 'duplicate id');
  ids.add(work.id);
}

// The three paintings hung on the homepage, in order: hero, second, third.
const homeShared = { ...pageData.home, ...pageData.home?.en };
const featured = ['featured_hero', 'featured_second', 'featured_third'].map(key => clean(homeShared[key]) || '');
if (featured.some(id => !id)) problem('content/home.json (Homepage)', 'choose all three featured paintings');
if (new Set(featured).size !== featured.length) problem('content/home.json (Homepage)', 'each featured painting can be chosen only once');
for (const id of featured) if (id && !ids.has(id)) problem('content/home.json (Homepage)', `featured painting “${id}” does not exist`);

if (problems.length) {
  console.error(`\nThe site was not built. Please fix ${problems.length === 1 ? 'this' : 'these'}:\n`);
  for (const line of problems) console.error(`  • ${line}`);
  console.error('');
  process.exit(1);
}

/* ---------- copy the site ---------- */
const tmp = `${OUT}.tmp-${process.pid}`;   // own folder per run, so two builds at once can't collide
fs.rmSync(tmp, { recursive: true, force: true });
fs.mkdirSync(tmp, { recursive: true });
for (const name of fs.readdirSync(ROOT)) {
  if (SITE_FILES.test(name) && fs.statSync(path.join(ROOT, name)).isFile()) fs.copyFileSync(path.join(ROOT, name), path.join(tmp, name));
}
for (const dir of SITE_DIRS) {
  if (!fs.existsSync(path.join(ROOT, dir))) continue;
  fs.cpSync(path.join(ROOT, dir), path.join(tmp, dir), {
    recursive: true,
    // Thumbnails are always rebuilt below; macOS clutter never ships.
    filter: src => !src.includes(`${path.sep}images${path.sep}sm`) && !src.endsWith('.DS_Store'),
  });
}

/* ---------- photos ---------- */
const sizes = new Map();
function publish(src) {
  if (sizes.has(src)) return sizes.get(src);
  const original = path.join(ROOT, src);
  const target = path.join(tmp, src);
  let info = inspect(original);
  // Oversized, sideways or geotagged photos (typically straight from a phone) are re-encoded;
  // prepared photos are published byte for byte.
  if (info.gps || info.rotated || Math.max(info.w, info.h) > FULL_LIMIT) {
    run(IM.convert, [original, '-auto-orient', '-resize', `${FULL_MAX}x${FULL_MAX}>`, '-colorspace', 'sRGB',
      '-strip', '-interlace', 'Plane', '-quality', '86', target]);
    info = inspect(target);
    console.log(`  resized ${src} → ${info.w}×${info.h}`);
  }
  sizes.set(src, info);
  return info;
}

fs.mkdirSync(path.join(tmp, 'images/sm'), { recursive: true });
const thumbOf = img => `images/sm/${path.basename(img)}`;
for (const work of works) {
  publish(work.img);
  work.photos.forEach(photo => publish(photo.src));
  run(IM.convert, [path.join(tmp, work.img), '-resize', `${THUMB_MAX}x${THUMB_MAX}>`, '-strip', '-interlace', 'Plane', '-quality', '80', path.join(tmp, thumbOf(work.img))]);
}

/* ---------- works.js ---------- */
works.sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
const output = works.map(work => {
  const { w, h } = sizes.get(work.img);
  const entry = { id: work.id, img: work.img, thumb: thumbOf(work.img), w, h };
  if (work.focus) entry.focus = work.focus;
  if (work.zoom !== undefined) entry.zoom = work.zoom;
  if (work.crop !== undefined) entry.crop = work.crop;
  if (work.origin) entry.origin = work.origin;
  if (work.photos.length) {
    entry.photos = work.photos.map(photo => ({ src: photo.src, ...pick(sizes.get(photo.src), 'w', 'h'), alt: photo.alt }));
  }
  Object.assign(entry, { room: work.room, status: work.status, price: work.price, size: work.size, year: work.year });
  if (work.commission) entry.commission = true;
  return Object.assign(entry, work.text);
});
function pick(object, ...keys) { return Object.fromEntries(keys.map(key => [key, object[key]])); }

/* ---------- page texts from content/ ---------- */
const escapeHtml = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const emphasis = s => escapeHtml(s).replace(/\*([^*]+)\*/g, '<em>$1</em>');   // "About *me*" → About <em>me</em>
const aboutPhoto = publish(about.photo);
const paragraphCount = Math.max(...LOCALES.map(locale => about.text[locale].paragraphs.length));
// Merged into the I18N dictionary by site.js, so language switching keeps working.
const siteText = Object.fromEntries(LOCALES.map(locale => {
  const t = about.text[locale];
  const entries = {
    about_title: emphasis(t.title),
    about_lead: t.lead,
    about_photo_alt: t.alt,
    desc_about: t.description,
  };
  // Every language gets the same number of keys; an unused paragraph is empty and hidden by CSS.
  for (let i = 0; i < paragraphCount; i++) entries[`about_p${i + 1}`] = t.paragraphs[i] || '';
  for (const [key, value] of Object.entries(pageText[locale])) entries[key] = HTML_KEYS.has(key) ? emphasis(value) : value;
  return [locale, entries];
}));

fs.writeFileSync(path.join(tmp, 'works.js'), `/* Generated by scripts/build.mjs from content/ — do not edit.
   Change paintings and page texts in the panel at /head-of-art, or in content/. */
window.PRICE_FROM = ${JSON.stringify(pick(priceFrom, ...TIERS))};
window.WORKS = ${JSON.stringify(output, null, 2)};
window.MORE_COMING = ${Boolean(settings.more_coming)};
window.SITE_TEXT = ${JSON.stringify(siteText, null, 2)};
`);

// The About page's own HTML carries the English text too, for search engines and visitors without JavaScript.
{
  const file = path.join(tmp, 'about.html');
  let html = fs.readFileSync(file, 'utf8');
  const en = siteText.en;
  const replace = (pattern, value, label) => {
    if (!pattern.test(html)) throw new Error(`about.html: could not find the ${label}; was the page layout changed?`);
    html = html.replace(pattern, value);
  };
  replace(/(<h1 data-i18n-html="about_title">)[\s\S]*?(<\/h1>)/, `$1${en.about_title}$2`, 'headline');
  replace(/(<p class="about-lead[^"]*" data-i18n="about_lead">)[\s\S]*?(<\/p>)/, `$1${escapeHtml(en.about_lead)}$2`, 'opening line');
  const paragraphs = Array.from({ length: paragraphCount }, (_, i) =>
    `<p class="reveal" data-i18n="about_p${i + 1}">${escapeHtml(en[`about_p${i + 1}`])}</p>\n      `).join('');
  replace(/(?:<p class="reveal" data-i18n="about_p\d+">[\s\S]*?<\/p>\s*)+/, paragraphs, 'text paragraphs');
  replace(/<img src="[^"]*" width="\d+" height="\d+" alt="[^"]*" data-i18n-attr="alt:about_photo_alt"/,
    `<img src="${about.photo}" width="${aboutPhoto.w}" height="${aboutPhoto.h}" alt="${escapeHtml(en.about_photo_alt)}" data-i18n-attr="alt:about_photo_alt"`, 'photo');
  replace(/(<div class="art" style="--ratio:)\d+\/\d+(">\s*<img src="[^"]*" width="\d+" height="\d+" alt="[^"]*" data-i18n-attr="alt:about_photo_alt")/, `$1${aboutPhoto.w}/${aboutPhoto.h}$2`, 'photo frame');
  replace(/(<meta name="description" content=")[^"]*(">)/, `$1${escapeHtml(en.desc_about)}$2`, 'description');
  replace(/(<meta property="og:description" content=")[^"]*(">)/, `$1${escapeHtml(en.desc_about)}$2`, 'link preview description');
  fs.writeFileSync(file, html);
}

/* ---------- homepage: the three featured paintings ---------- */
{
  const file = path.join(tmp, 'index.html');
  let html = fs.readFileSync(file, 'utf8');
  const byId = new Map(output.map(work => [work.id, work]));
  // Slots in page order: the hero, then the two hung paintings below it.
  const slots = [
    ...(html.match(/<section class="hero"[\s\S]*?\n<\/section>/) || []),
    ...(html.match(/<section class="piece[^"]*"[\s\S]*?\n<\/section>/g) || []).slice(0, 2),
  ];
  if (slots.length !== 3) throw new Error('index.html: could not find the three featured painting sections; was the page layout changed?');

  const englishPrice = work => {
    if (typeof work.price === 'object' && work.price?.label) return work.price.label.en;
    if (work.price?.tier) return `From ${priceFrom[work.price.tier]} EUR`;
    return work.status === 'available' ? 'Price on request' : '';
  };
  const setText = (section, id, field, value) => section.replace(
    new RegExp(`(<([a-z0-9]+)\\b[^>]*data-work="${id}" data-field="${field}"[^>]*>)[\\s\\S]*?(</\\2>)`),
    (_, open, __, close) => open + escapeHtml(value) + close);

  slots.forEach((original, i) => {
    const work = byId.get(featured[i]);
    const old = original.match(/data-work="([^"]+)"/)[1];
    let section = original.split(`data-work="${old}"`).join(`data-work="${work.id}"`);
    const available = work.status === 'available';
    section = section
      .replace(/^(<section\b[^>]*\sdata-room=")[^"]*/, `$1${work.room}`)
      .replace(/^<section class="piece piece--(?:portrait|landscape)"/, `<section class="piece piece--${work.w < work.h ? 'portrait' : 'landscape'}"`)
      .replace(/style="--ratio:\d+\/\d+"/, `style="--ratio:${work.w}/${work.h}"`)
      .replace(/<img src="[^"]*" width="\d+" height="\d+" alt="[^"]*"/,
        `<img src="${work.img}" width="${work.w}" height="${work.h}" alt="${escapeHtml(work.en.alt)}"`)
      .replace(/<span class="status(?: is-available)?" data-work=/, `<span class="status${available ? ' is-available' : ''}" data-work=`);
    section = setText(section, work.id, 'title', work.en.title);
    section = setText(section, work.id, 'medium', [work.en.medium, work.size, work.year].filter(Boolean).join(' · '));
    section = setText(section, work.id, 'desc', work.en.desc);
    section = setText(section, work.id, 'status', available ? 'Available' : 'Sold');
    section = setText(section, work.id, 'price', englishPrice(work));
    section = setText(section, work.id, 'action', available ? 'Ask to buy' : 'Commission one like this');
    html = html.replace(original, () => section);
    if (i === 0) {
      // The hero frame is sized from the painting's proportions, and the page opens in its wall colour.
      html = html.replace(/<html\b([^>]*)>/, (_, attrs) => `<html${attrs
        .replace(/\sdata-room="[^"]*"/, ` data-room="${work.room}"`)
        .replace(/\sstyle="[^"]*"/, '')} style="--hero-ratio:${(work.w / work.h).toFixed(4)}">`);
    }
  });
  fs.writeFileSync(file, html);
}

/* ---------- every page: texts, contact links, commissions ---------- */
for (const name of fs.readdirSync(tmp).filter(name => name.endsWith('.html'))) {
  const file = path.join(tmp, name);
  let html = fs.readFileSync(file, 'utf8');
  // The texts also go into the HTML itself, for search engines and visitors without JavaScript,
  // in the language the page declares (<html lang="…">).
  const pageLang = html.match(/<html\b[^>]*\slang="([a-z]+)"/)?.[1];
  for (const [key, value] of Object.entries(siteText[LOCALES.includes(pageLang) ? pageLang : 'en'])) {
    if (key.startsWith('about_') || key === 'desc_about') continue;   // the About page is handled above
    html = html.replace(new RegExp(`(<([a-z][a-z0-9]*)\\b[^>]*\\sdata-i18n(-html)?="${key}"[^>]*>)[\\s\\S]*?(</\\2>)`, 'g'),
      (_, open, __, isHtml, close) => open + (isHtml ? value : escapeHtml(value)) + close);
  }
  for (const [kind, template] of Object.entries(LINK_TEMPLATES)) html = html.split(template).join(escapeHtml(links[kind]));
  html = html.replace(/<html\b([^>]*)>/, (_, attrs) =>
    `<html${attrs.replace(/\sdata-commissions="[^"]*"/, '')}${commissionsOpen ? '' : ' data-commissions="closed"'}>`);
  fs.writeFileSync(file, html);
}
{
  // site.js builds the email and WhatsApp links on the contact page.
  const file = path.join(tmp, 'site.js');
  let js = fs.readFileSync(file, 'utf8');
  for (const [kind, template] of Object.entries(LINK_TEMPLATES)) js = js.split(template).join(links[kind]);
  fs.writeFileSync(file, js);
}

/* ---------- cache busting ---------- */
const version = (() => {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA.slice(0, 7);
  try {
    const sha = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    return `${sha}-${Date.now().toString(36)}`;
  } catch { return Date.now().toString(36); }
})();
for (const name of fs.readdirSync(tmp).filter(name => name.endsWith('.html'))) {
  const file = path.join(tmp, name);
  fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replace(/(\.(?:css|js))\?v=[\w.-]+/g, `$1?v=${version}`));
}

// Swap the finished build into place. If another build swapped in at the same moment, try again; the last one wins.
for (let attempt = 0; ; attempt++) {
  fs.rmSync(OUT, { recursive: true, force: true });
  try { fs.renameSync(tmp, OUT); break; }
  catch (error) {
    if (attempt < 5 && ['ENOTEMPTY', 'EEXIST'].includes(error.code)) continue;
    fs.rmSync(tmp, { recursive: true, force: true });
    throw error;
  }
}
console.log(`Built ${works.length} paintings into ${path.relative(ROOT, OUT) || '.'} (version ${version}).`);
