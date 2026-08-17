import { Icon, type IconName } from '@/components/Icons';
import { Counter } from '@/components/ui/Counter';
import { Illustration } from '@/components/ui/Illustration';
import { Reveal } from '@/components/ui/Reveal';
import { Container, Section, Eyebrow } from '@/components/ui/Section';
import { sectorStats } from '@/content/stats';

const problems: readonly { icon: IconName; title: string; body: string }[] = [
  {
    icon: 'battery',
    title: 'Burnout and compassion fatigue',
    body: 'The people who care most are the first to run empty — and the last to say so.',
  },
  {
    icon: 'trendDown',
    title: 'Rising sickness absence',
    body: 'Short-notice absence forces last-minute cover and pushes agency spend up.',
  },
  {
    icon: 'clock',
    title: 'Low morale and disengagement',
    body: 'Handovers get quieter, standards slip quietly, and nobody names the reason.',
  },
  {
    icon: 'doorOut',
    title: 'High turnover and recruitment cost',
    body: 'Every experienced carer who leaves takes relationships and knowledge with them.',
  },
  {
    icon: 'weight',
    title: 'Pressure on the staff who stay',
    body: 'Those left behind absorb the gap — which is how one resignation becomes three.',
  },
];

/**
 * The problem, told at editorial scale.
 *
 * The old version was a heading beside a list of five equal cards. This leads with
 * a full-width statement set very large, then drops to a tight two-column body —
 * the scale change is what makes it read as a magazine spread rather than a
 * feature grid.
 */
export function Problem() {
  return (
    <Section tone="paper" labelledBy="problem-heading" size="roomy">
      <Container width="wide">
        <div className="max-w-4xl">
          <Eyebrow>The problem</Eyebrow>
          <h2 id="problem-heading" className="mt-6 text-display-2xl text-lumen">
            Your care team carries the weight of your whole organisation
            <span className="text-lumen-soft">.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-x-16 gap-y-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="max-w-xl text-lead text-lumen-soft">
              Care professionals give everything to support others — often at the cost of their own
              wellbeing. Stress, exhaustion and emotional pressure build quietly until they surface
              as absence, turnover, or falling standards of care.
            </p>

            <ul className="mt-10 flex flex-col">
              {problems.map((problem, i) => (
                <li key={problem.title}>
                  <Reveal delay={i * 60}>
                    <div className="group flex items-start gap-5 border-t border-white/10 py-5 transition-colors duration-300 hover:border-violet-400/25">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-mint-300 transition-colors duration-300 group-hover:bg-violet-600 group-hover:text-lumen"
                      >
                        <Icon name={problem.icon} className="size-5" />
                      </span>
                      <div>
                        <h3 className="text-[1.0625rem] font-semibold leading-snug text-lumen">
                          {problem.title}
                        </h3>
                        <p className="mt-1 text-[0.9375rem] leading-relaxed text-lumen-soft">
                          {problem.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>

          <Reveal className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <StatPanel />
            {/* The figures above are bleak by necessity; the drawing is the turn
 towards support, so the column does not end on the problem. */}
            <Illustration
              src="/images/illustration-support.svg"
              alt="Abstract drawing of a care team gathered beneath a sheltering arc"
              aspect="4/3"
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/**
 * Sourced sector data. Every figure is attributed inline and links to the
 * publisher — the brief requires cited, not invented, statistics here.
 */
function StatPanel() {
  const [headline, ...rest] = sectorStats;

  return (
    <figure className="overflow-hidden rounded-lg bg-deep text-lumen-soft">
      <div aria-hidden="true" className="absolute inset-0" />

      <div className="relative p-7 sm:p-9">
        <Eyebrow tone="mint">The scale of it</Eyebrow>

        {/* Counter renders the true value as text first and only animates once JS
 confirms support and motion is allowed — never a stray 0. */}
        <p className="mt-6 font-display text-[clamp(3.5rem,2.4rem+4.6vw,5.25rem)] font-semibold leading-[0.85] tracking-[-0.045em] text-lumen">
          <Counter value={24.7} decimals={1} suffix="%" />
        </p>
        <p className="mt-5 max-w-xs text-[0.9375rem] leading-relaxed text-lumen-soft">
          {headline.label}, {headline.period}.
        </p>

        <dl className="mt-9 grid grid-cols-2 gap-6 border-t border-violet-400/25 pt-7">
          {rest.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-[1.875rem] font-semibold leading-none tracking-[-0.03em] text-mint-300">
                  {stat.value}
                </span>
                <span className="mt-2.5 block text-[0.8125rem] leading-snug text-lumen-soft">
                  {stat.label}, {stat.period}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <figcaption className="mt-8 border-t border-violet-400/25 pt-5 text-[0.75rem] leading-relaxed text-lumen-soft">
          Source:{' '}
          <a
            href={headline.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-draw font-medium text-mint-300"
          >
            Skills for Care,{' '}
            <cite className="not-italic">
              The state of the adult social care sector and workforce in England
            </cite>
          </a>
          . Figures refer to England and to the periods shown.
        </figcaption>
      </div>
    </figure>
  );
}
