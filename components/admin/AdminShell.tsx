import Link from 'next/link';
import type { ReactNode } from 'react';
import { logout } from '@/app/admin/login/actions';
import type { UserRole } from '@/lib/admin/types';
import { cn } from '@/lib/cn';

/**
 * `internalOnly` items are hidden from company users, whose workspace is their own
 * organisation. Hiding a link is presentation only — the pages themselves enforce
 * the boundary, because a hidden link stops nobody who can type a URL.
 */
const navItems: { href: string; label: string; internalOnly?: boolean; adminOnly?: boolean }[] = [
  { href: '/admin', label: 'Today' },
  { href: '/admin/pipeline', label: 'Consultation pipeline', internalOnly: true },
  { href: '/admin/enquiries', label: 'Enquiry triage' },
  { href: '/admin/companies', label: 'Companies' },
  { href: '/admin/content', label: 'Site content', adminOnly: true },
];

export function AdminShell({
  title,
  description,
  role,
  companyId,
  children,
}: {
  title: string;
  description: string;
  role: UserRole;
  companyId?: string;
  children: ReactNode;
}) {
  const companyQuery = companyId ? `?company=${companyId}` : '';

  return (
    // Lumen mode. The marketing site is a dark aurora; the dashboard is not, because
    // staff work in it for hours and a dark UI across a full shift is a genuine
    // eye-strain problem rather than a style preference. Same tokens, light ground.
    <section className="lumen aurora-lumen min-h-svh py-10 text-ink sm:py-12">
      <div className="mx-auto grid w-[min(1280px,94vw)] gap-6 lg:grid-cols-[264px_minmax(0,1fr)]">
        <aside className="glass-lumen h-fit rounded-lg p-5 lg:sticky lg:top-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Ample Care CRM
          </p>
          <h2 className="mt-3 text-xl font-semibold text-ink">Today</h2>
          <p className="mt-2 text-sm text-ink-soft">What needs doing first.</p>

          <nav className="mt-5 space-y-1.5" aria-label="Admin navigation">
            {navItems
              .filter((item) => !(item.internalOnly && role === 'company_user'))
              .filter((item) => !(item.adminOnly && role !== 'admin'))
              .map((item) => {
                const href = `${item.href}${companyQuery}`;
                return (
                  <Link
                    key={item.href}
                    href={href}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition hover:bg-violet-50 hover:text-ink"
                  >
                    {item.label}
                  </Link>
                );
              })}
          </nav>

          {/* Signing out must be reachable from every admin page — a session you
 cannot end is a session left open on a shared office machine. */}
          <form action={logout} className="mt-6 border-t border-line pt-5">
            <button
              type="submit"
              className="w-full rounded-lg border border-line px-3 py-2.5 text-sm font-semibold text-ink-soft transition hover:border-violet-300 hover:bg-violet-50 hover:text-ink"
            >
              Sign out
            </button>
          </form>
        </aside>

        <div className="space-y-6">
          <header className="rounded-lg border border-line bg-white p-5 shadow-glass-sm sm:p-6">
            <h1 className="text-display-lg text-ink">{title}</h1>
            <p className="mt-2 max-w-3xl text-sm text-ink-soft">{description}</p>
          </header>
          {children}
        </div>
      </div>
    </section>
  );
}
