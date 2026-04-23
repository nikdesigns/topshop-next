import 'server-only';

import { existsSync, readdirSync } from 'node:fs';
import { join, extname, basename } from 'node:path';
import {
  DEFAULT_AWARDS_GALLERY_PHOTOS,
  type AwardsGalleryPhoto,
} from '@/lib/awards-gallery';

const GALLERY_ROOT = join(process.cwd(), 'public', 'assets', 'images', 'gallery');
const GALLERY_OPTIMIZED_ROOT = join(GALLERY_ROOT, '_optimized');
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const DEFAULT_WIDTH = 1600;
const DEFAULT_HEIGHT = 1067;

function isImageFile(fileName: string) {
  return IMAGE_EXTENSIONS.has(extname(fileName).toLowerCase());
}

function toTitleCase(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function humanize(value: string) {
  return toTitleCase(value.replace(/[_-]+/g, ' ').trim());
}

function parseFileMetadata(fileName: string) {
  const fileBase = basename(fileName, extname(fileName));
  const [companyRaw, categoryRaw, titleRaw] = fileBase.split('__');
  const companyName = humanize(companyRaw || fileBase);
  const winnerCategory = categoryRaw ? humanize(categoryRaw) : 'Winner Category';
  const title = titleRaw ? humanize(titleRaw) : `${companyName} Recognition`;

  return { companyName, winnerCategory, title };
}

function getOptimizedFileName(sourceFileName: string) {
  const sourceExtension = extname(sourceFileName).toLowerCase().slice(1);
  const fileBase = basename(sourceFileName, extname(sourceFileName));
  return `${fileBase}-${sourceExtension}.webp`;
}

function listYearFolders() {
  if (!existsSync(GALLERY_ROOT)) {
    return [];
  }

  return readdirSync(GALLERY_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^\d{4}$/.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => Number(b) - Number(a));
}

function loadPhotosFromFolders(): AwardsGalleryPhoto[] {
  const photos: AwardsGalleryPhoto[] = [];

  for (const year of listYearFolders()) {
    const yearDir = join(GALLERY_ROOT, year);
    const files = readdirSync(yearDir)
      .filter((fileName) => isImageFile(fileName))
      .sort((a, b) => a.localeCompare(b));

    for (const fileName of files) {
      const { companyName, winnerCategory, title } = parseFileMetadata(fileName);
      const fullSrc = `/assets/images/gallery/${year}/${fileName}`;
      const optimizedFileName = getOptimizedFileName(fileName);
      const optimizedPath = join(GALLERY_OPTIMIZED_ROOT, year, optimizedFileName);
      const thumbnailSrc = existsSync(optimizedPath)
        ? `/assets/images/gallery/_optimized/${year}/${optimizedFileName}`
        : fullSrc;

      photos.push({
        src: fullSrc,
        thumbnailSrc,
        title,
        companyName,
        winnerCategory,
        year,
        category: 'Winner Presentation',
        location: 'MRO Americas',
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
      });
    }
  }

  return photos;
}

export function getAwardsGalleryPhotos(): AwardsGalleryPhoto[] {
  const photosFromFolders = loadPhotosFromFolders();
  return photosFromFolders.length ? photosFromFolders : DEFAULT_AWARDS_GALLERY_PHOTOS;
}
