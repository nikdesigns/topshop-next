import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SITE_URL } from '@/lib/site';

const winnersCardsHtml = readFileSync(
  join(process.cwd(), 'data', 'topshop_2023_winners_cards.html'),
  'utf8',
);

export const metadata: Metadata = {
  title: '2023 Top Shop Winners | Top Shop Awards',
  description:
    'Official 2023 Top Shop Awards winners by repair category, including company logos and category highlights.',
  alternates: {
    canonical: `${SITE_URL}/topshop_2023_winners.html`,
  },
};

export default function Topshop2023WinnersPage() {
  return (
    <div className="app-shell winners-2025-page-shell">
      <SiteHeader />
      <main>
        <section className="winners-2025-page-title">
          <div className="winners-2025-page-title-bg" aria-hidden="true">
            <Image
              src="/assets/images/page-titles/47.jpg"
              alt=""
              fill
              sizes="100vw"
              className="winners-2025-page-title-image"
              priority
            />
          </div>
          <div className="section-pad">
            <div className="content-wrap winners-2025-page-title-content">
              <h1>2023 Top Shop Winners</h1>
              <p>
                <Link href="/">Home</Link> / <span>2023 Winners</span>
              </p>
            </div>
          </div>
        </section>

        <section className="winners-2025-intro section-pad">
          <div className="content-wrap winners-2025-intro-grid">
            <aside className="winners-2025-logo-card">
              <h2>Top Shops 2023 Winners</h2>
              <Image
                src="/assets/images/logo/ts_winner_logo.png"
                alt="Top Shops 2023 Winners badge"
                width={226}
                height={226}
                className="winners-2025-logo"
              />
            </aside>

            <article className="winners-2025-copy">
              <p>
                We are pleased to announce this year&apos;s winners of the 145 Top Shop Awards.
                This season delivered <strong>30,094 nominations</strong> and{' '}
                <strong>3,460 winning votes</strong> across <strong>28 repair categories</strong>.
              </p>
              <p>
                The most contested category was <strong>Electro-Mechanical Repair</strong>, with
                2,022 votes submitted. Several races were decided by narrow margins, including
                Airframe and Aerostructures, Fuel Systems, Transparencies, and Wheel and Brake.
              </p>
              <p>
                On behalf of <strong>The 145</strong> and all participating repair centers, thank
                you to everyone who submitted votes. Congratulations to all 2023 winners.
              </p>
              <p className="winners-2025-callout">Below are the 2023 winners by repair category:</p>
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
