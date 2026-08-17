import type { LandingContent } from '@/components/seo/LandingPage';

/** The measurable operational symptom. The burnout page owns the underlying cause. */
export const careStaffAbsence: LandingContent = {
  path: '/care-staff-absence',
  eyebrow: 'Sickness absence',
  h1: 'Short-notice absence is a symptom.',
  h1Accent: 'It is worth reading rather than policing.',
  lead: 'Absence forces last-minute cover, pushes agency spend up and lands the shortfall on the staff who did turn up. Understanding the pattern behind it is usually more effective than tightening the policy.',

  recognition: {
    heading: 'The Saturday morning phone call',
    lead: 'Absence in care is rarely evenly spread. The concentration is where the information is.',
    items: [
      'The same shifts are short repeatedly, and it is always a scramble to cover them.',
      'Absence clusters on particular units or rounds rather than spreading evenly.',
      'Single days at short notice are more common than longer certificated periods.',
      'Agency spend is rising and is being treated as a budget problem rather than a signal.',
      'Return-to-work conversations happen, and the same reasons keep appearing across different people.',
      'Your most reliable staff have started taking the odd day, which is new.',
    ],
  },

  emotion: {
    quote:
      'Every unfilled shift lands on somebody. Usually the person who has already covered the last three.',
  },

  consequence: {
    heading: 'The cover loop',
    lead: 'Absence is expensive in ways that do not appear in the absence figure itself.',
    steps: [
      'A shift goes short at short notice, so a manager spends the morning ringing round instead of managing.',
      'It is filled with agency at premium rates, or by a colleague working a fifth or sixth consecutive shift.',
      'Continuity for residents drops, because agency staff do not know the routines or the early warning signs.',
      'The colleague who covered is more depleted, which makes their own absence — or resignation — more likely.',
    ],
    closing:
      'Policy tightening can suppress the reported number without touching the loop. The pressure simply resurfaces somewhere less visible.',
  },

  education: [
    {
      eyebrow: 'Reading the pattern',
      heading: 'Where and when matters more than how much',
      paragraphs: [
        'An organisation-wide absence rate tells you very little. The same rate can describe a workforce with a broad low level of absence or one where a few teams are under severe strain, and those require completely different responses.',
        'The breakdowns that consistently reveal something are by shift pattern, by unit or round, by length of service, and by day of the week. Concentration on weekend lates, or among staff with five or more years of service, or on one round with a particularly difficult travel schedule — each points somewhere specific.',
        'Short-notice single-day absence behaves differently from certificated longer-term absence and should be looked at separately. The first is often a recovery signal — people at the edge of coping taking the day they need to keep going. The second is usually a health matter requiring occupational health rather than workforce analysis.',
      ],
    },
    {
      eyebrow: 'Why policy alone struggles',
      heading: 'Trigger points measure the symptom, not the cause',
      paragraphs: [
        'Most providers have an absence policy with trigger points and return-to-work meetings. These are reasonable and often necessary — they create consistency and they catch genuine health issues that need support.',
        'What they cannot do is explain why absence concentrates where it does. A trigger point applied to a carer on a chronically short-staffed round tells you they have hit the threshold; it does not tell you the round has been running one person light for eight months.',
        'There is also a risk worth naming. Tightening enforcement without addressing the underlying pressure tends to convert absence into presenteeism — people coming in unwell — and eventually into resignations. The figure improves while the situation does not, which is the worst of both outcomes.',
      ],
    },
    {
      eyebrow: 'What helps',
      heading: 'Fix the shift, not the person',
      paragraphs: [
        'The changes that reduce absence sustainably tend to address recovery and predictability. Protected breaks on long shifts. Rotas published far enough ahead that people can arrange their lives. Limits on consecutive long shifts. Realistic travel time between domiciliary calls. Reliable cover so leave is genuinely restful.',
        'Support at the individual level matters too — occupational health referrals, phased returns, adjustments — and works considerably better when the conditions producing the strain have also been addressed. Otherwise you are returning someone to the situation that made them unwell.',
        'The point of measuring first is to know which of these applies to you. Break protection is the answer in some services and irrelevant in others where the real issue is travel time or rota notice.',
      ],
    },
  ],

  solution: {
    heading: 'Reading absence as information',
    steps: [
      {
        icon: 'chart',
        title: 'Break the pattern down',
        body: 'Absence analysed by shift pattern, unit, round, day and length of service — separating short-notice from certificated absence.',
      },
      {
        icon: 'clipboard',
        title: 'Ask what sits behind it',
        body: 'A confidential assessment covering workload, breaks, rota predictability and recovery, so the pattern has an explanation rather than a hypothesis.',
      },
      {
        icon: 'compass',
        title: 'Change the conditions',
        body: 'Practical adjustments to breaks, rota notice, consecutive shifts or travel time, with named owners and target dates.',
      },
      {
        icon: 'link',
        title: 'Watch both numbers',
        body: 'Re-measurement of absence and of the underlying wellbeing measures, so you can tell improvement from suppression.',
      },
    ],
  },

  evidenceIds: ['sickness-absence', 'turnover-rate'],

  objections: [
    {
      objection: 'We already have an absence management policy.',
      answer:
        'Most providers do, and you need one. A policy creates consistency and catches health issues needing support. What it cannot do is tell you why absence concentrates on particular shifts, which is where the addressable causes usually sit.',
    },
    {
      objection: 'Some of this is just people taking advantage.',
      answer:
        'A small amount sometimes is, and that is a management matter handled through your policy. What we would gently push back on is treating it as the main explanation, because in most services the pattern turns out to be concentrated on specific shifts rather than specific people.',
    },
    {
      objection: 'Our absence rate is around the sector average.',
      answer:
        'Then the more useful question is where inside your organisation it sits. An average rate can conceal one team under serious strain, and that team is where both the risk and the opportunity are.',
    },
    {
      objection: 'We cannot afford to change staffing levels.',
      answer:
        'Understood, and our recommendations do not assume you can. Break protection, rota notice periods and limits on consecutive long shifts are all achievable within existing staffing, and they are frequently where the movement comes from.',
    },
    {
      objection: 'Would occupational health not be the right route?',
      answer:
        'For individual health issues, yes, and we would recommend it. Occupational health supports one person at a time; it is not designed to identify that a particular round has been running short for months.',
    },
    {
      objection: 'What if the analysis shows a manager is the problem?',
      answer:
        'Sometimes it does. We report it factually and without naming individuals in the written report, then discuss it with you directly. Findings like that need handling carefully, and burying them helps nobody.',
    },
  ],

  faqs: [
    {
      question: 'What is the average sickness absence rate in social care?',
      answer:
        'Skills for Care publishes average sickness absence days per employee for adult social care in England annually — the current figure and period are cited with a source link on this page.',
    },
    {
      question: 'How do you reduce sickness absence in a care home?',
      answer:
        'Find where it concentrates, establish what is driving it, and change those conditions — commonly break protection, rota notice, limits on consecutive long shifts and reliable leave cover. Policy enforcement alone tends to suppress the figure rather than improve the situation.',
    },
    {
      question: 'Is short-notice absence different from long-term sickness?',
      answer:
        'Yes, and they should be analysed separately. Short-notice single-day absence often signals people at the edge of coping; certificated long-term absence is usually a health matter needing occupational health support.',
    },
    {
      question: 'Can absence data be linked to wellbeing survey results?',
      answer:
        "At team and shift-pattern level, yes, and that is where it becomes genuinely useful. Never at individual level — linking a person's absence record to their confidential survey response would break the confidentiality the survey depends on.",
    },
    {
      question: 'Does tightening the absence policy work?',
      answer:
        'It can reduce reported absence without changing the underlying pressure, which typically resurfaces as presenteeism or resignations. A policy is worth having; it is not a substitute for addressing the cause.',
    },
    {
      question: 'How long before absence figures respond to changes?',
      answer:
        'Short-notice absence can respond within a few months of a genuine change to break protection or rota predictability. We recommend watching the underlying wellbeing measures alongside it, so you can distinguish real improvement from suppression.',
    },
  ],

  finalCta: {
    heading: 'Your absence figures are trying to tell you where the pressure sits.',
    body: 'Book a free consultation and we will talk through what the pattern in your service might mean.',
  },
};
