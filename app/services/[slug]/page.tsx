import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Icon } from '@/components/Icons';
import { CtaBand, StickyMobileCta } from '@/components/seo/ConversionKit';
import { ButtonLink } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Container, Eyebrow, Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { getService, services } from '@/content/services';
import { CONSULTATION_PATH } from '@/content/seo/keywordMap';
import { site } from '@/content/site';

/**
 * Individual service pages.
 *
 * The eight services previously existed only as anchors on /services, which meant
 * eight service-related search intents had no rankable destination. These give each
 * one a real page with its own canonical, metadata and Service schema.
 *
 * They are deliberately narrower than the commercial landing pages in the keyword
 * map: those own the broad problem keywords, these describe a specific deliverable.
 * Keeping that distinction is what stops them competing with each other.
 */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const title = `${service.title} for Care Providers | Ample Care`;

  return {
    title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      type: 'website',
      url: `${site.url}/services/${service.slug}`,
      title,
      description: service.summary,
      siteName: site.name,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.summary,
    serviceType: service.title,
    provider: { '@type': 'Organization', name: site.name, url: site.url },
    areaServed: { '@type': 'Country', name: site.areaServed },
    url: `${site.url}/services/${service.slug}`,
  };

  return (
    <>
      <Section tone="paper" className="overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -left-40 -top-56 size-[40rem] rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute -right-32 top-0 size-[30rem] rounded-full bg-mint-400/10 blur-3xl" />
        </div>
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-lumen-muted">
            <Link href="/services" className="link-draw font-medium text-mint-300">
              Services
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span>{service.title}</span>
          </nav>

          <div className="max-w-3xl">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-violet-600 text-lumen">
              <Icon name={service.icon} className="size-6" aria-hidden />
            </span>
            <h1 className="mt-6 text-display-2xl text-lumen">{service.title}</h1>
            <p className="mt-7 text-lead text-lumen-soft">{service.summary}</p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <ButtonLink href={CONSULTATION_PATH} size="lg" withArrow>
                Book Your Free Wellbeing Consultation
              </ButtonLink>
              <ButtonLink href="/pricing" variant="ghost" size="lg">
                See pricing
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="warm">
        <Container width="narrow">
          <Eyebrow>What it involves</Eyebrow>
          <h2 className="mt-5 text-display-xl text-lumen">How this works in practice</h2>
          <p className="mt-7 text-[1.0625rem] leading-relaxed text-lumen-soft">{service.detail}</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Card className="p-5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-lumen-muted">
                Typical format
              </h3>
              <p className="mt-2 text-[0.9375rem] text-lumen-soft">{service.format}</p>
            </Card>
            <Card className="p-5">
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-lumen-muted">
                Best suited to
              </h3>
              <p className="mt-2 text-[0.9375rem] text-lumen-soft">{service.bestFor}</p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section tone="paper">
        <Container width="narrow">
          <Eyebrow>What you receive</Eyebrow>
          <h2 className="mt-5 text-display-xl text-lumen">Concretely, what is included</h2>
          <ul className="mt-8 flex flex-col gap-3">
            {service.includes.map((item, i) => (
              <li key={item}>
                <Reveal delay={i * 50}>
                  <div className="flex items-start gap-3.5 rounded-lg border border-white/10 bg-white/[0.04] p-5">
                    <Icon
                      name="check"
                      className="mt-0.5 size-4 shrink-0 text-mint-300"
                      aria-hidden
                    />
                    <p className="text-[0.9375rem] leading-relaxed text-lumen-soft">{item}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="warm" size="compact">
        <Container>
          <h2 className="text-display-md text-lumen">Other services</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/services/${other.slug}`}
                  className="flex h-full flex-col rounded-lg border border-white/10 bg-white/[0.06] p-5 transition-colors hover:border-violet-400/25"
                >
                  <span className="text-[1.0625rem] font-semibold leading-snug text-lumen">
                    {other.title}
                  </span>
                  <span className="mt-2 text-[0.875rem] leading-relaxed text-lumen-soft">
                    {other.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand
        heading="Not sure which of these you need?"
        body="That is exactly what the free consultation is for. We will tell you honestly which service fits — and if none of them do, we will say so."
        secondary={{ label: 'All services', href: '/services' }}
      />

      <StickyMobileCta />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
