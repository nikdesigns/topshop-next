'use client';

import type { LucideIcon } from 'lucide-react';
import { RotateCcw } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
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

function parseSplitMode(value: string | null): SplitMode | null {
  if (!value) {
    return null;
  }

  const normalized = value.toLowerCase();
  if (normalized === 'all') {
    return 'All';
  }

  if (normalized === 'split') {
    return 'Split';
  }

  if (normalized === 'single') {
    return 'Single';
  }

  return null;
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryParamKey = `${namespace}-q`;
  const modeParamKey = `${namespace}-mode`;
  const storageQueryKey = `${namespace}:query`;
  const storageModeKey = `${namespace}:mode`;
  const hasHydratedState = useRef(false);
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<SplitMode>('All');

  useEffect(() => {
    if (hasHydratedState.current) {
      return;
    }

    const urlQuery = searchParams.get(queryParamKey) ?? '';
    const urlMode = parseSplitMode(searchParams.get(modeParamKey));

    let persistedQuery = '';
    let persistedMode: SplitMode = 'All';

    if (typeof window !== 'undefined') {
      persistedQuery = window.localStorage.getItem(storageQueryKey) ?? '';
      persistedMode = parseSplitMode(window.localStorage.getItem(storageModeKey)) ?? 'All';
    }

    const nextQuery = urlQuery || persistedQuery;
    const nextMode = urlMode ?? persistedMode;

    const initialize = () => {
      setQuery(nextQuery);
      setMode(nextMode);
      hasHydratedState.current = true;
    };

    if (typeof window !== 'undefined') {
      window.queueMicrotask(initialize);
      return;
    }

    initialize();
  }, [modeParamKey, queryParamKey, searchParams, storageModeKey, storageQueryKey]);

  useEffect(() => {
    if (!hasHydratedState.current) {
      return;
    }

    const normalizedMode = mode === 'All' ? null : mode.toLowerCase();
    const normalizedQuery = query.trim();
    const nextParams = new URLSearchParams(searchParams.toString());

    if (normalizedQuery) {
      nextParams.set(queryParamKey, normalizedQuery);
    } else {
      nextParams.delete(queryParamKey);
    }

    if (normalizedMode) {
      nextParams.set(modeParamKey, normalizedMode);
    } else {
      nextParams.delete(modeParamKey);
    }

    if (typeof window !== 'undefined') {
      if (normalizedQuery) {
        window.localStorage.setItem(storageQueryKey, normalizedQuery);
      } else {
        window.localStorage.removeItem(storageQueryKey);
      }

      if (normalizedMode) {
        window.localStorage.setItem(storageModeKey, normalizedMode);
      } else {
        window.localStorage.removeItem(storageModeKey);
      }
    }

    const currentParamsString = searchParams.toString();
    const nextParamsString = nextParams.toString();
    if (nextParamsString !== currentParamsString) {
      const nextHref = nextParamsString ? `${pathname}?${nextParamsString}` : pathname;
      router.replace(nextHref, { scroll: false });
    }
  }, [
    mode,
    modeParamKey,
    pathname,
    query,
    queryParamKey,
    router,
    searchParams,
    storageModeKey,
    storageQueryKey,
  ]);

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
