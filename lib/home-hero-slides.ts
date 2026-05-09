import { LATEST_FINALISTS_LINK } from '@/lib/awards-links';
import { nominationWindow } from '@/lib/nomination-window';

export type HomeHeroSlide = {
  title: string;
  subtitle: string;
  image: string;
  href: string;
  ctaLabel: string;
  videoSrc?: string;
};

export const HOME_HERO_SLIDES: HomeHeroSlide[] = [
  {
    title: `${nominationWindow.highlightsYear} Event Recap`,
    subtitle: 'Watch the event highlights from the Top Shop Awards.',
    image: nominationWindow.heroRecapImageSrc,
    href: nominationWindow.highlightsVideoShareUrl,
    ctaLabel: 'Watch video',
    videoSrc: nominationWindow.highlightsVideoEmbedUrl,
  },
  {
    title: LATEST_FINALISTS_LINK.label,
    subtitle:
      "Explore this year's finalists across aviation maintenance categories.",
    image: nominationWindow.heroFinalistsImageSrc,
    href: LATEST_FINALISTS_LINK.href,
    ctaLabel: 'View finalists',
  },
];
