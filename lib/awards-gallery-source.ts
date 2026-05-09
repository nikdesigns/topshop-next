import 'server-only';

import { existsSync, readdirSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import {
  AWARDS_GALLERY_YEARS,
  DEFAULT_AWARDS_GALLERY_VIDEOS,
  type AwardsGalleryVideo,
} from '@/lib/awards-gallery';

const VIDEO_ROOT = join(process.cwd(), 'public', 'assets', 'videos', 'gallery');
const IMAGE_ROOT = join(process.cwd(), 'public', 'assets', 'images', 'gallery');
const VIDEO_EXTENSIONS = new Set([
  '.m3u8',
  '.mp4',
  '.webm',
  '.mov',
  '.m4v',
  '.ogv',
]);
const PREFERRED_VIDEO_EXTENSIONS = [
  '.m3u8',
  '.mp4',
  '.webm',
  '.m4v',
  '.mov',
  '.ogv',
];
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

function isVideoFile(fileName: string) {
  return VIDEO_EXTENSIONS.has(extname(fileName).toLowerCase());
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

function getYearFolders() {
  if (!existsSync(VIDEO_ROOT)) {
    return [];
  }

  return readdirSync(VIDEO_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^\d{4}$/.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => Number(b) - Number(a));
}

function getPosterPath(year: string, fileBase: string) {
  for (const extension of IMAGE_EXTENSIONS) {
    const imageFsPath = join(IMAGE_ROOT, year, `${fileBase}${extension}`);
    if (existsSync(imageFsPath)) {
      return `/assets/images/gallery/${year}/${fileBase}${extension}`;
    }
  }

  return undefined;
}

function parseVideoTitle(fileName: string) {
  const fileBase = basename(fileName, extname(fileName));
  const [titleRaw, descriptorRaw] = fileBase.split('__');

  const title = titleRaw ? humanize(titleRaw) : humanize(fileBase);
  const description = descriptorRaw
    ? humanize(descriptorRaw)
    : `${title} from the Top Shop Awards ceremony.`;

  return { fileBase, title, description };
}

function preferredVideoFileName(fileNames: string[]) {
  return [...fileNames].sort((a, b) => {
    const extensionA = extname(a).toLowerCase();
    const extensionB = extname(b).toLowerCase();

    const priorityA = PREFERRED_VIDEO_EXTENSIONS.indexOf(extensionA);
    const priorityB = PREFERRED_VIDEO_EXTENSIONS.indexOf(extensionB);

    const safePriorityA =
      priorityA === -1 ? PREFERRED_VIDEO_EXTENSIONS.length : priorityA;
    const safePriorityB =
      priorityB === -1 ? PREFERRED_VIDEO_EXTENSIONS.length : priorityB;

    if (safePriorityA !== safePriorityB) {
      return safePriorityA - safePriorityB;
    }

    return a.localeCompare(b);
  })[0];
}

function loadVideosFromFolders(): AwardsGalleryVideo[] {
  const videos: AwardsGalleryVideo[] = [];

  for (const year of getYearFolders()) {
    const yearDir = join(VIDEO_ROOT, year);
    const files = readdirSync(yearDir)
      .filter((fileName) => isVideoFile(fileName))
      .sort((a, b) => a.localeCompare(b));

    const filesByBaseName = files.reduce<Record<string, string[]>>(
      (accumulator, fileName) => {
        const fileBase = basename(fileName, extname(fileName));
        if (!accumulator[fileBase]) {
          accumulator[fileBase] = [];
        }

        accumulator[fileBase].push(fileName);
        return accumulator;
      },
      {},
    );

    Object.keys(filesByBaseName)
      .sort((a, b) => a.localeCompare(b))
      .forEach((fileBaseName, index) => {
      const selectedFileName = preferredVideoFileName(
        filesByBaseName[fileBaseName],
      );
      if (!selectedFileName) {
        return;
      }

      const fileName = selectedFileName;
      const { fileBase, title, description } = parseVideoTitle(fileName);
      videos.push({
        id: `${year}-${fileBase}-${index + 1}`,
        src: `/assets/videos/gallery/${year}/${fileName}`,
        year,
        title,
        description,
        posterSrc: getPosterPath(year, fileBase),
        location: 'MRO Americas',
      });
      });
  }

  return videos;
}

export function getAwardsGalleryVideos(): AwardsGalleryVideo[] {
  const videosFromFolders = loadVideosFromFolders();
  return videosFromFolders.length ? videosFromFolders : DEFAULT_AWARDS_GALLERY_VIDEOS;
}

export function getAwardsGalleryYears(): AwardsGalleryYear[] {
  return AWARDS_GALLERY_YEARS;
}

type AwardsGalleryYear = string;
