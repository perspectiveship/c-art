---
name: add-gallery-artwork
description: Use when Marta adds or supplies artwork photos for ciesielska.art, asks to add a new piece, or says "dodaj nowe prace". Prepare web-ready images, collect missing artwork details, propose bilingual gallery copy, and update the shared gallery data.
---

# Add artwork to the gallery

Use this skill for new paintings or art products in this repository. The gallery is populated from one JSON file per work in `content/works/` (the same files the panel at `/head-of-art` edits); `scripts/build.mjs` turns them into the `works.js` the site reads. Keep their data shape and the site's existing visual style. The site's interface is Polish and English, so every new work needs both languages.

## 1. Find the source photos and inspect the site

- Check `git status` first. Identify only the new photos relevant to this request; leave unrelated changes and untracked files untouched.
- Photos may be attached to the conversation or placed in the repository. Visually inspect every candidate and determine whether it is a full view, detail, or an alternate view.
- Read `head-of-art/config.yml` (field list and allowed values) and comparable files in `content/works/` before editing. Treat them, together with `content/settings.json` for current starting prices, as the source of truth for IDs, image paths, technique labels, `room` values, status values, price representation and alternate photos.
- Do not infer a work's physical dimensions, technique, price, or availability from its appearance. Use values Marta supplied; ask for any missing required values together in one concise question.

## 2. Collect and confirm the work details

For each piece, collect:

- physical dimensions, with units;
- price or the applicable current starting-price tier from `content/settings.json`; for products, the exact per-item and bundle prices and bundle quantity;
- technique/material as it should appear on the site;
- availability: available or sold.

If a detail is already stated in the request, reuse it without asking again. If pricing is unclear, show the current tiers from `content/settings.json` and ask which applies; do not calculate or invent a price. For a sold painting, a supplied starting price may describe a similar commission, consistent with the current site behavior. If Marta asks to omit the price, preserve the site's existing “price on request” behavior for available items or show no starting price for sold items.

When Marta has not provided a title, propose a concise title in Polish and English. When she has not provided a description, propose a short, factual description in both languages, grounded in the visible artwork. Present suggested title and description for Marta to approve or edit before putting them on the live site. Do not claim a technique, story, or subject that cannot be verified.

## 3. Crop and prepare the photos

- Preserve each supplied original unchanged. Create optimized derivatives for the site; do not add large originals to the public `images/` paths when they are not needed by the site.
- Choose a close but comfortable crop that removes distracting surroundings while retaining the whole painting or product, its edges, and enough context to understand it. Never crop into the painted area or reconstruct/retouch artwork. For a multi-item product photo, keep all items that the image is meant to show.
- If the crop boundary is ambiguous or would remove part of the work, show or describe a crop proposal and ask before applying it. Use the same crop for full-size and thumbnail derivatives.
- Use a deterministic image editor or library available in the environment (for example Pillow or ImageMagick), not generative image editing. Normalize orientation from EXIF, convert to sRGB, and strip metadata such as GPS when exporting. Keep the original as the recovery source.
- The site currently uses JPEG. Export a full-size image with the long edge no larger than about 2000 px. Start around JPEG quality 82–86, with progressive encoding and optimization. The build makes gallery thumbnails (`images/sm/`, not committed) and re-encodes any photo over 2400 px or with location data, so a careful export here is what keeps quality under your control. Aim for a full-size image below about 600 KB where the artwork allows; inspect the result and adjust rather than allowing visible artifacts or unreadable detail.
- Follow the existing naming pattern: unique, lowercase, ASCII kebab-case filenames in `images/`. Check for collisions before writing. Pixel sizes are read by the build; don't record them.
- For several useful views, add optimized extra photos using the existing `photos` array schema. Avoid near-duplicate views. Write a clear Polish and English alt text for every photo.

## 4. Add the work in `content/works/<id>.json`

Create one file named after a unique lowercase kebab-case `id`, following a nearby example. The file has an `en` and a `pl` object:

- `en` holds the shared fields — `id` (same as the file name), `order` (gallery position; existing works use steps of 10), `status`, price fields, `size`, `year`, `img` (as `/images/<file>.jpg`), `room`, `focus`, optional `zoom`, `crop`, `origin`, `commission` — plus the English `title`, `medium`, `desc`, `alt`.
- `pl` holds the Polish `title`, `medium`, `desc`, `alt`.
- Extra views go in `photos` in both objects, in the same order: `{ "src": "/images/…", "alt": "…" }`, with the alt in that object's language.

Use `crop` and `origin` only for the site's display zoom; they do not replace cropping the exported image files.

Represent price with `price_type`:

- `"none"`: no price shown (available works show “price on request”);
- `"tier"` with `price_tier`: `"small"`, `"medium"` or `"large"`, using the starting prices in `content/settings.json`;
- `"label"` with `price_label` in both `en` and `pl`: the exact text Marta gave; for products sold singly and in bundles, include the per-item price, bundle price and bundle quantity.

Do not add the piece to the homepage's hand-picked feature placards unless Marta asks. The gallery reads the shared list automatically.

## 5. Review and report

- Review the diff and confirm it contains only this work's optimized images and its `content/works/<id>.json` file. Preserve existing edits and untracked content.
- Check that every image path exists, dimensions match the exported file, the ID and filenames are unique, both languages contain all required fields, and price/status/size/technique match what Marta confirmed.
- Run `node scripts/build.mjs`; it stops with a list of problems if a field is missing or a photo path is wrong. Version queries are stamped by the build, so don't edit them.
- Inspect the rendered gallery entry when a local preview is available. Do not run tests unless Marta asks; visual and data checks are part of preparing the artwork.
- Summarize the added title, dimensions, technique, status, displayed price, and generated image paths. Clearly identify any title or description still awaiting Marta's approval. Do not commit, push, publish, or merge unless Marta asks.
