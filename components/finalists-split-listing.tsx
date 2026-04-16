'use client';

import { Star } from 'lucide-react';
import { SplitResultsListing } from '@/components/split-results-listing';
import type { FinalistCard } from '@/lib/parse-finalists-cards';
import {
  FINALISTS_CARD_NAMESPACE,
  FINALISTS_RESULTS_NAMESPACE,
} from '@/lib/results-namespaces';

type FinalistsSplitListingProps = {
  cards: FinalistCard[];
  seasonLabel: string;
  namespace?: string;
  cardNamespace?: string;
};

export function FinalistsSplitListing({
  cards,
  seasonLabel,
  namespace = FINALISTS_RESULTS_NAMESPACE,
  cardNamespace = FINALISTS_CARD_NAMESPACE,
}: FinalistsSplitListingProps) {
  return (
    <SplitResultsListing
      cards={cards.map((card) => ({
        category: card.category,
        multiEntity: card.multiEntity,
        singleEntity: card.singleEntity,
        items: card.finalists,
      }))}
      seasonLabel={seasonLabel}
      namespace={namespace}
      cardNamespace={cardNamespace}
      icon={Star}
      searchLabel="Search categories and finalist names"
      searchPlaceholder="Search category or finalist..."
      summarySecondLabel="Finalist Facilities"
      itemsHeading="Finalists"
    />
  );
}
