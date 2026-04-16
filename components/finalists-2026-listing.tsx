'use client';

import { RotateCcw, Search, Star } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { FinalistCard } from '@/lib/parse-finalists-cards';

type FinalistMode = 'All' | 'Split' | 'Single';

const FILTERS: FinalistMode[] = ['All', 'Split', 'Single'];

function getFinalistNames(card: FinalistCard) {
  return [...(card.multiEntity ?? []), ...(card.singleEntity ?? []), ...(card.finalists ?? [])];
}

function getMode(card: FinalistCard): Exclude<FinalistMode, 'All'> {
  return card.multiEntity || card.singleEntity ? 'Split' : 'Single';
}

export function Finalists2026Listing({ cards }: { cards: FinalistCard[] }) {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<FinalistMode>('All');

  const normalizedQuery = query.trim().toLowerCase();

  const summary = useMemo(() => {
    const split = cards.filter((card) => getMode(card) === 'Split').length;
    const single = cards.length - split;
    const finalistNames = cards.reduce((acc, card) => acc + getFinalistNames(card).length, 0);

    return {
      total: cards.length,
      split,
      single,
      finalistNames,
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

      const haystack = `${card.category} ${getFinalistNames(card).join(' ')}`.toLowerCase();
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

  const countByMode: Record<FinalistMode, number> = {
    All: summary.total,
    Split: summary.split,
    Single: summary.single,
  };

  return (
    <section className="finalists-2026-listing section-pad">
      <div className="content-wrap finalists-2026-listing-wrap">
        <div className="finalists-2026-summary-row" aria-label="2026 finalists summary">
          <article className="finalists-2026-summary-card">
            <p className="finalists-2026-summary-value">{summary.total}</p>
            <p className="finalists-2026-summary-label">Award Categories</p>
          </article>
          <article className="finalists-2026-summary-card">
            <p className="finalists-2026-summary-value">{summary.finalistNames}</p>
            <p className="finalists-2026-summary-label">Finalist Facilities</p>
          </article>
          <article className="finalists-2026-summary-card">
            <p className="finalists-2026-summary-value">{summary.split}</p>
            <p className="finalists-2026-summary-label">Split Multi/Single Categories</p>
          </article>
        </div>

        <div className="finalists-2026-controls">
          <div className="finalists-2026-search">
            <Search size={15} aria-hidden="true" />
            <label htmlFor="finalists-2026-search" className="sr-only">
              Search categories and finalist names
            </label>
            <input
              id="finalists-2026-search"
              type="search"
              placeholder="Search category or finalist..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          <div className="finalists-2026-filter-row">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`finalists-2026-filter-btn${mode === filter ? ' is-active' : ''}`}
                onClick={() => setMode(filter)}
                aria-pressed={mode === filter}
              >
                <span>{filter}</span>
                <strong>{countByMode[filter]}</strong>
              </button>
            ))}

            {hasActiveFilters ? (
              <button
                type="button"
                className="finalists-2026-reset-btn"
                onClick={() => {
                  setQuery('');
                  setMode('All');
                }}
              >
                <RotateCcw size={13} aria-hidden="true" />
                Reset
              </button>
            ) : null}
          </div>
        </div>

        <p className="finalists-2026-visible-note">
          Showing {visibleSummary.categories} categories ({visibleSummary.split} split /{' '}
          {visibleSummary.single} single).
        </p>

        {filteredCards.length ? (
          <div className="finalists-2026-grid">
            {filteredCards.map((card) => (
              <article key={card.category} className="finalist-2026-card">
                <h3>
                  <Star size={16} aria-hidden="true" />
                  {card.category}
                </h3>

                {card.multiEntity ? (
                  <div className="finalist-2026-group">
                    <h4>Multi-Entity Facilities</h4>
                    <ul>
                      {card.multiEntity.map((finalist) => (
                        <li key={finalist}>{finalist}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {card.singleEntity ? (
                  <div className="finalist-2026-group">
                    <h4>Single Entity Facilities</h4>
                    <ul>
                      {card.singleEntity.map((finalist) => (
                        <li key={finalist}>{finalist}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {card.finalists ? (
                  <div className="finalist-2026-group finalist-2026-group-single">
                    <h4>Finalists</h4>
                    <ul>
                      {card.finalists.map((finalist) => (
                        <li key={finalist}>{finalist}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <article className="finalists-2026-empty">
            <h3>No results found</h3>
            <p>Try a different search keyword or switch the filter type.</p>
            <button
              type="button"
              className="finalists-2026-reset-btn"
              onClick={() => {
                setQuery('');
                setMode('All');
              }}
            >
              <RotateCcw size={13} aria-hidden="true" />
              Reset Filters
            </button>
          </article>
        )}
      </div>
    </section>
  );
}
