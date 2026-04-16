import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SITE_URL } from '@/lib/site';

const finalistsCardsHtml = readFileSync(
  join(process.cwd(), 'data', 'topshop_2025_finalist_cards.html'),
  'utf8',
);

export const metadata: Metadata = {
  title: '2025 Top Shop Finalists | Top Shop Awards',
  description:
    'Official 2025 Top Shop Awards finalists by repair category, selected from a record nomination field.',
  alternates: {
    canonical: `${SITE_URL}/topshop_2025_finalist.html`,
  },
};

export default function Topshop2025FinalistsPage() {
  return (
    <div className="app-shell finalists-2026-page-shell">
      <SiteHeader />
      <main>
        <section className="finalists-2026-page-title">
          <div className="finalists-2026-page-title-bg" aria-hidden="true">
            <Image
              src="/assets/images/page-titles/31.jpg"
              alt=""
              fill
              sizes="100vw"
              className="finalists-2026-page-title-image"
              priority
            />
          </div>
          <div className="section-pad">
            <div className="content-wrap finalists-2026-page-title-content">
              <h1>2025 Top Shop Finalists</h1>
              <p>
                <Link href="/">Home</Link> / <span>2025 Finalists</span>
              </p>
            </div>
          </div>
        </section>

        <section className="finalists-2026-intro section-pad">
          <div className="content-wrap finalists-2026-intro-grid">
            <aside className="finalists-2026-logo-card">
              <h2>Top Shops 2025 Finalists</h2>
              <Image
                src="/assets/images/logo/ts_2025_finalist.png"
                alt="Top Shops 2025 Finalists badge"
                width={300}
                height={300}
                className="finalists-2026-logo"
              />
            </aside>

            <article className="finalists-2026-copy">
              <p>
                We are pleased to announce the finalists for the 2025 Top Shop Awards. This year
                delivered a total of <strong>15,278 nominations</strong> submitted for{' '}
                <strong>198 repair centers</strong>.
              </p>
              <p>
                The most contested categories were Accessories Class I, II, and III (3,053
                nominations) and Hydraulics (1,158 nominations).
              </p>
              <p>
                Thank you to everyone who participated by submitting nominations. Congratulations to
                all finalists selected from this highly competitive field.
              </p>

              <div className="finalists-2026-important">
                <p>
                  <strong>IMPORTANT:</strong> Winner selection opened Friday, January 10, 2025 on
                  The145 website for airlines and suppliers only.
                </p>
                <p>
                  <strong>Voting period:</strong> January 10 to January 31, 2025
                </p>
              </div>

              <p className="finalists-2026-callout">
                Below are the 2025 finalists by repair category:
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
