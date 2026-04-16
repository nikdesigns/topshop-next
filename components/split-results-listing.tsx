'use client';

import type { LucideIcon } from 'lucide-react';
import { RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { ResultsListingShell } from '@/components/results-listing-shell';
import type { SplitResultsCard } from '@/lib/results-types';

type SplitMode = 'All' | 'Split' | 'Single';

const FILTERS: SplitMode[] = ['All', 'Split', 'Single'];

function getItemNames(card: SplitResultsCard) {
  return [...(card.multiEntity ?? []), ...(card.singleEntity ?? []), ...(card.items ?? [])];
}

function getMode(card: SplitResultsCard): Exclude<SplitMode, 'All'> {
  return card.multiEntity || card.singleEntity ? 'Split' : 'Single';
}

export function SplitResultsListing({
  cards,
  seasonLabel,
  namespace,
  cardNamespace,
  icon: Icon,
  searchLabel,
  searchPlaceholder,
  summarySecondLabel,
  summaryThirdLabel = 'Split Multi/Single Categories',
  multiHeading = 'Multi-Entity Facilities',
  singleHeading = 'Single Entity Facilities',
  itemsHeading,
}: {
  cards: SplitResultsCard[];
  seasonLabel: string;
  namespace: string;
  cardNamespace: string;
  icon: LucideIcon;
  searchLabel: string;
  searchPlaceholder: string;
  summarySecondLabel: string;
  summaryThirdLabel?: string;
  multiHeading?: string;
  singleHeading?: string;
  itemsHeading?: string;
}) {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<SplitMode>('All');

  const normalizedQuery = query.trim().toLowerCase();

  const summary = useMemo(() => {
    const split = cards.filter((card) => getMode(card) === 'Split').length;
    const single = cards.length - split;
    const itemNames = cards.reduce((acc, card) => acc + getItemNames(card).length, 0);

    return {
      total: cards.length,
      split,
      single,
      itemNames,
    };
  }, [cards]);

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const matchesMode = mode === 'All' ? true : getMode(card) === mode;
      if (!matchesMode) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const haystack = `${card.category} ${getItemNames(card).join(' ')}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [cards, mode, normalizedQuery]);

  const visibleSummary = useMemo(() => {
    const split = filteredCards.filter((card) => getMode(card) === 'Split').length;
    return {
      categories: filteredCards.length,
      split,
      single: filteredCards.length - split,
    };
  }, [filteredCards]);

  const hasActiveFilters = mode !== 'All' || normalizedQuery.length > 0;

  const countByMode: Record<SplitMode, number> = {
    All: summary.total,
    Split: summary.split,
    Single: summary.single,
  };

  const searchId = `${namespace}-search`;
  const resetAll = () => {
    setQuery('');
    setMode('All');
  };

  return (
    <ResultsListingShell
      namespace={namespace}
      seasonLabel={seasonLabel}
      summaryCards={[
        { value: summary.total, label: 'Award Categories' },
        { value: summary.itemNames, label: summarySecondLabel },
        { value: summary.split, label: summaryThirdLabel },
      ]}
      searchId={searchId}
      searchLabel={searchLabel}
      searchPlaceholder={searchPlaceholder}
      query={query}
      onQueryChange={(event) => setQuery(event.target.value)}
      controlsSlot={
        <div className={`${namespace}-filter-row`}>
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`${namespace}-filter-btn${mode === filter ? ' is-active' : ''}`}
              onClick={() => setMode(filter)}
              aria-pressed={mode === filter}
            >
              <span>{filter}</span>
              <strong>{countByMode[filter]}</strong>
            </button>
          ))}

          {hasActiveFilters ? (
            <button type="button" className={`${namespace}-reset-btn`} onClick={resetAll}>
              <RotateCcw size={13} aria-hidden="true" />
              Reset
            </button>
          ) : null}
        </div>
      }
      visibleNote={`Showing ${visibleSummary.categories} categories (${visibleSummary.split} split / ${visibleSummary.single} single).`}
      hasResults={Boolean(filteredCards.length)}
      onReset={resetAll}
      emptyDescription="Try a different search keyword or switch the filter type."
    >
      <div className={`${namespace}-grid`}>
        {filteredCards.map((card) => (
          <article key={card.category} className={`${cardNamespace}-card`}>
            <h3>
              <Icon size={16} aria-hidden="true" />
              {card.category}
            </h3>

            {card.multiEntity ? (
              <div className={`${cardNamespace}-group`}>
                <h4>{multiHeading}</h4>
                <ul>
                  {card.multiEntity.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {card.singleEntity ? (
              <div className={`${cardNamespace}-group`}>
                <h4>{singleHeading}</h4>
                <ul>
                  {card.singleEntity.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {card.items ? (
              <div className={`${cardNamespace}-group ${cardNamespace}-group-single`}>
                {itemsHeading ? <h4>{itemsHeading}</h4> : null}
                <ul>
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </article>
        ))}
      </div>
    </ResultsListingShell>
  );
}
