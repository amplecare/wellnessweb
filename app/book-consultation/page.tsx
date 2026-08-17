import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ConsultationForm } from '@/components/forms/ConsultationForm';
import { Icon, type IconName } from '@/components/Icons';
import { BreadcrumbSchema } from '@/components/layout/PageHeader';
import { FaqBlock } from '@/components/seo/ConversionKit';
import { metadataFor } from '@/components/seo/LandingPage';
import { Card } from '@/components/ui/Card';
import { Container, Eyebrow, Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { site } from '@/content/site';

export const metadata: Metadata = metadataFor('/book-consultation');

/**
 * The single conversion destination. Every CTA on the site lands here.
 *
 * The job of this page is to remove risk, not to sell — the visitor has already
 * decided to talk to someone. So it answers the only questions left: how long will
 * this take, what will you ask me, and what happens afterwards. No countdown timers,
 * no scarcity language, nothing that would feel manipulative to a manager who is
 * dealing with a genuinely difficult workforce situation.
 */
const whatHappens: { title: string; body: string; icon: IconName }[] = [
  {
    icon: 'phone',
    title: 'A 20–30 minute conversation',
    body: 'By phone or video, whichever suits. We work around shift patterns and handovers — evenings and early mornings are fine.',
  },
  {
    icon: 'clipboard',
    title: 'We ask about your workforce',
    body: 'What you are seeing, what you have already tried, and where the pressure sits. Nothing you need to prepare for in advance.',
  },
  {
    icon: 'compass',
    title: 'We tell you what we would look at',
    body: 'Which of your questions an assessment could actually answer, and which it could not. Sometimes the honest answer is that you do not need us yet.',
  },
  {
    icon: 'check',
    title: 'You decide, in your own time',
    body: 'If it fits, we send a written proposal based on your staff numbers. If it does not, we say so. There is no follow-up sequence.',
  },
];

const faqs = [
  {
    question: 'Is the consultation really free?',
    answer:
      'Yes. There is no charge and no obligation to proceed. It exists because we would rather understand your situation before quoting than sell you a package that does not fit.',
  },
  {
    question: 'Who should be on the call?',
    answer:
      'Whoever knows the workforce picture best — often a registered manager, operations director or HR lead. One person is enough; you do not need to assemble a group.',
  },
  {
    question: 'What if we are not ready to commit to anything?',
    answer:
      'That is a perfectly normal outcome and it does not waste our time. Plenty of providers use the conversation to work out what they are actually dealing with, then come back months later, or not at all.',
  },
  {
    question: 'How much does the work cost if we go ahead?',
    answer:
      'Assessments start from £35 per staff member, and the final figure depends on workforce size and what you need. You get a written quote after the consultation — never a price decided on the call under pressure.',
  },
  {
    question: 'Do you need access to our staff data before the call?',
    answer:
      'No. The consultation is a conversation, not a data exercise. Nothing is shared until there is a signed agreement setting out how staff information is handled.',
  },
  {
    question: 'How quickly can we speak to someone?',
    answer:
      'We aim to respond to every request within one working day and to offer a slot within the same week.',
  },
];

export default function BookConsultationPage() {
  return (
    <>
      <Section tone="paper" size="default" className="overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-40 -top-56 size-[40rem] rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute -right-32 top-0 size-[30rem] rounded-full bg-mint-400/10 blur-3xl" />
        </div>
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-lumen-muted">
            <Link href="/" className="link-draw font-medium text-mint-300">
              Home
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span>Book a consultation</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div>
              <Eyebrow>Free consultation</Eyebrow>
              <h1 className="mt-6 text-display-2xl text-lumen">
                Let&rsquo;s talk about{' '}
                <span className="text-aurora text-mint-300">your workforce</span>.
              </h1>
              <p className="mt-7 text-lead text-lumen-soft">
                A short, straightforward conversation about what your team is dealing with — what
                you are seeing, what you have already tried, and whether we can help.
              </p>

              <ul className="mt-9 flex flex-col gap-3">
                {[
                  '20–30 minutes, by phone or video',
                  'No obligation and no sales script',
                  'We work around shifts and handovers',
                  'A written quote afterwards, never a price on the call',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[0.9375rem] text-lumen-soft"
                  >
                    <Icon name="check" className="mt-1 size-4 shrink-0 text-mint-300" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-9 rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <p className="text-[0.9375rem] leading-relaxed text-lumen-soft">
                  Prefer to speak to someone now?
                </p>
                <p className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2">
                  <a
                    href={`tel:${site.phone.replace(/\s/g, '')}`}
                    data-analytics="phone-click"
                    className="link-draw text-[1.0625rem] font-semibold text-lumen"
                  >
                    {site.phoneDisplay}
                  </a>
                  <a
                    href={`mailto:${site.email}`}
                    data-analytics="email-click"
                    className="link-draw text-[1.0625rem] font-semibold text-lumen"
                  >
                    {site.email}
                  </a>
                </p>
              </div>
            </div>

            <Reveal>
              <Card className="p-6 sm:p-8" tone="paper">
                <h2 className="text-display-md text-lumen">Request your consultation</h2>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-lumen-soft">
                  Six short questions. Nothing that feels like a compliance form.
                </p>
                {/* The form reads ?tier= from the URL via useSearchParams, which
 opts it out of prerendering unless it sits behind a Suspense
 boundary. The fallback keeps the card from collapsing. */}
                <div className="mt-6">
                  <Suspense
                    fallback={<p className="text-sm text-lumen-muted">Loading the form&hellip;</p>}
                  >
                    <ConsultationForm />
                  </Suspense>
                </div>
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="warm" labelledBy="what-happens">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>What actually happens</Eyebrow>
            <h2 id="what-happens" className="mt-6 text-display-xl text-lumen">
              No mystery, no pressure
            </h2>
            <p className="mt-5 text-lead text-lumen-soft">
              You should know exactly what you are agreeing to before you fill in a form.
            </p>
          </div>

          <ol className="mt-12 grid gap-4 md:grid-cols-2">
            {whatHappens.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 60}>
                  <div className="flex h-full gap-5 rounded-lg border border-white/10 bg-white/[0.06] p-6">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-lumen">
                      <Icon name={step.icon} className="size-5" aria-hidden />
                    </span>
                    <div>
                      <span
                        aria-hidden="true"
                        className="text-xs font-semibold uppercase tracking-[0.12em] text-lumen-muted"
                      >
                        Step {i + 1}
                      </span>
                      <h3 className="mt-1 text-display-md text-lumen">{step.title}</h3>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-lumen-soft">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <FaqBlock
        heading="Before you book"
        lead="The questions providers ask us most often."
        items={faqs}
      />

      <BreadcrumbSchema
        siteUrl={site.url}
        items={[{ name: 'Book a consultation', path: '/book-consultation' }]}
      />
    </>
  );
}
