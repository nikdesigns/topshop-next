'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Pause, Play, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { TOPSHOP_2026_WINNER_CARDS } from '@/data/topshop_2026_winners';
import { Button } from '@/components/ui/button';
import type { WinnerSplitCard } from '@/lib/results-types';
import { LATEST_WINNERS_LINK } from '@/lib/awards-links';

type Client = {
  name: string;
  logoSrc?: string;
};

function normalizeCompanyName(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function getAllCardWinners(card: WinnerSplitCard) {
  return [...(card.multiEntity ?? []), ...(card.singleEntity ?? []), ...(card.winners ?? [])];
}

const winnerLogoByCompanyKey: Record<string, string> = {
  'a i r s': '/assets/images/clients/airs_logo.png',
  'aero accessories inc': '/assets/images/winners/aero_accessories.jpg',
  'aero instruments avionics': '/assets/images/clients/aero_logo.png',
  'ametek mro drake air tulsa': '/assets/images/clients/amtek_n.jpg',
  'aar component services grand prairie': '/assets/images/winners/aar.jpg',
  'aar corporation': '/assets/images/winners/aar.jpg',
  'allflight corporation': '/assets/images/winners/allflight.jpg',
  'avduct worldwide': '/assets/images/clients/avduct.png',
  'b w aviation corp': '/assets/images/clients/b_w.png',
  'emc aerospace inc': '/assets/images/clients/emc_aerospace.webp',
  'evans composites inc': '/assets/images/clients/evans.png',
  'ga telesis landing gear services llc': '/assets/images/winners/GA_Tele.jpg',
  'heico repair group aerostructures': '/assets/images/clients/heico_new.png',
  'hrd aero systems inc': '/assets/images/clients/hrd_new.png',
  'icon aerospace llc': '/assets/images/clients/icon_aero.png',
  'iliff aircraft ata 38': '/assets/images/clients/iliff.png',
  'martec aviation': '/assets/images/clients/martec_aviation.png',
  'mti aviation': '/assets/images/clients/mti_aviation.jpg',
  'setnix llc': '/assets/images/clients/setnix.png',
  'silver wings aerospace': '/assets/images/clients/WencorMRO_SilverWingsAerospaceAWC_Horizontal_RGB.png',
  'soundair aviation svcs': '/assets/images/clients/soundairsm.png',
  standardaero: '/assets/images/clients/standard-aero.png',
  'summit aerospace inc': '/assets/images/clients/summit_logo.png',
  'tag aero llc': '/assets/images/clients/tag_aero.jpg',
  'unicorp systems inc': '/assets/images/clients/unicorp.png',
  'vse aviation services fl': '/assets/images/clients/vse.gif',
  'vse aviation services ky': '/assets/images/clients/vse.gif',
};

const clients: Client[] = Array.from(
  TOPSHOP_2026_WINNER_CARDS.reduce((uniqueByCompany, card) => {
    for (const winner of getAllCardWinners(card)) {
      const normalizedName = winner.replace(/\s+/g, ' ').trim();
      if (!normalizedName) {
        continue;
      }

      const key = normalizeCompanyName(normalizedName);
      if (!uniqueByCompany.has(key)) {
        uniqueByCompany.set(key, normalizedName);
      }
    }

    return uniqueByCompany;
  }, new Map<string, string>()),
)
  .map(([key, name]) => ({
    name,
    logoSrc: winnerLogoByCompanyKey[key],
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

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

        <div className={`clients-marquee${isPaused ? ' clients-marquee--paused' : ''}`}>
          <div className="clients-track">
            {marqueeItems.map((client, idx) => (
              <article
                key={`${client.name}-${idx}`}
                className="client-logo-card"
                aria-hidden={idx >= clients.length || undefined}
                title={client.name}
              >
                {client.logoSrc ? (
                  <Image
                    src={client.logoSrc}
                    alt={`${client.name} logo`}
                    width={190}
                    height={84}
                    className="client-logo"
                  />
                ) : (
                  <span className="client-logo-fallback">{client.name}</span>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
