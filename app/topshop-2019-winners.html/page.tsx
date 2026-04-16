import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SITE_URL } from '@/lib/site';

const winnersCardsHtml = readFileSync(
  join(process.cwd(), 'data', 'topshop_2019_winners_cards.html'),
  'utf8',
);

export const metadata: Metadata = {
  title: '2019 Top Shop Winners | Top Shop Awards',
  description:
    'Official 2019 Top Shop Awards winners by repair category, including winner names and contact details.',
  alternates: {
    canonical: `${SITE_URL}/topshop-2019-winners.html`,
  },
};

export default function Topshop2019WinnersPage() {
  return (
    <div className="app-shell winners-2025-page-shell">
      <SiteHeader />
      <main>
        <section className="winners-2025-page-title">
          <div className="winners-2025-page-title-bg" aria-hidden="true">
            <Image
              src="/assets/images/page-titles/4.jpg"
              alt=""
              fill
              sizes="100vw"
              className="winners-2025-page-title-image"
              priority
            />
          </div>
          <div className="section-pad">
            <div className="content-wrap winners-2025-page-title-content">
              <h1>2019 Top Shop Winners</h1>
              <p>
                <Link href="/">Home</Link> / <span>2019 Winners</span>
              </p>
            </div>
          </div>
        </section>

        <section className="winners-2025-intro section-pad">
          <div className="content-wrap winners-2025-intro-grid is-single">
            <article className="winners-2025-copy">
              <p>
                The official 2019 Top Shop winners are listed below by repair category, including
                company names and contact details as published during the awards cycle.
              </p>
              <p className="winners-2025-callout">Below are the 2019 winners by repair category:</p>
            </article>
          </div>
        </section>

        <section className="winners-2025-listing section-pad">
          <div className="content-wrap">
            <div
              className="winners-legacy-feature-markup"
              dangerouslySetInnerHTML={{ __html: winnersCardsHtml }}
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
