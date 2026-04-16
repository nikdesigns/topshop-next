import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarClock, Trophy } from 'lucide-react';
import { LATEST_FINALISTS_ROUTE, LATEST_WINNERS_ROUTE } from '@/lib/awards-route-map';
import { nominationWindow } from '@/lib/nomination-window';

const highlights = [
  {
    label: 'Nominations',
    value: nominationWindow.isOpen ? 'Open' : 'Closed',
    note: nominationWindow.isOpen
      ? `Accepting submissions for ${nominationWindow.seasonLabel}`
      : `Finalized for ${nominationWindow.seasonLabel} cycle`,
  },
  { label: 'Finalists', value: 'Published', note: 'Visible on finalist section' },
  { label: 'Winners', value: 'Announced', note: 'Presented at MRO Americas' },
];

export function ScheduleSection() {
  return (
    <section id="schedule" className="schedule-section section-pad">
      <div className="content-wrap">
        <header className="schedule-header">
          <p className="schedule-eyebrow">2026 Top Shop</p>
          <h2>Schedule</h2>
          <p className="schedule-header-copy">
            Track the awards cycle from nomination intake to finalist publication and winner
            announcement.
          </p>
        </header>

        <div className="schedule-layout">
          <div>
            <div className="schedule-meta-grid" aria-label="Schedule status">
              {highlights.map((item) => (
                <article key={item.label} className="schedule-meta-card">
                  <p className="schedule-meta-label">{item.label}</p>
                  <p className="schedule-meta-value">{item.value}</p>
                  <p className="schedule-meta-note">{item.note}</p>
                </article>
              ))}
            </div>

            <div className="schedule-actions">
              <Link
                href={
                  nominationWindow.isOpen
                    ? '/submit_nomination.html'
                    : LATEST_FINALISTS_ROUTE.href
                }
                className="schedule-action schedule-action--primary"
              >
                <CalendarClock size={15} aria-hidden="true" />
                {nominationWindow.isOpen
                  ? 'Submit Nominations'
                  : `View ${LATEST_FINALISTS_ROUTE.label}`}
              </Link>
              <Link
                href={LATEST_WINNERS_ROUTE.href}
                className="schedule-action schedule-action--ghost"
              >
                <Trophy size={15} aria-hidden="true" />
                View Winners <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="schedule-image-card">
            <Image
              src="/assets/images/about/topshop_schedule_2026.png"
              alt="Top Shop Awards 2026 schedule"
              width={1920}
              height={1080}
              className="schedule-image"
            />
            <p className="schedule-image-note">
              Official cycle map for Top Shop Awards {nominationWindow.seasonLabel}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
