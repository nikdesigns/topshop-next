import { TOPSHOP_2026_WINNER_CARDS } from '@/data/topshop_2026_winners';
import type { WinnersPageConfig } from '@/data/winners-pages/types';

export const WINNERS_2026_PAGE_CONFIG = {
  year: '2026',
  variant: 'split',
  description:
    'Official 2026 Top Shop Awards winners by repair category, including multi-entity and single-entity facilities.',
  canonicalPath: '/topshop_2026_winners.html',
  titleImageSrc: '/assets/images/page-titles/333.jpg',
  logo: {
    heading: 'Top Shops 2026 Winners',
    imageSrc: '/assets/images/logo/top_shop_logo_2026.png',
    imageAlt: 'Top Shops 2026 Winners badge',
    width: 226,
    height: 226,
  },
  introContent: (
    <>
      <p>
        We are thrilled to announce the 2026 winners of The145 Top Shop Awards. This year&apos;s
        voting season was another remarkable success, showcasing the strength, skill, and dedication
        of the global repair community.
      </p>
      <p>
        Participation was outstanding, with thousands of nominations submitted and votes cast across
        a wide range of repair categories. Many categories were fiercely competitive, while others
        were decided by clear and decisive margins.
      </p>
      <p>
        On behalf of The145 and repair centers worldwide, thank you to everyone who participated in
        nominations and voting. Your engagement is what makes these awards possible year after year.
      </p>
      <p>
        Congratulations to all 2026 winners. Earning Top Shop recognition reflects commitment to
        quality, reliability, and excellence.
      </p>
      <p className="winners-results-callout">Below are the 2026 winners by repair category:</p>
    </>
  ),
  cards: TOPSHOP_2026_WINNER_CARDS,
} as const satisfies WinnersPageConfig;
