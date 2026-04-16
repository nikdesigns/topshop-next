import type { WinnersPageConfig } from '@/data/winners-pages/types';

export const WINNERS_2024_PAGE_CONFIG = {
  year: '2024',
  variant: 'legacy',
  description:
    'Official 2024 Top Shop Awards winners by repair category, including company logos and category highlights.',
  canonicalPath: '/topshop_2024_winners.html',
  titleImageSrc: '/assets/images/page-titles/53.jpg',
  logo: {
    heading: 'Top Shops 2024 Winners',
    imageSrc: '/assets/images/logo/ts_lg_tans.png',
    imageAlt: 'Top Shops 2024 Winners badge',
    width: 226,
    height: 226,
  },
  introContent: (
    <>
      <p>
        We are pleased to announce this year&apos;s winners of the 145 Top Shop Awards. It was another
        amazing voting season, with a total of <strong>13,803 nominations</strong> and{' '}
        <strong>5,380 winning votes</strong> submitted in <strong>30 repair categories</strong>.
      </p>
      <p>
        We also saw a <strong>37% increase</strong> in winning votes cast this year versus last year,
        with 1,920 additional votes.
      </p>
      <p>
        The most contested repair category this year was <strong>Best Accessory Class I, II, and III
        Repair</strong>, with thirteen companies competing for the title.
      </p>
      <p>
        Several categories were decided by narrow margins, including Accessories Class I, II, and III,
        Aerostructures, and Wheel and Brake. The Ozone Repair category ended in a tie between Limco
        Air Repair and Triumph Accessory Repair - Wellington.
      </p>
      <p>
        On behalf of <strong>The 145</strong> and repair centers worldwide, thank you to everyone who
        submitted votes. <strong>Your participation makes these awards possible.</strong>
      </p>
      <p>
        Congratulations to this year&apos;s winners. If you are a Top Shop, you are doing something
        right.
      </p>
      <p className="winners-results-callout">Below are the 2024 winners by repair category:</p>
    </>
  ),
  cardsFile: 'topshop_2024_winners_cards.html',
} as const satisfies WinnersPageConfig;
