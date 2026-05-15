'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NominationCompanyAutocomplete } from '@/components/nomination-company-autocomplete';
import type { NominationCategory } from '@/data/nomination-categories';
import {
  fetchPublicIpAddress,
  fetchThe145CategoriesByFacilityId,
  fetchThe145CategoriesByToken,
  submitThe145NominationVote,
  type The145CompanySuggestion,
} from '@/lib/the145-nomination';
import { CircleCheckBig, Loader2, ShieldCheck, TriangleAlert } from 'lucide-react';
import { type FormEvent, useEffect, useMemo, useState } from 'react';

const CATEGORY_COLUMN_COUNT = 3;

type SubmitState = 'idle' | 'submitting' | 'submitted' | 'error';

function toIdSet(records: { TopShopCategoryId: number | string | null }[]) {
  const categoryIds = records
    .map((item) => (item.TopShopCategoryId == null ? '' : String(item.TopShopCategoryId)))
    .filter(Boolean);

  return new Set(categoryIds);
}

export function NominationForm({
  categories,
  fallbackCompanyOptions,
}: {
  categories: NominationCategory[];
  fallbackCompanyOptions: string[];
}) {
  const [companyName, setCompanyName] = useState('');
  const [checkedCategoryIds, setCheckedCategoryIds] = useState<Set<string>>(() => new Set());
  const [lockedCategoryIds, setLockedCategoryIds] = useState<Set<string> | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [isPrefillingCategories, setIsPrefillingCategories] = useState(false);
  const [userIp, setUserIp] = useState('');

  const nominationCategoriesSorted = useMemo(
    () => [...categories].sort((a, b) => a.label.localeCompare(b.label)),
    [categories],
  );

  const categoryChunkSize = Math.ceil(
    nominationCategoriesSorted.length / CATEGORY_COLUMN_COUNT,
  );

  const nominationCategoryColumns = useMemo(
    () =>
      Array.from({ length: CATEGORY_COLUMN_COUNT }, (_, index) =>
        nominationCategoriesSorted.slice(
          index * categoryChunkSize,
          (index + 1) * categoryChunkSize,
        ),
      ),
    [categoryChunkSize, nominationCategoriesSorted],
  );

  const companySuggestionsCount = fallbackCompanyOptions.length;
  const totalCategories = nominationCategoriesSorted.length;

  useEffect(() => {
    let isMounted = true;

    fetchPublicIpAddress()
      .then((ip) => {
        if (isMounted) {
          setUserIp(ip);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const hash = window.location.hash.replace(/^#/, '').trim();
    if (!hash) {
      return () => {
        isMounted = false;
      };
    }

    setIsPrefillingCategories(true);
    fetchThe145CategoriesByToken(hash)
      .then((records) => {
        if (!isMounted || records.length === 0) {
          return;
        }

        const firstRecord = records[0];
        if (firstRecord?.FacilityName) {
          setCompanyName(firstRecord.FacilityName);
        }

        if (firstRecord?.FacilityId) {
        }

        const nextLockedSet = toIdSet(records);
        if (nextLockedSet.size > 0) {
          setLockedCategoryIds(nextLockedSet);
          setCheckedCategoryIds(nextLockedSet);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) {
          setIsPrefillingCategories(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSuggestionSelect = async (suggestion: The145CompanySuggestion | null) => {
    if (!suggestion) {
      setLockedCategoryIds(null);
      setCheckedCategoryIds(new Set());
      return;
    }

    if ((suggestion.SelectCategory || '').toLowerCase() !== 'yes') {
      setLockedCategoryIds(null);
      setCheckedCategoryIds(new Set());
      return;
    }

    setIsPrefillingCategories(true);
    try {
      const records = await fetchThe145CategoriesByFacilityId(String(suggestion.FacilityId));
      const nextLockedSet = toIdSet(records);
      if (nextLockedSet.size > 0) {
        setLockedCategoryIds(nextLockedSet);
        setCheckedCategoryIds(nextLockedSet);
      } else {
        setLockedCategoryIds(null);
        setCheckedCategoryIds(new Set());
      }
    } catch {
      setLockedCategoryIds(null);
      setCheckedCategoryIds(new Set());
    } finally {
      setIsPrefillingCategories(false);
    }
  };

  const handleCategoryToggle = (categoryId: string, nextChecked: boolean) => {
    setCheckedCategoryIds((current) => {
      const next = new Set(current);
      if (nextChecked) {
        next.add(categoryId);
      } else {
        next.delete(categoryId);
      }
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedCompanyName = companyName.trim();
    if (!trimmedCompanyName) {
      setSubmitState('error');
      setStatusMessage('Please select a company before submitting.');
      return;
    }

    if (checkedCategoryIds.size === 0) {
      setSubmitState('error');
      setStatusMessage('Please select at least one category.');
      return;
    }

    setSubmitState('submitting');
    setStatusMessage('Submitting your nomination...');

    const payload = new URLSearchParams();
    payload.set('CompanyName', trimmedCompanyName);
    payload.set('UserIp', userIp);

    [...checkedCategoryIds].forEach((categoryId) => {
      payload.append('categoryCheck[]', categoryId);
    });

    try {
      const result = await submitThe145NominationVote(payload);

      if (!result.ok) {
        throw new Error(result.raw || 'Nomination was not accepted.');
      }

      setSubmitState('submitted');
      setStatusMessage('Your vote has been submitted successfully.');
      setCompanyName('');
      setCheckedCategoryIds(new Set());
      setLockedCategoryIds(null);
    } catch {
      setSubmitState('error');
      setStatusMessage(
        'We could not submit right now. Please retry from topshopawards.com or contact support@the145.com.',
      );
    }
  };

  return (
    <form className="nomination-form nomination-form-rich" onSubmit={handleSubmit}>
      <input type="hidden" name="UserIp" value={userIp} />
      <Card className="nomination-company-card nomination-company-card-rich">
        <CardHeader>
          <CardTitle>Company Name</CardTitle>
        </CardHeader>
        <CardContent>
          <label htmlFor="companyName" className="sr-only">
            Company Name
          </label>
          <NominationCompanyAutocomplete
            id="companyName"
            name="companyName"
            placeholder="Enter company name here..."
            value={companyName}
            onValueChange={setCompanyName}
            onSuggestionSelect={handleSuggestionSelect}
            fallbackOptions={fallbackCompanyOptions}
            maxSuggestions={14}
          />
          <p className="nomination-company-note">
            Autocomplete includes {companySuggestionsCount} known companies from past Top Shop
            finalists and winners.
          </p>
        </CardContent>
      </Card>

      <div className="nomination-chip-info nomination-chip-info-rich">
        <h3>Select all categories that apply</h3>
        <p>Multiple selections are allowed.</p>
      </div>

      <div className="nomination-category-shell">
        <header className="nomination-category-shell-head">
          <div>
            <h3>Category Directory</h3>
            <p>Categories are listed alphabetically. Select all that apply.</p>
          </div>
          <p className="nomination-category-total">{totalCategories} Categories</p>
        </header>

        {isPrefillingCategories ? (
          <p className="nomination-prefill-status" role="status">
            <Loader2 size={14} className="spin" aria-hidden="true" />
            Loading matching categories for selected company...
          </p>
        ) : null}

        <fieldset className="nomination-category-fieldset">
          <legend className="sr-only">Nomination Categories</legend>
          <div className="nomination-category-columns">
            {nominationCategoryColumns.map((column, columnIndex) => (
              <div key={`column-${columnIndex}`} className="nomination-category-column">
                {column.map((category) => {
                  const isLocked = lockedCategoryIds !== null;
                  const isAllowed = !isLocked || lockedCategoryIds.has(category.id);
                  const isChecked = checkedCategoryIds.has(category.id);

                  return (
                    <label
                      key={category.id}
                      htmlFor={`category-${category.id}`}
                      className={`nomination-category-item${!isAllowed ? ' is-disabled' : ''}`}
                    >
                      <Checkbox
                        id={`category-${category.id}`}
                        name="categoryCheck[]"
                        value={category.id}
                        checked={isChecked}
                        disabled={!isAllowed}
                        onCheckedChange={(checked) =>
                          handleCategoryToggle(category.id, Boolean(checked))
                        }
                      />
                      <span>{category.label}</span>
                    </label>
                  );
                })}
              </div>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="nomination-actions nomination-actions-rich">
        <Button type="submit" size="lg" disabled={submitState === 'submitting'}>
          {submitState === 'submitting' ? 'Submitting...' : 'Submit Nomination'}
        </Button>

        <p className="nomination-actions-note">
          <ShieldCheck size={14} aria-hidden="true" />
          <span>Your category selections remain visible for review before submit.</span>
        </p>

        <p className={`nomination-submit-feedback nomination-submit-feedback--${submitState}`} role="status">
          {submitState === 'submitted' ? <CircleCheckBig size={14} aria-hidden="true" /> : null}
          {submitState === 'error' ? <TriangleAlert size={14} aria-hidden="true" /> : null}
          <span>{statusMessage || ' '}</span>
        </p>
      </div>
    </form>
  );
}
