import Link from 'next/link';
import type { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { CtaBand, StickyMobileCta } from '@/components/seo/ConversionKit';
import { Container, Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { articles } from '@/content/resources';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Workforce Wellbeing Resources for Care Providers | Ample Care',
  description:
    'Practical guides on care staff retention, burnout, absence and measuring workforce wellbeing — written for registered managers and care directors.',
  alternates: { canonical: '/resources' },
  openGraph: {
    type: 'website',
    url: `${site.url}/resources`,
    title: 'Workforce Wellbeing Resources for Care Providers',
    description:
      'Practical guides on retention, burnout, absence and measuring workforce wellbeing in health and social care.',
    siteName: site.name,
  },
};

export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        breadcrumb="Resources"
        title="Practical Guides for Care Providers"
        lead="Written for registered managers and directors who need something they can act on rather than a think piece. No sign-up required."
      />

      <Section tone="paper">
        <Container>
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, i) => (
              <li key={article.slug} className="flex">
                <Reveal delay={(i % 3) * 70} className="flex w-full">
                  <Link
                    href={`/resources/${article.slug}`}
                    className="glass flex h-full flex-col rounded-lg p-6 transition-[transform,border-color,box-shadow] duration-400 ease-[var(--ease-out-soft)] motion-safe:hover:-translate-y-1.5 hover:border-mint-300/35 hover:shadow-glass-lg"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-lumen-muted">
                      {article.readingMinutes} min read
                    </span>
                    <h2 className="mt-3 text-display-md leading-snug text-lumen">
                      {article.title}
                    </h2>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-lumen-soft">
                      {article.description}
                    </p>
                    <span className="mt-auto pt-5 text-sm font-semibold text-mint-300 underline decoration-violet-300 underline-offset-4">
                      Read the guide
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand
        heading="Reading about it is a start. Measuring it is the step that changes something."
        body="Book a free consultation and we will talk through what is happening in your service."
      />

      <StickyMobileCta />
    </>
  );
}
