import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SITE_URL } from '@/lib/site';

const finalistsCardsHtml = readFileSync(
  join(process.cwd(), 'data', 'topshop_2022_finalist_cards.html'),
  'utf8',
);

export const metadata: Metadata = {
  title: '2022 Top Shop Finalists | Top Shop Awards',
  description:
    'Official 2022 Top Shop Awards finalists by repair category, including full nominee shortlists by category.',
  alternates: {
    canonical: `${SITE_URL}/topshop_2022_finalist.html`,
  },
};

export default function Topshop2022FinalistsPage() {
  return (
    <div className="app-shell finalists-2026-page-shell">
      <SiteHeader />
      <main>
        <section className="finalists-2026-page-title">
          <div className="finalists-2026-page-title-bg" aria-hidden="true">
            <Image
              src="/assets/images/page-titles/46.jpg"
              alt=""
              fill
              sizes="100vw"
              className="finalists-2026-page-title-image"
              priority
            />
          </div>
          <div className="section-pad">
            <div className="content-wrap finalists-2026-page-title-content">
              <h1>2022 Top Shop Finalists</h1>
              <p>
                <Link href="/">Home</Link> / <span>2022 Finalists</span>
              </p>
            </div>
          </div>
        </section>

        <section className="finalists-2026-intro section-pad">
          <div className="content-wrap finalists-2026-intro-grid is-single">
            <article className="finalists-2026-copy">
              <p>
                Nominations for the 2022 Top Shop Awards reached{' '}
                <strong>11,557 submissions</strong> across <strong>171 repair centers</strong>.
              </p>
              <p>
                The most contested categories were Accessories Class I, II, and III, followed by
                Electro-Mechanical repair.
              </p>
              <p>
                Congratulations to this year&apos;s finalists and thank you to everyone who
                participated.
              </p>
              <div className="finalists-2026-important">
                <p>
                  <strong>IMPORTANT:</strong> Airlines and suppliers selected winners through the
                  second-round voting pop-up on The145.
                </p>
              </div>
              <p className="finalists-2026-callout">
                Below are the 2022 finalists by repair category:
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
