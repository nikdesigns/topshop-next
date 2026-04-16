'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, Menu, TriangleAlert } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AWARDS_FINALIST_LINKS, AWARDS_WINNER_LINKS, LATEST_WINNERS_LINK } from '@/lib/awards-links';
import { nominationWindow } from '@/lib/nomination-window';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

type NavLink = {
  href: string;
  label: string;
};

const winnerLinks: NavLink[] = AWARDS_WINNER_LINKS.filter(
  (link) => link.year !== LATEST_WINNERS_LINK.year,
).map((link) => ({ href: link.href, label: link.label }));

const finalistLinks: NavLink[] = AWARDS_FINALIST_LINKS.map((link) => ({
  href: link.href,
  label: link.label,
}));

const primaryLinks: NavLink[] = [
  { href: '/#welcome', label: 'Welcome' },
  { href: LATEST_WINNERS_LINK.href, label: LATEST_WINNERS_LINK.label },
  { href: '/#schedule', label: 'Schedule' },
  { href: '/faqs.html', label: 'FAQs' },
  { href: '/about-us.html', label: 'About' },
];

const allMobileLinks: NavLink[] = [
  ...primaryLinks,
  ...finalistLinks,
  ...winnerLinks,
];

export function SiteHeader() {
  const mobileCta = nominationWindow.isOpen
    ? { href: '/submit_nomination.html', label: 'Submit Nominations' }
    : { href: allMobileLinks[0]?.href ?? '/', label: 'Continue Browsing' };

  return (
    <header className="site-header rich-header">
      <div className="promo-strip rich-promo-strip">
        <div className="content-wrap rich-promo-wrap">
          <Badge
            variant={nominationWindow.isOpen ? 'success' : 'danger'}
            className={
              nominationWindow.isOpen ? undefined : 'rich-promo-badge'
            }
          >
            {nominationWindow.seasonLabel} Status
          </Badge>
          <p>
            {nominationWindow.isOpen
              ? nominationWindow.openMessage
              : nominationWindow.closedMessage}
          </p>
        </div>
      </div>

      <div className="nav-shell rich-nav-shell">
        <div className="content-wrap rich-nav-row">
          <Link
            href="/"
            className="brand-link rich-brand-link"
            aria-label="Top Shop Awards home"
          >
            <Image
              src="/assets/images/logo/logo.jpg"
              alt="The145 Top Shop Awards"
              width={180}
              height={48}
              priority
            />
          </Link>

          <nav className="rich-desktop-nav" aria-label="Main navigation">
            <ul className="rich-nav-list">
              {primaryLinks.map((link) => (
                <li key={link.href}>
                  <Link className="rich-nav-link" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}

              <li className="rich-nav-group">
                <button
                  type="button"
                  className="rich-nav-link rich-nav-link-button"
                >
                  Finalists <ChevronDown size={14} aria-hidden="true" />
                </button>
                <div className="rich-nav-dropdown">
                  <ul>
                    {finalistLinks.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              <li className="rich-nav-group">
                <button
                  type="button"
                  className="rich-nav-link rich-nav-link-button"
                >
                  Hall of Fame <ChevronDown size={14} aria-hidden="true" />
                </button>
                <div className="rich-nav-dropdown">
                  <ul>
                    {winnerLinks.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </nav>

          <div className="rich-nav-actions">
            {nominationWindow.isOpen ? (
              <Button asChild className="rich-nav-cta rich-nav-cta--open">
                <Link href="/submit_nomination.html">Submit Nominations</Link>
              </Button>
            ) : (
              <div
                className="rich-award-badge rich-nav-cta rich-nav-cta--closed"
                role="status"
                aria-live="polite"
              >
                <span className="rich-award-icon" aria-hidden="true">
                  ×
                </span>
                <span className="rich-award-copy">
                  <span className="rich-award-title">Top Shop Awards</span>
                  <span className="rich-award-year">
                    {nominationWindow.seasonLabel}
                  </span>
                  <span className="rich-award-note">Nominations Closed</span>
                </span>
              </div>
            )}
          </div>

          <div className="rich-mobile-nav-trigger">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open menu">
                  <Menu size={18} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="rich-mobile-sheet">
                <SheetHeader>
                  <SheetTitle>Top Shop Navigation</SheetTitle>
                  <SheetDescription>
                    Use quick links to browse winners, finalists, and pages.
                  </SheetDescription>
                </SheetHeader>

                <div className="rich-mobile-section">
                  <h3>Primary</h3>
                  <ul>
                    {primaryLinks.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rich-mobile-section">
                  <h3>Finalists</h3>
                  <ul>
                    {finalistLinks.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rich-mobile-section">
                  <h3>Hall of Fame</h3>
                  <ul>
                    {winnerLinks.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <SheetFooter>
                  <p className="rich-mobile-note">
                    <TriangleAlert size={14} aria-hidden="true" />
                    <span>
                      {nominationWindow.isOpen
                        ? `Nominations are open for ${nominationWindow.seasonLabel}.`
                        : `Nominations are closed for ${nominationWindow.seasonLabel}.`}
                    </span>
                  </p>
                  <SheetClose asChild>
                    <Button asChild>
                      <Link href={mobileCta.href}>{mobileCta.label}</Link>
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
