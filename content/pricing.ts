/**
 * Illustrative pricing tiers.
 *
 * IMPORTANT: these are "from" prices used to make the offer tangible. Every
 * surface that renders them must show the "from" qualifier and the note that the
 * final quote follows a consultation. Confirm the two higher per-staff rates with
 * the client before launch — only the £35 entry point was given in the brief.
 */

export type Tier = {
  id: string;
  name: string;
  /** Price per staff member, in GBP. Always rendered with a "from" qualifier. */
  pricePerStaff: number;
  tagline: string;
  description: string;
  features: readonly string[];
  /** Marked as the recommended middle option. Exactly one tier should set this. */
  featured: boolean;
  cta: string;
};

export const tiers: readonly Tier[] = [
  {
    id: 'assessment',
    name: 'Assessment',
    pricePerStaff: 35,
    tagline: 'Understand where you stand',
    description:
      'A confidential wellbeing assessment across your workforce and a clear report of what it found. The right starting point if you need evidence before you can make a case internally.',
    features: [
      'Confidential staff wellbeing assessment',
      'Coverage designed to reach night and bank staff',
      'Jargon-free insight report',
      'Aggregate results by team, site or role',
      'One-hour findings walkthrough with your management team',
    ],
    featured: false,
    cta: 'Start with an assessment',
  },
  {
    id: 'assessment-plan',
    name: 'Assessment + Plan',
    // PLACEHOLDER: confirm rate with client.
    pricePerStaff: 55,
    tagline: 'Know what to do about it',
    description:
      'Everything in Assessment, plus a prioritised improvement plan with named actions, owners and dates — so the findings turn into something your managers can act on.',
    features: [
      'Everything in Assessment',
      'Prioritised improvement plan with owners and target dates',
      'Quick wins separated from structural changes',
      'Burnout risk breakdown by team and shift pattern',
      'Agreed measures so you can evidence progress',
      'Manager briefing session',
    ],
    featured: true,
    cta: 'Get assessment and plan',
  },
  {
    id: 'ongoing',
    name: 'Full Ongoing Support',
    // PLACEHOLDER: confirm rate with client.
    pricePerStaff: 85,
    tagline: 'Make the change stick',
    description:
      'A twelve-month partnership. We deliver the programme, embed healthier practices with your team, and re-measure — so improvement is sustained and evidenced, not a one-off exercise.',
    features: [
      'Everything in Assessment + Plan',
      'Health promotion and resilience programme delivery',
      'Mental health awareness sessions for staff and seniors',
      'Quarterly check-ins with your management team',
      'Re-assessment at 12 months to evidence change',
      'Evidence pack suitable for CQC "well-led" discussions',
      'Named consultant throughout',
    ],
    featured: false,
    cta: 'Discuss ongoing support',
  },
] as const;

export const featuredTier = tiers.find((t) => t.featured) ?? tiers[1];

/** Volume discount bands applied by the calculator. Illustrative — confirm with client. */
export const volumeBands: readonly { minStaff: number; discount: number; label: string }[] = [
  { minStaff: 0, discount: 0, label: 'Standard rate' },
  { minStaff: 50, discount: 0.05, label: '5% multi-team discount' },
  { minStaff: 150, discount: 0.1, label: '10% multi-site discount' },
  { minStaff: 400, discount: 0.15, label: '15% large provider discount' },
] as const;

export function bandFor(staffCount: number) {
  return [...volumeBands].reverse().find((b) => staffCount >= b.minStaff) ?? volumeBands[0];
}

export function estimate(staffCount: number, tier: Tier) {
  const band = bandFor(staffCount);
  const gross = staffCount * tier.pricePerStaff;
  const discount = Math.round(gross * band.discount);
  return { gross, discount, total: gross - discount, band };
}
