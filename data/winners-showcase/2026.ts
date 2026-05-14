import type { WinnerShowcaseSeed } from '@/data/winners-showcase/types';
import {
  TOPSHOP_2026_COMPANY_PROFILES,
  TOPSHOP_2026_COMPANY_PROFILE_FALLBACK,
} from '@/data/topshop_2026_company_profiles';
import { TOPSHOP_2026_WINNER_CARDS } from '@/data/topshop_2026_winners';

function normalizeCompanyName(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

const companyProfileByNormalizedKey = TOPSHOP_2026_COMPANY_PROFILES.reduce<
  Record<string, (typeof TOPSHOP_2026_COMPANY_PROFILES)[number]>
>((accumulator, profile) => {
  accumulator[normalizeCompanyName(profile.company)] = profile;

  for (const alias of profile.aliases ?? []) {
    accumulator[normalizeCompanyName(alias)] = profile;
  }

  return accumulator;
}, {});

function toWinnerSeed(
  category: string,
  company: string,
  entityType: 'multi' | 'single',
): WinnerShowcaseSeed {
  const normalizedCompany = normalizeCompanyName(company);
  const profile = companyProfileByNormalizedKey[normalizedCompany];

  return {
    category,
    company,
    address: profile?.address ?? TOPSHOP_2026_COMPANY_PROFILE_FALLBACK.address,
    phone: profile?.phone ?? TOPSHOP_2026_COMPANY_PROFILE_FALLBACK.phone,
    image: profile?.image ?? TOPSHOP_2026_COMPANY_PROFILE_FALLBACK.image,
    entityType,
  };
}

export const WINNERS_SHOWCASE_2026: WinnerShowcaseSeed[] = TOPSHOP_2026_WINNER_CARDS.flatMap(
  (card) => {
    const entries: WinnerShowcaseSeed[] = [];

    for (const company of card.multiEntity ?? []) {
      entries.push(toWinnerSeed(card.category, company, 'multi'));
    }

    for (const company of card.singleEntity ?? []) {
      entries.push(toWinnerSeed(card.category, company, 'single'));
    }

    for (const company of card.winners ?? []) {
      entries.push(toWinnerSeed(card.category, company, 'single'));
    }

    return entries;
  },
);
