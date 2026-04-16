import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Mail, Phone } from 'lucide-react';
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
  { href: '/topshop_2026_winners.html', label: '2026 Winners' },
  { href: '/topshop_2026_finalist.html', label: '2026 Finalists' },
  { href: '/faqs.html', label: 'FAQs' },
  { href: '/about-us.html', label: 'About Us' },
];

const legalLinks = [
  { href: '/faqs.html', label: 'Terms & Conditions' },
  { href: '/faqs.html', label: 'Privacy Policy' },
  { href: '/sitemap.xml', label: 'Sitemap' },
];

export function SiteFooter() {
  return (
    <footer id="footer" className="site-footer section-pad">
      <div className="content-wrap footer-feature-strip">
        <p>
          Need help with Top Shop Awards {nominationWindow.seasonLabel}? Our team can guide you
          through nominations, finalists, and winner visibility.
        </p>
        <div className="footer-feature-actions">
          <Link href="/faqs.html" className="footer-feature-link footer-feature-link--ghost">
            Browse FAQs
          </Link>
          <Link
            href={
              nominationWindow.isOpen ? '/submit_nomination.html' : '/topshop_2026_finalist.html'
            }
            className="footer-feature-link footer-feature-link--primary"
          >
            {nominationWindow.isOpen ? 'Submit Nominations' : 'View Finalists'}
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
              <a href="tel:+18888208551">+1 (888) 820-8551</a>
            </p>
            <p>
              <Mail size={13} aria-hidden="true" />
              <a href="mailto:support@the145.com">support@the145.com</a>
            </p>
          </div>
          <Link href="https://the145.com" target="_blank" rel="noopener noreferrer">
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
          <form className="footer-newsletter-form" action="#">
            <input type="email" placeholder="Your Email Address" aria-label="Your Email Address" />
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
          <span>&copy; 2025 The145. All Rights Reserved.</span>{' '}
          <Link href="http://topshopawards.com">TopShopAwards.com</Link>
        </p>
      </div>
    </footer>
  );
}
