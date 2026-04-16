import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';

type AwardsKind = 'Winners' | 'Finalists';

function toAbsoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  return pathOrUrl.startsWith('/') ? `${SITE_URL}${pathOrUrl}` : `${SITE_URL}/${pathOrUrl}`;
}

export function buildAwardsMetadata({
  year,
  kind,
  description,
  canonicalPath,
  titleImageSrc,
}: {
  year: string;
  kind: AwardsKind;
  description: string;
  canonicalPath: string;
  titleImageSrc: string;
}): Metadata {
  const title = `${year} Top Shop ${kind} | Top Shop Awards`;
  const canonical = `${SITE_URL}${canonicalPath}`;
  const socialImage = toAbsoluteUrl(titleImageSrc);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: 'article',
      title,
      description,
      url: canonical,
      siteName: 'Top Shop Awards',
      images: [
        {
          url: socialImage,
          alt: `${year} Top Shop ${kind}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [socialImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
