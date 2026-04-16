import type { FinalistsPageYear } from '@/data/finalists-pages';
import type { WinnersPageYear } from '@/data/winners-pages';

type AwardsYearLink<TYear extends string> = {
  year: TYear;
  href: string;
  label: string;
};

type AwardsSeasonAssets = {
  scheduleImageSrc: string;
  socialCardImageSrc: string;
  heroWinnersImageSrc: string;
  heroFinalistsImageSrc: string;
  heroRecapImageSrc: string;
  winnersShowcaseYear: string;
  winnersShowcaseLocation: string;
  highlightsPosterImageSrc: string;
  highlightsYear: string;
  highlightsVideoEmbedUrl: string;
  highlightsVideoShareUrl: string;
};

export type AwardsSeasonConfig = {
  seasonLabel: string;
  nominationStartDate: string;
  nominationEndDate: string;
  assets: AwardsSeasonAssets;
};

export const AWARDS_WINNER_LINKS_DATA = [
  { year: '2026', href: '/topshop_2026_winners.html', label: '2026 Winners' },
  { year: '2025', href: '/topshop_2025_winners.html', label: '2025 Winners' },
  { year: '2024', href: '/topshop_2024_winners.html', label: '2024 Winners' },
  { year: '2023', href: '/topshop_2023_winners.html', label: '2023 Winners' },
  { year: '2022', href: '/topshop_2022_winners.html', label: '2022 Winners' },
  { year: '2021', href: '/topshop-2021-winners_new.html', label: '2021 Winners' },
  { year: '2020', href: '/topshop-2020-winners.html', label: '2020 Winners' },
  { year: '2019', href: '/topshop-2019-winners.html', label: '2019 Winners' },
] as const satisfies readonly AwardsYearLink<WinnersPageYear>[];

export const AWARDS_FINALIST_LINKS_DATA = [
  { year: '2026', href: '/topshop_2026_finalist.html', label: '2026 Finalists' },
  { year: '2025', href: '/topshop_2025_finalist.html', label: '2025 Finalists' },
  { year: '2024', href: '/topshop_2024_finalist.html', label: '2024 Finalists' },
  { year: '2023', href: '/topshop_2023_finalist.html', label: '2023 Finalists' },
  { year: '2022', href: '/topshop_2022_finalist.html', label: '2022 Finalists' },
  { year: '2021', href: '/topshop_2021_finalist.html', label: '2021 Finalists' },
] as const satisfies readonly AwardsYearLink<FinalistsPageYear>[];

export const ACTIVE_AWARDS_SEASON: AwardsSeasonConfig = {
  seasonLabel: '2026',
  nominationStartDate: '2025-09-01',
  nominationEndDate: '2026-01-31',
  assets: {
    scheduleImageSrc: '/assets/images/about/topshop_schedule_2026.png',
    socialCardImageSrc: '/assets/images/banners/ts_winner_2026_1.jpg',
    heroWinnersImageSrc: '/assets/images/banners/ts_winner_2026.jpg',
    heroFinalistsImageSrc: '/assets/images/banners/ts_finalist_2026.jpg',
    heroRecapImageSrc: '/assets/images/banners/ts_recap_2025.jpg',
    winnersShowcaseYear: '2025',
    winnersShowcaseLocation: 'MRO Americas in Atlanta, Georgia, USA',
    highlightsPosterImageSrc: '/assets/images/banners/24.jpg',
    highlightsYear: '2025',
    highlightsVideoEmbedUrl: 'https://player.vimeo.com/video/1075212605',
    highlightsVideoShareUrl: 'https://vimeo.com/1075212605/dbaa994485?share=copy',
  },
};
