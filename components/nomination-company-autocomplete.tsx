'use client';

import { useId, useMemo, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';

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
  options,
  maxSuggestions = 12,
}: {
  id: string;
  name: string;
  placeholder: string;
  options: string[];
  maxSuggestions?: number;
}) {
  const listboxId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return [];
    }

    const startsWithMatches: string[] = [];
    const includesMatches: string[] = [];

    for (const option of options) {
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
  }, [maxSuggestions, options, query]);

  const isOpen = isFocused && filteredOptions.length > 0;

  const applySelection = (nextValue: string) => {
    setQuery(nextValue);
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
        value={query}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onFocus={() => setIsFocused(true)}
        onChange={(event) => {
          setQuery(event.target.value);
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
              current >= filteredOptions.length - 1 ? 0 : current + 1,
            );
            return;
          }

          if (event.key === 'ArrowUp') {
            event.preventDefault();
            setActiveIndex((current) =>
              current <= 0 ? filteredOptions.length - 1 : current - 1,
            );
            return;
          }

          if (event.key === 'Enter' && activeIndex >= 0) {
            event.preventDefault();
            applySelection(filteredOptions[activeIndex]);
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
            <span>Suggestions</span>
            <strong>{filteredOptions.length}</strong>
          </div>

          <ul className="nomination-company-options">
            {filteredOptions.map((option, index) => (
              <li key={option}>
                <button
                  type="button"
                  className={`nomination-company-option${activeIndex === index ? ' is-active' : ''}`}
                  role="option"
                  aria-selected={activeIndex === index}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseDown={(event) => {
                    event.preventDefault();
                  }}
                  onClick={() => applySelection(option)}
                >
                  <span className="nomination-company-option-dot" aria-hidden="true" />
                  <span>{highlightMatch(option, query.trim())}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
