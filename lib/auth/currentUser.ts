import { cookies } from 'next/headers';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth/session';

/**
 * The signed-in user, for attributing audit trail entries.
 *
 * This is *not* the access check — middleware already guarantees a valid session
 * before any admin page or action runs. This only answers "whose name goes on this
 * note", and returns a safe fallback rather than throwing, so a workflow action can
 * never fail purely because a name could not be resolved.
 */
export async function currentUserEmail(): Promise<string | null> {
  const store = await cookies();
  const session = await verifySessionToken(store.get(SESSION_COOKIE)?.value);
  return session?.email ?? null;
}

/**
 * A human-readable actor name.
 *
 * There is one shared admin account today, so this derives a name from the email
 * local part. Once there is a real user table, read the display name from it —
 * an audit trail that says "Amplecareai" for every action is only acceptable while
 * there is genuinely one login. See PLACEHOLDERS.md §1b.
 */
export async function currentActorName(): Promise<string> {
  const email = await currentUserEmail();
  if (!email) return 'Admin';

  const local = email.split('@')[0] ?? 'Admin';
  return local
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
