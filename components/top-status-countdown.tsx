'use client';

import { useEffect, useMemo, useState } from 'react';

type TopStatusCountdownProps = {
  seasonLabel: string;
  nominationStartDate: string;
  nominationEndDate: string;
};

type CountdownPhase = 'opens' | 'closes' | 'ended';

type CountdownSnapshot = {
  phase: CountdownPhase;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

function parseDateUtc(date: string, endOfDay = false): Date {
  const [year, month, day] = date.split('-').map((part) => Number(part));
  const hour = endOfDay ? 23 : 0;
  const minute = endOfDay ? 59 : 0;
  const second = endOfDay ? 59 : 0;
  const millisecond = endOfDay ? 999 : 0;
  return new Date(Date.UTC(year, month - 1, day, hour, minute, second, millisecond));
}

function getSnapshot(now: Date, start: Date, end: Date): CountdownSnapshot {
  const phase: CountdownPhase = now < start ? 'opens' : now <= end ? 'closes' : 'ended';

  if (phase === 'ended') {
    return {
      phase,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const targetTime = phase === 'opens' ? start.getTime() : end.getTime();
  const remainingMs = Math.max(0, targetTime - now.getTime());

  const days = Math.floor(remainingMs / DAY);
  const hours = Math.floor((remainingMs % DAY) / HOUR);
  const minutes = Math.floor((remainingMs % HOUR) / MINUTE);
  const seconds = Math.floor((remainingMs % MINUTE) / SECOND);

  return {
    phase,
    days,
    hours,
    minutes,
    seconds,
  };
}

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

export function TopStatusCountdown({
  seasonLabel,
  nominationStartDate,
  nominationEndDate,
}: TopStatusCountdownProps) {
  const [isMounted, setIsMounted] = useState(false);

  const nominationStart = useMemo(() => parseDateUtc(nominationStartDate), [nominationStartDate]);
  const nominationEnd = useMemo(() => parseDateUtc(nominationEndDate, true), [nominationEndDate]);

  const [snapshot, setSnapshot] = useState<CountdownSnapshot>(() => ({
    phase: 'opens',
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  }));

  useEffect(() => {
    setIsMounted(true);

    const update = () => {
      setSnapshot(getSnapshot(new Date(), nominationStart, nominationEnd));
    };

    update();
    const timer = window.setInterval(update, SECOND);

    return () => {
      window.clearInterval(timer);
    };
  }, [nominationEnd, nominationStart]);

  const phaseLabel =
    snapshot.phase === 'opens'
      ? 'Opens In'
      : snapshot.phase === 'closes'
        ? 'Closes In'
        : `${seasonLabel} Cycle Closed`;

  if (!isMounted) {
    return (
      <div className="rich-status-countdown" aria-live="polite" role="status">
        <p className="rich-status-countdown-label">Countdown</p>
        <p className="rich-status-countdown-ended">Syncing...</p>
      </div>
    );
  }

  return (
    <div className="rich-status-countdown" aria-live="polite" role="status">
      <p className="rich-status-countdown-label">{phaseLabel}</p>

      {snapshot.phase === 'ended' ? (
        <p className="rich-status-countdown-ended">Window complete</p>
      ) : (
        <div className="rich-status-countdown-grid" aria-label="Time remaining">
          <span className="rich-status-countdown-cell">
            <strong>{snapshot.days}</strong>
            <small>D</small>
          </span>
          <span className="rich-status-countdown-cell">
            <strong>{pad(snapshot.hours)}</strong>
            <small>H</small>
          </span>
          <span className="rich-status-countdown-cell">
            <strong>{pad(snapshot.minutes)}</strong>
            <small>M</small>
          </span>
          <span className="rich-status-countdown-cell">
            <strong>{pad(snapshot.seconds)}</strong>
            <small>S</small>
          </span>
        </div>
      )}
    </div>
  );
}
