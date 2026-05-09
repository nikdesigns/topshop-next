'use client';

import dynamic from 'next/dynamic';
import { X } from 'lucide-react';
import { type ReactNode, useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

export function HighlightsVideoModalTrigger({
  videoSrc,
  title,
  triggerClassName,
  triggerAriaLabel,
  children,
}: {
  videoSrc: string;
  title: string;
  triggerClassName: string;
  triggerAriaLabel: string;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', closeOnEscape);
    return () => {
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || typeof document === 'undefined') {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const portalRoot = typeof document !== 'undefined' ? document.body : null;

  return (
    <>
      <button
        type="button"
        className={triggerClassName}
        onClick={() => setIsOpen(true)}
        aria-label={triggerAriaLabel}
      >
        {children}
      </button>

      {isOpen && portalRoot
        ? createPortal(
            <div
              className="banner-video-modal-backdrop"
              onClick={() => setIsOpen(false)}
              role="presentation"
            >
              <div
                className="banner-video-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                onClick={(event) => event.stopPropagation()}
              >
                <header className="banner-video-modal-head">
                  <h4 id={titleId}>{title}</h4>
                  <button
                    type="button"
                    className="banner-video-modal-close"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close highlights video"
                  >
                    <X size={18} aria-hidden="true" />
                  </button>
                </header>

                <div className="banner-video-modal-body">
                  <ReactPlayer
                    src={videoSrc}
                    controls
                    playing={isOpen}
                    playsInline
                    width="100%"
                    height="100%"
                    style={{ width: '100%', height: 'auto', aspectRatio: '16 / 9' }}
                  />
                </div>
              </div>
            </div>,
            portalRoot,
          )
        : null}
    </>
  );
}
