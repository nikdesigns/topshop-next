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
  'A.I.R.S.': '/assets/images/clients/airs_logo.png',
  'AAR Component Services - Grand Prairie': '/assets/images/clients/aar.webp',
  'AAR Corporation': '/assets/images/clients/aar.webp',
  'Aero Accessories, Inc': '/assets/images/clients/aero_acc.webp',
  'Aero Instruments & Avionics': '/assets/images/clients/aero_logo.png',
  'AeroParts Manufacturing & Repair, Inc':
    '/assets/images/clients/aero_parts.webp',
  'Aerostar, Inc': '/assets/images/clients/aerostar.webp',
  'AerSale Component Solutions': '/assets/images/clients/aersale.webp',
  'Ametek MRO - Drake Air Tulsa': '/assets/images/clients/amtek_n.jpg',
  'AllClear Repair Services': '/assets/images/clients/allclear.webp',
  'Allflight Corporation': '/assets/images/clients/allflight.webp',
  'AOG Reaction, Inc': '/assets/images/clients/aog_reaction.webp',
  'ATS Components DFW': '/assets/images/clients/ATCLogo.png',
  'AvDUCT Worldwide': '/assets/images/clients/avduct.png',
  'Aviation Inflatables': '/assets/images/clients/avi_inf.webp',
  'Aviation Repair Technologies': '/assets/images/clients/art.webp',
  'AvGen Aerospace': '/assets/images/clients/avgen.webp',
  'B&W Aviation Corp': '/assets/images/clients/b&w_logo.svg',
  'BP Aero Services': '/assets/images/clients/bp_aero.webp',
  'Cima Aviation': '/assets/images/clients/cima.webp',
  'Cobalt Aero Services': '/assets/images/clients/cobalt.webp',
  'Curtiss-Wright Surface Technologies': '/assets/images/clients/curtiss.webp',
  'CVG Aerospace': '/assets/images/clients/cvg.webp',
  'EMC Aerospace, Inc': '/assets/images/clients/emc_aerospace.webp',
  'Evans Composites, Inc': '/assets/images/clients/evans.png',
  'Fokker Services Group': '/assets/images/clients/fokker.webp',
  'GA Telesis Landing Gear Services, LLC': '/assets/images/clients/ga.webp',
  'HEICO Repair Group - Aerostructures': '/assets/images/clients/heico_new.png',
  'HRD Aero Systems, Inc': '/assets/images/clients/hrd_new.png',
  'Icon Aerospace, LLC': '/assets/images/clients/icon_aero.png',
  'Iliff Aircraft - ATA 38': '/assets/images/clients/iliff.png',
  'Innodyne Systems, LLC': '/assets/images/clients/inno.webp',
  'JJA Aviation': '/assets/images/clients/jja.webp',
  'Lift MRO': '/assets/images/clients/lift.webp',
  'MARTEC Aviation': '/assets/images/clients/martec_aviation.png',
  'MTI Aviation': '/assets/images/clients/mti_aviation.jpg',
  'Next MRO': '/assets/images/clients/next.webp',
  'North Bay Aviation': '/assets/images/clients/north.webp',
  'Setnix LLC': '/assets/images/clients/setnix.png',
  'Silver Wings Aerospace':
    '/assets/images/clients/WencorMRO_SilverWingsAerospaceAWC_Horizontal_RGB.png',
  'Soundair Aviation Svcs': '/assets/images/clients/soundairsm.png',
  StandardAero: '/assets/images/clients/standard-aero.png',
  'Summit Aerospace, Inc': '/assets/images/clients/summit_logo.png',
  'Summit Aerospace, Inc.': '/assets/images/clients/summit_logo.png',
  'TAT Technologies - Greensboro': '/assets/images/clients/tat.webp',
  'TAG Aero, LLC': '/assets/images/clients/tag_aero.jpg',
  'Unicorp Systems, Inc': '/assets/images/clients/unicorp.png',
  'VSE Aviation Services - FL': '/assets/images/clients/vse.gif',
  'VSE Aviation Services - KY': '/assets/images/clients/vse.gif',
};

const normalizedClientLogoOverrides = Object.fromEntries(
  Object.entries(TOPSHOP_2026_CLIENT_LOGO_OVERRIDES).map(
    ([companyName, logoSrc]) => [normalizeCompanyName(companyName), logoSrc],
  ),
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
