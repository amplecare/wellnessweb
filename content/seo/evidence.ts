import { sectorStats, type Stat } from '@/content/stats';

/**
 * The citation registry. Every figure that appears anywhere on the site lives here.
 *
 * ## Why this is a registry and not just prose
 *
 * Thirty landing pages is thirty opportunities for a plausible-sounding number to
 * appear without a source. Pages reference a figure by its `id`; `getEvidence` throws
 * if the id does not exist, so a page cannot ship a statistic that has not been
 * registered with a named publisher, a URL and a reporting period.
 *
 * ## Rules
 *
 * - **Never add a figure without `sourceUrl` and `period`.** If it cannot be sourced,
 *   the claim does not ship — write around it instead.
 * - **Never present a correlation as a cause.** Wellbeing pressure and turnover move
 *   together; saying one *causes* the other is a claim this evidence cannot support,
 *   and for a healthcare service that is a CAP Code problem as well as a credibility
 *   one. Use "linked to", "associated with", "one factor in".
 * - **Re-verify annually.** Skills for Care publishes each October. Update `period`
 *   and `sourceUrl` together, never one alone.
 *
 * Last verified: July 2026.
 */
export interface Evidence extends Stat {
  id: string;
  /** How the figure may be used in copy, if it needs framing. */
  framing?: string;
}

const registry: Evidence[] = [
  {
    id: 'turnover-rate',
    ...sectorStats[0],
  },
  {
    id: 'sickness-absence',
    ...sectorStats[1],
    framing:
      'An average, not a target. Use to show scale, never to imply a provider above it is failing.',
  },
  {
    id: 'vacancies',
    ...sectorStats[2],
    framing: 'Sector-wide vacancy pressure. Context for recruitment difficulty, not a prediction.',
  },
];

/**
 * Throws on an unknown id rather than returning undefined.
 *
 * Deliberate: a missing citation should break the page loudly at build time, not
 * render a sentence with a blank where the source should be.
 */
export function getEvidence(id: string): Evidence {
  const found = registry.find((item) => item.id === id);
  if (!found) {
    throw new Error(
      `Unregistered statistic "${id}". Add it to content/seo/evidence.ts with a named source, URL and reporting period — or remove the claim.`
    );
  }
  return found;
}

export function allEvidence(): Evidence[] {
  return [...registry];
}
