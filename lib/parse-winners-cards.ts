export type WinnerEntry = {
  name: string;
  imageSrc?: string;
  imageAlt?: string;
  details?: string;
};

export type WinnerCard = {
  category: string;
  winners: WinnerEntry[];
};

function decodeEntities(value: string) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

function cleanText(value: string) {
  return decodeEntities(value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

function getAttributeValue(tagHtml: string, attributeName: string) {
  const match = tagHtml.match(new RegExp(`${attributeName}\\s*=\\s*["']([^"']+)["']`, 'i'));
  return match ? decodeEntities(match[1].trim()) : '';
}

function normalizeImageSrc(rawSrc: string) {
  const src = rawSrc.trim();
  if (!src) {
    return '';
  }

  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return src;
  }

  if (src.startsWith('./')) {
    return `/${src.slice(2)}`;
  }

  if (src.startsWith('../')) {
    return `/${src.replace(/^(\.\.\/)+/, '')}`;
  }

  if (src.startsWith('/')) {
    return src;
  }

  return `/${src}`;
}

function parseWinnerEntry(itemHtml: string): WinnerEntry | null {
  const imageTag = itemHtml.match(/<img[^>]*>/i)?.[0] ?? '';
  const imageSrcRaw = imageTag ? getAttributeValue(imageTag, 'src') : '';
  const imageAltRaw = imageTag ? getAttributeValue(imageTag, 'alt') : '';

  const titleMatch =
    itemHtml.match(/<h6[^>]*>([\s\S]*?)<\/h6>/i) ??
    itemHtml.match(/<h5[^>]*>([\s\S]*?)<\/h5>/i) ??
    itemHtml.match(/<h4[^>]*>([\s\S]*?)<\/h4>/i);

  let name = titleMatch ? cleanText(titleMatch[1]) : cleanText(itemHtml);
  if (!name && imageAltRaw) {
    name = imageAltRaw;
  }

  if (!name) {
    return null;
  }

  const imageSrc = normalizeImageSrc(imageSrcRaw);
  const imageAlt = imageAltRaw || name;

  return {
    name,
    imageSrc: imageSrc || undefined,
    imageAlt: imageAlt || undefined,
  };
}

function mergeByCategory(cards: WinnerCard[]) {
  const map = new Map<string, WinnerEntry[]>();

  for (const card of cards) {
    const existing = map.get(card.category) ?? [];
    const merged = [...existing];

    for (const winner of card.winners) {
      const duplicate = merged.some(
        (item) => item.name === winner.name && (item.imageSrc ?? '') === (winner.imageSrc ?? ''),
      );
      if (!duplicate) {
        merged.push(winner);
      }
    }

    map.set(card.category, merged);
  }

  return Array.from(map.entries()).map(([category, winners]) => ({
    category,
    winners,
  }));
}

function parseCardLayout(html: string): WinnerCard[] {
  const cards: WinnerCard[] = [];
  const cardRegex =
    /<div class="card"[^>]*>\s*<div class="card-header[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<div class="card-body"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/gi;

  for (const match of html.matchAll(cardRegex)) {
    const category = cleanText(match[1]);
    const body = match[2];
    const winners: WinnerEntry[] = [];

    for (const itemMatch of body.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)) {
      const entry = parseWinnerEntry(itemMatch[1]);
      if (entry) {
        winners.push(entry);
      }
    }

    if (!winners.length) {
      const fallbackName = cleanText(body);
      if (fallbackName) {
        winners.push({ name: fallbackName });
      }
    }

    if (category && winners.length) {
      cards.push({ category, winners });
    }
  }

  return cards;
}

function parseFeatureLayout(html: string): WinnerCard[] {
  const cards: WinnerCard[] = [];
  const featureRegex = /<div class="feature-item"[^>]*>([\s\S]*?)<\/div>\s*<!-- \/\.feature-item -->/gi;

  for (const match of html.matchAll(featureRegex)) {
    const featureHtml = match[1];
    const category = cleanText(featureHtml.match(/<div class="card-header[^"]*"[^>]*>([\s\S]*?)<\/div>/i)?.[1] ?? '');
    const name = cleanText(featureHtml.match(/<h4 class="feature__title"[^>]*>([\s\S]*?)<\/h4>/i)?.[1] ?? '');
    const details = cleanText(
      featureHtml.match(/<p class="feature__desc"[^>]*>([\s\S]*?)<\/p>/i)?.[1] ?? '',
    );
    const imageTag = featureHtml.match(/<img[^>]*>/i)?.[0] ?? '';
    const imageSrcRaw = imageTag ? getAttributeValue(imageTag, 'src') : '';
    const imageAltRaw = imageTag ? getAttributeValue(imageTag, 'alt') : '';
    const imageSrc = normalizeImageSrc(imageSrcRaw);

    if (!category || !name) {
      continue;
    }

    cards.push({
      category,
      winners: [
        {
          name,
          imageSrc: imageSrc || undefined,
          imageAlt: imageAltRaw || name,
          details: details || undefined,
        },
      ],
    });
  }

  return cards;
}

export function parseWinnersCardsHtml(html: string): WinnerCard[] {
  const cards = [...parseCardLayout(html), ...parseFeatureLayout(html)];
  return mergeByCategory(cards);
}
