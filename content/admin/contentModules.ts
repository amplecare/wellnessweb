import type { ContentModule } from '@/lib/admin/types';

/**
 * The content management registry.
 *
 * Site copy currently lives in typed modules under `content/`, edited by a developer.
 * This registry describes what exists, where it lives and what stands between it and
 * being editable in the admin area.
 *
 * It is deliberately honest: nothing here claims to be editable yet. A CMS screen that
 * looks functional but silently discards edits is worse than no screen, because
 * someone will update the pricing, see a success message, and believe the site changed.
 *
 * Adding real editing means giving a module a persistence layer and a form — the
 * information architecture below does not need to change for that.
 */
export const contentModules: ContentModule[] = [
  {
    id: 'homepage',
    label: 'Homepage hero and sections',
    description:
      'The headline, opening promise, pricing highlight and the order of the sections on the home page.',
    source: 'components/sections/Hero.tsx',
    status: 'live_in_code',
    blocker: 'Copy is written directly into the section components rather than a content module.',
  },
  {
    id: 'services',
    label: 'Services',
    description:
      'The eight services, each with its description and who it suits. Feeds the services index and the home page grid.',
    source: 'content/services.ts',
    status: 'live_in_code',
    itemCount: 8,
  },
  {
    id: 'pricing',
    label: 'Pricing tiers and volume bands',
    description:
      'The three packages, what each includes, indicative per-staff pricing and the volume discount bands.',
    source: 'content/pricing.ts',
    status: 'needs_input',
    itemCount: 3,
    blocker:
      'Only the £35 entry point is confirmed. Tiers 2 and 3 and the discount bands are still indicative — confirm before making them editable.',
  },
  {
    id: 'testimonials',
    label: 'Testimonials',
    description:
      'Client quotes with attribution. Each carries an isPlaceholder flag that renders a visible "Illustrative" tag until it is real.',
    source: 'content/testimonials.ts',
    status: 'needs_input',
    itemCount: 3,
    blocker:
      'All three are illustrative. Real, attributable quotes with written permission are needed before the tags come off.',
  },
  {
    id: 'stats',
    label: 'Sector statistics',
    description:
      'The three sourced Skills for Care figures, each with its reporting period and source link.',
    source: 'content/stats.ts',
    status: 'live_in_code',
    itemCount: 3,
    blocker:
      'Re-verify annually against the Skills for Care publication. Never add a figure that cannot be sourced.',
  },
  {
    id: 'video',
    label: 'Home page video',
    description:
      'The video slot between the report showcase and the services index — provider, poster, captions and transcript link.',
    source: 'content/video.ts',
    status: 'needs_input',
    blocker: 'No film exists yet. The slot renders its brief until one is produced.',
  },
  {
    id: 'site',
    label: 'Business details',
    description:
      'Company number, registered address, phone, email and the production domain used for canonicals and structured data.',
    source: 'content/site.ts',
    status: 'needs_input',
    blocker:
      'Placeholder company number, phone and address are still in place. These block launch.',
  },
  {
    id: 'faqs',
    label: 'FAQs',
    description: 'Common questions from registered managers, with answers.',
    source: 'Not built',
    status: 'planned',
  },
  {
    id: 'insights',
    label: 'Insights / blog',
    description:
      'Articles for SEO and ongoing credibility. Listed as optional in the brief and deferred by scope.',
    source: 'Not built',
    status: 'planned',
    blocker: 'Needs a route, an Article schema and a publishing workflow.',
  },
  {
    id: 'case-studies',
    label: 'Case studies',
    description:
      'Anonymised client outcomes. Requires written client permission and must clear the minimum reporting group size.',
    source: 'Not built',
    status: 'planned',
    blocker: 'No clients with published permission yet.',
  },
];
