import type { FinalistsPageConfig } from '@/data/finalists-pages/types';

export const FINALISTS_2022_PAGE_CONFIG = {
  year: '2022',
  description:
    'Official 2022 Top Shop Awards finalists by repair category, including full nominee shortlists by category.',
  canonicalPath: '/topshop_2022_finalist.html',
  titleImageSrc: '/assets/images/page-titles/46.jpg',
  cardsFile: 'topshop_2022_finalist_cards.html',
  singleIntroColumn: true,
  introContent: (
    <>
      <p>
        Nominations for the 2022 Top Shop Awards reached <strong>11,557 submissions</strong> across{' '}
        <strong>171 repair centers</strong>.
      </p>
      <p>
        The most contested categories were Accessories Class I, II, and III, followed by
        Electro-Mechanical repair.
      </p>
      <p>
        Congratulations to this year&apos;s finalists and thank you to everyone who participated.
      </p>
      <div className="finalists-2026-important">
        <p>
          <strong>IMPORTANT:</strong> Airlines and suppliers selected winners through the second-round
          voting pop-up on The145.
        </p>
      </div>
      <p className="finalists-2026-callout">Below are the 2022 finalists by repair category:</p>
    </>
  ),
} as const satisfies FinalistsPageConfig;
