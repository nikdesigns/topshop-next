#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const PROJECT_ROOT = process.cwd();
const OUT_DIR = path.resolve(PROJECT_ROOT, process.env.STATIC_OUT_DIR || 'out');

function normalizeBasePath(value) {
  if (!value) {
    return '';
  }

  const trimmed = value.trim();
  if (!trimmed || trimmed === '/') {
    return '';
  }

  const withoutTrailingSlash = trimmed.replace(/\/+$/, '');
  return withoutTrailingSlash.startsWith('/')
    ? withoutTrailingSlash
    : `/${withoutTrailingSlash}`;
}

const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);

if (!fs.existsSync(OUT_DIR)) {
  console.error(`[link-check] Missing output directory: ${OUT_DIR}`);
  console.error('[link-check] Run `npm run build` before link checks.');
  process.exit(1);
}

function walkFiles(dir, matcher) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(absolute, matcher));
      continue;
    }

    if (matcher(absolute)) {
      results.push(absolute);
    }
  }

  return results;
}

function isSkippableUrl(url) {
  const lower = url.toLowerCase();
  return (
    !url ||
    url === '#' ||
    lower.startsWith('mailto:') ||
    lower.startsWith('tel:') ||
    lower.startsWith('javascript:') ||
    lower.startsWith('data:') ||
    lower.startsWith('blob:') ||
    lower.startsWith('http://') ||
    lower.startsWith('https://') ||
    lower.startsWith('//')
  );
}

function stripHashAndQuery(url) {
  const [withoutHash] = url.split('#', 1);
  const [withoutQuery] = withoutHash.split('?', 1);
  return withoutQuery.trim();
}

function decodeBasicEntities(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#x27;', "'")
    .replaceAll('&#39;', "'");
}

function stripBasePathFromAbsolutePathname(pathname) {
  if (!basePath) {
    return pathname;
  }

  if (pathname === basePath) {
    return '/';
  }

  if (pathname.startsWith(`${basePath}/`)) {
    const stripped = pathname.slice(basePath.length);
    return stripped.startsWith('/') ? stripped : `/${stripped}`;
  }

  return pathname;
}

function toOutRelativePath(linkPath, htmlFile) {
  if (!linkPath) {
    return '';
  }

  if (linkPath.startsWith('/')) {
    const withBaseRemoved = stripBasePathFromAbsolutePathname(linkPath);
    return withBaseRemoved.replace(/^\/+/, '');
  }

  const fromDir = path.posix.dirname(path.relative(OUT_DIR, htmlFile).split(path.sep).join('/'));
  const joined = path.posix.normalize(path.posix.join(fromDir, linkPath));
  return joined.replace(/^\/+/, '');
}

function candidatesFor(outRelative) {
  const normalized = outRelative.replace(/^\/+/, '');

  if (!normalized) {
    return ['index.html'];
  }

  const hasExtension = /\.[a-z0-9]+$/i.test(normalized);

  if (hasExtension) {
    return [normalized, path.posix.join(normalized, 'index.html')];
  }

  return [
    normalized,
    path.posix.join(normalized, 'index.html'),
    `${normalized}.html`,
    path.posix.join(`${normalized}.html`, 'index.html'),
  ];
}

function extractAttributeUrls(html) {
  const urls = [];
  const attrRegex = /<(a|link|script|img|source|video|audio)\b[^>]*?\b(href|src)=["']([^"']+)["']/gi;
  const srcSetRegex = /\bsrcset=["']([^"']+)["']/gi;

  let match;

  while ((match = attrRegex.exec(html)) !== null) {
    urls.push(match[3]);
  }

  while ((match = srcSetRegex.exec(html)) !== null) {
    const parts = match[1].split(',');
    for (const part of parts) {
      const candidate = part.trim().split(/\s+/, 1)[0] || '';
      if (candidate) {
        urls.push(candidate);
      }
    }
  }

  return urls;
}

const htmlFiles = walkFiles(OUT_DIR, (absolute) => absolute.endsWith('.html'));
const brokenLinks = [];
let checkedLinks = 0;

for (const htmlFile of htmlFiles) {
  const content = fs.readFileSync(htmlFile, 'utf8');
  const rawUrls = extractAttributeUrls(content);

  for (const rawUrl of rawUrls) {
    const decoded = decodeBasicEntities(rawUrl.trim());
    const cleaned = stripHashAndQuery(decoded);

    if (isSkippableUrl(cleaned)) {
      continue;
    }

    const outRelative = toOutRelativePath(cleaned, htmlFile);
    const candidates = candidatesFor(outRelative);
    checkedLinks += 1;

    const exists = candidates.some((candidate) => {
      const resolved = path.resolve(OUT_DIR, candidate);
      return fs.existsSync(resolved) && fs.statSync(resolved).isFile();
    });

    if (!exists) {
      brokenLinks.push({
        source: path.relative(PROJECT_ROOT, htmlFile),
        url: rawUrl,
        resolvedCandidates: candidates,
      });
    }
  }
}

console.log(
  `[link-check] HTML files: ${htmlFiles.length}, checked internal links/assets: ${checkedLinks}`,
);

if (brokenLinks.length > 0) {
  console.error(`[link-check] Broken references found: ${brokenLinks.length}`);
  for (const item of brokenLinks.slice(0, 50)) {
    console.error(`- ${item.source} -> "${item.url}"`);
    console.error(`  tried: ${item.resolvedCandidates.join(', ')}`);
  }

  if (brokenLinks.length > 50) {
    console.error(`...and ${brokenLinks.length - 50} more`);
  }

  process.exit(1);
}

console.log('[link-check] OK');
