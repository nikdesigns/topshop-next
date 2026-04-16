'use client';

import { Star } from 'lucide-react';
import { SplitResultsListing } from '@/components/split-results-listing';
import type { FinalistCard } from '@/lib/parse-finalists-cards';

export function Finalists2026Listing({
  cards,
  seasonLabel = '2026',
}: {
  cards: FinalistCard[];
  seasonLabel?: string;
}) {
  return (
    <SplitResultsListing
      cards={cards.map((card) => ({
        category: card.category,
        multiEntity: card.multiEntity,
        singleEntity: card.singleEntity,
        items: card.finalists,
      }))}
      seasonLabel={seasonLabel}
      namespace="finalists-2026"
      cardNamespace="finalist-2026"
      icon={Star}
      searchLabel="Search categories and finalist names"
      searchPlaceholder="Search category or finalist..."
      summarySecondLabel="Finalist Facilities"
      itemsHeading="Finalists"
    />
  );
}
