/**
 * SAMPLE INSIGHT REPORT DATA — ILLUSTRATIVE, NOT REAL CLIENT DATA.
 *
 * This drives the report preview on the home page, which exists to show a
 * prospective client what the actual deliverable looks like. Every surface that
 * renders it carries a visible "sample data" flag.
 *
 * The numbers are internally consistent and plausible for a mid-size residential
 * home, but they are invented for demonstration and must never be presented as
 * findings from a real service. Do not add a real client's figures here — build a
 * separate, permissioned case study instead.
 */

export const reportMeta = {
  serviceName: 'Sample Residential Home',
  staffCovered: 48,
  responseRate: 79,
  period: 'Baseline vs 6-month re-assessment',
} as const;

/** Headline index, 0–100. The one number the report leads with. */
export const wellbeingIndex = {
  value: 62,
  max: 100,
  baseline: 53,
  delta: 9,
  /** Band the value sits in. Drives the meter's label, not its colour alone. */
  band: 'Improving — monitor nights',
  /** 7-point trend, oldest → newest. Feeds the sparkline. */
  trend: [53, 54, 56, 57, 59, 61, 62],
} as const;

/**
 * Wellbeing score by shift pattern. The story is a single bar — nights sit well
 * below everything else — so this renders as EMPHASIS (one accent bar, the rest
 * de-emphasised), not as four categorical hues.
 */
export const byShift: readonly { label: string; score: number; emphasis: boolean }[] = [
  { label: 'Early shift', score: 68, emphasis: false },
  { label: 'Late shift', score: 61, emphasis: false },
  { label: 'Bank staff', score: 58, emphasis: false },
  { label: 'Night shift', score: 47, emphasis: true },
] as const;

/** Baseline → re-assessment per indicator. Rendered as a dumbbell: one hue, two shades. */
export const indicators: readonly {
  label: string;
  baseline: number;
  current: number;
}[] = [
  { label: 'Feeling supported by seniors', baseline: 48, current: 64 },
  { label: 'Confidence raising concerns', baseline: 55, current: 71 },
  { label: 'Recovery between shifts', baseline: 41, current: 55 },
  { label: 'Workload manageability', baseline: 44, current: 52 },
] as const;

/** The written finding. This is what providers actually pay for. */
export const finding = {
  headline: 'Night staff are carrying a disproportionate share of the pressure.',
  body: 'Every indicator improved over six months, but nights improved least and remain 21 points below early shift. Recovery between shifts is the weakest driver, concentrated among staff working three or more consecutive nights. Handover time is the most likely lever: night staff reported the shortest effective handovers and the least contact with seniors.',
  actions: [
    'Extend night handover by 15 minutes, protected on the rota',
    'Rotate a senior onto one night per fortnight',
    'Cap consecutive nights at three where cover allows',
  ],
} as const;
