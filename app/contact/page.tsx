import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Icon, type IconName } from '@/components/Icons';
import { ConsultationForm } from '@/components/forms/ConsultationForm';
import { BreadcrumbSchema, PageHeader } from '@/components/layout/PageHeader';
import { Container, Section } from '@/components/ui/Section';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Book a Free Wellbeing Consultation for Your Care Team',
  description:
    'Book a free, no-obligation 30-minute wellbeing consultation for your care home, nursing home or domiciliary care service. Short form, no sales pressure.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Book a Free Wellbeing Consultation | Ample Care Ltd',
    description:
      'A free, no-obligation 30-minute conversation about your team’s wellbeing. No sales pressure.',
    url: `${site.url}/contact`,
  },
};

const expectations: readonly { icon: IconName; title: string; body: string }[] = [
  {
    icon: 'clock',
    title: '30 minutes, at a time that suits your rota',
    body: 'Including early mornings and evenings — we know a management day rarely stays where you put it.',
  },
  {
    icon: 'users',
    title: 'A conversation, not a pitch',
    body: 'We ask what is happening with your team, what you have already tried, and what has not worked.',
  },
  {
    icon: 'compass',
    title: 'An honest view of whether we can help',
    body: 'If a wellbeing programme is not the right answer for your situation, we will tell you that.',
  },
  {
    icon: 'chart',
    title: 'A clear written proposal if you want one',
    body: 'Fixed price, defined scope, defined timescale. No obligation, and no follow-up sales pressure.',
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        breadcrumb="Contact"
        title="Book Your Free Wellbeing Consultation"
        lead="Six short questions. We will come back to you within one working day to arrange a 30-minute call at a time that fits around your shifts."
      />

      <Section tone="paper" labelledBy="contact-form-heading">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <h2 id="contact-form-heading" className="text-display-lg">
                Tell us about your organisation
              </h2>
              <p className="mt-3 text-[0.9375rem] text-lumen-soft">
                Fields marked <span aria-hidden="true">*</span>
                <span className="sr-only">with an asterisk</span> are required.
              </p>

              <div className="mt-9">
                <Suspense
                  fallback={
                    <div className="h-[36rem] animate-pulse rounded-lg border border-white/10 bg-white/[0.04]" />
                  }
                >
                  <ConsultationForm />
                </Suspense>
              </div>
            </div>

            <aside className="lg:pt-2">
              <div className="rounded-lg border border-violet-400/25 bg-white/[0.06] p-6 sm:p-8">
                <h2 className="text-display-md">What happens next</h2>
                <ul className="mt-6 flex flex-col gap-5">
                  {expectations.map((item) => (
                    <li key={item.title} className="flex items-start gap-3.5">
                      <span
                        aria-hidden="true"
                        className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-mint-300 shadow-glass-sm"
                      >
                        <Icon name={item.icon} className="size-4.5" />
                      </span>
                      <div>
                        <h3 className="text-[0.9375rem] font-semibold leading-snug text-lumen">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-[0.875rem] leading-relaxed text-lumen-soft">
                          {item.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-glass-sm sm:p-8">
                <h2 className="text-display-md">Prefer to talk or email?</h2>
                <ul className="mt-5 flex flex-col gap-4">
                  <li>
                    <a
                      href={`tel:${site.phone.replace(/\s/g, '')}`}
                      className="group flex min-h-11 items-center gap-3.5"
                    >
                      <span
                        aria-hidden="true"
                        className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-mint-300 transition-colors group-hover:bg-violet-600 group-hover:text-white"
                      >
                        <Icon name="phone" className="size-4.5" />
                      </span>
                      <span>
                        <span className="block text-[0.75rem] uppercase tracking-[0.08em] text-lumen-muted">
                          Call us
                        </span>
                        <span className="nums block font-semibold text-lumen">
                          {site.phoneDisplay}
                        </span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="group flex min-h-11 items-center gap-3.5"
                    >
                      <span
                        aria-hidden="true"
                        className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-mint-400/10 text-mint-300 transition-colors group-hover:bg-mint-500 group-hover:text-ink"
                      >
                        <Icon name="mail" className="size-4.5" />
                      </span>
                      <span>
                        <span className="block text-[0.75rem] uppercase tracking-[0.08em] text-lumen-muted">
                          Email us
                        </span>
                        <span className="block break-all font-semibold text-lumen">
                          {site.email}
                        </span>
                      </span>
                    </a>
                  </li>
                </ul>

                <p className="mt-6 border-t border-white/10 pt-5 text-[0.8125rem] leading-relaxed text-lumen-muted">
                  We work with providers across {site.areaServed}. Consultations are held by phone
                  or video; site visits are arranged as part of a programme.
                </p>
              </div>

              <p className="mt-6 rounded-md border border-violet-400/25 bg-white/[0.06] p-5 text-[0.8125rem] leading-relaxed text-lumen-soft">
                <strong className="font-semibold text-lumen">If someone needs help now.</strong>{' '}
                Ample Care does not provide clinical treatment or crisis support. If you or a
                colleague need urgent help, speak to your GP, call NHS 111, contact Samaritans free
                on 116 123, or call 999 in an emergency.
              </p>
            </aside>
          </div>
        </Container>
      </Section>

      <BreadcrumbSchema siteUrl={site.url} items={[{ name: 'Contact', path: '/contact' }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Book a free wellbeing consultation',
            url: `${site.url}/contact`,
            about: { '@id': `${site.url}/#organisation` },
          }),
        }}
      />
    </>
  );
}
