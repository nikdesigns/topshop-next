import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Finalists2026Listing } from '@/components/finalists-2026-listing';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { parseFinalistsCardsHtml } from '@/lib/parse-finalists-cards';
import { SITE_URL } from '@/lib/site';

const finalistsCardsHtml = readFileSync(
  join(process.cwd(), 'data', 'topshop_2026_finalist_cards.html'),
  'utf8',
);
const finalistsCards = parseFinalistsCardsHtml(finalistsCardsHtml);

export const metadata: Metadata = {
  title: '2026 Top Shop Finalists | Top Shop Awards',
  description:
    'Official 2026 Top Shop Awards finalists by repair category, including multi-entity and single-entity facilities.',
  alternates: {
    canonical: `${SITE_URL}/topshop_2026_finalist.html`,
  },
};

export default function Topshop2026FinalistsPage() {
  return (
    <div className="app-shell finalists-2026-page-shell">
      <SiteHeader />
      <main>
        <section className="finalists-2026-page-title">
          <div className="finalists-2026-page-title-bg" aria-hidden="true">
            <Image
              src="/assets/images/page-titles/33.jpg"
              alt=""
              fill
              sizes="100vw"
              className="finalists-2026-page-title-image"
              priority
            />
          </div>
          <div className="section-pad">
            <div className="content-wrap finalists-2026-page-title-content">
              <h1>2026 Top Shop Finalists</h1>
              <p>
                <Link href="/">Home</Link> / <span>2026 Finalists</span>
              </p>
            </div>
          </div>
        </section>

        <section className="finalists-2026-intro section-pad">
          <div className="content-wrap finalists-2026-intro-grid">
            <aside className="finalists-2026-logo-card">
              <h2>Top Shops 2026 Finalists</h2>
              <Image
                src="/assets/images/logo/ts_2026_finalist.png"
                alt="Top Shops 2026 Finalists badge"
                width={300}
                height={300}
                className="finalists-2026-logo"
              />
            </aside>

            <article className="finalists-2026-copy">
              <p>
                We are pleased to announce the finalists for the 2026 Top Shop Awards. Since the
                awards were introduced in 2008, participation has grown exponentially. This
                year&apos;s response led to 19 categories expanding into Multi-Entity and Single
                Entity divisions.
              </p>
              <p>
                We experienced another record-breaking year, with 220 shops receiving nominations
                across 30 categories.
              </p>
              <p>
                Thank you to everyone who submitted nominations. We also congratulate this
                year&apos;s finalists, selected from an exceptionally competitive field.
              </p>

              <div className="finalists-2026-important">
                <p>
                  <strong>IMPORTANT:</strong> The winner selection phase will begin{' '}
                  <strong>Friday, January 9th</strong> via The145 website. The voting ballot will
                  be visible to airlines and suppliers only.
                </p>
                <p>
                  <strong>Voting for Top Shop WINNERS opens:</strong> Friday, January 9th
                  <br />
                  <strong>Voting ends:</strong> Friday, January 30th
                </p>
                <h3>Second round voting details:</h3>
                <ul>
                  <li>Only airlines and suppliers are eligible to vote.</li>
                  <li>Each voter must have their own login at www.the145.com.</li>
                  <li>Non-members can register for free to submit their votes.</li>
                  <li>Only one vote per person, but multiple people per facility can vote.</li>
                  <li>
                    Categories with Multi-Entity and Single Entity divisions allow one selection per
                    division.
                  </li>
                </ul>
              </div>

              <p className="finalists-2026-callout">
                Below are the 2026 Top Shop Finalists by repair category:
              </p>
            </article>
          </div>
        </section>

        <Finalists2026Listing cards={finalistsCards} />
      </main>
      <SiteFooter />
    </div>
  );
}
