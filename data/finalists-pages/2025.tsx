import type { FinalistsPageConfig } from '@/data/finalists-pages/types';

export const FINALISTS_2025_PAGE_CONFIG = {
  year: '2025',
  description:
    'Official 2025 Top Shop Awards finalists by repair category, selected from a record nomination field.',
  canonicalPath: '/topshop_2025_finalist.html',
  titleImageSrc: '/assets/images/page-titles/31.jpg',
  cardsFile: 'topshop_2025_finalist_cards.html',
  logo: {
    heading: 'Top Shops 2025 Finalists',
    imageSrc: '/assets/images/logo/ts_2025_finalist.png',
    imageAlt: 'Top Shops 2025 Finalists badge',
    width: 300,
    height: 300,
  },
  introContent: (
    <>
      <p>
        We are pleased to announce the finalists for the 2025 Top Shop Awards. This year delivered a
        total of <strong>15,278 nominations</strong> submitted for <strong>198 repair centers</strong>.
      </p>
      <p>
        The most contested categories were Accessories Class I, II, and III (3,053 nominations) and
        Hydraulics (1,158 nominations).
      </p>
      <p>
        Thank you to everyone who participated by submitting nominations. Congratulations to all
        finalists selected from this highly competitive field.
      </p>

      <div className="finalists-2026-important">
        <p>
          <strong>IMPORTANT:</strong> Winner selection opened Friday, January 10, 2025 on The145
          website for airlines and suppliers only.
        </p>
        <p>
          <strong>Voting period:</strong> January 10 to January 31, 2025
        </p>
      </div>

      <p className="finalists-2026-callout">Below are the 2025 finalists by repair category:</p>
    </>
  ),
} as const satisfies FinalistsPageConfig;
