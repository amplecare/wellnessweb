import type { LandingContent } from '@/components/seo/LandingPage';

/** Backward-looking: the cost and pattern of people who already left. */
export const careStaffTurnover: LandingContent = {
  path: '/care-staff-turnover',
  eyebrow: 'Care staff turnover',
  h1: 'A turnover figure tells you how many people left.',
  h1Accent: 'It does not tell you why.',
  lead: 'Turnover in adult social care runs well above most sectors. What the number actually costs a provider, how to read the pattern hiding inside it, and how to find the causes you can do something about.',

  recognition: {
    heading: 'The number is not the problem. Not knowing what is behind it is.',
    lead: 'Most providers can quote their turnover rate. Far fewer can explain which parts of the workforce it comes from.',
    items: [
      'You know the headline percentage but not which sites, shifts or roles are driving it.',
      'A single unit seems to lose people repeatedly while others are stable, and nobody has established why.',
      'You cannot separate the people who left in month three from the ones who left after six years.',
      'Agency spend keeps rising and is treated as a recruitment issue rather than a retention one.',
      'The board asks what you are doing about turnover and the honest answer is recruiting harder.',
      'Every departure is explained individually, so no pattern is ever visible across them.',
    ],
  },

  emotion: {
    quote:
      'Every experienced carer who leaves takes something with them that no handover document captures.',
  },

  consequence: {
    heading: 'What a single departure actually sets off',
    lead: 'The recruitment cost is the part that appears on an invoice. It is not the largest part.',
    steps: [
      'The post sits vacant, covered by agency or by existing staff taking extra shifts on top of their own.',
      'Recruitment and induction consume manager time, and a new starter takes months to reach full effectiveness.',
      'Residents lose continuity — the person who knew their routines, their family, and the signs that something was wrong.',
      'The colleagues who absorbed the gap are more depleted than before, which raises the chance of the next resignation.',
    ],
    closing:
      'Turnover is self-reinforcing in both directions. That is why the pattern matters more than the percentage.',
  },

  education: [
    {
      eyebrow: 'Reading the number',
      heading: 'One turnover figure usually hides three different problems',
      paragraphs: [
        'A single organisation-wide rate is close to useless for deciding what to do. Broken down, it almost always separates into distinct groups with distinct causes.',
        'Early leavers, gone within six months, generally point to recruitment, induction or expectation problems — people arrived with a picture of the job that did not match, or started without anyone obvious to ask. This is usually the cheapest group to address.',
        'Long-service leavers point to something accumulated: sustained workload, a rota that never became predictable, or repeated experience of raising concerns that went nowhere. And a third group leaves for genuinely external reasons — moving away, family circumstances, a career change — which no intervention will affect and which should not be counted against your efforts.',
      ],
    },
    {
      eyebrow: 'The cost',
      heading: 'Counting the real figure, not just the advert',
      paragraphs: [
        'When providers cost turnover they typically count advertising and agency. A fuller figure includes manager time on recruitment and induction, the training investment lost with the leaver, reduced productivity while a new starter builds up, the overtime premium paid to cover, and the effect on the remaining team.',
        'We would rather not put a national average per-departure figure on this page, because the credible published estimates vary widely by role and region and quoting one precisely would imply more certainty than exists. What we will say is that when providers work it out for their own service, the number is consistently larger than they expected.',
        'It is worth calculating for your own organisation. It changes how a retention conversation lands with a finance director far more effectively than any sector statistic.',
      ],
    },
    {
      eyebrow: 'What to do about it',
      heading: 'Exit data will not get you there on its own',
      paragraphs: [
        'Exit interviews under-report uncomfortable causes. People leaving want a reference and a clean ending, so they name reasons that are true but partial — pay, commute, family. The manager relationship, the incident nobody debriefed, the shift that was short-staffed for a year: those tend to go unsaid.',
        'The more reliable source is the people still employed. Asking your current workforce confidentially about workload, rota predictability, support and intention to leave gives you a forward-looking picture, while there is still time to act on it.',
        'Intention-to-leave measures are particularly useful because they move months before turnover does. If you wait for the turnover figure to confirm an improvement, you are working with a lagging indicator that reports on decisions people made a year ago.',
      ],
    },
  ],

  solution: {
    heading: 'Finding the pattern inside your turnover figure',
    steps: [
      {
        icon: 'chart',
        title: 'Break the figure apart',
        body: 'Turnover separated by site, role, shift pattern and length of service, so early leavers and long-service leavers are treated as the different problems they are.',
      },
      {
        icon: 'clipboard',
        title: 'Ask the people still here',
        body: 'A confidential assessment including intention to leave, giving you a forward-looking signal rather than a post-mortem.',
      },
      {
        icon: 'compass',
        title: 'Act on the two or three real drivers',
        body: 'Named actions with owners and dates, aimed at what the data shows rather than at what is easiest to buy.',
      },
      {
        icon: 'link',
        title: 'Track intention, not just resignations',
        body: 'Re-measurement that shows movement months before the turnover rate would, so you can correct course rather than wait.',
      },
    ],
  },

  evidenceIds: ['turnover-rate', 'vacancies'],

  objections: [
    {
      objection: 'High turnover is normal in this sector.',
      answer:
        "It is common, which is not the same as fixed. The published sector figure is an average containing providers with very different results, and the differences between them are mostly in things within a provider's control.",
    },
    {
      objection: 'We cannot compete with the pay elsewhere.',
      answer:
        'Pay matters and we would not argue otherwise. But providers paying identical rates have noticeably different retention, and the gap sits in rota predictability, supervision quality, recognition and whether raising a problem leads anywhere.',
    },
    {
      objection: 'We already track turnover monthly.',
      answer:
        'Tracking the number is a good start. The question is whether it is broken down by length of service and shift pattern — because an undifferentiated rate cannot tell you which of several different problems you actually have.',
    },
    {
      objection: 'Surely recruitment is the more urgent priority?',
      answer:
        'When you are short-staffed it certainly feels that way. The difficulty is that recruiting into a service people leave quickly is expensive and repetitive. Most providers do both, and understanding the exits usually makes the recruitment cheaper.',
    },
    {
      objection: 'Our exit interviews already tell us why people leave.',
      answer:
        'They tell you what people are willing to say on the way out, which is systematically the more comfortable half. Asking current staff confidentially fills in the rest, and does it while you can still act.',
    },
    {
      objection: 'Can you guarantee our turnover will come down?',
      answer:
        'No. Turnover is influenced by the local labour market and pay competition, neither of which we control. We can identify what is within your control and measure honestly whether changing it moved anything.',
    },
  ],

  faqs: [
    {
      question: 'What is the average staff turnover rate in social care?',
      answer:
        'Skills for Care reports turnover across the independent adult social care sector in England annually — the current figure and reporting period are cited with a source link on this page. Rates vary considerably by role, region and provider.',
    },
    {
      question: 'How much does staff turnover cost a care provider?',
      answer:
        'More than the recruitment advert. A full cost includes agency and overtime cover, manager time on recruitment and induction, lost training investment, reduced productivity during ramp-up, and the added pressure on remaining staff. Calculating it for your own service is more useful than any national average.',
    },
    {
      question: 'What is the difference between turnover and retention?',
      answer:
        'Turnover measures people who have already left; retention is about keeping the people you still have. Turnover is diagnostic and backward-looking, retention is preventative and forward-looking.',
    },
    {
      question: 'Why do so many care staff leave within the first six months?',
      answer:
        'Usually a mismatch between the job as described and the job as experienced, combined with thin induction and no obvious person to ask when something goes wrong. Early turnover is often the most addressable part of the figure.',
    },
    {
      question: 'How quickly can turnover realistically improve?',
      answer:
        'Turnover is a lagging indicator and can take a year or more to reflect changes. Intention-to-leave measures move much sooner, which is why we track those rather than waiting for the resignation rate.',
    },
    {
      question: 'Should we compare our turnover to the sector average?',
      answer:
        'As context, yes — but sparingly. Your own trend and the breakdown by group are far more actionable than a comparison against an average that contains providers in very different circumstances.',
    },
  ],

  finalCta: {
    heading: 'You know the number. It is worth knowing the reasons behind it.',
    body: 'Book a free consultation and we will talk through what is driving turnover in your service.',
  },
};
