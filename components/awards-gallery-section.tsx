'use client';

import dynamic from 'next/dynamic';
import { Film, Video } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import type { AwardsGalleryVideo } from '@/lib/awards-gallery';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });
const PLAYER_CONFIG = {
  hls: {
    lowLatencyMode: true,
    backBufferLength: 90,
    maxBufferLength: 60,
  },
} as const;

type YearFilter = 'all' | string;

function getYearLabel(year: YearFilter) {
  return year === 'all' ? 'All Years' : year;
}

export function AwardsGallerySection({ videos }: { videos: AwardsGalleryVideo[] }) {
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
            Watch official Top Shop Awards recap videos by season, including winner
            presentations and event highlights.
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
          <div className="awards-gallery-filters" role="tablist" aria-label="Filter videos by year">
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
            {yearFilter === 'all' ? ' across all seasons' : ` for ${yearFilter}`}.
          </p>
        </div>

        {filteredVideos.length ? (
          <div className="awards-video-grid">
            {filteredVideos.map((video) => (
              <article className="awards-video-card" key={video.id}>
                <div className="awards-video-player-shell">
                  <ReactPlayer
                    src={video.src}
                    controls
                    playsInline
                    preload="metadata"
                    width="100%"
                    height="100%"
                    light={video.posterSrc ?? false}
                    config={PLAYER_CONFIG}
                    style={{ width: '100%', height: 'auto', aspectRatio: '16 / 9' }}
                  />
                </div>
                <div className="awards-video-card-copy">
                  <p className="awards-video-card-meta">
                    <span>{video.year}</span>
                    <span>Official Recap</span>
                  </p>
                  <p className="awards-video-card-title">{video.title}</p>
                  <p className="awards-video-card-description">{video.description}</p>
                </div>
              </article>
            ))}
          </div>
        ) : null}

        {!filteredVideos.length ? (
          <article className="awards-gallery-empty">
            <h3>No videos available yet</h3>
            <p>
              Add yearly videos under <code>public/assets/videos/gallery/&lt;year&gt;/</code> to populate this section.
            </p>
          </article>
        ) : null}

        <p className="awards-video-upload-note">
          <Film size={14} aria-hidden="true" />
          Supported formats: mp4, webm, mov, m4v, ogv
        </p>
      </div>
    </section>
  );
}
