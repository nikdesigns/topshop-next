import { WINNERS_SHOWCASE_BY_YEAR } from '@/data/winners-showcase';
import { FINALISTS_PAGE_CONFIG } from '@/data/finalists-pages';
import { WINNERS_PAGE_CONFIG } from '@/data/winners-pages';
import { loadFinalistsCards, loadWinnersCards } from '@/lib/award-cards-loader';

function normalizeCompanyName(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function buildNominationCompanySuggestions() {
  const companiesByKey = new Map<string, string>();

  const addCompany = (name: string) => {
    const normalized = normalizeCompanyName(name);
    if (!normalized) {
      return;
    }

    const key = normalized.toLowerCase();
    if (!companiesByKey.has(key)) {
      companiesByKey.set(key, normalized);
    }
  };

  for (const winnerConfig of Object.values(WINNERS_PAGE_CONFIG)) {
    if (winnerConfig.variant === 'split') {
      for (const card of winnerConfig.cards) {
        for (const winner of card.winners ?? []) {
          addCompany(winner);
        }

        for (const winner of card.multiEntity ?? []) {
          addCompany(winner);
        }

        for (const winner of card.singleEntity ?? []) {
          addCompany(winner);
        }
      }
      continue;
    }

    const cards = loadWinnersCards(winnerConfig.cardsFile);
    for (const card of cards) {
      for (const winner of card.winners) {
        addCompany(winner.name);
      }
    }
  }

  for (const finalistConfig of Object.values(FINALISTS_PAGE_CONFIG)) {
    const cards = loadFinalistsCards(finalistConfig.cardsFile);

    for (const card of cards) {
      for (const finalist of card.finalists ?? []) {
        addCompany(finalist);
      }

      for (const finalist of card.multiEntity ?? []) {
        addCompany(finalist);
      }

      for (const finalist of card.singleEntity ?? []) {
        addCompany(finalist);
      }
    }
  }

  for (const seeds of Object.values(WINNERS_SHOWCASE_BY_YEAR)) {
    for (const seed of seeds) {
      addCompany(seed.company);
    }
  }

  return Array.from(companiesByKey.values()).sort((a, b) => a.localeCompare(b));
}

export const NOMINATION_COMPANY_SUGGESTIONS = buildNominationCompanySuggestions();
