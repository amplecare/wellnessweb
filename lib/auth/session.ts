/**
 * Session token: a signed, expiring cookie value. No database required.
 *
 * Deliberately built on Web Crypto rather than `node:crypto` so the same code runs
 * in Next's middleware (Edge runtime), where `node:crypto` is unavailable. That lets
 * the route guard verify the session before a request ever reaches a page.
 *
 * The token is *signed*, not encrypted — its contents are readable by anyone holding
 * it. Never put anything secret in the payload. The signature is what makes it
 * unforgeable, and `AUTH_SECRET` is what makes the signature meaningful.
 */
const encoder = new TextEncoder();

export interface SessionPayload {
  /** Who the session belongs to. */
  email: string;
  /** Issued-at, epoch seconds. */
  iat: number;
  /** Expiry, epoch seconds. */
  exp: number;
}

/** How long a login lasts before it must be repeated. */
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8; // 8 hours — one working day.

export const SESSION_COOKIE = 'ac_admin_session';

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Returns Uint8Array<ArrayBuffer> rather than the default Uint8Array, because
// crypto.subtle only accepts a non-shared buffer and TypeScript enforces that.
function fromBase64Url(value: string): Uint8Array<ArrayBuffer> {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(padded.padEnd(Math.ceil(padded.length / 4) * 4, '='));
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function secret(): string {
  const value = process.env.AUTH_SECRET;
  if (!value || value.length < 32) {
    // Failing loudly beats silently signing every session with an empty string.
    throw new Error(
      'AUTH_SECRET is missing or too short (needs 32+ chars). Run: node scripts/set-admin-password.mjs'
    );
  }
  return value;
}

async function signingKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    encoder.encode(secret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export async function createSessionToken(email: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    email,
    iat: now,
    exp: now + SESSION_MAX_AGE_SECONDS,
  };

  const body = toBase64Url(encoder.encode(JSON.stringify(payload)));
  const signature = await crypto.subtle.sign('HMAC', await signingKey(), encoder.encode(body));

  return `${body}.${toBase64Url(new Uint8Array(signature))}`;
}

/**
 * Returns the payload only if the signature is valid AND the token has not expired.
 * Any malformed input returns null rather than throwing — a corrupt cookie should
 * log the visitor out, not produce a 500.
 */
export async function verifySessionToken(
  token: string | undefined
): Promise<SessionPayload | null> {
  if (!token) return null;

  const [body, signature] = token.split('.');
  if (!body || !signature) return null;

  try {
    // crypto.subtle.verify compares in constant time, so this does not leak the
    // signature byte-by-byte the way a plain === would.
    const valid = await crypto.subtle.verify(
      'HMAC',
      await signingKey(),
      fromBase64Url(signature),
      encoder.encode(body)
    );
    if (!valid) return null;

    const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(body))) as SessionPayload;
    if (typeof payload.exp !== 'number' || payload.exp < Math.floor(Date.now() / 1000)) return null;

    return payload;
  } catch {
    return null;
  }
}
