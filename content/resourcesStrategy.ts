import type { Article } from '@/content/resources';

/**
 * The remaining articles from the brief's list of twelve.
 *
 * ## Two were deliberately not written
 *
 * The brief listed twelve articles. Ten exist. Two were dropped on purpose, because
 * writing them would have breached the brief's own cannibalisation rule (§21):
 *
 *   - **"What Is Workforce Wellbeing?"** — this is exactly what the pillar page
 *     `/care-workforce-wellbeing` is for. A second page answering the same question
 *     would split the authority of the strongest page on the site.
 *   - **"How to Improve Care Staff Wellbeing"** — same problem. The searcher intent is
 *     indistinguishable from the pillar's, and the pillar already answers it at length.
 *
 * If either is wanted later, the right move is to strengthen the pillar page rather
 * than add a competing one.
 */
export const strategyArticles: Article[] = [
  {
    slug: 'staff-wellbeing-survey-questions-for-care-providers',
    title: 'Staff Wellbeing Survey Questions for Care Providers',
    description:
      'The domains worth asking about, example questions for care settings, and the common mistakes that make a wellbeing survey unusable.',
    keyword: 'staff wellbeing survey questions',
    published: '2026-08-12',
    readingMinutes: 8,
    relatedPath: '/workforce-wellbeing-assessment',
    relatedLabel: 'Workforce wellbeing assessment',
    cta: {
      heading: 'Rather not build and run this yourself?',
      body: 'We design the question set around your service, chase participation across every shift, and write the report.',
    },
    intro:
      'If you are writing a staff wellbeing survey in-house, the question set matters less than most people expect and the distribution matters far more. That said, bad questions will sink a good distribution — so here is what to ask, and what to avoid.',
    sections: [
      {
        heading: 'Ask about conditions, not satisfaction',
        paragraphs: [
          'The most common mistake is asking how satisfied or happy people are. You get a number that goes up or down and gives you nothing to act on.',
          'Ask instead about the things that produce those feelings: whether breaks happened, whether the rota arrived in time to plan around, whether supervision took place, whether anything followed the last time someone raised a concern. Those answers point at specific changes.',
        ],
      },
      {
        heading: 'The domains worth covering',
        paragraphs: [
          'A workable care-sector survey covers roughly eight areas. Fewer and you will miss something; many more and completion rates fall.',
        ],
        list: [
          'Workload and staffing pressure — is the job doable as scheduled?',
          'Rota predictability — enough notice to plan a life around?',
          'Breaks and recovery — did they actually happen last week?',
          'Supervision and support — does it happen on schedule?',
          'Recognition — is good work noticed, including on nights and weekends?',
          'Psychological safety — is raising a concern safe, and does it lead anywhere?',
          'Emotional demand — including bereavement and difficult incidents.',
          'Intention to leave — the forward-looking risk measure.',
        ],
      },
      {
        heading: 'Example questions that work in care settings',
        paragraphs: [
          'Keep them concrete and time-bounded. "Do you get enough support?" invites a vague answer; "In the last four weeks, how often did you take your full break on a long shift?" does not.',
        ],
        list: [
          'In the last four weeks, how often did you take your full break on a long shift?',
          'How far in advance do you usually know your shifts?',
          'When you last raised a concern, did you find out what happened to it?',
          'In the last three months, has anyone at work asked how you are coping?',
          'After a resident died, was there any acknowledgement from the team or your manager?',
          'How likely is it that you will still be working here in twelve months?',
        ],
      },
      {
        heading: 'Questions to avoid',
        paragraphs: [
          'Some questions actively damage a survey. Anything that could identify a respondent — exact role in a small team, precise length of service, which specific shift — will suppress honest answers even if you never intend to use it that way.',
          'Avoid double-barrelled questions ("Do you feel supported by your manager and colleagues?"), because you cannot tell which half a low score refers to. Avoid leading phrasing. And avoid asking anything you have no intention of acting on, because it sets an expectation you will then disappoint.',
        ],
      },
      {
        heading: 'Keep it under ten minutes',
        paragraphs: [
          'Length is the single biggest determinant of completion in a shift-working population. A survey that takes twenty minutes will be completed disproportionately by people with twenty minutes to spare — who are, by definition, not the ones under the most pressure.',
          'Twenty to thirty well-chosen questions is usually enough. Resist the urge to add "while we are asking" items from other departments.',
        ],
      },
      {
        heading: 'Plan the feedback before you send it',
        paragraphs: [
          'Decide in advance who will feed results back, when, and in what form — including what you will say about things you cannot change.',
          'Surveys stop working when staff conclude nothing follows. The feedback step is not a courtesy at the end; it is what makes the next round possible.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-reduce-staff-turnover-in-care-homes',
    title: 'How to Reduce Staff Turnover in Care Homes',
    description:
      'A practical sequence for bringing turnover down — what to do first, what to leave until later, and how to tell whether it is working.',
    keyword: 'how to reduce staff turnover in care homes',
    published: '2026-08-12',
    readingMinutes: 8,
    relatedPath: '/care-staff-turnover',
    relatedLabel: 'Care staff turnover',
    cta: {
      heading: 'Not sure which of these applies to your service?',
      body: 'An assessment shows which groups are at risk and why, so the effort goes where it will actually count.',
    },
    intro:
      'This is the practical companion to our page on what turnover costs. It assumes you already know your figure is too high and want a sequence to work through, in the order that usually produces results.',
    sections: [
      {
        heading: 'First: find out which turnover problem you have',
        paragraphs: [
          'Before changing anything, split your leavers by length of service. Early leavers, long-service leavers and external-reason leavers are three different problems, and a fix aimed at one will do nothing for the others.',
          'This takes an afternoon with your HR records and will save you months of effort aimed at the wrong group.',
        ],
      },
      {
        heading: 'Second: fix induction if early turnover dominates',
        paragraphs: [
          'If most departures happen inside six months, the leverage is almost entirely in the first few weeks. Name a specific go-to person for each new starter. Check in deliberately at one week and one month. Be honest at recruitment about the hardest parts of the role.',
          'This is the cheapest work available and it is frequently the largest single improvement.',
        ],
      },
      {
        heading: 'Third: make the rota predictable',
        paragraphs: [
          'If your losses are among longer-serving staff, rota predictability is usually where to look first. It comes up more often than almost anything except workload, and improving it costs discipline rather than money.',
          'Publish further ahead. Reduce last-minute changes. Where changes are unavoidable, distribute them fairly rather than always asking the person who says yes.',
        ],
      },
      {
        heading: 'Fourth: protect breaks with an accountable person',
        paragraphs: [
          'Breaks are the most commonly lost recovery mechanism in care, and their loss compounds directly into absence and eventually resignation.',
          'A policy achieves little. Naming someone on each shift whose responsibilities include making sure breaks happen achieves a great deal.',
        ],
      },
      {
        heading: 'Fifth: close the loop on everything raised',
        paragraphs: [
          'Staff who believe raising a problem changes nothing stop raising problems, then leave without warning. Coming back to people — even to say no, with a reason — is disproportionately effective relative to its cost.',
        ],
      },
      {
        heading: 'What to leave until later',
        paragraphs: [
          'Recognition schemes, social events and wellbeing perks all work better once the conditions above are sound. Introduced first, on a team missing breaks and working an unpredictable rota, they can read as tone-deaf and occasionally make things worse.',
          'Pay is genuinely important and usually the least available lever in the short term. It is worth arguing for with evidence rather than treating as the only option.',
        ],
      },
      {
        heading: 'How to tell whether it is working',
        paragraphs: [
          'Turnover is a lagging indicator and may take a year to reflect changes. If you wait for it, you will not know whether to persist or change course.',
          'Track intention to leave instead, confidentially, among the staff who are still here. It moves months earlier and tells you what you need to know while you can still act on it.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-create-a-staff-wellbeing-strategy-for-a-care-home',
    title: 'How to Create a Staff Wellbeing Strategy for a Care Home',
    description:
      'How to build a wellbeing strategy that survives a busy fortnight — what belongs in it, who owns it, and how to keep it from becoming a document nobody opens.',
    keyword: 'care home wellbeing strategy',
    published: '2026-08-12',
    readingMinutes: 8,
    relatedPath: '/staff-wellbeing-programmes',
    relatedLabel: 'Staff wellbeing programmes',
    cta: {
      heading: 'Want help building one that holds?',
      body: 'We start from measurement, agree the changes with your managers, and re-measure so you know whether it worked.',
    },
    intro:
      'Most wellbeing strategies fail in the same way: they are written during a calm week, contain fifteen commitments, and quietly lapse the first time the service comes under pressure. A strategy that holds looks different, and it is shorter.',
    sections: [
      {
        heading: 'Start from evidence, not from a template',
        paragraphs: [
          'A strategy built on assumptions commits you to solving problems you may not have. Measure first — confidentially, across every shift — so the strategy addresses what your staff actually reported rather than what leadership suspected.',
          'This also gives you a baseline. Without one, you will never be able to demonstrate that the strategy achieved anything.',
        ],
      },
      {
        heading: 'Commit to two or three things, not fifteen',
        paragraphs: [
          'The instinct is to be comprehensive. Comprehensive strategies die under pressure, because when the service gets busy everything discretionary stops and there is no ranking to tell anyone what to protect.',
          'Two or three commitments, chosen because the evidence says they matter most and because they are sustainable at your staffing levels, will outperform a longer list every time.',
        ],
      },
      {
        heading: 'Give every commitment a named owner and a date',
        paragraphs: [
          'An action owned by "the management team" is owned by nobody. Each commitment needs one person accountable, a target date, and an agreed measure that will show whether it happened.',
          'This is also what makes the strategy reviewable. "Protect two break windows on long shifts, owned by the shift lead, from 1 October, measured by the break question in the next survey" can be assessed. "Improve staff wellbeing" cannot.',
        ],
      },
      {
        heading: 'Design for the bad fortnight',
        paragraphs: [
          'Test every commitment against a simple question: will this still happen during a week when two people are off sick and someone has had a fall?',
          'Anything that requires sustained extra effort from managers will not survive that week. Anything structural — a protected break window, a rota notice period, a routine acknowledgement at handover — has a much better chance, because it is built into how the shift already runs.',
        ],
      },
      {
        heading: 'Include what you will not do',
        paragraphs: [
          'A strategy that only lists commitments invites staff to assume everything else is also coming. Stating plainly what is out of scope this year, and why, prevents a lot of quiet disappointment.',
          'It also protects the strategy. When someone proposes adding a fourth initiative in March, the document is what says no.',
        ],
      },
      {
        heading: 'Publish it to staff, in plain language',
        paragraphs: [
          'A wellbeing strategy that lives only in a management folder cannot build any trust, because nobody it concerns has seen it.',
          'A one-page version for staff — what we found, what we are changing, what we are not changing and why — does more for morale than the full document does for governance.',
        ],
      },
      {
        heading: 'Set the review date when you write it',
        paragraphs: [
          'Agree the re-measurement date at the point of writing, typically three to six months out, using the same measures as the baseline.',
          'Reviewing honestly matters more than reviewing favourably. Most strategies move one or two things clearly and leave the rest unchanged; knowing which is which is what makes the second year better than the first.',
        ],
      },
    ],
  },
];
