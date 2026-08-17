/**
 * The keyword → page map. One source of truth for the site's SEO architecture.
 *
 * This is a typed module rather than a planning document on purpose: every page
 * imports its own entry to build `metadata`, the sitemap is generated from it, and
 * internal links are declared here rather than hand-wired per page. A page that is
 * not in this map has no title, no canonical and no place in the sitemap — which is
 * what stops orphan pages appearing by accident.
 *
 * ## The cannibalisation rule
 *
 * `primaryKeyword` must be unique across the whole map. Two pages chasing one phrase
 * split their own authority and Google picks the weaker one. Where phrases are close
 * cousins, the map assigns each an angle and records the decision in `distinctFrom`
 * so the next person does not "helpfully" re-merge them:
 *
 *   - **retention** is about the people who stay and why they might not
 *   - **turnover** is about the cost and pattern of people who have already left
 *   - **morale** is about how it feels on shift right now
 *   - **burnout** is the clinical/emotional mechanism underneath all three
 *
 * Those four genuinely differ in what the searcher wants, so they get four pages.
 * "care staff wellbeing" and "social care workforce wellbeing" do *not* differ, so
 * they share one pillar page.
 */

export type SearchIntent = 'informational' | 'commercial' | 'transactional' | 'navigational';

export type PageCluster =
  'pillar' | 'service' | 'problem' | 'sector' | 'resource' | 'conversion' | 'company';

export interface SeoPage {
  /** Route path, no trailing slash. '' is the homepage. */
  path: string;
  cluster: PageCluster;
  /** Must be unique across the map. Enforced by `assertNoCannibalisation`. */
  primaryKeyword: string;
  secondaryKeywords: string[];
  intent: SearchIntent;
  /** Who this page is written for, in the client's own words. */
  audience: string;
  /** What a successful visit produces. */
  conversionGoal: string;
  primaryCta: string;
  /** Paths this page must link to. Drives the internal-link block and the QA report. */
  internalLinks: string[];
  /** <title>. Aim for 50–60 characters so it is not truncated in results. */
  title: string;
  /** Meta description. Aim for 140–160 characters. */
  description: string;
  /** Sitemap weighting. */
  priority: number;
  changeFrequency: 'weekly' | 'monthly' | 'yearly';
  /** Why this page does not overlap its nearest neighbour. Written for developers. */
  distinctFrom?: string;
  /**
   * The visitor-facing version of `distinctFrom`: a one-line test that tells a reader
   * whether they are on the right page. `distinctFrom` explains the SEO decision;
   * this explains the choice to someone deciding what to read next.
   */
  youAreHereIf?: string;
  /** Sibling pages offered by the "is this you?" router. */
  siblings?: string[];
}

/** The single CTA everything funnels toward. */
export const BOOK_CTA = 'Book Your Free Wellbeing Consultation';
export const CONSULTATION_PATH = '/book-consultation';

export const seoPages: SeoPage[] = [
  /* ----------------------------------------------------------------------- *
   * Conversion destination — everything points here.
   * ----------------------------------------------------------------------- */
  {
    path: CONSULTATION_PATH,
    cluster: 'conversion',
    primaryKeyword: 'book workforce wellbeing consultation',
    secondaryKeywords: [
      'free wellbeing consultation',
      'workplace wellbeing consultant uk',
      'workforce wellbeing consultation',
    ],
    intent: 'transactional',
    audience: 'A decision-maker who has decided to talk to someone.',
    conversionGoal: 'Completed consultation booking form.',
    primaryCta: 'Book Your Free Consultation',
    internalLinks: ['/workforce-wellbeing-assessment', '/care-workforce-wellbeing'],
    title: 'Book a Free Workforce Wellbeing Consultation | Ample Care',
    description:
      'A 20–30 minute conversation about your workforce. No obligation and no sales pressure — just an honest look at what your team is dealing with and whether we can help.',
    priority: 1,
    changeFrequency: 'monthly',
  },

  /* ----------------------------------------------------------------------- *
   * Pillar — the topical authority hub.
   * ----------------------------------------------------------------------- */
  {
    path: '/care-workforce-wellbeing',
    cluster: 'pillar',
    primaryKeyword: 'care workforce wellbeing',
    secondaryKeywords: [
      'social care workforce wellbeing',
      'adult social care workforce wellbeing',
      'care sector wellbeing',
      'care staff wellbeing',
      'employee wellbeing in social care',
    ],
    intent: 'informational',
    audience: 'Anyone researching workforce wellbeing across the care sector.',
    conversionGoal: 'Move to a specific problem or service page, then to consultation.',
    primaryCta: BOOK_CTA,
    internalLinks: [
      '/care-worker-burnout',
      '/care-staff-retention',
      '/care-staff-turnover',
      '/care-staff-absence',
      '/workforce-wellbeing-assessment',
      CONSULTATION_PATH,
    ],
    title: 'Care Workforce Wellbeing: A UK Provider Guide | Ample Care',
    description:
      'What workforce wellbeing means in health and social care, why it differs from generic workplace wellbeing, and how providers measure and improve it.',
    youAreHereIf: 'you want the whole picture before narrowing to one problem',
    siblings: ['/care-worker-burnout', '/care-staff-retention', '/workforce-wellbeing-assessment'],
    priority: 0.9,
    changeFrequency: 'monthly',
    distinctFrom:
      'The hub for the whole topic. Owns the broad "care staff wellbeing" family so no narrower page competes for it.',
  },

  /* ----------------------------------------------------------------------- *
   * Commercial service pages.
   * ----------------------------------------------------------------------- */
  {
    path: '/workforce-wellbeing-assessment',
    cluster: 'service',
    primaryKeyword: 'workforce wellbeing assessment',
    secondaryKeywords: [
      'employee wellbeing assessment',
      'staff wellbeing assessment',
      'workplace wellbeing assessment',
      'employee wellbeing survey',
      'staff wellbeing survey',
      'how to measure staff wellbeing',
    ],
    intent: 'commercial',
    audience: 'A manager who knows something is wrong but not what.',
    conversionGoal: 'Book a consultation that leads to an assessment.',
    primaryCta: BOOK_CTA,
    internalLinks: [
      '/staff-wellbeing-programmes',
      '/care-workforce-wellbeing',
      '/resources/how-to-measure-staff-wellbeing',
      CONSULTATION_PATH,
    ],
    title: 'Workforce Wellbeing Assessment for Care Providers | Ample Care',
    description:
      'Measure what your staff are actually experiencing — across nights, bank and part-time teams — and get a plain-English report you can act on.',
    youAreHereIf: 'you know something is wrong but cannot yet say what',
    siblings: ['/staff-wellbeing-programmes', '/care-workforce-wellbeing'],
    priority: 0.9,
    changeFrequency: 'monthly',
    distinctFrom: 'The measurement service. Programmes page owns what happens after measuring.',
  },
  {
    path: '/staff-wellbeing-programmes',
    cluster: 'service',
    primaryKeyword: 'staff wellbeing programme',
    secondaryKeywords: [
      'employee wellbeing programme',
      'workplace wellbeing programme',
      'care staff wellbeing programme',
      'employee wellbeing consultancy',
    ],
    intent: 'commercial',
    audience: 'A provider who already knows the problem and wants a plan.',
    conversionGoal: 'Book a consultation to scope a programme.',
    primaryCta: BOOK_CTA,
    internalLinks: [
      '/workforce-wellbeing-assessment',
      '/care-workforce-wellbeing',
      '/pricing',
      CONSULTATION_PATH,
    ],
    title: 'Staff Wellbeing Programmes for Care Providers | Ample Care',
    description:
      'Practical wellbeing programmes built around how care actually runs — shifts, handovers and lone working — with measurement built in from the start.',
    youAreHereIf: 'you already know the problem and want a plan you can run',
    siblings: ['/workforce-wellbeing-assessment', '/care-workforce-wellbeing'],
    priority: 0.9,
    changeFrequency: 'monthly',
    distinctFrom: 'The delivery service. Assessment page owns measurement.',
  },
  {
    path: '/care-worker-burnout',
    cluster: 'service',
    primaryKeyword: 'care worker burnout',
    secondaryKeywords: [
      'care staff burnout',
      'burnout in social care',
      'care home staff burnout',
      'preventing burnout in care workers',
      'compassion fatigue in care',
    ],
    intent: 'commercial',
    audience: 'A manager watching their team run empty.',
    conversionGoal: 'Recognise the mechanism, then book a consultation.',
    primaryCta: BOOK_CTA,
    internalLinks: [
      '/care-staff-absence',
      '/care-staff-retention',
      '/workforce-wellbeing-assessment',
      '/resources/signs-your-care-team-is-burning-out',
      CONSULTATION_PATH,
    ],
    title: 'Care Worker Burnout: Causes, Signs and What Helps | Ample Care',
    description:
      'Why burnout takes hold in care work specifically, what it looks like before someone resigns, and what providers can practically do about it.',
    youAreHereIf: 'your team is exhausted and you want to understand why it is happening',
    siblings: ['/care-staff-retention', '/care-staff-absence', '/care-staff-morale'],
    priority: 0.9,
    changeFrequency: 'monthly',
    distinctFrom:
      'The underlying mechanism — the emotional and clinical cause. Retention, turnover and absence pages own the organisational consequences.',
  },
  {
    path: '/care-staff-retention',
    cluster: 'service',
    primaryKeyword: 'care staff retention',
    secondaryKeywords: [
      'care worker retention',
      'staff retention care homes',
      'social care staff retention',
      'how to improve staff retention in a care home',
    ],
    intent: 'commercial',
    audience: 'An owner or director losing experienced staff.',
    conversionGoal: 'Book a consultation about why people are leaving.',
    primaryCta: BOOK_CTA,
    internalLinks: [
      '/care-staff-turnover',
      '/care-worker-burnout',
      '/care-staff-morale',
      '/workforce-wellbeing-assessment',
      CONSULTATION_PATH,
    ],
    title: 'Care Staff Retention: Why People Leave | Ample Care',
    description:
      'Retention is not a pay problem alone. Understand what makes experienced care staff stay, and what quietly pushes them towards the door.',
    youAreHereIf: 'experienced people are leaving and you want to keep the ones still here',
    siblings: ['/care-staff-turnover', '/care-worker-burnout', '/care-staff-morale'],
    priority: 0.9,
    changeFrequency: 'monthly',
    distinctFrom:
      'Forward-looking: keeping the people you have. Turnover page is backward-looking: the cost and pattern of those who left.',
  },
  {
    path: '/care-manager-wellbeing',
    cluster: 'service',
    primaryKeyword: 'care manager wellbeing',
    secondaryKeywords: [
      'registered manager wellbeing',
      'care home manager wellbeing',
      'registered manager burnout',
      'care manager burnout',
    ],
    intent: 'commercial',
    audience: 'A registered manager, or the director who employs one.',
    conversionGoal: 'Book a consultation covering management-layer pressure.',
    primaryCta: BOOK_CTA,
    internalLinks: [
      '/care-worker-burnout',
      '/care-staff-retention',
      '/resources/how-registered-managers-can-support-staff-wellbeing',
      CONSULTATION_PATH,
    ],
    title: 'Registered Manager Wellbeing and Burnout | Ample Care',
    description:
      'Registered managers absorb pressure from every direction and are rarely asked how they are coping. What that costs, and what support actually helps.',
    youAreHereIf: 'the person you are worried about is the manager, not the frontline team',
    siblings: ['/care-worker-burnout', '/care-staff-retention'],
    priority: 0.85,
    changeFrequency: 'monthly',
    distinctFrom:
      'The management layer specifically. The burnout page covers frontline care staff.',
  },

  /* ----------------------------------------------------------------------- *
   * Problem pages.
   * ----------------------------------------------------------------------- */
  {
    path: '/care-staff-turnover',
    cluster: 'problem',
    primaryKeyword: 'care staff turnover',
    secondaryKeywords: [
      'care home staff turnover',
      'social care staff turnover',
      'high staff turnover care homes',
      'employee turnover in social care',
      'cost of staff turnover in care homes',
    ],
    intent: 'commercial',
    audience: 'A director looking at a turnover figure they cannot explain.',
    conversionGoal: 'Book a consultation to find the driver behind the number.',
    primaryCta: BOOK_CTA,
    internalLinks: [
      '/care-staff-retention',
      '/care-worker-burnout',
      '/resources/how-much-does-staff-turnover-cost',
      CONSULTATION_PATH,
    ],
    title: 'Care Staff Turnover: Costs and Causes | Ample Care',
    description:
      'Turnover in adult social care runs far above most sectors. What the figure actually costs a provider, and how to find the cause behind it.',
    youAreHereIf: 'you are looking at a turnover figure and need to explain or justify it',
    siblings: ['/care-staff-retention', '/care-worker-burnout', '/care-staff-absence'],
    priority: 0.85,
    changeFrequency: 'monthly',
    distinctFrom: 'The cost and pattern of leaving. Retention page is about keeping people.',
  },
  {
    path: '/care-staff-absence',
    cluster: 'problem',
    primaryKeyword: 'care staff sickness absence',
    secondaryKeywords: [
      'care home sickness absence',
      'care staff absence',
      'reducing sickness absence in care homes',
      'employee absence social care',
    ],
    intent: 'commercial',
    audience: 'A manager covering shifts at short notice, repeatedly.',
    conversionGoal: 'Book a consultation about absence patterns.',
    primaryCta: BOOK_CTA,
    internalLinks: [
      '/care-worker-burnout',
      '/care-staff-morale',
      '/workforce-wellbeing-assessment',
      CONSULTATION_PATH,
    ],
    title: 'Care Staff Sickness Absence: Patterns and Causes | Ample Care',
    description:
      'Short-notice absence forces agency spend and pushes pressure onto the staff who turn up. How to read the pattern rather than police the symptom.',
    youAreHereIf: 'you are covering short-notice shifts and agency spend keeps climbing',
    siblings: ['/care-worker-burnout', '/care-staff-morale', '/care-staff-retention'],
    priority: 0.85,
    changeFrequency: 'monthly',
    distinctFrom: 'The measurable operational symptom. Burnout page owns the cause.',
  },
  {
    path: '/care-staff-morale',
    cluster: 'problem',
    primaryKeyword: 'care staff morale',
    secondaryKeywords: [
      'care home staff morale',
      'improve staff morale in care homes',
      'social care staff morale',
      'employee engagement in care',
    ],
    intent: 'commercial',
    audience: 'A manager who can feel the atmosphere has changed.',
    conversionGoal: 'Book a consultation about engagement and culture.',
    primaryCta: BOOK_CTA,
    internalLinks: [
      '/care-staff-retention',
      '/care-staff-absence',
      '/resources/how-to-improve-staff-morale-in-care-homes',
      CONSULTATION_PATH,
    ],
    title: 'Care Staff Morale: Reading It and Improving It | Ample Care',
    description:
      'Morale slips quietly — handovers get shorter, goodwill thins, nobody names it. How to measure something that feels unmeasurable.',
    youAreHereIf: 'the atmosphere has changed and you cannot point to a number that proves it',
    siblings: ['/care-staff-retention', '/care-worker-burnout', '/care-staff-absence'],
    priority: 0.8,
    changeFrequency: 'monthly',
    distinctFrom:
      'How it feels on shift right now. Retention is about intent to leave; absence is about days lost.',
  },

  /* ----------------------------------------------------------------------- *
   * Sector pages. Each must carry genuinely sector-specific content — the brief
   * explicitly forbids swapping the setting name into one template.
   * ----------------------------------------------------------------------- */
  {
    path: '/care-homes',
    cluster: 'sector',
    primaryKeyword: 'care home staff wellbeing',
    secondaryKeywords: ['residential care staff wellbeing', 'care home employee wellbeing'],
    intent: 'commercial',
    audience: 'Care home owners and registered managers.',
    conversionGoal: 'Book a consultation.',
    primaryCta: BOOK_CTA,
    internalLinks: ['/care-worker-burnout', '/care-staff-retention', CONSULTATION_PATH],
    title: 'Staff Wellbeing for Care Homes | Ample Care',
    description:
      'Residential care runs on rotas, night teams and long shifts. Wellbeing support built around how a care home actually operates.',
    priority: 0.8,
    changeFrequency: 'monthly',
    distinctFrom: 'Residential setting: rota patterns, night teams, resident relationships.',
  },
  {
    path: '/nursing-homes',
    cluster: 'sector',
    primaryKeyword: 'nursing home staff wellbeing',
    secondaryKeywords: ['nursing home staff retention', 'nursing staff burnout care sector'],
    intent: 'commercial',
    audience: 'Nursing home managers and clinical leads.',
    conversionGoal: 'Book a consultation.',
    primaryCta: BOOK_CTA,
    internalLinks: ['/care-worker-burnout', '/care-manager-wellbeing', CONSULTATION_PATH],
    title: 'Staff Wellbeing for Nursing Homes | Ample Care',
    description:
      'Clinical responsibility on top of care work changes the pressure. Wellbeing support for registered nurses and the teams around them.',
    priority: 0.8,
    changeFrequency: 'monthly',
    distinctFrom: 'Clinical accountability, registered nurse retention, end-of-life exposure.',
  },
  {
    path: '/domiciliary-care',
    cluster: 'sector',
    primaryKeyword: 'domiciliary care staff wellbeing',
    secondaryKeywords: ['home care staff wellbeing', 'domiciliary care staff retention'],
    intent: 'commercial',
    audience: 'Domiciliary and home care providers.',
    conversionGoal: 'Book a consultation.',
    primaryCta: BOOK_CTA,
    internalLinks: ['/care-staff-absence', '/care-staff-retention', CONSULTATION_PATH],
    title: 'Staff Wellbeing for Domiciliary Care Providers | Ample Care',
    description:
      'Lone working, travel time and rounds that never quite fit the schedule. Wellbeing support for a workforce you rarely see in one room.',
    priority: 0.8,
    changeFrequency: 'monthly',
    distinctFrom: 'Lone working, travel time, isolation, round-based scheduling.',
  },
  {
    path: '/supported-living',
    cluster: 'sector',
    primaryKeyword: 'supported living staff wellbeing',
    secondaryKeywords: [
      'supported living staff retention',
      'learning disability support staff wellbeing',
    ],
    intent: 'commercial',
    audience: 'Supported living service managers and directors.',
    conversionGoal: 'Book a consultation.',
    primaryCta: BOOK_CTA,
    internalLinks: ['/care-staff-morale', '/care-worker-burnout', CONSULTATION_PATH],
    title: 'Staff Wellbeing for Supported Living Services | Ample Care',
    description:
      'Small teams, long relationships and complex behavioural support. Wellbeing support shaped around how supported living actually works.',
    priority: 0.8,
    changeFrequency: 'monthly',
    distinctFrom: 'Small dispersed teams, long-term relationships, behavioural support demands.',
  },
  {
    path: '/healthcare-providers',
    cluster: 'sector',
    primaryKeyword: 'healthcare staff wellbeing',
    secondaryKeywords: ['healthcare workforce wellbeing', 'healthcare employee wellbeing uk'],
    intent: 'commercial',
    audience: 'Independent healthcare providers and clinical services.',
    conversionGoal: 'Book a consultation.',
    primaryCta: BOOK_CTA,
    internalLinks: [
      '/workforce-wellbeing-assessment',
      '/care-manager-wellbeing',
      CONSULTATION_PATH,
    ],
    title: 'Staff Wellbeing for Healthcare Providers | Ample Care',
    description:
      'Wellbeing support for independent healthcare and clinical teams, built on measurement and repeatable reporting rather than one-off initiatives.',
    priority: 0.75,
    changeFrequency: 'monthly',
    distinctFrom: 'Clinical/independent healthcare rather than social care settings.',
  },
];

/**
 * Fails loudly if two pages claim the same primary keyword.
 *
 * Called from the sitemap, so a cannibalisation mistake breaks the build rather than
 * quietly costing rankings for months before anyone notices.
 */
export function assertNoCannibalisation(): void {
  const seen = new Map<string, string>();
  for (const page of seoPages) {
    const key = page.primaryKeyword.toLowerCase();
    const existing = seen.get(key);
    if (existing) {
      throw new Error(
        `Keyword cannibalisation: "${page.primaryKeyword}" is claimed by both ${existing} and ${page.path}. Give one of them a distinct primary keyword.`
      );
    }
    seen.set(key, page.path);
  }
}

export function getSeoPage(path: string): SeoPage | undefined {
  return seoPages.find((page) => page.path === path);
}

export function pagesInCluster(cluster: PageCluster): SeoPage[] {
  return seoPages.filter((page) => page.cluster === cluster);
}
