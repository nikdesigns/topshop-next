import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SITE_URL } from '@/lib/site';

const finalistsCardsHtml = readFileSync(
  join(process.cwd(), 'data', 'topshop_2021_finalist_cards.html'),
  'utf8',
);

export const metadata: Metadata = {
  title: '2021 Top Shop Finalists | Top Shop Awards',
  description:
    'Official 2021 Top Shop Awards finalists by repair category, including complete shortlist categories.',
  alternates: {
    canonical: `${SITE_URL}/topshop_2021_finalist.html`,
  },
};

export default function Topshop2021FinalistsPage() {
  return (
    <div className="app-shell finalists-2026-page-shell">
      <SiteHeader />
      <main>
        <section className="finalists-2026-page-title">
          <div className="finalists-2026-page-title-bg" aria-hidden="true">
            <Image
              src="/assets/images/page-titles/4.jpg"
              alt=""
              fill
              sizes="100vw"
              className="finalists-2026-page-title-image"
              priority
            />
          </div>
          <div className="section-pad">
            <div className="content-wrap finalists-2026-page-title-content">
              <h1>2021 Top Shop Finalists</h1>
              <p>
                <Link href="/">Home</Link> / <span>2021 Finalists</span>
              </p>
            </div>
          </div>
        </section>

        <section className="finalists-2026-intro section-pad">
          <div className="content-wrap finalists-2026-intro-grid is-single">
            <article className="finalists-2026-copy">
              <p>
                The 2021 Top Shop Awards received <strong>10,127 nominations</strong>, one of the
                largest nomination cycles in program history at that time.
              </p>
              <p>
                Congratulations to all finalists and thank you to everyone who voted in 2020 to
                make this shortlist possible.
              </p>
              <p>
                Phase two opened for airlines and suppliers to vote for their preferred repair
                shops through The145.
              </p>
              <p className="finalists-2026-callout">
                Below is the list of 2021 finalists by repair category:
              </p>
            </article>
          </div>
        </section>

        <section className="finalists-2026-listing section-pad">
          <div className="content-wrap finalists-2026-markup-wrap">
            <div
              className="finalists-2026-markup"
              dangerouslySetInnerHTML={{ __html: finalistsCardsHtml }}
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
