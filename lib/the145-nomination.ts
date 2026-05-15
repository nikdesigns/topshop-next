const THE145_BASE_URL = 'https://www.the145.com';

export type The145CompanySuggestion = {
  FacilityId: number | string;
  FacilityName: string;
  SelectCategory?: string;
};

export type The145CategoryRecord = {
  TopShopCategoryId: number | string | null;
  FacilityId?: number;
  FacilityName?: string;
};

export type NominationSubmitResult = {
  ok: boolean;
  raw: string;
};

function asArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

async function readJson<T>(url: string) {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    credentials: 'omit',
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} while requesting ${url}`);
  }

  return (await response.json()) as T;
}

function buildUrl(pathname: string, query: Record<string, string>) {
  const url = new URL(pathname, THE145_BASE_URL);
  Object.entries(query).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  return url.toString();
}

export async function fetchThe145CompanySuggestions(query: string) {
  const normalizedQuery = query.trim();
  if (!normalizedQuery || normalizedQuery.length < 3) {
    return [] as The145CompanySuggestion[];
  }

  const url = buildUrl('/AutoNomcomplete', { queryString: normalizedQuery });
  const payload = await readJson<unknown>(url);
  return asArray<The145CompanySuggestion>(payload).filter(
    (item) =>
      typeof item?.FacilityName === 'string' &&
      (typeof item?.FacilityId === 'number' || typeof item?.FacilityId === 'string'),
  );
}

export async function fetchThe145CategoriesByFacilityId(facilityId: string) {
  const normalizedId = facilityId.trim();
  if (!normalizedId) {
    return [] as The145CategoryRecord[];
  }

  const url = buildUrl('/getCategortDet', { queryString: normalizedId });
  const payload = await readJson<unknown>(url);
  return asArray<The145CategoryRecord>(payload);
}

export async function fetchThe145CategoriesByToken(token: string) {
  const normalizedToken = token.trim();
  if (!normalizedToken) {
    return [] as The145CategoryRecord[];
  }

  const url = buildUrl('/getCategortDetNew', { queryString: normalizedToken });
  const payload = await readJson<unknown>(url);
  return asArray<The145CategoryRecord>(payload);
}

export async function submitThe145NominationVote(payload: URLSearchParams) {
  const response = await fetch(`${THE145_BASE_URL}/addNewVote`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'omit',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: payload.toString(),
  });

  const raw = (await response.text()).trim();
  const normalized = raw.replace(/^"+|"+$/g, '').toLowerCase();

  const ok =
    response.ok &&
    (normalized === 'success' || normalized === 'mail sent' || normalized === 'ok');

  return { ok, raw } satisfies NominationSubmitResult;
}

export function encodeFacilityIdToken(facilityId: string) {
  const normalizedId = facilityId.trim();
  if (!normalizedId) {
    return '';
  }

  try {
    return window.btoa(normalizedId);
  } catch {
    return '';
  }
}

export async function fetchPublicIpAddress() {
  const response = await fetch('https://ipinfo.io/json', {
    method: 'GET',
    mode: 'cors',
    credentials: 'omit',
    cache: 'no-store',
  });

  if (!response.ok) {
    return '';
  }

  const payload = (await response.json()) as { ip?: string };
  return typeof payload?.ip === 'string' ? payload.ip.trim() : '';
}
