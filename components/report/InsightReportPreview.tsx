'use client';

import { useId, useState } from 'react';
import { Icon } from '@/components/Icons';
import { PlaceholderTag } from '@/components/ui/PlaceholderNotice';
import { byShift, finding, indicators, reportMeta, wellbeingIndex } from '@/content/report';
import { cn } from '@/lib/cn';

/**
 * The signature element of the site: a preview of the actual deliverable.
 *
 * Built against the project's dataviz standard:
 * - Forms picked by job. The index is a HERO FIGURE + meter (a single value is not
 * a one-bar chart). Shift pattern is EMPHASIS (the story is one bar — nights),
 * not four categorical hues. Baseline→current is a DUMBBELL in one hue, two shades.
 * - Mark colours verified for contrast against both surfaces before use. The
 * de-emphasis grey (#918A9C) is the lightest step clearing 3:1, so it stays
 * recessive without relying on the labels-only relaxation.
 * - Every chart has a table-view twin; nothing is gated behind hover.
 * - Hero figure is sans, with proportional (not tabular) figures.
 * - Sample data is flagged visibly — see content/report.ts.
 */

const C = {
  // This card renders as a white document on the dark canvas — a report should look
  // like the thing it is. Every mark below is therefore reasoned against WHITE, not
  // against the void, and each is verified by `npm run contrast`.
  accent: 'var(--color-violet-600)', // 4.43:1 on white — primary value mark
  accentDeep: 'var(--color-violet-800)', // 8.59:1 on white — current-value marker
  baseline: 'var(--color-chart-baseline)', // 3.72:1 on white — the earlier reading
  muted: 'var(--color-ink-muted)', // 6.13:1 on white — de-emphasised marks
  positive: 'var(--color-mint-700)', // 5.30:1 on white — improvement text
  track: 'var(--color-violet-100)', // recessive rail, exempt under SC 1.4.11
  grid: 'var(--color-line)', // hairline, exempt under SC 1.4.11
} as const;

export function InsightReportPreview() {
  const [showTable, setShowTable] = useState(false);
  const tableId = useId();

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white shadow-glass-lg">
      {/* ---- Report chrome. Reads as a document, not a web widget. ---- */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line bg-paper-lumen px-5 py-4 sm:px-7">
        <div className="flex items-center gap-3.5">
          <span
            aria-hidden="true"
            className="flex size-9 items-center justify-center rounded-lg bg-violet-600 text-white"
          >
            <Icon name="chart" className="size-4.5" />
          </span>
          <div>
            <p className="text-[0.9375rem] font-semibold leading-tight text-ink">
              Wellbeing Insight Report
            </p>
            <p className="nums mt-0.5 text-[0.75rem] text-ink-muted">
              {reportMeta.serviceName} · {reportMeta.staffCovered} staff · {reportMeta.responseRate}
              % response
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <PlaceholderTag>Sample data</PlaceholderTag>
          <button
            type="button"
            onClick={() => setShowTable((v) => !v)}
            aria-expanded={showTable}
            aria-controls={tableId}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line-strong px-3 text-[0.75rem] font-semibold text-ink-soft transition-colors hover:border-violet-400 hover:text-ink"
          >
            <Icon name="clipboard" className="size-3.5" />
            {showTable ? 'Hide data table' : 'View as table'}
          </button>
        </div>
      </div>

      <div className="grid gap-px bg-violet-100 lg:grid-cols-[0.82fr_1.18fr]">
        <HeadlineIndex />
        <ByShiftChart />
      </div>

      <div className="grid gap-px border-t border-line bg-violet-100 lg:grid-cols-[1.18fr_0.82fr]">
        <IndicatorDumbbell />
        <Finding />
      </div>

      {showTable ? <DataTable id={tableId} /> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero figure + meter + sparkline */
/* ------------------------------------------------------------------ */

function HeadlineIndex() {
  const pct = (wellbeingIndex.value / wellbeingIndex.max) * 100;
  const basePct = (wellbeingIndex.baseline / wellbeingIndex.max) * 100;

  return (
    <section aria-labelledby="rp-index" className="bg-white p-5 sm:p-7">
      <h3 id="rp-index" className="text-eyebrow uppercase text-ink-muted">
        Overall wellbeing index
      </h3>

      {/* Hero figure: sans, proportional figures (tabular would look loose here). */}
      <div className="mt-4 flex items-end gap-3">
        <span className="font-sans text-[3.5rem] font-semibold leading-none tracking-[-0.03em] text-ink">
          {wellbeingIndex.value}
        </span>
        <span className="pb-2 text-[1.125rem] font-medium text-ink-muted">
          / {wellbeingIndex.max}
        </span>
        <span className="mb-2 ml-auto inline-flex items-center gap-1 rounded-full bg-mint-100 px-2.5 py-1 text-[0.75rem] font-semibold text-mint-700">
          <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true" fill="currentColor">
            <path d="M6 2l4 5H2z" />
          </svg>
          <span className="nums">+{wellbeingIndex.delta}</span>
          <span className="font-medium">vs baseline</span>
        </span>
      </div>

      {/* Meter: track is a lighter step of the same ramp, with the baseline marked. */}
      <div className="mt-5">
        <div
          className="relative h-2.5 w-full overflow-hidden rounded-full"
          style={{ backgroundColor: C.track }}
          role="img"
          aria-label={`Wellbeing index ${wellbeingIndex.value} out of ${wellbeingIndex.max}, up from a baseline of ${wellbeingIndex.baseline}.`}
        >
          <div
            className="h-full rounded-full"
            style={{ width: `${pct}%`, backgroundColor: C.accent }}
          />
          {/* Baseline tick, 2px surface-coloured so it separates without a stroke. */}
          <span
            aria-hidden="true"
            className="absolute inset-y-0 w-0.5 bg-white"
            style={{ left: `${basePct}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between text-[0.75rem] text-ink-muted">
          <span className="nums">baseline {wellbeingIndex.baseline}</span>
          <span className="font-medium text-mint-700">{wellbeingIndex.band}</span>
        </div>
      </div>

      <Sparkline />
    </section>
  );
}

function Sparkline() {
  const data = wellbeingIndex.trend;
  const w = 220;
  const h = 44;
  const min = Math.min(...data) - 3;
  const max = Math.max(...data) + 3;
  const x = (i: number) => (i / (data.length - 1)) * w;
  const y = (v: number) => h - ((v - min) / (max - min)) * h;
  const path = data.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i)} ${y(v)}`).join(' ');
  const lastX = x(data.length - 1);
  const lastY = y(data[data.length - 1]);

  return (
    <figure className="mt-6 border-t border-line pt-5">
      <figcaption className="text-[0.75rem] text-ink-muted">
        Index trend across the programme
      </figcaption>
      <svg
        viewBox={`0 0 ${w} ${h + 6}`}
        className="mt-2 h-12 w-full"
        role="img"
        aria-label={`Index rose from ${data[0]} to ${data[data.length - 1]} across the programme.`}
        preserveAspectRatio="none"
      >
        {/* De-emphasis line for history, accent dot for the current period. */}
        <path
          d={path}
          fill="none"
          stroke={C.muted}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* 2px surface ring keeps the end marker legible where it meets the line. */}
        <circle cx={lastX} cy={lastY} r={6} fill="#ffffff" />
        <circle cx={lastX} cy={lastY} r={4} fill={C.accent} />
      </svg>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Emphasis bars — the story is one bar, so only one bar is coloured */
/* ------------------------------------------------------------------ */

function ByShiftChart() {
  const [hovered, setHovered] = useState<string | null>(null);
  const max = 100;

  return (
    <section aria-labelledby="rp-shift" className="bg-white p-5 sm:p-7">
      <h3 id="rp-shift" className="text-eyebrow uppercase text-ink-muted">
        Wellbeing score by shift pattern
      </h3>
      <p className="mt-2 text-[0.8125rem] text-ink-soft">
        Higher is better. Night shift is highlighted because it is the finding.
      </p>

      <ul className="mt-6 flex flex-col gap-3.5">
        {byShift.map((row) => {
          const isHot = row.emphasis;
          const active = hovered === row.label;
          return (
            <li
              key={row.label}
              onMouseEnter={() => setHovered(row.label)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(row.label)}
              onBlur={() => setHovered(null)}
              tabIndex={0}
              className="group relative grid grid-cols-[7.5rem_1fr_2.25rem] items-center gap-3 rounded-md focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700 sm:grid-cols-[8.5rem_1fr_2.5rem]"
            >
              <span
                className={cn(
                  'truncate text-[0.8125rem]',
                  isHot ? 'font-semibold text-ink' : 'text-ink-soft'
                )}
              >
                {row.label}
              </span>

              {/* Bar: 16px thick (well under the 24px cap), 4px rounded data-end,
 square at the baseline, grown from a single baseline. */}
              <span className="relative block h-4">
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-px"
                  style={{ backgroundColor: C.grid }}
                />
                <span
                  className="absolute inset-y-0 left-0 rounded-r-[4px] transition-[width,filter] duration-700 ease-[var(--ease-out-soft)]"
                  style={{
                    width: `${(row.score / max) * 100}%`,
                    backgroundColor: isHot ? C.accent : C.muted,
                    filter: active ? 'brightness(0.9)' : undefined,
                  }}
                />
              </span>

              <span
                className={cn(
                  'nums text-right text-[0.8125rem] tabular-nums',
                  isHot ? 'font-semibold text-ink' : 'text-ink-soft'
                )}
              >
                {row.score}
              </span>

              {active ? (
                <span
                  role="status"
                  className="pointer-events-none absolute -top-9 left-[7.5rem] z-10 whitespace-nowrap rounded-lg bg-paper-lumen px-2.5 py-1.5 text-[0.75rem] font-medium text-ink shadow-glass sm:left-[8.5rem]"
                >
                  {row.label}: <span className="nums">{row.score}</span> / 100
                </span>
              ) : null}
            </li>
          );
        })}
      </ul>

      <p className="mt-5 flex items-start gap-2 border-t border-line pt-4 text-[0.8125rem] leading-relaxed text-ink-soft">
        <Icon name="trendDown" className="mt-0.5 size-4 shrink-0 text-violet-700" />
        <span>
          Nights sit <strong className="font-semibold text-ink">21 points</strong> below early
          shift — the single widest gap in the service.
        </span>
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Dumbbell — before → after, one hue, two shades */
/* ------------------------------------------------------------------ */

function IndicatorDumbbell() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section aria-labelledby="rp-indicators" className="bg-white p-5 sm:p-7">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h3 id="rp-indicators" className="text-eyebrow uppercase text-ink-muted">
          Movement by indicator
        </h3>
        {/* Two series, so a legend is always present — identity never rests on colour alone. */}
        <ul className="flex items-center gap-4 text-[0.75rem] text-ink-soft">
          <li className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="size-2.5 rounded-full"
              style={{ backgroundColor: C.baseline }}
            />
            Baseline
          </li>
          <li className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="size-2.5 rounded-full"
              style={{ backgroundColor: C.accentDeep }}
            />
            6 months
          </li>
        </ul>
      </div>

      <ul className="mt-6 flex flex-col gap-4">
        {indicators.map((row) => {
          const active = hovered === row.label;
          const gain = row.current - row.baseline;
          return (
            <li
              key={row.label}
              onMouseEnter={() => setHovered(row.label)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(row.label)}
              onBlur={() => setHovered(null)}
              tabIndex={0}
              className="relative rounded-md focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-700"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-[0.8125rem] text-ink-soft">{row.label}</span>
                <span className="nums shrink-0 text-[0.8125rem] font-semibold tabular-nums text-mint-700">
                  +{gain}
                </span>
              </div>

              <div className="relative mt-2 h-3.5">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
                  style={{ backgroundColor: C.grid }}
                />
                {/* Connector carries the direction of travel. */}
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 h-[3px] -translate-y-1/2 rounded-full transition-all duration-700 ease-[var(--ease-out-soft)]"
                  style={{
                    left: `${row.baseline}%`,
                    width: `${row.current - row.baseline}%`,
                    backgroundColor: C.baseline,
                    opacity: 0.45,
                  }}
                />
                {/* Markers ≥8px with a 2px surface ring so they stay legible when close. */}
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white transition-all duration-700"
                  style={{ left: `${row.baseline}%`, backgroundColor: C.baseline }}
                />
                <span
                  aria-hidden="true"
                  className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white transition-all duration-700"
                  style={{ left: `${row.current}%`, backgroundColor: C.accentDeep }}
                />
              </div>

              {active ? (
                <span
                  role="status"
                  className="pointer-events-none absolute -top-8 left-0 z-10 whitespace-nowrap rounded-lg bg-paper-lumen px-2.5 py-1.5 text-[0.75rem] font-medium text-ink shadow-glass"
                >
                  <span className="nums">{row.baseline}</span> →{' '}
                  <span className="nums">{row.current}</span> out of 100
                </span>
              ) : null}
            </li>
          );
        })}
      </ul>

      <p className="mt-5 border-t border-line pt-4 text-[0.75rem] text-ink-muted">
        Scored 0–100 from the confidential staff assessment. Movement shown against the
        service&rsquo;s own baseline, not an external benchmark.
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* The written finding — what providers actually pay for */
/* ------------------------------------------------------------------ */

function Finding() {
  return (
    <section aria-labelledby="rp-finding" className="flex flex-col bg-white p-5 sm:p-7">
      <h3 id="rp-finding" className="text-eyebrow uppercase text-mint-700">
        What this tells you
      </h3>

      <p className="mt-4 font-display text-[1.0625rem] font-semibold leading-snug text-ink">
        {finding.headline}
      </p>
      <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-soft">{finding.body}</p>

      <div className="mt-5 border-t border-violet-400/25 pt-4">
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-mint-700">
          Recommended actions
        </p>
        <ul className="mt-3 flex flex-col gap-2.5">
          {finding.actions.map((action) => (
            <li
              key={action}
              className="flex items-start gap-2 text-[0.8125rem] leading-snug text-ink-soft"
            >
              <Icon name="check" className="mt-0.5 size-3.5 shrink-0 text-mint-700" />
              {action}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Table view — the WCAG-clean twin. Nothing is hover-gated. */
/* ------------------------------------------------------------------ */

function DataTable({ id }: { id: string }) {
  return (
    <div id={id} className="border-t border-line bg-paper-lumen p-5 sm:p-7">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-left text-[0.8125rem]">
          <caption className="mb-4 text-left text-[0.8125rem] text-ink-soft">
            Sample report figures, shown as a table. Scores are out of 100; higher is better.
          </caption>
          <thead>
            <tr className="border-b border-line-strong">
              <th scope="col" className="py-2 pr-4 font-semibold text-ink">
                Measure
              </th>
              <th scope="col" className="py-2 pr-4 text-right font-semibold text-ink">
                Baseline
              </th>
              <th scope="col" className="py-2 pr-4 text-right font-semibold text-ink">
                6 months
              </th>
              <th scope="col" className="py-2 text-right font-semibold text-ink">
                Change
              </th>
            </tr>
          </thead>
          <tbody className="text-ink-soft">
            <tr className="border-b border-line">
              <th scope="row" className="py-2.5 pr-4 font-medium text-ink">
                Overall wellbeing index
              </th>
              <td className="nums py-2.5 pr-4 text-right tabular-nums">
                {wellbeingIndex.baseline}
              </td>
              <td className="nums py-2.5 pr-4 text-right tabular-nums">{wellbeingIndex.value}</td>
              <td className="nums py-2.5 text-right font-semibold tabular-nums text-mint-700">
                +{wellbeingIndex.delta}
              </td>
            </tr>
            {indicators.map((row) => (
              <tr key={row.label} className="border-b border-line">
                <th scope="row" className="py-2.5 pr-4 font-normal">
                  {row.label}
                </th>
                <td className="nums py-2.5 pr-4 text-right tabular-nums">{row.baseline}</td>
                <td className="nums py-2.5 pr-4 text-right tabular-nums">{row.current}</td>
                <td className="nums py-2.5 text-right font-semibold tabular-nums text-mint-700">
                  +{row.current - row.baseline}
                </td>
              </tr>
            ))}
            {byShift.map((row) => (
              <tr key={row.label} className="border-b border-line last:border-0">
                <th scope="row" className="py-2.5 pr-4 font-normal">
                  {row.label} (current)
                </th>
                <td className="py-2.5 pr-4 text-right text-ink-muted">—</td>
                <td className="nums py-2.5 pr-4 text-right tabular-nums">{row.score}</td>
                <td className="py-2.5 text-right text-ink-muted">—</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
