export type FinalistCard = {
  category: string;
  multiEntity?: string[];
  singleEntity?: string[];
  finalists?: string[];
};

function decodeEntities(value: string) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
}

function cleanText(value: string) {
  return decodeEntities(value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

function extractListItems(listHtml: string) {
  return Array.from(listHtml.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi))
    .map((item) => cleanText(item[1]))
    .filter(Boolean);
}

export function parseFinalistsCardsHtml(html: string): FinalistCard[] {
  const cards: FinalistCard[] = [];
  const cardRegex =
    /<div class="card">\s*<div class="card-header">([\s\S]*?)<\/div>\s*<div class="card-body">([\s\S]*?)<\/div>\s*<\/div>/gi;

  for (const match of html.matchAll(cardRegex)) {
    const category = cleanText(match[1]);
    const body = match[2];
    const groups = Array.from(
      body.matchAll(/<h6[^>]*>([\s\S]*?)<\/h6>\s*<ul[^>]*>([\s\S]*?)<\/ul>/gi),
    );

    const card: FinalistCard = { category };

    if (groups.length > 0) {
      for (const group of groups) {
        const title = cleanText(group[1]).toLowerCase();
        const values = extractListItems(group[2]);

        if (!values.length) {
          continue;
        }

        if (title.includes('multi-entity')) {
          card.multiEntity = values;
          continue;
        }

        if (title.includes('single entity')) {
          card.singleEntity = values;
          continue;
        }

        card.finalists = [...(card.finalists ?? []), ...values];
      }
    } else {
      const listMatch = body.match(/<ul[^>]*>([\s\S]*?)<\/ul>/i);
      if (listMatch) {
        const values = extractListItems(listMatch[1]);
        if (values.length) {
          card.finalists = values;
        }
      }
    }

    if (category) {
      cards.push(card);
    }
  }

  return cards;
}
