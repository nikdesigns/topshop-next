import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Compass,
  ShieldCheck,
  Sparkles,
  TimerReset,
} from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Badge } from '@/components/ui/badge';
import { LATEST_WINNERS_ROUTE } from '@/lib/awards-route-map';
import { nominationWindow } from '@/lib/nomination-window';
import { SITE_URL } from '@/lib/site';

const standards = [
  {
    title: 'Quality Of Service',
    detail:
      'Shops are recognized for consistency, craftsmanship, and dependable outcomes under real operational pressure.',
    icon: ShieldCheck,
  },
  {
    title: 'Vision And Innovation',
    detail:
      'Forward-thinking organizations that adopt smarter methods and modern capabilities are highlighted each cycle.',
    icon: Compass,
  },
  {
    title: 'Turn-Around Reliability',
    detail:
      'Fast and predictable turn-around times remain one of the strongest indicators of true operational excellence.',
    icon: TimerReset,
  },
];

export const metadata: Metadata = {
  title: 'About Top Shop Awards | The145',
  description:
    'Why The145 created Top Shop Awards and the standards that define top-tier aviation maintenance organizations.',
  alternates: {
    canonical: `${SITE_URL}/about-us.html`,
  },
};

export default function AboutUsPage() {
  return (
    <div className="app-shell about-page-shell">
      <SiteHeader />
      <main>
        <section className="about-page-title">
          <div className="about-page-title-bg" aria-hidden="true">
            <Image
              src="/assets/images/page-titles/4.jpg"
              alt=""
              fill
              sizes="100vw"
              className="about-page-title-image"
              priority
            />
          </div>
          <div className="section-pad">
            <div className="content-wrap about-page-title-content">
              <h1>About Top Shop Awards</h1>
              <p>
                <Link href="/">Home</Link> / <span>About</span>
              </p>
            </div>
          </div>
        </section>

        <section className="about-main section-pad">
          <div className="content-wrap about-main-wrap about-main-wrap-rich">
            <header className="about-main-header about-main-header-rich">
              <Badge variant="secondary" className="about-main-badge">
                <Sparkles size={12} aria-hidden="true" />
                Why We Created Top Shop Awards
              </Badge>
              <h2>
                Built to celebrate repair centers that raise the aviation
                standard.
              </h2>
              <p>
                Top Shop Awards is designed to recognize technical excellence,
                operational discipline, and customer trust across the MRO
                community.
              </p>
            </header>

            <div className="about-main-grid about-main-grid-rich">
              <figure className="about-media-card">
                <Image
                  src="/assets/images/about/2.jpg"
                  alt="Top Shop Awards"
                  width={417}
                  height={625}
                  className="about-media-image"
                />
                <figcaption>
                  Most Coveted Aviation Maintenance Awards In The World
                </figcaption>
              </figure>

              <article className="about-copy about-copy-rich">
                <p>
                  Aviation is a zero-error industry and flying is the safest
                  means of transportation because we make it so. When it comes
                  to aviation maintenance, perfection is not an abstract
                  concept, it is a daily goal.
                </p>
                <p>
                  The MRO industry is more than workmanship, engineering, and
                  quality material. The human element sets great shops apart:
                  clear communication, innovative thinking, flexibility, and
                  ethical principles.
                </p>
                <p>
                  The145 created Top Shop Awards in honor of shops that deliver
                  more than technical expertise. We created these awards for
                  companies that believe in:
                </p>

                <ul className="about-principles-list">
                  <li>Quality of service</li>
                  <li>Vision</li>
                  <li>Exceptional turn-around times</li>
                  <li>Competitive pricing and excellent customer relations</li>
                </ul>

                <p>
                  Top Shop Awards is 100% peer-driven and open to any repair
                  center within the aviation community. No sign-up is required,
                  and any professional within the industry can nominate a
                  business.
                </p>

                <blockquote className="about-quote">
                  Kudos to the {nominationWindow.seasonLabel} Top Shop winners
                  for their outstanding achievements and excellence.
                  <cite>Justin Spaulding, The145</cite>
                </blockquote>

                <section
                  className="about-standards"
                  aria-label="Top Shop standards"
                >
                  {standards.map((item) => {
                    const Icon = item.icon;

                    return (
                      <article key={item.title} className="about-standard-card">
                        <p className="about-standard-icon" aria-hidden="true">
                          <Icon size={15} />
                        </p>
                        <h3>{item.title}</h3>
                        <p>{item.detail}</p>
                      </article>
                    );
                  })}
                </section>

                <div className="about-signature-row about-signature-row-rich">
                  <Image
                    src="/assets/images/about/signature.webp"
                    alt="Justin Spaulding signature"
                    width={165}
                    height={52}
                  />
                  {nominationWindow.isOpen ? (
                    <Link
                      href="/#votebutton"
                      className="about-vote-btn about-vote-btn-rich"
                    >
                      Download Vote Button
                    </Link>
                  ) : null}
                  <Link
                    href={
                      nominationWindow.isOpen
                        ? '/submit_nomination.html'
                        : LATEST_WINNERS_ROUTE.href
                    }
                    className="about-nomination-btn"
                  >
                    {nominationWindow.isOpen
                      ? `Submit ${nominationWindow.seasonLabel} Nominations`
                      : `View ${LATEST_WINNERS_ROUTE.label}`}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
