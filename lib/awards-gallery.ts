export type AwardsGalleryYear = string;

export type AwardsGalleryVideo = {
  id: string;
  src: string;
  title: string;
  year: AwardsGalleryYear;
  description: string;
  posterSrc?: string;
  location?: string;
};

export const AWARDS_GALLERY_VIDEOS: AwardsGalleryVideo[] = [
  {
    id: '2026-youtube-recap',
    src: 'https://youtu.be/vjWaOYW7hK8',
    year: '2026',
    title: 'Top Shop Awards 2026 Official Recap',
    description:
      'Official Top Shop 2026 winners highlights from the awards presentation.',
    posterSrc: 'https://i.ytimg.com/vi/vjWaOYW7hK8/maxresdefault.jpg',
    location: 'MRO Americas',
  },
  {
    id: '2025-youtube-recap',
    src: 'https://youtu.be/n2kbsHKQrnQ',
    year: '2025',
    title: 'Top Shop Awards 2025 Official Recap',
    description:
      'Official Top Shop 2025 winners highlights from the awards presentation.',
    posterSrc: 'https://i.ytimg.com/vi/n2kbsHKQrnQ/maxresdefault.jpg',
    location: 'MRO Americas',
  },
  {
    id: '2024-youtube-recap',
    src: 'https://youtu.be/ApNCbtXmelM',
    year: '2024',
    title: 'Top Shop Awards 2024 Official Recap',
    description:
      'Official Top Shop 2024 winners highlights from the awards presentation.',
    posterSrc: 'https://i.ytimg.com/vi/ApNCbtXmelM/maxresdefault.jpg',
    location: 'MRO Americas',
  },
];

export const AWARDS_GALLERY_YEARS: AwardsGalleryYear[] = Array.from(
  new Set(AWARDS_GALLERY_VIDEOS.map((video) => video.year)),
).sort((a, b) => Number(b) - Number(a));
