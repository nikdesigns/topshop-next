import type { FinalistsPageConfig } from '@/data/finalists-pages/types';

export const FINALISTS_2021_PAGE_CONFIG = {
  year: '2021',
  description:
    'Official 2021 Top Shop Awards finalists by repair category, including complete shortlist categories.',
  canonicalPath: '/topshop_2021_finalist.html',
  titleImageSrc: '/assets/images/page-titles/4.jpg',
  cardsFile: 'topshop_2021_finalist_cards.html',
  singleIntroColumn: true,
  introContent: (
    <>
      <p>
        The 2021 Top Shop Awards received <strong>10,127 nominations</strong>, one of the largest
        nomination cycles in program history at that time.
      </p>
      <p>
        Congratulations to all finalists and thank you to everyone who voted in 2020 to make this
        shortlist possible.
      </p>
      <p>
        Phase two opened for airlines and suppliers to vote for their preferred repair shops through
        The145.
      </p>
      <p className="finalists-2026-callout">Below is the list of 2021 finalists by repair category:</p>
    </>
  ),
} as const satisfies FinalistsPageConfig;
