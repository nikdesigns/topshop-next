import type { ReactNode } from 'react';
import type { WinnersLogoConfig } from '@/components/winners-page-template';
import type { WinnerSplitCard } from '@/lib/results-types';

type WinnersPageBaseConfig = {
  year: string;
  description: string;
  canonicalPath: string;
  titleImageSrc: string;
  introContent: ReactNode;
  logo?: WinnersLogoConfig;
  singleIntroColumn?: boolean;
};

type LegacyWinnersPageConfig = WinnersPageBaseConfig & {
  variant: 'legacy';
  cardsFile: string;
};

type SplitWinnersPageConfig = WinnersPageBaseConfig & {
  variant: 'split';
  cards: WinnerSplitCard[];
};

export type WinnersPageConfig = LegacyWinnersPageConfig | SplitWinnersPageConfig;
