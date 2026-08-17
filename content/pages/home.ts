import type { Faq, Objection } from '@/components/seo/ConversionKit';

/**
 * Home page objection handling and FAQs.
 *
 * The home page already covered problem, solution, evidence and pricing. These two
 * blocks close the remaining gaps in the briefed conversion journey: the objections
 * a decision-maker raises internally before enquiring, and the questions they would
 * otherwise have to email to ask.
 */
export const homeObjections: Objection[] = [
  {
    objection: 'We already have HR and an EAP.',
    answer:
      'Both are worth having, and both are individual and reactive by design — they help people who are already struggling and come forward. Neither can tell you that absence is concentrated on weekend lates among your longest-serving staff. That is a measurement job, and it is the one we do.',
  },
  {
    objection: 'We have tried wellbeing initiatives before and they fizzled out.',
    answer:
      'That is the most common thing we hear, and it usually has a specific cause: the initiative was chosen before anyone established what the problem was, or it was scheduled when half the workforce was asleep or on shift. Starting with measurement is what stops the next one going the same way.',
  },
  {
    objection: 'Our staff will not take part.',
    answer:
      'Some will not, and often for good reason — many have completed surveys before and seen nothing change. We keep it short, explain exactly how answers are used, and build the feedback step in. If participation is too low to draw conclusions from, we tell you rather than writing a confident report anyway.',
  },
  {
    objection: 'Our managers have no time for another project.',
    answer:
      'They almost certainly do not, and that is part of what we are measuring rather than a reason to postpone. The workload sits with us: we build the assessment, chase participation and write the report. Your managers are needed for two conversations.',
  },
  {
    objection: 'We cannot change our staffing levels, so what is the point?',
    answer:
      'Most providers cannot, and we do not build recommendations that assume you can. Break protection, rota notice periods, how handovers run and how a resident death is acknowledged are all changeable within existing staffing — and they are frequently where the movement comes from.',
  },
  {
    objection: 'How do we know this will actually work?',
    answer:
      'You will not know in advance, and we would be wary of anyone who guarantees it. What we can do is measure the position before, agree the changes with you, and measure again afterwards — so you find out honestly whether it moved rather than taking it on trust.',
  },
];

export const homeFaqs: Faq[] = [
  {
    question: 'What does Ample Care actually do?',
    answer:
      'We measure staff wellbeing across a care workforce, report what we find in plain English, help you agree practical changes, and re-measure to check whether they worked. We are a specialist consultancy for health and social care providers, not a generic workplace wellbeing supplier.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'Assessments start from £35 per staff member. The final figure depends on workforce size, number of sites and whether you want an improvement plan and ongoing support alongside it. You receive a written quote after a free consultation.',
  },
  {
    question: 'How long does an assessment take?',
    answer:
      'Around four weeks end to end: a two to three week response window, about a week for analysis and writing, then a call to talk the findings through.',
  },
  {
    question: 'Will individual staff answers be seen by managers?',
    answer:
      'No. Responses are confidential and reported as aggregates with a minimum group size, so small teams cannot be reverse-engineered into individuals. Care staff will not answer honestly on any other basis.',
  },
  {
    question: 'Do you only work with care homes?',
    answer:
      'No. We work with care homes, nursing homes, domiciliary care providers, supported living services and independent healthcare providers. The method is shared; the questions and reporting are adapted to each setting.',
  },
  {
    question: 'What happens on the free consultation?',
    answer:
      'A 20–30 minute conversation about what you are seeing in your workforce, what you have already tried, and what an assessment could and could not tell you. No obligation, and no price decided on the call.',
  },
];

/** The sector pages, for the "who we help" block. */
export const whoWeHelp: { label: string; href: string; body: string }[] = [
  {
    label: 'Care homes',
    href: '/care-homes',
    body: 'Rota patterns, night teams, and relationships with residents that end in bereavement.',
  },
  {
    label: 'Nursing homes',
    href: '/nursing-homes',
    body: 'Clinical accountability on top of care work, and registered nurses who are hard to replace.',
  },
  {
    label: 'Domiciliary care',
    href: '/domiciliary-care',
    body: 'Lone working, travel time, and a workforce that is almost never in one room.',
  },
  {
    label: 'Supported living',
    href: '/supported-living',
    body: 'Small teams, long relationships, and complex behavioural support absorbed by very few people.',
  },
  {
    label: 'Healthcare providers',
    href: '/healthcare-providers',
    body: 'Mixed professional groups, clinical governance, and staff expected to cope by training.',
  },
];
