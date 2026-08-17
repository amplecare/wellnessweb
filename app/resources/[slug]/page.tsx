import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CtaBand, StickyMobileCta } from '@/components/seo/ConversionKit';
import { ButtonLink } from '@/components/ui/Button';
import { Container, Section } from '@/components/ui/Section';
import { articles, getArticle } from '@/content/resources';
import { CONSULTATION_PATH } from '@/content/seo/keywordMap';
import { site } from '@/content/site';

/**
 * Article pages.
 *
 * Informational intent, so the body does not sell. But an article that ends without
 * a next step is a dead end, so each carries a CTA written for its own topic plus a
 * link to the commercial page covering it — which is also what stops the resources
 * section becoming an SEO island disconnected from the rest of the site.
 */
export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: `${article.title} | Ample Care`,
    description: article.description,
    keywords: [article.keyword],
    alternates: { canonical: `/resources/${article.slug}` },
    openGraph: {
      type: 'article',
      url: `${site.url}/resources/${article.slug}`,
      title: article.title,
      description: article.description,
      publishedTime: article.published,
      siteName: site.name,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.published,
    dateModified: article.published,
    author: { '@type': 'Organization', name: site.name, url: site.url },
    publisher: { '@type': 'Organization', name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/resources/${article.slug}`,
  };

  return (
    <>
      <Section tone="paper" className="overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-40 -top-56 size-[40rem] rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute -right-32 top-0 size-[30rem] rounded-full bg-mint-400/10 blur-3xl" />
        </div>
        <Container width="narrow">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-lumen-muted">
            <Link href="/resources" className="link-draw font-medium text-mint-300">
              Resources
            </Link>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-lumen-muted">
            {article.readingMinutes} min read
          </p>
          <h1 className="mt-4 text-display-2xl text-lumen">{article.title}</h1>
          <p className="mt-6 text-lead text-lumen-soft">{article.intro}</p>
        </Container>
      </Section>

      <Section tone="paper" size="compact">
        <Container width="narrow">
          <div className="flex flex-col gap-12">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-display-lg text-lumen">{section.heading}</h2>
                <div className="mt-5 flex flex-col gap-4 text-[1.0625rem] leading-relaxed text-lumen-soft">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.list ? (
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="glass-subtle rounded-md px-4 py-3 text-[0.9375rem] leading-relaxed text-lumen-soft"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <div className="mt-14 rounded-lg border border-violet-400/25 bg-white/[0.06] p-6 sm:p-8">
            <h2 className="text-display-md text-lumen">{article.cta.heading}</h2>
            <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-lumen-soft">
              {article.cta.body}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href={CONSULTATION_PATH} size="md" withArrow>
                Book Your Free Wellbeing Consultation
              </ButtonLink>
              <Link
                href={article.relatedPath}
                className="text-sm font-semibold text-mint-300 underline decoration-violet-300 underline-offset-4"
              >
                More on {article.relatedLabel.toLowerCase()}
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        tone="soft"
        heading="Every guide here ends the same way: measure before you act."
        body="A free consultation is the quickest way to work out what measuring would tell you."
        label="Talk to Ample Care"
      />

      <StickyMobileCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
