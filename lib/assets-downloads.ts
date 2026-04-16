import { CONTACT_MAILTO_HREF } from '@/lib/contact';

export const ASSET_YEARS = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019] as const;

export type AssetYear = (typeof ASSET_YEARS)[number];

const LOGO_SIZE_VARIANTS = [
  { key: 'xl', label: 'XL', scale: 1 },
  { key: 'lg', label: 'LG', scale: 0.75 },
  { key: 'md', label: 'MD', scale: 0.5 },
  { key: 'sm', label: 'SM', scale: 0.25 },
] as const;

type AssetSizeKey = (typeof LOGO_SIZE_VARIANTS)[number]['key'];

type AssetSeed = {
  src: string;
  width: number;
  height: number;
  dimensionsLabel: string;
  previewMode?: 'square' | 'wide';
  variantSrcBySize?: Partial<Record<AssetSizeKey, string>>;
};

export type AssetSizeVariant = {
  key: AssetSizeKey;
  label: 'XL' | 'LG' | 'MD' | 'SM';
  src: string;
  dimensionsLabel: string;
  downloadName: string;
};

export type DownloadAssetCard = {
  kind: 'download';
  protection: 'public' | 'protected';
  id: string;
  title: string;
  description: string;
  src: string;
  width: number;
  height: number;
  dimensionsLabel: string;
  downloadName: string;
  previewMode?: 'square' | 'wide';
  variants?: AssetSizeVariant[];
};

export type RequestAssetCard = {
  kind: 'request';
  protection: 'protected';
  id: string;
  title: string;
  description: string;
  requestHref: string;
  requestLabel: string;
};

export type YearAssetCard = DownloadAssetCard | RequestAssetCard;

export type YearAssetBundle = {
  year: AssetYear;
  isLegacy: boolean;
  note: string;
  cards: YearAssetCard[];
};

function formatDimensions(width: number, height: number) {
  return `${width} x ${height}`;
}

function buildLogoVariants(seed: AssetSeed, baseDownloadName: string): AssetSizeVariant[] {
  return LOGO_SIZE_VARIANTS.map((variant) => {
    const width = Math.max(1, Math.round(seed.width * variant.scale));
    const height = Math.max(1, Math.round(seed.height * variant.scale));

    return {
      key: variant.key,
      label: variant.label,
      src: seed.variantSrcBySize?.[variant.key] ?? seed.src,
      dimensionsLabel: formatDimensions(width, height),
      downloadName: `${baseDownloadName}-${variant.key}.png`,
    };
  });
}

const FINALIST_ASSETS_BY_YEAR: Partial<Record<AssetYear, AssetSeed>> = {
  2026: {
    src: '/assets/images/logo/ts_2026_finalist.png',
    width: 512,
    height: 512,
    dimensionsLabel: '512 x 512',
  },
  2025: {
    src: '/assets/images/logo/ts_2025_finalist.png',
    width: 512,
    height: 512,
    dimensionsLabel: '512 x 512',
  },
  2024: {
    src: '/assets/images/logo/topshop_finalist_2024_512.png',
    width: 512,
    height: 512,
    dimensionsLabel: '512 x 512',
  },
  2023: {
    src: '/assets/images/logo/topshop_finalist_2023_512.png',
    width: 512,
    height: 491,
    dimensionsLabel: '512 x 491',
  },
};

const WINNER_ASSETS_BY_YEAR: Partial<Record<AssetYear, AssetSeed>> = {
  2026: {
    src: '/assets/images/logo/top_shop_logo_2026.png',
    width: 512,
    height: 513,
    dimensionsLabel: '512 x 513',
  },
  2025: {
    src: '/assets/images/logo/top_shop_logo_2025.png',
    width: 418,
    height: 417,
    dimensionsLabel: '418 x 417',
  },
};

const LEGACY_WINNER_ASSET: AssetSeed = {
  src: '/assets/images/logo/ts_winner_logo.png',
  width: 418,
  height: 417,
  dimensionsLabel: '418 x 417',
};

const VOTE_BUTTON_ASSET: AssetSeed = {
  src: '/assets/images/button/topshop_vote_button.png',
  width: 326,
  height: 88,
  dimensionsLabel: '326 x 88',
  previewMode: 'wide',
};

const LEGACY_FINALIST_REQUEST_HREF = `${CONTACT_MAILTO_HREF}?subject=${encodeURIComponent(
  'Top Shop Awards Legacy Finalist Logo Request',
)}`;

export const YEAR_ASSET_BUNDLES: YearAssetBundle[] = ASSET_YEARS.map((year) => {
  const finalistAsset = FINALIST_ASSETS_BY_YEAR[year];
  const winnerAsset = WINNER_ASSETS_BY_YEAR[year] ?? LEGACY_WINNER_ASSET;
  const hasDedicatedWinnerAsset = Boolean(WINNER_ASSETS_BY_YEAR[year]);
  const cards: YearAssetCard[] = [];

  if (finalistAsset) {
    cards.push({
      kind: 'download',
      protection: 'protected',
      id: `${year}-finalist-logo`,
      title: `${year} Finalist Logo`,
      description: `Official finalist logo for the ${year} Top Shop Awards cycle.`,
      src: finalistAsset.src,
      width: finalistAsset.width,
      height: finalistAsset.height,
      dimensionsLabel: finalistAsset.dimensionsLabel,
      downloadName: `top-shop-finalist-${year}.png`,
      previewMode: finalistAsset.previewMode,
      variants: buildLogoVariants(finalistAsset, `top-shop-finalist-${year}`),
    });
  } else {
    cards.push({
      kind: 'request',
      protection: 'protected',
      id: `${year}-finalist-request`,
      title: `${year} Finalist Logo`,
      description:
        'This legacy finalist file is managed manually. Request the certified logo pack from support.',
      requestHref: LEGACY_FINALIST_REQUEST_HREF,
      requestLabel: 'Request Finalist Pack',
    });
  }

  cards.push({
    kind: 'download',
    protection: 'public',
    id: `${year}-vote-button`,
    title: `${year} Vote For Us Button`,
    description: `Voting CTA button used for the ${year} campaign.`,
    src: VOTE_BUTTON_ASSET.src,
    width: VOTE_BUTTON_ASSET.width,
    height: VOTE_BUTTON_ASSET.height,
    dimensionsLabel: VOTE_BUTTON_ASSET.dimensionsLabel,
    downloadName: `top-shop-vote-button-${year}.png`,
    previewMode: VOTE_BUTTON_ASSET.previewMode,
  });

  cards.push({
    kind: 'download',
    protection: 'protected',
    id: `${year}-winner-logo`,
    title: hasDedicatedWinnerAsset ? `${year} Winner Logo` : `${year} Winner Logo (Legacy)`,
    description: hasDedicatedWinnerAsset
      ? `Official winner logo for the ${year} Top Shop Awards cycle.`
      : `Legacy winner logo package for ${year}.`,
    src: winnerAsset.src,
    width: winnerAsset.width,
    height: winnerAsset.height,
    dimensionsLabel: winnerAsset.dimensionsLabel,
    downloadName: `top-shop-winner-${year}.png`,
    previewMode: winnerAsset.previewMode,
    variants: buildLogoVariants(winnerAsset, `top-shop-winner-${year}`),
  });

  const isLegacy = !finalistAsset || !hasDedicatedWinnerAsset;

  return {
    year,
    isLegacy,
    note: isLegacy
      ? `Legacy ${year} pack: vote asset is public. Finalist and winner logos include XL, LG, MD, and SM protected variants.`
      : `Full ${year} pack includes XL, LG, MD, and SM logo variants after access validation.`,
    cards,
  };
});
