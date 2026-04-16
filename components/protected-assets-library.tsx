'use client';

import { FormEvent, useState, useSyncExternalStore } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Download, ExternalLink, Lock, Mail, ShieldCheck, Unlock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ASSET_ACCESS_CODE_RULES,
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

const EMPTY_GRANTED_YEARS: AssetYear[] = [];
const ASSET_ACCESS_CHANGE_EVENT = 'topshop-asset-access-change';
let cachedGrantedYearsKey = '__server__';
let cachedGrantedYearsSnapshot: AssetYear[] = EMPTY_GRANTED_YEARS;

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
      event.key === ASSET_ACCESS_YEARS_SESSION_KEY
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

function readGrantedYearsFromSessionStorage(): AssetYear[] {
  if (typeof window === 'undefined') {
    return EMPTY_GRANTED_YEARS;
  }

  try {
    const isGranted = window.sessionStorage.getItem(ASSET_ACCESS_SESSION_KEY) === 'true';
    const rawYears = isGranted
      ? window.sessionStorage.getItem(ASSET_ACCESS_YEARS_SESSION_KEY)
      : null;
    const nextCacheKey = `${isGranted ? '1' : '0'}:${rawYears ?? ''}`;

    if (nextCacheKey === cachedGrantedYearsKey) {
      return cachedGrantedYearsSnapshot;
    }

    cachedGrantedYearsKey = nextCacheKey;
    cachedGrantedYearsSnapshot = isGranted
      ? parseGrantedYears(rawYears)
      : EMPTY_GRANTED_YEARS;

    return cachedGrantedYearsSnapshot;
  } catch {
    return EMPTY_GRANTED_YEARS;
  }
}

function getServerGrantedYearsSnapshot() {
  return EMPTY_GRANTED_YEARS;
}

function notifyAssetAccessChange() {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(new Event(ASSET_ACCESS_CHANGE_EVENT));
}

export function ProtectedAssetsLibrary({ bundles }: ProtectedAssetsLibraryProps) {
  const grantedYears = useSyncExternalStore(
    subscribeToAssetAccessChanges,
    readGrantedYearsFromSessionStorage,
    getServerGrantedYearsSnapshot,
  );
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const isUnlocked = grantedYears.length > 0;
  const grantedYearsLabel = [...grantedYears].sort((a, b) => b - a).join(', ');

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

    setCode('');
    setIsChecking(false);

    try {
      window.sessionStorage.setItem(ASSET_ACCESS_SESSION_KEY, 'true');
      window.sessionStorage.setItem(ASSET_ACCESS_YEARS_SESSION_KEY, JSON.stringify(years));
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
            Access verified for years: {grantedYearsLabel}. Protected logos are unlocked for this
            browser session.
          </p>
        ) : (
          <form className="assets-access-form" onSubmit={handleSubmit}>
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
            <Button type="submit" size="sm" disabled={isChecking}>
              <ShieldCheck size={14} aria-hidden="true" />
              {isChecking ? 'Checking...' : 'Unlock Assets'}
            </Button>
          </form>
        )}

        {error ? (
          <p role="alert" className="assets-access-error">
            {error}
          </p>
        ) : null}
      </section>

      <nav className="assets-quick-links" aria-label="Asset years">
        {bundles.map((bundle) => (
          <Link key={bundle.year} href={`#asset-year-${bundle.year}`}>
            {bundle.year}
          </Link>
        ))}
      </nav>

      {bundles.map((bundle) => (
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
              const isLocked = asset.protection === 'protected' && !isYearAllowed;

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
                            <>This code unlocks years: {grantedYearsLabel}.</>
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
      ))}

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
