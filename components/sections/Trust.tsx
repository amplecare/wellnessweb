import { Icon, type IconName } from '@/components/Icons';
import { ButtonLink } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import { Container, Section, SectionHeading } from '@/components/ui/Section';

const pillars: readonly { icon: IconName; title: string; body: string }[] = [
  {
    icon: 'stethoscope',
    title: 'We start from care work, not theory',
    body: 'Our approach is built on the everyday realities of care: rotas that change, residents who deteriorate, families under strain, and staff who absorb all of it. Every question and recommendation is written for that context.',
  },
  {
    icon: 'compass',
    title: 'Specialism over scale',
    body: 'Ample Care is a focused consultancy, not a large generalist firm. We would rather be the people who genuinely understand social care wellbeing than the biggest name on the list.',
  },
  {
    icon: 'shield',
    title: 'Honest about what wellbeing can fix',
    body: 'A wellbeing programme will not solve chronic underfunding or a broken rota. We will tell you plainly which pressures we can help with and which need an operational answer instead.',
  },
];

/**
 * Trust section. Deliberately modest — no invented credentials, client counts,
 * years-in-business or accreditations. The differentiator claimed here is
 * approach and specialism, which is defensible without a track record.
 */
export function Trust() {
  return (
    <Section tone="paper" labelledBy="trust-heading">
      <Container width="wide">
        <SectionHeading
          id="trust-heading"
          eyebrow="Our approach"
          title="Built With Genuine Understanding of Care Environments"
          lead="Our approach comes from understanding the real, everyday pressures faced by care teams — not a generic corporate wellbeing template."
          align="center"
        />

        <ul className="mt-14 grid gap-5 lg:grid-cols-3">
          {pillars.map((pillar, i) => (
            <li key={pillar.title} className="flex">
              <Reveal delay={i * 90} className="flex w-full">
                <Card tone="warm" className="flex h-full flex-col gap-4 p-6 sm:p-8">
                  <span
                    aria-hidden="true"
                    className="flex size-11 items-center justify-center rounded-xl bg-white/[0.06] text-mint-300"
                  >
                    <Icon name={pillar.icon} className="size-5.5" />
                  </span>
                  <h3 className="text-display-md">{pillar.title}</h3>
                  <p className="text-[0.9375rem] leading-relaxed text-lumen-soft">{pillar.body}</p>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-8">
          <DataHandling />
        </Reveal>
      </Container>
    </Section>
  );
}

/**
 * GDPR / confidentiality statement. Care providers ask about this early, and
 * answering it before they have to ask builds trust fast in this sector.
 */
export function DataHandling() {
  const commitments = [
    'Individual responses are never shared with your management team',
    'Results are reported in aggregate, with a minimum group size to prevent identification',
    'We act as data processor; your organisation remains the data controller',
    'Data is held in the UK, and deleted or returned at the end of the engagement',
    'Staff are told what we collect, why, and who sees it — before they take part',
    'No staff member is required to take part in any assessment',
  ];

  return (
    <div className="overflow-hidden rounded-lg border border-mint-300/25 bg-mint-400/10 md:grid md:grid-cols-[1fr_1.15fr]">
      <div className="p-6 sm:p-8">
        <span
          aria-hidden="true"
          className="flex size-11 items-center justify-center rounded-xl bg-mint-500 text-ink"
        >
          <Icon name="lock" className="size-5.5" />
        </span>
        <h3 className="mt-5 text-display-md">How we handle staff wellbeing data</h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-lumen-soft">
          Staff will only be honest with us if they trust what happens to their answers. So we are
          explicit about it — with them, and with you.
        </p>
        <ButtonLink
          href="/privacy#wellbeing-data"
          variant="ghost"
          size="md"
          withArrow
          className="mt-5"
        >
          Read our data commitments
        </ButtonLink>
      </div>

      <ul className="grid gap-px bg-mint-300/25 sm:grid-cols-2 md:border-l md:border-mint-300/25">
        {commitments.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 bg-abyss/70 p-5 text-[0.875rem] leading-relaxed text-mint-300"
          >
            <Icon name="check" className="mt-0.5 size-4 shrink-0 text-mint-300" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
