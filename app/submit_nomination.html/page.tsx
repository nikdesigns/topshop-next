import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { NominationCompanyAutocomplete } from '@/components/nomination-company-autocomplete';
import { CONTACT_EMAIL, CONTACT_MAILTO_HREF } from '@/lib/contact';
import { NOMINATION_COMPANY_SUGGESTIONS } from '@/lib/company-suggestions';
import { SITE_URL } from '@/lib/site';

type NominationCategory = {
  id: string;
  label: string;
};

const nominationCategories: NominationCategory[] = [
  { id: '1', label: 'Accessories Class I, II, and III' },
  { id: '2', label: 'Airframe and Aerostructures' },
  { id: '3', label: 'APU' },
  { id: '91', label: 'APU Overhaul' },
  { id: '5', label: 'Avionics and Instruments' },
  { id: '81', label: 'DER Repair' },
  { id: '61', label: 'Ducting' },
  { id: '51', label: 'Electrical Panels' },
  { id: '6', label: 'Electro-Mechanical' },
  { id: '7', label: 'Engine Accessories' },
  { id: '8', label: 'Engine Components' },
  { id: '9', label: 'Engine Overhaul' },
  { id: '10', label: 'Fuel Systems and Fuel Accessories' },
  { id: '11', label: 'Galley Components' },
  { id: '12', label: 'Gyros' },
  { id: '14', label: 'Heat Transfer' },
  { id: '13', label: 'Hydraulics' },
  { id: '25', label: 'In-Flight Entertainment Systems' },
  { id: '15', label: 'Interiors' },
  { id: '16', label: 'Landing Gear' },
  { id: '17', label: 'Lavatory / Sanitation Components' },
  { id: '101', label: 'Lighting' },
  { id: '71', label: 'NDT Facility' },
  { id: '18', label: 'OEM' },
  { id: '111', label: 'Ozone' },
  { id: '31', label: 'Plastic Components' },
  { id: '19', label: 'Pneumatics' },
  { id: '20', label: 'Safety Equipment' },
  { id: '143', label: 'Specialty Service' },
  { id: '21', label: 'Total Solutions Provider' },
  { id: '41', label: 'Transparencies' },
  { id: '22', label: 'Wheel and Brake' },
];

const CATEGORY_COLUMN_COUNT = 3;

const nominationCategoriesSorted = [...nominationCategories].sort((a, b) =>
  a.label.localeCompare(b.label),
);

const categoryChunkSize = Math.ceil(nominationCategoriesSorted.length / CATEGORY_COLUMN_COUNT);

const nominationCategoryColumns = Array.from(
  { length: CATEGORY_COLUMN_COUNT },
  (_, index) =>
    nominationCategoriesSorted.slice(
      index * categoryChunkSize,
      (index + 1) * categoryChunkSize,
    ),
);

export const metadata: Metadata = {
  title: 'Submit Nominations | Top Shop Awards',
  description:
    'Submit Top Shop Award nominations by selecting a company and choosing all categories that apply.',
  alternates: {
    canonical: `${SITE_URL}/submit_nomination.html`,
  },
};

export default function SubmitNominationPage() {
  const companySuggestionsCount = NOMINATION_COMPANY_SUGGESTIONS.length;
  const totalCategories = nominationCategoriesSorted.length;

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

            <form
              action={CONTACT_MAILTO_HREF}
              method="post"
              encType="text/plain"
              className="nomination-form nomination-form-rich"
            >
              <input type="hidden" name="source" value="Top Shop Awards Nomination" />
              <Card className="nomination-company-card nomination-company-card-rich">
                <CardHeader>
                  <CardTitle>Company Name</CardTitle>
                </CardHeader>
                <CardContent>
                  <label htmlFor="companyName" className="sr-only">
                    Company Name
                  </label>
                  <NominationCompanyAutocomplete
                    id="companyName"
                    name="companyName"
                    placeholder="Enter company name here..."
                    options={NOMINATION_COMPANY_SUGGESTIONS}
                    maxSuggestions={14}
                  />
                  <p className="nomination-company-note">
                    Autocomplete includes {companySuggestionsCount} known companies from past
                    Top Shop finalists and winners.
                  </p>
                </CardContent>
              </Card>

              <div className="nomination-chip-info nomination-chip-info-rich">
                <h3>Select all categories that apply</h3>
                <p>Multiple selections are allowed.</p>
              </div>

              <div className="nomination-category-shell">
                <header className="nomination-category-shell-head">
                  <div>
                    <h3>Category Directory</h3>
                    <p>Categories are listed alphabetically. Select all that apply.</p>
                  </div>
                  <p className="nomination-category-total">{totalCategories} Categories</p>
                </header>

                <fieldset className="nomination-category-fieldset">
                  <legend className="sr-only">Nomination Categories</legend>
                  <div className="nomination-category-columns">
                    {nominationCategoryColumns.map((column, columnIndex) => (
                      <div key={`column-${columnIndex}`} className="nomination-category-column">
                        {column.map((category) => (
                          <label
                            key={category.id}
                            htmlFor={`category-${category.id}`}
                            className="nomination-category-item"
                          >
                            <Checkbox
                              id={`category-${category.id}`}
                              name="categoryCheck[]"
                              value={category.id}
                            />
                            <span>{category.label}</span>
                          </label>
                        ))}
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>

              <div className="nomination-actions nomination-actions-rich">
                <Button type="submit" size="lg">
                  Submit Nomination
                </Button>
                <p>
                  This form opens your default email client and pre-fills the nomination details
                  to send to {CONTACT_EMAIL}.
                </p>
                <p className="nomination-actions-note">
                  <ShieldCheck size={14} aria-hidden="true" />
                  <span>Your category selections remain visible for review before submit.</span>
                </p>
              </div>
            </form>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
