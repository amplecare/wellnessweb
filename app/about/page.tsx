import type { Metadata } from 'next';
import { Icon, type IconName } from '@/components/Icons';
import { BreadcrumbSchema, PageHeader } from '@/components/layout/PageHeader';
import { FinalCta } from '@/components/sections/FinalCta';
import { DataHandling } from '@/components/sections/Trust';
import { ButtonLink } from '@/components/ui/Button';
import { Illustration } from '@/components/ui/Illustration';
import { ImageFrame } from '@/components/ui/ImageFrame';
import { Reveal } from '@/components/ui/Reveal';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'About Ample Care — Care Sector Wellbeing Specialists',
  description:
    'Ample Care Ltd is a UK health promotion and workplace wellbeing consultancy focused entirely on care and healthcare teams. Our approach, our principles, and how we work with providers.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Ample Care Ltd',
    description:
      'A UK wellbeing consultancy built specifically for care and healthcare teams — our approach and principles.',
    url: `${site.url}/about`,
  },
};

const principles: readonly { icon: IconName; title: string; body: string }[] = [
  {
    icon: 'stethoscope',
    title: 'Specialists, not generalists',
    body: 'We work with care and healthcare organisations only. That focus is the whole point: it means we already know what a bad staffing week looks like, why nights are different, and why a lunchtime wellbeing seminar will not work in your service.',
  },
  {
    icon: 'compass',
    title: 'Practical over theoretical',
    body: 'Every engagement has to end with something changed. If we cannot name the actions, the owners and the measures, we have not finished the job.',
  },
  {
    icon: 'lock',
    title: 'Confidential by design',
    body: 'Staff tell the truth only when they trust the process. Individual answers never reach managers, and we say so plainly to everyone who takes part.',
  },
  {
    icon: 'shield',
    title: 'Honest about limits',
    body: 'Wellbeing support cannot fix funding, commissioning or a fundamentally broken rota. We will say which pressures we can help with and which need a different answer.',
  },
  {
    icon: 'users',
    title: 'Staff experience drives care quality',
    body: 'We treat wellbeing as an operational lever, not a perk. Steadier teams give more consistent care, and residents feel the difference first.',
  },
  {
    icon: 'chart',
    title: 'Evidence you can show',
    body: 'We measure at the start and again later, so you can demonstrate what changed — to your board, and in a"well-led" conversation.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        breadcrumb="About"
        title="A Wellbeing Consultancy Built Only for Care Teams"
        lead="Ample Care exists because the wellbeing support available to care providers was mostly designed for offices. Care work is not office work, and staff can tell within thirty seconds whether a programme was written with them in mind."
      />

      <Section tone="paper" labelledBy="why-exists-heading">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <SectionHeading
                id="why-exists-heading"
                eyebrow="Why we exist"
                title="The Wellbeing Gap in Social Care"
              />

              <div className="mt-8 flex flex-col gap-5 leading-relaxed text-lumen-soft">
                <p>
                  Care staff do some of the most emotionally demanding work there is. They support
                  people through deterioration, dementia, and the end of life — often while
                  short-staffed, often on rotating shifts, and often with very little space to
                  process any of it.
                </p>
                <p>
                  Meanwhile, the wellbeing market that has grown up around employers is built for a
                  different world: app subscriptions, step challenges, lunchtime webinars,
                  resilience training that assumes a predictable working day. None of it survives
                  contact with a care rota, and the result is that providers spend money on
                  wellbeing and see almost no engagement from the staff who need it most.
                </p>
                <p>
                  Ample Care was set up to close that gap. We assess wellbeing using indicators that
                  mean something in a care setting, report findings in language a registered manager
                  can act on, and deliver support in formats that work at handover, on nights, and
                  across multiple sites.
                </p>
                <p className="rounded-md border-l-4 border-mint-500 bg-mint-400/10 p-5 text-[1.0625rem] font-medium leading-relaxed text-mint-300">
                  The test we hold ourselves to is simple: would a care assistant coming off a
                  twelve-hour shift recognise this as something built for them?
                </p>
              </div>
            </div>

            <Reveal className="flex flex-col gap-6 lg:pt-8">
              <ImageFrame
                aspect="4/5"
                variant="purple"
                sizes="(max-width: 1024px) 100vw, 40vw"
                shotBrief="Care assistant sitting with a resident in a communal lounge — hands, tea, natural daylight. Focus on the quality of attention, not faces to camera."
                className="shadow-glass"
              />
              {/* Decorative: the copy alongside already makes this point in words. */}
              <Illustration src="/images/illustration-insight.svg" aspect="3/2" />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="warm" labelledBy="principles-heading" className="border-y border-white/10">
        <Container width="wide">
          <SectionHeading
            id="principles-heading"
            eyebrow="How we work"
            title="Six Principles We Hold To"
            lead="These are the commitments we make to every provider we work with, and the standards you should hold us to."
            align="center"
          />

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <li key={p.title} className="flex">
                <Reveal delay={(i % 3) * 80} className="flex w-full">
                  <div className="flex h-full flex-col gap-4 rounded-md border border-white/10 bg-white/[0.06] p-6 shadow-glass-sm">
                    <span
                      aria-hidden="true"
                      className="flex size-11 items-center justify-center rounded-xl bg-white/[0.06] text-mint-300"
                    >
                      <Icon name={p.icon} className="size-5.5" />
                    </span>
                    <h3 className="text-[1.0625rem] font-semibold leading-snug text-lumen">
                      {p.title}
                    </h3>
                    <p className="text-[0.9375rem] leading-relaxed text-lumen-soft">{p.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="paper" labelledBy="credibility-heading">
        <Container width="narrow">
          <SectionHeading
            id="credibility-heading"
            eyebrow="Where we are now"
            title="Honest About Our Stage"
            align="center"
          />

          <div className="mt-8 flex flex-col gap-5 text-center leading-relaxed text-lumen-soft">
            <p>
              Ample Care is a focused, early-stage consultancy. We are not going to claim decades of
              history or a client list we do not have. What we offer instead is genuine specialism
              in care sector wellbeing, an approach designed from the ground up for shift-based
              work, and the attention that comes from working with a small number of providers
              properly rather than many superficially.
            </p>
            <p>
              If you would rather work with a large generalist firm, that is a reasonable choice. If
              you want someone who understands why your night staff never engage with the wellbeing
              offer, we are probably the better fit.
            </p>
          </div>



          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <ButtonLink href="/services" size="lg" withArrow className="w-full sm:w-auto">
              See what we do
            </ButtonLink>
            <ButtonLink
              href="/book-consultation"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Book a free consultation
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section tone="paper" size="compact" className="pt-0">
        <Container width="wide">
          <DataHandling />
        </Container>
      </Section>

      <FinalCta />

      <BreadcrumbSchema siteUrl={site.url} items={[{ name: 'About', path: '/about' }]} />
    </>
  );
}
