import type { LandingContent } from '@/components/seo/LandingPage';

/** The measurement service. Owns "assessment" and "survey" search intent. */
export const workforceWellbeingAssessment: LandingContent = {
  path: '/workforce-wellbeing-assessment',
  eyebrow: 'Workforce wellbeing assessment',
  h1: 'Before you decide what your staff need,',
  h1Accent: 'find out what they are experiencing.',
  lead: 'A confidential workforce wellbeing assessment built for care working patterns — reaching nights, bank and part-time staff, and producing a report you can act on rather than a dashboard you have to decode.',

  recognition: {
    heading: 'You know something is wrong. You are less sure what.',
    lead: 'Most providers who come to us can describe the symptoms precisely and the cause not at all.',
    items: [
      'Absence is up, but not evenly, and nobody can say which teams or shifts are driving it.',
      'Exit conversations give you polite reasons that do not match what you suspect is really going on.',
      'One unit feels fine and another feels heavy, and the difference is not in any figure you hold.',
      'You have tried something already and cannot tell whether it worked.',
      'Your instinct says the night team is struggling, but instinct is hard to take to a board meeting.',
      'You are being asked to invest in wellbeing and cannot yet say what you would be investing in.',
    ],
  },

  emotion: {
    quote:
      'Your workforce is telling you something. The question is whether anyone has asked in a way they can safely answer.',
  },

  consequence: {
    heading: 'What guessing costs',
    lead: 'Acting without measuring is not faster. It is just less visible when it fails.',
    steps: [
      'You choose an initiative based on what is easiest to buy rather than what your staff actually need.',
      'Take-up is low, because the people it was meant for were on shift when it ran.',
      'Nothing measurable changes, and the budget is spent for the year.',
      'Staff conclude that wellbeing initiatives here are decorative, which makes the next one harder to land.',
    ],
    closing:
      'The expensive part is rarely the assessment. It is the year of well-intentioned effort aimed at the wrong problem.',
  },

  education: [
    {
      eyebrow: 'What it involves',
      heading: 'A short, confidential set of questions — designed to be answerable on a break',
      paragraphs: [
        'The assessment is built around how care actually runs. It is short enough to complete on a phone during a break, works on any device, and does not require a work email address — which matters, because a large part of your workforce does not have one.',
        'Questions cover workload and staffing pressure, rota predictability, breaks and recovery, supervision and support, recognition, psychological safety, and intention to leave. We adapt the wording to your setting, so a domiciliary round and a residential unit are not asked identical questions about handovers.',
        'Everything is confidential. Staff are told plainly how their answers will be used before they start, because a promise of confidentiality that nobody explains is not one anybody trusts.',
      ],
    },
    {
      eyebrow: 'Reaching everyone',
      heading: 'Participation is the number that decides whether the findings mean anything',
      paragraphs: [
        'A survey that reaches only day staff describes only day staff. We design distribution around your rota — timing reminders to catch night handovers, giving bank staff a route in, and working with your managers on how it is introduced, because a link forwarded with no explanation gets ignored.',
        'We treat participation below roughly 40 per cent as a signal that findings cannot safely be generalised to the whole workforce. If we get there, we will say so and recommend extending the window rather than writing a confident report on thin data.',
        'That is a commercially inconvenient position and we hold it anyway. A report that overstates its own reliability is worse than no report, because you will make decisions on it.',
      ],
    },
    {
      eyebrow: 'What you receive',
      heading: 'A written report, in plain English, that a busy manager can act on',
      paragraphs: [
        'You get a written report rather than a login. It opens with what we found and what we think it means, then breaks results down by site, role and shift pattern so you can see where pressure concentrates rather than being handed a single organisation-wide score.',
        'Each theme comes with what staff actually reported, how it compares to the previous round if there is one, and what we would suggest doing about it. Recommendations are sized to your staffing levels — there is no point recommending something that requires a supernumerary member of staff you do not have.',
        'Then a consultant talks you through it on a call. That step is not optional in our process, because a report nobody explains tends to be filed rather than used.',
      ],
    },
  ],

  solution: {
    heading: 'How an assessment runs, start to finish',
    lead: 'About four weeks from agreement to the conversation about what to do next.',
    steps: [
      {
        icon: 'clipboard',
        title: 'We build it around your setting',
        body: 'A short scoping call to understand your rota patterns, sites and roles, then a question set adapted to how your service actually operates.',
      },
      {
        icon: 'users',
        title: 'We reach your whole workforce',
        body: 'A confidential link you share with staff, with reminders timed around handovers so night and bank teams are genuinely included.',
      },
      {
        icon: 'chart',
        title: 'We analyse and write it up',
        body: 'Patterns by site, role and shift pattern, with an honest note on participation and what the data can and cannot support.',
      },
      {
        icon: 'phone',
        title: 'We talk you through it',
        body: 'A consultant explains the findings in plain language, answers the awkward questions, and agrees what happens next.',
      },
    ],
  },

  evidenceIds: ['sickness-absence', 'turnover-rate'],

  objections: [
    {
      objection: 'We already run staff surveys.',
      answer:
        'Then the useful questions are what your response rate looked like among night and bank staff, and what visibly changed afterwards. Those two answers usually explain why the last survey did not shift anything, and neither is a criticism of the people who ran it.',
    },
    {
      objection: 'Our staff will not fill in another survey.',
      answer:
        'Survey fatigue is real and it is usually earned — people stop responding when nothing follows. We keep it short, we tell staff exactly how the answers are used, and we build in the follow-up conversation so there is something to point to next time.',
    },
    {
      objection: 'How do we know staff will be honest?',
      answer:
        'Because it is confidential, because we report in aggregate with a minimum group size, and because we say so plainly at the start. No manager sees an individual response. That constraint is the whole reason the answers are worth having.',
    },
    {
      objection: 'We have not got time to run a project like this.',
      answer:
        'The load sits with us by design. You need one scoping call, help introducing it to your team, and one conversation about the findings. We build the assessment, chase participation and write the report.',
    },
    {
      objection: 'What if the results are bad?',
      answer:
        'They often contain something uncomfortable, and that is the point of doing it. A finding you did not want is still better than a problem you cannot name. Nothing is published anywhere — the report is yours.',
    },
    {
      objection: 'Is £35 per staff member good value?',
      answer:
        'Compare it to what replacing one experienced care worker costs you in recruitment, induction and agency cover in the meantime. If the assessment prevents a single avoidable resignation it has usually paid for itself, though we would not promise you that as a guarantee.',
    },
  ],

  faqs: [
    {
      question: 'What is a workforce wellbeing assessment?',
      answer:
        'A structured, confidential measurement of how sustainable working conditions are across a workforce — covering workload, rota predictability, breaks, supervision, recognition and intention to leave — reported as aggregate patterns by site, role and shift pattern.',
    },
    {
      question: 'How long does the survey take a member of staff to complete?',
      answer:
        'Under ten minutes on a phone. It is deliberately short enough to finish on a break, because anything longer excludes the people under the most time pressure — who are usually the ones you most need to hear from.',
    },
    {
      question: 'How long is the whole process?',
      answer:
        'Typically a two to three week response window, about a week for analysis and write-up, then the feedback call. Around four weeks end to end.',
    },
    {
      question: 'Can staff be identified from their answers?',
      answer:
        'No. Results are aggregated and we apply a minimum group size before publishing any breakdown, so small teams cannot be reverse-engineered into individuals.',
    },
    {
      question: 'What happens if not enough staff respond?',
      answer:
        'We tell you, and we recommend extending the window or changing how it is being shared. If participation stays too low we will say the findings cannot be generalised rather than writing a confident report on weak data.',
    },
    {
      question: 'Do you re-measure afterwards?',
      answer:
        'We recommend it, usually three to six months after changes are made, using the same measures. Without a second measurement you cannot tell whether anything you did worked.',
    },
    {
      question: 'How much does an assessment cost?',
      answer:
        'From £35 per staff member, with the final figure depending on workforce size, number of sites and whether you want the improvement plan and ongoing support alongside it. You get a written quote after a free consultation.',
    },
  ],

  finalCta: {
    heading: 'Your workforce is telling you something. The question is whether you are listening.',
    body: 'Book a free consultation and we will talk through what an assessment would tell you — and whether you need one.',
  },
};
