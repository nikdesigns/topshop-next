import type { Metadata } from 'next';
import Image from 'next/image';
import { AppLink as Link } from '@/components/ui/app-link';
import {
  ArrowRight,
  Compass,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  TimerReset,
} from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Badge } from '@/components/ui/badge';
import { HighlightsVideoModalTrigger } from '@/components/highlights-video-modal-trigger';
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
                Top Shop Awards Mission
              </Badge>
              <h2>
                Recognizing repair organizations that deliver more than technical excellence.
              </h2>
              <p>
                We celebrate MRO organizations that lead through service quality, clear
                communication, innovation, integrity, and customer-first execution.
              </p>
            </header>

            <div className="about-main-grid about-main-grid-rich">
              <figure className="about-media-card">
                <HighlightsVideoModalTrigger
                  videoSrc={nominationWindow.highlightsVideoEmbedUrl}
                  title={nominationWindow.highlightsTitle}
                  triggerClassName="about-media-video-trigger"
                  triggerAriaLabel={`Play ${nominationWindow.highlightsTitle}`}
                >
                  <Image
                    src="/assets/images/banners/2026_highlight.webp"
                    alt={`${nominationWindow.highlightsYear} Top Shop Awards highlights preview`}
                    width={417}
                    height={625}
                    className="about-media-image"
                  />
                  <span className="about-media-video-play" aria-hidden="true">
                    <PlayCircle className="about-media-play-icon" />
                  </span>
                </HighlightsVideoModalTrigger>
                <figcaption>
                  Most Coveted Aviation Maintenance Awards In The World
                </figcaption>
              </figure>

              <article className="about-copy about-copy-rich">
                <div className="site-prose">
                  <p>
                    The aviation MRO industry is built on more than technical
                    skills, engineering expertise, and quality materials. What
                    truly distinguishes exceptional repair stations from mediocre
                    ones is the human element: clear communication, innovative
                    thinking, adaptability, integrity, and an unwavering
                    commitment to doing things the right way.
                  </p>
                  <p>
                    The145 created the Top Shop Awards to recognize organizations
                    that deliver more than technical excellence. These awards
                    honor companies that embody:
                  </p>

                  <ul className="about-principles-list">
                    <li>Outstanding quality of service</li>
                    <li>Vision and leadership</li>
                    <li>Exceptional turnaround times</li>
                    <li>Competitive pricing and superior customer relationships</li>
                  </ul>

                  <p>
                    We&apos;re excited to recognize this year&apos;s repair
                    centers that have gone above and beyond to offer their
                    customers the best quality workmanship, turn-around-times,
                    innovation and customer care in the industry.
                  </p>

                  <blockquote className="about-quote">
                    Congratulations to the 2026 Top Shop winners for their
                    exceptional achievements and commitment to excellence.
                    <cite>Justin Spaulding, President, The145</cite>
                  </blockquote>
                </div>

                <section
                  className="about-standards not-prose"
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

                <div className="about-signature-row about-signature-row-rich not-prose">
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
