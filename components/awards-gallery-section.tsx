'use client';

import Image from 'next/image';
import { Camera, Images } from 'lucide-react';
import { useMemo, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import { AWARDS_GALLERY_PHOTOS, type AwardsGalleryYear } from '@/lib/awards-gallery';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type YearFilter = 'all' | AwardsGalleryYear;

const YEAR_FILTERS: YearFilter[] = ['all', '2026', '2025', '2024'];

function getYearLabel(year: YearFilter) {
  return year === 'all' ? 'All Years' : year;
}

export function AwardsGallerySection() {
  const [yearFilter, setYearFilter] = useState<YearFilter>('all');
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const filteredPhotos = useMemo(() => {
    if (yearFilter === 'all') {
      return AWARDS_GALLERY_PHOTOS;
    }

    return AWARDS_GALLERY_PHOTOS.filter((photo) => photo.year === yearFilter);
  }, [yearFilter]);

  const slides = useMemo(
    () =>
      filteredPhotos.map((photo) => ({
        src: photo.src,
        width: photo.width,
        height: photo.height,
        title: photo.companyName,
        description: `${photo.winnerCategory} • ${photo.year}`,
      })),
    [filteredPhotos],
  );

  const stats = useMemo(() => {
    const years = new Set(filteredPhotos.map((photo) => photo.year));
    const categories = new Set(filteredPhotos.map((photo) => photo.category));
    return {
      photos: filteredPhotos.length,
      years: years.size,
      categories: categories.size,
    };
  }, [filteredPhotos]);

  return (
    <section id="gallery" className="awards-gallery-section section-pad">
      <div className="awards-gallery-bg" aria-hidden="true" />
      <div className="content-wrap awards-gallery-wrap">
        <header className="awards-gallery-header">
          <Badge variant="secondary" className="awards-gallery-badge">
            <Camera size={12} aria-hidden="true" />
            <span>Awards Gallery</span>
          </Badge>
          <h2>Winner Recognition Gallery</h2>
          <p>
            A curated visual archive of award presentations across recent Top Shop seasons.
          </p>
        </header>

        <div className="awards-gallery-summary" aria-label="Gallery summary">
          <article className="awards-gallery-summary-card">
            <p className="awards-gallery-summary-label">Photos</p>
            <p className="awards-gallery-summary-value">{stats.photos}</p>
          </article>
          <article className="awards-gallery-summary-card">
            <p className="awards-gallery-summary-label">Seasons</p>
            <p className="awards-gallery-summary-value">{stats.years}</p>
          </article>
          <article className="awards-gallery-summary-card">
            <p className="awards-gallery-summary-label">Categories</p>
            <p className="awards-gallery-summary-value">{stats.categories}</p>
          </article>
        </div>

        <div className="awards-gallery-toolbar">
          <div className="awards-gallery-filters" role="tablist" aria-label="Filter gallery by year">
            {YEAR_FILTERS.map((year) => {
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
          <Button type="button" variant="outline" size="sm" className="awards-gallery-open-all-btn" onClick={() => setSelectedIndex(0)} disabled={!filteredPhotos.length}>
            <Images size={14} aria-hidden="true" />
            Open Gallery
          </Button>
        </div>

        {filteredPhotos.length ? (
          <div className="awards-gallery-grid">
            {filteredPhotos.map((photo, index) => (
              <button
                key={`${photo.src}-${photo.year}`}
                type="button"
                className={`awards-gallery-card${index % 7 === 0 ? ' is-wide' : ''}`}
                onClick={() => setSelectedIndex(index)}
              >
                <Image
                  src={photo.src}
                  alt={`${photo.title} (${photo.year})`}
                  width={photo.width}
                  height={photo.height}
                  className="awards-gallery-card-image"
                />
                <span className="awards-gallery-card-overlay" aria-hidden="true" />
                <span className="awards-gallery-year-badge">{photo.year}</span>
                <span className="awards-gallery-card-content">
                  <strong>{photo.companyName}</strong>
                  <small className="awards-gallery-winner-category">
                    Winner Category: {photo.winnerCategory}
                  </small>
                  <small>
                    {photo.year} • {photo.category}
                  </small>
                </span>
              </button>
            ))}
          </div>
        ) : (
          <article className="awards-gallery-empty">
            <h3>No photos available for this filter</h3>
            <p>Select a different season to continue browsing.</p>
          </article>
        )}
      </div>

      <Lightbox
        open={selectedIndex >= 0}
        close={() => setSelectedIndex(-1)}
        index={selectedIndex}
        slides={slides}
        plugins={[Thumbnails, Zoom]}
        carousel={{ finite: false }}
        zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true }}
        thumbnails={{ position: 'bottom', width: 96, height: 64, border: 0, borderRadius: 8 }}
      />
    </section>
  );
}
