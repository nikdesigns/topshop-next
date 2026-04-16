'use client';

import Image from 'next/image';
import { RotateCcw, Trophy } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ResultsListingShell } from '@/components/results-listing-shell';
import type { WinnerCard } from '@/lib/parse-winners-cards';
import {
  WINNERS_LEGACY_CARD_NAMESPACE,
  WINNERS_LEGACY_RESULTS_NAMESPACE,
} from '@/lib/results-namespaces';

export function WinnersLegacyListing({
  cards,
  seasonLabel,
}: {
  cards: WinnerCard[];
  seasonLabel: string;
}) {
  const [query, setQuery] = useState('');

  const normalizedQuery = query.trim().toLowerCase();

  const summary = useMemo(() => {
    const winners = cards.reduce((acc, card) => acc + card.winners.length, 0);
    const logos = cards.reduce(
      (acc, card) => acc + card.winners.filter((winner) => Boolean(winner.imageSrc)).length,
      0,
    );

    return {
      categories: cards.length,
      winners,
      logos,
    };
  }, [cards]);

  const filteredCards = useMemo(() => {
    if (!normalizedQuery) {
      return cards;
    }

    return cards.filter((card) => {
      const haystack = `${card.category} ${card.winners.map((winner) => winner.name).join(' ')}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [cards, normalizedQuery]);

  const visibleWinners = useMemo(() => {
    return filteredCards.reduce((acc, card) => acc + card.winners.length, 0);
  }, [filteredCards]);

  const hasActiveFilters = normalizedQuery.length > 0;
  const searchId = `winners-search-${seasonLabel}`;
  const listingNamespace = WINNERS_LEGACY_RESULTS_NAMESPACE;
  const cardNamespace = WINNERS_LEGACY_CARD_NAMESPACE;
  const resetQuery = () => setQuery('');

  return (
    <ResultsListingShell
      namespace={listingNamespace}
      seasonLabel={seasonLabel}
      summaryCards={[
        { value: summary.categories, label: 'Award Categories' },
        { value: summary.winners, label: 'Winning Facilities' },
        { value: summary.logos, label: 'Winner Logos' },
      ]}
      searchId={searchId}
      searchLabel="Search categories and winner names"
      searchPlaceholder="Search category or winner..."
      query={query}
      onQueryChange={(event) => setQuery(event.target.value)}
      controlsSlot={
        hasActiveFilters ? (
          <div className={`${listingNamespace}-filter-row`}>
            <button
              type="button"
              className={`${listingNamespace}-reset-btn`}
              onClick={resetQuery}
            >
              <RotateCcw size={13} aria-hidden="true" />
              Reset
            </button>
          </div>
        ) : undefined
      }
      visibleNote={`Showing ${filteredCards.length} categories and ${visibleWinners} winner entries.`}
      hasResults={Boolean(filteredCards.length)}
      onReset={resetQuery}
      emptyDescription="Try a different search keyword."
    >
      <div className={`${listingNamespace}-grid`}>
        {filteredCards.map((card, cardIndex) => (
          <article key={`${card.category}-${cardIndex}`} className={`${cardNamespace}-card`}>
            <h3>
              <Trophy size={16} aria-hidden="true" />
              {card.category}
            </h3>

            <div
              className={`${cardNamespace}-group ${cardNamespace}-group-single winners-legacy-group`}
            >
              <ul className="winners-legacy-entries">
                {card.winners.map((winner, index) => (
                  <li key={`${winner.name}-${index}`} className="winners-legacy-entry">
                    {winner.imageSrc ? (
                      <div className="winners-legacy-logo-wrap">
                        <Image
                          src={winner.imageSrc}
                          alt={winner.imageAlt || winner.name}
                          width={190}
                          height={78}
                          className="winners-legacy-logo"
                        />
                      </div>
                    ) : null}
                    <p className="winners-legacy-entry-name">{winner.name}</p>
                    {winner.details ? (
                      <p className="winners-legacy-entry-desc">{winner.details}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </ResultsListingShell>
  );
}
