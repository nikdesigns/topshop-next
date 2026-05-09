'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Pause, Play, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { TOPSHOP_2026_CLIENTS } from '@/data/clients-logos';
import { Button } from '@/components/ui/button';
import { LATEST_WINNERS_LINK } from '@/lib/awards-links';
const clients = TOPSHOP_2026_CLIENTS;

const marqueeItems = [...clients, ...clients];

export function ClientsStrip() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section
      id="clients"
      className="clients-section section-pad"
      aria-label="Top Shop winners"
    >
      <div className="content-wrap clients-wrap">
        <div className="clients-header">
          <div className="clients-heading-stack">
            <Badge variant="subtle" className="clients-count-badge">
              <Sparkles size={12} aria-hidden="true" />
              Hall of Fame
            </Badge>
            <h3>Top Shops {LATEST_WINNERS_LINK.year}</h3>
            <p>
              Browse all {clients.length} winner companies recognized in the{' '}
              {LATEST_WINNERS_LINK.year} Top Shop Awards cycle.
            </p>
          </div>

          <div className="clients-actions">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="clients-pause-btn"
              onClick={() => setIsPaused((current) => !current)}
              aria-pressed={isPaused}
            >
              {isPaused ? (
                <Play size={14} aria-hidden="true" />
              ) : (
                <Pause size={14} aria-hidden="true" />
              )}
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
            <Button asChild size="sm" className="clients-action-link">
              <Link href={LATEST_WINNERS_LINK.href}>
                View Winners <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>

        <div
          className={`clients-marquee${isPaused ? ' clients-marquee--paused' : ''}`}
        >
          <div className="clients-track">
            {marqueeItems.map((client, idx) => (
              <article
                key={`${client.name}-${idx}`}
                className="client-logo-card"
                aria-hidden={idx >= clients.length || undefined}
                title={client.name}
              >
                <Image
                  src={client.logoSrc}
                  alt={`${client.name} logo`}
                  width={190}
                  height={84}
                  className="client-logo"
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
