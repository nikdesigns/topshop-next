import Link from 'next/link';
import { ArrowRight, CalendarClock, Trophy } from 'lucide-react';
import { LATEST_FINALISTS_ROUTE, LATEST_WINNERS_ROUTE } from '@/lib/awards-route-map';
import { nominationWindow } from '@/lib/nomination-window';
import { ScheduleRoadmap } from '@/components/schedule-roadmap';

const highlights = [
  {
    label: 'Nominations',
    value: nominationWindow.isOpen ? 'Open' : 'Closed',
    note: nominationWindow.isOpen
      ? `Open through ${nominationWindow.nominationEndLabel}`
      : `Window: ${nominationWindow.nominationDateRangeLabel}`,
  },
  { label: 'Winners', value: 'Announced', note: 'Presented at MRO Americas' },
  { label: 'Finalists', value: 'Published', note: 'Visible on finalist section' },
];

const roadmapSteps = [
  {
    dateLabel: nominationWindow.nominationStartLabel,
    title: 'Nominations Open',
    subtitle: 'Submission Intake',
    details:
      'Operators and suppliers submit nominations across all award categories.',
  },
  {
    dateLabel: nominationWindow.nominationEndLabel,
    title: 'Nominations Close',
    subtitle: 'Entry Lock',
    details:
      'The intake window closes and all submitted nominations move into validation.',
  },
  {
    dateLabel: `February ${nominationWindow.seasonLabel}`,
    title: 'Eligibility Review',
    subtitle: 'Compliance Screening',
    details:
      'The awards team verifies company data and category alignment for each nomination.',
  },
  {
    dateLabel: `March ${nominationWindow.seasonLabel}`,
    title: 'Finalists Published',
    subtitle: 'Shortlist Release',
    details:
      'Qualified finalists are published for market visibility and outreach.',
  },
  {
    dateLabel: `March-April ${nominationWindow.seasonLabel}`,
    title: 'Industry Voting',
    subtitle: 'Peer Validation',
    details:
      'Industry professionals review finalists and cast votes in each category.',
  },
  {
    dateLabel: `April ${nominationWindow.seasonLabel}`,
    title: 'Winners Announced',
    subtitle: 'Awards Presentation',
    details: 'Final winners are announced at MRO Americas and featured across Top Shop channels.',
  },
] as const;

export function ScheduleSection() {
  return (
    <section id="schedule" className="schedule-section section-pad">
      <div className="content-wrap">
        <header className="schedule-header">
          <p className="schedule-eyebrow">{nominationWindow.seasonLabel} Top Shop</p>
          <h2>Schedule</h2>
          <p className="schedule-header-copy">
            Track the awards cycle from nomination intake to winner announcement and finalist
            publication.
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
                    : LATEST_WINNERS_ROUTE.href
                }
                className="schedule-action schedule-action--primary"
              >
                <CalendarClock size={15} aria-hidden="true" />
                {nominationWindow.isOpen
                  ? 'Submit Nominations'
                  : `View ${LATEST_WINNERS_ROUTE.label}`}
              </Link>
              <Link
                href={LATEST_FINALISTS_ROUTE.href}
                className="schedule-action schedule-action--ghost"
              >
                <Trophy size={15} aria-hidden="true" />
                View Finalists <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="schedule-roadmap-card">
            <ScheduleRoadmap steps={roadmapSteps} />
          </div>
        </div>
      </div>
    </section>
  );
}
