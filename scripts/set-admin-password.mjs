/**
 * Generates the admin credential environment lines.
 *
 * The password is read from stdin, never from argv, so it does not land in your
 * shell history or in the process list where other users on the machine could see it.
 *
 *   node scripts/set-admin-password.mjs
 *   (type the password, press Enter)
 *
 * Copy the printed lines into .env.local (which .gitignore already excludes).
 * Run this again any time you need to rotate the password.
 */
import { randomBytes, scryptSync } from 'node:crypto';
import { createInterface } from 'node:readline';

const SCRYPT = { N: 16384, r: 8, p: 1, keylen: 32 };

function hash(password) {
  const salt = randomBytes(16);
  const derived = scryptSync(password, salt, SCRYPT.keylen, {
    N: SCRYPT.N,
    r: SCRYPT.r,
    p: SCRYPT.p,
  });
  // Colon, not '$': Next.js expands `$NAME` in .env values, which would eat the
  // scrypt parameters and break every login. See lib/auth/password.ts.
  return [
    'scrypt',
    SCRYPT.N,
    SCRYPT.r,
    SCRYPT.p,
    salt.toString('base64url'),
    derived.toString('base64url'),
  ].join(':');
}

const rl = createInterface({ input: process.stdin, terminal: false });
const lines = [];
for await (const line of rl) lines.push(line);

const password = lines.join('\n').replace(/\r?\n$/, '');

if (!password) {
  console.error('No password received on stdin. Nothing written.');
  process.exit(1);
}

if (password.length < 12) {
  console.error(`Password is only ${password.length} characters. Use at least 12.`);
  process.exit(1);
}

console.log('');
console.log('# --- Paste into .env.local -------------------------------------------');
console.log(`ADMIN_PASSWORD_HASH=${hash(password)}`);
console.log(`AUTH_SECRET=${randomBytes(32).toString('base64url')}`);
console.log('# ----------------------------------------------------------------------');
console.log('');
console.log('AUTH_SECRET signs the session cookie. Changing it logs everyone out.');
