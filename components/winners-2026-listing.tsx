'use client';

import { Trophy } from 'lucide-react';
import { SplitResultsListing } from '@/components/split-results-listing';
import type { WinnerSplitCard } from '@/lib/results-types';

export function Winners2026Listing({ cards }: { cards: WinnerSplitCard[] }) {
  return (
    <SplitResultsListing
      cards={cards.map((card) => ({
        category: card.category,
        multiEntity: card.multiEntity,
        singleEntity: card.singleEntity,
        items: card.winners,
      }))}
      seasonLabel="2026"
      namespace="winners-2026"
      cardNamespace="winner-2026"
      icon={Trophy}
      searchLabel="Search categories and winner names"
      searchPlaceholder="Search category or winner name..."
      summarySecondLabel="Recognized Facilities"
    />
  );
}
