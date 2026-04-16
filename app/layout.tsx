import type { Metadata } from 'next';
import './globals.css';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'The145 - Top Shop Awards',
  description: 'Top Shop Awards website migration to Next.js static export',
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: '/assets/images/favicon/favicon.png',
  },
  openGraph: {
    title: 'The145 - Top Shop Awards',
    description: 'Top Shop Awards website migration to Next.js static export',
    url: SITE_URL,
    siteName: 'Top Shop Awards',
    type: 'website',
    images: [{ url: '/assets/images/banners/ts_winner_2026_1.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The145 - Top Shop Awards',
    description: 'Top Shop Awards website migration to Next.js static export',
    images: ['/assets/images/banners/ts_winner_2026_1.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
