export type LegacyAliasConfig = {
  target: string;
  title: string;
  description: string;
  badge?: string;
};

export const LEGACY_ALIAS_MAP: Record<string, LegacyAliasConfig> = {
  'FAQs.html': {
    target: '/faqs.html',
    title: 'FAQs',
    description: 'This legacy page URL now points to the current FAQs page.',
  },
  'SubmitNomination.html': {
    target: '/submit_nomination.html',
    title: 'Submit Nomination',
    description: 'This legacy page URL now points to the current nomination submission page.',
  },
  'SubmitNomination15.html': {
    target: '/submit_nomination.html',
    title: 'Submit Nomination',
    description: 'This legacy page URL now points to the current nomination submission page.',
  },
  '2020-topshop-winners.html': {
    target: '/topshop-2020-winners.html',
    title: '2020 Winners',
    description: 'This archived winners URL now points to the migrated 2020 winners page.',
    badge: 'Archive Alias',
  },
  '2020-topshop.html': {
    target: '/topshop-2020-winners.html',
    title: '2020 Awards Archive',
    description: 'This archived awards URL now points to the migrated 2020 winners page.',
    badge: 'Archive Alias',
  },
  'TS.html': {
    target: '/topshop-2020-winners.html',
    title: 'Top Shop Archive',
    description: 'This archived URL now points to the migrated 2020 winners page.',
    badge: 'Archive Alias',
  },
  '_topshop_2023_finalist.html': {
    target: '/topshop_2023_finalist.html',
    title: '2023 Finalists',
    description: 'This legacy finalist URL now points to the migrated 2023 finalists page.',
  },
  'topshop_2021_winners.html': {
    target: '/topshop-2021-winners_new.html',
    title: '2021 Winners',
    description: 'This legacy winners URL now points to the migrated 2021 winners page.',
  },
  'home.html': {
    target: '/',
    title: 'Homepage',
    description: 'This legacy home URL now points to the site homepage.',
  },
  'cap-upload.html': {
    target: '/',
    title: 'Archive Utility',
    description: 'This archived utility page is no longer active and now points to homepage.',
    badge: 'Retired Page',
  },
  'certificates.html': {
    target: '/',
    title: 'Archive Utility',
    description: 'This archived utility page is no longer active and now points to homepage.',
    badge: 'Retired Page',
  },
};

export const LEGACY_ALIAS_SLUGS = Object.keys(LEGACY_ALIAS_MAP);
