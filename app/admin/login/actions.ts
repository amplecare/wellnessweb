'use server';

import { cookies } from 'next/headers';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyEmail, verifyPassword } from '@/lib/auth/password';
import { SESSION_COOKIE, SESSION_MAX_AGE_SECONDS, createSessionToken } from '@/lib/auth/session';

export interface LoginState {
  error?: string;
}

/**
 * Throttles repeated failures per IP so the login cannot be brute-forced.
 *
 * In-memory on purpose: this site is a single Node process, and adding Redis for one
 * admin account would be disproportionate. If the site is ever deployed serverless or
 * scaled to multiple instances, this map is per-instance and must move to shared
 * storage to remain effective.
 */
const attempts = new Map<string, { count: number; firstAt: number }>();

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const record = attempts.get(ip);

  if (!record || now - record.firstAt > WINDOW_MS) {
    attempts.set(ip, { count: 1, firstAt: now });
    return true;
  }

  record.count += 1;
  return record.count <= MAX_ATTEMPTS;
}

function clearLimit(ip: string) {
  attempts.delete(ip);
}

/** Only ever redirect somewhere inside /admin — otherwise `?next=` is an open redirect. */
function safeNext(value: FormDataEntryValue | null): string {
  const raw = typeof value === 'string' ? value : '';
  return raw.startsWith('/admin') && !raw.startsWith('/admin/login') ? raw : '/admin';
}

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const headerList = await headers();
  const ip =
    headerList.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headerList.get('x-real-ip') ||
    'local';

  if (!rateLimit(ip)) {
    return { error: 'Too many attempts. Wait 15 minutes and try again.' };
  }

  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');
  const destination = safeNext(formData.get('next'));

  if (!email || !password) {
    return { error: 'Enter both your email address and password.' };
  }

  const emailOk = verifyEmail(email, process.env.ADMIN_EMAIL);
  const passwordOk = verifyPassword(password, process.env.ADMIN_PASSWORD_HASH);

  // Both checks always run, and the message never says which one failed — otherwise
  // the form becomes an oracle for confirming the admin address.
  if (!emailOk || !passwordOk) {
    return { error: 'Those details were not recognised.' };
  }

  clearLimit(ip);

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, await createSessionToken(email.trim().toLowerCase()), {
    httpOnly: true, // Not readable by JavaScript, so XSS cannot steal the session.
    sameSite: 'lax', // Blocks the cookie on cross-site POSTs — CSRF protection.
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production.
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  redirect(destination);
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect('/admin/login');
}
