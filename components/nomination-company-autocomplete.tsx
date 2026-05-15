'use client';

import { Input } from '@/components/ui/input';
import {
  type The145CompanySuggestion,
  fetchThe145CompanySuggestions,
} from '@/lib/the145-nomination';
import { useEffect, useId, useMemo, useRef, useState } from 'react';

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function highlightMatch(label: string, query: string) {
  if (!query) {
    return label;
  }

  const normalizedLabel = label.toLowerCase();
  const normalizedQuery = query.toLowerCase();
  const matchStart = normalizedLabel.indexOf(normalizedQuery);

  if (matchStart < 0) {
    return label;
  }

  const matchEnd = matchStart + query.length;

  return (
    <>
      {label.slice(0, matchStart)}
      <mark>{label.slice(matchStart, matchEnd)}</mark>
      {label.slice(matchEnd)}
    </>
  );
}

export function NominationCompanyAutocomplete({
  id,
  name,
  placeholder,
  value,
  onValueChange,
  onSuggestionSelect,
  fallbackOptions,
  maxSuggestions = 12,
}: {
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onValueChange: (value: string) => void;
  onSuggestionSelect: (suggestion: The145CompanySuggestion | null) => void;
  fallbackOptions: string[];
  maxSuggestions?: number;
}) {
  const listboxId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const requestIdRef = useRef(0);

  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [remoteSuggestions, setRemoteSuggestions] = useState<The145CompanySuggestion[]>([]);
  const [requestFailed, setRequestFailed] = useState(false);

  const fallbackMatches = useMemo(() => {
    const normalizedQuery = normalize(value);
    if (!normalizedQuery) {
      return [];
    }

    const startsWithMatches: string[] = [];
    const includesMatches: string[] = [];

    for (const option of fallbackOptions) {
      const normalizedOption = option.toLowerCase();
      if (!normalizedOption.includes(normalizedQuery)) {
        continue;
      }

      if (normalizedOption.startsWith(normalizedQuery)) {
        startsWithMatches.push(option);
      } else {
        includesMatches.push(option);
      }
    }

    return [...startsWithMatches, ...includesMatches].slice(0, maxSuggestions);
  }, [fallbackOptions, maxSuggestions, value]);

  const suggestions = useMemo(() => {
    if (remoteSuggestions.length > 0) {
      return remoteSuggestions;
    }

    return fallbackMatches.map((companyName) => ({
      FacilityId: -1,
      FacilityName: companyName,
      SelectCategory: 'No',
    }));
  }, [fallbackMatches, remoteSuggestions]);

  const isOpen = isFocused && suggestions.length > 0;

  useEffect(() => {
    const query = value.trim();

    if (query.length < 3) {
      setIsLoading(false);
      setRequestFailed(false);
      setRemoteSuggestions([]);
      return;
    }

    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    const debounceTimer = window.setTimeout(async () => {
      setIsLoading(true);
      try {
        const nextSuggestions = await fetchThe145CompanySuggestions(query);
        if (requestIdRef.current !== requestId) {
          return;
        }

        setRemoteSuggestions(nextSuggestions.slice(0, maxSuggestions));
        setRequestFailed(false);
      } catch {
        if (requestIdRef.current !== requestId) {
          return;
        }
        setRemoteSuggestions([]);
        setRequestFailed(true);
      } finally {
        if (requestIdRef.current === requestId) {
          setIsLoading(false);
        }
      }
    }, 220);

    return () => {
      window.clearTimeout(debounceTimer);
    };
  }, [maxSuggestions, value]);

  const applySelection = (suggestion: The145CompanySuggestion) => {
    onValueChange(suggestion.FacilityName);
    onSuggestionSelect(suggestion);
    setActiveIndex(-1);
    setIsFocused(false);
    inputRef.current?.focus();
  };

  return (
    <div className="nomination-company-autocomplete">
      <Input
        ref={inputRef}
        id={id}
        name={name}
        placeholder={placeholder}
        className="nomination-company-input"
        autoComplete="off"
        value={value}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onFocus={() => setIsFocused(true)}
        onChange={(event) => {
          onValueChange(event.target.value);
          onSuggestionSelect(null);
          setActiveIndex(-1);
        }}
        onBlur={() => {
          window.setTimeout(() => {
            setIsFocused(false);
          }, 80);
        }}
        onKeyDown={(event) => {
          if (!isOpen) {
            return;
          }

          if (event.key === 'ArrowDown') {
            event.preventDefault();
            setActiveIndex((current) =>
              current >= suggestions.length - 1 ? 0 : current + 1,
            );
            return;
          }

          if (event.key === 'ArrowUp') {
            event.preventDefault();
            setActiveIndex((current) =>
              current <= 0 ? suggestions.length - 1 : current - 1,
            );
            return;
          }

          if (event.key === 'Enter' && activeIndex >= 0) {
            event.preventDefault();
            applySelection(suggestions[activeIndex]);
            return;
          }

          if (event.key === 'Escape') {
            event.preventDefault();
            setIsFocused(false);
          }
        }}
      />

      {isOpen ? (
        <div className="nomination-company-dropdown" role="listbox" id={listboxId}>
          <div className="nomination-company-dropdown-head">
            <span>
              {isLoading
                ? 'Searching...'
                : requestFailed
                  ? 'Fallback suggestions'
                  : 'Suggestions'}
            </span>
            <strong>{suggestions.length}</strong>
          </div>

          <ul className="nomination-company-options">
            {suggestions.map((suggestion, index) => (
              <li key={`${suggestion.FacilityId}-${suggestion.FacilityName}`}>
                <button
                  type="button"
                  className={`nomination-company-option${activeIndex === index ? ' is-active' : ''}`}
                  role="option"
                  aria-selected={activeIndex === index}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseDown={(event) => {
                    event.preventDefault();
                  }}
                  onClick={() => applySelection(suggestion)}
                >
                  <span className="nomination-company-option-dot" aria-hidden="true" />
                  <span>{highlightMatch(suggestion.FacilityName, value.trim())}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

