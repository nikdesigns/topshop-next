import type { WinnersPageConfig } from '@/data/winners-pages/types';

export const WINNERS_2020_PAGE_CONFIG = {
  year: '2020',
  variant: 'legacy',
  description:
    'Official 2020 Top Shop Awards winners by repair category, including winner names and contact details.',
  canonicalPath: '/topshop-2020-winners.html',
  titleImageSrc: '/assets/images/page-titles/4.jpg',
  singleIntroColumn: true,
  introContent: (
    <>
      <p>
        The official 2020 Top Shop winners are listed below by repair category, including company
        names and contact details as published during the awards cycle.
      </p>
      <p className="winners-2025-callout">Below are the 2020 winners by repair category:</p>
    </>
  ),
  cardsFile: 'topshop_2020_winners_cards.html',
} as const satisfies WinnersPageConfig;
