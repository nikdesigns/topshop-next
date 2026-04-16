import type { FinalistsPageConfig } from '@/data/finalists-pages/types';

export const FINALISTS_2026_PAGE_CONFIG = {
  year: '2026',
  description:
    'Official 2026 Top Shop Awards finalists by repair category, including multi-entity and single-entity facilities.',
  canonicalPath: '/topshop_2026_finalist.html',
  titleImageSrc: '/assets/images/page-titles/33.jpg',
  cardsFile: 'topshop_2026_finalist_cards.html',
  logo: {
    heading: 'Top Shops 2026 Finalists',
    imageSrc: '/assets/images/logo/ts_2026_finalist.png',
    imageAlt: 'Top Shops 2026 Finalists badge',
    width: 300,
    height: 300,
  },
  introContent: (
    <>
      <p>
        We are pleased to announce the finalists for the 2026 Top Shop Awards. Since the awards were
        introduced in 2008, participation has grown exponentially. This year&apos;s response led to 19
        categories expanding into Multi-Entity and Single Entity divisions.
      </p>
      <p>
        We experienced another record-breaking year, with 220 shops receiving nominations across 30
        categories.
      </p>
      <p>
        Thank you to everyone who submitted nominations. We also congratulate this year&apos;s finalists,
        selected from an exceptionally competitive field.
      </p>

      <div className="finalists-2026-important">
        <p>
          <strong>IMPORTANT:</strong> The winner selection phase will begin{' '}
          <strong>Friday, January 9th</strong> via The145 website. The voting ballot will be visible to
          airlines and suppliers only.
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
            Categories with Multi-Entity and Single Entity divisions allow one selection per division.
          </li>
        </ul>
      </div>

      <p className="finalists-2026-callout">Below are the 2026 Top Shop Finalists by repair category:</p>
    </>
  ),
} as const satisfies FinalistsPageConfig;
