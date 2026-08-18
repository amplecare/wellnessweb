import type { Metadata } from 'next';
import { Icon } from '@/components/Icons';
import { Container, Section } from '@/components/ui/Section';
import { LoginForm } from './LoginForm';

/**
 * Rendered per request, never prerendered.
 *
 * This page is behind authentication and reads live data, so a build-time snapshot
 * would be both wrong and impossible — the build has no signed-in user. Next 16
 * tries to prerender it by default, which fails on the database connection. Locally
 * that was hidden because .env.local supplied DATABASE_URL and the build happily
 * baked a page nobody should ever be served.
 */
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin sign in',
  // Never let the login page into an index — it is not a public page.
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const query = await searchParams;
  const requested = typeof query.next === 'string' ? query.next : '';
  // Validated again in the server action — this is only to prefill the field.
  const next = requested.startsWith('/admin') ? requested : '/admin';

  return (
    <Section tone="warm" className="flex min-h-svh items-center">
      <Container width="narrow">
        <div className="mx-auto w-full max-w-md">
          <div className="rounded-lg border border-line bg-white p-7 shadow-[0_24px_60px_-32px_rgba(42,16,48,0.4)] sm:p-9">
            <span
              aria-hidden="true"
              className="flex size-12 items-center justify-center rounded-2xl bg-violet-600 text-white"
            >
              <Icon name="lock" className="size-5" />
            </span>

            <h1 className="mt-6 text-display-lg text-ink">Admin sign in</h1>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-soft">
              This area holds staff wellbeing data. Sign in to continue.
            </p>

            <div className="mt-8">
              <LoginForm next={next} />
            </div>
          </div>

          <p className="mt-6 text-center text-[0.8125rem] leading-relaxed text-ink-muted">
            Sessions expire after 8 hours. If you cannot get in, the password can be reset by
            whoever manages the site&nbsp;deployment.
          </p>
        </div>
      </Container>
    </Section>
  );
}
