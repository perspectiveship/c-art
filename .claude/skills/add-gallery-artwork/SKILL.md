---
name: add-gallery-artwork
description: Use when Marta adds or supplies artwork photos for ciesielska.art, asks to add a new piece, or says "dodaj nowe prace". Prepare web-ready images, collect missing artwork details, propose bilingual gallery copy, and update the shared gallery data.
---

# Add artwork to the gallery

Use this skill for new paintings or art products in this repository. The gallery is populated from `works.js`; keep its data shape and the site's existing visual style. The site's interface is Polish and English, so every new work needs both languages.

## 1. Find the source photos and inspect the site

- Check `git status` first. Identify only the new photos relevant to this request; leave unrelated changes and untracked files untouched.
- Photos may be attached to the conversation or placed in the repository. Visually inspect every candidate and determine whether it is a full view, detail, or an alternate view.
- Read the current field documentation and comparable entries in `works.js` before editing. Treat that file as the source of truth for IDs, image paths, technique labels, `room` values, status values, price representation, alternate photos, and current starting prices.
- Do not infer a work's physical dimensions, technique, price, or availability from its appearance. Use values Marta supplied; ask for any missing required values together in one concise question.

## 2. Collect and confirm the work details

For each piece, collect:

- physical dimensions, with units;
- price or the applicable current `window.PRICE_FROM` tier; for products, the exact per-item and bundle prices and bundle quantity;
- technique/material as it should appear on the site;
- availability: available or sold.

If a detail is already stated in the request, reuse it without asking again. If pricing is unclear, show the current tiers from `works.js` and ask which applies; do not calculate or invent a price. For a sold painting, a supplied starting price may describe a similar commission, consistent with the current site behavior. If Marta asks to omit the price, preserve the site's existing “price on request” behavior for available items or show no starting price for sold items.

When Marta has not provided a title, propose a concise title in Polish and English. When she has not provided a description, propose a short, factual description in both languages, grounded in the visible artwork. Present suggested title and description for Marta to approve or edit before putting them on the live site. Do not claim a technique, story, or subject that cannot be verified.

## 3. Crop and prepare the photos

- Preserve each supplied original unchanged. Create optimized derivatives for the site; do not add large originals to the public `images/` paths when they are not needed by the site.
- Choose a close but comfortable crop that removes distracting surroundings while retaining the whole painting or product, its edges, and enough context to understand it. Never crop into the painted area or reconstruct/retouch artwork. For a multi-item product photo, keep all items that the image is meant to show.
- If the crop boundary is ambiguous or would remove part of the work, show or describe a crop proposal and ask before applying it. Use the same crop for full-size and thumbnail derivatives.
- Use a deterministic image editor or library available in the environment (for example Pillow or ImageMagick), not generative image editing. Normalize orientation from EXIF, convert to sRGB, and strip metadata such as GPS when exporting. Keep the original as the recovery source.
- The site currently uses JPEG. Export a full-size image with the long edge no larger than about 2000 px and a gallery thumbnail with the long edge no larger than about 1100 px. Start around JPEG quality 82–86 for full-size and 78–82 for thumbnails, with progressive encoding and optimization. Aim for a thumbnail below about 200 KB and a full-size image below about 600 KB where the artwork allows; inspect the result and adjust rather than allowing visible artifacts or unreadable detail.
- Follow the existing naming pattern: unique, lowercase, ASCII kebab-case filenames in `images/` and matching thumbnails in `images/sm/`. Check for collisions before writing. Record each exported image's actual pixel width and height; do not use the original dimensions if the derivative was resized or cropped.
- For several useful views, add optimized extra photos using the existing `photos` array schema. Avoid near-duplicate views. Write a clear Polish and English alt text for every photo.

## 4. Add the work in `works.js`

Create one entry following a nearby example. Include a unique lowercase kebab-case `id`, `img`, `thumb`, actual `w` and `h`, a visible-detail `focus` point, an appropriate existing `room`, `status`, `size`, and complete `en` and `pl` fields (`title`, `medium`, `desc`, `alt`). Add `photos` only for multiple useful views. Use the existing `crop` and `origin` fields only for the site's display zoom; they do not replace cropping the exported image files.

Represent price exactly as the existing code expects:

- paintings with tiered starting prices: `{ tier: "small" | "medium" | "large" }` using the current `window.PRICE_FROM` values;
- paintings or products with an exact price: `{ label: { en: "…", pl: "…" } }` with the amount Marta gave;
- products sold singly and in bundles: include the exact per-item price, bundle price, and bundle quantity in both labels.

Do not add the piece to the homepage's hand-picked feature placards unless Marta asks. The gallery reads the shared list automatically.

## 5. Review and report

- Review the diff and confirm it contains only this work's optimized images, its `works.js` entry, and any cache-version updates needed for the changed data. Preserve existing edits and untracked content.
- Check that every image path exists, dimensions match the exported file, the ID and filenames are unique, both languages contain all required fields, and price/status/size/technique match what Marta confirmed.
- If `works.js` changes, update its version query in the HTML pages that load it so browsers do not keep stale gallery data. Use a fresh descriptive version value consistently. Change `site.js` versions only if its code changes.
- Inspect the rendered gallery entry when a local preview is available. Do not run tests unless Marta asks; visual and data checks are part of preparing the artwork.
- Summarize the added title, dimensions, technique, status, displayed price, and generated image paths. Clearly identify any title or description still awaiting Marta's approval. Do not commit, push, publish, or merge unless Marta asks.
