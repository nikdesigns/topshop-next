import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarClock, HelpCircle, Lightbulb, ListChecks, ShieldCheck } from 'lucide-react';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LATEST_WINNERS_ROUTE } from '@/lib/awards-route-map';
import { nominationWindow } from '@/lib/nomination-window';
import { SITE_URL } from '@/lib/site';

const awardCategories = [
  'Best Accessories Class I, II, and III Repair',
  'Best Airframe and Aerostructures Repair',
  'Best APU Repair',
  'Best Avionics and Instruments Repair',
  'Best Electro-Mechanical Repair',
  'Best Engine Accessories Repair',
  'Best Engine Components Repair',
  'Best Engine Overhaul Repair',
  'Best Fuel Systems and Fuel Accessories Repair',
  'Best Galley Components Repair',
  'Best Gyros Repair',
  'Best Heat Transfer Repair',
  'Best Hydraulics Repair',
  'Best In-Flight Entertainment Systems Repair',
  'Best Interiors Repair',
  'Best Landing Gear Repair',
  'Best Lavatory / Sanitation Components Repair',
  'Best OEM Repair',
  'Best Pneumatics Repair',
  'Best Safety Equipment Repair',
  'Best Total Solutions Provider',
  'Best Wheel and Brake Repair',
];

type FaqItem = {
  id: string;
  question: string;
  answer: string;
  bullets?: string[];
  openByDefault?: boolean;
};

const faqItemsLeft: FaqItem[] = [
  {
    id: 'faq-categories',
    question: 'How many award categories are there?',
    answer:
      'Currently, The145 presents twenty-two award categories each year. Over time, the number of awards has increased and remains one of the most comprehensive recognitions in aviation maintenance.',
    openByDefault: true,
  },
  {
    id: 'faq-selection',
    question: "What's the selection process?",
    answer:
      'All winners are nominated and selected by their peers in aviation. The145 does not influence outcomes; it only tabulates votes for finalists and winners.',
  },
  {
    id: 'faq-vote-weight',
    question: 'Are winners chosen only by total votes?',
    answer:
      'The process has two phases so shops are evaluated fairly at finalist and winner stages.',
    bullets: [
      'Phase 1: Finalists selection is based on nomination volume to build the shortlist.',
      'Phase 2: Airlines and suppliers vote for one finalist in each category, and winners are selected from final vote totals.',
    ],
  },
];

const faqItemsRight: FaqItem[] = [
  {
    id: 'faq-the145-role',
    question: 'How is The145.com involved?',
    answer:
      'The145.com is the founder and host of the awards since 2008. Its role is neutral and administrative: collecting and tabulating nomination and voting results.',
  },
  {
    id: 'faq-voters',
    question: 'Who are the voters?',
    answer:
      'Voters are aviation organizations that work with repair centers, including airlines, OEMs, leasing companies, suppliers, and other repair organizations.',
  },
  {
    id: 'faq-self-nomination',
    question: 'Are self-nominations counted?',
    answer: 'No. Self-nominations are not tabulated.',
  },
];

const tipsToWin = [
  {
    title: 'Fit the Part',
    body: 'Evaluate your strengths in service quality, turn-around times, pricing, innovation, and professionalism. Strong operations and consistency are what peers recognize.',
  },
  {
    title: 'Download the "Vote for Us" Link',
    body: 'Increase exposure by placing your vote button in email signatures and on your website to make nominations easier for customers and partners.',
  },
  {
    title: 'Educate Your Staff',
    body: 'Coach customer-facing teams to ask for nominations at the right moments, especially when customers express satisfaction with your work.',
  },
];

const faqHighlights = [
  { value: '22', label: 'Award Categories' },
  { value: '2-Phase', label: 'Selection Process' },
  { value: '100%', label: 'Peer-Driven Voting' },
];

const faqQuickLinks = [
  { href: '#faq-framework', label: 'Awards Framework' },
  { href: '#faq-governance', label: 'Voting & Governance' },
  { href: '#tips', label: 'Tips To Win' },
];

export const metadata: Metadata = {
  title: 'Details | Top Shop Awards',
  description:
    'Top Shop Awards details page with winner event highlights, FAQs, and practical tips to improve nomination outcomes.',
  alternates: {
    canonical: `${SITE_URL}/faqs.html`,
  },
};

export default function FaqsPage() {
  return (
    <div className="app-shell faqs-page-shell">
      <SiteHeader />
      <main>
        <section className="faqs-page-title">
          <div className="faqs-page-title-bg" aria-hidden="true">
            <Image
              src="/assets/images/page-titles/4.jpg"
              alt=""
              fill
              sizes="100vw"
              className="faqs-page-title-image"
              priority
            />
          </div>
          <div className="section-pad">
            <div className="content-wrap faqs-page-title-content">
              <h1>Awards FAQs</h1>
              <p>
                <Link href="/">Home</Link> / <span>Details</span>
              </p>
            </div>
          </div>
        </section>

        <section className="faq-section section-pad">
          <div className="content-wrap">
            <header className="faq-header faq-header-rich">
              <Badge variant="secondary">
                <HelpCircle size={12} aria-hidden="true" />
                <span>Need Clarity?</span>
              </Badge>
              <h2>Frequently Asked Questions</h2>
              <p>Everything you need to know to position your organization as a Top Shop.</p>
            </header>

            <div className="faq-stat-strip" aria-label="Awards FAQ highlights">
              {faqHighlights.map((item) => (
                <article key={item.label} className="faq-stat-card">
                  <p className="faq-stat-value">{item.value}</p>
                  <p className="faq-stat-label">{item.label}</p>
                </article>
              ))}
            </div>

            <div className="faq-layout">
              <div className="faq-main-panels">
                <Card id="faq-framework" className="faq-rich-card">
                  <CardHeader>
                    <CardTitle>Awards Framework</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion
                      type="single"
                      collapsible
                      defaultValue={faqItemsLeft.find((item) => item.openByDefault)?.id}
                    >
                      {faqItemsLeft.map((item) => (
                        <AccordionItem key={item.id} value={item.id}>
                          <AccordionTrigger>{item.question}</AccordionTrigger>
                          <AccordionContent className="site-prose">
                            <p>{item.answer}</p>
                            {item.question === 'How many award categories are there?' ? (
                              <ul className="faq-categories-list">
                                {awardCategories.map((category) => (
                                  <li key={category}>{category}</li>
                                ))}
                              </ul>
                            ) : null}
                            {item.bullets ? (
                              <ul>
                                {item.bullets.map((bullet) => (
                                  <li key={bullet}>{bullet}</li>
                                ))}
                              </ul>
                            ) : null}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>

                <Card id="faq-governance" className="faq-rich-card">
                  <CardHeader>
                    <CardTitle>Voting & Governance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible>
                      {faqItemsRight.map((item) => (
                        <AccordionItem key={item.id} value={item.id}>
                          <AccordionTrigger>{item.question}</AccordionTrigger>
                          <AccordionContent className="site-prose">
                            <p>{item.answer}</p>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </div>

              <aside className="faq-side-panel" aria-label="FAQ quick navigation and support">
                <Card className="faq-side-card">
                  <CardHeader>
                    <CardTitle>
                      <ListChecks size={15} aria-hidden="true" />
                      Quick Navigation
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="faq-side-links">
                    {faqQuickLinks.map((item) => (
                      <Link key={item.href} href={item.href} className="faq-side-link">
                        <span>{item.label}</span>
                        <ArrowRight size={13} aria-hidden="true" />
                      </Link>
                    ))}
                  </CardContent>
                </Card>

                <Card className="faq-side-card faq-side-card--assist">
                  <CardHeader>
                    <CardTitle>
                      <CalendarClock size={15} aria-hidden="true" />
                      Need Personalized Help?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="faq-assist-content">
                    <p>
                      {nominationWindow.isOpen
                        ? `Nominations are open for ${nominationWindow.seasonLabel}. If you need category guidance, our team can help.`
                        : `Nominations are closed for ${nominationWindow.seasonLabel}. You can still review winners and prepare your next cycle plan.`}
                    </p>
                    <p className="faq-assist-chip">
                      <ShieldCheck size={14} aria-hidden="true" />
                      Support responses are typically shared within 24 hours.
                    </p>
                    <Button asChild size="sm" variant={nominationWindow.isOpen ? 'default' : 'outline'}>
                      <Link
                        href={
                          nominationWindow.isOpen
                            ? '/submit_nomination.html'
                            : LATEST_WINNERS_ROUTE.href
                        }
                      >
                        {nominationWindow.isOpen
                          ? 'Go To Submission Page'
                          : `View ${LATEST_WINNERS_ROUTE.label}`}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </aside>
            </div>
          </div>
        </section>

        <section id="tips" className="tips-section section-pad">
          <div className="content-wrap">
            <header className="tips-header tips-header-rich">
              <Badge variant="subtle">
                <Lightbulb size={12} aria-hidden="true" />
                <span>Tips to Win</span>
              </Badge>
              <h2>How to Increase Your Chances</h2>
              <p className="tips-subdesc">
                Three practical tactics that consistently improve nomination momentum.
              </p>
            </header>
            <div className="tips-grid">
              {tipsToWin.map((tip) => (
                <Card key={tip.title} className="tip-card tip-card-rich">
                  <CardHeader>
                    <CardTitle>{tip.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{tip.body}</p>
                    {tip.title === 'Download the "Vote for Us" Link' ? (
                      <div className="tip-vote-row">
                        <Image
                          src="/assets/images/button/topshop_vote_button.png"
                          alt="Vote for us button"
                          width={160}
                          height={53}
                          className="tip-vote-image"
                        />
                        <Button asChild size="sm" variant="outline">
                          <Link href="/#votebutton">Open Nomination Section</Link>
                        </Button>
                      </div>
                    ) : null}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
