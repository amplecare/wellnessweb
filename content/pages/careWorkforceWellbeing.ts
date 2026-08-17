import type { LandingContent } from '@/components/seo/LandingPage';

/**
 * Pillar page. Owns the broad "care workforce wellbeing" topic family.
 *
 * Written to be the page a director reads first and links to internally — so it
 * explains the whole subject rather than selling a single service, and hands off to
 * the narrower pages for each specific problem.
 */
export const careWorkforceWellbeing: LandingContent = {
  path: '/care-workforce-wellbeing',
  eyebrow: 'Workforce wellbeing in care',
  h1: 'Your staff spend their working lives caring for other people.',
  h1Accent: 'Who is caring for them?',
  lead: 'Workforce wellbeing in health and social care is not the same problem as workplace wellbeing in an office. This is what it actually involves, why the usual approaches often miss, and how providers measure it properly.',

  recognition: {
    heading: 'Wellbeing in care is a different problem, and it needs a different answer',
    lead: 'Most workplace wellbeing thinking assumes a nine-to-five workforce sitting at desks. Care does not work like that.',
    items: [
      'Your team works nights, weekends and long shifts, so anything scheduled at 2pm on a Tuesday reaches a fraction of them.',
      'Bank and part-time staff are often the least heard and the most likely to leave quietly.',
      'The emotional weight of the work is constant, and it does not stop when a shift ends.',
      'Lone workers and domiciliary rounds mean much of the workforce is rarely in one room together.',
      'Staffing pressure means the people under most strain have the least time to tell you about it.',
      'Your managers absorb everything that does not get resolved, and nobody asks how they are.',
    ],
  },

  emotion: {
    quote:
      'Burnout rarely announces itself. It looks like another absence, another resignation, and another manager quietly holding everything together.',
  },

  consequence: {
    heading: 'Pressure that goes unaddressed does not stay still',
    lead: 'These are patterns providers recognise, not an inevitable sequence. But they are commonly linked, and they compound.',
    steps: [
      'Sustained pressure shows up first as tiredness and short-notice absence rather than as anyone raising a formal concern.',
      'Absence forces last-minute cover, which pushes agency spend up and lands the gap on the staff who did turn up.',
      'The people absorbing that extra load are usually your most experienced and most conscientious, and their goodwill is finite.',
      'When one experienced person leaves, the pressure on those remaining increases again — which is how a single resignation becomes three.',
    ],
    closing:
      'None of this is unusual, and none of it means an organisation is badly run. It means the pressure has not yet been measured, so it has not yet been addressed.',
  },

  education: [
    {
      eyebrow: 'What it actually means',
      heading: 'Workforce wellbeing is a set of working conditions, not a mood',
      paragraphs: [
        'When people talk about staff wellbeing they often mean how staff feel. That is part of it, but feelings are downstream of something more concrete: whether people get their breaks, whether the rota is predictable enough to plan a life around, whether someone notices after a difficult death on shift, whether a new starter has anyone to ask.',
        'That distinction matters because feelings are hard to change directly and working conditions are not. You cannot instruct a team to feel better. You can protect two break windows on a long shift, and you can make late handovers predictable for four weeks and see what happens.',
        'This is why we treat wellbeing as an operational question rather than a cultural one. Culture is the result. Conditions are the lever.',
      ],
    },
    {
      eyebrow: 'Why the usual approach struggles',
      heading: 'The answer is not usually another training session',
      paragraphs: [
        'Most providers we speak to have already tried something. A wellbeing app nobody opened. A mental health awareness session that a third of the team could not attend because they were on shift. A suggestion box that filled with the same three complaints.',
        'These are reasonable things to try, and none of them are wrong in themselves. They struggle for a specific reason: they are solutions chosen before anyone established what the problem was. If your absence is concentrated on weekend lates among staff with five or more years of service, a mindfulness app is not going to touch it.',
        'Starting with measurement is not a delaying tactic. It is what stops the next initiative going the same way as the last one.',
      ],
    },
    {
      eyebrow: 'What good measurement looks like',
      heading: 'Reaching the staff who are hardest to reach',
      paragraphs: [
        'A wellbeing survey that only reaches day staff on the office rota tells you about day staff on the office rota. In care, the people under the most strain are often the ones your existing channels reach least: nights, bank, weekend-only, and domiciliary rounds.',
        'So participation matters more than in most sectors. We treat anything below around 40 per cent as a signal that the findings cannot safely be generalised to the whole workforce — and we will tell you that rather than writing a confident report on thin data.',
        'It also has to be genuinely confidential. Care staff will not answer honestly about their manager if they believe the answer can be traced back to them. Results reach you as aggregates, never as individual responses, and that constraint is what makes the answers worth having.',
      ],
    },
  ],

  solution: {
    heading: 'Measure, understand, prioritise, act, then measure again',
    lead: 'A deliberately unglamorous loop. It is the only approach we have found that survives contact with a real rota.',
    steps: [
      {
        icon: 'clipboard',
        title: 'Measure what is actually happening',
        body: 'A confidential assessment designed around care working patterns, so night, bank and part-time staff are genuinely reached rather than technically invited.',
      },
      {
        icon: 'chart',
        title: 'Understand the pattern',
        body: 'A plain-English report showing where pressure concentrates — by site, role and shift pattern — rather than a dashboard you have to interpret yourself.',
      },
      {
        icon: 'compass',
        title: 'Prioritise what is workable',
        body: 'Named actions with named owners and target dates, chosen because they are achievable on your staffing levels, not because they look impressive on a slide.',
      },
      {
        icon: 'link',
        title: 'Re-measure to see if it moved',
        body: 'The same measures again after an agreed period, so you find out whether the change worked instead of assuming it did.',
      },
    ],
  },

  evidenceIds: ['turnover-rate', 'sickness-absence', 'vacancies'],

  objections: [
    {
      objection: 'We already have an HR team.',
      answer:
        'Good — you will need them. HR handles cases, policy and process, and does it under real time pressure. What we add is specialist measurement and analysis across the whole workforce, which is a different job and one most HR teams have no capacity to take on alongside their existing caseload.',
    },
    {
      objection: 'We already have an EAP.',
      answer:
        'An EAP supports individuals once they are struggling, and that is valuable. It is reactive by design, and typical usage rates mean most of your workforce never touches it. It cannot tell you that absence is concentrated on weekend lates, because it only ever sees the people who call.',
    },
    {
      objection: 'We already run staff surveys.',
      answer:
        'Then you are ahead of most providers. The questions we would ask are what your response rate looks like among night and bank staff, and what changed as a result of the last one. Surveys stop working when staff conclude nothing follows from them.',
    },
    {
      objection: 'Our managers are already too busy for this.',
      answer:
        'They are, and that is part of the problem rather than a reason to delay. We designed the process so the burden sits with us: we build the assessment, we chase participation, we write the report. Your managers are needed for two conversations, not a project.',
    },
    {
      objection: 'Our staff will not take part.',
      answer:
        'Some will not, and that is fair — many have filled in surveys before and seen nothing change. Participation improves when staff can see the results are confidential and that something happened last time. We will tell you honestly if participation is too low to draw conclusions from.',
    },
    {
      objection: 'We do not have the budget for this.',
      answer:
        'Assessments start at £35 per staff member, which is a fraction of what replacing one experienced care worker costs. That said, if the honest answer is that this is not the right year, we would rather tell you that on a free call than sell you something you cannot sustain.',
    },
  ],

  faqs: [
    {
      question: 'What is workforce wellbeing in social care?',
      answer:
        'It describes the working conditions and support that determine how sustainable a care role is over time — workload, rota predictability, breaks, supervision, recognition and emotional support. It is broader than mental health provision and more concrete than staff morale.',
    },
    {
      question: 'How is this different from generic workplace wellbeing?',
      answer:
        'Generic workplace wellbeing generally assumes a daytime, desk-based workforce that can attend sessions and read emails. Care runs on shifts, lone working and emotional labour, so both the measurement and the interventions have to be built around those realities.',
    },
    {
      question: 'How do you measure something as subjective as wellbeing?',
      answer:
        'By asking consistent questions across the whole workforce, breaking results down by site, role and shift pattern, and repeating the exercise so you can see movement. The individual answers are subjective; the pattern across a workforce is not.',
    },
    {
      question: 'Will our staff be identifiable in the results?',
      answer:
        'No. Findings are reported as aggregates, and we apply a minimum group size before any breakdown is published. Staff will not answer honestly otherwise, which would make the whole exercise worthless.',
    },
    {
      question: 'How long does the process take?',
      answer:
        'Typically two to three weeks for the assessment window, then about a week to analyse and write the report, followed by a call to talk it through. Re-measurement is usually agreed for three to six months later.',
    },
    {
      question: 'Do you work with providers outside England?',
      answer:
        'Yes, we work with providers across the UK. The sector statistics we cite are for England because that is what Skills for Care publishes; the approach itself is not England-specific.',
    },
  ],

  finalCta: {
    heading: 'Your people care for others every day. Make sure they are supported too.',
    body: 'Start with a free consultation. We will talk through what you are seeing and tell you honestly whether we can help.',
  },
};
