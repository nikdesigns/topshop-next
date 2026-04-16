'use client';

import { RotateCcw, Search, Trophy } from 'lucide-react';
import { useMemo, useState } from 'react';

type WinnerCard = {
  category: string;
  multiEntity?: string[];
  singleEntity?: string[];
  winners?: string[];
};

type WinnerMode = 'All' | 'Split' | 'Single';

const FILTERS: WinnerMode[] = ['All', 'Split', 'Single'];

function getWinnerNames(card: WinnerCard) {
  return [...(card.multiEntity ?? []), ...(card.singleEntity ?? []), ...(card.winners ?? [])];
}

function getMode(card: WinnerCard): Exclude<WinnerMode, 'All'> {
  return card.multiEntity || card.singleEntity ? 'Split' : 'Single';
}

export function Winners2026Listing({ cards }: { cards: WinnerCard[] }) {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<WinnerMode>('All');

  const normalizedQuery = query.trim().toLowerCase();

  const summary = useMemo(() => {
    const split = cards.filter((card) => getMode(card) === 'Split').length;
    const single = cards.length - split;
    const winnerNames = cards.reduce((acc, card) => acc + getWinnerNames(card).length, 0);

    return {
      total: cards.length,
      split,
      single,
      winnerNames,
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

      const haystack = `${card.category} ${getWinnerNames(card).join(' ')}`.toLowerCase();
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

  const countByMode: Record<WinnerMode, number> = {
    All: summary.total,
    Split: summary.split,
    Single: summary.single,
  };

  return (
    <section className="winners-2026-listing section-pad">
      <div className="content-wrap winners-2026-listing-wrap">
        <div className="winners-2026-summary-row" aria-label="2026 winners summary">
          <article className="winners-2026-summary-card">
            <p className="winners-2026-summary-value">{summary.total}</p>
            <p className="winners-2026-summary-label">Award Categories</p>
          </article>
          <article className="winners-2026-summary-card">
            <p className="winners-2026-summary-value">{summary.winnerNames}</p>
            <p className="winners-2026-summary-label">Recognized Facilities</p>
          </article>
          <article className="winners-2026-summary-card">
            <p className="winners-2026-summary-value">{summary.split}</p>
            <p className="winners-2026-summary-label">Split Multi/Single Categories</p>
          </article>
        </div>

        <div className="winners-2026-controls">
          <div className="winners-2026-search">
            <Search size={15} aria-hidden="true" />
            <label htmlFor="winners-2026-search" className="sr-only">
              Search categories and winner names
            </label>
            <input
              id="winners-2026-search"
              type="search"
              placeholder="Search category or winner name..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          <div className="winners-2026-filter-row">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`winners-2026-filter-btn${mode === filter ? ' is-active' : ''}`}
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
                className="winners-2026-reset-btn"
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

        <p className="winners-2026-visible-note">
          Showing {visibleSummary.categories} categories ({visibleSummary.split} split /{' '}
          {visibleSummary.single} single).
        </p>

        {filteredCards.length ? (
          <div className="winners-2026-grid">
            {filteredCards.map((card) => (
              <article key={card.category} className="winner-2026-card">
                <h3>
                  <Trophy size={16} aria-hidden="true" />
                  {card.category}
                </h3>

                {card.multiEntity ? (
                  <div className="winner-2026-group">
                    <h4>Multi-Entity Facilities</h4>
                    <ul>
                      {card.multiEntity.map((winner) => (
                        <li key={winner}>{winner}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {card.singleEntity ? (
                  <div className="winner-2026-group">
                    <h4>Single Entity Facilities</h4>
                    <ul>
                      {card.singleEntity.map((winner) => (
                        <li key={winner}>{winner}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {card.winners ? (
                  <div className="winner-2026-group winner-2026-group-single">
                    <ul>
                      {card.winners.map((winner) => (
                        <li key={winner}>{winner}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <article className="winners-2026-empty">
            <h3>No results found</h3>
            <p>Try a different search keyword or switch the filter type.</p>
            <button
              type="button"
              className="winners-2026-reset-btn"
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
