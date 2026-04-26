import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { AccessCodeGeneratorPanel } from '@/components/access-code-generator-panel';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { Badge } from '@/components/ui/badge';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Access Code Generator | Top Shop Awards',
  description:
    'Internal utility for generating hashed access codes used by protected Top Shop Awards assets.',
  alternates: {
    canonical: `${SITE_URL}/access-code-generator.html`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AccessCodeGeneratorPage() {
  return (
    <div className="app-shell assets-page-shell">
      <SiteHeader />
      <main>
        <section className="assets-page-title">
          <div className="assets-page-title-bg" aria-hidden="true">
            <Image
              src="/assets/images/page-titles/4.jpg"
              alt=""
              fill
              sizes="100vw"
              className="assets-page-title-image"
              priority
            />
          </div>
          <div className="section-pad">
            <div className="content-wrap assets-page-title-content">
              <h1>Access Code Generator</h1>
              <p>
                <Link href="/">Home</Link> / <span>Generator</span>
              </p>
            </div>
          </div>
        </section>

        <section className="assets-library section-pad">
          <div className="content-wrap assets-library-wrap">
            <header className="assets-library-header site-prose">
              <Badge variant="secondary" className="assets-library-badge">
                <ShieldCheck size={12} aria-hidden="true" />
                <span>Internal Utility</span>
              </Badge>
              <h2>Generate Access Hashes</h2>
              <p>
                This page is password-gated. Generate role-scoped hashes so finalist and winner
                downloads can be unlocked separately.
              </p>
            </header>

            <AccessCodeGeneratorPanel />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
