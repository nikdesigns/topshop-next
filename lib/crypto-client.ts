export async function sha256Hex(input: string) {
  if (typeof window === 'undefined' || !window.crypto?.subtle) {
    return '';
  }

  const encoded = new TextEncoder().encode(input);
  const digest = await window.crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}
