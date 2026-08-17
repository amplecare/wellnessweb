import Link from 'next/link';
import type { ReactNode } from 'react';
import { Icon } from '@/components/Icons';
import { ButtonLink } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Container, Eyebrow, Section, SectionHeading } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { BOOK_CTA, CONSULTATION_PATH, getSeoPage } from '@/content/seo/keywordMap';
import { getEvidence } from '@/content/seo/evidence';
import { cn } from '@/lib/cn';

/**
 * Shared conversion blocks used by every landing page.
 *
 * Centralised so the CTA wording, the booking destination and the FAQ schema shape
 * stay identical across thirty pages. When the booking journey changes, it changes
 * in one place rather than in thirty.
 */

/* ------------------------------------------------------------------ *
 * Call to action
 * ------------------------------------------------------------------ */

/**
 * The recurring CTA band.
 *
 * `tone` varies the visual weight so a page carrying four or five CTAs does not read
 * as the same shouting block repeated — the brief asks for multiple conversion
 * opportunities, but identical ones would look like a broken template.
 */
export function CtaBand({
  heading,
  body,
  label = BOOK_CTA,
  tone = 'dark',
  secondary,
}: {
  heading: ReactNode;
  body?: ReactNode;
  label?: string;
  tone?: 'dark' | 'soft' | 'inline';
  secondary?: { label: string; href: string };
}) {
  if (tone === 'inline') {
    return (
      <Reveal>
        <div className="my-10 flex flex-col gap-4 rounded-lg border border-violet-400/25 bg-white/[0.06] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="max-w-xl">
            <p className="text-display-md text-lumen">{heading}</p>
            {body ? (
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-lumen-soft">{body}</p>
            ) : null}
          </div>
          <ButtonLink href={CONSULTATION_PATH} size="md" withArrow className="shrink-0">
            {label}
          </ButtonLink>
        </div>
      </Reveal>
    );
  }

  if (tone === 'soft') {
    return (
      <Section tone="green-tint" size="compact">
        <Container>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-display-lg text-lumen">{heading}</h2>
              {body ? <p className="mt-3 text-lead text-lumen-soft">{body}</p> : null}
            </div>
            <ButtonLink href={CONSULTATION_PATH} size="lg" withArrow className="shrink-0">
              {label}
            </ButtonLink>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section tone="dark" size="default" className="overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0" />
      <div aria-hidden="true" className="absolute inset-0 text-lumen/[0.04]" />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-display-xl text-lumen">{heading}</h2>
          {body ? <p className="mt-5 text-lead text-lumen-soft">{body}</p> : null}
          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink href={CONSULTATION_PATH} variant="mint" size="lg" withArrow>
              {label}
            </ButtonLink>
            {secondary ? (
              <ButtonLink href={secondary.href} variant="glass" size="lg">
                {secondary.label}
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/**
 * Sticky CTA for small screens only.
 *
 * Registered managers read this on a phone between shifts and rarely reach the
 * bottom of a long page. Hidden on desktop, where the header CTA is always visible.
 */
export function StickyMobileCta({ label = 'Book Free Consultation' }: { label?: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-violet-400/25 bg-white/95 p-3 backdrop-blur-sm lg:hidden">
      <ButtonLink href={CONSULTATION_PATH} size="md" withArrow className="w-full">
        {label}
      </ButtonLink>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Problem / recognition / consequence
 * ------------------------------------------------------------------ */

/** The"is this us?" checklist. Recognition beats persuasion. */
export function RecognitionList({
  eyebrow = 'Does this sound familiar?',
  heading,
  lead,
  items,
}: {
  eyebrow?: string;
  heading: ReactNode;
  lead?: ReactNode;
  items: string[];
}) {
  return (
    <Section tone="paper">
      <Container>
        <SectionHeading eyebrow={eyebrow} title={heading} lead={lead} />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {items.map((item, i) => (
            <li key={item}>
              <Reveal delay={i * 50}>
                <div className="flex h-full items-start gap-3.5 rounded-lg border border-white/10 bg-white/[0.04] p-5">
                  <Icon name="check" className="mt-0.5 size-4 shrink-0 text-mint-300" aria-hidden />
                  <p className="text-[0.9375rem] leading-relaxed text-lumen-soft">{item}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/**
 * The consequence chain.
 *
 * Rendered as a sequence rather than prose because the point is that these link to
 * each other. Copy must stay in"can" and"often" language — the chain is a pattern
 * providers recognise, not a causal claim the evidence can support.
 */
export function ConsequenceChain({
  heading,
  lead,
  steps,
  closing,
}: {
  heading: ReactNode;
  lead?: ReactNode;
  steps: string[];
  closing?: ReactNode;
}) {
  return (
    <Section tone="dark" className="overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0" />
      <Container className="relative">
        <SectionHeading eyebrow="What it costs" title={heading} lead={lead} tone="dark" />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step} className="bg-mint-900/55 backdrop-blur-sm">
              <Reveal delay={i * 70}>
                <div className="flex h-full flex-col p-6">
                  <span
                    aria-hidden="true"
                    className="font-display text-[2.25rem] font-semibold leading-none tracking-[-0.04em] text-lumen/25"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-5 text-[0.9375rem] leading-relaxed text-mint-300/90">{step}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        {closing ? <p className="mt-9 max-w-3xl text-lead text-mint-300/85">{closing}</p> : null}
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Objection handling
 * ------------------------------------------------------------------ */

export interface Objection {
  objection: string;
  answer: string;
}

/**
 * Objection handling.
 *
 * House rule in the copy: never disparage the reader's existing HR team, EAP or
 * provider. The visitor chose those, and attacking them insults the reader's own
 * judgement. Position Ample Care as the specialist layer alongside them.
 */
export function ObjectionHandler({
  heading = 'You may be thinking…',
  lead,
  items,
}: {
  heading?: ReactNode;
  lead?: ReactNode;
  items: Objection[];
}) {
  return (
    <Section tone="warm">
      <Container>
        <SectionHeading eyebrow="Fair questions" title={heading} lead={lead} />
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={item.objection} delay={i * 60}>
              <Card className="h-full p-6">
                <p className="flex items-start gap-3 text-[1.0625rem] font-semibold leading-snug text-lumen">
                  <Icon name="quote" className="mt-1 size-4 shrink-0 text-lumen-soft" aria-hidden />
                  {item.objection}
                </p>
                <p className="mt-3.5 border-t border-white/10 pt-3.5 text-[0.9375rem] leading-relaxed text-lumen-soft">
                  {item.answer}
                </p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * FAQs — with schema
 * ------------------------------------------------------------------ */

export interface Faq {
  question: string;
  answer: string;
}

/**
 * FAQ block, emitting valid `FAQPage` structured data.
 *
 * The schema is generated from the same array that renders on screen, so the markup
 * can never describe questions the page does not actually show — which is exactly
 * what Google's structured data policy prohibits.
 */
export function FaqBlock({
  heading = 'Frequently asked questions',
  lead,
  items,
  tone = 'paper',
}: {
  heading?: ReactNode;
  lead?: ReactNode;
  items: Faq[];
  tone?: 'paper' | 'warm';
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <Section tone={tone} labelledBy="faq-heading">
      <Container width="narrow">
        <SectionHeading
          id="faq-heading"
          eyebrow="Questions"
          title={heading}
          lead={lead}
          align="center"
        />
        <div className="mt-10 divide-y divide-line border-y border-white/10">
          {items.map((item) => (
            // <details> keeps this working without JavaScript and gives keyboard
            // users native expand/collapse behaviour for free.
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[1.0625rem] font-semibold text-lumen marker:hidden">
                {item.question}
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-lumen-soft transition-transform duration-200 group-open:rotate-45"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-lumen-soft">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Evidence
 * ------------------------------------------------------------------ */

/**
 * A sourced statistic. Takes an id, never a raw number.
 *
 * `getEvidence` throws on an unknown id, so a page physically cannot render an
 * unsourced figure — the build fails first.
 */
export function EvidenceStat({ id, className }: { id: string; className?: string }) {
  const stat = getEvidence(id);
  return (
    <figure className={cn('rounded-lg border border-white/10 bg-white/[0.06] p-6', className)}>
      <p className="font-display text-[2.5rem] font-semibold leading-none tracking-[-0.04em] text-lumen">
        {stat.value}
      </p>
      <figcaption className="mt-3 text-[0.9375rem] leading-relaxed text-lumen-soft">
        {stat.label}, {stat.period}.{' '}
        <a
          href={stat.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-draw font-medium text-mint-300"
        >
          {stat.source}
        </a>
      </figcaption>
    </figure>
  );
}

export function EvidenceRow({ ids }: { ids: string[] }) {
  return (
    <Section tone="warm" size="compact">
      <Container>
        <Eyebrow>The scale of it</Eyebrow>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {ids.map((id) => (
            <EvidenceStat key={id} id={id} />
          ))}
        </div>
        <p className="mt-5 text-[0.8125rem] leading-relaxed text-lumen-muted">
          Sector figures for England, shown with their reporting period. They describe the sector,
          not any individual provider — and they are context for a conversation, not a diagnosis of
          your organisation.
        </p>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Internal linking
 * ------------------------------------------------------------------ */

/**
 * Renders the internal links declared for a page in the keyword map.
 *
 * Driven by the map rather than hand-written per page, so the cluster structure
 * cannot drift from the documented architecture and no page ends up orphaned.
 */
export function RelatedPages({
  path,
  heading = 'Related reading',
}: {
  path: string;
  heading?: string;
}) {
  const page = getSeoPage(path);
  if (!page) return null;

  const links = page.internalLinks
    .filter((target) => target !== CONSULTATION_PATH)
    .map((target) => getSeoPage(target))
    .filter((target): target is NonNullable<typeof target> => Boolean(target));

  if (!links.length) return null;

  return (
    <Section tone="paper" size="compact">
      <Container>
        <h2 className="text-display-md text-lumen">{heading}</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((target) => (
            <li key={target.path}>
              <Link
                href={target.path}
                className="flex h-full flex-col rounded-lg border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-violet-400/25"
              >
                <span className="text-[1.0625rem] font-semibold leading-snug text-lumen">
                  {target.primaryKeyword
                    .split(' ')
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(' ')}
                </span>
                <span className="mt-2 text-[0.875rem] leading-relaxed text-lumen-soft">
                  {target.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Page hero
 * ------------------------------------------------------------------ */

/** Landing page hero: one H1, an above-the-fold CTA, and no decoration that delays it. */
export function LandingHero({
  eyebrow,
  h1,
  lead,
  ctaLabel = BOOK_CTA,
  secondary,
  journey,
}: {
  eyebrow: string;
  h1: ReactNode;
  lead: ReactNode;
  ctaLabel?: string;
  secondary?: { label: string; href: string };
  journey?: { label: string };
}) {
  return (
    <Section tone="paper" size="default" className="overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-56 size-[40rem] rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute -right-32 top-0 size-[30rem] rounded-full bg-mint-400/10 blur-3xl" />
      </div>
      <Container>
        <div className="max-w-3xl">
          {journey ? (
            <nav
              aria-label="Journey"
              className="flex flex-wrap items-center gap-2 text-[0.8125rem] text-lumen-muted"
            >
              <Link href="/" className="rounded-sm hover:text-mint-300">
                Home
              </Link>
              <Icon name="arrowRight" className="size-3 text-lumen-soft" aria-hidden />
              <span className="font-medium text-lumen">{journey.label}</span>
            </nav>
          ) : null}
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-6 text-display-2xl text-lumen">{h1}</h1>
          <p className="mt-7 text-lead text-lumen-soft">{lead}</p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <ButtonLink href={CONSULTATION_PATH} size="lg" withArrow>
              {ctaLabel}
            </ButtonLink>
            {secondary ? (
              <ButtonLink href={secondary.href} variant="ghost" size="lg">
                {secondary.label}
              </ButtonLink>
            ) : null}
          </div>
          <p className="mt-5 text-[0.875rem] text-lumen-muted">
            20–30 minutes · No obligation · From £35 per staff member
          </p>
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Prose
 * ------------------------------------------------------------------ */

/** Editorial body section for the education part of each page. */
export function ProseSection({
  eyebrow,
  heading,
  children,
  tone = 'paper',
  id,
}: {
  eyebrow?: string;
  heading: ReactNode;
  children: ReactNode;
  tone?: 'paper' | 'warm';
  id?: string;
}) {
  return (
    <Section tone={tone} id={id}>
      <Container width="narrow">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2 className="mt-5 text-display-xl text-lumen">{heading}</h2>
        <div className="mt-7 flex flex-col gap-5 text-[1.0625rem] leading-relaxed text-lumen-soft">
          {children}
        </div>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ *
 * Cluster router — "is this the right page for me?"
 * ------------------------------------------------------------------ */

/**
 * The fix for the site's biggest orientation problem.
 *
 * Four pages describe closely related problems — burnout, retention, turnover,
 * morale. They are genuinely different search intents and deserve separate pages,
 * but a visitor arriving from a search has no way to tell which one is theirs, and
 * ends up either reading all four or bouncing.
 *
 * This states plainly what the current page is for, then offers its siblings with
 * the same one-line test. It costs a reader about four seconds and saves them from
 * reading the wrong page entirely.
 */
export function ClusterRouter({ path }: { path: string }) {
  const page = getSeoPage(path);
  if (!page?.youAreHereIf || !page.siblings?.length) return null;

  const siblings = page.siblings
    .map((target) => getSeoPage(target))
    .filter((target): target is NonNullable<typeof target> => Boolean(target?.youAreHereIf));

  if (!siblings.length) return null;

  return (
    <Section tone="paper" size="compact">
      <Container>
        <div className="glass rounded-lg p-6 sm:p-8">
          <p className="text-eyebrow uppercase text-mint-300">You are in the right place if</p>
          <p className="mt-4 text-display-md text-lumen">{page.youAreHereIf}.</p>

          <div className="mt-7 border-t border-white/10 pt-6">
            <p className="text-[0.9375rem] text-lumen-soft">
              If that is not quite it, one of these will fit better:
            </p>
            <ul className="mt-4 grid gap-3 md:grid-cols-3">
              {siblings.map((sibling) => (
                <li key={sibling.path}>
                  <Link
                    href={sibling.path}
                    className="glass-subtle flex h-full flex-col rounded-md p-4 transition-colors hover:border-mint-300/35"
                  >
                    <span className="text-[0.9375rem] font-semibold text-lumen">
                      {sibling.primaryKeyword
                        .split(' ')
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                        .join(' ')}
                    </span>
                    <span className="mt-1.5 text-[0.8125rem] leading-relaxed text-lumen-muted">
                      If {sibling.youAreHereIf}.
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
