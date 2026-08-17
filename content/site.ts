/**
 * Single source of truth for company details, navigation and the canonical URL.
 *
 * PLACEHOLDER VALUES are marked with `PLACEHOLDER:` in a comment. Every one must
 * be replaced with real Ample Care Ltd details before launch — see PLACEHOLDERS.md.
 */

export const site = {
  name: 'Ample Care Ltd',
  shortName: 'Ample Care',
  tagline: 'Health Promotion & Workplace Wellbeing Consultancy',

  // PLACEHOLDER: replace with the real production domain once registered.
  url: 'https://www.amplecare.co.uk',

  description:
    'Ample Care helps UK care providers assess, improve and maintain staff wellbeing through practical health promotion and workplace wellbeing programmes — built for the realities of care work.',

  // PLACEHOLDER: replace with real contact details.
  email: 'hello@amplecare.co.uk',
  phone: '+44 333 577 2070',
  phoneDisplay: '0333 577 2070',

  // PLACEHOLDER: replace with the registered office address, or remove the
  // postal address from the LocalBusiness schema if the business is remote-first.
  address: {
    street: 'Registered office address',
    locality: 'London',
    region: 'England',
    postcode: 'SW1A 1AA',
    country: 'GB',
  },

  // PLACEHOLDER: Companies House number — required on UK business websites for a
  // registered limited company, alongside the registered office address.
  companyNumber: '00000000',

  areaServed: 'United Kingdom',
  priceFrom: 35,
  currency: 'GBP',
} as const;

export type NavItem = {
  label: string;
  href: string;
};

/**
 * Primary navigation.
 *
 * Five labels, each naming something a visitor actually wants. The previous set had
 * "Wellbeing" (which means nothing on its own, sitting beside "Services" and
 * "Resources") and "Who we help" pointing at /care-homes — a single setting
 * masquerading as a menu. A domiciliary manager clicking it landed on care homes and
 * reasonably concluded the site was not for them.
 *
 * "Who we help" is now a real menu of the five settings.
 */
export const primaryNav: readonly NavItem[] = [
  { label: 'Services', href: '/services' },
  { label: 'Who we help', href: '/care-homes' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Resources', href: '/resources' },
  { label: 'About', href: '/about' },
] as const;

/** The settings menu that hangs off "Who we help". */
export const sectorNav: readonly NavItem[] = [
  { label: 'Care homes', href: '/care-homes' },
  { label: 'Nursing homes', href: '/nursing-homes' },
  { label: 'Domiciliary care', href: '/domiciliary-care' },
  { label: 'Supported living', href: '/supported-living' },
  { label: 'Healthcare providers', href: '/healthcare-providers' },
] as const;

/**
 * Footer navigation doubles as the internal-linking backbone.
 *
 * Every landing page appears here, which is what guarantees no page is orphaned:
 * each one is reachable from every other page on the site in a single click.
 */
export const footerNav: readonly { heading: string; items: readonly NavItem[] }[] = [
  {
    heading: 'Services',
    items: [
      { label: 'Workforce Wellbeing Assessment', href: '/workforce-wellbeing-assessment' },
      { label: 'Staff Wellbeing Programmes', href: '/staff-wellbeing-programmes' },
      { label: 'Care Worker Burnout', href: '/care-worker-burnout' },
      { label: 'Care Staff Retention', href: '/care-staff-retention' },
      { label: 'Registered Manager Wellbeing', href: '/care-manager-wellbeing' },
      { label: 'All services', href: '/services' },
    ],
  },
  {
    heading: 'Problems we help with',
    items: [
      { label: 'Care Staff Turnover', href: '/care-staff-turnover' },
      { label: 'Sickness Absence', href: '/care-staff-absence' },
      { label: 'Staff Morale', href: '/care-staff-morale' },
      { label: 'Care Workforce Wellbeing', href: '/care-workforce-wellbeing' },
    ],
  },
  {
    heading: 'Who we help',
    items: [
      { label: 'Care Homes', href: '/care-homes' },
      { label: 'Nursing Homes', href: '/nursing-homes' },
      { label: 'Domiciliary Care', href: '/domiciliary-care' },
      { label: 'Supported Living', href: '/supported-living' },
      { label: 'Healthcare Providers', href: '/healthcare-providers' },
    ],
  },
  {
    heading: 'Company',
    items: [
      { label: 'About Ample Care', href: '/about' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Resources', href: '/resources' },
      { label: 'Book a consultation', href: '/book-consultation' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    items: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'How we handle wellbeing data', href: '/privacy#wellbeing-data' },
    ],
  },
] as const;

/** The one CTA wording used site-wide, so it stays consistent. */
export const cta = {
  primary: 'Book Your Free Wellbeing Consultation',
  primaryShort: 'Book a Free Consultation',
  secondary: 'See How It Works',
  calculator: "Calculate Your Organisation's Wellbeing Package",
  final: 'Start Improving Your Team Wellbeing Today',
} as const;
