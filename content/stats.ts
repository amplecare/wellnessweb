/**
 * Sector statistics used in the Problem section.
 *
 * RULE: every figure here is taken from a named, linkable published source and
 * carries the reporting period it refers to. Nothing on this site invents a
 * statistic. If a figure cannot be sourced, it does not ship.
 *
 * REVIEW BEFORE LAUNCH: Skills for Care publishes annually (usually October).
 * Re-check these against the latest "The state of the adult social care sector
 * and workforce in England" report and update `period` and `sourceUrl` together.
 * Last verified: July 2026, against the 2025 report and Skills for Care's
 * 2025/26 vacancy-rate release.
 */

export type Stat = {
  value: string;
  label: string;
  source: string;
  sourceUrl: string;
  period: string;
};

export const sectorStats: readonly Stat[] = [
  {
    value: '24.7%',
    label: 'Staff turnover across the independent adult social care sector in England',
    source: 'Skills for Care',
    sourceUrl:
      'https://www.skillsforcare.org.uk/Adult-Social-Care-Workforce-Data/Workforce-intelligence/publications/national-information/The-state-of-the-adult-social-care-sector-and-workforce-in-England.aspx',
    period: '2024/25',
  },
  {
    value: '4.8 days',
    label: 'Average sickness absence per employee in adult social care',
    source: 'Skills for Care',
    sourceUrl:
      'https://www.skillsforcare.org.uk/Adult-Social-Care-Workforce-Data/Workforce-intelligence/publications/national-information/The-state-of-the-adult-social-care-sector-and-workforce-in-England.aspx',
    period: '2024/25',
  },
  {
    value: '~96,000',
    label: 'Vacant posts across adult social care in England on any given day',
    source: 'Skills for Care',
    sourceUrl:
      'https://www.skillsforcare.org.uk/Adult-Social-Care-Workforce-Data/Workforce-intelligence/publications/national-information/The-state-of-the-adult-social-care-sector-and-workforce-in-England.aspx',
    period: '2025/26',
  },
] as const;

/** The single headline figure used in the Problem section pull-quote. */
export const headlineStat: Stat = sectorStats[0];
