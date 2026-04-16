import { ClientsStrip } from '@/components/clients-strip';
import { BannerFeatureSection } from '@/components/banner-feature-section';
import { ContactBannerSection } from '@/components/contact-banner-section';
import { HeroCarousel } from '@/components/hero-carousel';
import { SiteHeader } from '@/components/site-header';
import { ScheduleSection } from '@/components/schedule-section';
import { SiteFooter } from '@/components/site-footer';
import { WelcomeSection } from '@/components/welcome-section';
import { WinnersCardsSection } from '@/components/winners-cards-section';

export default function HomePage() {
  return (
    <div className="app-shell">
      <SiteHeader />
      <main>
        <section className="hero-section">
          <HeroCarousel />
        </section>

        <WelcomeSection />
        <ClientsStrip />
        <BannerFeatureSection />
        <WinnersCardsSection />
        <ContactBannerSection />
        <ScheduleSection />
      </main>
      <SiteFooter />
    </div>
  );
}
