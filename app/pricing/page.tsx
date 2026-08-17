import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Icon } from '@/components/Icons';
import { PackageCalculator } from '@/components/forms/PackageCalculator';
import { BreadcrumbSchema, PageHeader } from '@/components/layout/PageHeader';
import { FinalCta } from '@/components/sections/FinalCta';
import { Pricing } from '@/components/sections/Pricing';
import { Reveal } from '@/components/ui/Reveal';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { site } from '@/content/site';
import { cta } from '@/content/site';

export const metadata: Metadata = {
  title: 'Pricing — Employee Wellbeing Programmes From £35 Per Staff Member',
  description:
    'Transparent pricing for care sector staff wellbeing programmes, from £35 per staff member. Use the calculator for an indicative figure, then get a firm quote after a free consultation.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Pricing | Ample Care Ltd',
    description:
      'Wellbeing programmes for UK care providers from £35 per staff member. Indicative calculator, firm quote after a free consultation.',
    url: `${site.url}/pricing`,
  },
};

const faqs = [
  {
    q: 'Is the £35 figure per staff member or per organisation?',
    a: 'Per staff member. A 40-staff care home starting with an assessment would be from £1,400. Larger providers move into volume bands, which the calculator applies automatically.',
  },
  {
    q: 'Do we pay for staff who choose not to take part?',
    a: 'No. We quote on your headcount so the programme is available to everyone, but participation is always voluntary and we reconcile the final invoice to the staff actually covered.',
  },
  {
    q: 'Are these prices inclusive of VAT?',
    a: 'All prices shown exclude VAT. Your written quote will state the VAT position clearly.',
  },
  {
    q: 'Is there a minimum contract size?',
    a: 'No. We work with single care homes as well as multi-site providers. Smaller services are often where a wellbeing programme makes the biggest difference.',
  },
  {
    q: 'What happens after the free consultation?',
    a: 'You get a written proposal with a fixed price, a clear scope and a timescale. There is no obligation to proceed, and no follow-up sales pressure.',
  },
  {
    q: 'Can the cost come out of an existing training or wellbeing budget?',
    a: 'Often, yes. Many providers fund this from training, workforce development or retention budgets. We can set the proposal out in a way that supports an internal business case.',
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        breadcrumb="Pricing"
        title="Clear Pricing, From £35 Per Staff Member"
        lead="No day rates, no platform subscriptions, no hidden licence fees. You will know what a programme costs before you commit to anything — and the consultation that gets you there is free."
      />

      <Pricing showCalculatorCta={false} tone="paper" />

      <Section
        id="calculator"
        tone="warm"
        labelledBy="calculator-heading"
        className="border-y border-white/10"
      >
        <Container width="wide">
          <SectionHeading
            id="calculator-heading"
            eyebrow="Estimate"
            title={cta.calculator}
            lead="Enter your staff count and the level of support you have in mind. The figure updates instantly — and carries through to your enquiry so we already have the context when we speak."
            align="center"
          />

          <Reveal className="mt-12">
            {/* useSearchParams inside the calculator's subtree requires a Suspense
 boundary during prerender. */}
            <Suspense
              fallback={
                <div className="h-[32rem] animate-pulse rounded-lg border border-white/10 bg-white/[0.06]" />
              }
            >
              <PackageCalculator />
            </Suspense>
          </Reveal>
        </Container>
      </Section>

      <Section tone="paper" labelledBy="pricing-faq-heading">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeading
                id="pricing-faq-heading"
                eyebrow="Pricing questions"
                title="The Questions Managers Actually Ask"
                lead="If your question is not here, ask it on the consultation call — there is no wrong question about cost."
              />
            </div>

            <ul className="flex flex-col gap-4">
              {faqs.map((faq, i) => (
                <li key={faq.q}>
                  <Reveal delay={i * 60}>
                    <div className="rounded-md border border-white/10 bg-white/[0.06] p-6 shadow-glass-sm">
                      <h3 className="flex items-start gap-3 text-[1.0625rem] font-semibold leading-snug text-lumen">
                        <Icon name="spark" className="mt-1 size-4 shrink-0 text-mint-300" />
                        {faq.q}
                      </h3>
                      <p className="mt-3 pl-7 text-[0.9375rem] leading-relaxed text-lumen-soft">
                        {faq.a}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      <FinalCta />

      <BreadcrumbSchema siteUrl={site.url} items={[{ name: 'Pricing', path: '/pricing' }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          }),
        }}
      />
    </>
  );
}
