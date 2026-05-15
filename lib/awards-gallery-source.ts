import 'server-only';

import {
  AWARDS_GALLERY_VIDEOS,
  AWARDS_GALLERY_YEARS,
  type AwardsGalleryVideo,
  type AwardsGalleryYear,
} from '@/lib/awards-gallery';

export function getAwardsGalleryVideos(): AwardsGalleryVideo[] {
  return AWARDS_GALLERY_VIDEOS;
}

export function getAwardsGalleryYears(): AwardsGalleryYear[] {
  return AWARDS_GALLERY_YEARS;
}
