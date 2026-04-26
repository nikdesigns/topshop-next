'use client';

import Image from 'next/image';
import { Camera, Images } from 'lucide-react';
import { useMemo, useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import type { AwardsGalleryPhoto } from '@/lib/awards-gallery';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type YearFilter = 'all' | string;
type YearGroup = {
  year: string;
  photos: AwardsGalleryPhoto[];
};

function getPhotoKey(photo: AwardsGalleryPhoto) {
  return `${photo.year}::${photo.src}`;
}

function getYearLabel(year: YearFilter) {
  return year === 'all' ? 'All Years' : year;
}

function getGalleryCardVariant(index: number) {
  const pattern = [
    'is-tall',
    'is-square',
    'is-tall',
    'is-wide',
    'is-square',
    'is-landscape',
    'is-portrait',
    'is-wide',
  ] as const;

  return pattern[index % pattern.length];
}

export function AwardsGallerySection({ photos }: { photos: AwardsGalleryPhoto[] }) {
  const [yearFilter, setYearFilter] = useState<YearFilter>('all');
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const yearFilters = useMemo<YearFilter[]>(() => {
    const years = Array.from(new Set(photos.map((photo) => photo.year))).sort(
      (a, b) => Number(b) - Number(a),
    );
    return ['all', ...years];
  }, [photos]);

  const filteredPhotos = useMemo(() => {
    if (yearFilter === 'all') {
      return photos;
    }

    return photos.filter((photo) => photo.year === yearFilter);
  }, [photos, yearFilter]);

  const slides = useMemo(
    () =>
      filteredPhotos.map((photo) => ({
        src: photo.src,
        width: photo.width,
        height: photo.height,
      })),
    [filteredPhotos],
  );

  const stats = useMemo(() => {
    const years = new Set(filteredPhotos.map((photo) => photo.year));
    return {
      photos: filteredPhotos.length,
      albums: years.size,
    };
  }, [filteredPhotos]);

  const groupedPhotos = useMemo<YearGroup[]>(() => {
    const groups = new Map<string, AwardsGalleryPhoto[]>();
    for (const photo of filteredPhotos) {
      const existing = groups.get(photo.year);
      if (existing) {
        existing.push(photo);
      } else {
        groups.set(photo.year, [photo]);
      }
    }

    return Array.from(groups.entries()).map(([year, items]) => ({
      year,
      photos: items,
    }));
  }, [filteredPhotos]);

  const indexByPhotoKey = useMemo(() => {
    const indexMap = new Map<string, number>();
    filteredPhotos.forEach((photo, index) => {
      indexMap.set(getPhotoKey(photo), index);
    });
    return indexMap;
  }, [filteredPhotos]);

  return (
    <section id="gallery" className="awards-gallery-section section-pad">
      <div className="awards-gallery-bg" aria-hidden="true" />
      <div className="content-wrap awards-gallery-wrap">
        <header className="awards-gallery-header site-prose">
          <Badge variant="secondary" className="awards-gallery-badge">
            <Camera size={12} aria-hidden="true" />
            <span>Awards Gallery</span>
          </Badge>
          <h2>Award Moments by Year</h2>
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
            <p className="awards-gallery-summary-label">Albums</p>
            <p className="awards-gallery-summary-value">{stats.albums}</p>
          </article>
        </div>

        <div className="awards-gallery-toolbar">
          <div className="awards-gallery-filters" role="tablist" aria-label="Filter gallery by year">
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
          <Button type="button" variant="outline" size="sm" className="awards-gallery-open-all-btn" onClick={() => setSelectedIndex(0)} disabled={!filteredPhotos.length}>
            <Images size={14} aria-hidden="true" />
            Open Gallery
          </Button>
        </div>

        {filteredPhotos.length ? (
          <div className="awards-gallery-groups">
            {groupedPhotos.map((group) => (
              <section className="awards-gallery-year-group" key={group.year}>
                {yearFilter === 'all' ? (
                  <header className="awards-gallery-year-head">
                    <h3 className="awards-gallery-year-title">{group.year}</h3>
                    <p className="awards-gallery-year-count">{group.photos.length} photos</p>
                  </header>
                ) : null}

                <div className="awards-gallery-grid">
                  {group.photos.map((photo, index) => {
                    const variantClass = getGalleryCardVariant(index);
                    const imageIndex = indexByPhotoKey.get(getPhotoKey(photo)) ?? 0;

                    return (
                      <button
                        key={getPhotoKey(photo)}
                        type="button"
                        className={`awards-gallery-card${variantClass ? ` ${variantClass}` : ''}`}
                        onClick={() => setSelectedIndex(imageIndex)}
                        aria-label={`Open ${photo.companyName} winner photo for ${photo.year}`}
                      >
                        <div className="awards-gallery-card-media">
                          <Image
                            src={photo.thumbnailSrc ?? photo.src}
                            alt={`${photo.title} (${photo.year})`}
                            fill
                            sizes="(max-width: 560px) 100vw, (max-width: 860px) 50vw, (max-width: 1100px) 67vw, 25vw"
                            className="awards-gallery-card-image"
                          />
                          <span className="awards-gallery-card-overlay" aria-hidden="true" />
                          <span className="awards-gallery-year-badge">{photo.year}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
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
