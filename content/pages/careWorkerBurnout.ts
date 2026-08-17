import type { LandingContent } from '@/components/seo/LandingPage';

/**
 * Owns the burnout mechanism — the emotional and clinical cause.
 * Retention, turnover and absence pages own the organisational consequences.
 */
export const careWorkerBurnout: LandingContent = {
  path: '/care-worker-burnout',
  eyebrow: 'Care worker burnout',
  h1: 'The people who care the most',
  h1Accent: 'are often the first to run empty.',
  lead: 'Burnout in care work is not ordinary tiredness and it does not resolve with a day off. This is what drives it, what it looks like before someone hands in their notice, and what providers can practically do.',

  recognition: {
    heading: 'What it looks like before anyone uses the word',
    lead: 'Burnout rarely arrives announced. It shows up as small changes in people who used to be reliable.',
    items: [
      'A carer who always went the extra mile now does exactly the task and no more.',
      'Handovers get shorter and more functional, and the small observations about residents stop.',
      'Someone with years of service starts taking single days at short notice.',
      'A member of staff who was warm with families becomes flat and procedural.',
      'People stop raising concerns, not because there are fewer, but because raising them stopped feeling worth it.',
      'Your most experienced staff quietly stop volunteering for extra shifts.',
    ],
  },

  emotion: {
    quote:
      'Compassion is not an unlimited resource. It is drawn from somewhere, and in care work it is drawn on every single shift.',
  },

  consequence: {
    heading: 'Why burnout does not stay contained to one person',
    lead: 'The mechanism is what makes it spread, and it is the reason early attention matters.',
    steps: [
      'An exhausted member of staff takes short-notice absence, which is the first visible symptom rather than the beginning of the problem.',
      'Their shift is covered by colleagues or agency, so the emotional and physical load shifts onto the people who came in.',
      'Those colleagues absorb it because they care about the residents, and their own reserves reduce.',
      'Eventually someone reaches the point of leaving — and the load redistributes again across a smaller team.',
    ],
    closing:
      'This is why burnout is an organisational issue rather than an individual one. Supporting the person who is struggling matters, and it will not change the conditions producing it.',
  },

  education: [
    {
      eyebrow: 'What causes it',
      heading: 'Burnout is not weakness, and it is not caused by caring too much',
      paragraphs: [
        'The research literature consistently describes burnout as arising from sustained workplace conditions rather than individual fragility — chronic workload pressure, low control over how work is done, insufficient recovery, weak recognition, and value conflict between how someone wants to do the job and how the job allows them to do it.',
        'Every one of those is common in care. Staffing pressure creates workload. Rotas set by rota necessity remove control. Long shifts with interrupted breaks prevent recovery. And value conflict is close to universal: almost every carer we hear from describes wanting to spend more time with people than the round permits.',
        'That framing matters because it changes what you do about it. If burnout were about individual resilience, resilience training would fix it. Since it is about conditions, the useful question is which condition, in which team, is doing the most damage.',
      ],
    },
    {
      eyebrow: 'What makes care different',
      heading: 'Emotional labour is the part that rarely appears on any rota',
      paragraphs: [
        'Care staff manage their own feelings as part of the job. They stay calm during distressed behaviour, they are warm with a family who are angry because they are frightened, and they carry on after a resident they have known for years dies. None of that appears in a task list, and all of it costs something.',
        'Grief in particular is often unacknowledged. A carer may lose several people they knew well over a year and be expected to complete the shift, then return the next day to a newly occupied room. Where there is no routine way to mark that, the weight accumulates quietly.',
        'Night staff carry a specific version of this — sole responsibility, fewer colleagues to decompress with, and a body clock that never fully settles. It is one of the most common places we find concentrated pressure, and one of the least visible from an office during the day.',
      ],
    },
    {
      eyebrow: 'What actually helps',
      heading: 'Small structural changes beat large gestures',
      paragraphs: [
        'The interventions that hold tend to be unglamorous and specific: two protected break windows on a long shift that someone is actually accountable for; predictable late-shift handovers piloted on one unit for four weeks; a short routine acknowledgement after a resident death; supervision that happens on schedule rather than when there is time.',
        'What tends not to hold is anything requiring extra discretionary effort from people who have none left. A wellbeing app is a request for effort. A resilience workshop at 2pm asks night staff to give up sleep. Neither is wrong in principle; both fail when they are the whole answer.',
        'The reason we start with measurement is that these changes are cheap but not free — you can sustain two or three of them, not fifteen. Knowing which two matter most in your organisation is the difference between a change that lasts and a policy that quietly lapses.',
      ],
    },
  ],

  solution: {
    heading: 'Finding where the pressure actually sits',
    lead: 'We look for the specific conditions producing burnout in your service, not a general diagnosis you could have read anywhere.',
    steps: [
      {
        icon: 'clipboard',
        title: 'Confidential burnout review',
        body: 'A structured assessment across the whole workforce, reaching night and bank staff, with questions covering workload, control, recovery, recognition and emotional load.',
      },
      {
        icon: 'chart',
        title: 'Pressure mapped by team and shift',
        body: 'Where it concentrates — which unit, which shift pattern, which length of service — so you act where it will matter rather than everywhere at once.',
      },
      {
        icon: 'compass',
        title: 'Two or three changes, not fifteen',
        body: 'Practical adjustments sized to your staffing levels, with named owners and target dates, chosen because they are sustainable rather than impressive.',
      },
      {
        icon: 'link',
        title: 'Re-measurement to prove movement',
        body: 'The same measures after an agreed period, so you know whether the changes worked instead of hoping they did.',
      },
    ],
  },

  evidenceIds: ['sickness-absence', 'turnover-rate'],

  objections: [
    {
      objection: 'Is burnout not just part of care work?',
      answer:
        'Emotional demand is inherent to care. Burnout is not — it is what happens when that demand runs without adequate recovery, control or recognition for long enough. Treating it as inevitable is how it becomes permanent.',
    },
    {
      objection: 'We already offer mental health support.',
      answer:
        'That matters and it should continue. It supports individuals who are already struggling, which is necessary but reactive. It does not change the rota pattern that is producing the strain in the first place, and it only ever reaches the people who come forward.',
    },
    {
      objection: 'We have run resilience training.',
      answer:
        'Resilience training can help people cope with difficult work. Where it struggles is when the pressure is structural, because it implicitly locates the problem in the staff rather than the conditions — and experienced carers notice that framing immediately.',
    },
    {
      objection: 'Our staff will not admit they are struggling.',
      answer:
        'Many will not say it to a manager, and that is a rational choice when you are worried about looking unable to cope. That is exactly why the assessment is confidential and reported in aggregate. People will tell you things anonymously that they will not say in supervision.',
    },
    {
      objection: 'We cannot change our staffing levels.',
      answer:
        'Understood — most providers cannot, and we do not build recommendations that assume you can. Break protection, handover predictability and how deaths are acknowledged are all changeable within existing staffing, and they are frequently where the biggest gains sit.',
    },
    {
      objection: 'How do we know this will work?',
      answer:
        'We cannot promise a specific outcome and would not trust anyone who did. What we can do is measure the position before, agree changes with you, and measure again afterwards — so you find out honestly whether it moved rather than taking anyone on faith.',
    },
  ],

  faqs: [
    {
      question: 'What causes burnout in care workers?',
      answer:
        'Sustained workload pressure, low control over how work is done, insufficient recovery between shifts, weak recognition, and conflict between how staff want to care for people and what the schedule allows. Emotional labour and repeated bereavement add to it in care specifically.',
    },
    {
      question: 'What are the early signs of burnout in a care team?',
      answer:
        'Emotional flatness with residents and families, shorter and more functional handovers, doing the task but no longer the extras, short-notice single-day absence among previously reliable staff, and a drop in people raising concerns.',
    },
    {
      question: 'Is burnout the same as stress?',
      answer:
        'No. Stress is usually about too much pressure at a point in time and tends to ease when the pressure does. Burnout is a state of exhaustion and disengagement built up over a long period, and it does not resolve with a weekend off.',
    },
    {
      question: 'Can burnout be prevented, or only managed?',
      answer:
        'The conditions that produce it can be changed, which is prevention. Break protection, predictable rotas, real supervision and routine acknowledgement of difficult events all reduce the load before it accumulates.',
    },
    {
      question: 'How do you measure burnout across a workforce?',
      answer:
        'Through a confidential assessment covering exhaustion, disengagement, workload, control and recovery, broken down by site, role and shift pattern so you can see where it concentrates rather than getting one organisation-wide number.',
    },
    {
      question: 'Does burnout affect registered managers too?',
      answer:
        'Frequently, and it is often missed because managers are the ones expected to spot it in everyone else. We cover the management layer specifically on our registered manager wellbeing page.',
    },
  ],

  finalCta: {
    heading: 'Exhaustion is not a personal failing. It is a condition you can measure and change.',
    body: 'Book a free consultation to talk through what you are seeing in your team and what would help.',
  },
};
