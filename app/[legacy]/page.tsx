import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { LEGACY_ALIAS_MAP, LEGACY_ALIAS_SLUGS } from '@/lib/legacy-aliases';
import { SITE_URL } from '@/lib/site';

type LegacyPageProps = {
  params: Promise<{
    legacy: string;
  }>;
};

export function generateStaticParams() {
  return LEGACY_ALIAS_SLUGS.map((legacy) => ({ legacy }));
}

export async function generateMetadata({ params }: LegacyPageProps): Promise<Metadata> {
  const { legacy } = await params;
  const config = LEGACY_ALIAS_MAP[legacy];

  if (!config) {
    return {
      title: 'Page Not Found',
    };
  }

  const canonical = config.target === '/' ? SITE_URL : `${SITE_URL}${config.target}`;

  return {
    title: `${config.title} | Top Shop Awards`,
    description: config.description,
    alternates: {
      canonical,
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function LegacyAliasPage({ params }: LegacyPageProps) {
  const { legacy } = await params;
  const config = LEGACY_ALIAS_MAP[legacy];

  if (!config) {
    notFound();
  }

  const redirectScript = `window.location.replace(${JSON.stringify(config.target)});`;

  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="legacy-bridge-page">
        <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
        <section className="legacy-bridge-card">
          {config.badge ? <p className="legacy-bridge-badge">{config.badge}</p> : null}
          <h1>{config.title}</h1>
          <p>{config.description}</p>
          <div className="legacy-bridge-actions">
            <Link href={config.target} className="legacy-bridge-primary">
              Continue
            </Link>
            <Link href="/" className="legacy-bridge-secondary">
              Back to Homepage
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
