import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { AwardsGallerySection } from '@/components/awards-gallery-section';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { getAwardsGalleryPhotos } from '@/lib/awards-gallery-source';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Awards Gallery | Top Shop Awards',
  description:
    'Browse official Top Shop Awards winner presentation photos and ceremony highlights by year.',
  alternates: {
    canonical: `${SITE_URL}/gallery.html`,
  },
};

export default function GalleryPage() {
  const galleryPhotos = getAwardsGalleryPhotos();

  return (
    <div className="app-shell assets-page-shell">
      <SiteHeader />
      <main>
        <section className="assets-page-title">
          <div className="assets-page-title-bg" aria-hidden="true">
            <Image
              src="/assets/images/page-titles/4.jpg"
              alt=""
              fill
              sizes="100vw"
              className="assets-page-title-image"
              priority
            />
          </div>
          <div className="section-pad">
            <div className="content-wrap assets-page-title-content">
              <h1>Awards Gallery</h1>
              <p>
                <Link href="/">Home</Link> / <span>Gallery</span>
              </p>
            </div>
          </div>
        </section>

        <AwardsGallerySection photos={galleryPhotos} />
      </main>
      <SiteFooter />
    </div>
  );
}
