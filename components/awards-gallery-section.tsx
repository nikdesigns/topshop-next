'use client';

import Image from 'next/image';
import { Video } from 'lucide-react';
import { HighlightsVideoModalTrigger } from '@/components/highlights-video-modal-trigger';
import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import type { AwardsGalleryVideo } from '@/lib/awards-gallery';

type YearFilter = 'all' | string;

function getYearLabel(year: YearFilter) {
  return year === 'all' ? 'All Years' : year;
}

export function AwardsGallerySection({
  videos,
}: {
  videos: AwardsGalleryVideo[];
}) {
  const [yearFilter, setYearFilter] = useState<YearFilter>('all');

  const sortedVideos = useMemo(() => {
    return [...videos].sort((a, b) => {
      const yearDelta = Number(b.year) - Number(a.year);
      if (yearDelta !== 0) {
        return yearDelta;
      }
      return a.title.localeCompare(b.title);
    });
  }, [videos]);

  const availableYears = useMemo(() => {
    return Array.from(new Set(sortedVideos.map((video) => video.year))).sort(
      (a, b) => Number(b) - Number(a),
    );
  }, [sortedVideos]);

  const yearFilters = useMemo<YearFilter[]>(() => {
    return ['all', ...availableYears];
  }, [availableYears]);

  const filteredVideos = useMemo(() => {
    if (yearFilter === 'all') {
      return sortedVideos;
    }

    return sortedVideos.filter((video) => video.year === yearFilter);
  }, [sortedVideos, yearFilter]);

  const stats = useMemo(() => {
    return {
      videos: sortedVideos.length,
      seasons: availableYears.length,
      latestSeason: availableYears[0] ?? 'N/A',
    };
  }, [sortedVideos, availableYears]);

  const groupedVideos = useMemo(() => {
    const grouped = new Map<string, AwardsGalleryVideo[]>();

    filteredVideos.forEach((video) => {
      const current = grouped.get(video.year) ?? [];
      current.push(video);
      grouped.set(video.year, current);
    });

    return Array.from(grouped.entries()).sort((a, b) => Number(b[0]) - Number(a[0]));
  }, [filteredVideos]);

  return (
    <section id="gallery" className="awards-gallery-section section-pad">
      <div className="awards-gallery-bg" aria-hidden="true" />
      <div className="content-wrap awards-gallery-wrap">
        <header className="awards-gallery-header site-prose">
          <Badge variant="secondary" className="awards-gallery-badge">
            <Video size={12} aria-hidden="true" />
            <span>Awards Video Library</span>
          </Badge>
          <h2>Top Shop Video Highlights by Year</h2>
          <p>
            Watch official Top Shop Awards recap videos by season, including
            winner presentations and event highlights.
          </p>
        </header>

        <div className="awards-gallery-summary" aria-label="Gallery summary">
          <article className="awards-gallery-summary-card">
            <p className="awards-gallery-summary-label">Videos</p>
            <p className="awards-gallery-summary-value">{stats.videos}</p>
          </article>
          <article className="awards-gallery-summary-card">
            <p className="awards-gallery-summary-label">Seasons With Video</p>
            <p className="awards-gallery-summary-value">{stats.seasons}</p>
          </article>
          <article className="awards-gallery-summary-card">
            <p className="awards-gallery-summary-label">Latest Season</p>
            <p className="awards-gallery-summary-value">{stats.latestSeason}</p>
          </article>
        </div>

        <div className="awards-gallery-toolbar">
          <div
            className="awards-gallery-filters"
            role="tablist"
            aria-label="Filter videos by year"
          >
            {yearFilters.map((year) => {
              const isActive = yearFilter === year;
              return (
                <button
                  key={year}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`awards-gallery-filter${isActive ? ' is-active' : ''}`}
                  onClick={() => setYearFilter(year)}
                >
                  {getYearLabel(year)}
                </button>
              );
            })}
          </div>
        </div>

        <div className="awards-gallery-results-head">
          <p>
            Showing <strong>{filteredVideos.length}</strong>{' '}
            {filteredVideos.length === 1 ? 'video' : 'videos'}
            {yearFilter === 'all'
              ? ' across all seasons'
              : ` for ${yearFilter}`}
            .
          </p>
        </div>

        {filteredVideos.length ? (
          <div className="awards-gallery-groups">
            {groupedVideos.map(([year, yearVideos]) => (
              <section className="awards-gallery-year-group" key={year}>
                <header className="awards-gallery-year-head">
                  <h3 className="awards-gallery-year-title">{year}</h3>
                  <p className="awards-gallery-year-count">
                    {yearVideos.length} {yearVideos.length === 1 ? 'video' : 'videos'}
                  </p>
                </header>

                <div className="awards-video-grid awards-video-grid--year">
                  {yearVideos.map((video) => (
                    <article className="awards-video-card awards-video-card--large" key={video.id}>
                      <div className="awards-video-player-shell">
                        {video.posterSrc ? (
                          <Image
                            src={video.posterSrc}
                            alt={video.title}
                            fill
                            sizes="(max-width: 900px) 100vw, 1060px"
                            className="awards-video-poster-image"
                          />
                        ) : (
                          <div className="awards-video-poster-fallback" />
                        )}
                        <HighlightsVideoModalTrigger
                          videoSrc={video.src}
                          title={video.title}
                          triggerClassName="awards-video-play-trigger"
                          triggerAriaLabel={`Play ${video.title}`}
                        >
                          <span className="awards-video-play-badge" aria-hidden="true">
                            <span className="awards-video-play-triangle" />
                          </span>
                        </HighlightsVideoModalTrigger>
                      </div>
                      <div className="awards-video-card-copy">
                        <p className="awards-video-card-meta">
                          <span>{video.year}</span>
                          <span>Official Recap</span>
                        </p>
                        <p className="awards-video-card-title">{video.title}</p>
                        <p className="awards-video-card-description">
                          {video.description}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : null}

        {!filteredVideos.length ? (
          <article className="awards-gallery-empty">
            <h3>No videos available yet</h3>
            <p>
              Add or update yearly YouTube links in{' '}
              <code>lib/awards-gallery.ts</code> to populate this section.
            </p>
          </article>
        ) : null}
      </div>
    </section>
  );
}
