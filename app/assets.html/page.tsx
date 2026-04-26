import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { ProtectedAssetsLibrary } from '@/components/protected-assets-library';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Badge } from '@/components/ui/badge';
import { YEAR_ASSET_BUNDLES } from '@/lib/assets-downloads';
import { SITE_URL } from '@/lib/site';

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
            <header className="assets-library-header site-prose">
              <Badge variant="secondary" className="assets-library-badge">
                <ShieldCheck size={12} aria-hidden="true" />
                <span>Official Assets Center</span>
              </Badge>
              <h2>Download Brand Assets</h2>
              <p>
                Enterprise-ready asset hub with year filters, permission-aware access controls,
                and production export formats for winner, finalist, and vote campaigns.
              </p>
            </header>

            <ProtectedAssetsLibrary bundles={YEAR_ASSET_BUNDLES} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
