import { Suspense, type ReactNode } from 'react';
import { AwardsResultsPageShell } from '@/components/awards-results-page-shell';
import { FinalistsSplitListing } from '@/components/finalists-split-listing';
import { ResultsListingFallback } from '@/components/results-listing-fallback';
import type { FinalistCard } from '@/lib/parse-finalists-cards';
import { SITE_URL } from '@/lib/site';
import {
  FINALISTS_CARD_NAMESPACE,
  FINALISTS_PAGE_SHELL_CLASS,
  FINALISTS_RESULTS_NAMESPACE,
} from '@/lib/results-namespaces';

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
  description: string;
  canonicalPath: string;
  introContent: ReactNode;
  cards: FinalistCard[];
  logo?: FinalistsLogoConfig;
  singleIntroColumn?: boolean;
};

export function FinalistsPageTemplate({
  year,
  titleImageSrc,
  description,
  canonicalPath,
  introContent,
  cards,
  logo,
  singleIntroColumn,
}: FinalistsPageTemplateProps) {
  const namespace = FINALISTS_RESULTS_NAMESPACE;
  const cardNamespace = FINALISTS_CARD_NAMESPACE;
  const title = `${year} Top Shop Finalists`;
  const url = `${SITE_URL}${canonicalPath}`;
  const image = titleImageSrc.startsWith('http') ? titleImageSrc : `${SITE_URL}${titleImageSrc}`;
  const pageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description,
    url,
    image,
    about: {
      '@type': 'Award',
      name: 'Top Shop Awards',
    },
  };

  return (
    <AwardsResultsPageShell
      shellClass={FINALISTS_PAGE_SHELL_CLASS}
      namespace={namespace}
      title={title}
      breadcrumbLabel={`${year} Finalists`}
      titleImageSrc={titleImageSrc}
      logo={logo}
      singleIntroColumn={singleIntroColumn}
      introContent={introContent}
      structuredData={pageJsonLd}
      listingContent={
        <Suspense
          fallback={
            <ResultsListingFallback
              namespace={namespace}
              label={`Loading ${year} finalists...`}
            />
          }
        >
          <FinalistsSplitListing
            cards={cards}
            seasonLabel={year}
            namespace={namespace}
            cardNamespace={cardNamespace}
          />
        </Suspense>
      }
    />
  );
}
