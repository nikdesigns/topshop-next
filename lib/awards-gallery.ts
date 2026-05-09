import { AWARDS_WINNER_LINKS_DATA } from '@/data/awards-cycle';

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

export const AWARDS_GALLERY_YEARS: AwardsGalleryYear[] = Array.from(
  new Set(AWARDS_WINNER_LINKS_DATA.map((entry) => entry.year)),
).sort((a, b) => Number(b) - Number(a));

export const DEFAULT_AWARDS_GALLERY_VIDEOS: AwardsGalleryVideo[] = [
  {
    id: '2026-official-recap',
    src: 'https://vimeo.com/1075212605/dbaa994485?share=copy',
    year: '2026',
    title: 'Top Shop Awards 2026 Official Recap',
    description:
      'Official Top Shop 2026 winners highlights from the awards presentation.',
    posterSrc: '/assets/images/banners/ts_winner_2026_1.jpg',
    location: 'MRO Americas',
  },
];
