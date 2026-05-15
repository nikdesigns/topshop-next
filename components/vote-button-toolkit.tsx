'use client';

import Image from 'next/image';
import { AppLink as Link } from '@/components/ui/app-link';
import { NominationCompanyAutocomplete } from '@/components/nomination-company-autocomplete';
import { type The145CompanySuggestion, encodeFacilityIdToken } from '@/lib/the145-nomination';
import { Check, Copy, Download, ExternalLink, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

type CopyTarget = 'url' | 'website' | 'email' | null;

export function VoteButtonToolkit({
  seasonLabel,
  buttonImagePath,
  buttonDownloadName,
  generatedBaseUrl,
  companyOptions,
}: {
  seasonLabel: string;
  buttonImagePath: string;
  buttonDownloadName: string;
  generatedBaseUrl: string;
  companyOptions: string[];
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<The145CompanySuggestion | null>(null);
  const [copiedTarget, setCopiedTarget] = useState<CopyTarget>(null);

  const normalizedCompany = companyName.trim();
  const facilityIdToken = useMemo(() => {
    if (!selectedCompany) {
      return '';
    }

    const facilityId = String(selectedCompany.FacilityId).trim();
    if (!facilityId || facilityId === '-1') {
      return '';
    }

    return encodeFacilityIdToken(facilityId);
  }, [selectedCompany]);

  const generatedUrl = useMemo(() => {
    if (!normalizedCompany || !facilityIdToken) {
      return '';
    }

    return `${generatedBaseUrl}?tsn#${facilityIdToken}`;
  }, [facilityIdToken, generatedBaseUrl, normalizedCompany]);

  const websiteSnippet = useMemo(() => {
    if (!generatedUrl) {
      return '';
    }

    return `<a href="${generatedUrl}" target="_blank" rel="noopener noreferrer">\n  <img src="${buttonImagePath}" alt="Top Shop Awards ${seasonLabel} Vote Button" width="160" height="53" />\n</a>`;
  }, [buttonImagePath, generatedUrl, seasonLabel]);

  const emailSnippet = useMemo(() => {
    if (!generatedUrl) {
      return '';
    }

    return `<a href="${generatedUrl}" target="_blank" rel="noopener noreferrer"><img src="${buttonImagePath}" alt="Top Shop Awards ${seasonLabel} Vote Button" width="160" height="53" style="display:block;border:0;" /></a>`;
  }, [buttonImagePath, generatedUrl, seasonLabel]);

  useEffect(() => {
    if (!isDialogOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDialogOpen(false);
      }
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isDialogOpen]);

  useEffect(() => {
    if (!isDialogOpen || typeof document === 'undefined') {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isDialogOpen]);

  const copyText = async (value: string, target: Exclude<CopyTarget, null>) => {
    if (!value) {
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setCopiedTarget(target);
      window.setTimeout(() => setCopiedTarget(null), 1800);
    } catch {
      setCopiedTarget(null);
    }
  };

  const portalRoot = typeof document !== 'undefined' ? document.body : null;

  return (
    <section className="vote-toolkit" aria-label="Vote button setup">
      <header className="vote-toolkit-head site-prose">
        <p className="vote-toolkit-kicker">Vote Button Setup</p>
        <h5>Download and configure your branded vote button</h5>
        <p>Generate a unique link by company name and embed the button on your website or email signature.</p>
      </header>

      <div className="vote-toolkit-inline">
        <div className="vote-toolkit-preview-image-wrap">
          <Image
            src={buttonImagePath}
            alt={`Top Shop Awards ${seasonLabel} Vote Button`}
            width={160}
            height={53}
            className="vote-toolkit-preview-image"
          />
        </div>

        <button
          type="button"
          className="vote-toolkit-open-btn"
          onClick={() => setIsDialogOpen(true)}
        >
          <ExternalLink size={14} aria-hidden="true" />
          Voting Button Setup
        </button>
      </div>

      {isDialogOpen && portalRoot
        ? createPortal(
        <div
          className="vote-toolkit-modal-backdrop"
          onClick={() => setIsDialogOpen(false)}
          role="presentation"
        >
          <div
            className="vote-toolkit-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="vote-toolkit-title"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="vote-toolkit-modal-head">
              <h6 id="vote-toolkit-title">Download Button Instructions</h6>
              <button
                type="button"
                className="vote-toolkit-modal-close"
                onClick={() => setIsDialogOpen(false)}
                aria-label="Close voting button instructions"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </header>

            <div className="vote-toolkit-modal-body">
              <div className="vote-toolkit-input-row">
                <label htmlFor="vote-toolkit-company-name">Company Name</label>
                <NominationCompanyAutocomplete
                  id="vote-toolkit-company-name"
                  name="companyName"
                  placeholder="Type your company name and select from suggestions"
                  value={companyName}
                  onValueChange={(value) => {
                    setCompanyName(value);
                    setSelectedCompany(null);
                  }}
                  onSuggestionSelect={(suggestion) => {
                    setSelectedCompany(suggestion);
                  }}
                  fallbackOptions={companyOptions}
                  maxSuggestions={10}
                />
              </div>

              <p className="vote-toolkit-modal-status">
                {generatedUrl
                  ? (
                    <>
                      Unique code generated for <strong>{normalizedCompany}</strong>.
                    </>
                  )
                  : 'Select a company from suggestions to generate a unique voting link.'}
              </p>

              <article className="vote-toolkit-step-card site-prose">
                <p>1) Copy this unique URL and use it as the link behind your vote button:</p>
                <div className="vote-toolkit-copy-row">
                  <input
                    type="text"
                    readOnly
                    value={generatedUrl}
                    placeholder="Unique URL appears here"
                    aria-label="Generated vote button URL"
                  />
                  <button
                    type="button"
                    className="vote-toolkit-copy-inline-btn"
                    disabled={!generatedUrl}
                    onClick={() => copyText(generatedUrl, 'url')}
                  >
                    {copiedTarget === 'url' ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
                    {copiedTarget === 'url' ? 'Copied' : 'Copy URL'}
                  </button>
                </div>
              </article>

              <article className="vote-toolkit-step-card site-prose">
                <p>2) Download the official button image and insert it in your website/email:</p>
                <a
                  href={buttonImagePath}
                  download={buttonDownloadName}
                  className="vote-toolkit-download-link"
                >
                  <Download size={14} aria-hidden="true" />
                  Download Vote Button
                </a>
              </article>

              <article className="vote-toolkit-step-card site-prose">
                <p>3) Use ready-made embed snippets:</p>
                <div className="vote-toolkit-snippet-grid">
                  <div className="vote-toolkit-snippet-block">
                    <div className="vote-toolkit-snippet-head">
                      <span>Website</span>
                      <button
                        type="button"
                        className="vote-toolkit-copy-inline-btn"
                        disabled={!websiteSnippet}
                        onClick={() => copyText(websiteSnippet, 'website')}
                      >
                        {copiedTarget === 'website' ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
                        {copiedTarget === 'website' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <pre>{websiteSnippet || 'Generate a URL first.'}</pre>
                  </div>

                  <div className="vote-toolkit-snippet-block">
                    <div className="vote-toolkit-snippet-head">
                      <span>Email Signature</span>
                      <button
                        type="button"
                        className="vote-toolkit-copy-inline-btn"
                        disabled={!emailSnippet}
                        onClick={() => copyText(emailSnippet, 'email')}
                      >
                        {copiedTarget === 'email' ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
                        {copiedTarget === 'email' ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <pre>{emailSnippet || 'Generate a URL first.'}</pre>
                  </div>
                </div>
              </article>

              {generatedUrl ? (
                <p className="vote-toolkit-modal-note">
                  Test link:{' '}
                  <Link href={generatedUrl} target="_blank" rel="noopener noreferrer">
                    Open generated destination
                  </Link>
                </p>
              ) : null}
            </div>
          </div>
        </div>
          ,
          portalRoot,
        )
        : null}
    </section>
  );
}
