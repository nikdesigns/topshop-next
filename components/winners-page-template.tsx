import type { ReactNode } from 'react';
import type { WinnerCard } from '@/lib/parse-winners-cards';
import type { WinnerSplitCard } from '@/lib/results-types';
import { AwardsResultsPageShell } from '@/components/awards-results-page-shell';
import { Winners2026Listing } from '@/components/winners-2026-listing';
import { WinnersLegacyListing } from '@/components/winners-legacy-listing';

export type WinnersLogoConfig = {
  heading: string;
  imageSrc: string;
  imageAlt: string;
  width: number;
  height: number;
};

type BaseWinnersPageTemplateProps = {
  year: string;
  titleImageSrc: string;
  introContent: ReactNode;
  logo?: WinnersLogoConfig;
  singleIntroColumn?: boolean;
};

type LegacyWinnersPageTemplateProps = BaseWinnersPageTemplateProps & {
  variant: 'legacy';
  cards: WinnerCard[];
};

type SplitWinnersPageTemplateProps = BaseWinnersPageTemplateProps & {
  variant: 'split';
  cards: WinnerSplitCard[];
};

export type WinnersPageTemplateProps =
  | LegacyWinnersPageTemplateProps
  | SplitWinnersPageTemplateProps;

export function WinnersPageTemplate(props: WinnersPageTemplateProps) {
  const isSplit = props.variant === 'split';
  const namespace = isSplit ? 'winners-2026' : 'winners-2025';
  const shellClass = isSplit ? 'winners-2026-page-shell' : 'winners-2025-page-shell';

  return (
    <AwardsResultsPageShell
      shellClass={shellClass}
      namespace={namespace}
      title={`${props.year} Top Shop Winners`}
      breadcrumbLabel={`${props.year} Winners`}
      titleImageSrc={props.titleImageSrc}
      logo={props.logo}
      singleIntroColumn={props.singleIntroColumn}
      introContent={props.introContent}
      listingContent={
        isSplit ? (
          <Winners2026Listing cards={props.cards} />
        ) : (
          <WinnersLegacyListing cards={props.cards} seasonLabel={props.year} />
        )
      }
    />
  );
}
