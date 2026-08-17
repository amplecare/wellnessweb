import { Icon } from '@/components/Icons';
import { ButtonLink } from '@/components/ui/Button';
import { ArcField, ArcUnderline } from '@/components/ui/Decor';
import { Container } from '@/components/ui/Section';
import { byShift, wellbeingIndex } from '@/content/report';
import { cta, site } from '@/content/site';

/**
 * Hero.
 *
 * Three design decisions carry this section:
 * 1. Scale contrast. A very large Inter headline against 11px tracked-out
 * kickers and small captions. Confidence comes from the gap between the two,
 * not from everything being medium-sized.
 * 2. The visual is a fragment of the actual deliverable, not a photograph — the
 * product is on screen inside two seconds.
 * 3. The arc motif runs behind everything at architectural scale, so the brand
 * is felt before any copy is read.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-56 -top-72 size-[52rem] rounded-full bg-violet-500/25 blur-3xl" />
        <div className="absolute -right-48 top-10 size-[38rem] rounded-full bg-mint-400/20 blur-3xl" />
        <ArcField className="absolute -right-24 -top-40 h-[46rem] w-[46rem] opacity-70" />
      </div>

      <Container width="wide" className="relative">
        <div className="grid items-center gap-14 pb-16 pt-14 sm:pb-20 sm:pt-16 lg:grid-cols-[1.06fr_0.94fr] lg:gap-16 lg:pb-24 lg:pt-20">
          <div>
            <p className="flex items-center gap-3">
              <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-eyebrow uppercase text-mint-300">
                <Icon name="stethoscope" className="size-3.5" />
                For UK care providers
              </span>
            </p>

            {/* The headline. Three clauses, each on its own line, rising in
 sequence. The gradient-filled phrase is the one typographic
 flourish on the page — used once, so it lands. */}
            <h1 id="hero-heading" className="mt-8 text-hero text-lumen">
              <span>Reduce burnout.</span>
              <span className="relative text-mint-300">
                <span className="text-aurora">Improve</span> wellbeing.
                <span className="absolute -bottom-1 left-0 h-3 w-[min(100%,11ch)] text-mint-300">
                  <ArcUnderline />
                </span>
              </span>
              <span>Build stronger teams.</span>
            </h1>

            <p className="mt-9 max-w-lg text-lead text-lumen-soft">
              Ample Care helps UK care providers assess, improve and maintain staff wellbeing
              through practical programmes — built for the realities of care work, not adapted from
              corporate wellbeing.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink
                href="/book-consultation"
                size="lg"
                withArrow
                className="w-full sm:w-auto"
              >
                {cta.primary}
              </ButtonLink>
              <ButtonLink
                href="#how-it-works"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                {cta.secondary}
              </ButtonLink>
            </div>

            {/* Small, quiet counterweight to the very large headline. */}
            <dl className="mt-11 grid max-w-lg grid-cols-2 gap-x-8 gap-y-5 border-t border-white/10 pt-8 sm:grid-cols-3">
              {[
                { t: `From £${site.priceFrom}`, d: 'per staff member' },
                { t: '30 minutes', d: 'free consultation' },
                { t: 'No obligation', d: 'and no sales pressure' },
              ].map((item) => (
                <div key={item.t}>
                  <dt className="font-display text-[1.0625rem] font-semibold tracking-[-0.02em] text-lumen">
                    {item.t}
                  </dt>
                  <dd className="mt-0.5 text-[0.8125rem] leading-snug text-lumen-muted">
                    {item.d}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <HeroReportCard />
        </div>
      </Container>

      <TrustStrip />
    </section>
  );
}

/**
 * A live fragment of the insight report, using the same figures, marks and colour
 * discipline as the full preview further down. Purpose: prove the product exists
 * before the visitor has scrolled.
 */
function HeroReportCard() {
  const worst = byShift.reduce((a, b) => (b.score < a.score ? b : a));
  const best = byShift.reduce((a, b) => (b.score > a.score ? b : a));

  return (
    <div className="relative lg:pl-4">
      {/* Stacked, slightly rotated backing panels — depth without a photograph. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-7 -bottom-3.5 h-full rounded-lg border border-white/8 bg-white/[0.04]"
        style={{ transform: 'rotate(2deg)' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-3.5 -bottom-1.5 h-full rounded-lg border border-white/10 bg-white/[0.07]"
        style={{ transform: 'rotate(-1.1deg)' }}
      />

      <div className="glass-raised halo relative overflow-hidden rounded-lg">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/[0.05] px-5 py-4">
          <p className="flex items-center gap-2.5 text-[0.8125rem] font-semibold text-lumen">
            <Icon name="chart" className="size-4 text-violet-300" />
            Wellbeing Insight Report
          </p>
          <span className="rounded-full border border-mint-300/30 bg-mint-400/10 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-mint-300">
            Sample
          </span>
        </div>

        <div className="p-5 sm:p-7">
          <p className="text-eyebrow uppercase text-lumen-muted">Overall wellbeing index</p>

          <div className="mt-3.5 flex items-end gap-3">
            {/* Hero figure: sans, proportional figures. Tabular would look loose here. */}
            <span className="font-sans text-[3.5rem] font-semibold leading-[0.85] tracking-[-0.045em] text-lumen">
              {wellbeingIndex.value}
            </span>
            <span className="pb-1 text-base font-medium text-lumen-muted">
              / {wellbeingIndex.max}
            </span>
            <span className="mb-1 ml-auto inline-flex items-center gap-1 rounded-full bg-mint-400/10 px-2.5 py-1 text-[0.75rem] font-semibold text-mint-300">
              <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true" fill="currentColor">
                <path d="M6 2l4 5H2z" />
              </svg>
              <span className="nums">+{wellbeingIndex.delta}</span>
            </span>
          </div>

          <div
            className="relative mt-4 h-2 w-full overflow-hidden rounded-full bg-white/[0.06]"
            role="img"
            aria-label={`Sample wellbeing index ${wellbeingIndex.value} out of ${wellbeingIndex.max}, up ${wellbeingIndex.delta} points from baseline.`}
          >
            <div
              className="h-full rounded-full bg-violet-600"
              style={{ width: `${wellbeingIndex.value}%` }}
            />
          </div>

          <div className="mt-7 border-t border-white/10 pt-6">
            <p className="text-eyebrow uppercase text-lumen-muted">By shift pattern</p>
            <ul className="mt-4 flex flex-col gap-3">
              {byShift.map((row) => (
                <li
                  key={row.label}
                  className="grid grid-cols-[5.5rem_1fr_1.75rem] items-center gap-3"
                >
                  <span
                    className={
                      row.emphasis
                        ? 'truncate text-[0.75rem] font-semibold text-lumen'
                        : 'truncate text-[0.75rem] text-lumen-soft'
                    }
                  >
                    {row.label}
                  </span>
                  <span className="relative block h-3">
                    <span
                      className="absolute inset-y-0 left-0 rounded-r-[4px]"
                      style={{
                        width: `${row.score}%`,
                        backgroundColor: row.emphasis
                          ? 'var(--color-chart-accent)'
                          : 'var(--color-chart-muted)',
                      }}
                    />
                  </span>
                  <span
                    className={
                      row.emphasis
                        ? 'nums text-right text-[0.75rem] font-semibold text-lumen'
                        : 'nums text-right text-[0.75rem] text-lumen-soft'
                    }
                  >
                    {row.score}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="flex items-start gap-2.5 border-t border-white/10 bg-white/[0.06] px-5 py-4 text-[0.75rem] leading-relaxed text-lumen sm:px-7">
          <Icon name="spark" className="mt-0.5 size-3.5 shrink-0 text-violet-300" />
          <span>
            <strong className="font-semibold">Finding:</strong> {worst.label.toLowerCase()} sits{' '}
            {best.score - worst.score} points below {best.label.toLowerCase()} — the widest gap in
            the service.
          </span>
        </p>
      </div>
    </div>
  );
}

/** Sector iconography and factual statements — no fabricated client logos. */
function TrustStrip() {
  const sectors = [
    { icon: 'heart', label: 'Residential care homes' },
    { icon: 'stethoscope', label: 'Nursing homes' },
    { icon: 'users', label: 'Domiciliary care agencies' },
    { icon: 'link', label: 'Supported living providers' },
  ] as const;

  return (
    <div className="relative border-y border-white/10 bg-white/[0.04]">
      <Container width="wide">
        <div className="flex flex-col gap-6 py-9 lg:flex-row lg:items-center lg:gap-12">
          <p className="shrink-0 text-eyebrow uppercase text-lumen-muted">
            Built for care providers across the UK
          </p>
          <ul className="grid grow grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            {sectors.map((s) => (
              <li key={s.label} className="flex items-center gap-2.5">
                <Icon name={s.icon} className="size-5 shrink-0 text-violet-500" />
                <span className="text-[0.8125rem] font-medium leading-snug text-lumen-soft">
                  {s.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}
