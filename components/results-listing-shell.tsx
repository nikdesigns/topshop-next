'use client';

import { RotateCcw, Search } from 'lucide-react';
import type { ChangeEventHandler, ReactNode } from 'react';

type SummaryCard = {
  value: number;
  label: string;
};

export function ResultsListingShell({
  namespace,
  seasonLabel,
  summaryCards,
  searchId,
  searchLabel,
  searchPlaceholder,
  query,
  onQueryChange,
  controlsSlot,
  visibleNote,
  hasResults,
  onReset,
  emptyDescription,
  children,
}: {
  namespace: string;
  seasonLabel: string;
  summaryCards: SummaryCard[];
  searchId: string;
  searchLabel: string;
  searchPlaceholder: string;
  query: string;
  onQueryChange: ChangeEventHandler<HTMLInputElement>;
  controlsSlot?: ReactNode;
  visibleNote: string;
  hasResults: boolean;
  onReset?: () => void;
  emptyDescription: string;
  children: ReactNode;
}) {
  return (
    <section className={`${namespace}-listing section-pad`}>
      <div className={`content-wrap ${namespace}-listing-wrap`}>
        <div className={`${namespace}-summary-row`} aria-label={`${seasonLabel} results summary`}>
          {summaryCards.map((card) => (
            <article key={card.label} className={`${namespace}-summary-card`}>
              <p className={`${namespace}-summary-value`}>{card.value}</p>
              <p className={`${namespace}-summary-label`}>{card.label}</p>
            </article>
          ))}
        </div>

        <div className={`${namespace}-controls`}>
          <div className={`${namespace}-search`}>
            <Search size={15} aria-hidden="true" />
            <label htmlFor={searchId} className="sr-only">
              {searchLabel}
            </label>
            <input
              id={searchId}
              type="search"
              placeholder={searchPlaceholder}
              value={query}
              onChange={onQueryChange}
            />
          </div>

          {controlsSlot}
        </div>

        <p className={`${namespace}-visible-note`}>{visibleNote}</p>

        {hasResults ? (
          children
        ) : (
          <article className={`${namespace}-empty`}>
            <h3>No results found</h3>
            <p>{emptyDescription}</p>
            {onReset ? (
              <button type="button" className={`${namespace}-reset-btn`} onClick={onReset}>
                <RotateCcw size={13} aria-hidden="true" />
                Reset Filters
              </button>
            ) : null}
          </article>
        )}
      </div>
    </section>
  );
}
