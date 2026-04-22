'use client';

import { Building2, RotateCcw, Search, Sparkles, Trophy, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { WinnerSplitCard } from '@/lib/results-types';

type DisplayMode = 'all' | 'split' | 'single';

type Winners2026ListingProps = {
  cards: WinnerSplitCard[];
  seasonLabel: string;
};

function getMode(card: WinnerSplitCard): Exclude<DisplayMode, 'all'> {
  return card.multiEntity || card.singleEntity ? 'split' : 'single';
}

function getAllWinners(card: WinnerSplitCard) {
  return [...(card.multiEntity ?? []), ...(card.singleEntity ?? []), ...(card.winners ?? [])];
}

export function Winners2026Listing({ cards, seasonLabel }: Winners2026ListingProps) {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<DisplayMode>('all');

  const normalizedQuery = query.trim().toLowerCase();

  const summary = useMemo(() => {
    const splitCategories = cards.filter((card) => getMode(card) === 'split').length;
    const singleCategories = cards.length - splitCategories;
    const winnersCount = cards.reduce((total, card) => total + getAllWinners(card).length, 0);

    return {
      categories: cards.length,
      splitCategories,
      singleCategories,
      winnersCount,
    };
  }, [cards]);
  const hasSplitCategories = summary.splitCategories > 0;

  const countsByMode = useMemo(
    () => ({
      all: summary.categories,
      split: summary.splitCategories,
      single: summary.singleCategories,
    }),
    [summary.categories, summary.splitCategories, summary.singleCategories],
  );

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const matchesMode = hasSplitCategories
        ? mode === 'all'
          ? true
          : getMode(card) === mode
        : true;
      if (!matchesMode) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const haystack = `${card.category} ${getAllWinners(card).join(' ')}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [cards, hasSplitCategories, mode, normalizedQuery]);

  const visibleWinnerCount = useMemo(() => {
    return filteredCards.reduce((total, card) => total + getAllWinners(card).length, 0);
  }, [filteredCards]);

  const resetFilters = () => {
    setQuery('');
    setMode('all');
  };

  const hasActiveFilters = query.trim().length > 0 || (hasSplitCategories && mode !== 'all');

  return (
    <section className="winners-2026-directory section-pad">
      <div className="content-wrap winners-2026-directory-wrap">
        <header className="winners-2026-directory-header">
          <p className="winners-2026-directory-eyebrow">
            <Sparkles size={14} aria-hidden="true" />
            Upgraded Winners View
          </p>
          <h2>{seasonLabel} Winners Directory</h2>
          <p>
            {hasSplitCategories
              ? 'Clear split-vs-single presentation for each category, with faster filtering and cleaner enterprise-style scanning.'
              : 'Streamlined category-first presentation with faster filtering and cleaner enterprise-style scanning.'}
          </p>
        </header>

        <div className="winners-2026-summary-row" aria-label={`${seasonLabel} winners summary`}>
          <article className="winners-2026-summary-card">
            <p className="winners-2026-summary-label">Categories</p>
            <p className="winners-2026-summary-value">{summary.categories}</p>
          </article>
          <article className="winners-2026-summary-card">
            <p className="winners-2026-summary-label">
              {hasSplitCategories ? 'Split Categories' : 'Single Categories'}
            </p>
            <p className="winners-2026-summary-value">
              {hasSplitCategories ? summary.splitCategories : summary.singleCategories}
            </p>
          </article>
          <article className="winners-2026-summary-card">
            <p className="winners-2026-summary-label">Recognized Winners</p>
            <p className="winners-2026-summary-value">{summary.winnersCount}</p>
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
              placeholder="Search category or winner..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          {hasSplitCategories ? (
            <div className="winners-2026-mode-row" role="tablist" aria-label="Winner view mode">
              <button
                type="button"
                className={`winners-2026-mode-btn${mode === 'all' ? ' is-active' : ''}`}
                onClick={() => setMode('all')}
                aria-pressed={mode === 'all'}
              >
                <Trophy size={14} aria-hidden="true" />
                All
                <strong>{countsByMode.all}</strong>
              </button>
              <button
                type="button"
                className={`winners-2026-mode-btn${mode === 'split' ? ' is-active' : ''}`}
                onClick={() => setMode('split')}
                aria-pressed={mode === 'split'}
              >
                <Users size={14} aria-hidden="true" />
                Split
                <strong>{countsByMode.split}</strong>
              </button>
              <button
                type="button"
                className={`winners-2026-mode-btn${mode === 'single' ? ' is-active' : ''}`}
                onClick={() => setMode('single')}
                aria-pressed={mode === 'single'}
              >
                <Building2 size={14} aria-hidden="true" />
                Single
                <strong>{countsByMode.single}</strong>
              </button>
              {hasActiveFilters ? (
                <button
                  type="button"
                  className="winners-2026-reset-btn"
                  onClick={resetFilters}
                >
                  <RotateCcw size={13} aria-hidden="true" />
                  Reset
                </button>
              ) : null}
            </div>
          ) : hasActiveFilters ? (
            <div className="winners-2026-mode-row">
              <button type="button" className="winners-2026-reset-btn" onClick={resetFilters}>
                <RotateCcw size={13} aria-hidden="true" />
                Reset
              </button>
            </div>
          ) : null}
        </div>

        <p className="winners-2026-visible-note">
          Showing {filteredCards.length} categories and {visibleWinnerCount} winners.
        </p>

        {filteredCards.length > 0 ? (
          <div className="winners-2026-grid">
            {filteredCards.map((card) => {
              const cardMode = getMode(card);
              const isSplit = cardMode === 'split';

              return (
                <article key={card.category} className="winners-2026-card">
                  <header className="winners-2026-card-head">
                    <h3>{card.category}</h3>
                  </header>

                  {isSplit ? (
                    <div className="winners-2026-columns">
                      <div className="winners-2026-column">
                        <h4>Multi-Entity Winner</h4>
                        <ul>
                          {(card.multiEntity ?? []).map((winner) => (
                            <li key={winner}>{winner}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="winners-2026-column">
                        <h4>Single Entity Winner</h4>
                        <ul>
                          {(card.singleEntity ?? []).map((winner) => (
                            <li key={winner}>{winner}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="winners-2026-column winners-2026-column--single">
                      <h4>Winner</h4>
                      <ul>
                        {(card.winners ?? []).map((winner) => (
                          <li key={winner}>{winner}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        ) : (
          <article className="winners-2026-empty">
            <h3>No winners found</h3>
            <p>
              {hasSplitCategories
                ? 'Try another keyword or switch view mode.'
                : 'Try another keyword.'}
            </p>
            {hasActiveFilters ? (
              <button type="button" className="winners-2026-reset-btn" onClick={resetFilters}>
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
