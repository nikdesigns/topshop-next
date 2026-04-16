import type { ReactNode } from 'react';
import type { FinalistsLogoConfig } from '@/components/finalists-page-template';

export type FinalistsPageConfig = {
  year: string;
  description: string;
  canonicalPath: string;
  titleImageSrc: string;
  introContent: ReactNode;
  cardsFile: string;
  logo?: FinalistsLogoConfig;
  singleIntroColumn?: boolean;
};
