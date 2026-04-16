import type { WinnersPageConfig } from '@/data/winners-pages/types';

export const WINNERS_2022_PAGE_CONFIG = {
  year: '2022',
  variant: 'legacy',
  description:
    'Official 2022 Top Shop Awards winners by repair category, including company logos and category highlights.',
  canonicalPath: '/topshop_2022_winners.html',
  titleImageSrc: '/assets/images/page-titles/47.jpg',
  singleIntroColumn: true,
  introContent: (
    <>
      <p>
        We are pleased to announce the 2022 winners of the 145 Top Shop Awards. It was a banner year
        with <strong>16,337 votes</strong> submitted across <strong>25 repair categories</strong>.
      </p>
      <p>
        Two categories ended in ties, and the most contested category was Best Accessories Class I, II,
        and III Repair with 1,727 votes.
      </p>
      <p>
        On behalf of <strong>The 145</strong> and all repair centers, thank you to everyone who
        participated and voted. Congratulations to all 2022 winners.
      </p>
      <p className="winners-2025-callout">Below are the 2022 winners by repair category:</p>
    </>
  ),
  cardsFile: 'topshop_2022_winners_cards.html',
} as const satisfies WinnersPageConfig;
