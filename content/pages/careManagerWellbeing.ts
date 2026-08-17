import type { LandingContent } from '@/components/seo/LandingPage';

/** The management layer specifically. The burnout page covers frontline staff. */
export const careManagerWellbeing: LandingContent = {
  path: '/care-manager-wellbeing',
  eyebrow: 'Registered manager wellbeing',
  h1: 'Your registered manager holds everything together.',
  h1Accent: 'Who checks on them?',
  lead: 'Registered managers absorb pressure from residents, families, staff, commissioners and regulators — and are almost never asked how they are coping. What that costs a provider, and what support actually helps.',

  recognition: {
    heading: 'The manager who is always fine',
    lead: 'Manager strain is easy to miss precisely because they are the person everyone else reports problems to.',
    items: [
      'Your manager is answering messages at 10pm and on days off, and it has stopped being remarkable.',
      'They cover shifts themselves when the rota fails, then do their own job afterwards.',
      'Supervisions for their team happen; their own supervision keeps getting rescheduled.',
      'They have not taken a full week of leave without checking in for a long time.',
      'They are the first point of contact for every complaint, every incident and every inspection.',
      'Nobody has asked them directly how they are doing in months, because they are the one who asks everyone else.',
    ],
  },

  emotion: {
    quote:
      'A registered manager is expected to notice when everyone else is struggling. There is rarely anyone whose job it is to notice them.',
  },

  consequence: {
    heading: 'Why manager strain is a business risk, not just a welfare one',
    lead: 'The management layer is a single point of failure in a way frontline roles are not.',
    steps: [
      'A depleted manager has less capacity for the discretionary work — the noticing, the informal check-ins, the early intervention that prevents small problems growing.',
      'Supervision and induction quality slips first, because they are the things with no immediate deadline attached.',
      'Frontline staff feel less supported, which feeds directly into the wellbeing and retention picture across the whole service.',
      'If the manager leaves, you lose regulatory continuity, relationships with families and commissioners, and institutional knowledge at once — and registered managers are hard to replace.',
    ],
    closing:
      'Supporting managers is not a perk. It is the most concentrated point of leverage over frontline wellbeing that most providers have.',
  },

  education: [
    {
      eyebrow: 'The specific pressure',
      heading: 'Accountability that does not switch off',
      paragraphs: [
        'A registered manager carries personal regulatory accountability for the service. That is different from ordinary managerial responsibility: it attaches to them by name, it persists outside working hours, and it does not reduce when they are short-staffed or on leave.',
        "Layer onto that the role's structural position. They are the escalation point for staff, the response point for families, the accountable person for commissioners, and the person who has to hold the rota together when three people call in sick on a Saturday. Almost every problem in the building routes through one person.",
        'They are also frequently isolated. A carer has colleagues on the same shift who understand exactly what the day was like. A registered manager often has nobody at their level in the building at all, and may go weeks without a conversation with a peer who genuinely understands the job.',
      ],
    },
    {
      eyebrow: 'Why it stays hidden',
      heading: 'Managers are the least likely people to tell you they are struggling',
      paragraphs: [
        'There is a professional expectation that managers cope. Admitting strain can feel like admitting you cannot run the service — particularly for a registered manager whose competence is a regulatory matter as well as a personal one.',
        'So it tends to present indirectly: through decisions being deferred, through a manager becoming more transactional with their team, through paperwork slipping, or simply through a resignation that arrives without warning and is explained as wanting a change.',
        'This is why asking works better through a confidential route than through a line management conversation. A manager will often tell an anonymous assessment something they would not say to the director who appointed them, and that is not a criticism of the director.',
      ],
    },
    {
      eyebrow: 'What helps',
      heading: 'Practical support beats sympathy',
      paragraphs: [
        'What we see helping is fairly consistent: reliable supervision for the manager that is protected rather than the first thing cancelled; a peer route to someone doing the same job elsewhere in the group or the sector; genuine clarity on what can be escalated and to whom; and a realistic view from above about what is achievable at current staffing.',
        'Cover is the other big one. If leave means returning to a fortnight of accumulated problems, the manager will not take it properly, and the rest is decoration. Workable cover arrangements are frequently the single most valuable change a provider can make.',
        'None of this requires a large budget. It requires knowing which of these is missing in your service, which is what the assessment establishes.',
      ],
    },
  ],

  solution: {
    heading: 'Including the management layer in the picture',
    lead: 'We assess managers alongside frontline staff, and report on them separately, because their pressures are different.',
    steps: [
      {
        icon: 'shield',
        title: 'Confidential manager assessment',
        body: 'Covering workload, autonomy, isolation, out-of-hours demand, supervision and cover — answered privately rather than to a line manager.',
      },
      {
        icon: 'users',
        title: 'Reported separately from frontline results',
        body: 'So manager strain does not disappear into a workforce-wide average, which is exactly what usually happens to it.',
      },
      {
        icon: 'compass',
        title: 'Support that is actually deliverable',
        body: 'Protected supervision, workable cover arrangements, peer contact and clearer escalation — sized to what your organisation can genuinely sustain.',
      },
      {
        icon: 'link',
        title: 'Re-measured with everything else',
        body: 'Tracked over time, so manager wellbeing stays visible rather than resurfacing only when someone resigns.',
      },
    ],
  },

  evidenceIds: ['vacancies', 'turnover-rate'],

  objections: [
    {
      objection: 'Our manager has never said they are struggling.',
      answer:
        'That is the norm rather than reassurance. The role carries a strong expectation of coping, and for a registered manager, admitting strain can feel like a competence question. A confidential route usually surfaces what a direct conversation does not.',
    },
    {
      objection: 'Managers are paid to handle pressure.',
      answer:
        'They are, and most handle a great deal of it well. The issue is sustained pressure without recovery or support, which produces the same outcome in a capable manager as in anyone else — and losing a registered manager is considerably more disruptive than losing most other roles.',
    },
    {
      objection: 'We already have supervision in place for managers.',
      answer:
        'The useful question is whether it happens on schedule. Manager supervision is very commonly the first thing cancelled when the service is under pressure, which is precisely when it matters most. Measuring whether it actually occurs is a fair test.',
    },
    {
      objection: 'This feels like it is checking up on our managers.',
      answer:
        'It is the opposite, and framing matters here. Results come back confidentially and in aggregate; this is not a performance assessment and we would not run it as one. It is asking a group nobody usually asks how the job is going.',
    },
    {
      objection: 'We only have one or two managers, so anonymity is impossible.',
      answer:
        'A genuine constraint, and we handle it honestly rather than pretending otherwise. With very small groups we use a structured confidential conversation instead of survey reporting, and we agree in advance exactly what is shared and in what form.',
    },
    {
      objection: 'Our managers do not have time for this.',
      answer:
        'The assessment takes under ten minutes. The larger time commitment is the conversation about findings, which is generally the part managers value most — for many it is the first structured discussion about their own working conditions in a long while.',
    },
  ],

  faqs: [
    {
      question: 'What causes burnout in registered managers?',
      answer:
        'Personal regulatory accountability that does not switch off, being the escalation point for every problem in the service, covering shifts on top of a full role, professional isolation with no peer at the same level, and supervision or leave that is repeatedly deferred.',
    },
    {
      question: 'How can providers support registered manager wellbeing?',
      answer:
        'Protect their supervision so it is not the first thing cancelled, arrange cover that makes leave genuinely restful, create peer contact with managers elsewhere, be clear about what can be escalated, and be realistic about what is achievable at current staffing.',
    },
    {
      question: 'Why does manager wellbeing affect frontline staff?',
      answer:
        'Managers deliver most of the support frontline staff receive — supervision, induction, noticing when someone is struggling. A depleted manager has less capacity for that discretionary work, so strain at the management layer transmits downwards.',
    },
    {
      question: 'Can you assess managers if we only have a few?',
      answer:
        'Yes, but not through anonymous survey reporting, which cannot protect identity in a group of two or three. We use structured confidential conversations instead and agree in advance what will be shared.',
    },
    {
      question: 'Is this separate from the wider staff assessment?',
      answer:
        'It runs alongside it and is reported separately. Combining the two hides manager-specific pressure inside a workforce average, which is the most common way it gets missed.',
    },
    {
      question: 'What if the findings reflect badly on senior leadership?',
      answer:
        'Sometimes they do. We report what we find, in plain language, without softening it into uselessness. The report is yours and is not published anywhere — but it will not be worth reading if we write it to be comfortable.',
    },
  ],

  finalCta: {
    heading: 'The person holding your service together should not be the last to be asked.',
    body: 'Book a free consultation to talk about how your management layer is coping and what would help.',
  },
};
