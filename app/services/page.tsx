import type { Metadata } from 'next';
import { Icon } from '@/components/Icons';
import { BreadcrumbSchema, PageHeader } from '@/components/layout/PageHeader';
import { FinalCta } from '@/components/sections/FinalCta';
import { Solution } from '@/components/sections/Solution';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Container, Section } from '@/components/ui/Section';
import { services } from '@/content/services';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Staff Wellbeing Services for Care Homes & Care Providers',
  description:
    'Staff wellbeing assessments, care worker burnout reviews, workplace health promotion, mental health awareness and resilience programmes — designed for UK care providers.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: 'Staff Wellbeing Services for UK Care Providers | Ample Care Ltd',
    description:
      'Eight wellbeing services built specifically for care and healthcare teams, from assessment through to ongoing support.',
    url: `${site.url}/services`,
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        breadcrumb="Services"
        title="Staff Wellbeing Services Built for Care Teams"
        lead="Eight services, available individually or combined into one programme. Each is designed around how care actually runs — rotas, handovers, night cover and lone working included."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/book-consultation" size="lg" withArrow className="w-full sm:w-auto">
            Book a free consultation
          </ButtonLink>
          <ButtonLink href="/pricing" variant="secondary" size="lg" className="w-full sm:w-auto">
            See pricing
          </ButtonLink>
        </div>
      </PageHeader>

      {/* Jump list — long page, and managers on a phone need a shortcut. */}
      <Section tone="paper" size="compact" className="border-b border-white/10">
        <Container width="wide">
          <h2 className="text-eyebrow uppercase text-lumen-muted">On this page</h2>
          <ul className="mt-5 flex flex-wrap gap-2.5">
            {services.map((service) => (
              <li key={service.slug}>
                <a
                  href={`/services/${service.slug}`}
                  className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[0.8125rem] font-medium text-lumen-soft transition-colors hover:border-violet-400/25 hover:bg-white/[0.06] hover:text-lumen"
                >
                  <Icon name={service.icon} className="size-3.5 text-violet-500" />
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <div>
        {services.map((service, i) => (
          <Section
            key={service.slug}
            id={service.slug}
            tone={i % 2 === 0 ? 'paper' : 'warm'}
            labelledBy={`${service.slug}-heading`}
            size="default"
            className={i % 2 === 0 ? '' : 'border-y border-white/10'}
          >
            <Container width="wide">
              <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
                <div>
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-mint-300"
                    >
                      <Icon name={service.icon} className="size-6" />
                    </span>
                    <p className="nums text-eyebrow uppercase text-mint-300">
                      Service {String(i + 1).padStart(2, '0')}
                    </p>
                  </div>

                  <h2 id={`${service.slug}-heading`} className="mt-6 text-display-lg">
                    {service.title}
                  </h2>
                  <p className="mt-4 text-lead text-lumen-soft">{service.summary}</p>
                  <p className="mt-5 leading-relaxed text-lumen-soft">{service.detail}</p>

                  <dl className="mt-8 grid gap-5 sm:grid-cols-2">
                    <div className="rounded-md border border-white/10 bg-white/[0.06] p-5">
                      <dt className="flex items-center gap-2 text-eyebrow uppercase text-mint-300">
                        <Icon name="clock" className="size-3.5" />
                        Typical timescale
                      </dt>
                      <dd className="mt-2.5 text-[0.9375rem] font-medium text-lumen">
                        {service.format}
                      </dd>
                    </div>
                    <div className="rounded-md border border-white/10 bg-white/[0.06] p-5">
                      <dt className="flex items-center gap-2 text-eyebrow uppercase text-mint-300">
                        <Icon name="compass" className="size-3.5" />
                        Best for
                      </dt>
                      <dd className="mt-2.5 text-[0.9375rem] font-medium text-lumen">
                        {service.bestFor}
                      </dd>
                    </div>
                  </dl>
                </div>

                <Reveal className="lg:pt-4">
                  <div className="rounded-lg border border-violet-400/25 bg-white/[0.06] p-6 sm:p-8 lg:sticky lg:top-28">
                    <h3 className="text-display-md">What you get</h3>
                    <ul className="mt-5 flex flex-col gap-3.5">
                      {service.includes.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed"
                        >
                          <Icon name="check" className="mt-1 size-4 shrink-0 text-mint-300" />
                          <span className="text-lumen-soft">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <ButtonLink
                      href={`/contact?service=${service.slug}`}
                      size="md"
                      withArrow
                      className="mt-7 w-full"
                    >
                      Discuss this service
                    </ButtonLink>
                  </div>
                </Reveal>
              </div>
            </Container>
          </Section>
        ))}
      </div>

      <Solution />
      <FinalCta />

      <BreadcrumbSchema siteUrl={site.url} items={[{ name: 'Services', path: '/services' }]} />
      <ServicesItemList />
    </>
  );
}

/** ItemList of services, so each named service is discoverable in search. */
function ServicesItemList() {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Staff wellbeing services for UK care providers',
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.title,
        description: s.summary,
        url: `${site.url}/services/${s.slug}`,
        serviceType: 'Workplace wellbeing consultancy',
        provider: { '@id': `${site.url}/#organisation` },
        areaServed: { '@type': 'Country', name: site.areaServed },
      },
    })),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
  );
}
