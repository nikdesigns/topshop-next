import type { FinalistsPageConfig } from '@/data/finalists-pages/types';

export const FINALISTS_2024_PAGE_CONFIG = {
  year: '2024',
  description:
    'Official 2024 Top Shop Awards finalists by repair category, selected from a large global nomination base.',
  canonicalPath: '/topshop_2024_finalist.html',
  titleImageSrc: '/assets/images/page-titles/31.jpg',
  cardsFile: 'topshop_2024_finalist_cards.html',
  logo: {
    heading: 'Top Shops 2024 Finalists',
    imageSrc: '/assets/images/logo/topshop_finalist_2024_512.png',
    imageAlt: 'Top Shops 2024 Finalists badge',
    width: 300,
    height: 300,
  },
  introContent: (
    <>
      <p>
        Nominations for the 2024 Top Shop Awards delivered another banner year, with a total of{' '}
        <strong>13,803 nominations</strong> submitted for <strong>245 repair centers</strong>.
      </p>
      <p>
        The two most contested categories were Accessories Class I, II, and III and Electro-Mechanical
        repair.
      </p>
      <p>
        Thank you to everyone who submitted nominations, and congratulations to all 2024 finalists
        selected from this competitive field.
      </p>

      <div className="finalists-2026-important">
        <p>
          <strong>IMPORTANT:</strong> Winner selection began Monday, January 8, 2024 via The145 website
          for airlines and suppliers only.
        </p>
        <p>
          <strong>Voting deadline:</strong> January 31, 2024
        </p>
      </div>

      <p className="finalists-2026-callout">Below are the 2024 finalists by repair category:</p>
    </>
  ),
} as const satisfies FinalistsPageConfig;
