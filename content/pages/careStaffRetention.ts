import type { LandingContent } from '@/components/seo/LandingPage';

/**
 * Forward-looking: keeping the people you have, and why they might not stay.
 * The turnover page owns the backward-looking cost and pattern of leaving.
 */
export const careStaffRetention: LandingContent = {
  path: '/care-staff-retention',
  eyebrow: 'Care staff retention',
  h1: 'People rarely leave care work suddenly.',
  h1Accent: 'They decide slowly, then go quickly.',
  lead: 'Retention is not only a pay problem, and it is not fixed by a recognition scheme. Understand what makes experienced care staff stay — and what quietly moves them towards the door months before they tell you.',

  recognition: {
    heading: 'The signals that come before a resignation',
    lead: 'By the time someone hands in notice they have usually been deciding for a while.',
    items: [
      'Experienced staff stop putting themselves forward for extra shifts they used to pick up.',
      'People who used to raise ideas in team meetings have gone quiet.',
      'Your best carers start taking their full holiday entitlement in a way they never used to.',
      'New starters are leaving inside six months, and nobody is quite sure why.',
      'The same three frustrations come up repeatedly and nothing visible has changed about them.',
      'Someone resigns and their reason on the form does not match what their colleagues tell you afterwards.',
    ],
  },

  emotion: {
    quote:
      'Almost nobody leaves care because they stopped caring. They leave because caring properly stopped feeling possible.',
  },

  consequence: {
    heading: 'What losing an experienced carer actually costs',
    lead: 'The recruitment invoice is the smallest part of it.',
    steps: [
      'You carry a vacancy, which usually means agency cover or existing staff working additional shifts to hold the rota together.',
      'You recruit and induct, which absorbs manager time you did not have and takes months before the new person is fully effective.',
      'Residents lose someone who knew them — their routines, their preferences, the small things that never make it into a care plan.',
      'The colleagues who covered the gap are now more tired than they were, which is how the next resignation becomes more likely.',
    ],
    closing:
      'This is why retention compounds in both directions. A stabilising team gets easier to staff; a destabilising one gets harder.',
  },

  education: [
    {
      eyebrow: 'Why people go',
      heading: 'Pay matters, and it is rarely the whole story',
      paragraphs: [
        'Pay is real and we would not pretend otherwise — care work is demanding and often poorly rewarded relative to that demand. But providers who improve pay alone frequently find retention improves less than expected, because pay was one factor among several.',
        'What comes up repeatedly alongside it is the predictability of the rota, whether breaks actually happen, whether someone notices good work, whether there is any route to develop, and whether raising a problem leads anywhere. Those are the things that determine whether a job is sustainable rather than merely acceptable.',
        'The most common single theme we hear is a mismatch between how someone wants to do the job and how the schedule allows them to do it. Carers who feel they are giving people less than they deserve tend to leave even when the pay is competitive, because the daily experience is one of falling short.',
      ],
    },
    {
      eyebrow: 'The first six months',
      heading: 'Early leavers and long-service leavers are two different problems',
      paragraphs: [
        'Providers often treat turnover as one number, which hides that it usually contains two distinct patterns with different causes and different fixes.',
        'Early leavers — people gone within six months — are typically an induction, expectation and support problem. They arrived with a picture of the job that did not match the reality, or they were put on shift without anyone obvious to ask. That is usually addressable and comparatively cheap to address.',
        'Long-service leavers are a different matter. When someone with five years goes, the cause is rarely recent; it is accumulated. Their departure often signals something structural, and it is worth far more attention than it usually gets, because those are the people holding your institutional knowledge.',
      ],
    },
    {
      eyebrow: 'Why exit interviews mislead',
      heading: 'People are polite on the way out',
      paragraphs: [
        'Exit interviews are worth doing and they are a weak evidence base for strategy. Someone leaving wants a reference, does not want a difficult final conversation, and often names the most socially acceptable reason available — pay, commute, family circumstances.',
        'The result is that exit data systematically over-reports easy reasons and under-reports uncomfortable ones like a specific manager relationship, feeling unsupported after a serious incident, or persistent shortfalls in staffing on particular shifts.',
        'Asking the people who have stayed, confidentially, tends to be far more informative. They are still there, they still have opinions, and they will tell you what is nearly intolerable while there is still time to change it.',
      ],
    },
  ],

  solution: {
    heading: 'Understand why people stay, before you find out why they left',
    lead: 'We measure the experience of your current workforce rather than reconstructing it from the people already gone.',
    steps: [
      {
        icon: 'clipboard',
        title: 'Confidential workforce assessment',
        body: 'Including intention-to-leave measures, so you see risk building rather than discovering it at the resignation stage.',
      },
      {
        icon: 'chart',
        title: 'Risk broken down by group',
        body: 'By site, role, shift pattern and length of service — separating your early-leaver problem from your long-service problem.',
      },
      {
        icon: 'compass',
        title: 'A plan aimed at the actual driver',
        body: 'Named actions with owners and dates, sized to your staffing and budget, tackling the two or three things doing most of the damage.',
      },
      {
        icon: 'link',
        title: 'Re-measurement over time',
        body: 'Tracking whether intention to leave falls, so you find out whether it worked before the turnover figure tells you.',
      },
    ],
  },

  evidenceIds: ['turnover-rate', 'vacancies'],

  objections: [
    {
      objection: 'Our turnover is just the sector average.',
      answer:
        'Being typical for the sector is not the same as being unavoidable, and the average includes providers with very different figures. The more useful question is which specific groups inside your organisation are driving your number.',
    },
    {
      objection: 'People leave for more money. We cannot compete on pay.',
      answer:
        'Pay is genuinely part of it. But if it were the whole story, every provider paying the same rate would have identical retention, and they do not. The differences between them sit in rota predictability, supervision, recognition and whether raising a problem changes anything.',
    },
    {
      objection: 'We already do exit interviews.',
      answer:
        'Worth continuing, though people are diplomatic on the way out and tend to name the most acceptable reason. Asking the staff who have stayed, confidentially, usually gives you a much more accurate picture — and while you can still act on it.',
    },
    {
      objection: 'We have a recognition scheme already.',
      answer:
        'Recognition schemes work when the underlying job is sustainable and land badly when it is not. Employee of the month lands very differently on a team that has not had a reliable break in a fortnight. It is worth knowing which situation you are in.',
    },
    {
      objection: 'Would this not be better spent on recruitment?',
      answer:
        'Recruiting into a service people leave quickly is expensive and demoralising for everyone involved. Most providers we work with are doing both — but working out why the back door is open usually makes the front door cheaper.',
    },
    {
      objection: 'Can you guarantee our turnover will fall?',
      answer:
        'No, and we would treat any consultancy that guarantees that with real suspicion. Turnover is affected by the local labour market, pay competition and factors outside your control. What we can do is identify what is in your control and measure whether changing it moved anything.',
    },
  ],

  faqs: [
    {
      question: 'Why do care staff leave their jobs?',
      answer:
        'Commonly a combination of pay, unpredictable rotas, workload and staffing pressure, missed breaks, limited development, feeling unrecognised, and a sense of not being able to give people the care they deserve. It is usually several of these together rather than one.',
    },
    {
      question: 'How can a care home improve staff retention?',
      answer:
        'Start by understanding why your specific staff are considering leaving, separating early leavers from long-service leavers, then change the two or three conditions doing the most damage — and measure again to check it worked.',
    },
    {
      question: 'What is a good staff turnover rate for a care provider?',
      answer:
        'There is no single right figure, and comparing against a sector average is less useful than tracking your own trend and understanding which groups drive it. Skills for Care publishes sector-wide figures for England each year for context.',
    },
    {
      question: 'How is retention different from turnover?',
      answer:
        'Retention is about the people who are still here and what would keep them. Turnover measures those who have already gone. Retention work is preventative; turnover analysis is diagnostic. Both are useful and they answer different questions.',
    },
    {
      question: 'How quickly could we expect to see a change?',
      answer:
        'Intention-to-leave measures can shift within a few months of a visible change. Turnover figures lag considerably behind that, often a year or more, which is why we track intention rather than waiting for the resignation rate to confirm it.',
    },
    {
      question: 'Do you work with providers who have very high turnover?',
      answer:
        'Yes, and often those are where the clearest patterns emerge. A high figure usually contains a small number of specific, addressable causes rather than being a sign of general dysfunction.',
    },
  ],

  finalCta: {
    heading: 'The staff you have are easier to keep than the staff you have not hired yet.',
    body: 'Book a free consultation and we will talk through what is driving people towards the door in your service.',
  },
};
