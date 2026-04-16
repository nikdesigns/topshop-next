import { ACTIVE_AWARDS_SEASON } from '@/data/awards-cycle';

function parseDateUtc(date: string, endOfDay = false): Date {
  const [year, month, day] = date.split('-').map((part) => Number(part));
  const hour = endOfDay ? 23 : 0;
  const minute = endOfDay ? 59 : 0;
  const second = endOfDay ? 59 : 0;
  return new Date(Date.UTC(year, month - 1, day, hour, minute, second, endOfDay ? 999 : 0));
}

function formatDateLong(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parseDateUtc(date));
}

const season = ACTIVE_AWARDS_SEASON;
const nominationStart = parseDateUtc(season.nominationStartDate);
const nominationEnd = parseDateUtc(season.nominationEndDate, true);
const now = new Date();
const isOpen = now >= nominationStart && now <= nominationEnd;
const openOnLabel = formatDateLong(season.nominationStartDate);
const closeOnLabel = formatDateLong(season.nominationEndDate);

const closedMessagePrefix = now < nominationStart ? 'Nominations open on' : 'Nominations closed on';
const closedMessageDate = now < nominationStart ? openOnLabel : closeOnLabel;
const closedMessageSuffix =
  now < nominationStart
    ? `Get ready for the ${season.seasonLabel} cycle.`
    : `Check out the winners for the ${season.seasonLabel} Top Shop Awards.`;

export const nominationWindow = {
  isOpen,
  seasonLabel: season.seasonLabel,
  nominationStartDate: season.nominationStartDate,
  nominationEndDate: season.nominationEndDate,
  nominationStartLabel: openOnLabel,
  nominationEndLabel: closeOnLabel,
  nominationDateRangeLabel: `${openOnLabel} to ${closeOnLabel}`,
  hashtag: `#TopShopAwards${season.seasonLabel}`,
  scheduleImageSrc: season.assets.scheduleImageSrc,
  socialCardImageSrc: season.assets.socialCardImageSrc,
  heroWinnersImageSrc: season.assets.heroWinnersImageSrc,
  heroFinalistsImageSrc: season.assets.heroFinalistsImageSrc,
  heroRecapImageSrc: season.assets.heroRecapImageSrc,
  winnersShowcaseYear: season.assets.winnersShowcaseYear,
  winnersShowcaseLocation: season.assets.winnersShowcaseLocation,
  highlightsPosterImageSrc: season.assets.highlightsPosterImageSrc,
  highlightsYear: season.assets.highlightsYear,
  highlightsBadgeLabel: `${season.assets.highlightsYear} Recap`,
  highlightsTitle: `Top Shop Awards ${season.assets.highlightsYear} Highlights`,
  highlightsVideoEmbedUrl: season.assets.highlightsVideoEmbedUrl,
  highlightsVideoShareUrl: season.assets.highlightsVideoShareUrl,
  openMessage: `Nominations are open through ${closeOnLabel}. Submit your ${season.seasonLabel} nominations now.`,
  closedMessage: `${closedMessagePrefix} ${closedMessageDate}. ${closedMessageSuffix}`,
} as const;
