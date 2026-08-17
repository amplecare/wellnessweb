import type { IconName } from '@/components/Icons';
import { Icon } from '@/components/Icons';
import { ButtonLink } from '@/components/ui/Button';
import { ArcField } from '@/components/ui/Decor';
import { Reveal } from '@/components/ui/Reveal';
import { Container, Eyebrow, Section } from '@/components/ui/Section';

const steps: readonly { title: string; body: string; icon: IconName; output: string }[] = [
  {
    title: 'Wellbeing Assessment',
    body: 'We measure key wellbeing indicators across your workforce, tailored to care settings — reaching night, bank and part-time staff, not just those on days.',
    icon: 'clipboard',
    output: 'Confidential staff assessment',
  },
  {
    title: 'Insight Report',
    body: "A clear, jargon-free report identifying what's really affecting your team, broken down by site, role and shift pattern.",
    icon: 'chart',
    output: 'Written findings, not a dashboard',
  },
  {
    title: 'Improvement Plan',
    body: 'Practical, achievable recommendations — not generic advice. Named actions, named owners, target dates, agreed measures.',
    icon: 'compass',
    output: 'Actions your managers can start Monday',
  },
  {
    title: 'Ongoing Support',
    body: 'We help you embed healthier practices, with check-ins over time so the change holds after we leave.',
    icon: 'link',
    output: 'Re-measurement that proves movement',
  },
];

/**
 * The process, as a numbered editorial sequence on a full-bleed green band.
 *
 * Green gets one confident, architectural moment on the page here — the brief asks
 * for the palette used deliberately, and a secondary colour that only ever appears
 * as a 2px accent is not being used, it is being decorated with.
 */
export function Solution() {
  return (
    <Section
      id="how-it-works"
            labelledBy="solution-heading"
      size="roomy"
      className="overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0" />
      <div aria-hidden="true" className="absolute inset-0 text-lumen/[0.035]" />
      <ArcField className="absolute -left-40 top-1/4 h-[40rem] w-[40rem] opacity-60" />

      <Container width="wide" className="relative">
        <div className="max-w-4xl">
          <Eyebrow tone="mint">How it works</Eyebrow>
          <h2 id="solution-heading" className="mt-6 text-display-2xl text-lumen">
            Four steps. Each one hands you something you can{' '}
            <span className="text-aurora text-mint-300">actually use</span>.
          </h2>
          <p className="mt-7 max-w-2xl text-lead text-mint-300/85">
            Evidence, then a plan, then a change your staff notice on shift. Nothing theoretical,
            and nothing that assumes a nine-to-five workforce.
          </p>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-lg border border-white/15 bg-white/15 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="bg-mint-900/55 backdrop-blur-sm">
              <Reveal delay={i * 90}>
                <div className="flex h-full flex-col p-7 sm:p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <span
                      aria-hidden="true"
                      className="font-display text-[2.75rem] font-semibold leading-none tracking-[-0.04em] text-lumen/25"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-mint-300/25 bg-mint-300/10 text-mint-300">
                      <Icon name={step.icon} className="size-5" />
                    </span>
                  </div>

                  <h3 className="mt-7 text-display-md text-lumen">{step.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-mint-300/80">
                    {step.body}
                  </p>

                  <p className="mt-auto flex items-start gap-2 border-t border-white/15 pt-5 text-[0.8125rem] font-medium leading-snug text-mint-300">
                    <Icon name="check" className="mt-0.5 size-3.5 shrink-0" />
                    {step.output}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-10">
          <div className="flex flex-col items-start gap-7 rounded-lg border border-white/15 bg-white/[0.07] p-7 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:p-9">
            <div className="max-w-2xl">
              <h3 className="text-display-md text-lumen">Practical, not theoretical</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-mint-300/85">
                Most wellbeing consultancies hand you a diagnosis. We stay until something has
                actually changed — on the rota, in the staff room, and in your retention figures.
              </p>
            </div>
            <ButtonLink href="#the-report" variant="mint" size="md" withArrow className="shrink-0">
              See the report
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
