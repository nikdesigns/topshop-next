import { galleryPageMetadata } from '@/components/pages/gallery-page';
import GalleryPageContent from '@/components/pages/gallery-page';

export const metadata = galleryPageMetadata;

export default function GalleryHtmlPage() {
  return <GalleryPageContent />;
}
