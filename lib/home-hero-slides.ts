import {
  LATEST_FINALISTS_LINK,
  LATEST_WINNERS_LINK,
} from '@/lib/awards-links';
import { nominationWindow } from '@/lib/nomination-window';

export type HomeHeroSlide = {
  title: string;
  subtitle: string;
  image: string;
  href: string;
  ctaLabel: string;
};

export const HOME_HERO_SLIDES: HomeHeroSlide[] = [
  {
    title: LATEST_WINNERS_LINK.label,
    subtitle: 'Celebrating the shops setting the benchmark for excellence.',
    image: nominationWindow.heroWinnersImageSrc,
    href: LATEST_WINNERS_LINK.href,
    ctaLabel: 'View winners',
  },
  {
    title: LATEST_FINALISTS_LINK.label,
    subtitle:
      "Explore this year's finalists across aviation maintenance categories.",
    image: nominationWindow.heroFinalistsImageSrc,
    href: LATEST_FINALISTS_LINK.href,
    ctaLabel: 'View finalists',
  },
  {
    title: `${nominationWindow.highlightsYear} Event Recap`,
    subtitle: 'Watch the event highlights from the Top Shop Awards.',
    image: nominationWindow.heroRecapImageSrc,
    href: nominationWindow.highlightsVideoShareUrl,
    ctaLabel: 'Watch video',
  },
];
