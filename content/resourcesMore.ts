import type { Article } from '@/content/resources';

/**
 * Additional articles.
 *
 * Kept in a second file only to keep each module a manageable length — they are
 * concatenated into the single `articles` export in `resources.ts`, which remains
 * the one place anything imports from.
 *
 * Every article here exists because `content/seo/keywordMap.ts` links to it. An
 * internal link that 404s is a broken edge in the cluster and a bad experience for
 * a reader who trusted the link, so the map and this file must stay in step.
 */
export const moreArticles: Article[] = [
  {
    slug: 'signs-your-care-team-is-burning-out',
    title: 'Signs Your Care Team Is Burning Out',
    description:
      'Burnout shows up as small changes in reliable people long before anyone resigns. What to watch for, and what to do once you have seen it.',
    keyword: 'signs of burnout in care workers',
    published: '2026-08-12',
    readingMinutes: 6,
    relatedPath: '/care-worker-burnout',
    relatedLabel: 'Care worker burnout',
    cta: {
      heading: 'Recognising the signs is the easy part. Locating them is harder.',
      body: 'An assessment shows which teams and shifts are carrying the pressure, so you can act where it counts.',
    },
    intro:
      'By the time someone uses the word burnout, it has usually been building for months. The earlier signals are quieter and easy to explain away one at a time — which is exactly why they are worth naming.',
    sections: [
      {
        heading: 'Discretionary effort disappears first',
        paragraphs: [
          'The earliest reliable signal is that someone who used to do more than the task now does exactly the task. The extra five minutes with a resident having a difficult day, the observation passed on informally at handover, the offer to stay a little later — these go before anything measurable changes.',
          'It is easy to misread as an attitude problem. It is almost always a capacity problem: people protect what they have left by withdrawing the parts of the job nobody formally checks.',
        ],
      },
      {
        heading: 'Handovers get shorter and more functional',
        paragraphs: [
          'A good handover carries more than clinical facts. It carries the texture — who seemed off today, whose family visited, what worked when someone became distressed.',
          'When a team is depleted, handovers compress to the essentials. That is worth noticing as a care quality signal as well as a wellbeing one, because the informal information is often what prevents an incident.',
        ],
      },
      {
        heading: 'Single days at short notice, from previously reliable staff',
        paragraphs: [
          'A pattern of odd single days from someone with a long record of turning up is usually a recovery signal — people at the edge of coping taking the day they need in order to keep going.',
          'Treating it purely as an absence management matter, without asking what changed, tends to convert it into presenteeism and eventually into a resignation.',
        ],
      },
      {
        heading: 'People stop raising things',
        paragraphs: [
          'A drop in concerns raised is often mistaken for improvement. More commonly it means staff have concluded that raising things does not lead anywhere.',
          'If your concern volume has fallen while nothing else has obviously improved, that is worth investigating rather than celebrating.',
        ],
      },
      {
        heading: 'What to do once you have seen it',
        paragraphs: [
          'Resist the urge to respond with a gesture. A team showing these signs will read an appreciation event as evidence that nobody has understood the problem.',
        ],
        list: [
          'Ask confidentially, across the whole team rather than one person at a time.',
          'Look at where it concentrates — which shift, which unit, which length of service.',
          'Change one or two structural things: break protection, handover timing, rota notice.',
          'Tell staff what you found and what you are doing, including what you cannot change.',
        ],
      },
    ],
  },
  {
    slug: 'how-registered-managers-can-support-staff-wellbeing',
    title: 'How Registered Managers Can Support Staff Wellbeing',
    description:
      'Practical things a registered manager can do without extra budget or headcount — and an honest note on where a manager’s control ends.',
    keyword: 'how registered managers can support staff wellbeing',
    published: '2026-08-12',
    readingMinutes: 7,
    relatedPath: '/care-manager-wellbeing',
    relatedLabel: 'Registered manager wellbeing',
    cta: {
      heading: 'Supporting everyone else is easier when someone is supporting you.',
      body: 'We assess the management layer alongside frontline staff, and report on it separately.',
    },
    intro:
      'Most wellbeing advice aimed at registered managers assumes resources they do not have. This is a list of things genuinely within a manager’s control, and a clear note about where that control stops.',
    sections: [
      {
        heading: 'Protect breaks, and make someone accountable for them',
        paragraphs: [
          'Breaks on a long shift are the most commonly lost thing in care, and the loss compounds — staff arriving at the next shift already depleted is the mechanism behind a great deal of short-notice absence.',
          'A policy statement changes nothing. Naming a person on each shift whose responsibilities include making sure breaks actually happen changes a great deal, and it costs nothing.',
        ],
      },
      {
        heading: 'Publish the rota further ahead than feels necessary',
        paragraphs: [
          'Rota predictability comes up in almost every assessment we run. Staff can manage a demanding but predictable rota. They cannot plan a life around one that changes at short notice.',
          'Publishing further ahead is a discipline rather than a cost, and it is consistently among the most appreciated changes a manager can make.',
        ],
      },
      {
        heading: 'Acknowledge deaths, briefly and consistently',
        paragraphs: [
          'Staff form real relationships with residents over months and years. Where nothing marks a death, the weight accumulates silently.',
          'This does not need to be a formal debrief. A consistent moment at handover, or deliberately checking in with the staff who were closest, is enough — and it is mentioned more than almost anything else when we ask staff what would help.',
        ],
      },
      {
        heading: 'Close the loop on everything raised',
        paragraphs: [
          'The strongest determinant of whether people keep speaking up is whether they find out what happened last time. Not whether they got what they asked for — whether anyone came back to them.',
          'Saying you looked at a suggestion and cannot do it, with the reason, buys considerably more goodwill than silence.',
        ],
      },
      {
        heading: 'Include the night team in something',
        paragraphs: [
          'Night staff are routinely excluded from anything scheduled, and are frequently under the most pressure. They are also the group most likely to tell us nobody ever asks them anything.',
          'Rotating a briefing to catch a night handover, or occasionally visiting at the start of one, addresses a surprising amount.',
        ],
      },
      {
        heading: 'Be clear about what you cannot fix',
        paragraphs: [
          'A registered manager cannot resolve commissioning rates, sector-wide recruitment shortages, or a staffing establishment set above them. Being explicit about that is not defeatism — it is what stops a manager absorbing responsibility for things outside their control until they burn out themselves.',
          'Where the constraint sits above you, evidence is the useful move. A measured, documented picture of what the pressure is doing is far more persuasive to a board than a manager reporting that the team is struggling.',
        ],
      },
    ],
  },
  {
    slug: 'how-much-does-staff-turnover-cost',
    title: 'How Much Does Staff Turnover Cost a Care Provider?',
    description:
      'What to include when calculating the real cost of losing a care worker, and why the figure you arrive at is usually larger than expected.',
    keyword: 'cost of staff turnover in care homes',
    published: '2026-08-12',
    readingMinutes: 6,
    relatedPath: '/care-staff-turnover',
    relatedLabel: 'Care staff turnover',
    cta: {
      heading: 'Knowing the cost is useful. Knowing the cause is what reduces it.',
      body: 'An assessment identifies why people are leaving while there is still time to act on it.',
    },
    intro:
      'Most providers underestimate turnover cost because they count the recruitment advert and stop there. Here is a fuller list of what to include, and a caution about the national figures quoted elsewhere.',
    sections: [
      {
        heading: 'What belongs in the calculation',
        paragraphs: [
          'A defensible per-departure figure includes considerably more than advertising. Work through each of these for your own service rather than borrowing someone else’s number.',
        ],
        list: [
          'Advertising, screening, interviewing and pre-employment checks.',
          'Manager and administrator time across recruitment and onboarding.',
          'Induction, shadowing and mandatory training for the new starter.',
          'Agency or overtime premium covering the vacancy in the meantime.',
          'Reduced productivity while a new starter builds towards full effectiveness.',
          'Training and development investment lost with the person who left.',
          'The knock-on effect on colleagues who absorbed the gap.',
        ],
      },
      {
        heading: 'Be careful with national averages',
        paragraphs: [
          'Per-departure cost estimates are quoted widely and vary substantially by role, region and methodology. Some count only direct recruitment costs; others include productivity and knowledge loss, which produces a far larger figure.',
          'We deliberately do not put a single headline number on this page. Quoting one precisely would imply more certainty than the published evidence supports, and a finance director will find the weakness in it immediately.',
          'Your own calculation is both more accurate and more persuasive internally.',
        ],
      },
      {
        heading: 'The costs that never reach an invoice',
        paragraphs: [
          'Continuity of care is the largest and the hardest to price. An experienced carer knows a resident’s routines, preferences, and the early signs that something is wrong. None of that is in the care plan, and it leaves with them.',
          'There is also a compounding effect: colleagues who cover the gap are more depleted afterwards, which raises the likelihood of the next resignation. The second departure is frequently more expensive than the first.',
        ],
      },
      {
        heading: 'Use the figure to argue for prevention',
        paragraphs: [
          'The practical value of this calculation is that it reframes the internal conversation. Prevention work is usually assessed as a cost, while turnover is treated as an unavoidable feature of the sector.',
          'Once the annual cost of departures sits on the same page as the cost of understanding why people leave, the comparison tends to make the argument by itself.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-improve-staff-morale-in-care-homes',
    title: 'How to Improve Staff Morale in Care Homes',
    description:
      'Why appreciation events often fall flat, what genuinely lifts morale in a care team, and how to measure something that feels unmeasurable.',
    keyword: 'how to improve staff morale in care homes',
    published: '2026-08-12',
    readingMinutes: 7,
    relatedPath: '/care-staff-morale',
    relatedLabel: 'Care staff morale',
    cta: {
      heading: 'You can feel that something has changed. It is worth finding out what.',
      body: 'A confidential assessment turns an atmosphere into findings you can act on.',
    },
    intro:
      'Morale advice usually begins with recognition schemes. That is roughly the right idea in the wrong order, and it explains why so many well-intentioned efforts land badly.',
    sections: [
      {
        heading: 'Fix conditions first, then recognise people',
        paragraphs: [
          'Recognition works when the underlying job is sustainable. On a team that has not had a reliable break in a fortnight, an appreciation event can read as evidence that leadership has misunderstood the problem entirely.',
          'The order matters more than the content. Address one or two concrete things people have been raising, then recognise the team. The other way round is how a well-meant gesture becomes something staff mention sarcastically for a year.',
        ],
      },
      {
        heading: 'Work out which component is actually low',
        paragraphs: [
          'Morale is the visible result of several measurable things: whether people feel noticed, whether they have influence over how the work is done, whether raising a concern leads anywhere, whether they trust their managers, and whether the job is currently sustainable.',
          'Each can be asked about directly. Once you do, "morale is low" becomes something specific — this team does not feel heard, that team does not trust the rota to be fair — and specific problems have solutions.',
        ],
      },
      {
        heading: 'Close the loop, visibly',
        paragraphs: [
          'The most consistent lever we see is feedback. Staff do not expect to get everything they ask for. They do expect to find out what happened to what they raised.',
          'Telling a team what you found, what will change, and what will not change and why is cheap and unusually effective. Most providers skip the third of those, and it is the one that builds the most credibility.',
        ],
      },
      {
        heading: 'Pay attention to differences between units',
        paragraphs: [
          'In a home with more than one unit, morale is rarely uniform. One team feels settled while another does not, often on identical staffing and pay.',
          'That variation is the most useful information you have, because it isolates the difference to how each team is managed, heard and supported — which is within your control in a way the labour market is not.',
        ],
      },
      {
        heading: 'Do not ask unless you intend to respond',
        paragraphs: [
          'Asking staff how they feel and then saying nothing is worse than not asking. It confirms the belief that consultation here is decorative, and it makes the next attempt considerably harder.',
          'Agree before you start what you will feed back, when, and who will do it.',
        ],
      },
    ],
  },
];
