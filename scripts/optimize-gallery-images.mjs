#!/usr/bin/env node

import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, extname, basename } from 'node:path';
import sharp from 'sharp';

const GALLERY_ROOT = join(process.cwd(), 'public', 'assets', 'images', 'gallery');
const OPTIMIZED_ROOT = join(GALLERY_ROOT, '_optimized');
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);
const MAX_WIDTH = 1400;
const MAX_HEIGHT = 1100;
const WEBP_QUALITY = 78;

function isImageFile(fileName) {
  return IMAGE_EXTENSIONS.has(extname(fileName).toLowerCase());
}

function listYearFolders() {
  if (!existsSync(GALLERY_ROOT)) {
    return [];
  }

  return readdirSync(GALLERY_ROOT, { withFileTypes: true })
    .filter(
      (entry) => entry.isDirectory() && /^\d{4}$/.test(entry.name),
    )
    .map((entry) => entry.name)
    .sort((a, b) => Number(b) - Number(a));
}

function optimizedFileNameFor(sourceFileName) {
  const sourceExtension = extname(sourceFileName).toLowerCase().slice(1);
  const fileBase = basename(sourceFileName, extname(sourceFileName));
  return `${fileBase}-${sourceExtension}.webp`;
}

function shouldRegenerate(sourcePath, targetPath) {
  if (!existsSync(targetPath)) {
    return true;
  }

  const sourceMtime = statSync(sourcePath).mtimeMs;
  const targetMtime = statSync(targetPath).mtimeMs;
  return sourceMtime > targetMtime;
}

async function run() {
  const years = listYearFolders();

  if (!years.length) {
    console.log('[gallery:optimize] No year folders found, skipping.');
    return;
  }

  let generatedCount = 0;
  let skippedCount = 0;

  mkdirSync(OPTIMIZED_ROOT, { recursive: true });

  for (const year of years) {
    const yearSourceDir = join(GALLERY_ROOT, year);
    const yearTargetDir = join(OPTIMIZED_ROOT, year);
    const files = readdirSync(yearSourceDir, { withFileTypes: true })
      .filter((entry) => entry.isFile() && isImageFile(entry.name))
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b));

    if (!files.length) {
      continue;
    }

    mkdirSync(yearTargetDir, { recursive: true });

    for (const fileName of files) {
      const sourcePath = join(yearSourceDir, fileName);
      const targetPath = join(yearTargetDir, optimizedFileNameFor(fileName));

      if (!shouldRegenerate(sourcePath, targetPath)) {
        skippedCount += 1;
        continue;
      }

      await sharp(sourcePath)
        .rotate()
        .resize({
          width: MAX_WIDTH,
          height: MAX_HEIGHT,
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: WEBP_QUALITY, effort: 5 })
        .toFile(targetPath);

      generatedCount += 1;
    }
  }

  console.log(
    `[gallery:optimize] Generated ${generatedCount} optimized images, skipped ${skippedCount}.`,
  );
}

run().catch((error) => {
  console.error('[gallery:optimize] Failed:', error);
  process.exit(1);
});
