import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SITE_URL } from '@/lib/site';

const winnersCardsHtml = readFileSync(
  join(process.cwd(), 'data', 'topshop_2024_winners_cards.html'),
  'utf8',
);

export const metadata: Metadata = {
  title: '2024 Top Shop Winners | Top Shop Awards',
  description:
    'Official 2024 Top Shop Awards winners by repair category, including company logos and category highlights.',
  alternates: {
    canonical: `${SITE_URL}/topshop_2024_winners.html`,
  },
};

export default function Topshop2024WinnersPage() {
  return (
    <div className="app-shell winners-2025-page-shell">
      <SiteHeader />
      <main>
        <section className="winners-2025-page-title">
          <div className="winners-2025-page-title-bg" aria-hidden="true">
            <Image
              src="/assets/images/page-titles/53.jpg"
              alt=""
              fill
              sizes="100vw"
              className="winners-2025-page-title-image"
              priority
            />
          </div>
          <div className="section-pad">
            <div className="content-wrap winners-2025-page-title-content">
              <h1>2024 Top Shop Winners</h1>
              <p>
                <Link href="/">Home</Link> / <span>2024 Winners</span>
              </p>
            </div>
          </div>
        </section>

        <section className="winners-2025-intro section-pad">
          <div className="content-wrap winners-2025-intro-grid">
            <aside className="winners-2025-logo-card">
              <h2>Top Shops 2024 Winners</h2>
              <Image
                src="/assets/images/logo/ts_lg_tans.png"
                alt="Top Shops 2024 Winners badge"
                width={226}
                height={226}
                className="winners-2025-logo"
              />
            </aside>

            <article className="winners-2025-copy">
              <p>
                We are pleased to announce this year&apos;s winners of the 145 Top Shop Awards. It
                was another amazing voting season, with a total of{' '}
                <strong>13,803 nominations</strong> and <strong>5,380 winning votes</strong>{' '}
                submitted in <strong>30 repair categories</strong>.
              </p>
              <p>
                We also saw a <strong>37% increase</strong> in winning votes cast this year versus
                last year, with 1,920 additional votes.
              </p>
              <p>
                The most contested repair category this year was{' '}
                <strong>Best Accessory Class I, II, and III Repair</strong>, with thirteen
                companies competing for the title.
              </p>
              <p>
                Several categories were decided by narrow margins, including Accessories Class I,
                II, and III, Aerostructures, and Wheel and Brake. The Ozone Repair category ended
                in a tie between Limco Air Repair and Triumph Accessory Repair - Wellington.
              </p>
              <p>
                On behalf of <strong>The 145</strong> and repair centers worldwide, thank you to
                everyone who submitted votes. <strong>Your participation makes these awards possible.</strong>
              </p>
              <p>
                Congratulations to this year&apos;s winners. If you are a Top Shop, you are doing
                something right.
              </p>
              <p className="winners-2025-callout">Below are the 2024 winners by repair category:</p>
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
