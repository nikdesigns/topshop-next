import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { FinalistCard } from '@/lib/parse-finalists-cards';
import { parseFinalistsCardsHtml } from '@/lib/parse-finalists-cards';
import type { WinnerCard } from '@/lib/parse-winners-cards';
import { parseWinnersCardsHtml } from '@/lib/parse-winners-cards';

function readDataFile(fileName: string) {
  return readFileSync(join(process.cwd(), 'data', fileName), 'utf8');
}

export function loadFinalistsCards(fileName: string): FinalistCard[] {
  return parseFinalistsCardsHtml(readDataFile(fileName));
}

export function loadWinnersCards(fileName: string): WinnerCard[] {
  return parseWinnersCardsHtml(readDataFile(fileName));
}
