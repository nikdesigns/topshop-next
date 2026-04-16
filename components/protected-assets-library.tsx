'use client';

import { FormEvent, useMemo, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Download,
  ExternalLink,
  Filter,
  Lock,
  Mail,
  Search,
  ShieldCheck,
  Unlock,
  X,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ASSET_ACCESS_SCOPES,
  ASSET_ACCESS_SCOPES_SESSION_KEY,
  ASSET_ACCESS_CODE_RULES,
  type AssetAccessScope,
  ASSET_ACCESS_HELP_TEXT,
  ASSET_ACCESS_SESSION_KEY,
  ASSET_ACCESS_YEARS_SESSION_KEY,
} from '@/lib/assets-access';
import { AssetVariantActions } from '@/components/asset-variant-actions';
import { sha256Hex } from '@/lib/crypto-client';
import { ASSET_YEARS, type AssetYear, type YearAssetBundle } from '@/lib/assets-downloads';
import { CONTACT_EMAIL, CONTACT_MAILTO_HREF } from '@/lib/contact';

type ProtectedAssetsLibraryProps = {
  bundles: YearAssetBundle[];
};

type AssetTypeFilter = 'all' | 'winner' | 'finalist' | 'vote';
type AccessFilter = 'all' | 'public' | 'protected' | 'locked' | 'unlocked';
type YearFilter = 'all' | AssetYear;
type AssetType = Exclude<AssetTypeFilter, 'all'>;
type GrantedAssetAccess = {
  years: AssetYear[];
  scopes: AssetAccessScope[];
};

const EMPTY_GRANTED_YEARS: AssetYear[] = [];
const EMPTY_GRANTED_SCOPES: AssetAccessScope[] = [];
const EMPTY_GRANTED_ACCESS: GrantedAssetAccess = {
  years: EMPTY_GRANTED_YEARS,
  scopes: EMPTY_GRANTED_SCOPES,
};
const ASSET_ACCESS_CHANGE_EVENT = 'topshop-asset-access-change';
let cachedGrantedAccessKey = '__server__';
let cachedGrantedAccessSnapshot: GrantedAssetAccess = EMPTY_GRANTED_ACCESS;

function getAssetType(assetId: string): AssetType {
  if (assetId.includes('winner')) {
    return 'winner';
  }

  if (assetId.includes('finalist')) {
    return 'finalist';
  }

  return 'vote';
}

function getAssetTypeLabel(assetType: Exclude<AssetTypeFilter, 'all'>) {
  if (assetType === 'winner') {
    return 'Winner';
  }

  if (assetType === 'finalist') {
    return 'Finalist';
  }

  return 'Vote';
}

function getAssetScopeLabel(scope: AssetAccessScope) {
  if (scope === 'winner') {
    return 'Winner';
  }

  return 'Finalist';
}

function parseGrantedYears(rawYears: string | null): AssetYear[] {
  if (!rawYears) {
    return EMPTY_GRANTED_YEARS;
  }

  try {
    const parsedYears = JSON.parse(rawYears);
    if (!Array.isArray(parsedYears)) {
      return EMPTY_GRANTED_YEARS;
    }

    const years = parsedYears.filter((year): year is AssetYear =>
      ASSET_YEARS.includes(year as AssetYear),
    );

    return years.length ? years : EMPTY_GRANTED_YEARS;
  } catch {
    return EMPTY_GRANTED_YEARS;
  }
}

function parseGrantedScopes(rawScopes: string | null): AssetAccessScope[] {
  if (!rawScopes) {
    return EMPTY_GRANTED_SCOPES;
  }

  try {
    const parsedScopes = JSON.parse(rawScopes);
    if (!Array.isArray(parsedScopes)) {
      return EMPTY_GRANTED_SCOPES;
    }

    const scopes = parsedScopes.filter((scope): scope is AssetAccessScope =>
      ASSET_ACCESS_SCOPES.includes(scope as AssetAccessScope),
    );

    return scopes.length ? scopes : EMPTY_GRANTED_SCOPES;
  } catch {
    return EMPTY_GRANTED_SCOPES;
  }
}

function subscribeToAssetAccessChanges(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.storageArea !== window.sessionStorage) {
      return;
    }

    if (
      event.key === null ||
      event.key === ASSET_ACCESS_SESSION_KEY ||
      event.key === ASSET_ACCESS_YEARS_SESSION_KEY ||
      event.key === ASSET_ACCESS_SCOPES_SESSION_KEY
    ) {
      onStoreChange();
    }
  };

  const handleLocalUpdate = () => onStoreChange();

  window.addEventListener('storage', handleStorage);
  window.addEventListener(ASSET_ACCESS_CHANGE_EVENT, handleLocalUpdate);

  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(ASSET_ACCESS_CHANGE_EVENT, handleLocalUpdate);
  };
}

function readGrantedAccessFromSessionStorage(): GrantedAssetAccess {
  if (typeof window === 'undefined') {
    return EMPTY_GRANTED_ACCESS;
  }

  try {
    const isGranted = window.sessionStorage.getItem(ASSET_ACCESS_SESSION_KEY) === 'true';
    const rawYears = isGranted
      ? window.sessionStorage.getItem(ASSET_ACCESS_YEARS_SESSION_KEY)
      : null;
    const rawScopes = isGranted
      ? window.sessionStorage.getItem(ASSET_ACCESS_SCOPES_SESSION_KEY)
      : null;
    const nextCacheKey = `${isGranted ? '1' : '0'}:${rawYears ?? ''}:${rawScopes ?? ''}`;

    if (nextCacheKey === cachedGrantedAccessKey) {
      return cachedGrantedAccessSnapshot;
    }

    cachedGrantedAccessKey = nextCacheKey;
    cachedGrantedAccessSnapshot = isGranted
      ? {
          years: parseGrantedYears(rawYears),
          scopes: parseGrantedScopes(rawScopes),
        }
      : EMPTY_GRANTED_ACCESS;

    return cachedGrantedAccessSnapshot;
  } catch {
    return EMPTY_GRANTED_ACCESS;
  }
}

function getServerGrantedAccessSnapshot() {
  return EMPTY_GRANTED_ACCESS;
}

function notifyAssetAccessChange() {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(new Event(ASSET_ACCESS_CHANGE_EVENT));
}

export function ProtectedAssetsLibrary({ bundles }: ProtectedAssetsLibraryProps) {
  const grantedAccess = useSyncExternalStore(
    subscribeToAssetAccessChanges,
    readGrantedAccessFromSessionStorage,
    getServerGrantedAccessSnapshot,
  );
  const grantedYears = grantedAccess.years;
  const grantedScopes = grantedAccess.scopes;
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [yearFilter, setYearFilter] = useState<YearFilter>('all');
  const [typeFilter, setTypeFilter] = useState<AssetTypeFilter>('all');
  const [accessFilter, setAccessFilter] = useState<AccessFilter>('all');
  const isUnlocked = grantedYears.length > 0 && grantedScopes.length > 0;
  const grantedYearsLabel = [...grantedYears].sort((a, b) => b - a).join(', ');
  const grantedScopesLabel = [...grantedScopes].map(getAssetScopeLabel).join(' / ');
  const normalizedSearch = searchQuery.trim().toLowerCase();

  const filteredBundles = useMemo(() => {
    return bundles.reduce<YearAssetBundle[]>((accumulator, bundle) => {
      if (yearFilter !== 'all' && bundle.year !== yearFilter) {
        return accumulator;
      }

      const cards = bundle.cards.filter((asset) => {
        const assetType = getAssetType(asset.id);
        const isYearAllowed = grantedYears.includes(bundle.year);
        const requiredScope = assetType === 'vote' ? null : assetType;
        const isScopeAllowed = requiredScope ? grantedScopes.includes(requiredScope) : true;
        const isLocked = asset.protection === 'protected' && (!isYearAllowed || !isScopeAllowed);

        if (typeFilter !== 'all' && assetType !== typeFilter) {
          return false;
        }

        if (accessFilter === 'public' && asset.protection !== 'public') {
          return false;
        }

        if (accessFilter === 'protected' && asset.protection !== 'protected') {
          return false;
        }

        if (accessFilter === 'locked' && !isLocked) {
          return false;
        }

        if (accessFilter === 'unlocked' && isLocked) {
          return false;
        }

        if (!normalizedSearch) {
          return true;
        }

        const searchableText = `${bundle.year} ${asset.title} ${asset.description} ${asset.id}`.toLowerCase();
        return searchableText.includes(normalizedSearch);
      });

      if (!cards.length) {
        return accumulator;
      }

      accumulator.push({
        ...bundle,
        cards,
      });
      return accumulator;
    }, []);
  }, [accessFilter, bundles, grantedScopes, grantedYears, normalizedSearch, typeFilter, yearFilter]);

  const totalAssetCount = useMemo(
    () => bundles.reduce((total, bundle) => total + bundle.cards.length, 0),
    [bundles],
  );
  const visibleAssetCount = useMemo(
    () => filteredBundles.reduce((total, bundle) => total + bundle.cards.length, 0),
    [filteredBundles],
  );
  const hasActiveFilters =
    Boolean(normalizedSearch) ||
    yearFilter !== 'all' ||
    typeFilter !== 'all' ||
    accessFilter !== 'all';

  const clearFilters = () => {
    setSearchQuery('');
    setYearFilter('all');
    setTypeFilter('all');
    setAccessFilter('all');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = code.trim();

    if (!value) {
      setError('Enter a valid access code.');
      return;
    }

    setIsChecking(true);
    setError('');

    const hash = await sha256Hex(value);
    const matchingRule = ASSET_ACCESS_CODE_RULES.find((rule) => rule.hash === hash);

    if (!matchingRule) {
      setError('Invalid access code. Please try again.');
      setIsChecking(false);
      return;
    }

    const years = matchingRule.years.filter((year) => ASSET_YEARS.includes(year));
    if (!years.length) {
      setError('This code has no active year permission.');
      setIsChecking(false);
      return;
    }

    const scopes = matchingRule.scopes.filter((scope) =>
      ASSET_ACCESS_SCOPES.includes(scope),
    );
    if (!scopes.length) {
      setError('This code has no active role permission.');
      setIsChecking(false);
      return;
    }

    setCode('');
    setIsChecking(false);

    try {
      window.sessionStorage.setItem(ASSET_ACCESS_SESSION_KEY, 'true');
      window.sessionStorage.setItem(ASSET_ACCESS_YEARS_SESSION_KEY, JSON.stringify(years));
      window.sessionStorage.setItem(ASSET_ACCESS_SCOPES_SESSION_KEY, JSON.stringify(scopes));
      notifyAssetAccessChange();
    } catch {
      // Ignore storage write issues. Session unlock still applies for current runtime.
    }
  };

  const lockAssets = () => {
    setCode('');
    setError('');

    try {
      window.sessionStorage.removeItem(ASSET_ACCESS_SESSION_KEY);
      window.sessionStorage.removeItem(ASSET_ACCESS_YEARS_SESSION_KEY);
      window.sessionStorage.removeItem(ASSET_ACCESS_SCOPES_SESSION_KEY);
      notifyAssetAccessChange();
    } catch {
      // Ignore storage removal issues.
    }
  };

  return (
    <>
      <section className="assets-access-panel">
        <div className="assets-access-top">
          <div className="assets-access-copy">
            <Badge variant={isUnlocked ? 'success' : 'danger'} className="assets-library-badge">
              {isUnlocked ? <Unlock size={12} aria-hidden="true" /> : <Lock size={12} aria-hidden="true" />}
              <span>{isUnlocked ? 'Protected Assets Unlocked' : 'Protected Assets Locked'}</span>
            </Badge>
            <h3>Permission Code</h3>
            <p>Winner and finalist logos require a valid access code before download is enabled.</p>
            <p>{ASSET_ACCESS_HELP_TEXT}</p>
          </div>
          {isUnlocked ? (
            <Button type="button" variant="outline" size="sm" onClick={lockAssets}>
              Lock Assets
            </Button>
          ) : null}
        </div>

        {isUnlocked ? (
          <p className="assets-access-success">
            Access verified for {grantedScopesLabel} assets in years: {grantedYearsLabel}. Matching
            protected logos are unlocked for this browser session.
          </p>
        ) : (
          <form className="assets-access-form" onSubmit={handleSubmit} aria-busy={isChecking}>
            <label htmlFor="assetsAccessCode" className="sr-only">
              Protected asset access code
            </label>
            <Input
              id="assetsAccessCode"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="Enter access code"
              autoComplete="one-time-code"
            />
            <Button type="submit" size="sm" disabled={isChecking || !code.trim()} aria-busy={isChecking}>
              <ShieldCheck size={14} aria-hidden="true" />
              {isChecking ? 'Checking...' : 'Unlock Assets'}
            </Button>
            <p className="assets-access-helper">
              Codes are scoped by year and role. A finalist code cannot unlock winner files.
            </p>
          </form>
        )}

        {error ? (
          <p role="alert" className="assets-access-error">
            {error}
          </p>
        ) : null}
      </section>

      <section className="assets-filter-panel" aria-label="Asset filter controls">
        <div className="assets-filter-head">
          <p className="assets-filter-title">
            <Filter size={14} aria-hidden="true" />
            Filter Assets
          </p>
          <p className="assets-filter-results" aria-live="polite">
            Showing {visibleAssetCount} of {totalAssetCount} assets across {filteredBundles.length}{' '}
            years
          </p>
        </div>
        <div className="assets-filter-controls">
          <label className="assets-filter-field assets-filter-search" htmlFor="assetsSearchInput">
            <span>Search</span>
            <div className="assets-filter-search-wrap">
              <Search size={14} aria-hidden="true" />
              <Input
                id="assetsSearchInput"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by title, year, or file type"
                autoComplete="off"
              />
            </div>
          </label>

          <label className="assets-filter-field" htmlFor="assetsYearFilter">
            <span>Year</span>
            <select
              id="assetsYearFilter"
              className="assets-filter-select"
              value={yearFilter}
              onChange={(event) => {
                const value = event.target.value;
                setYearFilter(value === 'all' ? 'all' : Number(value) as AssetYear);
              }}
            >
              <option value="all">All years</option>
              {ASSET_YEARS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>

          <label className="assets-filter-field" htmlFor="assetsTypeFilter">
            <span>Asset Type</span>
            <select
              id="assetsTypeFilter"
              className="assets-filter-select"
              value={typeFilter}
              onChange={(event) => {
                setTypeFilter(event.target.value as AssetTypeFilter);
              }}
            >
              <option value="all">All types</option>
              <option value="winner">Winner</option>
              <option value="finalist">Finalist</option>
              <option value="vote">Vote</option>
            </select>
          </label>

          <label className="assets-filter-field" htmlFor="assetsAccessFilter">
            <span>Access</span>
            <select
              id="assetsAccessFilter"
              className="assets-filter-select"
              value={accessFilter}
              onChange={(event) => {
                setAccessFilter(event.target.value as AccessFilter);
              }}
            >
              <option value="all">All access</option>
              <option value="public">Public</option>
              <option value="protected">Protected</option>
              <option value="locked">Locked only</option>
              <option value="unlocked">Unlocked only</option>
            </select>
          </label>
        </div>
        {hasActiveFilters ? (
          <div className="assets-filter-actions">
            <Button type="button" variant="ghost" size="sm" onClick={clearFilters}>
              <X size={14} aria-hidden="true" />
              Reset Filters
            </Button>
          </div>
        ) : null}
      </section>

      <nav className="assets-quick-links" aria-label="Filtered asset years">
        {filteredBundles.map((bundle) => (
          <Link key={bundle.year} href={`#asset-year-${bundle.year}`}>
            <span>{bundle.year}</span>
            <span className="assets-quick-link-count">{bundle.cards.length}</span>
          </Link>
        ))}
      </nav>

      {filteredBundles.length ? (
        filteredBundles.map((bundle) => (
        <section key={bundle.year} id={`asset-year-${bundle.year}`} className="assets-group">
          <div className="assets-group-head">
            <div className="assets-group-head-top">
              <Badge variant={bundle.isLegacy ? 'subtle' : 'success'}>
                {bundle.isLegacy ? 'Legacy Kit' : 'Full Kit'}
              </Badge>
              <h3>{bundle.year} Asset Library</h3>
            </div>
            <p className="assets-group-year-note">{bundle.note}</p>
          </div>

          <div className="assets-grid">
            {bundle.cards.map((asset) => {
              const isYearAllowed = grantedYears.includes(bundle.year);
              const assetType = getAssetType(asset.id);
              const assetTypeLabel = getAssetTypeLabel(assetType);
              const requiredScope = assetType === 'vote' ? null : assetType;
              const isScopeAllowed = requiredScope ? grantedScopes.includes(requiredScope) : true;
              const isLocked = asset.protection === 'protected' && (!isYearAllowed || !isScopeAllowed);

              return (
                <article key={asset.id} className={`assets-card${isLocked ? ' is-locked' : ''}`}>
                  {asset.kind === 'download' ? (
                    <div
                      className={`assets-card-preview${asset.previewMode === 'wide' ? ' is-wide' : ''}${isLocked ? ' is-watermarked' : ''}`}
                      onContextMenu={
                        isLocked
                          ? (event) => {
                              event.preventDefault();
                            }
                          : undefined
                      }
                    >
                      {isLocked ? (
                        <div
                          className="assets-card-preview-bg"
                          style={{ backgroundImage: `url('${asset.src}')` }}
                          aria-hidden="true"
                        />
                      ) : (
                        <Image
                          src={asset.src}
                          alt={asset.title}
                          width={asset.width}
                          height={asset.height}
                          className="assets-card-preview-image"
                        />
                      )}
                      {isLocked ? (
                        <div className="assets-card-watermark" aria-hidden="true">
                          <span className="assets-card-watermark-badge">Protected Preview</span>
                          <span className="assets-card-watermark-text">TOP SHOP AWARDS</span>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div className="assets-card-preview is-placeholder">
                      <p className="assets-card-preview-note">
                        This file is managed by support request.
                      </p>
                    </div>
                  )}

                  <div className="assets-card-copy">
                    <div className="assets-card-tags">
                      <Badge variant="subtle">{assetTypeLabel}</Badge>
                      {asset.protection === 'public' ? (
                        <Badge variant="secondary">Public</Badge>
                      ) : isLocked ? (
                        <Badge variant="danger">Locked</Badge>
                      ) : (
                        <Badge variant="success">Unlocked</Badge>
                      )}
                    </div>
                    <h4>{asset.title}</h4>
                    <p>{asset.description}</p>
                    {asset.kind === 'download' ? (
                      <p className="assets-card-meta">
                        {asset.variants?.length
                          ? `PNG • ${asset.variants.length} Sizes (XL/LG/MD/SM)`
                          : `PNG • ${asset.dimensionsLabel}`}
                      </p>
                    ) : (
                      <p className="assets-card-meta">Managed By Support</p>
                    )}

                    {isLocked ? (
                      <div className="assets-card-actions is-single">
                        <Button type="button" variant="outline" size="sm" disabled>
                          <Lock size={14} aria-hidden="true" />
                          Locked
                        </Button>
                        <p className="assets-locked-note">
                          {isUnlocked ? (
                            <>
                              Current access is {grantedScopesLabel} for years {grantedYearsLabel}.
                            </>
                          ) : (
                            <>
                              Need access code? <a href={CONTACT_MAILTO_HREF}>{CONTACT_EMAIL}</a>
                            </>
                          )}
                        </p>
                      </div>
                    ) : asset.kind === 'download' && asset.variants?.length ? (
                      <AssetVariantActions variants={asset.variants} />
                    ) : asset.kind === 'download' ? (
                      <div className="assets-card-actions">
                        <Button asChild size="sm">
                          <a href={asset.src} download={asset.downloadName}>
                            <Download size={14} aria-hidden="true" />
                            Download
                          </a>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                          <a href={asset.src} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={14} aria-hidden="true" />
                            Preview
                          </a>
                        </Button>
                      </div>
                    ) : (
                      <div className="assets-card-actions is-single">
                        <Button asChild variant="outline" size="sm">
                          <a href={asset.requestHref}>
                            <Mail size={14} aria-hidden="true" />
                            {asset.requestLabel}
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
        ))
      ) : (
        <section className="assets-empty-state" aria-live="polite">
          <h3>No assets matched your filters.</h3>
          <p>Try changing search text, year, asset type, or access scope.</p>
          <Button type="button" variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </section>
      )}

      <section className="assets-usage-note">
        <h3>Usage Guidelines</h3>
        <p>
          Use these files only for your approved season status. Do not alter logo proportions,
          colors, or typography.
        </p>
        <p>
          For alternate formats or custom dimensions, email{' '}
          <a href={CONTACT_MAILTO_HREF}>{CONTACT_EMAIL}</a>.
        </p>
      </section>
    </>
  );
}
