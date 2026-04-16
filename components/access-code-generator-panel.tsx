'use client';

import { FormEvent, useMemo, useState } from 'react';
import { Check, Copy, KeyRound, Lock, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sha256Hex } from '@/lib/crypto-client';
import { ASSET_YEARS, type AssetYear } from '@/lib/assets-downloads';

const GENERATOR_PASSWORD = 'topshop';

function buildRandomCode(year: AssetYear) {
  if (typeof window === 'undefined' || !window.crypto?.getRandomValues) {
    return `TS-ASSET-${year}-ACCESS`;
  }

  const randomBytes = new Uint8Array(4);
  window.crypto.getRandomValues(randomBytes);
  const suffix = Array.from(randomBytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase();

  return `TS-ASSET-${year}-${suffix}`;
}

export function AccessCodeGeneratorPanel() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [plainCode, setPlainCode] = useState('');
  const [hashValue, setHashValue] = useState('');
  const [targetYear, setTargetYear] = useState<AssetYear>(2026);
  const [generatorError, setGeneratorError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const snippet = useMemo(() => {
    if (!hashValue) {
      return '';
    }

    return `{\n  hash: '${hashValue}',\n  years: [${targetYear}],\n},`;
  }, [hashValue, targetYear]);

  const generateAccessPair = async () => {
    const nextCode = buildRandomCode(targetYear);
    setIsGenerating(true);
    setGeneratorError('');
    setCopiedHash(false);
    setCopiedSnippet(false);
    setPlainCode(nextCode);

    const hash = await sha256Hex(nextCode);
    if (!hash) {
      setGeneratorError('Secure hash API is unavailable in this browser.');
      setHashValue('');
      setIsGenerating(false);
      return;
    }

    setHashValue(hash);
    setIsGenerating(false);
  };

  const handleUnlock = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passwordInput.trim() !== GENERATOR_PASSWORD) {
      setPasswordError('Invalid password.');
      return;
    }

    setIsUnlocked(true);
    setPasswordError('');
    setPasswordInput('');
    void generateAccessPair();
  };

  const handleLock = () => {
    setIsUnlocked(false);
    setPasswordInput('');
    setPasswordError('');
    setPlainCode('');
    setHashValue('');
    setGeneratorError('');
    setCopiedCode(false);
    setCopiedHash(false);
    setCopiedSnippet(false);
  };

  const copyText = async (value: string, target: 'code' | 'hash' | 'snippet') => {
    if (!value || !navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(value);

    if (target === 'code') {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 1400);
      return;
    }

    if (target === 'hash') {
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 1400);
      return;
    }

    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 1400);
  };

  return (
    <section className="codegen-panel">
      <div className="codegen-head">
        <div className="codegen-title-wrap">
          <Badge variant={isUnlocked ? 'success' : 'danger'} className="assets-library-badge">
            {isUnlocked ? <KeyRound size={12} aria-hidden="true" /> : <Lock size={12} aria-hidden="true" />}
            <span>{isUnlocked ? 'Generator Unlocked' : 'Generator Locked'}</span>
          </Badge>
          <h3>Access Code Generator</h3>
          <p>
            Unlock once and the page automatically generates a new access code and matching
            SHA-256 hash for the selected year.
          </p>
        </div>
        {isUnlocked ? (
          <Button type="button" variant="outline" size="sm" onClick={handleLock}>
            <Lock size={14} aria-hidden="true" />
            Lock Page
          </Button>
        ) : null}
      </div>

      {!isUnlocked ? (
        <form className="codegen-auth-form" onSubmit={handleUnlock}>
          <label htmlFor="generatorPassword" className="sr-only">
            Generator password
          </label>
          <Input
            id="generatorPassword"
            type="password"
            value={passwordInput}
            onChange={(event) => setPasswordInput(event.target.value)}
            placeholder="Enter generator password"
            autoComplete="current-password"
          />
          <Button type="submit" size="sm">
            <KeyRound size={14} aria-hidden="true" />
            Unlock
          </Button>
          {passwordError ? (
            <p className="codegen-error" role="alert">
              {passwordError}
            </p>
          ) : null}
        </form>
      ) : (
        <div className="codegen-tools">
          <div className="codegen-auto-actions">
            <p className="codegen-status">
              {isGenerating ? 'Generating a new access code...' : 'A fresh access code is ready.'}
            </p>
            <label className="codegen-year-control">
              <span>Year</span>
              <select
                value={targetYear}
                onChange={(event) => {
                  const nextYear = Number(event.target.value) as AssetYear;
                  setTargetYear(nextYear);
                  setHashValue('');
                  setGeneratorError('');
                  setCopiedCode(false);
                  setCopiedHash(false);
                  setCopiedSnippet(false);
                  void (async () => {
                    const nextCode = buildRandomCode(nextYear);
                    setIsGenerating(true);
                    setPlainCode(nextCode);
                    const hash = await sha256Hex(nextCode);
                    if (!hash) {
                      setGeneratorError('Secure hash API is unavailable in this browser.');
                      setHashValue('');
                      setIsGenerating(false);
                      return;
                    }
                    setHashValue(hash);
                    setIsGenerating(false);
                  })();
                }}
                className="ui-input"
              >
                {ASSET_YEARS.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </label>
            <Button type="button" variant="outline" size="sm" onClick={() => void generateAccessPair()}>
              <RefreshCw size={14} aria-hidden="true" />
              Generate New Code
            </Button>
          </div>

          {generatorError ? (
            <p className="codegen-error" role="alert">
              {generatorError}
            </p>
          ) : null}

          {hashValue ? (
            <div className="codegen-result">
              <div className="codegen-result-block">
                <p>Access Code</p>
                <code>{plainCode}</code>
                <Button type="button" variant="outline" size="sm" onClick={() => copyText(plainCode, 'code')}>
                  {copiedCode ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                  {copiedCode ? 'Copied' : 'Copy Code'}
                </Button>
              </div>

              <div className="codegen-result-block">
                <p>SHA-256 Hash</p>
                <code>{hashValue}</code>
                <Button type="button" variant="outline" size="sm" onClick={() => copyText(hashValue, 'hash')}>
                  {copiedHash ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                  {copiedHash ? 'Copied' : 'Copy Hash'}
                </Button>
              </div>

              <div className="codegen-result-block">
                <p>Paste Snippet</p>
                <pre>{snippet}</pre>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => copyText(snippet, 'snippet')}
                >
                  {copiedSnippet ? (
                    <Check size={14} aria-hidden="true" />
                  ) : (
                    <Copy size={14} aria-hidden="true" />
                  )}
                  {copiedSnippet ? 'Copied' : 'Copy Snippet'}
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}
