import type { Metadata } from 'next';
import './globals.css';
import { RouteLoadingIndicator } from '@/components/route-loading-indicator';
import { nominationWindow } from '@/lib/nomination-window';
import { SITE_URL } from '@/lib/site';

const siteTitle = 'The145 - Top Shop Awards';
const siteDescription = 'Official Top Shop Awards site for nominations, finalists, winners, and event highlights.';

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: '/assets/images/favicon/favicon.png',
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: SITE_URL,
    siteName: 'Top Shop Awards',
    type: 'website',
    images: [{ url: nominationWindow.socialCardImageSrc }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [nominationWindow.socialCardImageSrc],
  },
};

const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}#organization`,
      name: 'The145',
      url: SITE_URL,
      logo: `${SITE_URL}/assets/images/logo/logo.jpg`,
      sameAs: ['https://the145.com'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      name: 'Top Shop Awards',
      url: SITE_URL,
      publisher: {
        '@id': `${SITE_URL}#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RouteLoadingIndicator />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
