import type { LandingContent } from '@/components/seo/LandingPage';

/** The delivery service — what happens after measurement. Assessment page owns measurement. */
export const staffWellbeingProgrammes: LandingContent = {
  path: '/staff-wellbeing-programmes',
  eyebrow: 'Staff wellbeing programmes',
  h1: 'A wellbeing programme that survives',
  h1Accent: 'contact with a real rota.',
  lead: 'Practical wellbeing programmes for care providers — built around shifts, handovers and lone working, delivered in a way night and bank staff can actually take part in, with measurement built in so you know whether it worked.',

  recognition: {
    heading: 'Why the last one did not stick',
    lead: 'Most providers have tried something already. These are the reasons it usually fades.',
    items: [
      'It ran at 2pm on a weekday, so half the workforce was asleep or on shift.',
      'It was an app, and the download rate was fine while the usage rate was not.',
      'It depended on one enthusiastic champion, who then left or got too busy.',
      'It addressed a problem the leadership team assumed existed rather than one anybody had measured.',
      'It asked for extra discretionary effort from people who had none spare.',
      'Nothing was measured before or after, so nobody could say whether it made any difference.',
    ],
  },

  emotion: {
    quote:
      'Staff notice when a wellbeing initiative is decorative. That is the real cost of getting it wrong — the next one is harder to land.',
  },

  consequence: {
    heading: 'What a failed initiative costs beyond its budget',
    steps: [
      'The budget is spent for the year, so the thing that would have worked now waits twelve months.',
      'Staff conclude that wellbeing here is presentational, and engagement with the next attempt drops.',
      'Managers who championed it lose credibility with their teams, which makes them reluctant to champion the next one.',
      'The underlying pressure is unchanged, so absence and turnover carry on doing what they were doing.',
    ],
    closing:
      'This is why we will not sell a programme before an assessment. Not out of process rigidity, but because programmes designed on assumptions are how providers end up here.',
  },

  education: [
    {
      eyebrow: 'How we build one',
      heading: 'Designed around your rota, not around our calendar',
      paragraphs: [
        'Everything we deliver is scheduled around how your service actually runs. Sessions repeat across shift patterns so night staff are not asked to attend on their sleep. Where a session cannot practically repeat, we record it in a form people can use in ten-minute pieces.',
        'Content is chosen from what the assessment found rather than from a catalogue. If the finding is missed breaks on long shifts, the intervention is break protection with a named owner — not a stress management workshop, which would put the responsibility back on the person missing the break.',
        'We also design for the fact that your managers are busy. Anything that requires sustained manager effort to keep alive will die when the service gets busy, so we build for the pressured weeks rather than the calm ones.',
      ],
    },
    {
      eyebrow: 'What is in one',
      heading: 'Structural changes first, sessions second',
      paragraphs: [
        'A programme usually combines a small number of structural changes with targeted support. The structural changes are things like protected break windows, predictable handover timing on a specific unit, a routine acknowledgement after a resident death, or supervision that is scheduled and defended.',
        'Alongside those we deliver targeted sessions where they genuinely help — mental health awareness, stress management, healthy lifestyle education, resilience work for teams that have been through a difficult period. These work well as reinforcement and poorly as the whole answer.',
        'The ratio matters. Two structural changes and one session series will typically outperform six sessions and no structural change, because the first alters the conditions and the second asks people to cope with them better.',
      ],
    },
    {
      eyebrow: 'How we know it worked',
      heading: 'Measurement at the start and the end, or it is guesswork',
      paragraphs: [
        'Every programme starts from a baseline assessment and returns to the same measures afterwards, usually at three to six months. Without both, "it seems better" is the strongest claim anyone can make, and that is not a claim you can take to a board or a commissioner.',
        'Re-measurement also tells you which parts to keep. Programmes rarely succeed uniformly — typically one or two changes move the numbers clearly and the rest do little. Knowing which is which is what lets you concentrate effort in year two instead of running everything again.',
        'We will report honestly when something did not move. That is uncomfortable and it is the only way the exercise is worth anything.',
      ],
    },
  ],

  solution: {
    heading: 'From findings to something that actually changes on shift',
    lead: 'Four stages, with the emphasis on what happens after the report rather than before it.',
    steps: [
      {
        icon: 'clipboard',
        title: 'Baseline assessment',
        body: 'The starting position, measured across the whole workforce, so there is something to compare against later.',
      },
      {
        icon: 'compass',
        title: 'An improvement plan you agree to',
        body: 'Named actions, named owners, target dates and agreed measures — chosen with your managers, so they are achievable at your staffing levels.',
      },
      {
        icon: 'heart',
        title: 'Delivery around your shift patterns',
        body: 'Structural changes supported by targeted sessions, scheduled so night, bank and part-time staff can genuinely take part.',
      },
      {
        icon: 'chart',
        title: 'Re-measurement and honest review',
        body: 'The same measures at three to six months, reporting what moved and what did not, so year two concentrates on what works.',
      },
    ],
  },

  evidenceIds: ['sickness-absence', 'turnover-rate'],

  objections: [
    {
      objection: 'We already provide wellbeing training.',
      answer:
        'Training is useful reinforcement and is rarely sufficient alone, because it asks staff to cope better with conditions rather than changing the conditions. It works considerably better when it sits alongside one or two structural changes.',
    },
    {
      objection: 'Our staff will not attend sessions.',
      answer:
        'Often true, and usually a scheduling problem rather than an attitude one. If sessions run when people are on shift or asleep, attendance will be poor regardless of quality. We repeat across shift patterns and record what cannot repeat.',
    },
    {
      objection: 'We tried a wellbeing app and nobody used it.',
      answer:
        'A common experience. Apps ask for discretionary effort from people who have very little spare, and they tend to reach the staff who were already coping. They are not useless, but they cannot carry a programme by themselves.',
    },
    {
      objection: 'We cannot afford ongoing support.',
      answer:
        'Then start with the assessment and the improvement plan, and run the changes yourselves. Plenty of providers do exactly that, and we would rather you did that well than commit to ongoing support you cannot sustain.',
    },
    {
      objection: 'How is this different from what our HR team could do?',
      answer:
        'In principle your HR team could do much of it. In practice they are running cases, recruitment and compliance with no spare capacity, and this needs sustained attention over months. We are the capacity, not a comment on their competence.',
    },
    {
      objection: 'What if it does not work?',
      answer:
        "Then the re-measurement will show that, and we will tell you plainly. That is a better outcome than an unmeasured programme everyone assumes helped — at least you know, and you can put the next year's effort somewhere else.",
    },
  ],

  faqs: [
    {
      question: 'What is a staff wellbeing programme?',
      answer:
        'A planned set of changes and support delivered over a period, aimed at improving working conditions and wellbeing across a workforce. In our approach it combines structural changes with targeted sessions, with measurement before and after.',
    },
    {
      question: 'How long does a programme run?',
      answer:
        'Typically three to twelve months depending on scope. Anything shorter rarely allows a structural change to embed; anything longer without re-measurement stops being accountable.',
    },
    {
      question: 'Do you deliver sessions on site?',
      answer:
        'Yes, on site or remotely, repeated across shift patterns so night and weekend staff can take part. Where repetition is impractical we provide recorded material designed to be used in short pieces.',
    },
    {
      question: 'Can we start with a programme instead of an assessment?',
      answer:
        'We would advise against it and generally will not do it. A programme built on assumptions is how most providers ended up with an initiative that faded. The assessment is what makes the programme specific to your service.',
    },
    {
      question: 'What does a programme cost?',
      answer:
        'It depends on workforce size, number of sites and duration. Assessment starts at £35 per staff member; assessment with an improvement plan and ongoing support cost more. You receive a written quote after a free consultation.',
    },
    {
      question: 'Who needs to be involved from our side?',
      answer:
        'A senior sponsor who can authorise changes, and your registered managers for the sessions where actions are agreed. Day-to-day delivery sits with us.',
    },
  ],

  finalCta: {
    heading:
      'Before you invest in another wellbeing initiative, find out what your staff actually need.',
    body: 'Book a free consultation and we will talk through what a programme would involve for your service.',
  },
};
