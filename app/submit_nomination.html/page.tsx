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
import { Input } from '@/components/ui/input';
import { SITE_URL } from '@/lib/site';

type NominationCategory = {
  id: string;
  label: string;
};

const nominationColumns: NominationCategory[][] = [
  [
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
  ],
  [
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
    { id: '143', label: 'Specialty Service' },
  ],
  [
    { id: '17', label: 'Lavatory / Sanitation Components' },
    { id: '101', label: 'Lighting' },
    { id: '71', label: 'NDT Facility' },
    { id: '18', label: 'OEM' },
    { id: '111', label: 'Ozone' },
    { id: '31', label: 'Plastic Components' },
    { id: '19', label: 'Pneumatics' },
    { id: '20', label: 'Safety Equipment' },
    { id: '21', label: 'Total Solutions Provider' },
    { id: '41', label: 'Transparencies' },
    { id: '22', label: 'Wheel and Brake' },
  ],
];

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

            <form action="#" method="post" className="nomination-form nomination-form-rich">
              <Card className="nomination-company-card nomination-company-card-rich">
                <CardHeader>
                  <CardTitle>Company Name</CardTitle>
                </CardHeader>
                <CardContent>
                  <label htmlFor="companyName" className="sr-only">
                    Company Name
                  </label>
                  <Input
                    id="companyName"
                    name="companyName"
                    placeholder="Enter company name here..."
                    className="nomination-company-input"
                  />
                </CardContent>
              </Card>

              <div className="nomination-chip-info nomination-chip-info-rich">
                <h3>Select all categories that apply</h3>
                <p>Multiple selections are allowed.</p>
              </div>

              <div className="nomination-category-grid nomination-category-grid-rich">
                {nominationColumns.map((column, columnIndex) => (
                  <Card key={`column-${columnIndex}`} className="nomination-column nomination-column-rich">
                    <CardHeader>
                      <CardTitle>Category Group {columnIndex + 1}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <fieldset>
                        <legend className="sr-only">
                          Nomination Categories Column {columnIndex + 1}
                        </legend>
                        <div className="nomination-option-stack">
                          {column.map((category) => (
                            <label
                              key={category.id}
                              htmlFor={`category-${category.id}`}
                              className="nomination-option nomination-option-rich"
                            >
                              <Checkbox id={`category-${category.id}`} name="categoryCheck[]" value={category.id} />
                              <span>{category.label}</span>
                            </label>
                          ))}
                        </div>
                      </fieldset>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="nomination-actions nomination-actions-rich">
                <Button type="submit" size="lg">
                  Submit Nomination
                </Button>
                <p>
                  Static export note: backend submission endpoint integration is pending; this form
                  currently provides finalized UX and client-side structure.
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
