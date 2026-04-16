import { AWARDS_FINALIST_LINKS_DATA, AWARDS_WINNER_LINKS_DATA } from '@/data/awards-cycle';

export const AWARDS_WINNER_LINKS = AWARDS_WINNER_LINKS_DATA;

export const AWARDS_FINALIST_LINKS = AWARDS_FINALIST_LINKS_DATA;

export const LATEST_WINNERS_LINK = AWARDS_WINNER_LINKS[0] ?? {
  year: '',
  href: '/',
  label: 'Winners',
};

export const LATEST_FINALISTS_LINK = AWARDS_FINALIST_LINKS[0] ?? {
  year: '',
  href: '/',
  label: 'Finalists',
};
