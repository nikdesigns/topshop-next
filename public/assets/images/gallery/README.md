Gallery folders are auto-loaded by year from this path:

- `public/assets/images/gallery/<year>/`

Examples:

- `public/assets/images/gallery/2026/`
- `public/assets/images/gallery/2025/`
- `public/assets/images/gallery/2024/`

Supported image formats:

- `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`

File naming convention (recommended):

- `company__winner-category__photo-title.jpg`

Examples:

- `tag-aero-llc__best-apu-overhaul-repair__stage-photo.jpg`
- `vse-aviation-services-fl__best-accessories-class-i-ii-and-iii-repair__award.jpg`

If you only provide `company.jpg`, the gallery still works and auto-generates labels.

How loading works:

- If at least one valid image exists in any year folder here, gallery uses these folders.
- If folders are empty, gallery falls back to the default curated data in `lib/awards-gallery.ts`.

Large image optimization (recommended):

- Run `npm run gallery:optimize` after adding/updating gallery images.
- Optimized thumbnails are generated under:
  - `public/assets/images/gallery/_optimized/<year>/`
- Gallery cards use optimized thumbnails for fast loading.
- Lightbox still uses original full-resolution images.
