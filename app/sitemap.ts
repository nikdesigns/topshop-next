import type { MetadataRoute } from 'next';
import { AWARDS_FINALIST_ROUTE_ENTRIES, AWARDS_WINNER_ROUTE_ENTRIES } from '@/lib/awards-route-map';
import { SITE_URL } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const coreEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/about-us.html`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/faqs.html`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/submit_nomination.html`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const awardEntries: MetadataRoute.Sitemap = [
    ...AWARDS_FINALIST_ROUTE_ENTRIES,
    ...AWARDS_WINNER_ROUTE_ENTRIES,
  ].map((entry) => ({
    url: `${SITE_URL}${entry.href}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  return [...coreEntries, ...awardEntries];
}
