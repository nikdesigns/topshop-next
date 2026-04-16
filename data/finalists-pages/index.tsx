import { FINALISTS_2021_PAGE_CONFIG } from '@/data/finalists-pages/2021';
import { FINALISTS_2022_PAGE_CONFIG } from '@/data/finalists-pages/2022';
import { FINALISTS_2023_PAGE_CONFIG } from '@/data/finalists-pages/2023';
import { FINALISTS_2024_PAGE_CONFIG } from '@/data/finalists-pages/2024';
import { FINALISTS_2025_PAGE_CONFIG } from '@/data/finalists-pages/2025';
import { FINALISTS_2026_PAGE_CONFIG } from '@/data/finalists-pages/2026';
import type { FinalistsPageConfig } from '@/data/finalists-pages/types';

export { type FinalistsPageConfig } from '@/data/finalists-pages/types';

export const FINALISTS_PAGE_CONFIG = {
  '2026': FINALISTS_2026_PAGE_CONFIG,
  '2025': FINALISTS_2025_PAGE_CONFIG,
  '2024': FINALISTS_2024_PAGE_CONFIG,
  '2023': FINALISTS_2023_PAGE_CONFIG,
  '2022': FINALISTS_2022_PAGE_CONFIG,
  '2021': FINALISTS_2021_PAGE_CONFIG,
} as const satisfies Record<string, FinalistsPageConfig>;

export type FinalistsPageYear = keyof typeof FINALISTS_PAGE_CONFIG;
