import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { LATEST_FINALISTS_ROUTE } from '@/lib/awards-route-map';
import { nominationWindow } from '@/lib/nomination-window';

const stats = [
  {
    label: 'Nominations',
    value: '11,175',
    note: 'Submitted across 30+ categories',
  },
  {
    label: 'Votes',
    value: '6,021',
    note: 'Industry professionals participated',
  },
  {
    label: 'Winners',
    value: '50',
    note: 'Shops recognized during the annual cycle',
  },
];

const updates = [
  {
    title: 'Multi-Entity and Single Entity Winners',
    summary:
      'Several companies asked us to better level the playing field between large organizations and smaller repair centers.',
    detail:
      'In response, selected categories are now split between multi-shop operators and single repair station participants.',
  },
  {
    title: '20x20 Booth at MRO Americas',
    summary:
      'The pre-event awards ceremony remains a key moment, and we wanted to add more visibility for winners.',
    detail:
      'A dedicated 20x20 booth in Orlando will feature The145 and 2026 Top Shop winners across three full expo days.',
  },
];

export function WelcomeSection() {
  return (
    <section id="welcome" className="welcome-section section-pad">
      <div className="content-wrap">
        <div className="welcome-header">
          <p className="welcome-eyebrow">Reason To Celebrate</p>
          <h2>
            Top Shop Awards is one of the most coveted aviation maintenance
            awards in the world
          </h2>
          <p className="welcome-header-copy">
            For nearly two decades, the program has spotlighted repair
            facilities that keep raising the standard for quality, innovation,
            and customer support.
          </p>
        </div>

        <div className="welcome-grid">
          <aside className="welcome-profile">
            <div className="welcome-photo-wrap">
              <Image
                src="/assets/images/about/justin.webp"
                alt="Justin Spaulding"
                width={560}
                height={760}
                className="welcome-photo"
              />
            </div>
            <div className="welcome-signature">
              <p>
                Justin Spaulding
                <br />
                President and CEO
              </p>
              <Image
                src="/assets/images/about/signature.webp"
                alt="Justin Spaulding signature"
                width={120}
                height={42}
              />
            </div>
            <div className="welcome-profile-note">
              <p>
                The Top Shop Awards were created to celebrate organizations that
                consistently set the benchmark for excellence in aviation
                maintenance.
              </p>
            </div>
          </aside>

          <article className="welcome-copy">
            <p>
              Nineteen years ago, we set out to recognize component repair
              facilities that consistently deliver results exceeding industry
              standards. Our goal was to honor companies that drive innovation,
              embrace cutting-edge technologies, and provide unparalleled
              customer support within the aviation maintenance sector.
            </p>
            <p>
              Over the years, the Top Shop Awards have evolved into one of the
              most prestigious distinctions in aviation maintenance. To date,
              414 awards have been presented across as many as thirty different
              repair categories.
            </p>

            <div className="welcome-update-head">
              <span className="ui-badge ui-badge--secondary welcome-update-badge">
                <Sparkles size={12} aria-hidden="true" />
                New For 2026
              </span>
            </div>

            <div className="welcome-update-grid">
              {updates.map((item) => (
                <article key={item.title} className="welcome-update-card">
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>

            <div className="welcome-action-card">
              <p>
                {nominationWindow.isOpen
                  ? `Nominations are currently open for ${nominationWindow.seasonLabel}.`
                  : `Nominations are now closed for ${nominationWindow.seasonLabel}.`}
              </p>
              <Link
                href={
                  nominationWindow.isOpen
                    ? '/submit_nomination.html'
                    : LATEST_FINALISTS_ROUTE.href
                }
                className="welcome-action-link"
              >
                {nominationWindow.isOpen
                  ? 'Submit Nominations'
                  : `View ${LATEST_FINALISTS_ROUTE.label}`}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </article>

          <aside className="welcome-stats" aria-label="Award metrics">
            {stats.map((item) => (
              <div key={item.label} className="welcome-stat-card">
                <p className="welcome-stat-value">{item.value}</p>
                <p className="welcome-stat-label">{item.label}</p>
                <p className="welcome-stat-note">{item.note}</p>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
