import type { ReactNode } from 'react';
import { AwardsResultsPageShell } from '@/components/awards-results-page-shell';
import { Finalists2026Listing } from '@/components/finalists-2026-listing';
import type { FinalistCard } from '@/lib/parse-finalists-cards';

export type FinalistsLogoConfig = {
  heading: string;
  imageSrc: string;
  imageAlt: string;
  width: number;
  height: number;
};

export type FinalistsPageTemplateProps = {
  year: string;
  titleImageSrc: string;
  introContent: ReactNode;
  cards: FinalistCard[];
  logo?: FinalistsLogoConfig;
  singleIntroColumn?: boolean;
};

export function FinalistsPageTemplate({
  year,
  titleImageSrc,
  introContent,
  cards,
  logo,
  singleIntroColumn,
}: FinalistsPageTemplateProps) {
  return (
    <AwardsResultsPageShell
      shellClass="finalists-2026-page-shell"
      namespace="finalists-2026"
      title={`${year} Top Shop Finalists`}
      breadcrumbLabel={`${year} Finalists`}
      titleImageSrc={titleImageSrc}
      logo={logo}
      singleIntroColumn={singleIntroColumn}
      introContent={introContent}
      listingContent={<Finalists2026Listing cards={cards} seasonLabel={year} />}
    />
  );
}
