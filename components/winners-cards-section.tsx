'use client';

import Image from 'next/image';
import { MapPin, Phone, RotateCcw, Search, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';

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

type WinnerSeed = Omit<WinnerCard, 'id' | 'group'>;

const winnerSeeds: WinnerSeed[] = [
  {
    category: 'Best Accessories Class I, II, and III Repair',
    company: 'VSE Aviation Services - FL',
    address: '570 NE 185th St, North Miami Beach, FL 33179',
    phone: '+1 954-316-6015',
    image: '/assets/images/ts_winner_2025/vse.jpg',
  },
  {
    category: 'Best Airframe & Aerostructures Repair',
    company: 'Spirit AeroSystems',
    address: '3801 S. Oliver St. Wichita, KS 67210',
    phone: '+1 (316) 526-9000',
    image: '/assets/images/clients/spirit_aero.png',
  },
  {
    category: 'Best APU Components',
    company: 'Setnix LLC',
    address: '475 Bond St, Lincolnshire, IL 60069',
    phone: '+1 312-549-4459',
    image: '/assets/images/ts_winner_2025/setnix.jpg',
  },
  {
    category: 'Best APU Overhaul',
    company: 'TAG Aero, LLC',
    address: '1247 Apex Dr, Rock Hill, SC 29730',
    phone: '+1 803-831-9390',
    image: '/assets/images/ts_winner_2025/tag_aero.jpg',
  },
  {
    category: 'Best Avionics and Instruments',
    company: 'Cross-Check Aviation',
    address: '9565 Prototype Ct #102, Reno, NV 89521',
    phone: '+1 775-852-5552',
    image: '/assets/images/ts_winner_2025/crosscheck.jpg',
  },
  {
    category: 'Best DER',
    company: 'CVG Aerospace',
    address: '13500 SW 134th Ave, Miami, FL 33186',
    phone: '+1 786-293-9923',
    image: '/assets/images/ts_winner_2025/cvg_aviation.jpg',
  },
  {
    category: 'Best Ducting',
    company: 'AvDUCT Worldwide',
    address: '1630 N. 166th East Ave. Tulsa, OK 74116',
    phone: '(918) 437-7772',
    image: '/assets/images/ts_winner_2025/avduct.jpg',
  },
  {
    category: 'Best Electrical Panels',
    company: 'Skysmart MRO Ltd',
    address: '12, Flitch Industrial Estate, Chelmsford Rd, Essex CM6 1XJ, United Kingdom',
    phone: '+44 1371 492000',
    image: '/assets/images/ts_winner_2025/sky_smart.jpg',
  },
  {
    category: 'Best Electro-Mechanical',
    company: 'Fokker Services B.V.',
    address: 'Hoeksteen 40, 2132 MS, Hoofddorp, Netherlands',
    phone: '+31 (0)88 6280 000',
    image: '/assets/images/ts_winner_2025/fokker.jpg',
  },
  {
    category: 'Best Engine Accessories',
    company: 'Silver Wings Aerospace',
    address: '25400 SW 140th Ave, Princeton, FL 33032',
    phone: '+1 305-258-5950',
    image: '/assets/images/ts_winner_2025/sound_air.jpg',
  },
  {
    category: 'Best Engine Components',
    company: 'BP Aero Services',
    address: '4961 Hanson Dr, Irving, TX, 75038',
    phone: '972-252-2800',
    image: '/assets/images/ts_winner_2025/bpaero.jpg',
  },
  {
    category: 'Best Engine Overhaul',
    company: 'StandardAero',
    address: '11550 Mosteller Rd, Cincinnati, OH 45241',
    phone: '+1 513-618-9588',
    image: '/assets/images/ts_winner_2024/standard.jpeg',
  },
  {
    category: 'Best Fuel Systems and Fuel Accessories',
    company: 'CIMA Aviation',
    address: '2260 NW 102nd Pl, Miami, FL 33172',
    phone: '+1 786-391-1315',
    image: '/assets/images/ts_winner_2025/cima_aviation.jpg',
  },
  {
    category: 'Best Galley Components',
    company: 'VSE Aviation Services - KY',
    address: '3000 Kustom Drive, Hebron, KY 41048',
    phone: '+1 859-283-2264',
    image: '/assets/images/ts_winner_2025/vse.jpg',
  },
  {
    category: 'Best Gyros',
    company: 'North Bay Aviation',
    address: '424 Executive Ct N STE E, Fairfield, CA 94534',
    phone: '+1 707-863-4970',
    image: '/assets/images/ts_winner_2025/northbay.jpg',
  },
  {
    category: 'Best Heat Transfer',
    company: 'Ametek MRO - Drake Air Tulsa',
    address: '4085 Southwest Blvd, Tulsa, OK 74107',
    phone: '+1 918-445-3545',
    image: '/assets/images/ts_winner_2025/ametek_drake.jpg',
  },
  {
    category: 'Best Hydraulics',
    company: 'Lift MRO',
    address: '5475 NW 72nd Ave, Miami, FL 33166',
    phone: '+1 305-574-9932',
    image: '/assets/images/ts_winner_2025/lift.jpg',
  },
  {
    category: 'Best In-Flight Entertainment Systems',
    company: 'Thales Avionics, Inc.',
    address: '58 Discovery, Irvine, CA 92618',
    phone: '+1 949 660 7722',
    image: '/assets/images/ts_winner_2025/thales.jpg',
  },
  {
    category: 'Best Interiors',
    company: 'Allflight Corporation',
    address: '20014 70th Ave S, Kent, WA 98032',
    phone: '+1 253-437-0582',
    image: '/assets/images/ts_winner_2025/allflight.jpg',
  },
  {
    category: 'Best Landing Gear',
    company: 'Summit Aerospace, Inc.',
    address: '8130 NW 74th Ave. Medley, FL 33166',
    phone: '+1 (305) 267-6400',
    image: '/assets/images/ts_winner_2024/summit.jpeg',
  },
  {
    category: 'Best Lavatory / Sanitation Components',
    company: 'Soundair Aviation Svcs.',
    address: '1826 Bickford Ave, Snohomish, WA 98290',
    phone: '(360) 453-2300',
    image: '/assets/images/ts_winner_2025/sound_air.jpg',
  },
  {
    category: 'Best Lighting',
    company: 'MTI Aviation, Inc.',
    address: '13150 NW 45th Avenue Miami, FL 33054',
    phone: '305-817-4244',
    image: '/assets/images/clients/mti_aviation.jpg',
  },
  {
    category: 'Best NDT Facility',
    company: 'MARTEC Aviation',
    address: '3980 W 104th St Suite 1, Hialeah, FL 33018',
    phone: '+1 305-456-7563',
    image: '/assets/images/ts_winner_2024/martec.jpeg',
  },
  {
    category: 'Best Ozone',
    company: 'Limco Airepair',
    address: '5304 S Lawton Ave, Tulsa, OK 74107',
    phone: '+1 918-445-4300',
    image: '/assets/images/ts_winner_2025/limco.jpg',
  },
  {
    category: 'Best Plastic Components',
    company: 'Evans Composites, Inc.',
    address: '300 S Wisteria St, Mansfield, TX 76063',
    phone: '+1 817-477-9014',
    image: '/assets/images/ts_winner_2025/evans.jpg',
  },
  {
    category: 'Best Pneumatics',
    company: 'EMC Aerospace',
    address: '570 NE 185th St, North Miami Beach, FL 33179',
    phone: '+1 954-316-6015',
    image: '/assets/images/clients/emc_aerospace.webp',
  },
  {
    category: 'Best Safety Equipment',
    company: 'HRD Aero Systems, Inc.',
    address: '25555 Avenue Stanford Valencia, California 91355',
    phone: '(661) 407-2772',
    image: '/assets/images/ts_winner_2025/hrd.jpg',
  },
  {
    category: 'Best Total Solutions Provider',
    company: 'AAR MRO Services',
    address: '1100 N. Wood Dale Rd. Wood Dale, IL 60191',
    phone: '+1-630-227-2000',
    image: '/assets/images/ts_winner_2025/aar.jpg',
  },
  {
    category: 'Best Transparencies',
    company: 'Glass Aero, Inc.',
    address: '8131 NW 66th St, Miami, FL 33166',
    phone: '+1 305-400-1877',
    image: '/assets/images/ts_winner_2025/glass_aero.jpg',
  },
  {
    category: 'Best Wheel and Brake',
    company: 'Earp Aviation Repairs',
    address: '380 E Chilton Dr, Chandler, AZ 85225',
    phone: '+1 602-737-1230',
    image: '/assets/images/ts_winner_2025/earp.jpg',
  },
];

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

const winners2025: WinnerCard[] = winnerSeeds.map((winner, index) => ({
  id: `winner-${index + 1}`,
  group: inferWinnerGroup(winner.category),
  ...winner,
}));

const filters: WinnerFilter[] = ['All', 'Engine', 'Avionics', 'Airframe', 'Cabin', 'Components'];

const spotlightOrder = new Set(['winner-1', 'winner-10', 'winner-18']);
const INITIAL_COMPACT_VISIBLE = 9;

export function WinnersCardsSection() {
  const [activeFilter, setActiveFilter] = useState<WinnerFilter>('All');
  const [query, setQuery] = useState('');
  const [visibleCompactCount, setVisibleCompactCount] = useState(INITIAL_COMPACT_VISIBLE);

  const filterCounts = useMemo(() => {
    const counts: Record<WinnerFilter, number> = {
      All: winners2025.length,
      Engine: 0,
      Avionics: 0,
      Airframe: 0,
      Cabin: 0,
      Components: 0,
    };

    for (const winner of winners2025) {
      counts[winner.group] += 1;
    }

    return counts;
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredWinners = useMemo(() => {
    return winners2025.filter((winner) => {
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
            Top Shop 2025
            <br />
            MRO Americas in Atlanta, Georgia, USA
          </h2>
          <p className="winners-header-copy">
            Explore award-winning shops by service group and quickly search companies or
            categories.
          </p>
        </header>

        <div className="winners-summary-row" aria-label="Winners summary">
          <article className="winners-summary-card">
            <p className="winners-summary-label">Season</p>
            <p className="winners-summary-value">2025</p>
          </article>
          <article className="winners-summary-card">
            <p className="winners-summary-label">Showing</p>
            <p className="winners-summary-value">
              {filteredWinners.length} / {winners2025.length}
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
