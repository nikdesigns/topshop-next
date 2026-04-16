import type { WinnersPageConfig } from '@/data/winners-pages/types';

export const WINNERS_2021_PAGE_CONFIG = {
  year: '2021',
  variant: 'legacy',
  description:
    'Official 2021 Top Shop Awards winners by repair category, including winner names and contact details.',
  canonicalPath: '/topshop-2021-winners_new.html',
  titleImageSrc: '/assets/images/page-titles/4.jpg',
  singleIntroColumn: true,
  introContent: (
    <>
      <p>
        The official 2021 Top Shop winners are listed below by repair category, including company
        names and contact details as published during the awards cycle.
      </p>
      <p className="winners-results-callout">Below are the 2021 winners by repair category:</p>
    </>
  ),
  cardsFile: 'topshop_2021_winners_cards.html',
} as const satisfies WinnersPageConfig;
