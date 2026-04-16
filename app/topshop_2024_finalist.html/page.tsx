import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SITE_URL } from '@/lib/site';

const finalistsCardsHtml = readFileSync(
  join(process.cwd(), 'data', 'topshop_2024_finalist_cards.html'),
  'utf8',
);

export const metadata: Metadata = {
  title: '2024 Top Shop Finalists | Top Shop Awards',
  description:
    'Official 2024 Top Shop Awards finalists by repair category, selected from a large global nomination base.',
  alternates: {
    canonical: `${SITE_URL}/topshop_2024_finalist.html`,
  },
};

export default function Topshop2024FinalistsPage() {
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
              <h1>2024 Top Shop Finalists</h1>
              <p>
                <Link href="/">Home</Link> / <span>2024 Finalists</span>
              </p>
            </div>
          </div>
        </section>

        <section className="finalists-2026-intro section-pad">
          <div className="content-wrap finalists-2026-intro-grid">
            <aside className="finalists-2026-logo-card">
              <h2>Top Shops 2024 Finalists</h2>
              <Image
                src="/assets/images/logo/topshop_finalist_2024_512.png"
                alt="Top Shops 2024 Finalists badge"
                width={300}
                height={300}
                className="finalists-2026-logo"
              />
            </aside>

            <article className="finalists-2026-copy">
              <p>
                Nominations for the 2024 Top Shop Awards delivered another banner year, with a
                total of <strong>13,803 nominations</strong> submitted for <strong>245 repair centers</strong>.
              </p>
              <p>
                The two most contested categories were Accessories Class I, II, and III and
                Electro-Mechanical repair.
              </p>
              <p>
                Thank you to everyone who submitted nominations, and congratulations to all 2024
                finalists selected from this competitive field.
              </p>

              <div className="finalists-2026-important">
                <p>
                  <strong>IMPORTANT:</strong> Winner selection began Monday, January 8, 2024 via
                  The145 website for airlines and suppliers only.
                </p>
                <p>
                  <strong>Voting deadline:</strong> January 31, 2024
                </p>
              </div>

              <p className="finalists-2026-callout">
                Below are the 2024 finalists by repair category:
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
