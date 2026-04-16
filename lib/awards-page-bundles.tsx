import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { FinalistsPageTemplate } from '@/components/finalists-page-template';
import { WinnersPageTemplate } from '@/components/winners-page-template';
import { FINALISTS_PAGE_CONFIG, type FinalistsPageYear } from '@/data/finalists-pages';
import { WINNERS_PAGE_CONFIG, type WinnersPageYear } from '@/data/winners-pages';
import { loadFinalistsCards, loadWinnersCards } from '@/lib/award-cards-loader';
import { buildAwardsMetadata } from '@/lib/awards-metadata';

function getWinnersTemplateCommon(year: WinnersPageYear) {
  const config = WINNERS_PAGE_CONFIG[year];
  return {
    config,
    logo: 'logo' in config ? config.logo : undefined,
    singleIntroColumn: 'singleIntroColumn' in config ? config.singleIntroColumn : undefined,
  };
}

function getFinalistsTemplateCommon(year: FinalistsPageYear) {
  const config = FINALISTS_PAGE_CONFIG[year];
  return {
    config,
    logo: 'logo' in config ? config.logo : undefined,
    singleIntroColumn: 'singleIntroColumn' in config ? config.singleIntroColumn : undefined,
  };
}

export function getWinnersMetadata(year: WinnersPageYear): Metadata {
  const { config } = getWinnersTemplateCommon(year);
  return buildAwardsMetadata({
    year: config.year,
    kind: 'Winners',
    description: config.description,
    canonicalPath: config.canonicalPath,
  });
}

export function getFinalistsMetadata(year: FinalistsPageYear): Metadata {
  const { config } = getFinalistsTemplateCommon(year);
  return buildAwardsMetadata({
    year: config.year,
    kind: 'Finalists',
    description: config.description,
    canonicalPath: config.canonicalPath,
  });
}

export function getWinnersPage(year: WinnersPageYear): ReactElement {
  const { config, logo, singleIntroColumn } = getWinnersTemplateCommon(year);

  if (config.variant === 'legacy') {
    const cards = loadWinnersCards(config.cardsFile);
    return (
      <WinnersPageTemplate
        variant="legacy"
        year={config.year}
        titleImageSrc={config.titleImageSrc}
        introContent={config.introContent}
        logo={logo}
        singleIntroColumn={singleIntroColumn}
        cards={cards}
      />
    );
  }

  return (
    <WinnersPageTemplate
      variant="split"
      year={config.year}
      titleImageSrc={config.titleImageSrc}
      introContent={config.introContent}
      logo={logo}
      singleIntroColumn={singleIntroColumn}
      cards={config.cards}
    />
  );
}

export function getFinalistsPage(year: FinalistsPageYear): ReactElement {
  const { config, logo, singleIntroColumn } = getFinalistsTemplateCommon(year);
  const cards = loadFinalistsCards(config.cardsFile);

  return (
    <FinalistsPageTemplate
      year={config.year}
      titleImageSrc={config.titleImageSrc}
      introContent={config.introContent}
      logo={logo}
      singleIntroColumn={singleIntroColumn}
      cards={cards}
    />
  );
}
