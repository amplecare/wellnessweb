/**
 * ILLUSTRATIVE TESTIMONIALS — NOT REAL CLIENT QUOTES.
 *
 * Every entry below has `isPlaceholder: true`. The <Testimonials> section reads
 * that flag and renders a visible "illustrative" label plus a section-level
 * notice, so nothing invented can be mistaken for a real endorsement.
 *
 * BEFORE LAUNCH: replace with real, attributable quotes and set isPlaceholder to
 * false. Testimonials with isPlaceholder still true are excluded from the
 * schema.org Review markup in app/layout.tsx by design — publishing fabricated
 * reviews as structured data would be a Google policy violation and, for a
 * healthcare consultancy, a CAP Code problem.
 */

export type Testimonial = {
  id: string;
  quote: string;
  /** Role only while illustrative. Add a real name when a real quote replaces it. */
  attribution: string;
  context: string;
  isPlaceholder: boolean;
};

export const testimonials: readonly Testimonial[] = [
  {
    id: 'care-home-manager',
    quote:
      'We knew morale had dipped but we could not evidence it or explain why. The assessment gave us something concrete to work from, and the plan was specific enough that my seniors could actually pick it up and run with it.',
    attribution: 'Care Home Manager',
    context: '42-bed residential home',
    isPlaceholder: true,
  },
  {
    id: 'registered-manager',
    quote:
      'What stood out was that they understood shift patterns. Every wellbeing offer we had looked at before assumed people worked nine to five. This was built around nights and weekends, so our staff could actually take part.',
    attribution: 'Registered Manager',
    context: 'Nursing home, North West',
    isPlaceholder: true,
  },
  {
    id: 'provider-director',
    quote:
      'The value for us was the evidence trail. We could show what we had measured, what we changed and what happened next — which made the "well-led" conversation far more straightforward than it had been previously.',
    attribution: 'Operations Director',
    context: 'Multi-site domiciliary care provider',
    isPlaceholder: true,
  },
] as const;

export const hasRealTestimonials = testimonials.some((t) => !t.isPlaceholder);
