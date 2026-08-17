import type { Metadata } from 'next';
import {
  ClusterRouter,
  ConsequenceChain,
  CtaBand,
  EvidenceRow,
  FaqBlock,
  LandingHero,
  ObjectionHandler,
  ProseSection,
  RecognitionList,
  RelatedPages,
  StickyMobileCta,
  type Faq,
  type Objection,
} from '@/components/seo/ConversionKit';
import { Container, Eyebrow, Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Icon, type IconName } from '@/components/Icons';
import { getSeoPage, seoPages } from '@/content/seo/keywordMap';
import { site } from '@/content/site';

/**
 * The landing page content model and template.
 *
 * Pages are data, not bespoke JSX. That is what makes thirty pages maintainable and
 * what guarantees every one of them follows the briefed journey:
 *
 * problem → recognition → emotion → consequence → education → solution →
 * proof → objection handling → action
 *
 * Copy still lives per page in `content/pages/*`, so pages are genuinely distinct —
 * only the *structure* is shared. A sector page that merely swapped the setting name
 * into a template would be a thin page, which the brief rightly forbids.
 */
export interface LandingContent {
  /** Must match a `path` in the keyword map — metadata and links come from there. */
  path: string;
  eyebrow: string;
  /** Split so the closing phrase can carry the accent treatment. */
  h1: string;
  h1Accent?: string;
  lead: string;

  recognition: {
    heading: string;
    lead?: string;
    items: string[];
  };

  /** The emotional turn. One short, human passage — never a wall of text. */
  emotion: {
    quote: string;
    attribution?: string;
  };

  consequence: {
    heading: string;
    lead?: string;
    steps: string[];
    closing?: string;
  };

  /** The education sections. Each becomes an H2 with body copy. */
  education: {
    eyebrow?: string;
    heading: string;
    paragraphs: string[];
  }[];

  solution: {
    heading: string;
    lead?: string;
    steps: { title: string; body: string; icon: IconName }[];
  };

  /** Ids from the evidence registry. Unknown ids fail the build. */
  evidenceIds?: string[];

  objections: Objection[];
  faqs: Faq[];

  finalCta: {
    heading: string;
    body: string;
    label?: string;
  };
}

/** Builds page metadata from the keyword map, so titles cannot drift from the plan. */
export function metadataFor(path: string): Metadata {
  const page = getSeoPage(path);
  if (!page) {
    throw new Error(
      `No keyword map entry for"${path}". Add it to content/seo/keywordMap.ts before creating the route — otherwise the page has no canonical and will not enter the sitemap.`
    );
  }

  return {
    title: page.title,
    description: page.description,
    keywords: [page.primaryKeyword, ...page.secondaryKeywords],
    alternates: { canonical: page.path },
    openGraph: {
      type: 'website',
      url: `${site.url}${page.path}`,
      title: page.title,
      description: page.description,
      siteName: site.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
    },
  };
}

/**
 * `Service` structured data for commercial pages.
 *
 * Only emitted for service and sector clusters — marking an informational article up
 * as a Service would misrepresent the page to Google.
 */
function serviceSchema(path: string) {
  const page = getSeoPage(path);
  if (!page) return null;
  if (page.cluster !== 'service' && page.cluster !== 'sector') return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.title.split('|')[0].trim(),
    description: page.description,
    serviceType: page.primaryKeyword,
    provider: { '@type': 'Organization', name: site.name, url: site.url },
    areaServed: { '@type': 'Country', name: site.areaServed },
    url: `${site.url}${page.path}`,
    audience: { '@type': 'Audience', audienceType: page.audience },
  };
}

export function LandingPage({ content }: { content: LandingContent }) {
  const page = getSeoPage(content.path);
  const schema = serviceSchema(content.path);
  const journeyLabel =
    page?.cluster === 'service'
      ? 'Services'
      : page?.cluster === 'problem'
        ? 'Problems we help with'
        : page?.cluster === 'sector'
          ? 'Who we help'
          : page?.cluster === 'pillar'
            ? 'Care workforce wellbeing'
            : page?.cluster === 'conversion'
              ? 'Book a consultation'
              : 'Commercial pages';

  return (
    <>
      {/* 1. Above the fold: H1 + first CTA */}
      <LandingHero
        eyebrow={content.eyebrow}
        h1={
          <>
            {content.h1}
            {content.h1Accent ? (
              <>
                {' '}
                <span className="text-aurora text-mint-300">{content.h1Accent}</span>
              </>
            ) : null}
          </>
        }
        lead={content.lead}
        secondary={{ label: 'See how we help', href: '/care-workforce-wellbeing' }}
        journey={journeyLabel ? { label: journeyLabel } : undefined}
      />

      {page ? <ClusterRouter path={page.path} /> : null}

      {/* 2. Recognition —"is this us?" */}
      <RecognitionList
        heading={content.recognition.heading}
        lead={content.recognition.lead}
        items={content.recognition.items}
      />

      {/* 3. The emotional turn, kept short and set as a pull quote. */}
      <Section tone="purple-tint" size="compact">
        <Container width="narrow">
          <blockquote className="text-center">
            <p className="text-display-lg text-lumen">“{content.emotion.quote}”</p>
            {content.emotion.attribution ? (
              <footer className="mt-5 text-sm font-medium uppercase tracking-[0.1em] text-mint-300">
                {content.emotion.attribution}
              </footer>
            ) : null}
          </blockquote>
        </Container>
      </Section>

      {/* 4. Consequence of doing nothing */}
      <ConsequenceChain
        heading={content.consequence.heading}
        lead={content.consequence.lead}
        steps={content.consequence.steps}
        closing={content.consequence.closing}
      />

      {/* 5. CTA after the problem is established */}
      <CtaBand
        tone="soft"
        heading="Before you decide what your staff need, find out what they are experiencing."
        body="A short conversation about your workforce. No obligation, and no sales script."
        label="Talk to Ample Care"
      />

      {/* 6. Education */}
      {content.education.map((block, i) => (
        <ProseSection
          key={block.heading}
          eyebrow={block.eyebrow}
          heading={block.heading}
          tone={i % 2 === 0 ? 'paper' : 'warm'}
        >
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </ProseSection>
      ))}

      {/* 7. What Ample Care does about it */}
      <Section tone="paper">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>How we help</Eyebrow>
            <h2 className="mt-6 text-display-xl text-lumen">{content.solution.heading}</h2>
            {content.solution.lead ? (
              <p className="mt-5 text-lead text-lumen-soft">{content.solution.lead}</p>
            ) : null}
          </div>

          <ol className="mt-12 grid gap-4 md:grid-cols-2">
            {content.solution.steps.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 60}>
                  <div className="flex h-full gap-5 rounded-lg border border-white/10 bg-white/[0.04] p-6">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-lumen">
                      <Icon name={step.icon} className="size-5" aria-hidden />
                    </span>
                    <div>
                      <h3 className="text-display-md text-lumen">{step.title}</h3>
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

      {/* 8. Proof */}
      {content.evidenceIds?.length ? <EvidenceRow ids={content.evidenceIds} /> : null}

      {/* 9. Objection handling */}
      <ObjectionHandler items={content.objections} />

      {/* 10. FAQs, with FAQPage schema */}
      <FaqBlock items={content.faqs} tone="paper" />

      {/* 11. Cluster links */}
      <RelatedPages path={content.path} />

      {/* 12. Final CTA */}
      <CtaBand
        heading={content.finalCta.heading}
        body={content.finalCta.body}
        label={content.finalCta.label}
        secondary={{ label: 'See pricing', href: '/pricing' }}
      />

      <StickyMobileCta />

      {schema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ) : null}

      {/* Breadcrumbs for search results. */}
      {page ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: page.title.split('|')[0].trim(),
                  item: `${site.url}${page.path}`,
                },
              ],
            }),
          }}
        />
      ) : null}
    </>
  );
}

/** Every landing path, for the sitemap and QA report. */
export const landingPaths = seoPages.map((page) => page.path);
