import {
  AWARDS_FINALIST_LINKS,
  AWARDS_WINNER_LINKS,
  LATEST_FINALISTS_LINK,
  LATEST_WINNERS_LINK,
} from '@/lib/awards-links';

type AwardsRouteTarget =
  | {
      kind: 'winners';
      year: (typeof AWARDS_WINNER_LINKS)[number]['year'];
    }
  | {
      kind: 'finalists';
      year: (typeof AWARDS_FINALIST_LINKS)[number]['year'];
    };

function canonicalToSlug(canonicalPath: string): string {
  return canonicalPath.startsWith('/') ? canonicalPath.slice(1) : canonicalPath;
}

export const AWARDS_ROUTE_MAP: Record<string, AwardsRouteTarget> = {};

for (const link of AWARDS_WINNER_LINKS) {
  AWARDS_ROUTE_MAP[canonicalToSlug(link.href)] = {
    kind: 'winners',
    year: link.year,
  };
}

for (const link of AWARDS_FINALIST_LINKS) {
  AWARDS_ROUTE_MAP[canonicalToSlug(link.href)] = {
    kind: 'finalists',
    year: link.year,
  };
}

export const AWARDS_ROUTE_SLUGS = Object.keys(AWARDS_ROUTE_MAP);

type AwardsRouteEntry = {
  year: string;
  href: string;
  label: string;
};

export const AWARDS_WINNER_ROUTE_ENTRIES: AwardsRouteEntry[] = [...AWARDS_WINNER_LINKS];

export const AWARDS_FINALIST_ROUTE_ENTRIES: AwardsRouteEntry[] = [...AWARDS_FINALIST_LINKS];

export const LATEST_WINNERS_ROUTE = LATEST_WINNERS_LINK;

export const LATEST_FINALISTS_ROUTE = LATEST_FINALISTS_LINK;
