'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  CircleCheckBig,
  Flag,
  Medal,
  Pause,
  Play,
  Sparkles,
  ShieldCheck,
  Users,
} from 'lucide-react';

export type ScheduleRoadmapStep = {
  dateLabel: string;
  title: string;
  subtitle: string;
  details: string;
};

type ScheduleRoadmapProps = {
  steps: readonly ScheduleRoadmapStep[];
  activeIndex?: number;
};

const timelineIcons = [
  CalendarClock,
  Flag,
  ShieldCheck,
  Users,
  CircleCheckBig,
  Medal,
] as const;

function clampActiveIndex(index: number, length: number): number {
  if (length <= 0) {
    return 0;
  }

  return Math.min(Math.max(index, 0), length - 1);
}

const stepInsights = [
  {
    phaseLabel: 'Cycle Kickoff',
    outcomes: [
      'Nomination portal opens for all categories',
      'Eligibility and category guidelines go live',
    ],
    signal: 'Open intake',
  },
  {
    phaseLabel: 'Submission Lock',
    outcomes: [
      'New nominations stop at the closing timestamp',
      'All entries move to review queue',
    ],
    signal: 'Intake closed',
  },
  {
    phaseLabel: 'Validation',
    outcomes: [
      'Team verifies operator and supplier records',
      'Entries are mapped to final voting categories',
    ],
    signal: 'Compliance screening',
  },
  {
    phaseLabel: 'Public Shortlist',
    outcomes: [
      'Finalists page is published for the season',
      'Finalists can activate brand and voting assets',
    ],
    signal: 'Visibility window',
  },
  {
    phaseLabel: 'Voting Window',
    outcomes: [
      'Industry participants cast category votes',
      'Voting quality checks flag unusual activity',
    ],
    signal: 'Peer validation',
  },
  {
    phaseLabel: 'Awards Reveal',
    outcomes: [
      'Winners are announced and archived by season',
      'Official winner assets are activated',
    ],
    signal: 'Live announcement',
  },
] as const;

export function ScheduleRoadmap({ steps, activeIndex = 0 }: ScheduleRoadmapProps) {
  const safeActiveIndex = clampActiveIndex(activeIndex, steps.length);
  const [currentIndex, setCurrentIndex] = useState(safeActiveIndex);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const stepMeta = useMemo(
    () =>
      steps.map((step, index) => {
        const Icon = timelineIcons[index] ?? timelineIcons[timelineIcons.length - 1];
        const stepNumber = String(index + 1).padStart(2, '0');
        const insight = stepInsights[index] ?? stepInsights[stepInsights.length - 1];
        return { ...step, ...insight, index, Icon, stepNumber };
      }),
    [steps],
  );

  const activeStep = stepMeta[currentIndex];
  const nextStep = stepMeta[(currentIndex + 1) % stepMeta.length];
  const progressPercent =
    stepMeta.length <= 1 ? 100 : Math.round((currentIndex / (stepMeta.length - 1)) * 100);

  const selectStep = useCallback(
    (index: number, disableAuto = true) => {
      setCurrentIndex(clampActiveIndex(index, stepMeta.length));
      if (disableAuto) {
        setIsAutoPlay(false);
      }
    },
    [stepMeta.length],
  );

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % stepMeta.length);
  }, [stepMeta.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + stepMeta.length) % stepMeta.length);
  }, [stepMeta.length]);

  useEffect(() => {
    if (!isAutoPlay || stepMeta.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      goToNext();
    }, 4400);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [goToNext, isAutoPlay, stepMeta.length]);

  if (stepMeta.length === 0) {
    return null;
  }

  return (
    <div className="schedule-roadmap" aria-label="Awards cycle roadmap">
      <div className="schedule-roadmap-explorer">
        <aside className="schedule-roadmap-rail" aria-label="Roadmap step selector">
          <div className="schedule-roadmap-rail-head">
            <p>Cycle Navigator</p>
            <button
              type="button"
              className="schedule-roadmap-auto-toggle"
              onClick={() => setIsAutoPlay((prev) => !prev)}
            >
              {isAutoPlay ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
              {isAutoPlay ? 'Auto' : 'Manual'}
            </button>
          </div>

          <ol className="schedule-roadmap-rail-list">
            {stepMeta.map((step) => {
              const isActive = step.index === currentIndex;
              const isCompleted = step.index < currentIndex;

              return (
                <li key={`${step.title}-${step.index}`} className="schedule-roadmap-rail-item">
                  <button
                    type="button"
                    className={`schedule-roadmap-rail-btn ${isActive ? 'is-active' : ''} ${isCompleted ? 'is-complete' : ''}`.trim()}
                    onClick={() => selectStep(step.index)}
                  >
                    <span className="schedule-roadmap-rail-node" aria-hidden="true">
                      <step.Icon size={14} />
                    </span>

                    <span className="schedule-roadmap-rail-copy">
                      <span className="schedule-roadmap-rail-step">Step {step.stepNumber}</span>
                      <strong>{step.title}</strong>
                      <span className="schedule-roadmap-rail-date">{step.dateLabel}</span>
                    </span>

                    <span className="schedule-roadmap-rail-state">
                      {isActive ? 'Live' : isCompleted ? 'Done' : 'Pending'}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </aside>

        <section
          className="schedule-roadmap-stage"
          aria-live="polite"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'ArrowRight') {
              event.preventDefault();
              goToNext();
              setIsAutoPlay(false);
            } else if (event.key === 'ArrowLeft') {
              event.preventDefault();
              goToPrevious();
              setIsAutoPlay(false);
            } else if (event.key === 'Home') {
              event.preventDefault();
              selectStep(0);
            } else if (event.key === 'End') {
              event.preventDefault();
              selectStep(stepMeta.length - 1);
            }
          }}
        >
          <div className="schedule-roadmap-stage-head">
            <div className="schedule-roadmap-stage-meta">
              <p>Interactive Schedule Explorer</p>
              <strong>
                {currentIndex + 1} / {stepMeta.length}
              </strong>
            </div>

            <div className="schedule-roadmap-stage-controls">
              <button
                type="button"
                className="schedule-roadmap-stage-btn"
                onClick={() => {
                  goToPrevious();
                  setIsAutoPlay(false);
                }}
                aria-label="Previous schedule milestone"
              >
                <ChevronLeft size={16} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="schedule-roadmap-stage-btn"
                onClick={() => {
                  goToNext();
                  setIsAutoPlay(false);
                }}
                aria-label="Next schedule milestone"
              >
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="schedule-roadmap-progress" aria-label="Roadmap progress controls">
            <div className="schedule-roadmap-progress-head">
              <p>Cycle Progress</p>
              <strong>{progressPercent}%</strong>
            </div>
            <input
              className="schedule-roadmap-progress-track"
              type="range"
              min={0}
              max={Math.max(stepMeta.length - 1, 0)}
              step={1}
              value={currentIndex}
              onChange={(event) => {
                selectStep(Number(event.target.value));
              }}
              aria-label="Scrub schedule milestones"
            />
            <div className="schedule-roadmap-progress-notes">
              <small>
                <span>Now:</span> {activeStep.title}
              </small>
              <small>
                <span>Next:</span> {nextStep.title}
              </small>
            </div>
            <div className="schedule-roadmap-jump-row">
              <button type="button" className="schedule-roadmap-jump-btn" onClick={() => selectStep(0)}>
                Start
              </button>
              <button
                type="button"
                className="schedule-roadmap-jump-btn"
                onClick={() => selectStep((currentIndex + 1) % stepMeta.length)}
              >
                Next
              </button>
              <button
                type="button"
                className="schedule-roadmap-jump-btn"
                onClick={() => selectStep(stepMeta.length - 1)}
              >
                Finale
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              key={`${activeStep.title}-${activeStep.stepNumber}`}
              className="schedule-roadmap-panel"
              initial={{ opacity: 0, y: 16, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.99 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
            >
              <header className="schedule-roadmap-panel-head">
                <div className="schedule-roadmap-panel-meta">
                  <p className="schedule-roadmap-panel-chip">{activeStep.phaseLabel}</p>
                  <p className="schedule-roadmap-panel-date">{activeStep.dateLabel}</p>
                </div>
                <h3>{activeStep.title}</h3>
                <p className="schedule-roadmap-panel-subtitle">{activeStep.subtitle}</p>
                <p className="schedule-roadmap-panel-details">{activeStep.details}</p>
              </header>

              <div className="schedule-roadmap-panel-grid">
                <section className="schedule-roadmap-panel-block">
                  <h4>Operational Outcomes</h4>
                  <ul>
                    {activeStep.outcomes.map((outcome) => (
                      <li key={`${activeStep.stepNumber}-${outcome}`}>{outcome}</li>
                    ))}
                  </ul>
                </section>

                <section className="schedule-roadmap-panel-block schedule-roadmap-panel-block--signal">
                  <span className="schedule-roadmap-signal-icon" aria-hidden="true">
                    <Sparkles size={14} />
                  </span>
                  <p>Current Signal</p>
                  <strong>{activeStep.signal}</strong>
                  <small>{activeStep.dateLabel}</small>
                </section>
              </div>

              <div className="schedule-roadmap-dots" aria-label="Schedule milestones quick navigation">
                {stepMeta.map((step) => (
                  <button
                    key={`${step.stepNumber}-dot`}
                    type="button"
                    className={`schedule-roadmap-dot ${step.index === currentIndex ? 'is-active' : ''}`.trim()}
                    onClick={() => selectStep(step.index)}
                    aria-label={`Go to step ${step.stepNumber}: ${step.title}`}
                  />
                ))}
              </div>
            </motion.article>
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}
