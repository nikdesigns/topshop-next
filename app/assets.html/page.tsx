import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Download, ExternalLink, Mail, ShieldCheck } from 'lucide-react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CONTACT_EMAIL, CONTACT_MAILTO_HREF } from '@/lib/contact';
import { SITE_URL } from '@/lib/site';

const ASSET_YEARS = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019] as const;

type AssetYear = (typeof ASSET_YEARS)[number];

type AssetSeed = {
  src: string;
  width: number;
  height: number;
  dimensionsLabel: string;
  previewMode?: 'square' | 'wide';
};

type DownloadAssetCard = {
  kind: 'download';
  id: string;
  title: string;
  description: string;
  src: string;
  width: number;
  height: number;
  dimensionsLabel: string;
  downloadName: string;
  previewMode?: 'square' | 'wide';
};

type RequestAssetCard = {
  kind: 'request';
  id: string;
  title: string;
  description: string;
  requestHref: string;
  requestLabel: string;
};

type YearAssetCard = DownloadAssetCard | RequestAssetCard;

type YearAssetBundle = {
  year: AssetYear;
  isLegacy: boolean;
  note: string;
  cards: YearAssetCard[];
};

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

const YEAR_ASSET_BUNDLES: YearAssetBundle[] = ASSET_YEARS.map((year) => {
  const finalistAsset = FINALIST_ASSETS_BY_YEAR[year];
  const winnerAsset = WINNER_ASSETS_BY_YEAR[year] ?? LEGACY_WINNER_ASSET;
  const hasDedicatedWinnerAsset = Boolean(WINNER_ASSETS_BY_YEAR[year]);
  const cards: YearAssetCard[] = [];

  if (finalistAsset) {
    cards.push({
      kind: 'download',
      id: `${year}-finalist-logo`,
      title: `${year} Finalist Logo`,
      description: `Official finalist logo for the ${year} Top Shop Awards cycle.`,
      src: finalistAsset.src,
      width: finalistAsset.width,
      height: finalistAsset.height,
      dimensionsLabel: finalistAsset.dimensionsLabel,
      downloadName: `top-shop-finalist-${year}.png`,
      previewMode: finalistAsset.previewMode,
    });
  } else {
    cards.push({
      kind: 'request',
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
  });

  const isLegacy = !finalistAsset || !hasDedicatedWinnerAsset;

  return {
    year,
    isLegacy,
    note: isLegacy
      ? `Legacy ${year} pack: vote and winner assets are available instantly. Finalist logo may require support release.`
      : `Full ${year} pack is available for direct download.`,
    cards,
  };
});

export const metadata: Metadata = {
  title: 'Brand Assets | Top Shop Awards',
  description:
    'Download official Top Shop Awards assets by year, including finalist logos, vote button artwork, and winner logos from 2019 onward.',
  alternates: {
    canonical: `${SITE_URL}/assets.html`,
  },
};

export default function AssetsPage() {
  return (
    <div className="app-shell assets-page-shell">
      <SiteHeader />
      <main>
        <section className="assets-page-title">
          <div className="assets-page-title-bg" aria-hidden="true">
            <Image
              src="/assets/images/page-titles/4.jpg"
              alt=""
              fill
              sizes="100vw"
              className="assets-page-title-image"
              priority
            />
          </div>
          <div className="section-pad">
            <div className="content-wrap assets-page-title-content">
              <h1>Download Brand Assets</h1>
              <p>
                <Link href="/">Home</Link> / <span>Assets</span>
              </p>
            </div>
          </div>
        </section>

        <section className="assets-library section-pad">
          <div className="content-wrap assets-library-wrap">
            <header className="assets-library-header">
              <Badge variant="secondary" className="assets-library-badge">
                <ShieldCheck size={12} aria-hidden="true" />
                <span>Official Assets Center</span>
              </Badge>
              <h2>Download By Year (2019 Onward)</h2>
              <p>
                Pick any year and download its approved finalist, vote, and winner artwork.
              </p>
              <nav className="assets-quick-links" aria-label="Asset years">
                {YEAR_ASSET_BUNDLES.map((bundle) => (
                  <Link key={bundle.year} href={`#asset-year-${bundle.year}`}>
                    {bundle.year}
                  </Link>
                ))}
              </nav>
            </header>

            {YEAR_ASSET_BUNDLES.map((bundle) => (
              <section key={bundle.year} id={`asset-year-${bundle.year}`} className="assets-group">
                <div className="assets-group-head">
                  <div className="assets-group-head-top">
                    <Badge variant={bundle.isLegacy ? 'subtle' : 'success'}>
                      {bundle.isLegacy ? 'Legacy Kit' : 'Full Kit'}
                    </Badge>
                    <h3>{bundle.year} Asset Library</h3>
                  </div>
                  <p className="assets-group-year-note">{bundle.note}</p>
                </div>

                <div className="assets-grid">
                  {bundle.cards.map((asset) => (
                    <article key={asset.id} className="assets-card">
                      {asset.kind === 'download' ? (
                        <div
                          className={`assets-card-preview${asset.previewMode === 'wide' ? ' is-wide' : ''}`}
                        >
                          <Image
                            src={asset.src}
                            alt={asset.title}
                            width={asset.width}
                            height={asset.height}
                            className="assets-card-preview-image"
                          />
                        </div>
                      ) : (
                        <div className="assets-card-preview is-placeholder">
                          <p className="assets-card-preview-note">Finalist logo is available on request.</p>
                        </div>
                      )}

                      <div className="assets-card-copy">
                        <h4>{asset.title}</h4>
                        <p>{asset.description}</p>
                        {asset.kind === 'download' ? (
                          <p className="assets-card-meta">
                            PNG <span aria-hidden="true">•</span> {asset.dimensionsLabel}
                          </p>
                        ) : (
                          <p className="assets-card-meta">Managed By Support</p>
                        )}

                        {asset.kind === 'download' ? (
                          <div className="assets-card-actions">
                            <Button asChild size="sm">
                              <a href={asset.src} download={asset.downloadName}>
                                <Download size={14} aria-hidden="true" />
                                Download
                              </a>
                            </Button>
                            <Button asChild variant="outline" size="sm">
                              <a href={asset.src} target="_blank" rel="noopener noreferrer">
                                <ExternalLink size={14} aria-hidden="true" />
                                Preview
                              </a>
                            </Button>
                          </div>
                        ) : (
                          <div className="assets-card-actions is-single">
                            <Button asChild variant="outline" size="sm">
                              <a href={asset.requestHref}>
                                <Mail size={14} aria-hidden="true" />
                                {asset.requestLabel}
                              </a>
                            </Button>
                          </div>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}

            <section className="assets-usage-note">
              <h3>Usage Guidelines</h3>
              <p>
                Use these files only for your approved season status. Do not alter logo
                proportions, colors, or typography.
              </p>
              <p>
                For alternate formats or custom dimensions, email{' '}
                <a href={CONTACT_MAILTO_HREF}>{CONTACT_EMAIL}</a>.
              </p>
            </section>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
