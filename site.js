/* =====================================================
   Shared script for index.html and gallery.html.
   The paintings themselves live in works.js.
   ===================================================== */

/* =====================================================
   I18N DICTIONARY: edit interface texts here, both languages.
   The English strings are also in the HTML (for crawlers
   and no-JS); keep the two in sync.
   ===================================================== */
const I18N = {
  en: {
    page_title_home: "ciesielska.art | Original paintings, made to order",
    page_title_gallery: "Gallery | ciesielska.art",
    desc_home: "Original paintings in acrylic and watercolor, made to order. No prints, no AI.",
    desc_gallery: "Paintings in acrylic and watercolor: a few for sale, the rest a record of finished work.",
    lang_label_en: "Switch to English",
    lang_label_pl: "Switch to Polish",
    language_group: "Language",
    nav_gallery: "Gallery",
    nav_about: "About",
    nav_contact: "Contact",
    page_title_about: "About | ciesielska.art",
    desc_about: "Marta Ciesielska, painter. A few words about who paints the pictures on ciesielska.art.",
    cta_top: "Commission",
    page_title_contact: "Contact | ciesielska.art",
    desc_contact: "Contact ciesielska.art about paintings, commissions, or a question.",

    hero_kicker: "Acrylic & watercolor, made to order",
    hero_title: 'Your idea, <em>in paint.</em>',
    hero_lede: "Original paintings, made to order. Every piece is a one-off and comes with a certificate of originality.",
    hero_cta1: "Commission a painting",
    hero_cta2: "See the work",
    scroll_hint: "Scroll to step back",

    status_available: "Available",
    status_sold: "Sold",
    dimensions: "Dimensions",
    price_request: "Price on request",
    commission_similar: "Commission one like this",
    ask_to_buy: "Ask to buy",
    buy_ref: "Purchase",
    avail_note: "One of a kind. I'll confirm it's still available when I reply.",
    delivery_note: "Delivery or pickup is arranged individually.",
    look_closer: "Look closer",
    zoom_hint: "Click the painting to zoom",
    close: "Close",
    prev: "Previous painting",
    next: "Next painting",
    photo_count: "Photo",
    photo_prev: "Previous photo",
    photo_next: "Next photo",
    copy_link: "Copy link",
    link_copied: "Link copied",

    band_title: 'Available <em>now</em>',
    band_sub: "Each is one of a kind. Ask about one and I'll confirm it's still available.",
    see_all: "See the whole gallery",

    gallery_title: 'The <em>gallery</em>',
    gallery_intro: "Everything painted so far. Some pieces are for sale, the rest already hang on someone's wall.",
    filter_group: "Filter paintings",
    filter_all: "All",
    filter_available: "Available",
    filter_sold: "Sold",
    filter_commission: "Commissions",
    more_coming: "More paintings are waiting for their photos and will hang here soon.",
    gallery_noscript: "The gallery needs JavaScript to show the paintings.",
    about_title: 'About <em>me</em>',
    about_lead: "I have always liked unique and beautiful things. Paintings fit both.",
    about_p1: "I'm honoured that so many of you like my paintings, too, as I'm often too critical of myself.",
    about_p2: "My name is Marta Ciesielska. I hate bragging or talking about myself, so I promise to keep it short. For my whole life, I have been chasing creative journeys, and my recent love is painting. I'm not the best in the world, but I'm good enough.",
    about_p3: "I'm selling my paintings because I love to paint and want to share these beautiful and unique things. Painting something someone dreams of, so they can hang it on their wall, is one of the best things I've done in my life. Also, my flat is running out of wall space, so I'm glad you like the paintings I've already made!",
    about_photo_alt: "Marta Ciesielska smiling under a rainbow umbrella on a rainy night, one arm raised",

    contact_title: 'Say hello. <em>Let’s talk.</em>',
    contact_intro: "Questions about a painting, a commission, or something else? Choose the way that feels easiest.",
    contact_options: "Contact options",
    contact_reference: "Question about",
    contact_about: "You're asking about",
    contact_email_title: "Email",
    contact_email_copy: "For questions about a painting, its dimensions, or a commission.",
    contact_email_action: "Email",
    contact_whatsapp_title: "WhatsApp",
    contact_whatsapp_copy: "Message me directly. Usually the quickest way to reach me.",
    contact_whatsapp_action: "WhatsApp",
    contact_instagram_title: "Instagram",
    contact_instagram_copy: "See new work and send me a direct message.",
    contact_instagram_action: "Instagram",
    contact_form_title: "Inquiry form",
    contact_form_copy: "Prefer a form? Answer a few questions and I'll write back.",
    contact_see_painting: "See the painting",
    contact_back: "Back to the gallery",

    statement: "Just paint, a brush and a few weeks of patience. Each painting is a one-off, made just for you.",
    fact1: "Painted by hand",
    fact2: "Certificate of originality",
    fact3: "Your subject, size and colors",

    process_title: 'From idea <em>to your wall</em>',
    s1_title: "We talk",
    s1_desc: "Over coffee, Google Meet or WhatsApp. We settle the subject, the size and the colors. We agree on price.",
    s2_title: "I sketch",
    s2_desc: "You get a digital sketch. We adjust it until the composition is right.",
    s3_title: "You book a slot",
    s3_desc: "Once you approve the sketch, a 20% deposit holds your place in the calendar.",
    s4_title: "I paint",
    s4_desc: "A few weeks at the easel. I can send progress photos along the way.",
    s4_note: "No changes once painting starts.",
    s5_title: "It comes home",
    s5_desc: "Varnished, then shipped insured or handed over in person, certificate included.",

    closing_title: 'Got an idea? <em>Tell me about it.</em>',
    cta_footer: "Commission a painting",
    footer_text: "Commissions are open.",
    footer_legal: "© 2026 ciesielska.art. Prices are agreed individually.",
    privacy_note: "No analytics, no ad tracking. Your language choice is stored in this browser. Fonts load from Google Fonts; the inquiry form is run by Tally.",
    footer_contact: "Contact links",
    footer_email: "Email Marta",
    footer_whatsapp: "Message Marta on WhatsApp",
    footer_instagram: "ciesielska.art on Instagram",

    form_title: "Inquiry form",
    modal_title: "Commission inquiry",
    modal_sub: "Tell me what you have in mind. I'll write back and we'll sort out the details.",
    modal_title_buy: "Ask about this painting",
    modal_sub_buy: "Tell me you'd like it and where you are. I'll confirm it's still available, then we'll agree payment and delivery.",
    modal_fallback: "Form not loading?",
    modal_open_tab: "Open it in a new tab →",

    tally_en: "YjRN2J",
    tally_pl: "YjRN2J"
  },

  pl: {
    page_title_home: "ciesielska.art | Obrazy malowane na zamówienie",
    page_title_gallery: "Galeria | ciesielska.art",
    desc_home: "Obrazy akrylowe i akwarele malowane na zamówienie.",
    desc_gallery: "Obrazy akrylowe i akwarele: kilka na sprzedaż, reszta jako zapis ukończonych prac.",
    lang_label_en: "Przełącz na angielski",
    lang_label_pl: "Przełącz na polski",
    language_group: "Język",
    nav_gallery: "Galeria",
    nav_about: "O mnie",
    nav_contact: "Kontakt",
    page_title_about: "O mnie | ciesielska.art",
    desc_about: "Marta Ciesielska, malarka. Kilka słów o tym, kto maluje obrazy na ciesielska.art.",
    cta_top: "Zamów obraz",
    page_title_contact: "Kontakt | ciesielska.art",
    desc_contact: "Skontaktuj się z ciesielska.art w sprawie obrazu, zamówienia lub pytania.",

    hero_kicker: "Akryl i akwarela na zamówienie",
    hero_title: 'Twój pomysł, <em>moją farbą.</em>',
    hero_lede: "Obrazy malowane na zamówienie. Każdy powstaje w jednym egzemplarzu i ma certyfikat oryginalności.",
    hero_cta1: "Zamów obraz",
    hero_cta2: "Zobacz prace",
    scroll_hint: "Przewiń i zrób krok w tył",

    status_available: "Dostępne",
    status_sold: "Sprzedane",
    dimensions: "Wymiary",
    price_request: "Zapytaj o cenę",
    commission_similar: "Zamów podobny",
    ask_to_buy: "Zapytaj o zakup",
    buy_ref: "Zakup",
    avail_note: "Jedyny egzemplarz. W odpowiedzi potwierdzę, czy jest jeszcze dostępny.",
    delivery_note: "Dostawę lub odbiór ustalamy indywidualnie.",
    look_closer: "Zobacz z bliska",
    zoom_hint: "Kliknij obraz, żeby przybliżyć",
    close: "Zamknij",
    prev: "Poprzedni obraz",
    next: "Następny obraz",
    photo_count: "Zdjęcie",
    photo_prev: "Poprzednie zdjęcie",
    photo_next: "Następne zdjęcie",
    copy_link: "Kopiuj link",
    link_copied: "Skopiowano",

    band_title: 'Dostępne <em>teraz</em>',
    band_sub: "Każda praca istnieje w jednym egzemplarzu. Zapytaj, a potwierdzę, czy jest jeszcze dostępna.",
    see_all: "Zobacz całą galerię",

    gallery_title: '<em>Galeria</em>',
    gallery_intro: "Wszystko, co dotąd powstało. Część prac można kupić, reszta wisi już na czyjejś ścianie.",
    filter_group: "Filtruj obrazy",
    filter_all: "Wszystkie",
    filter_available: "Dostępne",
    filter_sold: "Sprzedane",
    filter_commission: "Na zamówienie",
    more_coming: "Kolejne obrazy czekają na zdjęcia i wkrótce tu zawisną.",
    gallery_noscript: "Galeria wymaga JavaScriptu, żeby pokazać obrazy.",
    about_title: 'O <em>mnie</em>',
    about_lead: "Zawsze lubiłam rzeczy wyjątkowe i piękne. Obrazy są jednym i drugim.",
    about_p1: "To dla mnie zaszczyt, że tak wielu z Was też lubi moje obrazy, bo sama bywam wobec siebie zbyt krytyczna.",
    about_p2: "Nazywam się Marta Ciesielska. Nie znoszę się chwalić ani mówić o sobie, więc obiecuję, że będzie krótko. Całe życie gonię za twórczymi przygodami, a moją najnowszą miłością jest malarstwo. Nie jestem najlepsza na świecie, ale jestem wystarczająco dobra.",
    about_p3: "Sprzedaję swoje obrazy, bo kocham malować i chcę dzielić się tymi pięknymi i wyjątkowymi rzeczami. Namalować coś, o czym ktoś marzy, żeby mógł to powiesić na swojej ścianie, to jedna z najlepszych rzeczy, jakie zrobiłam w życiu. Poza tym w moim mieszkaniu kończy się miejsce na ścianach, więc cieszę się, że podobają się Wam obrazy, które już namalowałam!",
    about_photo_alt: "Marta Ciesielska uśmiecha się pod tęczowym parasolem w deszczową noc, z uniesioną ręką",

    contact_title: 'Napisz do mnie. <em>Porozmawiajmy.</em>',
    contact_intro: "Masz pytanie o obraz, zamówienie albo coś innego? Wybierz najwygodniejszy sposób kontaktu.",
    contact_options: "Sposoby kontaktu",
    contact_reference: "Pytanie o",
    contact_about: "Pytasz o",
    contact_email_title: "E-mail",
    contact_email_copy: "W sprawie obrazu, jego wymiarów lub zamówienia.",
    contact_email_action: "E-mail",
    contact_whatsapp_title: "WhatsApp",
    contact_whatsapp_copy: "Napisz do mnie bezpośrednio. Zwykle tak najszybciej mnie złapiesz.",
    contact_whatsapp_action: "WhatsApp",
    contact_instagram_title: "Instagram",
    contact_instagram_copy: "Zobacz nowe prace i napisz do mnie w wiadomości prywatnej.",
    contact_instagram_action: "Instagram",
    contact_form_title: "Formularz",
    contact_form_copy: "Wolisz formularz? Odpowiedz na kilka pytań, a odpiszę.",
    contact_see_painting: "Zobacz obraz",
    contact_back: "Wróć do galerii",

    statement: "Tylko farba, pędzel i kilka tygodni cierpliwości. Każdy obraz powstaje w jednym egzemplarzu, tylko dla Ciebie.",
    fact1: "Malowane ręcznie",
    fact2: "Certyfikat oryginalności",
    fact3: "Twój temat, format i kolory",

    process_title: 'Od pomysłu <em>do ściany</em>',
    s1_title: "Rozmawiamy",
    s1_desc: "Przy kawie, na Google Meet albo WhatsAppie. Ustalamy temat, wymiary i kolory.",
    s2_title: "Szkicuję",
    s2_desc: "Dostajesz cyfrowy szkic. Poprawiamy go, aż kompozycja będzie taka, jak trzeba.",
    s3_title: "Rezerwujesz termin",
    s3_desc: "Po akceptacji szkicu 20% zaliczki rezerwuje miejsce w kalendarzu.",
    s4_title: "Maluję",
    s4_desc: "Kilka tygodni przy sztaludze. Jeśli chcesz, wysyłam zdjęcia postępów.",
    s4_note: "Na tym etapie nie wprowadzam już zmian.",
    s5_title: "Obraz jedzie do Ciebie",
    s5_desc: "Zawerniksowany, wysłany z ubezpieczeniem albo przekazany osobiście, razem z certyfikatem.",

    closing_title: 'Masz pomysł? <em>Opowiedz mi o nim.</em>',
    cta_footer: "Zamów obraz",
    footer_text: "Przyjmuję zamówienia.",
    footer_legal: "© 2026 ciesielska.art. Ceny ustalamy indywidualnie.",
    privacy_note: "Bez analityki i śledzenia reklamowego. Wybór języka zapisuje się w tej przeglądarce. Czcionki ładują się z Google Fonts, a formularz obsługuje Tally.",
    footer_contact: "Linki kontaktowe",
    footer_email: "Napisz e-mail do Marty",
    footer_whatsapp: "Napisz do Marty na WhatsAppie",
    footer_instagram: "ciesielska.art na Instagramie",

    form_title: "Formularz zapytania",
    modal_title: "Zapytanie o zamówienie",
    modal_sub: "Napisz, co masz na myśli. Odpiszę i ustalimy szczegóły.",
    modal_title_buy: "Zapytaj o ten obraz",
    modal_sub_buy: "Napisz, że chcesz ten obraz i skąd jesteś. Potwierdzę, czy jest jeszcze dostępny, a potem ustalimy płatność i odbiór.",
    modal_fallback: "Formularz się nie ładuje?",
    modal_open_tab: "Otwórz w nowej karcie →",

    tally_en: "YjRN2J",
    tally_pl: "YjRN2J"
  }
};

const $ = (sel, scope = document) => scope.querySelector(sel);
const $$ = (sel, scope = document) => [...scope.querySelectorAll(sel)];
const root = document.documentElement;
const page = document.body.dataset.page || 'home';
const motion = root.classList.contains('motion');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));

const WORKS = window.WORKS || [];
const workById = id => WORKS.find(work => work.id === id);
const t = key => (I18N[root.lang] || I18N.en)[key];
const workText = (work, field) => (work[root.lang] || work.en)[field] || work.en[field] || '';
// "Acrylic on canvas · 70 × 50 cm · 2025", with the optional parts left out when empty.
const workDetails = work => [workText(work, 'medium'), work.size, work.year].filter(Boolean).join(' · ');
const isAvailable = work => work.status === 'available';
const statusLabel = work => t(isAvailable(work) ? 'status_available' : 'status_sold');
const priceLabel = work => isAvailable(work) ? (work.price || t('price_request')) : '';
const actionLabel = work => t(isAvailable(work) ? 'ask_to_buy' : 'commission_similar');
// Buying is a conversation, not a checkout: the contact page opens with the painting attached.
const contactHref = work => `contact.html?work=${encodeURIComponent(work.id)}`;

function fillContactReference() {
  const email = $('#contactEmail');
  if (!email) return; // not the contact page
  const whatsapp = $('#contactWhatsapp');
  const about = $('#contactAbout');
  const work = workById(new URLSearchParams(location.search).get('work'));

  about.hidden = !work;
  $('.contact-body').classList.toggle('has-work', Boolean(work));
  if (!work) {
    email.href = 'mailto:marta@ciesielska.art';
    whatsapp.href = 'https://wa.me/ciesielska.art';
    return;
  }

  const title = workText(work, 'title');
  const message = `${t('contact_reference')}: ${title}`;
  email.href = `mailto:marta@ciesielska.art?subject=${encodeURIComponent(message)}`;
  whatsapp.href = `https://wa.me/ciesielska.art?text=${encodeURIComponent(message)}`;

  const art = $('#contactArt');
  art.href = `gallery.html#${work.id}`;
  art.style.setProperty('--ratio', (work.w / work.h).toFixed(4));
  art.style.setProperty('--crop', work.crop || 1);
  art.style.setProperty('--origin', work.origin || '50% 50%');
  art.setAttribute('aria-label', `${t('contact_see_painting')}: ${title}`);
  const img = $('img', art);
  if (img.getAttribute('src') !== (work.thumb || work.img)) img.src = work.thumb || work.img;
  img.alt = workText(work, 'alt');
  $('#contactWorkTitle').textContent = title;
  $('#contactWorkMedium').textContent = workDetails(work);
  const status = $('#contactWorkStatus');
  status.textContent = statusLabel(work);
  status.classList.toggle('is-available', isAvailable(work));
  $('#contactWorkPrice').textContent = isAvailable(work) ? (work.price || '') : '';
  const note = $('#contactWorkNote');
  note.hidden = !isAvailable(work);
  note.textContent = `${t('avail_note')} ${t('delivery_note')}`;
}

// A view transition that gets skipped (hidden tab, interrupted) rejects its promises; the DOM change still applies.
const quiet = transition => {
  [transition.ready, transition.finished, transition.updateCallbackDone].forEach(p => p.catch(() => {}));
  return transition;
};
const withTransition = change => {
  if (motion && document.startViewTransition) quiet(document.startViewTransition(change));
  else change();
};

/* =====================================================
   DIALOGS: built here so both pages share one copy
   ===================================================== */
document.body.insertAdjacentHTML('beforeend', `
<dialog class="viewer" id="viewer" aria-labelledby="viewerTitle">
  <button type="button" class="x" id="viewerClose" data-i18n-attr="aria-label:close">×</button>
  <div class="viewer-stage" id="viewerStage">
    <button type="button" class="viewer-frame" id="viewerFrame" data-i18n-attr="aria-label:zoom_hint"><img id="viewerImg" alt=""></button>
  </div>
  <aside class="viewer-panel">
    <h2 id="viewerTitle"></h2>
    <p class="medium" id="viewerMedium"></p>
    <p class="desc" id="viewerDesc"></p>
    <div class="viewer-photo-nav" id="viewerPhotoNav" hidden>
      <button type="button" class="x" id="viewerPhotoPrev" data-i18n-attr="aria-label:photo_prev">←</button>
      <span id="viewerPhotoCount" aria-live="polite"></span>
      <button type="button" class="x" id="viewerPhotoNext" data-i18n-attr="aria-label:photo_next">→</button>
    </div>
    <p class="viewer-status"><span class="status" id="viewerStatus"></span><span class="price" id="viewerPrice"></span></p>
    <p class="viewer-note" id="viewerNote"></p>
    <div class="viewer-actions">
      <button type="button" class="btn btn-solid" id="viewerAction"></button>
      <button type="button" class="text-btn plain" id="viewerShare"></button>
    </div>
    <div class="viewer-nav" id="viewerNav">
      <button type="button" class="x" id="viewerPrev" data-i18n-attr="aria-label:prev">←</button>
      <span id="viewerCount"></span>
      <button type="button" class="x" id="viewerNext" data-i18n-attr="aria-label:next">→</button>
    </div>
    <p class="viewer-hint" data-i18n="zoom_hint"></p>
  </aside>
</dialog>

<dialog class="sheet" id="inquiry" aria-labelledby="inquiryTitle">
  <div class="sheet-head">
    <h3 id="inquiryTitle"></h3>
    <button type="button" class="x" id="inquiryClose" data-i18n-attr="aria-label:close">×</button>
  </div>
  <div class="sheet-body">
    <p class="sheet-sub" id="inquirySub"></p>
    <!-- One bilingual Tally form serves both languages. -->
    <iframe
      class="tally-frame"
      id="tallyFrame"
      data-tally-src="https://tally.so/embed/YjRN2J?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
      data-i18n-attr="title:form_title"
      loading="lazy"></iframe>
    <p class="sheet-fallback">
      <span data-i18n="modal_fallback"></span>
      <a id="tallyFallbackLink" href="https://tally.so/r/YjRN2J" target="_blank" rel="noopener" data-i18n="modal_open_tab"></a>
    </p>
  </div>
</dialog>`);

/* =====================================================
   LANGUAGE
   ===================================================== */
// Things that are drawn from data (gallery wall, open viewer) register here to be redrawn on a language change.
const redraws = [];

// Fills the static homepage markup for a painting from works.js.
function fillWorkFields(scope = document) {
  $$('[data-work][data-field]', scope).forEach(el => {
    const work = workById(el.dataset.work);
    if (!work) return;
    switch (el.dataset.field) {
      case 'alt': el.alt = workText(work, 'alt'); break;
      case 'medium': el.textContent = workDetails(work); break;
      case 'status':
        el.textContent = statusLabel(work);
        el.classList.toggle('is-available', isAvailable(work));
        break;
      case 'price': el.textContent = priceLabel(work); break;
      case 'action': el.textContent = actionLabel(work); break;
      default: el.textContent = workText(work, el.dataset.field);
    }
  });
  $$('[data-view][data-work]', scope).forEach(el => {
    const work = workById(el.dataset.work);
    if (work) el.setAttribute('aria-label', `${t('look_closer')}: ${workText(work, 'title')}`);
  });
}

function applyLang(lang) {
  const copy = I18N[lang];
  root.lang = lang;

  $$('[data-i18n]').forEach(el => {
    const value = copy[el.dataset.i18n];
    if (value !== undefined) el.textContent = value;
  });
  $$('[data-i18n-html]').forEach(el => {
    const value = copy[el.dataset.i18nHtml];
    if (value !== undefined) el.innerHTML = value;
  });
  $$('[data-i18n-attr]').forEach(el => {
    const [attribute, key] = el.dataset.i18nAttr.split(':');
    if (attribute && copy[key] !== undefined) el.setAttribute(attribute, copy[key]);
  });

  // Each word of the statement gets its own span so it can ink in on scroll.
  $$('[data-split]').forEach(el => {
    const words = el.textContent.trim().split(/\s+/);
    el.textContent = '';
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.className = 'w';
      span.style.setProperty('--i', i);
      span.textContent = word;
      el.append(span, ' ');
    });
  });

  fillWorkFields();
  fillContactReference();

  document.title = copy[`page_title_${page}`];
  $('meta[name="description"]')?.setAttribute('content', copy[`desc_${page}`]);
  $('meta[property="og:title"]')?.setAttribute('content', copy[`page_title_${page}`]);
  $('meta[property="og:description"]')?.setAttribute('content', copy[`desc_${page}`]);

  // Tally form per language
  const formId = copy[lang === 'pl' ? 'tally_pl' : 'tally_en'];
  if (formId) {
    $('#tallyFrame').dataset.tallySrc = `https://tally.so/embed/${encodeURIComponent(formId)}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;
    $('#tallyFallbackLink').href = `https://tally.so/r/${formId}`;
  }

  $$('.lang button').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.lang === lang));
    button.setAttribute('aria-label', copy[`lang_label_${button.dataset.lang}`]);
  });

  redraws.forEach(redraw => redraw());
}

function setLang(lang, { persist = true, animate = true } = {}) {
  if (!Object.hasOwn(I18N, lang)) lang = 'en';
  if (animate && lang !== root.lang) withTransition(() => applyLang(lang));
  else applyLang(lang);
  if (persist) {
    try { localStorage.setItem('lang', lang); } catch (_) { /* Storage may be disabled. */ }
  }
}

$$('.lang button').forEach(button => button.addEventListener('click', () => setLang(button.dataset.lang)));

/* =====================================================
   HERO (homepage): scroll steps you back from the paint to the wall
   ===================================================== */
const hero = $('.hero');

if (hero && motion) {
  const stage = $('.hero-stage');
  const canvas = $('.hero-canvas');
  let coverScale = 1;
  let span = 1;
  let queued = false;

  const render = () => {
    queued = false;
    const p = clamp(-hero.getBoundingClientRect().top / span);
    const zoom = clamp(p / 0.8);
    // Interpolating the exponent keeps the zoom speed even to the eye.
    hero.style.setProperty('--s', Math.pow(coverScale, 1 - zoom).toFixed(4));
    hero.style.setProperty('--copy', (1 - clamp(p / 0.2)).toFixed(3));
    hero.style.setProperty('--scrim', (1 - clamp(p / 0.45)).toFixed(3));
    hero.style.setProperty('--label', clamp((p - 0.7) / 0.18).toFixed(3));
    hero.classList.toggle('past', p > 0.2);
    hero.classList.toggle('hung', p > 0.8);
  };

  const measure = () => {
    const vw = stage.clientWidth, vh = stage.clientHeight;
    const w = canvas.offsetWidth, h = canvas.offsetHeight;
    const cx = canvas.offsetLeft + w / 2, cy = canvas.offsetTop + h / 2;
    // Smallest scale at which the canvas, growing from its own centre, covers the viewport.
    coverScale = Math.max(2 * Math.max(cx, vw - cx) / w, 2 * Math.max(cy, vh - cy) / h, 1) * 1.03;
    span = Math.max(1, hero.offsetHeight - vh);
    render();
  };

  addEventListener('scroll', () => {
    if (!queued) { queued = true; requestAnimationFrame(render); }
  }, { passive: true });
  new ResizeObserver(measure).observe(stage);
  new ResizeObserver(measure).observe($('.hero-label'));
  measure();

  $('#seeWork').addEventListener('click', e => {
    e.preventDefault();
    scrollTo({ top: hero.offsetTop + span * 0.94, behavior: 'smooth' });
  });
}

/* =====================================================
   TOP BAR: tucks away while scrolling down
   ===================================================== */
{
  const topbar = $('.topbar');
  let lastY = scrollY;
  addEventListener('scroll', () => {
    const y = scrollY;
    if (Math.abs(y - lastY) < 6) return;
    // On the homepage it stays put until the hero has finished its zoom.
    const from = hero ? hero.offsetTop + hero.offsetHeight - innerHeight * 0.5 : 160;
    topbar.classList.toggle('tucked', y > lastY && y > from);
    lastY = y;
  }, { passive: true });
}

/* =====================================================
   ROOMS: the wall takes its colour from the painting in view
   ===================================================== */
const ROOM_COLORS = { sea: '#0a1322', reef: '#07202c', violet: '#120f2a', dusk: '#1c1220', ink: '#0e0f14', ember: '#17110f' };
const themeMeta = $('meta[name="theme-color"]');
let pageRoom = root.dataset.room;       // what the page itself asks for
let viewerRoom = null;                  // overrides it while a painting is open

function paintRoom() {
  const room = viewerRoom || pageRoom;
  if (!ROOM_COLORS[room]) return;
  root.dataset.room = room;
  themeMeta?.setAttribute('content', ROOM_COLORS[room]);
}

const roomWatcher = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    pageRoom = entry.target.dataset.room;
    paintRoom();
  });
}, { rootMargin: '-50% 0px -50% 0px' });
$$('main [data-room]').forEach(el => roomWatcher.observe(el));

/* =====================================================
   SCROLL REVEALS
   ===================================================== */
const revealer = motion ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in');
    revealer.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }) : null;
const watchReveals = (scope = document) => {
  if (revealer) $$('.reveal, .unveil', scope).forEach(el => revealer.observe(el));
};
watchReveals();

/* =====================================================
   GALLERY LIGHT: sheen and a slight tilt under the pointer
   ===================================================== */
function lightUp(art) {
  if (!motion || !finePointer) return;
  art.addEventListener('pointermove', e => {
    const r = art.getBoundingClientRect();
    const x = clamp((e.clientX - r.left) / r.width), y = clamp((e.clientY - r.top) / r.height);
    art.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
    art.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
    art.style.setProperty('--tx', (x - 0.5).toFixed(3));
    art.style.setProperty('--ty', (y - 0.5).toFixed(3));
  });
  art.addEventListener('pointerleave', () => {
    art.style.setProperty('--tx', 0);
    art.style.setProperty('--ty', 0);
  });
}
$$('.art').forEach(lightUp);

/* =====================================================
   TILES: a painting with its caption, used on the gallery
   wall and in the homepage "available now" band
   ===================================================== */
function makeTile(work, { settled = false } = {}) {
  const tile = document.createElement('figure');
  tile.className = settled ? 'tile' : 'tile reveal';
  tile.style.viewTransitionName = `tile-${work.id}`;

  const art = document.createElement('button');
  art.type = 'button';
  art.className = 'art';
  art.dataset.view = '';
  art.dataset.work = work.id;
  art.style.setProperty('--ratio', (work.w / work.h).toFixed(4));
  art.style.setProperty('--crop', work.crop || 1);
  if (work.origin) art.style.setProperty('--origin', work.origin);
  // Thumbnails start close on the painting's best detail (see .tile .art img in site.css).
  art.style.setProperty('--focus', work.focus || work.origin || '50% 50%');
  art.style.setProperty('--zoom', work.zoom || 1.8);
  art.setAttribute('aria-label', `${t('look_closer')}: ${workText(work, 'title')}`);

  const img = new Image();
  img.src = work.thumb || work.img;
  img.width = work.w;
  img.height = work.h;
  img.alt = workText(work, 'alt');
  img.loading = 'lazy';
  img.decoding = 'async';

  const sheen = document.createElement('span');
  sheen.className = 'sheen';
  const closer = document.createElement('span');
  closer.className = 'closer';
  closer.textContent = t('look_closer');
  [sheen, closer].forEach(el => el.setAttribute('aria-hidden', 'true'));
  art.append(img, sheen, closer);
  lightUp(art);

  const caption = document.createElement('figcaption');
  const title = document.createElement('h3');
  title.textContent = workText(work, 'title');
  const medium = document.createElement('p');
  medium.className = 'medium';
  medium.textContent = workText(work, 'medium');
  const size = document.createElement('p');
  size.className = 'tile-size';
  size.textContent = work.size ? `${t('dimensions')}: ${work.size}` : '';
  size.hidden = !work.size;
  const foot = document.createElement('p');
  foot.className = 'tile-foot';
  const status = document.createElement('span');
  status.className = isAvailable(work) ? 'status is-available' : 'status';
  status.textContent = statusLabel(work);
  const price = document.createElement(isAvailable(work) ? 'a' : 'span');
  price.className = isAvailable(work) ? 'price-link' : 'price';
  price.textContent = priceLabel(work);
  if (isAvailable(work)) {
    price.href = contactHref(work);
    price.setAttribute('aria-label', `${priceLabel(work)}: ${workText(work, 'title')}`);
  }
  foot.append(status, price);
  caption.append(title, medium, size, foot);

  tile.append(art, caption);
  return tile;
}

/* =====================================================
   GALLERY WALL (gallery.html)
   ===================================================== */
const wall = $('#wall');
let wallOrder = WORKS.map(work => work.id);   // what the viewer steps through

if (wall) {
  const FILTERS = [
    { key: 'all', label: 'filter_all', test: () => true },
    { key: 'available', label: 'filter_available', test: isAvailable },
    { key: 'sold', label: 'filter_sold', test: work => work.status === 'sold' },
    { key: 'commission', label: 'filter_commission', test: work => Boolean(work.commission) }
  ];
  const filterBar = $('#filters');
  let active = 'all';
  let firstDraw = true;

  const columnCount = () => (innerWidth >= 1040 ? 3 : innerWidth >= 640 ? 2 : 1);

  const drawFilters = () => {
    filterBar.textContent = '';
    FILTERS.forEach(filter => {
      const count = WORKS.filter(filter.test).length;
      if (!count) return; // no empty filters
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-pressed', String(filter.key === active));
      button.textContent = t(filter.label);
      const small = document.createElement('span');
      small.className = 'count';
      small.textContent = count;
      button.append(small);
      button.addEventListener('click', () => {
        if (active === filter.key) return;
        active = filter.key;
        withTransition(drawWall);
      });
      filterBar.append(button);
    });
  };

  // Salon hang: each painting goes to whichever column is currently shortest.
  const drawWall = () => {
    drawFilters();
    const list = WORKS.filter(FILTERS.find(filter => filter.key === active).test);
    wallOrder = list.map(work => work.id);
    const count = columnCount(); // kept even for a short list, so a lone painting doesn't balloon to full width
    wall.textContent = '';
    wall.dataset.cols = count;
    wall.style.setProperty('--cols', count);
    const columns = Array.from({ length: count }, (_, i) => {
      const el = document.createElement('div');
      el.className = 'wall-col';
      wall.append(el);
      return { el, height: i % 2 ? 0.22 : 0 }; // odd columns hang a little lower
    });
    list.forEach(work => {
      const column = columns.reduce((a, b) => (b.height < a.height ? b : a));
      column.el.append(makeTile(work, { settled: !firstDraw }));
      column.height += work.h / work.w + 0.4;
    });
    if (window.MORE_COMING && active === 'all') {
      const note = document.createElement('p');
      note.className = firstDraw ? 'wall-note reveal' : 'wall-note';
      note.textContent = t('more_coming');
      columns.reduce((a, b) => (b.height < a.height ? b : a)).el.append(note);
    }
    watchReveals(wall);
    firstDraw = false;
  };

  redraws.push(drawWall);
  let lastCount = columnCount();
  addEventListener('resize', () => {
    if (columnCount() === lastCount) return;
    lastCount = columnCount();
    drawWall();
  });
}

/* =====================================================
   "AVAILABLE NOW" BAND (homepage): for-sale pieces that
   are not already hanging on the page
   ===================================================== */
const band = $('#availableBand');
if (band) {
  const shown = new Set($$('main [data-view][data-work]').map(el => el.dataset.work));
  const extra = WORKS.filter(work => isAvailable(work) && !shown.has(work.id));
  if (extra.length) {
    band.hidden = false;
    redraws.push(() => {
      const row = $('#bandRow');
      const first = !row.children.length;
      row.textContent = '';
      extra.forEach(work => row.append(makeTile(work, { settled: !first })));
      watchReveals(row);
    });
  }
}

/* =====================================================
   CLOSE-UP VIEWER: the painting, its details, one action
   ===================================================== */
const viewer = $('#viewer');
const viewerFrame = $('#viewerFrame');
const viewerStage = $('#viewerStage');
let viewing = null;          // the work on show
let viewerPhotoIndex = 0;

const sourceOf = id => $(`main [data-view][data-work="${id}"]`);
const onScreen = el => {
  if (!el) return false;
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < innerHeight && r.width > 0;
};

// Morph one element into another with a view transition where available.
function morph(from, to, change) {
  if (!motion || !document.startViewTransition || !onScreen(from) && !onScreen(to)) { change(); return; }
  const start = onScreen(from) ? from : null;
  if (start) start.style.viewTransitionName = 'art';
  const transition = quiet(document.startViewTransition(() => {
    if (start) start.style.viewTransitionName = '';
    change();
    if (onScreen(to)) to.style.viewTransitionName = 'art';
  }));
  transition.finished.catch(() => {}).finally(() => { to.style.viewTransitionName = ''; });
}

function fillViewer() {
  const work = viewing;
  if (!work) return;
  const photos = work.photos?.length ? work.photos : [{ src: work.img, w: work.w, h: work.h }];
  viewerPhotoIndex = Math.min(viewerPhotoIndex, photos.length - 1);
  const photo = photos[viewerPhotoIndex];
  const img = $('#viewerImg');
  if (img.getAttribute('src') !== photo.src) img.src = photo.src;
  img.alt = photo.alt?.[root.lang] || workText(work, 'alt');
  viewerFrame.style.setProperty('--ratio', (photo.w / photo.h).toFixed(4));
  viewerFrame.style.setProperty('--crop', work.crop || 1);
  viewerFrame.style.setProperty('--origin', work.origin || '50% 50%');

  $('#viewerPhotoNav').hidden = photos.length < 2;
  $('#viewerPhotoCount').textContent = `${t('photo_count')} ${viewerPhotoIndex + 1} / ${photos.length}`;

  $('#viewerTitle').textContent = workText(work, 'title');
  $('#viewerMedium').textContent = workDetails(work);
  $('#viewerDesc').textContent = workText(work, 'desc');
  const status = $('#viewerStatus');
  status.textContent = statusLabel(work);
  status.classList.toggle('is-available', isAvailable(work));
  $('#viewerPrice').textContent = priceLabel(work);
  const note = $('#viewerNote');
  note.hidden = !isAvailable(work);
  note.textContent = `${t('avail_note')} ${t('delivery_note')}`;
  $('#viewerAction').textContent = actionLabel(work);
  $('#viewerShare').textContent = t('copy_link');
  $('#viewerShare').hidden = !navigator.clipboard;

  const order = wallOrder.includes(work.id) ? wallOrder : WORKS.map(w => w.id);
  $('#viewerNav').hidden = order.length < 2;
  $('#viewerCount').textContent = `${order.indexOf(work.id) + 1} / ${order.length}`;

  viewer.classList.remove('zoomed');
  viewerRoom = work.room || null;
  paintRoom();
  if (page === 'gallery') history.replaceState(null, '', `#${work.id}`);
}
redraws.push(fillViewer);

function openViewer(id, { animate = true } = {}) {
  const work = workById(id);
  if (!work) return;
  viewing = work;
  viewerPhotoIndex = 0;
  fillViewer();
  if (viewer.open) return;
  if (animate) morph(sourceOf(id), viewerFrame, () => viewer.showModal());
  else viewer.showModal();
}

function closeViewer() {
  if (!viewer.open) return;
  const source = viewing && sourceOf(viewing.id);
  viewer.classList.remove('zoomed');
  const finish = () => {
    viewer.close();
    viewing = null;
    viewerRoom = null;
    paintRoom();
    if (page === 'gallery') history.replaceState(null, '', location.pathname + location.search);
  };
  if (source) morph(viewerFrame, source, finish);
  else finish();
}

function stepViewer(direction) {
  if (!viewing) return;
  const order = wallOrder.includes(viewing.id) ? wallOrder : WORKS.map(w => w.id);
  if (order.length < 2) return;
  const next = order[(order.indexOf(viewing.id) + direction + order.length) % order.length];
  withTransition(() => { viewing = workById(next); viewerPhotoIndex = 0; fillViewer(); });
}

function stepViewerPhoto(direction) {
  if (!viewing) return;
  const photos = viewing.photos || [];
  if (photos.length < 2) return;
  viewerPhotoIndex = (viewerPhotoIndex + direction + photos.length) % photos.length;
  viewer.classList.remove('zoomed');
  withTransition(fillViewer);
}

// Paintings are clickable wherever they hang, including tiles drawn later.
document.addEventListener('click', e => {
  const art = e.target.closest('[data-view][data-work]');
  if (art) openViewer(art.dataset.work);
});

$('#viewerClose').addEventListener('click', closeViewer);
$('#viewerPrev').addEventListener('click', () => stepViewer(-1));
$('#viewerNext').addEventListener('click', () => stepViewer(1));
$('#viewerPhotoPrev').addEventListener('click', () => stepViewerPhoto(-1));
$('#viewerPhotoNext').addEventListener('click', () => stepViewerPhoto(1));
viewer.addEventListener('cancel', e => { e.preventDefault(); closeViewer(); });
viewerStage.addEventListener('click', e => { if (e.target === viewerStage) closeViewer(); });
viewer.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') stepViewer(-1);
  if (e.key === 'ArrowRight') stepViewer(1);
});

viewerFrame.addEventListener('click', e => {
  const r = viewerFrame.getBoundingClientRect();
  // Keyboard activation has no pointer position; zoom on the centre then.
  const fx = e.detail ? clamp((e.clientX - r.left) / r.width) : 0.5;
  const fy = e.detail ? clamp((e.clientY - r.top) / r.height) : 0.5;
  if (viewer.classList.toggle('zoomed')) {
    viewerStage.scrollLeft = fx * viewerStage.scrollWidth - viewerStage.clientWidth / 2;
    viewerStage.scrollTop = fy * viewerStage.scrollHeight - viewerStage.clientHeight / 2;
  }
});

// Swipe left or right between paintings (when not zoomed in and panning).
{
  let startX = 0, startY = 0;
  viewerStage.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });
  viewerStage.addEventListener('touchend', e => {
    if (viewer.classList.contains('zoomed')) return;
    const dx = e.changedTouches[0].clientX - startX, dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) stepViewer(dx < 0 ? 1 : -1);
  }, { passive: true });
}

$('#viewerShare').addEventListener('click', async e => {
  if (!viewing) return;
  const link = new URL(`gallery.html#${viewing.id}`, location.href).href;
  try {
    await navigator.clipboard.writeText(link);
    e.currentTarget.textContent = t('link_copied');
    setTimeout(() => { if (viewing) $('#viewerShare').textContent = t('copy_link'); }, 1800);
  } catch (_) { /* Clipboard permission denied; nothing to do. */ }
});

$('#viewerAction').addEventListener('click', () => {
  if (!viewing) return;
  if (isAvailable(viewing)) location.assign(contactHref(viewing));
  else openInquiry({ work: viewing });
});

/* =====================================================
   INQUIRY DIALOG (Tally embed)
   Buying is a manual process: the form is the only step,
   pre-filled with which painting the message is about.
   ===================================================== */
const inquiry = $('#inquiry');
let inquiryBuying = false;

function fillInquiryCopy() {
  $('#inquiryTitle').textContent = t(inquiryBuying ? 'modal_title_buy' : 'modal_title');
  $('#inquirySub').textContent = t(inquiryBuying ? 'modal_sub_buy' : 'modal_sub');
}
redraws.push(fillInquiryCopy);

function loadTallyEmbed() {
  if (window.Tally && typeof window.Tally.loadEmbeds === 'function') {
    window.Tally.loadEmbeds();
    return;
  }
  if ($('script[data-tally-embed]')) return;
  const script = document.createElement('script');
  script.src = 'https://tally.so/widgets/embed.js';
  script.async = true;
  script.dataset.tallyEmbed = '';
  document.body.appendChild(script);
}

function openInquiry({ work = null, buy = false } = {}) {
  if (inquiry.open) return;
  if (viewer.open) closeViewer();

  inquiryBuying = Boolean(work && buy);
  fillInquiryCopy();

  // The form's "reference" field says which painting, and whether it is a purchase.
  const title = work ? workText(work, 'title') : '';
  const reference = inquiryBuying ? `${t('buy_ref')}: ${title}` : title;
  const frame = $('#tallyFrame');
  const formUrl = new URL(frame.dataset.tallySrc);
  if (reference) formUrl.searchParams.set('reference', reference);
  else formUrl.searchParams.delete('reference');
  frame.dataset.tallySrc = formUrl.toString();
  frame.removeAttribute('src');
  loadTallyEmbed();

  inquiry.showModal();
}

document.addEventListener('click', e => {
  const action = e.target.closest('[data-action][data-work]');
  if (action) {
    const work = workById(action.dataset.work);
    if (!work) return;
    if (isAvailable(work)) location.assign(contactHref(work));
    else openInquiry({ work });
    return;
  }
  if (e.target.closest('[data-commission]')) openInquiry();
});
// Contact page: the form is one of the ways to write, and carries the painting along if there is one.
$('#contactForm')?.addEventListener('click', () => {
  const work = workById(new URLSearchParams(location.search).get('work'));
  openInquiry({ work, buy: Boolean(work && isAvailable(work)) });
});
$('#inquiryClose').addEventListener('click', () => inquiry.close());
inquiry.addEventListener('click', e => { if (e.target === inquiry) inquiry.close(); });

/* ---- Auto-close after Tally submission ---- */
window.addEventListener('Tally.FormSubmitted', () => {
  if (inquiry.open) setTimeout(() => inquiry.close(), 1200);
});

/* =====================================================
   START
   ===================================================== */
let savedLang = null;
try { savedLang = localStorage.getItem('lang'); } catch (_) { /* Storage may be disabled. */ }
const browserLang = (navigator.language || 'en').toLowerCase().startsWith('pl') ? 'pl' : 'en';
setLang(savedLang || browserLang, { persist: false, animate: false });

// A link such as gallery.html#nebula-turtles opens straight onto that painting.
if (page === 'gallery') {
  const fromHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (id && workById(id)) openViewer(id, { animate: false });
  };
  addEventListener('hashchange', fromHash);
  fromHash();
}
