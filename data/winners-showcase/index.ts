import { WINNERS_SHOWCASE_2026 } from '@/data/winners-showcase/2026';
import { WINNERS_SHOWCASE_2025 } from '@/data/winners-showcase/2025';
import type { WinnerShowcaseSeed } from '@/data/winners-showcase/types';

export { type WinnerShowcaseSeed } from '@/data/winners-showcase/types';

export const WINNERS_SHOWCASE_BY_YEAR = {
  '2026': WINNERS_SHOWCASE_2026,
  '2025': WINNERS_SHOWCASE_2025,
} as const satisfies Record<string, WinnerShowcaseSeed[]>;

export type WinnersShowcaseYear = keyof typeof WINNERS_SHOWCASE_BY_YEAR;

const WINNERS_SHOWCASE_YEARS = Object.keys(WINNERS_SHOWCASE_BY_YEAR).sort(
  (a, b) => Number(b) - Number(a),
) as WinnersShowcaseYear[];

const LATEST_WINNERS_SHOWCASE_YEAR = WINNERS_SHOWCASE_YEARS[0] ?? '';

export function getWinnersShowcaseBundle(requestedYear: string): {
  year: string;
  seeds: WinnerShowcaseSeed[];
} {
  const resolvedYear = (requestedYear in WINNERS_SHOWCASE_BY_YEAR
    ? requestedYear
    : LATEST_WINNERS_SHOWCASE_YEAR) as WinnersShowcaseYear;

  return {
    year: resolvedYear,
    seeds: WINNERS_SHOWCASE_BY_YEAR[resolvedYear] ?? [],
  };
}
