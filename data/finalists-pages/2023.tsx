import type { FinalistsPageConfig } from '@/data/finalists-pages/types';

export const FINALISTS_2023_PAGE_CONFIG = {
  year: '2023',
  description:
    'Official 2023 Top Shop Awards finalists by repair category, selected from a record nomination season.',
  canonicalPath: '/topshop_2023_finalist.html',
  titleImageSrc: '/assets/images/page-titles/32.jpg',
  cardsFile: 'topshop_2023_finalist_cards.html',
  logo: {
    heading: 'Top Shops 2023 Finalists',
    imageSrc: '/assets/images/logo/topshop_finalist_2023_512.png',
    imageAlt: 'Top Shops 2023 Finalists badge',
    width: 300,
    height: 300,
  },
  introContent: (
    <>
      <p>
        The 2023 nomination season reached a new high with <strong>30,094 nominations</strong>{' '}
        submitted for <strong>271 repair centers</strong>.
      </p>
      <p>
        The most contested categories were Electro-Mechanical and Accessories Class I, II, and III.
      </p>
      <p>
        Thank you to everyone who submitted nominations, and congratulations to all 2023 finalists.
      </p>

      <div className="finalists-results-important">
        <p>
          <strong>IMPORTANT:</strong> Beginning Friday, January 6, airlines and suppliers selected
          winners via The145 voting pop-up.
        </p>
        <p>
          <strong>Voting period:</strong> January 6 through January 31, 2023
        </p>
      </div>

      <p className="finalists-results-callout">Below are the 2023 finalists by repair category:</p>
    </>
  ),
} as const satisfies FinalistsPageConfig;
