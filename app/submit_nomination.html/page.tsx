import type { Metadata } from 'next';
import Image from 'next/image';
import { AppLink as Link } from '@/components/ui/app-link';
import { Sparkles } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Badge } from '@/components/ui/badge';
import { NominationForm } from '@/components/nomination-form';
import { NOMINATION_CATEGORIES_2026 } from '@/data/nomination-categories';
import { NOMINATION_COMPANY_SUGGESTIONS } from '@/lib/company-suggestions';
import { SITE_URL } from '@/lib/site';

const nominationCategories = NOMINATION_CATEGORIES_2026;

export const metadata: Metadata = {
  title: 'Submit Nominations | Top Shop Awards',
  description:
    'Submit Top Shop Award nominations by selecting a company and choosing all categories that apply.',
  alternates: {
    canonical: `${SITE_URL}/submit_nomination.html`,
  },
};

export default function SubmitNominationPage() {
  return (
    <div className="app-shell nomination-page-shell">
      <SiteHeader />
      <main>
        <section className="nomination-page-title">
          <div className="nomination-page-title-bg" aria-hidden="true">
            <Image
              src="/assets/images/page-titles/4.jpg"
              alt=""
              fill
              sizes="100vw"
              className="nomination-page-title-image"
              priority
            />
          </div>
          <div className="section-pad">
            <div className="content-wrap nomination-page-title-content">
              <h1>Submit Nominations</h1>
              <p>
                <Link href="/">Home</Link> / <span>Submit Nominations</span>
              </p>
            </div>
          </div>
        </section>

        <section className="nomination-section section-pad">
          <div className="content-wrap nomination-rich-wrap">
            <header className="nomination-rich-header">
              <Badge variant="secondary">
                <Sparkles size={12} aria-hidden="true" />
                <span>Nominations Portal</span>
              </Badge>
              <h2>Select a Company and the Matching Categories</h2>
            </header>

            <NominationForm
              categories={nominationCategories}
              fallbackCompanyOptions={NOMINATION_COMPANY_SUGGESTIONS}
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
