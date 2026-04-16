import { WINNERS_2019_PAGE_CONFIG } from '@/data/winners-pages/2019';
import { WINNERS_2020_PAGE_CONFIG } from '@/data/winners-pages/2020';
import { WINNERS_2021_PAGE_CONFIG } from '@/data/winners-pages/2021';
import { WINNERS_2022_PAGE_CONFIG } from '@/data/winners-pages/2022';
import { WINNERS_2023_PAGE_CONFIG } from '@/data/winners-pages/2023';
import { WINNERS_2024_PAGE_CONFIG } from '@/data/winners-pages/2024';
import { WINNERS_2025_PAGE_CONFIG } from '@/data/winners-pages/2025';
import { WINNERS_2026_PAGE_CONFIG } from '@/data/winners-pages/2026';
import type { WinnersPageConfig } from '@/data/winners-pages/types';

export { type WinnersPageConfig } from '@/data/winners-pages/types';

export const WINNERS_PAGE_CONFIG = {
  '2026': WINNERS_2026_PAGE_CONFIG,
  '2025': WINNERS_2025_PAGE_CONFIG,
  '2024': WINNERS_2024_PAGE_CONFIG,
  '2023': WINNERS_2023_PAGE_CONFIG,
  '2022': WINNERS_2022_PAGE_CONFIG,
  '2021': WINNERS_2021_PAGE_CONFIG,
  '2020': WINNERS_2020_PAGE_CONFIG,
  '2019': WINNERS_2019_PAGE_CONFIG,
} as const satisfies Record<string, WinnersPageConfig>;

export type WinnersPageYear = keyof typeof WINNERS_PAGE_CONFIG;
