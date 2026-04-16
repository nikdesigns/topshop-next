'use client';

import { Trophy } from 'lucide-react';
import { SplitResultsListing } from '@/components/split-results-listing';
import {
  WINNERS_SPLIT_CARD_NAMESPACE,
  WINNERS_SPLIT_RESULTS_NAMESPACE,
} from '@/lib/results-namespaces';
import type { WinnerSplitCard } from '@/lib/results-types';

type WinnersSplitListingProps = {
  cards: WinnerSplitCard[];
  seasonLabel: string;
  namespace?: string;
  cardNamespace?: string;
};

export function WinnersSplitListing({
  cards,
  seasonLabel,
  namespace = WINNERS_SPLIT_RESULTS_NAMESPACE,
  cardNamespace = WINNERS_SPLIT_CARD_NAMESPACE,
}: WinnersSplitListingProps) {
  return (
    <SplitResultsListing
      cards={cards.map((card) => ({
        category: card.category,
        multiEntity: card.multiEntity,
        singleEntity: card.singleEntity,
        items: card.winners,
      }))}
      seasonLabel={seasonLabel}
      namespace={namespace}
      cardNamespace={cardNamespace}
      icon={Trophy}
      searchLabel="Search categories and winner names"
      searchPlaceholder="Search category or winner name..."
      summarySecondLabel="Recognized Facilities"
    />
  );
}
