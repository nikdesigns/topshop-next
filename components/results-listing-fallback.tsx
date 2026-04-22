type ResultsListingFallbackProps = {
  namespace: string;
  label: string;
};

export function ResultsListingFallback({ namespace, label }: ResultsListingFallbackProps) {
  return (
    <section
      className={`${namespace}-listing section-pad results-listing-fallback`}
      aria-busy="true"
      aria-live="polite"
      aria-label={label}
    >
      <div className={`content-wrap ${namespace}-listing-wrap`}>
        <p className="results-listing-fallback-note">{label}</p>

        <div className={`${namespace}-summary-row`} aria-hidden="true">
          {Array.from({ length: 3 }).map((_, index) => (
            <article key={`summary-${index}`} className={`${namespace}-summary-card`}>
              <div className="results-listing-fallback-line results-listing-fallback-line--value" />
              <div className="results-listing-fallback-line results-listing-fallback-line--label" />
            </article>
          ))}
        </div>

        <div className={`${namespace}-controls`} aria-hidden="true">
          <div className={`${namespace}-search`}>
            <div className="results-listing-fallback-line results-listing-fallback-line--search" />
          </div>
          <div className={`${namespace}-filter-row`}>
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`filter-${index}`}
                className="results-listing-fallback-chip"
              />
            ))}
          </div>
        </div>

        <div className={`${namespace}-grid`} aria-hidden="true">
          {Array.from({ length: 4 }).map((_, index) => (
            <article key={`card-${index}`} className={`${namespace === 'winners-results' ? 'winner' : 'finalist'}-result-card`}>
              <div className="results-listing-fallback-line results-listing-fallback-line--title" />
              <div className="results-listing-fallback-line results-listing-fallback-line--item" />
              <div className="results-listing-fallback-line results-listing-fallback-line--item short" />
              <div className="results-listing-fallback-line results-listing-fallback-line--item" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
