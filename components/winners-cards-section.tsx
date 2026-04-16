'use client';

import Image from 'next/image';
import { MapPin, Phone, RotateCcw, Search, Sparkles } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  getWinnersShowcaseBundle,
  type WinnerShowcaseSeed,
} from '@/data/winners-showcase';
import { nominationWindow } from '@/lib/nomination-window';

type WinnerGroup = 'Engine' | 'Avionics' | 'Airframe' | 'Cabin' | 'Components';
type WinnerFilter = 'All' | WinnerGroup;

type WinnerCard = {
  id: string;
  category: string;
  company: string;
  address: string;
  phone: string;
  image: string;
  group: WinnerGroup;
};

const winnersShowcaseRequestYear = nominationWindow.winnersShowcaseYear;
const { year: winnersShowcaseYear, seeds: winnerSeeds } =
  getWinnersShowcaseBundle(winnersShowcaseRequestYear);

function inferWinnerGroup(category: string): WinnerGroup {
  const normalized = category.toLowerCase();

  if (normalized.includes('engine') || normalized.includes('apu')) {
    return 'Engine';
  }

  if (
    normalized.includes('avionics') ||
    normalized.includes('in-flight') ||
    normalized.includes('electrical') ||
    normalized.includes('lighting') ||
    normalized.includes('gyro') ||
    normalized.includes('der')
  ) {
    return 'Avionics';
  }

  if (
    normalized.includes('airframe') ||
    normalized.includes('aerostructures') ||
    normalized.includes('landing gear') ||
    normalized.includes('wheel') ||
    normalized.includes('brake') ||
    normalized.includes('transparenc') ||
    normalized.includes('plastic') ||
    normalized.includes('safety') ||
    normalized.includes('ducting')
  ) {
    return 'Airframe';
  }

  if (
    normalized.includes('interior') ||
    normalized.includes('lavatory') ||
    normalized.includes('galley')
  ) {
    return 'Cabin';
  }

  return 'Components';
}

const winnersShowcase: WinnerCard[] = winnerSeeds.map((winner: WinnerShowcaseSeed, index) => ({
  id: `winner-${index + 1}`,
  group: inferWinnerGroup(winner.category),
  ...winner,
}));

const filters: WinnerFilter[] = ['All', 'Engine', 'Avionics', 'Airframe', 'Cabin', 'Components'];

const spotlightOrder = new Set(['winner-1', 'winner-10', 'winner-18']);
const INITIAL_COMPACT_VISIBLE = 9;
const WINNERS_QUERY_PARAM = 'winners-q';
const WINNERS_FILTER_PARAM = 'winners-group';
const WINNERS_QUERY_STORAGE_KEY = 'home:winners:query';
const WINNERS_FILTER_STORAGE_KEY = 'home:winners:group';

function parseWinnerFilter(value: string | null): WinnerFilter | null {
  if (!value) {
    return null;
  }

  const normalized = value.toLowerCase();
  for (const filter of filters) {
    if (filter.toLowerCase() === normalized) {
      return filter;
    }
  }

  return null;
}

export function WinnersCardsSection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasHydratedState = useRef(false);
  const showcaseYear = winnersShowcaseYear;
  const showcaseLocation = nominationWindow.winnersShowcaseLocation;
  const [activeFilter, setActiveFilter] = useState<WinnerFilter>('All');
  const [query, setQuery] = useState('');
  const [visibleCompactCount, setVisibleCompactCount] = useState(INITIAL_COMPACT_VISIBLE);

  useEffect(() => {
    if (hasHydratedState.current) {
      return;
    }

    const urlQuery = searchParams.get(WINNERS_QUERY_PARAM) ?? '';
    const urlFilter = parseWinnerFilter(searchParams.get(WINNERS_FILTER_PARAM));

    let persistedQuery = '';
    let persistedFilter: WinnerFilter = 'All';
    if (typeof window !== 'undefined') {
      persistedQuery = window.localStorage.getItem(WINNERS_QUERY_STORAGE_KEY) ?? '';
      persistedFilter =
        parseWinnerFilter(window.localStorage.getItem(WINNERS_FILTER_STORAGE_KEY)) ?? 'All';
    }

    const nextQuery = urlQuery || persistedQuery;
    const nextFilter = urlFilter ?? persistedFilter;

    const initialize = () => {
      setQuery(nextQuery);
      setActiveFilter(nextFilter);
      setVisibleCompactCount(INITIAL_COMPACT_VISIBLE);
      hasHydratedState.current = true;
    };

    if (typeof window !== 'undefined') {
      window.queueMicrotask(initialize);
      return;
    }

    initialize();
  }, [searchParams]);

  useEffect(() => {
    if (!hasHydratedState.current) {
      return;
    }

    const normalizedQuery = query.trim();
    const normalizedFilter = activeFilter === 'All' ? null : activeFilter.toLowerCase();
    const nextParams = new URLSearchParams(searchParams.toString());

    if (normalizedQuery) {
      nextParams.set(WINNERS_QUERY_PARAM, normalizedQuery);
    } else {
      nextParams.delete(WINNERS_QUERY_PARAM);
    }

    if (normalizedFilter) {
      nextParams.set(WINNERS_FILTER_PARAM, normalizedFilter);
    } else {
      nextParams.delete(WINNERS_FILTER_PARAM);
    }

    if (typeof window !== 'undefined') {
      if (normalizedQuery) {
        window.localStorage.setItem(WINNERS_QUERY_STORAGE_KEY, normalizedQuery);
      } else {
        window.localStorage.removeItem(WINNERS_QUERY_STORAGE_KEY);
      }

      if (normalizedFilter) {
        window.localStorage.setItem(WINNERS_FILTER_STORAGE_KEY, normalizedFilter);
      } else {
        window.localStorage.removeItem(WINNERS_FILTER_STORAGE_KEY);
      }
    }

    const currentParamsString = searchParams.toString();
    const nextParamsString = nextParams.toString();
    if (nextParamsString !== currentParamsString) {
      const nextHref = nextParamsString ? `${pathname}?${nextParamsString}` : pathname;
      router.replace(nextHref, { scroll: false });
    }
  }, [activeFilter, pathname, query, router, searchParams]);

  const filterCounts = useMemo(() => {
    const counts: Record<WinnerFilter, number> = {
      All: winnersShowcase.length,
      Engine: 0,
      Avionics: 0,
      Airframe: 0,
      Cabin: 0,
      Components: 0,
    };

    for (const winner of winnersShowcase) {
      counts[winner.group] += 1;
    }

    return counts;
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredWinners = useMemo(() => {
    return winnersShowcase.filter((winner) => {
      const matchesFilter = activeFilter === 'All' ? true : winner.group === activeFilter;
      if (!matchesFilter) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const searchable = `${winner.category} ${winner.company} ${winner.address} ${winner.phone} ${winner.group}`;
      return searchable.toLowerCase().includes(normalizedQuery);
    });
  }, [activeFilter, normalizedQuery]);

  const orderedWinners = useMemo(() => {
    return [...filteredWinners].sort((a, b) => {
      const aSpotlight = spotlightOrder.has(a.id) ? 0 : 1;
      const bSpotlight = spotlightOrder.has(b.id) ? 0 : 1;
      return aSpotlight - bSpotlight;
    });
  }, [filteredWinners]);

  const groupSummary = useMemo(() => {
    if (filteredWinners.length === 0) {
      return null;
    }

    const counts = filteredWinners.reduce<Record<WinnerGroup, number>>(
      (acc, winner) => {
        acc[winner.group] += 1;
        return acc;
      },
      {
        Engine: 0,
        Avionics: 0,
        Airframe: 0,
        Cabin: 0,
        Components: 0,
      },
    );

    const topGroup = (Object.keys(counts) as WinnerGroup[]).reduce((leader, group) => {
      return counts[group] > counts[leader] ? group : leader;
    }, 'Engine');

    return {
      group: topGroup,
      count: counts[topGroup],
    };
  }, [filteredWinners]);

  const featuredWinners = orderedWinners.slice(0, 3);
  const compactWinners = orderedWinners.slice(3);
  const visibleCompactWinners = compactWinners.slice(0, visibleCompactCount);
  const hasMoreCompact = visibleCompactCount < compactWinners.length;

  return (
    <section id="servicesCarousel" className="winners-cards-section section-pad">
      <div className="winners-pattern" aria-hidden="true" />
      <div className="content-wrap">
        <header className="winners-header">
          <p className="winners-eyebrow">Top Shop Winners</p>
          <h2>
            Top Shop {showcaseYear}
            <br />
            {showcaseLocation}
          </h2>
          <p className="winners-header-copy">
            Explore award-winning shops by service group and quickly search companies or
            categories.
          </p>
        </header>

        <div className="winners-summary-row" aria-label="Winners summary">
          <article className="winners-summary-card">
            <p className="winners-summary-label">Season</p>
            <p className="winners-summary-value">{showcaseYear}</p>
          </article>
          <article className="winners-summary-card">
            <p className="winners-summary-label">Showing</p>
            <p className="winners-summary-value">
              {filteredWinners.length} / {winnersShowcase.length}
            </p>
          </article>
          <article className="winners-summary-card">
            <p className="winners-summary-label">Leading Group</p>
            <p className="winners-summary-value">
              {groupSummary ? `${groupSummary.group} (${groupSummary.count})` : 'No matches'}
            </p>
          </article>
        </div>

        <div className="winners-toolbar" aria-label="Winner controls">
          <div className="winners-toolbar-main">
            <p className="winners-result">
              <Sparkles size={14} aria-hidden="true" />
              {filteredWinners.length} winners shown
            </p>

            <label className="winners-search-control">
              <Search size={14} aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setVisibleCompactCount(INITIAL_COMPACT_VISIBLE);
                }}
                placeholder="Search winners, categories, location"
                className="winners-search-input"
                aria-label="Search winners"
              />
            </label>

            {activeFilter !== 'All' || normalizedQuery ? (
              <button
                type="button"
                className="winners-reset-btn"
                onClick={() => {
                  setActiveFilter('All');
                  setQuery('');
                  setVisibleCompactCount(INITIAL_COMPACT_VISIBLE);
                }}
              >
                <RotateCcw size={14} aria-hidden="true" />
                Reset
              </button>
            ) : null}
          </div>

          <div className="winners-filters" role="tablist" aria-label="Filter winners by category group">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={activeFilter === filter}
                className={
                  activeFilter === filter
                    ? 'winners-filter-chip active'
                    : 'winners-filter-chip'
                }
                onClick={() => {
                  setActiveFilter(filter);
                  setVisibleCompactCount(INITIAL_COMPACT_VISIBLE);
                }}
              >
                <span>{filter}</span>
                <span className="chip-count">{filterCounts[filter]}</span>
              </button>
            ))}
          </div>
        </div>

        {orderedWinners.length > 0 ? (
          <>
            <div className="winners-featured-grid">
              {featuredWinners.map((winner) => (
                <article key={winner.id} className="winner-featured-card">
                  <div className="winner-featured-media">
                    <Image
                      src={winner.image}
                      alt={winner.company}
                      width={900}
                      height={600}
                      className="winner-featured-image"
                    />
                    <div className="winner-featured-overlay">
                      <span className="winner-group-pill">{winner.group}</span>
                      <p className="winner-featured-category">{winner.category}</p>
                    </div>
                  </div>

                  <div className="winner-featured-copy">
                    <h3>{winner.company}</h3>
                    <p className="winner-meta">
                      <MapPin size={14} aria-hidden="true" />
                      <span>{winner.address}</span>
                    </p>
                    <p className="winner-meta">
                      <Phone size={14} aria-hidden="true" />
                      <span>{winner.phone}</span>
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {compactWinners.length > 0 ? (
              <>
                <div className="winners-compact-grid">
                  {visibleCompactWinners.map((winner) => (
                    <article key={winner.id} className="winner-card">
                      <div className="winner-image-wrap">
                        <p className="winner-category">{winner.category}</p>
                        <Image
                          src={winner.image}
                          alt={winner.company}
                          width={700}
                          height={466}
                          className="winner-image"
                        />
                      </div>

                      <div className="winner-copy">
                        <h3>{winner.company}</h3>
                        <p className="winner-meta">
                          <MapPin size={14} aria-hidden="true" />
                          <span>{winner.address}</span>
                        </p>
                        <p className="winner-meta">
                          <Phone size={14} aria-hidden="true" />
                          <span>{winner.phone}</span>
                        </p>
                      </div>
                    </article>
                  ))}
                </div>

                {hasMoreCompact ? (
                  <div className="winners-loadmore">
                    <button
                      type="button"
                      className="winners-loadmore-btn"
                      onClick={() => {
                        setVisibleCompactCount((current) =>
                          Math.min(current + INITIAL_COMPACT_VISIBLE, compactWinners.length),
                        );
                      }}
                    >
                      Load More Winners
                    </button>
                    <p>{compactWinners.length - visibleCompactCount} remaining</p>
                  </div>
                ) : null}
              </>
            ) : null}
          </>
        ) : (
          <div className="winners-empty" role="status">
            <h3>No winners match these filters</h3>
            <p>Try clearing search text or selecting a different service group.</p>
            <button
              type="button"
              className="winners-reset-btn"
              onClick={() => {
                setActiveFilter('All');
                setQuery('');
                setVisibleCompactCount(INITIAL_COMPACT_VISIBLE);
              }}
            >
              <RotateCcw size={14} aria-hidden="true" />
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
