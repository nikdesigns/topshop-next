import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Winners2026Listing } from '@/components/winners-2026-listing';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { SITE_URL } from '@/lib/site';

type WinnerCard = {
  category: string;
  multiEntity?: string[];
  singleEntity?: string[];
  winners?: string[];
};

const winnerCards: WinnerCard[] = [
  {
    category: 'Best Accessories Class I, II, III',
    multiEntity: ['VSE Aviation Services - FL'],
    singleEntity: ['Summit Aerospace, Inc.'],
  },
  {
    category: 'Best Airframe & Aerostructures',
    multiEntity: ['HEICO Repair Group - Aerostructures'],
    singleEntity: ['A&R Aviation Services'],
  },
  {
    category: 'Best APU Components',
    multiEntity: ['TAT Technologies - Greensboro'],
    singleEntity: ['Setnix LLC'],
  },
  {
    category: 'Best APU Overhaul',
    multiEntity: ['TAG Aero, LLC'],
    singleEntity: ['Next MRO'],
  },
  {
    category: 'Best Avionics & Instruments',
    multiEntity: ['Aero Instruments & Avionics'],
    singleEntity: ['JJA Aviation'],
  },
  {
    category: 'Best DER Repair',
    multiEntity: ['Innodyne Systems, LLC'],
    singleEntity: ['CVG Aerospace'],
  },
  {
    category: 'Best Ducting',
    winners: ['AvDUCT Worldwide'],
  },
  {
    category: 'Best Electrical Panels',
    winners: ['A.I.R.S.'],
  },
  {
    category: 'Best Electro-Mechanical',
    multiEntity: ['Fokker Services Group'],
    singleEntity: ['Aerostar, Inc'],
  },
  {
    category: 'Best Engine Accessories',
    multiEntity: ['Silver Wings Aerospace'],
    singleEntity: ['MTI Aviation'],
  },
  {
    category: 'Best Engine Components',
    multiEntity: ['AAR Component Services - Grand Prairie'],
    singleEntity: ['BP Aero Services'],
  },
  {
    category: 'Best Engine Overhaul',
    winners: ['StandardAero'],
  },
  {
    category: 'Best Fuel Systems & Fuel Accessories',
    multiEntity: ['ATS Components DFW'],
    singleEntity: ['Cima Aviation'],
  },
  {
    category: 'Best Galley Components',
    multiEntity: ['Icon Aerospace, LLC'],
    singleEntity: ['AvGen Aerospace'],
  },
  {
    category: 'Best Gyros',
    winners: ['North Bay Aviation'],
  },
  {
    category: 'Best Heat Transfer',
    multiEntity: ['Ametek MRO - Drake Air Tulsa'],
    singleEntity: ['Cobalt Aero Services'],
  },
  {
    category: 'Best Hydraulics',
    multiEntity: ['AerSale Component Solutions'],
    singleEntity: ['Lift MRO'],
  },
  {
    category: 'Best In-Flight Entertainment Systems',
    winners: ['Unicorp Systems, Inc'],
  },
  {
    category: 'Best Interiors',
    multiEntity: ['VSE Aviation Services - KY'],
    singleEntity: ['Aviation Repair Technologies'],
  },
  {
    category: 'Best Landing Gear',
    multiEntity: ['GA Telesis Landing Gear Services, LLC'],
    singleEntity: ['Summit Aerospace, Inc'],
  },
  {
    category: 'Best Lavatory & Sanitation Components',
    multiEntity: ['Soundair Aviation Svcs'],
    singleEntity: ['Iliff Aircraft - ATA 38'],
  },
  {
    category: 'Best Lighting',
    winners: ['AOG Reaction, Inc'],
  },
  {
    category: 'Best NDT Facility',
    winners: ['MARTEC Aviation'],
  },
  {
    category: 'Best Ozone',
    winners: ['AeroParts Manufacturing & Repair, Inc'],
  },
  {
    category: 'Best Plastic Components',
    winners: ['Evans Composites, Inc'],
  },
  {
    category: 'Best Pneumatics',
    multiEntity: ['Aero Accessories, Inc'],
    singleEntity: ['EMC Aerospace, Inc'],
  },
  {
    category: 'Best Safety Equipment',
    multiEntity: ['Aviation Inflatables'],
    singleEntity: ['HRD Aero Systems, Inc'],
  },
  {
    category: 'Best Specialty Repair Services',
    winners: ['Curtiss-Wright Surface Technologies'],
  },
  {
    category: 'Best Total Solutions Provider',
    winners: ['AAR Corporation'],
  },
  {
    category: 'Best Transparencies',
    winners: ['Allflight Corporation'],
  },
  {
    category: 'Best Wheel and Brake',
    multiEntity: ['AllClear Repair Services'],
    singleEntity: ['B&W Aviation Corp'],
  },
];

export const metadata: Metadata = {
  title: '2026 Top Shop Winners | Top Shop Awards',
  description:
    'Official 2026 Top Shop Awards winners by repair category, including multi-entity and single-entity facilities.',
  alternates: {
    canonical: `${SITE_URL}/topshop_2026_winners.html`,
  },
};

export default function Topshop2026WinnersPage() {
  return (
    <div className="app-shell winners-2026-page-shell">
      <SiteHeader />
      <main>
        <section className="winners-2026-page-title">
          <div className="winners-2026-page-title-bg" aria-hidden="true">
            <Image
              src="/assets/images/page-titles/333.jpg"
              alt=""
              fill
              sizes="100vw"
              className="winners-2026-page-title-image"
              priority
            />
          </div>
          <div className="section-pad">
            <div className="content-wrap winners-2026-page-title-content">
              <h1>2026 Top Shop Winners</h1>
              <p>
                <Link href="/">Home</Link> / <span>2026 Winners</span>
              </p>
            </div>
          </div>
        </section>

        <section className="winners-2026-intro section-pad">
          <div className="content-wrap winners-2026-intro-grid">
            <aside className="winners-2026-logo-card">
              <h2>Top Shops 2026 Winners</h2>
              <Image
                src="/assets/images/logo/top_shop_logo_2026.png"
                alt="Top Shops 2026 Winners badge"
                width={226}
                height={226}
                className="winners-2026-logo"
              />
            </aside>

            <article className="winners-2026-copy">
              <p>
                We are thrilled to announce the 2026 winners of The145 Top Shop Awards. This
                year&apos;s voting season was another remarkable success, showcasing the strength,
                skill, and dedication of the global repair community.
              </p>
              <p>
                Participation was outstanding, with thousands of nominations submitted and votes cast
                across a wide range of repair categories. Many categories were fiercely competitive,
                while others were decided by clear and decisive margins.
              </p>
              <p>
                On behalf of The145 and repair centers worldwide, thank you to everyone who
                participated in nominations and voting. Your engagement is what makes these awards
                possible year after year.
              </p>
              <p>
                Congratulations to all 2026 winners. Earning Top Shop recognition reflects
                commitment to quality, reliability, and excellence.
              </p>
              <p className="winners-2026-callout">Below are the 2026 winners by repair category:</p>
            </article>
          </div>
        </section>

        <Winners2026Listing cards={winnerCards} />
      </main>
      <SiteFooter />
    </div>
  );
}
