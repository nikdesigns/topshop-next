import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SITE_URL } from '@/lib/site';

const winnersCardsHtml = readFileSync(
  join(process.cwd(), 'data', 'topshop_2025_winners_cards.html'),
  'utf8',
);

export const metadata: Metadata = {
  title: '2025 Top Shop Winners | Top Shop Awards',
  description:
    'Official 2025 Top Shop Awards winners by repair category, including company logos and category highlights.',
  alternates: {
    canonical: `${SITE_URL}/topshop_2025_winners.html`,
  },
};

export default function Topshop2025WinnersPage() {
  return (
    <div className="app-shell winners-2025-page-shell">
      <SiteHeader />
      <main>
        <section className="winners-2025-page-title">
          <div className="winners-2025-page-title-bg" aria-hidden="true">
            <Image
              src="/assets/images/page-titles/49.jpg"
              alt=""
              fill
              sizes="100vw"
              className="winners-2025-page-title-image"
              priority
            />
          </div>
          <div className="section-pad">
            <div className="content-wrap winners-2025-page-title-content">
              <h1>2025 Top Shop Winners</h1>
              <p>
                <Link href="/">Home</Link> / <span>2025 Winners</span>
              </p>
            </div>
          </div>
        </section>

        <section className="winners-2025-intro section-pad">
          <div className="content-wrap winners-2025-intro-grid">
            <aside className="winners-2025-logo-card">
              <h2>Top Shops 2025 Winners</h2>
              <Image
                src="/assets/images/logo/top_shop_logo_2025.png"
                alt="Top Shops 2025 Winners badge"
                width={226}
                height={226}
                className="winners-2025-logo"
              />
            </aside>

            <article className="winners-2025-copy">
              <p>
                We are thrilled to announce this year&apos;s winners of the 145 Top Shop Awards.
                This season delivered <strong>16,063 nominations</strong> and{' '}
                <strong>10,867 winning votes</strong> across <strong>30 repair categories</strong>.
              </p>
              <p>
                Several categories saw intense competition, with multiple companies battling for the
                top spot, while others came down to a decisive head-to-head finish.
              </p>
              <p>
                Our most competitive categories by total votes included{' '}
                <strong>
                  Accessories Class I, II, and III, Engine Accessories, and Hydraulics
                </strong>
                .
              </p>
              <p>
                On behalf of <strong>The 145</strong> and repair centers worldwide, thank you to
                everyone who participated in voting. <strong>Your votes make these awards possible.</strong>
              </p>
              <p>
                Congratulations to all winners. Reaching Top Shop status reflects outstanding
                excellence and consistency.
              </p>
              <p className="winners-2025-callout">Below are the 2025 winners by repair category:</p>
            </article>
          </div>
        </section>

        <section className="winners-2025-listing section-pad">
          <div className="content-wrap">
            <div
              className="winners-2025-markup"
              dangerouslySetInnerHTML={{ __html: winnersCardsHtml }}
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
