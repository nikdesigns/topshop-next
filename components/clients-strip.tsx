'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Pause, Play, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type Client = {
  name: string;
  href: string;
  logo: string;
};

const clients: Client[] = [
  { name: 'AIRS Aviation', href: 'http://airsaviation.com/', logo: '1.jpg' },
  {
    name: 'Aero Instruments',
    href: 'https://www.aeroinst.com/',
    logo: '2.jpg',
  },
  { name: 'ATC', href: 'http://atcphx.com/', logo: '3.jpg' },
  {
    name: 'Ametek Drake Air',
    href: 'https://www.ametekmro.com/businesses/drake-air',
    logo: '4.jpg',
  },
  { name: 'Avduct', href: 'https://www.avduct.com/', logo: '5.jpg' },
  {
    name: 'B&W Aviation',
    href: 'https://bwaviation.net/en/home/',
    logo: '6.jpg',
  },
  {
    name: 'EMC Aerospace',
    href: 'https://www.emcaerospace.com/',
    logo: '7.jpg',
  },
  {
    name: 'Harter',
    href: 'https://www.heico.com/about-us/subsidiaries/harter/',
    logo: '8.jpg',
  },
  {
    name: 'HRG',
    href: 'https://www.heico.com/about-us/subsidiaries/hrga/',
    logo: '9.jpg',
  },
  {
    name: 'HRD Aerosystems',
    href: 'https://www.hrd-aerosystems.com/',
    logo: '10.jpg',
  },
  {
    name: 'Icon Aerospace',
    href: 'https://www.iconaerospace.com/',
    logo: '11.jpg',
  },
  {
    name: 'Iliff Aircraft',
    href: 'https://www.iliffaircraft.com/',
    logo: '12.jpg',
  },
  {
    name: 'Illuminair',
    href: 'https://www.illuminairsupport.com/',
    logo: '13.jpg',
  },
  {
    name: 'Lufthansa Technik',
    href: 'https://www.lufthansa-technik.com/en',
    logo: '14.jpg',
  },
  { name: 'Setnix', href: 'https://setnaio.com/setnix/', logo: '15.jpg' },
  {
    name: 'Silver Wings Aerospace',
    href: 'https://www.silverwingsaerospace.com/',
    logo: '16.jpg',
  },
  {
    name: 'Sound Air',
    href: 'http://www.soundair.com/',
    logo: 'sound_air1.jpg',
  },
  { name: 'Summit MRO', href: 'https://summitmro.com/', logo: '18.jpg' },
  { name: 'TAG Aero', href: 'https://tag.aero/', logo: '19.jpg' },
  {
    name: 'VSE Aviation',
    href: 'https://www.vseaviation.com/',
    logo: '20.jpg',
  },
];

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
            <h3>Top Shops 2026</h3>
            <p>
              Browse 20 standout shops recognized by operators and suppliers across the
              awards cycle.
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
              <Link href="/topshop_2026_winners.html">
                View Winners <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>

        <div className={`clients-marquee${isPaused ? ' clients-marquee--paused' : ''}`}>
          <div className="clients-track">
            {marqueeItems.map((client, idx) => (
              <Link
                key={`${client.name}-${idx}`}
                href={client.href}
                target="_blank"
                rel="noopener noreferrer"
                className="client-logo-card"
                aria-label={`Open ${client.name}`}
                aria-hidden={idx >= clients.length || undefined}
                tabIndex={idx >= clients.length ? -1 : undefined}
                title={client.name}
              >
                <Image
                  src={`/assets/images/clients/${client.logo}`}
                  alt={`${client.name} logo`}
                  width={190}
                  height={84}
                  className="client-logo"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
