import type { WinnerShowcaseSeed } from '@/data/winners-showcase/types';
import { TOPSHOP_2026_WINNER_CARDS } from '@/data/topshop_2026_winners';

const winnersShowcaseImageDir = '/assets/images/ts_winner_2026';
const fallbackWinnerImage = '/assets/images/logo/ts_winner_logo.png';

const companyImageByName: Record<string, string> = {
  'VSE Aviation Services - FL': `${winnersShowcaseImageDir}/vse.png`,
  'Setnix LLC': `${winnersShowcaseImageDir}/setnix.png`,
  'TAG Aero, LLC': `${winnersShowcaseImageDir}/tag.png`,
  'Next MRO': `${winnersShowcaseImageDir}/next.png`,
  'Aero Instruments & Avionics': `${winnersShowcaseImageDir}/aeroinst.png`,
  'JJA Aviation': `${winnersShowcaseImageDir}/jja.png`,
  'AvDUCT Worldwide': `${winnersShowcaseImageDir}/avduct.png`,
  'A.I.R.S.': `${winnersShowcaseImageDir}/airs.png`,
  'Fokker Services Group': `${winnersShowcaseImageDir}/fokker.png`,
  'Aerostar, Inc': `${winnersShowcaseImageDir}/aerostar.png`,
  'Silver Wings Aerospace': `${winnersShowcaseImageDir}/silver.png`,
  'MTI Aviation': `${winnersShowcaseImageDir}/mti.png`,
  'AAR Component Services - Grand Prairie': `${winnersShowcaseImageDir}/aar.png`,
  'BP Aero Services': `${winnersShowcaseImageDir}/bp.png`,
  StandardAero: `${winnersShowcaseImageDir}/standard.png`,
  'ATS Components DFW': `${winnersShowcaseImageDir}/ats.png`,
  'Icon Aerospace, LLC': `${winnersShowcaseImageDir}/icon.png`,
  'AvGen Aerospace': `${winnersShowcaseImageDir}/avgen.png`,
  'North Bay Aviation': `${winnersShowcaseImageDir}/north.png`,
  'Ametek MRO - Drake Air Tulsa': `${winnersShowcaseImageDir}/amtek.png`,
  'AerSale Component Solutions': `${winnersShowcaseImageDir}/aersale.png`,
  'Lift MRO': `${winnersShowcaseImageDir}/lift.png`,
  'GA Telesis Landing Gear Services, LLC': `${winnersShowcaseImageDir}/ga.png`,
  'Soundair Aviation Svcs': `${winnersShowcaseImageDir}/soundair.png`,
  'Iliff Aircraft - ATA 38': `${winnersShowcaseImageDir}/iliff.png`,
  'AOG Reaction, Inc': `${winnersShowcaseImageDir}/aog.png`,
  'MARTEC Aviation': `${winnersShowcaseImageDir}/martec.png`,
  'AeroParts Manufacturing & Repair, Inc': `${winnersShowcaseImageDir}/aero_parts.png`,
  'Evans Composites, Inc': `${winnersShowcaseImageDir}/evans.png`,
  'Aero Accessories, Inc': `${winnersShowcaseImageDir}/aeroacc.png`,
  'EMC Aerospace, Inc': `${winnersShowcaseImageDir}/emc.png`,
  'HRD Aero Systems, Inc': `${winnersShowcaseImageDir}/hrd.png`,
  'AAR Corporation': `${winnersShowcaseImageDir}/aar.png`,
  'Allflight Corporation': `${winnersShowcaseImageDir}/allflight.png`,
  'B&W Aviation Corp': `${winnersShowcaseImageDir}/bmw.png`,
};

const companyContactByName: Record<string, { address: string; phone: string }> = {
  'VSE Aviation Services - FL': {
    address: '570 NE 185th St, North Miami Beach, FL 33179',
    phone: '+1 954-316-6015',
  },
  'Setnix LLC': {
    address: '475 Bond St, Lincolnshire, IL 60069',
    phone: '+1 312-549-4459',
  },
  'TAG Aero, LLC': {
    address: '1247 Apex Dr, Rock Hill, SC 29730',
    phone: '+1 803-831-9390',
  },
  'AvDUCT Worldwide': {
    address: '1630 N. 166th East Ave. Tulsa, OK 74116',
    phone: '(918) 437-7772',
  },
  'A.I.R.S.': {
    address: '3905 Newpoint Dr, Hilliard, OH 43026',
    phone: '+1 614-876-7000',
  },
  'Fokker Services Group': {
    address: 'Hoeksteen 40, 2132 MS, Hoofddorp, Netherlands',
    phone: '+31 (0)88 6280 000',
  },
  'Silver Wings Aerospace': {
    address: '25400 SW 140th Ave, Princeton, FL 33032',
    phone: '+1 305-258-5950',
  },
  'MTI Aviation': {
    address: '13150 NW 45th Avenue, Miami, FL 33054',
    phone: '305-817-4244',
  },
  'BP Aero Services': {
    address: '4961 Hanson Dr, Irving, TX 75038',
    phone: '972-252-2800',
  },
  StandardAero: {
    address: '11550 Mosteller Rd, Cincinnati, OH 45241',
    phone: '+1 513-618-9588',
  },
  'North Bay Aviation': {
    address: '424 Executive Ct N STE E, Fairfield, CA 94534',
    phone: '+1 707-863-4970',
  },
  'Ametek MRO - Drake Air Tulsa': {
    address: '4085 Southwest Blvd, Tulsa, OK 74107',
    phone: '+1 918-445-3545',
  },
  'Lift MRO': {
    address: '5475 NW 72nd Ave, Miami, FL 33166',
    phone: '+1 305-574-9932',
  },
  'GA Telesis Landing Gear Services, LLC': {
    address: '1855 Griffin Rd, Dania Beach, FL 33004',
    phone: '+1 954-676-3111',
  },
  'Soundair Aviation Svcs': {
    address: '1826 Bickford Ave, Snohomish, WA 98290',
    phone: '(360) 453-2300',
  },
  'MARTEC Aviation': {
    address: '3980 W 104th St Suite 1, Hialeah, FL 33018',
    phone: '+1 305-456-7563',
  },
  'Evans Composites, Inc': {
    address: '300 S Wisteria St, Mansfield, TX 76063',
    phone: '+1 817-477-9014',
  },
  'Aero Accessories, Inc': {
    address: '2110 N Marshall Ave, El Cajon, CA 92020',
    phone: '+1 619-448-2558',
  },
  'EMC Aerospace, Inc': {
    address: '570 NE 185th St, North Miami Beach, FL 33179',
    phone: '+1 954-316-6015',
  },
  'HRD Aero Systems, Inc': {
    address: '25555 Avenue Stanford, Valencia, CA 91355',
    phone: '+1 661-407-2772',
  },
  'AAR Corporation': {
    address: '1100 N Wood Dale Rd, Wood Dale, IL 60191',
    phone: '+1 630-227-2000',
  },
  'Allflight Corporation': {
    address: '20014 70th Ave S, Kent, WA 98032',
    phone: '+1 253-437-0582',
  },
};

function normalizeCompanyName(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

const imageByNormalizedCompany = Object.fromEntries(
  Object.entries(companyImageByName).map(([company, image]) => [normalizeCompanyName(company), image]),
);

const contactByNormalizedCompany = Object.fromEntries(
  Object.entries(companyContactByName).map(([company, contact]) => [
    normalizeCompanyName(company),
    contact,
  ]),
);

function toWinnerSeed(
  category: string,
  company: string,
  entityType: 'multi' | 'single',
): WinnerShowcaseSeed {
  const normalizedCompany = normalizeCompanyName(company);
  const contact = contactByNormalizedCompany[normalizedCompany] ?? {
    address: 'Contact The145 for official winner contact details.',
    phone: 'N/A',
  };

  return {
    category,
    company,
    address: contact.address,
    phone: contact.phone,
    image: imageByNormalizedCompany[normalizedCompany] ?? fallbackWinnerImage,
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
