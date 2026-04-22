import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import {
  LATEST_FINALISTS_ROUTE,
  LATEST_WINNERS_ROUTE,
} from '@/lib/awards-route-map';
import {
  CONTACT_EMAIL,
  CONTACT_MAILTO_HREF,
  CONTACT_PHONE_LABEL,
  CONTACT_TEL_HREF,
  CONTACT_WEBSITE_URL,
} from '@/lib/contact';
import { nominationWindow } from '@/lib/nomination-window';

const services = [
  'Repair Search',
  'Inventory Search',
  'Market Intelligence',
  'Audit Management',
  'Shop Support Services',
];

const exploreLinks = [
  { href: '/#welcome', label: 'Welcome' },
  { href: LATEST_WINNERS_ROUTE.href, label: LATEST_WINNERS_ROUTE.label },
  { href: LATEST_FINALISTS_ROUTE.href, label: LATEST_FINALISTS_ROUTE.label },
  { href: '/gallery.html', label: 'Gallery' },
  { href: '/assets.html', label: 'Assets' },
  { href: '/faqs.html', label: 'FAQs' },
  { href: '/about-us.html', label: 'About Us' },
];

const legalLinks = [
  { href: '/faqs.html', label: 'Terms & Conditions' },
  { href: '/faqs.html', label: 'Privacy Policy' },
  { href: '/sitemap.xml', label: 'Sitemap' },
];

export function SiteFooter() {
  const copyrightYear = new Date().getFullYear();

  return (
    <footer id="footer" className="site-footer section-pad">
      <div className="content-wrap footer-feature-strip">
        <p>
          Need help with Top Shop Awards {nominationWindow.seasonLabel}? Our team can guide you
          through nominations, winner visibility, and finalist publishing.
        </p>
        <div className="footer-feature-actions">
          <Link href="/faqs.html" className="footer-feature-link footer-feature-link--ghost">
            Browse FAQs
          </Link>
          <Link
            href={nominationWindow.isOpen ? '/submit_nomination.html' : LATEST_WINNERS_ROUTE.href}
            className="footer-feature-link footer-feature-link--primary"
          >
            {nominationWindow.isOpen ? 'Submit Nominations' : `View ${LATEST_WINNERS_ROUTE.label}`}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="content-wrap footer-top-grid">
        <section className="footer-brand">
          <Image
            src="/assets/images/logo/logo-footer.png"
            alt="The145 logo"
            width={220}
            height={56}
            className="footer-logo"
          />
          <p className="footer-brand-copy">
            Your secret weapon to making smarter MRO related business decisions.
          </p>
          <div className="footer-contact-mini">
            <p>
              <Phone size={13} aria-hidden="true" />
              <a href={CONTACT_TEL_HREF}>{CONTACT_PHONE_LABEL}</a>
            </p>
            <p>
              <Mail size={13} aria-hidden="true" />
              <a href={CONTACT_MAILTO_HREF}>{CONTACT_EMAIL}</a>
            </p>
          </div>
          <Link href={CONTACT_WEBSITE_URL} target="_blank" rel="noopener noreferrer">
            Visit the145.com
          </Link>
        </section>

        <section>
          <h3>Explore</h3>
          <nav aria-label="Footer explore">
            <ul>
              {exploreLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>

        <section>
          <h3>Services</h3>
          <nav aria-label="Footer services">
            <ul>
              {services.map((service) => (
                <li key={service}>
                  <Link href="https://www.the145.com/" target="_blank" rel="noopener noreferrer">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>

        <section>
          <h3>Newsletter</h3>
          <p>
            Sign up for industry alerts, latest news, and insights from The145. You may withdraw
            consent at any time.
          </p>
          <form
            className="footer-newsletter-form"
            action={CONTACT_MAILTO_HREF}
            method="post"
            encType="text/plain"
          >
            <input type="hidden" name="source" value="Top Shop Awards Newsletter" />
            <input
              type="email"
              name="newsletterEmail"
              placeholder="Your Email Address"
              aria-label="Your Email Address"
            />
            <button type="submit">Join</button>
          </form>
          <p className="footer-newsletter-note">
            Static export mode: connect this form to your preferred email provider endpoint.
          </p>
          <div className="footer-links">
            {legalLinks.map((item) => (
              <Link key={item.label} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="content-wrap footer-bottom-bar">
        <p>
          <span>&copy; {copyrightYear} The145. All Rights Reserved.</span>{' '}
          <Link href="http://topshopawards.com">TopShopAwards.com</Link>
        </p>
      </div>
    </footer>
  );
}
