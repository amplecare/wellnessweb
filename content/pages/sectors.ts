import type { LandingContent } from '@/components/seo/LandingPage';

/**
 * Sector pages.
 *
 * The brief is explicit that these must not be one template with the setting name
 * swapped, and it is right — thin duplicate pages are both a ranking problem and an
 * obvious tell to a reader who works in that setting. So each of these leads with the
 * pressure that is genuinely specific to it:
 *
 *   - care homes        → rota patterns, night teams, long relationships with residents
 *   - nursing homes     → clinical accountability on top of care work, RN retention
 *   - domiciliary       → lone working, travel time, a workforce rarely in one room
 *   - supported living  → small teams, behavioural support, long-term relationships
 *   - healthcare        → clinical governance, mixed professional groups
 *
 * If you cannot say something true and specific about a setting, do not add a page
 * for it. A thin page costs more than a missing one.
 */

export const careHomes: LandingContent = {
  path: '/care-homes',
  eyebrow: 'Care homes',
  h1: 'A care home runs on the rota',
  h1Accent: 'and on the goodwill that fills its gaps.',
  lead: 'Residential care puts specific pressures on staff: long shifts, night teams working with minimal cover, and relationships with residents that end in bereavement. Wellbeing support built around how a care home actually operates.',

  recognition: {
    heading: 'What we hear from residential services',
    items: [
      'The night team is the least visible part of the workforce and often the most under strain.',
      'Long shifts make breaks theoretical — they are on the rota and they do not always happen.',
      'Staff form real relationships with residents over years, then are expected to carry on the next day after a death.',
      'One unit feels settled and another does not, and the difference is not in the staffing numbers.',
      'Weekend lates are consistently the hardest shifts to fill and the most likely to go short.',
      'Bank staff hold the rota together and are rarely included in anything.',
    ],
  },

  emotion: {
    quote:
      'A carer may lose several people they knew well in a year, and then walk back into a newly occupied room.',
  },

  consequence: {
    heading: 'Why residential pressure concentrates',
    steps: [
      'Long shifts without protected recovery leave staff arriving at the next one already depleted.',
      'Night staff carry sole responsibility with fewer colleagues to decompress with, and a body clock that never settles.',
      'Unacknowledged bereavement accumulates quietly, because there is rarely a routine way to mark it.',
      'The staff who cover the gaps are usually the most experienced, and they are the most expensive to lose.',
    ],
  },

  education: [
    {
      eyebrow: 'Nights',
      heading: 'The shift your daytime channels never reach',
      paragraphs: [
        'Night teams are consistently one of the places we find concentrated pressure, and consistently one of the least visible from an office operating during the day. They work with fewer colleagues, handle deterioration and distress with less immediate support, and are frequently excluded from anything scheduled — training, briefings, wellbeing sessions — because it all happens while they are asleep.',
        'They are also, in our experience, the group most likely to say that nobody asks them anything. That is straightforwardly fixable, and fixing it often produces a disproportionate improvement relative to the effort.',
        'Any measurement that does not deliberately time itself around night handovers will under-represent this group, and will therefore under-represent the problem.',
      ],
    },
    {
      eyebrow: 'Bereavement',
      heading: 'Grief that has nowhere to go',
      paragraphs: [
        'In residential care, staff know residents for months or years. They know their families, their routines, and what a good day looks like for them. When that person dies, the loss is genuine — and the expectation is usually that the shift continues.',
        'Most homes we speak to have no routine way of marking it. Not a policy or a formal debrief necessarily, just a consistent small practice: an acknowledgement at handover, a moment before the room is turned over, a manager checking in with the staff who were closest.',
        'It is one of the cheapest changes available and one of the most frequently mentioned by staff when we ask what would help.',
      ],
    },
    {
      eyebrow: 'Getting it measured',
      heading: 'Reaching a workforce that is never all in the building at once',
      paragraphs: [
        'A care home workforce is spread across shifts by design. There is no moment when everyone is present, which means there is no single point at which to gather views — and it is why assessments run through managers alone tend to return a day-shift picture.',
        'We design distribution around your rota: reminders timed for night handovers, a route in for bank staff, and short enough questions to complete on a break. Participation is the number that decides whether the findings can be trusted, so it gets the attention.',
      ],
    },
  ],

  solution: {
    heading: 'How we work with residential services',
    steps: [
      {
        icon: 'clipboard',
        title: 'Assessment built around your rota',
        body: 'Timed to reach nights, weekends and bank staff rather than technically inviting them.',
      },
      {
        icon: 'chart',
        title: 'Results by unit and shift',
        body: 'So you can see that it is the weekend lates on one unit, rather than concluding the whole home is struggling.',
      },
      {
        icon: 'heart',
        title: 'Changes that fit residential work',
        body: 'Break protection, handover predictability, and a routine way of acknowledging a resident death.',
      },
      {
        icon: 'link',
        title: 'Re-measurement',
        body: 'The same questions later, so you know whether it worked rather than assuming.',
      },
    ],
  },

  evidenceIds: ['turnover-rate', 'sickness-absence'],

  objections: [
    {
      objection: 'Our night team is small — would they even be identifiable?',
      answer:
        'A fair concern and one we take seriously. We apply a minimum group size before publishing any breakdown, so a team of four is never reported separately in a way that could identify individuals. Where a group is too small, we say so rather than reporting it anyway.',
    },
    {
      objection: 'We cannot increase staffing on nights.',
      answer:
        'Most providers cannot, and our recommendations do not assume it. Contact with the day team, inclusion in briefings, a reliable route to escalate, and acknowledgement of difficult nights are all achievable at current staffing.',
    },
    {
      objection: 'Bereavement is part of the job in a care home.',
      answer:
        'It is, and staff understand that when they take the role. The question is not whether it happens but whether it is ever acknowledged. The cost comes from it accumulating unmarked, not from the loss itself.',
    },
    {
      objection: 'We are a single home, not a group. Is this proportionate?',
      answer:
        'Single homes are a good fit, and the assessment is priced per staff member so a smaller service costs less. Findings are often clearer in a single home because there is less organisational noise to see through.',
    },
  ],

  faqs: [
    {
      question: 'How do you assess wellbeing across all shifts in a care home?',
      answer:
        'By timing distribution and reminders around handovers including nights, keeping the survey short enough to complete on a break, and requiring no work email address — which a large part of a residential workforce does not have.',
    },
    {
      question: 'Can bank and agency staff take part?',
      answer:
        'Bank staff yes, and we recommend it — they often hold the rota together and are rarely asked anything. Agency staff are usually out of scope since they are employed elsewhere, though we can include them if you want that.',
    },
    {
      question: 'Will individual staff or small units be identifiable?',
      answer:
        'No. We apply a minimum group size before any breakdown is published, so small teams are reported within a larger grouping or not separately at all.',
    },
    {
      question: 'What does this cost for a single care home?',
      answer:
        'Assessments start from £35 per staff member, so cost scales with your headcount. You get a written quote after a free consultation.',
    },
    {
      question: 'How do you support staff after a resident dies?',
      answer:
        'We do not provide counselling. What we do is help you build a routine practice for acknowledging it — at handover, before a room is reoccupied, or through a manager check-in — and identify where that is currently missing.',
    },
  ],

  finalCta: {
    heading: 'Your team looks after your residents. Make sure someone is looking after your team.',
    body: 'Book a free consultation to talk through what is happening across your shifts.',
  },
};

export const nursingHomes: LandingContent = {
  path: '/nursing-homes',
  eyebrow: 'Nursing homes',
  h1: 'Clinical accountability on top of care work',
  h1Accent: 'changes the nature of the pressure.',
  lead: 'Nursing homes carry everything a residential service does, plus clinical responsibility, registered nurse shortages and end-of-life care. Wellbeing support that recognises the difference.',

  recognition: {
    heading: 'What nursing services tell us',
    items: [
      'Registered nurses are hard to recruit and harder to replace, so each departure is felt immediately.',
      'The nurse on shift carries clinical accountability that does not reduce when the unit is short.',
      'End-of-life care is a regular part of the work rather than an occasional event.',
      'Nurses cover care duties when the floor is short, then complete clinical work afterwards.',
      'Professional isolation is common — sometimes one RN on shift with no clinical peer to consult.',
      'Revalidation and CPD compete with a rota that has no slack in it.',
    ],
  },

  emotion: {
    quote:
      'Carrying clinical responsibility alone, at night, on a short-staffed unit, is a specific kind of weight.',
  },

  consequence: {
    heading: 'Why losing a registered nurse hurts more',
    steps: [
      'The vacancy is hard to fill, so cover means agency nurses at premium rates or existing nurses working additional shifts.',
      'Agency clinical cover does not know the residents, which affects continuity of clinical judgement as well as care.',
      'The remaining nurses absorb more accountability, in a role where the accountability is personal and regulated.',
      'That pressure raises the likelihood of the next departure, in the group you can least afford to lose.',
    ],
  },

  education: [
    {
      eyebrow: 'The clinical layer',
      heading: 'Accountability that is personal, not just organisational',
      paragraphs: [
        'A registered nurse carries professional accountability in their own name. A clinical decision made on a short-staffed night is theirs, and it stays theirs. That is a different weight from general workplace responsibility, and it does not lift when the shift ends.',
        'When staffing is tight, nurses routinely pick up care duties as well — answering call bells, assisting with personal care — and then complete medication rounds, documentation and clinical assessment on top. The clinical work does not shrink to accommodate the care work.',
        'Any wellbeing assessment that treats nurses as one more staff group in the average will miss this entirely. We report the clinical group separately for that reason.',
      ],
    },
    {
      eyebrow: 'End of life',
      heading: 'Repeated exposure, rarely debriefed',
      paragraphs: [
        'Nursing home staff are involved in end-of-life care regularly. They manage symptoms, support families through the hardest days, and are often present at the death of someone they have cared for over a long period.',
        'Clinical staff are generally expected to be professionally composed about this, and most are. Composure is not the same as being unaffected, and the absence of any routine debrief means the cumulative weight has nowhere to go.',
        'A short structured practice after a death — not a formal process, just a consistent one — is among the most frequently welcomed changes we see in nursing services.',
      ],
    },
    {
      eyebrow: 'Isolation',
      heading: 'One nurse on shift is one nurse with nobody to consult',
      paragraphs: [
        'Professional isolation comes up repeatedly. A nurse on a night shift may have no clinical peer in the building to talk a judgement through with. The decision is theirs, made alone, sometimes at three in the morning with a deteriorating resident and an ambulance service under pressure.',
        'Providers who arrange peer contact — across sites in a group, or through a clinical lead who is genuinely reachable out of hours — consistently report that it matters more than they expected relative to what it costs.',
      ],
    },
  ],

  solution: {
    heading: 'How we work with nursing services',
    steps: [
      {
        icon: 'stethoscope',
        title: 'Clinical staff assessed and reported separately',
        body: 'So registered nurse pressure does not vanish into a workforce-wide average, which is where it usually gets lost.',
      },
      {
        icon: 'chart',
        title: 'Pressure mapped across the clinical layer',
        body: 'Accountability, isolation, clinical workload and end-of-life exposure, broken down by shift and unit.',
      },
      {
        icon: 'shield',
        title: 'Changes that address clinical strain',
        body: 'Peer contact, reachable escalation routes, protected time for revalidation, and routine post-death acknowledgement.',
      },
      {
        icon: 'link',
        title: 'Tracking RN retention risk',
        body: 'Intention-to-leave measured for the clinical group specifically, so you see risk before a resignation.',
      },
    ],
  },

  evidenceIds: ['vacancies', 'turnover-rate'],

  objections: [
    {
      objection: 'We have very few registered nurses — anonymity is a problem.',
      answer:
        'A real constraint. With small clinical groups we use structured confidential conversations rather than survey reporting, and agree in advance exactly what is shared and in what form.',
    },
    {
      objection: 'Nurses have professional support through the NMC and their own networks.',
      answer:
        'They do, and those matter. Neither tells you that your night shift has been running without a reachable clinical escalation route for eight months, which is the sort of thing this identifies.',
    },
    {
      objection: 'Our nurses are professionals — they cope with end-of-life care.',
      answer:
        'They do, generally very well. Coping and being unaffected are different things, and the cumulative weight of repeated bereavement is well recognised in clinical settings. A routine acknowledgement costs almost nothing.',
    },
    {
      objection: 'Clinical staffing is our problem and we cannot solve it.',
      answer:
        'Recruitment pressure across nursing is real and outside your control. What is within your control is whether the nurses you have find the role sustainable enough to stay, which is where we can help.',
    },
  ],

  faqs: [
    {
      question: 'Do you assess registered nurses differently from care staff?',
      answer:
        'Yes. Clinical staff face accountability, isolation and end-of-life exposure that care staff experience differently, so we ask different questions and report the clinical group separately.',
    },
    {
      question: 'How do you protect anonymity with a small nursing team?',
      answer:
        'Through a minimum group size before any breakdown is published, and by using structured confidential conversations instead of survey reporting where the group is too small for anonymity to be credible.',
    },
    {
      question: 'Can this help with registered nurse retention?',
      answer:
        "It can identify what is making the role unsustainable and track intention to leave among clinical staff specifically, so you see risk building. We would not promise a retention outcome — the nursing labour market is not within anyone's control.",
    },
    {
      question: 'Do you provide clinical supervision?',
      answer:
        'No. We assess whether clinical supervision and peer support exist and are working, and recommend where they are missing. Delivering clinical supervision is a role for a clinical professional.',
    },
    {
      question: 'How do you handle end-of-life exposure in the assessment?',
      answer:
        'We ask about frequency of exposure, whether any acknowledgement or debrief follows, and whether staff feel supported afterwards — reported in aggregate, never individually.',
    },
  ],

  finalCta: {
    heading: 'Your nurses carry accountability that does not switch off at the end of a shift.',
    body: 'Book a free consultation to talk about how your clinical team is coping.',
  },
};

export const domiciliaryCare: LandingContent = {
  path: '/domiciliary-care',
  eyebrow: 'Domiciliary care',
  h1: "Most of your workforce is alone in someone else's home,",
  h1Accent: 'and you rarely see them.',
  lead: 'Domiciliary care has a wellbeing problem shaped by lone working, travel time and rounds that never quite fit the schedule. Support designed for a workforce that is almost never in one room together.',

  recognition: {
    heading: 'What home care providers tell us',
    items: [
      'Travel time between calls is theoretical, so carers absorb the overrun themselves.',
      'Staff work alone all day and may go a full week without a proper conversation with a colleague.',
      'Difficult visits — distress, deterioration, a safeguarding concern — are handled alone with no immediate support.',
      'Rounds are unevenly demanding, and the hardest ones consistently land on the same people.',
      'You communicate by app and text, so you cannot see who is struggling the way you could in a building.',
      'Carers finish late routinely because they will not cut a visit short with someone who needs them.',
    ],
  },

  emotion: {
    quote:
      'A carer who runs late because someone was distressed is doing the job properly. The schedule treats it as a failure.',
  },

  consequence: {
    heading: 'How schedule pressure becomes a workforce problem',
    steps: [
      'Travel time that does not reflect real conditions means the round runs late from the second or third call.',
      'Carers make up the difference from their own unpaid time, or shorten visits in a way that conflicts with why they took the job.',
      'Working alone means nobody notices the strain building, and there is no colleague to decompress with.',
      'People leave for a role with less driving, more contact with colleagues, or simply a schedule that is honest about how long things take.',
    ],
  },

  education: [
    {
      eyebrow: 'Isolation',
      heading: 'The support that a building provides for free',
      paragraphs: [
        'In a residential service, a lot of support happens without anyone planning it. A colleague notices you look drained. A difficult visit gets talked about over a cup of tea. Handover doubles as an informal debrief. None of that is written down and all of it matters.',
        'Domiciliary care has almost none of it by structure. A carer can attend a distressing visit at ten in the morning and speak to nobody about it all day. The next scheduled contact might be a message about a rota change.',
        'Providers who create deliberate contact — a short team huddle even if remote, a genuine reachable person after a hard visit, occasional in-person team time — are compensating for what a building would otherwise provide free.',
      ],
    },
    {
      eyebrow: 'Travel time',
      heading: 'The single most common source of pressure we find',
      paragraphs: [
        'Travel time is where scheduling meets reality, and it is the theme that comes up most in domiciliary assessments. Schedules commonly assume travel conditions that do not hold in practice — traffic, parking, a call that overruns because someone had a fall the night before.',
        'The result is that carers absorb the gap. They drive faster than they should, they eat in the car, they finish late, or they cut a visit shorter than they believe is right. That last one is corrosive, because it puts people in daily conflict with why they do the work.',
        'Reviewing travel allocations against what actually happens on the ground is unglamorous and is frequently the highest-value change available to a domiciliary provider.',
      ],
    },
    {
      eyebrow: 'Measuring a dispersed workforce',
      heading: 'You cannot put a poster in a staff room that nobody visits',
      paragraphs: [
        'Standard approaches to workforce engagement assume a shared physical space. Domiciliary care does not have one, so the assessment has to reach people on their own phones, in gaps between calls, without requiring a work email address.',
        'We design for exactly that: short enough to complete between visits, mobile-first, and distributed through the channels your carers actually use. Participation in domiciliary services is genuinely harder to achieve, and we would rather extend the window than report on a thin sample.',
      ],
    },
  ],

  solution: {
    heading: 'How we work with domiciliary providers',
    steps: [
      {
        icon: 'clipboard',
        title: 'Mobile-first, between-visit assessment',
        body: 'Short enough to complete in a gap between calls, on a personal phone, with no work email needed.',
      },
      {
        icon: 'chart',
        title: 'Results by round and region',
        body: 'Which rounds carry the pressure, so you can see it is the north patch rather than the whole service.',
      },
      {
        icon: 'clock',
        title: 'Travel and scheduling review',
        body: 'Comparing allocated travel time against reality, which is where the largest single gain usually sits.',
      },
      {
        icon: 'users',
        title: 'Designed contact to offset isolation',
        body: 'Practical ways to create peer contact and post-visit support for a workforce that is rarely together.',
      },
    ],
  },

  evidenceIds: ['turnover-rate', 'sickness-absence'],

  objections: [
    {
      objection: 'Our carers prefer working independently.',
      answer:
        'Many genuinely do, and independence is one of the attractions of the role. Independence and isolation are different things though — people can value working alone and still have nowhere to take a distressing visit.',
    },
    {
      objection: 'We cannot increase travel time without losing the contract.',
      answer:
        'Commissioned rates are a real constraint and we do not pretend otherwise. Even within them, reviewing how travel is allocated between rounds often reveals that some are considerably more punishing than others — and that is rebalanceable.',
    },
    {
      objection: 'We already have an app for staff communication.',
      answer:
        'Useful for logistics and largely one-directional. It tells staff about rota changes; it does not tell you that a carer has had three difficult visits this week and has spoken to nobody.',
    },
    {
      objection: 'Our staff will not respond to a survey.',
      answer:
        'Domiciliary participation is harder to achieve, which we plan for. Short, mobile-first, distributed through the channels they already use, with an extended window. If participation stays too low we will tell you rather than reporting on a thin sample.',
    },
  ],

  faqs: [
    {
      question: 'How do you assess a workforce that is never in one place?',
      answer:
        'Mobile-first and short enough to complete between calls, on a personal phone, with no work email required, distributed through the channels your carers already use and with an extended response window.',
    },
    {
      question: 'What is the biggest wellbeing issue in domiciliary care?',
      answer:
        'In our experience, travel time that does not reflect real conditions, and isolation from colleagues. The two compound: carers absorb schedule pressure alone with nobody to talk to about it.',
    },
    {
      question: 'Can you help with lone working safety as well as wellbeing?',
      answer:
        'We assess how supported staff feel when working alone and whether escalation routes work in practice. Lone working safety systems themselves are a separate specialism.',
    },
    {
      question: 'Do you cover staff across multiple regions?',
      answer:
        'Yes, and we report by round and region, which is usually where the differences show. Pressure is rarely uniform across a dispersed service.',
    },
    {
      question: 'How do you reach staff who only work a few hours a week?',
      answer:
        'Part-time and bank carers are included by default. They are frequently the least heard group and among the most likely to leave quietly, so excluding them would miss a significant part of the picture.',
    },
  ],

  finalCta: {
    heading:
      'Your carers spend their days alone with people who need them. They should not be alone with the pressure too.',
    body: 'Book a free consultation to talk about what is happening across your rounds.',
  },
};

export const supportedLiving: LandingContent = {
  path: '/supported-living',
  eyebrow: 'Supported living',
  h1: 'Small teams, long relationships,',
  h1Accent: 'and support that asks a great deal.',
  lead: 'Supported living staff work in small teams with people they may support for years, often including complex behavioural need. The wellbeing pressures are real and they are not the same as residential care.',

  recognition: {
    heading: 'What supported living services tell us',
    items: [
      "Teams are small, so one person's absence changes the whole dynamic immediately.",
      'Staff support the same individuals for years, and the relationships are genuinely close.',
      'Behavioural support can mean managing distress or aggression regularly, sometimes alone.',
      'Staff can be lone working in a house overnight with no colleague present.',
      "A change in one person's support needs can transform the job for the whole team overnight.",
      'Services are geographically scattered, so teams rarely meet each other.',
    ],
  },

  emotion: {
    quote:
      'Supporting the same person for five years is a relationship, not a shift pattern. That is the strength of the model and the source of the strain.',
  },

  consequence: {
    heading: 'Why small teams are fragile',
    steps: [
      'A team of four has no slack — one absence is a quarter of the workforce for that service.',
      'Remaining staff cover extra shifts with the people they already support, so there is no change of scene or of demand.',
      'Incidents of distress or aggression are absorbed with fewer colleagues to share the load.',
      'When someone leaves, the person being supported loses a relationship built over years, and the remaining team carries both the practical gap and the emotional one.',
    ],
  },

  education: [
    {
      eyebrow: 'The relationship',
      heading: 'Long-term support is a strength that carries a cost',
      paragraphs: [
        'The supported living model works partly because of continuity. Staff who have supported someone for years know what a good day looks like, what precedes a difficult episode, and how to de-escalate before anything escalates. That knowledge is genuinely valuable and takes a long time to build.',
        "It also means the emotional investment is high. Staff are not delivering a service to a stranger; they are deeply involved in someone's life. When that person deteriorates, moves on, or dies, the loss is significant and rarely acknowledged in the way a bereavement in a care home might be.",
        'It also makes conflict harder. A difficult dynamic in a residential home can be managed by adjusting a rota. In a four-person team supporting one individual, there is nowhere to move anyone to.',
      ],
    },
    {
      eyebrow: 'Behavioural support',
      heading: 'Distress and aggression, absorbed by very few people',
      paragraphs: [
        'Where a service supports people with complex behavioural need, staff may routinely manage distress, and sometimes physical aggression. Most are trained for it and most handle it well. Being trained does not make it neutral.',
        'The particular risk in supported living is the concentration. In a large service the exposure spreads across many staff; in a four-person team the same handful of people absorb every incident, often for years, and sometimes alone on a night shift.',
        'Whether incidents are routinely debriefed is one of the clearest predictors we see of whether a small team holds together. It is also one of the first things to lapse when a service is under pressure.',
      ],
    },
    {
      eyebrow: 'Reaching scattered teams',
      heading: 'Every house is its own working environment',
      paragraphs: [
        'Supported living services are geographically dispersed and each house has its own dynamic. An organisation-wide average is close to meaningless — one service can be stable while another is under serious strain, and the average conceals both.',
        'We report at service level wherever group sizes allow it, and where a team is too small to report on without identifying individuals we say so and use confidential conversations instead. Pretending anonymity in a team of three would be dishonest.',
      ],
    },
  ],

  solution: {
    heading: 'How we work with supported living services',
    steps: [
      {
        icon: 'users',
        title: 'Assessment sensitive to small teams',
        body: 'Reported at service level where group size allows, and through confidential conversations where it does not.',
      },
      {
        icon: 'brain',
        title: 'Behavioural support exposure measured',
        body: 'Frequency of incidents, whether debriefs actually happen, and how supported staff feel afterwards.',
      },
      {
        icon: 'shield',
        title: 'Practical changes for small teams',
        body: "Reliable debriefs, cover that makes leave restful, peer contact across houses, and support when a person's needs change.",
      },
      {
        icon: 'link',
        title: 'Tracked over time',
        body: 'Re-measurement per service, so a house under strain is visible before the team fractures.',
      },
    ],
  },

  evidenceIds: ['turnover-rate', 'vacancies'],

  objections: [
    {
      objection: 'Our teams are too small for an anonymous survey.',
      answer:
        'Often true, and we will not pretend otherwise. Below the minimum group size we use structured confidential conversations and agree in advance what is shared. Claiming anonymity in a team of three would be dishonest and staff would see through it immediately.',
    },
    {
      objection: 'Staff choose this work because they want close relationships.',
      answer:
        'They do, and that is what makes the model work. Close relationships are also emotionally demanding, and valuing them is entirely compatible with recognising they carry a cost that needs support.',
    },
    {
      objection: 'We already have positive behaviour support in place.',
      answer:
        'Good, and that is the right clinical framework. It is designed around the person being supported. It does not measure whether the staff absorbing incidents are getting debriefed or whether the same three people have absorbed everything for two years.',
    },
    {
      objection: 'Our services are too different from each other for one assessment.',
      answer:
        'That is precisely why we report per service rather than organisation-wide. The variation between houses is usually the most useful finding, and an average would erase it.',
    },
  ],

  faqs: [
    {
      question: 'How do you assess wellbeing in very small teams?',
      answer:
        'Where a team is below the minimum group size for anonymous reporting we use structured confidential conversations instead of surveys, and agree in advance exactly what is shared and how.',
    },
    {
      question: 'Do you cover staff supporting people with complex behavioural needs?',
      answer:
        'Yes. We measure frequency of exposure to distress and aggression, whether debriefs routinely happen, and how supported staff feel afterwards — reported in aggregate.',
    },
    {
      question: 'Can you report separately for each supported living service?',
      answer:
        'Yes, wherever group sizes allow. Variation between houses is usually the most actionable finding, so an organisation-wide average would waste the exercise.',
    },
    {
      question: 'How does this differ from your care home approach?',
      answer:
        'Smaller teams change what can be reported anonymously, long-term relationships change the emotional picture, and behavioural support exposure is a specific focus. The underlying method is the same; the questions and reporting are not.',
    },
    {
      question: 'What if one house has a serious problem?',
      answer:
        'We tell you directly rather than leaving it buried in a report. Findings that need urgent attention are raised in the feedback conversation as a priority.',
    },
  ],

  finalCta: {
    heading: 'Small teams hold a great deal. It is worth knowing how they are holding it.',
    body: 'Book a free consultation to talk through what is happening across your services.',
  },
};

export const healthcareProviders: LandingContent = {
  path: '/healthcare-providers',
  eyebrow: 'Healthcare providers',
  h1: 'Clinical teams under sustained pressure',
  h1Accent: 'need more than a wellbeing policy.',
  lead: 'Independent healthcare and clinical services face workforce pressure with its own shape — mixed professional groups, clinical governance obligations and staff who are professionally expected to cope. Measurement-led support built for that.',

  recognition: {
    heading: 'What clinical services tell us',
    items: [
      'Several professional groups work alongside each other with very different pressures and very different cultures.',
      'Clinical staff are expected to be professionally resilient, which makes admitting strain harder.',
      'Governance and documentation requirements compete directly with clinical time.',
      'Recruitment into some clinical roles is slow, so vacancies sit open and load redistributes.',
      'Wellbeing provision exists on paper and take-up is low.',
      'Nobody can say which staff group is under the most pressure, only that everyone is busy.',
    ],
  },

  emotion: {
    quote:
      'Professional composure is not the same as being unaffected. Clinical staff are trained in the first and rarely asked about the second.',
  },

  consequence: {
    heading: 'Where clinical workforce pressure goes',
    steps: [
      'Sustained pressure without recovery reduces the discretionary attention that clinical judgement quietly depends on.',
      'Documentation and governance slip first, because they have the least immediate consequence.',
      'Experienced clinical staff reduce hours or move to roles with more predictable demand.',
      'Remaining staff absorb the load in roles where the accountability is personal and regulated.',
    ],
  },

  education: [
    {
      eyebrow: 'Mixed workforces',
      heading: 'One average across several professional groups tells you nothing',
      paragraphs: [
        'Independent healthcare services typically employ several distinct professional groups — clinical, administrative, support — each with different pressures, different norms about disclosure, and different reasons for leaving.',
        'Reporting a single organisation-wide wellbeing score across those groups produces a number that describes nobody. The clinical group may be under severe strain while administrative staff are stable, or the reverse, and the average conceals both.',
        'We segment by professional group as standard, and we adjust the questions accordingly. Asking a clinician and a receptionist identical questions about autonomy produces answers that are not comparable.',
      ],
    },
    {
      eyebrow: 'Professional culture',
      heading: 'Coping is part of the professional identity, which makes measurement harder',
      paragraphs: [
        'Clinical training instils composure under pressure, and that is necessary — you want a calm clinician in a deteriorating situation. It also means clinical staff are among the least likely to volunteer that they are struggling, particularly to anyone in their management line.',
        'The practical consequence is that direct approaches under-detect. Supervision, appraisal and open-door policies all rely on someone naming a difficulty to a person who knows who they are.',
        'Confidential aggregate measurement gets past that. It is not a criticism of clinical leadership; it is a recognition that professional culture makes some things very hard to say out loud.',
      ],
    },
    {
      eyebrow: 'Governance',
      heading: 'Workforce wellbeing is increasingly a governance question',
      paragraphs: [
        'Staff wellbeing is progressively treated as part of the quality and safety picture rather than as a separate welfare matter, and boards are increasingly asked what they know about it and what they are doing.',
        'A structured, repeatable measurement with a documented methodology answers that question in a way that anecdote and an EAP usage report cannot. It shows what was measured, what was found, what changed and whether it moved.',
        'That is useful for its own sake, and it also gives the wellbeing work a defensible place in governance reporting rather than leaving it as something the HR team does when there is time.',
      ],
    },
  ],

  solution: {
    heading: 'How we work with healthcare providers',
    steps: [
      {
        icon: 'stethoscope',
        title: 'Segmented by professional group',
        body: 'Clinical, administrative and support staff assessed and reported separately, with questions adapted to each.',
      },
      {
        icon: 'lock',
        title: 'Confidential by design',
        body: 'Aggregate reporting with a minimum group size, so professional culture does not suppress what people report.',
      },
      {
        icon: 'clipboard',
        title: 'Documented, repeatable methodology',
        body: 'Something you can put in front of a board or a commissioner, showing what was measured and what changed.',
      },
      {
        icon: 'link',
        title: 'Re-measurement on a governance cycle',
        body: 'Repeated on an agreed schedule, so wellbeing becomes a tracked measure rather than an occasional exercise.',
      },
    ],
  },

  evidenceIds: ['vacancies', 'sickness-absence'],

  objections: [
    {
      objection: 'We already have occupational health and an EAP.',
      answer:
        'Both matter and both are individual and reactive. Neither can tell you that one clinical team has a sustained problem, because they only see the people who come forward — and clinical staff are among the least likely to.',
    },
    {
      objection: 'Our clinical staff are trained to manage pressure.',
      answer:
        'They are, and most do it well. Training in composure is not the same as being unaffected, and it makes strain harder to detect precisely because people are good at not showing it.',
    },
    {
      objection: 'We report wellbeing to our board already.',
      answer:
        'Then you are ahead of most. The question is what the report contains — EAP usage and absence figures describe activity and symptoms rather than the working conditions producing them.',
    },
    {
      objection: 'Our staff are too busy to complete an assessment.',
      answer:
        'Under ten minutes, on any device, with an extended window. If clinical staff are genuinely too pressed for ten minutes, that is itself a finding worth acting on.',
    },
  ],

  faqs: [
    {
      question: 'Do you work with independent healthcare providers as well as social care?',
      answer:
        'Yes. The method is the same; the questions, segmentation and reporting are adapted to clinical settings and mixed professional workforces.',
    },
    {
      question: 'How do you handle several different professional groups?',
      answer:
        'We segment by group and adapt the questions, then report separately. A single average across clinical, administrative and support staff describes none of them accurately.',
    },
    {
      question: 'Can the findings be used in governance reporting?',
      answer:
        'Yes. The methodology is documented and repeatable, so you can show what was measured, what was found, what changed and whether it moved — which is what a board or commissioner will ask.',
    },
    {
      question: 'How do you get honest answers from clinical staff?',
      answer:
        'Confidentiality, aggregate reporting with a minimum group size, and stating plainly at the outset how responses are used. Professional culture discourages disclosure to a manager; it does not prevent an honest anonymous answer.',
    },
    {
      question: 'How often should we re-measure?',
      answer:
        'Most providers settle on every six to twelve months, aligned to their governance cycle. Frequent enough to see movement, infrequent enough to avoid fatigue.',
    },
  ],

  finalCta: {
    heading: 'Your clinical teams are trained to cope. That is not a reason to stop asking.',
    body: 'Book a free consultation to talk through workforce pressure across your service.',
  },
};
