import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SITE_URL } from '@/lib/site';

const winnersCardsHtml = readFileSync(
  join(process.cwd(), 'data', 'topshop_2022_winners_cards.html'),
  'utf8',
);

export const metadata: Metadata = {
  title: '2022 Top Shop Winners | Top Shop Awards',
  description:
    'Official 2022 Top Shop Awards winners by repair category, including company logos and category highlights.',
  alternates: {
    canonical: `${SITE_URL}/topshop_2022_winners.html`,
  },
};

export default function Topshop2022WinnersPage() {
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
              <h1>2022 Top Shop Winners</h1>
              <p>
                <Link href="/">Home</Link> / <span>2022 Winners</span>
              </p>
            </div>
          </div>
        </section>

        <section className="winners-2025-intro section-pad">
          <div className="content-wrap winners-2025-intro-grid is-single">
            <article className="winners-2025-copy">
              <p>
                We are pleased to announce the 2022 winners of the 145 Top Shop Awards. It was a
                banner year with <strong>16,337 votes</strong> submitted across{' '}
                <strong>25 repair categories</strong>.
              </p>
              <p>
                Two categories ended in ties, and the most contested category was Best Accessories
                Class I, II, and III Repair with 1,727 votes.
              </p>
              <p>
                On behalf of <strong>The 145</strong> and all repair centers, thank you to everyone
                who participated and voted. Congratulations to all 2022 winners.
              </p>
              <p className="winners-2025-callout">Below are the 2022 winners by repair category:</p>
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
