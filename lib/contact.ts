export const CONTACT_PHONE_LABEL = '+1 (888) 820-8551';
export const CONTACT_PHONE_E164 = '+18888208551';
export const CONTACT_EMAIL = 'support@the145.com';
export const CONTACT_WEBSITE_URL = 'https://the145.com';

export const CONTACT_TEL_HREF = `tel:${CONTACT_PHONE_E164}`;
export const CONTACT_MAILTO_HREF = `mailto:${CONTACT_EMAIL}`;

function normalizeBasePath(value: string | undefined) {
  if (!value) {
    return '';
  }

  const trimmed = value.trim();
  if (!trimmed || trimmed === '/') {
    return '';
  }

  const withoutTrailingSlash = trimmed.replace(/\/+$/, '');
  return withoutTrailingSlash.startsWith('/')
    ? withoutTrailingSlash
    : `/${withoutTrailingSlash}`;
}

const publicBasePath = normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH);
export const CONTACT_FORM_ENDPOINT = `${publicBasePath}/sendContact.php`;

export function buildMailtoLink({
  subject,
  body,
}: {
  subject: string;
  body?: string;
}) {
  const params = new URLSearchParams();
  params.set('subject', subject);

  if (body) {
    params.set('body', body);
  }

  return `${CONTACT_MAILTO_HREF}?${params.toString()}`;
}
