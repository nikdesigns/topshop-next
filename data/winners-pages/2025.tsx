import type { WinnersPageConfig } from '@/data/winners-pages/types';

export const WINNERS_2025_PAGE_CONFIG = {
  year: '2025',
  variant: 'legacy',
  description:
    'Official 2025 Top Shop Awards winners by repair category, including company logos and category highlights.',
  canonicalPath: '/topshop_2025_winners.html',
  titleImageSrc: '/assets/images/page-titles/49.jpg',
  logo: {
    heading: 'Top Shops 2025 Winners',
    imageSrc: '/assets/images/logo/top_shop_logo_2025.png',
    imageAlt: 'Top Shops 2025 Winners badge',
    width: 226,
    height: 226,
  },
  introContent: (
    <>
      <p>
        We are thrilled to announce this year&apos;s winners of the 145 Top Shop Awards. This season
        delivered <strong>16,063 nominations</strong> and <strong>10,867 winning votes</strong>{' '}
        across <strong>30 repair categories</strong>.
      </p>
      <p>
        Several categories saw intense competition, with multiple companies battling for the top
        spot, while others came down to a decisive head-to-head finish.
      </p>
      <p>
        Our most competitive categories by total votes included <strong>Accessories Class I, II, and
        III, Engine Accessories, and Hydraulics</strong>.
      </p>
      <p>
        On behalf of <strong>The 145</strong> and repair centers worldwide, thank you to everyone
        who participated in voting. <strong>Your votes make these awards possible.</strong>
      </p>
      <p>
        Congratulations to all winners. Reaching Top Shop status reflects outstanding excellence and
        consistency.
      </p>
      <p className="winners-results-callout">Below are the 2025 winners by repair category:</p>
    </>
  ),
  cardsFile: 'topshop_2025_winners_cards.html',
} as const satisfies WinnersPageConfig;
