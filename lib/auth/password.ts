import { scryptSync, timingSafeEqual } from 'node:crypto';

/**
 * Password verification. Node runtime only — never import this into middleware.
 *
 * The password is stored as an scrypt hash in `ADMIN_PASSWORD_HASH`, not in the
 * repository and not in plaintext. scrypt is memory-hard, so a leaked hash is
 * expensive to attack offline in a way a bare SHA-256 would not be.
 *
 * Format: scrypt:N:r:p:saltB64Url:hashB64Url
 * Generate with: node scripts/set-admin-password.mjs
 *
 * The separator is a colon, NOT a dollar sign, even though `$` is the conventional
 * scrypt/PHC delimiter. Next.js passes .env values through dotenv variable expansion,
 * which reads `$16384` as a variable reference and silently deletes it — turning the
 * hash into an unparseable fragment and making every login fail with no useful error.
 * Colon is outside the base64url alphabet, so it cannot collide with the salt or digest.
 */
export function verifyPassword(password: string, stored: string | undefined): boolean {
  if (!stored) return false;

  const parts = stored.split(':');
  if (parts.length !== 6 || parts[0] !== 'scrypt') return false;

  const [, nRaw, rRaw, pRaw, saltRaw, hashRaw] = parts;
  const N = Number(nRaw);
  const r = Number(rRaw);
  const p = Number(pRaw);
  if (!Number.isFinite(N) || !Number.isFinite(r) || !Number.isFinite(p)) return false;

  try {
    const salt = Buffer.from(saltRaw, 'base64url');
    const expected = Buffer.from(hashRaw, 'base64url');

    const actual = scryptSync(password, salt, expected.length, {
      N,
      r,
      p,
      // 128 * N * r is scrypt's working set; the default 32MB cap is too low for N=16384.
      maxmem: 256 * N * r,
    });

    // Constant-time: a plain === would leak how many leading bytes matched.
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

/**
 * Email comparison, case-insensitive and constant-time.
 *
 * Comparing the email in constant time too means a wrong address and a wrong
 * password take the same time to reject, so the response cannot be used to
 * confirm which addresses exist.
 */
export function verifyEmail(email: string, expected: string | undefined): boolean {
  if (!expected) return false;
  const a = Buffer.from(email.trim().toLowerCase());
  const b = Buffer.from(expected.trim().toLowerCase());
  return a.length === b.length && timingSafeEqual(a, b);
}
