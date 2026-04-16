import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ClientsStrip } from '@/components/clients-strip';
import { BannerFeatureSection } from '@/components/banner-feature-section';
import { ContactBannerSection } from '@/components/contact-banner-section';
import { HeroCarousel } from '@/components/hero-carousel';
import { SiteHeader } from '@/components/site-header';
import { ScheduleSection } from '@/components/schedule-section';
import { SiteFooter } from '@/components/site-footer';
import { WelcomeSection } from '@/components/welcome-section';
import { WinnersCardsSection } from '@/components/winners-cards-section';
import { LATEST_FINALISTS_ROUTE, LATEST_WINNERS_ROUTE } from '@/lib/awards-route-map';
import { nominationWindow } from '@/lib/nomination-window';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Top Shop Awards | Nominations, Finalists, Winners',
  description:
    'Track the Top Shop Awards cycle, view finalists and winners, and access official event highlights.',
  alternates: {
    canonical: `${SITE_URL}/`,
  },
};

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Event',
      name: `Top Shop Awards ${nominationWindow.seasonLabel}`,
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: nominationWindow.isOpen
        ? 'https://schema.org/EventScheduled'
        : 'https://schema.org/EventCompleted',
      startDate: nominationWindow.nominationStartDate,
      endDate: nominationWindow.nominationEndDate,
      url: SITE_URL,
      image: `${SITE_URL}${nominationWindow.socialCardImageSrc}`,
      organizer: {
        '@type': 'Organization',
        name: 'The145',
        url: SITE_URL,
      },
    },
    {
      '@type': 'ItemList',
      name: 'Top Shop Awards Featured Pages',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: LATEST_WINNERS_ROUTE.label,
          url: `${SITE_URL}${LATEST_WINNERS_ROUTE.href}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: LATEST_FINALISTS_ROUTE.label,
          url: `${SITE_URL}${LATEST_FINALISTS_ROUTE.href}`,
        },
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <div className="app-shell">
      <SiteHeader />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
        />

        <section className="hero-section">
          <HeroCarousel />
        </section>

        <WelcomeSection />
        <ClientsStrip />
        <BannerFeatureSection />
        <Suspense fallback={<section className="winners-cards-section section-pad" />}>
          <WinnersCardsSection />
        </Suspense>
        <ContactBannerSection />
        <ScheduleSection />
      </main>
      <SiteFooter />
    </div>
  );
}
