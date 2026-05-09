Gallery videos are auto-loaded by year from this path:

- `public/assets/videos/gallery/<year>/`

Examples:

- `public/assets/videos/gallery/2026/`
- `public/assets/videos/gallery/2025/`
- `public/assets/videos/gallery/2024/`

Supported video formats:

- `.m3u8`, `.mp4`, `.webm`, `.mov`, `.m4v`, `.ogv`

Playback priority (same base filename in the same year folder):

1. `.m3u8` (best, adaptive streaming)
2. `.mp4`
3. `.webm`
4. `.m4v`
5. `.mov`
6. `.ogv`

Example:

- If both `2026 Top Shop.m3u8` and `2026 Top Shop.mp4` exist, gallery will use `.m3u8`.
- If both `2026 Top Shop.mp4` and `2026 Top Shop.mov` exist, gallery will use `.mp4`.

Video file naming convention (recommended):

- `video-title__short-description.mp4`

Examples:

- `winners-stage-recap__official-event-highlights.mp4`
- `awards-presentation__top-shop-winners.mp4`

Optional poster images:

- Add a matching image in `public/assets/images/gallery/<year>/` with the same base filename.
- Example: `public/assets/videos/gallery/2026/winners-stage-recap.mp4`
  uses poster `public/assets/images/gallery/2026/winners-stage-recap.jpg`

How loading works:

- If at least one valid video exists in any year folder, gallery uses these video folders.
- If no video files are found, gallery falls back to default curated videos in `lib/awards-gallery.ts`.

Recommended export settings (to reduce buffering):

- Container: MP4
- Video codec: H.264 (AVC)
- Audio codec: AAC
- Resolution: 1920x1080 or 1280x720
- Bitrate target:
  - 1080p: ~4 to 8 Mbps
  - 720p: ~2.5 to 4 Mbps
