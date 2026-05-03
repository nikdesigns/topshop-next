'use client';

import Image from 'next/image';
import { MapPin, Phone, Sparkles } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  getWinnersShowcaseBundle,
  type WinnerShowcaseSeed,
} from '@/data/winners-showcase';
import { nominationWindow } from '@/lib/nomination-window';

type WinnerGroup = 'Engine' | 'Avionics' | 'Airframe' | 'Cabin' | 'Components';
type WinnerEntityType = 'multi' | 'single';
type WinnerEntityFilter = 'all' | 'single' | 'multi';

type WinnerCard = {
  id: string;
  category: string;
  company: string;
  address: string;
  phone: string;
  image: string;
  group: WinnerGroup;
  entityType: WinnerEntityType;
};

type WinnerCategoryCard = {
  id: string;
  category: string;
  group: WinnerGroup;
  multiEntries: WinnerCard[];
  singleEntries: WinnerCard[];
};

type WinnerDisplayCard = {
  id: string;
  category: string;
  group: WinnerGroup;
  winner: WinnerCard;
  entityType: WinnerEntityType;
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

function toCategoryId(category: string) {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const winnersShowcase: WinnerCard[] = winnerSeeds.map((winner: WinnerShowcaseSeed, index) => ({
  id: `winner-${index + 1}`,
  group: inferWinnerGroup(winner.category),
  entityType: winner.entityType ?? 'single',
  ...winner,
}));

const winnerCategoryCards: WinnerCategoryCard[] = (() => {
  const byCategory = new Map<string, WinnerCategoryCard>();

  for (const winner of winnersShowcase) {
    const categoryId = toCategoryId(winner.category);
    let categoryCard = byCategory.get(categoryId);

    if (!categoryCard) {
      categoryCard = {
        id: categoryId,
        category: winner.category,
        group: winner.group,
        multiEntries: [],
        singleEntries: [],
      };
      byCategory.set(categoryId, categoryCard);
    }

    if (winner.entityType === 'multi') {
      categoryCard.multiEntries.push(winner);
    } else {
      categoryCard.singleEntries.push(winner);
    }
  }

  return Array.from(byCategory.values());
})();

const INITIAL_VISIBLE = 12;
const WINNERS_ENTITY_PARAM = 'winners-entity';
const WINNERS_ENTITY_STORAGE_KEY = 'home:winners:entity';
const entityFilters: Array<{ value: WinnerEntityFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'single', label: 'Single' },
  { value: 'multi', label: 'Multi' },
];

function parseWinnerEntityFilter(value: string | null): WinnerEntityFilter | null {
  if (!value) {
    return null;
  }

  const normalized = value.trim().toLowerCase();
  if (normalized === 'all') {
    return 'all';
  }

  if (normalized === 'single' || normalized === 'single-entity') {
    return 'single';
  }

  if (normalized === 'multi' || normalized === 'multi-entity') {
    return 'multi';
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

  const [activeEntityFilter, setActiveEntityFilter] = useState<WinnerEntityFilter>('all');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  useEffect(() => {
    if (hasHydratedState.current) {
      return;
    }

    const urlFilter = parseWinnerEntityFilter(searchParams.get(WINNERS_ENTITY_PARAM));

    let persistedFilter: WinnerEntityFilter = 'all';
    if (typeof window !== 'undefined') {
      persistedFilter =
        parseWinnerEntityFilter(window.localStorage.getItem(WINNERS_ENTITY_STORAGE_KEY)) ?? 'all';
    }

    const nextFilter = urlFilter ?? persistedFilter;

    const initialize = () => {
      setActiveEntityFilter(nextFilter);
      setVisibleCount(INITIAL_VISIBLE);
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

    const nextParams = new URLSearchParams(searchParams.toString());

    if (activeEntityFilter === 'all') {
      nextParams.delete(WINNERS_ENTITY_PARAM);
    } else {
      nextParams.set(WINNERS_ENTITY_PARAM, activeEntityFilter);
    }

    if (typeof window !== 'undefined') {
      if (activeEntityFilter === 'all') {
        window.localStorage.removeItem(WINNERS_ENTITY_STORAGE_KEY);
      } else {
        window.localStorage.setItem(WINNERS_ENTITY_STORAGE_KEY, activeEntityFilter);
      }
    }

    const currentParamsString = searchParams.toString();
    const nextParamsString = nextParams.toString();

    if (nextParamsString !== currentParamsString) {
      const nextHref = nextParamsString ? `${pathname}?${nextParamsString}` : pathname;
      router.replace(nextHref, { scroll: false });
    }
  }, [activeEntityFilter, pathname, router, searchParams]);

  const filteredWinnerCards = useMemo(() => {
    const cards: WinnerDisplayCard[] = [];

    for (const categoryCard of winnerCategoryCards) {
      if (activeEntityFilter === 'all' || activeEntityFilter === 'multi') {
        categoryCard.multiEntries.forEach((winner, index) => {
          cards.push({
            id: `${categoryCard.id}-multi-${index + 1}`,
            category: categoryCard.category,
            group: categoryCard.group,
            winner,
            entityType: 'multi',
          });
        });
      }

      if (activeEntityFilter === 'all' || activeEntityFilter === 'single') {
        categoryCard.singleEntries.forEach((winner, index) => {
          cards.push({
            id: `${categoryCard.id}-single-${index + 1}`,
            category: categoryCard.category,
            group: categoryCard.group,
            winner,
            entityType: 'single',
          });
        });
      }
    }

    return cards;
  }, [activeEntityFilter]);

  const groupSummary = useMemo(() => {
    if (filteredWinnerCards.length === 0) {
      return null;
    }

    const counts = filteredWinnerCards.reduce<Record<WinnerGroup, number>>(
      (acc, card) => {
        acc[card.group] += 1;
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
  }, [filteredWinnerCards]);

  const categoriesShown = useMemo(() => {
    return new Set(filteredWinnerCards.map((card) => card.category)).size;
  }, [filteredWinnerCards]);

  const visibleCards = filteredWinnerCards.slice(0, visibleCount);
  const hasMoreCards = visibleCount < filteredWinnerCards.length;

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
            Explore award-winning shops by service group and view Single or Multi-Entity results.
          </p>
        </header>

        <div className="winners-summary-row" aria-label="Winners summary">
          <article className="winners-summary-card">
            <p className="winners-summary-label">Season</p>
            <p className="winners-summary-value">{showcaseYear}</p>
          </article>
          <article className="winners-summary-card">
            <p className="winners-summary-label">Categories Showing</p>
            <p className="winners-summary-value">{categoriesShown}</p>
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
              {filteredWinnerCards.length} winners shown
            </p>
          </div>

          <div className="winners-filters" role="tablist" aria-label="Filter winners by entity type">
            {entityFilters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                role="tab"
                aria-selected={activeEntityFilter === filter.value}
                className={
                  activeEntityFilter === filter.value
                    ? 'winners-filter-chip active'
                    : 'winners-filter-chip'
                }
                onClick={() => {
                  setActiveEntityFilter(filter.value);
                  setVisibleCount(INITIAL_VISIBLE);
                }}
              >
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        </div>

        {filteredWinnerCards.length > 0 ? (
          <>
            <div className="winners-compact-grid">
              {visibleCards.map((card) => (
                <article key={card.id} className="winner-card">
                  <div className="winner-image-wrap">
                    <div className="winner-category-head">
                      <p className="winner-category">{card.category}</p>
                      <p className="winner-entity-pill">
                        {card.entityType === 'multi' ? 'Multi' : 'Single'}
                      </p>
                    </div>

                    <Image
                      src={card.winner.image}
                      alt={card.winner.company}
                      width={700}
                      height={466}
                      className="winner-image"
                    />
                  </div>

                  <div className="winner-copy">
                    <h3>{card.winner.company}</h3>
                    <p className="winner-meta">
                      <MapPin size={14} aria-hidden="true" />
                      <span>{card.winner.address}</span>
                    </p>
                    <p className="winner-meta">
                      <Phone size={14} aria-hidden="true" />
                      <span>{card.winner.phone}</span>
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {hasMoreCards ? (
              <div className="winners-loadmore">
                <button
                  type="button"
                  className="winners-loadmore-btn"
                  onClick={() => {
                    setVisibleCount((current) =>
                      Math.min(current + INITIAL_VISIBLE, filteredWinnerCards.length),
                    );
                  }}
                >
                  Load More Winners
                </button>
                <p>{filteredWinnerCards.length - visibleCount} remaining</p>
              </div>
            ) : null}
          </>
        ) : (
          <div className="winners-empty" role="status">
            <h3>No winners found for this filter</h3>
            <p>Try switching to another winner type.</p>
          </div>
        )}
      </div>
    </section>
  );
}
