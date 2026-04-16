import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';

type AwardsKind = 'Winners' | 'Finalists';

export function buildAwardsMetadata({
  year,
  kind,
  description,
  canonicalPath,
}: {
  year: string;
  kind: AwardsKind;
  description: string;
  canonicalPath: string;
}): Metadata {
  return {
    title: `${year} Top Shop ${kind} | Top Shop Awards`,
    description,
    alternates: {
      canonical: `${SITE_URL}${canonicalPath}`,
    },
  };
}
