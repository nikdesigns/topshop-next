import type { WinnersPageConfig } from '@/data/winners-pages/types';

export const WINNERS_2023_PAGE_CONFIG = {
  year: '2023',
  variant: 'legacy',
  description:
    'Official 2023 Top Shop Awards winners by repair category, including company logos and category highlights.',
  canonicalPath: '/topshop_2023_winners.html',
  titleImageSrc: '/assets/images/page-titles/47.jpg',
  logo: {
    heading: 'Top Shops 2023 Winners',
    imageSrc: '/assets/images/logo/ts_winner_logo.png',
    imageAlt: 'Top Shops 2023 Winners badge',
    width: 226,
    height: 226,
  },
  introContent: (
    <>
      <p>
        We are pleased to announce this year&apos;s winners of the 145 Top Shop Awards. This season
        delivered <strong>30,094 nominations</strong> and <strong>3,460 winning votes</strong> across{' '}
        <strong>28 repair categories</strong>.
      </p>
      <p>
        The most contested category was <strong>Electro-Mechanical Repair</strong>, with 2,022 votes
        submitted. Several races were decided by narrow margins, including Airframe and
        Aerostructures, Fuel Systems, Transparencies, and Wheel and Brake.
      </p>
      <p>
        On behalf of <strong>The 145</strong> and all participating repair centers, thank you to
        everyone who submitted votes. Congratulations to all 2023 winners.
      </p>
      <p className="winners-results-callout">Below are the 2023 winners by repair category:</p>
    </>
  ),
  cardsFile: 'topshop_2023_winners_cards.html',
} as const satisfies WinnersPageConfig;
