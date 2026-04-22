import type { ReactNode } from 'react';
import type { WinnerCard } from '@/lib/parse-winners-cards';
import type { WinnerSplitCard } from '@/lib/results-types';
import { AwardsResultsPageShell } from '@/components/awards-results-page-shell';
import { Winners2026Listing } from '@/components/winners-2026-listing';
import { SITE_URL } from '@/lib/site';
import {
  WINNERS_LEGACY_PAGE_NAMESPACE,
  WINNERS_LEGACY_PAGE_SHELL_CLASS,
  WINNERS_SPLIT_PAGE_SHELL_CLASS,
  WINNERS_SPLIT_RESULTS_NAMESPACE,
} from '@/lib/results-namespaces';

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
  description: string;
  canonicalPath: string;
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
  const namespace = isSplit
    ? WINNERS_SPLIT_RESULTS_NAMESPACE
    : WINNERS_LEGACY_PAGE_NAMESPACE;
  const shellClass = isSplit
    ? WINNERS_SPLIT_PAGE_SHELL_CLASS
    : WINNERS_LEGACY_PAGE_SHELL_CLASS;
  const listingCards: WinnerSplitCard[] = isSplit
    ? props.cards
    : props.cards.map((card) => ({
        category: card.category,
        winners: card.winners.map((winner) => winner.name),
      }));
  const title = `${props.year} Top Shop Winners`;
  const url = `${SITE_URL}${props.canonicalPath}`;
  const image = props.titleImageSrc.startsWith('http')
    ? props.titleImageSrc
    : `${SITE_URL}${props.titleImageSrc}`;
  const pageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description: props.description,
    url,
    image,
    about: {
      '@type': 'Award',
      name: 'Top Shop Awards',
    },
  };

  return (
    <AwardsResultsPageShell
      shellClass={shellClass}
      namespace={namespace}
      title={title}
      breadcrumbLabel={`${props.year} Winners`}
      titleImageSrc={props.titleImageSrc}
      logo={props.logo}
      singleIntroColumn={props.singleIntroColumn}
      introContent={props.introContent}
      structuredData={pageJsonLd}
      listingContent={<Winners2026Listing cards={listingCards} seasonLabel={props.year} />}
    />
  );
}
