import { TOPSHOP_2026_WINNER_CARDS } from '@/data/topshop_2026_winners';
import type { WinnerSplitCard } from '@/lib/results-types';

export type ClientLogoItem = {
  name: string;
  logoSrc: string;
};

export const DEFAULT_CLIENT_LOGO_SRC = '/assets/images/logo/ts_winner_logo.png';

function normalizeCompanyName(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function getAllCardWinners(card: WinnerSplitCard) {
  return [
    ...(card.multiEntity ?? []),
    ...(card.singleEntity ?? []),
    ...(card.winners ?? []),
  ];
}

/*
  Edit this map to change company logo files.
  You can use either:
  - official company name, e.g. "A&R Aviation Services"
  - normalized key, e.g. "a and r aviation services"
  If a company is not listed here, it automatically uses DEFAULT_CLIENT_LOGO_SRC.
*/
export const TOPSHOP_2026_CLIENT_LOGO_OVERRIDES: Record<string, string> = {
  'A&R Aviation Services': '/assets/images/clients/ar_logo.svg',
  'a i r s': '/assets/images/clients/airs_logo.png',
  'aar component services grand prairie': '/assets/images/winners/aar.jpg',
  'aar corporation': '/assets/images/winners/aar.jpg',
  'aero accessories inc': '/assets/images/winners/aero_accessories.jpg',
  'aero instruments and avionics': '/assets/images/clients/aero_logo.png',
  'ametek mro drake air tulsa': '/assets/images/clients/amtek_n.jpg',
  'avduct worldwide': '/assets/images/clients/avduct.png',
  'b and w aviation corp': '/assets/images/clients/b&w_logo.svg',
  'bp aero services': '/assets/images/winners/bp_aero.jpg',
  'emc aerospace inc': '/assets/images/clients/emc_aerospace.webp',
  'evans composites inc': '/assets/images/clients/evans.png',
  'ga telesis landing gear services llc': '/assets/images/winners/GA_Tele.jpg',
  'heico repair group aerostructures': '/assets/images/clients/heico_new.png',
  'hrd aero systems inc': '/assets/images/clients/hrd_new.png',
  'icon aerospace llc': '/assets/images/clients/icon_aero.png',
  'iliff aircraft ata 38': '/assets/images/clients/iliff.png',
  'martec aviation': '/assets/images/clients/martec_aviation.png',
  'mti aviation': '/assets/images/clients/mti_aviation.jpg',
  'setnix llc': '/assets/images/clients/setnix.png',
  'silver wings aerospace':
    '/assets/images/clients/WencorMRO_SilverWingsAerospaceAWC_Horizontal_RGB.png',
  'soundair aviation svcs': '/assets/images/clients/soundairsm.png',
  standardaero: '/assets/images/clients/standard-aero.png',
  'summit aerospace inc': '/assets/images/clients/summit_logo.png',
  'tag aero llc': '/assets/images/clients/tag_aero.jpg',
  'unicorp systems inc': '/assets/images/clients/unicorp.png',
  'vse aviation services fl': '/assets/images/clients/vse.gif',
  'vse aviation services ky': '/assets/images/clients/vse.gif',
};

const normalizedClientLogoOverrides = Object.fromEntries(
  Object.entries(TOPSHOP_2026_CLIENT_LOGO_OVERRIDES).map(([companyName, logoSrc]) => [
    normalizeCompanyName(companyName),
    logoSrc,
  ]),
);

export const TOPSHOP_2026_CLIENTS: ClientLogoItem[] = Array.from(
  TOPSHOP_2026_WINNER_CARDS.reduce((uniqueByCompany, card) => {
    for (const winner of getAllCardWinners(card)) {
      const normalizedName = winner.replace(/\s+/g, ' ').trim();
      if (!normalizedName) {
        continue;
      }

      const key = normalizeCompanyName(normalizedName);
      if (!uniqueByCompany.has(key)) {
        uniqueByCompany.set(key, normalizedName);
      }
    }

    return uniqueByCompany;
  }, new Map<string, string>()),
)
  .map(([key, name]) => ({
    name,
    logoSrc: normalizedClientLogoOverrides[key] ?? DEFAULT_CLIENT_LOGO_SRC,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));
