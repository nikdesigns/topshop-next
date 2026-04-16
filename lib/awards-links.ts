import type { FinalistsPageYear } from '@/data/finalists-pages';
import type { WinnersPageYear } from '@/data/winners-pages';

type AwardsYearLink<TYear extends string> = {
  year: TYear;
  href: string;
  label: string;
};

export const AWARDS_WINNER_LINKS = [
  { year: '2026', href: '/topshop_2026_winners.html', label: '2026 Winners' },
  { year: '2025', href: '/topshop_2025_winners.html', label: '2025 Winners' },
  { year: '2024', href: '/topshop_2024_winners.html', label: '2024 Winners' },
  { year: '2023', href: '/topshop_2023_winners.html', label: '2023 Winners' },
  { year: '2022', href: '/topshop_2022_winners.html', label: '2022 Winners' },
  { year: '2021', href: '/topshop-2021-winners_new.html', label: '2021 Winners' },
  { year: '2020', href: '/topshop-2020-winners.html', label: '2020 Winners' },
  { year: '2019', href: '/topshop-2019-winners.html', label: '2019 Winners' },
] as const satisfies readonly AwardsYearLink<WinnersPageYear>[];

export const AWARDS_FINALIST_LINKS = [
  { year: '2026', href: '/topshop_2026_finalist.html', label: '2026 Finalists' },
  { year: '2025', href: '/topshop_2025_finalist.html', label: '2025 Finalists' },
  { year: '2024', href: '/topshop_2024_finalist.html', label: '2024 Finalists' },
  { year: '2023', href: '/topshop_2023_finalist.html', label: '2023 Finalists' },
  { year: '2022', href: '/topshop_2022_finalist.html', label: '2022 Finalists' },
  { year: '2021', href: '/topshop_2021_finalist.html', label: '2021 Finalists' },
] as const satisfies readonly AwardsYearLink<FinalistsPageYear>[];

export const LATEST_WINNERS_LINK = AWARDS_WINNER_LINKS[0] ?? {
  year: '',
  href: '/',
  label: 'Winners',
};

export const LATEST_FINALISTS_LINK = AWARDS_FINALIST_LINKS[0] ?? {
  year: '',
  href: '/',
  label: 'Finalists',
};
