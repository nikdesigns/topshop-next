'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

const START_PROGRESS = 8;
const MAX_PROGRESS_BEFORE_COMPLETE = 88;
const PROGRESS_INTERVAL_MS = 170;
const FORCE_FINISH_MS = 12000;
const COMPLETE_HIDE_DELAY_MS = 220;

function shouldIgnoreClick(event: MouseEvent): boolean {
  if (event.defaultPrevented || event.button !== 0) {
    return true;
  }

  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return true;
  }

  return false;
}

function getAnchorFromEvent(event: MouseEvent): HTMLAnchorElement | null {
  const target = event.target as Element | null;
  if (!target) {
    return null;
  }

  return target.closest('a[href]');
}

export function RouteLoadingIndicator() {
  const pathname = usePathname();

  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);

  const activeRef = useRef(false);
  const progressIntervalRef = useRef<number | null>(null);
  const forceFinishTimeoutRef = useRef<number | null>(null);
  const hideTimeoutRef = useRef<number | null>(null);

  const clearTimers = useCallback(() => {
    if (progressIntervalRef.current !== null) {
      window.clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    if (forceFinishTimeoutRef.current !== null) {
      window.clearTimeout(forceFinishTimeoutRef.current);
      forceFinishTimeoutRef.current = null;
    }

    if (hideTimeoutRef.current !== null) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  const finish = useCallback(() => {
    if (!activeRef.current) {
      return;
    }

    activeRef.current = false;

    if (progressIntervalRef.current !== null) {
      window.clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    if (forceFinishTimeoutRef.current !== null) {
      window.clearTimeout(forceFinishTimeoutRef.current);
      forceFinishTimeoutRef.current = null;
    }

    setProgress(100);

    hideTimeoutRef.current = window.setTimeout(() => {
      setIsActive(false);
      setProgress(0);
      hideTimeoutRef.current = null;
    }, COMPLETE_HIDE_DELAY_MS);
  }, []);

  const start = useCallback(() => {
    if (activeRef.current) {
      return;
    }

    activeRef.current = true;

    if (hideTimeoutRef.current !== null) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }

    setIsActive(true);
    setProgress(START_PROGRESS);

    progressIntervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= MAX_PROGRESS_BEFORE_COMPLETE) {
          return prev;
        }

        const step = Math.max(1.5, Math.random() * 8.5);
        return Math.min(MAX_PROGRESS_BEFORE_COMPLETE, prev + step);
      });
    }, PROGRESS_INTERVAL_MS);

    forceFinishTimeoutRef.current = window.setTimeout(() => {
      finish();
    }, FORCE_FINISH_MS);
  }, [finish]);

  useEffect(() => {
    if (!activeRef.current) {
      return;
    }

    const timeout = window.setTimeout(() => {
      finish();
    }, 0);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [finish, pathname]);

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (shouldIgnoreClick(event)) {
        return;
      }

      const anchor = getAnchorFromEvent(event);
      if (!anchor) {
        return;
      }

      if (anchor.target && anchor.target !== '_self') {
        return;
      }

      if (anchor.hasAttribute('download')) {
        return;
      }

      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }

      let nextUrl: URL;

      try {
        nextUrl = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      if (nextUrl.origin !== window.location.origin) {
        return;
      }

      if (nextUrl.pathname === window.location.pathname) {
        return;
      }

      start();
    };

    const onPopState = () => {
      start();
    };

    document.addEventListener('click', onDocumentClick, true);
    window.addEventListener('popstate', onPopState);

    return () => {
      document.removeEventListener('click', onDocumentClick, true);
      window.removeEventListener('popstate', onPopState);
    };
  }, [start]);

  useEffect(
    () => () => {
      clearTimers();
    },
    [clearTimers],
  );

  return (
    <div
      className={`route-loader ${isActive ? 'is-active' : ''}`.trim()}
      aria-hidden="true"
    >
      <div className="route-loader-backdrop" />
      <div className="route-loader-bar" style={{ width: `${progress}%` }} />
      <div className="route-loader-spinner">
        <span>TS</span>
      </div>
    </div>
  );
}
