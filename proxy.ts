import { NextResponse, type NextRequest } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth/session';

/**
 * Route guard for the admin area.
 *
 * Named `proxy` in `proxy.ts`: Next 16 renamed the middleware file convention.
 * The behaviour is unchanged — it still runs before any admin page renders.
 *
 * Runs before any admin page renders, so an unauthenticated request never reaches the
 * dashboard code or its data. This is the enforcement point — do not rely on hiding
 * links in the UI, which stops nobody who can type a URL.
 *
 * Uses Web Crypto (see lib/auth/session.ts) because middleware runs on the Edge
 * runtime where node:crypto does not exist.
 */
export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);

  // Already signed in and heading for the login page — send them to the dashboard.
  if (pathname === '/admin/login') {
    if (session) return NextResponse.redirect(new URL('/admin', request.url));
    return NextResponse.next();
  }

  if (!session) {
    const loginUrl = new URL('/admin/login', request.url);
    // Remember where they were going so login can return them there.
    loginUrl.searchParams.set('next', `${pathname}${search}`);

    const response = NextResponse.redirect(loginUrl);
    // Clear an expired or tampered cookie so the browser stops resending it.
    response.cookies.delete(SESSION_COOKIE);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  // Everything under /admin, including /admin itself. The login page is handled
  // above rather than excluded here, so that signed-in users get redirected off it.
  matcher: ['/admin', '/admin/:path*'],
};
