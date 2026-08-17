/**
 * Resource articles.
 *
 * These serve informational search intent, so the copy does not push a sale — but
 * the brief is right that an article which ends without a next step is a dead end.
 * Each therefore carries a `cta` written specifically for its own topic, and links
 * to the commercial page that covers it.
 *
 * Article bodies are structured as sections rather than raw HTML so headings stay
 * consistent (one H1 from the title, H2 per section) and the reading experience
 * matches the rest of the site.
 */
import { moreArticles } from '@/content/resourcesMore';
import { strategyArticles } from '@/content/resourcesStrategy';

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  /** Optional bulleted list rendered after the paragraphs. */
  list?: string[];
}

export interface Article {
  slug: string;
  title: string;
  /** Meta description and the intro shown on the index. */
  description: string;
  /** Primary keyword this article targets. */
  keyword: string;
  /** ISO date. Used for Article schema and displayed to readers. */
  published: string;
  readingMinutes: number;
  /** Commercial page this article should send readers to. */
  relatedPath: string;
  relatedLabel: string;
  /** Contextual CTA, written for this topic rather than generic. */
  cta: { heading: string; body: string };
  intro: string;
  sections: ArticleSection[];
}

const coreArticles: Article[] = [
  {
    slug: 'how-to-improve-staff-retention-in-a-care-home',
    title: 'How to Improve Staff Retention in a Care Home',
    description:
      'A practical guide to keeping experienced care staff — what actually drives people out, which fixes are within your control, and how to tell whether anything worked.',
    keyword: 'how to improve staff retention in a care home',
    published: '2026-08-12',
    readingMinutes: 8,
    relatedPath: '/care-staff-retention',
    relatedLabel: 'Care staff retention',
    cta: {
      heading: 'Want to know why your staff are actually considering leaving?',
      body: 'A confidential assessment tells you which groups are at risk and why — while there is still time to act.',
    },
    intro:
      'Retention advice for care homes is usually either impossible (pay more) or trivial (say thank you more often). This is an attempt at the useful middle: the things that consistently make a difference, roughly in the order we would tackle them.',
    sections: [
      {
        heading: 'Start by splitting your turnover figure in two',
        paragraphs: [
          'A single turnover percentage hides at least two distinct problems. People leaving within six months are usually an induction and expectations problem. People leaving after several years are an accumulation problem. They need different responses, and treating them as one number means you will address neither properly.',
          'Pull your leavers from the last twelve months and group them by length of service. If most sit under six months, your priority is what happens in the first weeks. If they cluster among long-service staff, something structural has been wearing people down.',
        ],
      },
      {
        heading: 'Fix the first three weeks',
        paragraphs: [
          'Early turnover is the cheapest to address and the most frequently ignored. New starters commonly leave because the job was not what they expected, because they were put on shift without an obvious person to ask, or because nobody checked in after a difficult first week.',
        ],
        list: [
          'Be honest in recruitment about the hardest parts of the role, not just the rewarding ones.',
          'Name a specific person as the go-to for each new starter, and tell them who it is.',
          'Check in deliberately at one week and one month, in a conversation rather than a form.',
          'Ask leavers who go early what they expected, because that answer is usually candid.',
        ],
      },
      {
        heading: 'Make the rota predictable before you make it generous',
        paragraphs: [
          'Rota predictability comes up more often in our assessments than almost anything except workload. Staff can plan a life around a demanding but predictable rota. They cannot plan around a rota published a week ahead that then changes.',
          'Publishing further ahead costs nothing except discipline, and it is consistently one of the most appreciated changes a care home can make. Protecting people from repeated last-minute changes matters more than the occasional extra day off.',
        ],
      },
      {
        heading: 'Protect breaks, and mean it',
        paragraphs: [
          'Breaks on a long shift are frequently theoretical — scheduled, and then swallowed by whatever the shift throws up. Staff who never properly stop arrive at their next shift already depleted, which is the mechanism behind a lot of short-notice absence.',
          'Making this real needs someone accountable for it rather than a policy statement. A named person on each shift whose job includes making sure breaks happen changes the outcome far more than a line in a handbook.',
        ],
      },
      {
        heading: 'Close the loop when people raise things',
        paragraphs: [
          'The most consistent finding in staff feedback is not that people want everything they ask for. It is that they want to know what happened to what they raised. Silence is what teaches people that speaking up is pointless, and that lesson generalises quickly.',
          'Telling a team that you looked at their suggestion and cannot do it for a specific reason costs you very little and buys considerably more goodwill than saying nothing.',
        ],
      },
      {
        heading: 'Measure intention to leave, not just resignations',
        paragraphs: [
          'Turnover is a lagging indicator. By the time it moves, the decisions behind it were made months earlier. Asking your current staff confidentially how likely they are to be here in a year gives you a forward-looking signal you can still act on.',
          'It also lets you check whether a change worked without waiting a year for the resignation rate to confirm it.',
        ],
      },
    ],
  },
  {
    slug: 'what-causes-burnout-in-care-workers',
    title: 'What Causes Burnout in Care Workers?',
    description:
      'Burnout in care work is driven by working conditions rather than individual fragility. Here are the specific conditions that produce it, and which of them you can change.',
    keyword: 'what causes burnout in care workers',
    published: '2026-08-12',
    readingMinutes: 7,
    relatedPath: '/care-worker-burnout',
    relatedLabel: 'Care worker burnout',
    cta: {
      heading: 'Wondering where the pressure sits in your team?',
      body: 'A confidential burnout review shows which shifts and teams are carrying it, so you can act where it counts.',
    },
    intro:
      'Burnout is often discussed as though it were a personal characteristic — some people are resilient, some are not. The evidence points elsewhere. Burnout is what happens when specific working conditions persist, and those conditions are unusually concentrated in care work.',
    sections: [
      {
        heading: 'The conditions that produce it',
        paragraphs: [
          'Occupational research consistently identifies a similar cluster: sustained workload beyond what can be done well, little control over how the work is organised, insufficient recovery between shifts, weak or absent recognition, and value conflict — a gap between how someone wants to do their job and how the job permits them to do it.',
        ],
        list: [
          'Workload that makes doing the job properly impossible rather than merely hard.',
          'Low control over rota, task order and pace.',
          'Recovery that is interrupted or absent — missed breaks, short turnarounds, consecutive long shifts.',
          'Effort that goes unnoticed, particularly on nights and weekends.',
          'Value conflict: caring for people in a way you do not believe is good enough.',
        ],
      },
      {
        heading: 'Why value conflict matters most in care',
        paragraphs: [
          'Value conflict is the one that distinguishes care from many other pressured sectors. Most people take a care role because they want to look after people well. When staffing or scheduling means they routinely give less than they believe someone deserves, the job becomes a daily experience of falling short.',
          'This is why pay rises alone often move retention less than expected. Being paid better to do a job you feel bad about is still a job you feel bad about.',
        ],
      },
      {
        heading: 'Emotional labour and bereavement',
        paragraphs: [
          'Care staff regulate their own emotions as part of the work — staying calm through distress, remaining warm with a frightened family, continuing after a resident they knew for years has died. None of it appears on a task list and all of it costs something.',
          'Where there is no routine way of acknowledging a death, that weight accumulates silently. A short, consistent practice at handover is one of the cheapest interventions available and one of the most frequently welcomed.',
        ],
      },
      {
        heading: 'Why night staff are usually worst affected',
        paragraphs: [
          'Night teams combine several of these factors: sole responsibility, fewer colleagues, less immediate support, a body clock that never settles, and near-total exclusion from anything scheduled during the day.',
          'They are also the group least likely to be reached by a wellbeing survey distributed at 10am, which means their situation is frequently under-represented in whatever data a provider does hold.',
        ],
      },
      {
        heading: 'What does not work on its own',
        paragraphs: [
          'Resilience training, wellbeing apps and mindfulness sessions all ask staff to cope better with the conditions. They can help alongside structural change, and they struggle as the whole answer — partly because they implicitly locate the problem in the staff, which experienced carers notice immediately.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-measure-staff-wellbeing',
    title: 'How to Measure Staff Wellbeing',
    description:
      'What to measure, how to reach shift workers, what participation rate you need before the findings mean anything, and how to avoid the mistakes that make surveys useless.',
    keyword: 'how to measure staff wellbeing',
    published: '2026-08-12',
    readingMinutes: 9,
    relatedPath: '/workforce-wellbeing-assessment',
    relatedLabel: 'Workforce wellbeing assessment',
    cta: {
      heading: 'Want this done properly without running it yourself?',
      body: 'We build the assessment around your rota, chase participation, and write the report in plain English.',
    },
    intro:
      'Most providers have run a staff survey at some point, and many concluded it was not worth repeating. Usually the problem was not the idea but the execution. Here is what separates a measurement exercise that changes something from one that produces a slide nobody acts on.',
    sections: [
      {
        heading: 'Measure conditions, not just feelings',
        paragraphs: [
          'Asking staff how happy they are produces a number that is hard to act on. Asking whether they took their breaks last week, whether the rota was published far enough ahead, whether they know who to raise a concern with, and whether anything happened last time they did — those produce findings you can do something about.',
          'Feelings are worth capturing as an outcome measure. Conditions are what you change to move them.',
        ],
      },
      {
        heading: 'Cover the areas that actually drive it',
        paragraphs: ['A workable question set covers a consistent set of domains.'],
        list: [
          'Workload and staffing pressure.',
          'Rota predictability and notice.',
          'Breaks and recovery between shifts.',
          'Supervision and support from seniors.',
          'Recognition for good work.',
          'Psychological safety — whether raising concerns is safe and worthwhile.',
          'Emotional demand and how it is handled.',
          'Intention to leave, as a forward-looking risk measure.',
        ],
      },
      {
        heading: 'Design for shift workers or you will measure day staff',
        paragraphs: [
          'This is where most in-house surveys fail. If distribution relies on work email, an intranet or a poster in the office, you will hear disproportionately from day staff and office-based roles — the people generally under the least pressure.',
          'Make it mobile-first, short enough to complete on a break, workable without a work email address, and time reminders around night handovers. Give bank staff a route in explicitly, because they are almost always forgotten.',
        ],
      },
      {
        heading: 'Decide your participation threshold in advance',
        paragraphs: [
          'Agree before you start what response rate you will treat as sufficient. We use roughly 40 per cent as the point below which findings cannot safely be generalised to the whole workforce, and 60 per cent as comfortable.',
          'Setting this in advance matters because afterwards there is enormous temptation to write a confident report on whatever came back. A report that overstates its own reliability is worse than no report, because decisions get made on it.',
        ],
      },
      {
        heading: 'Protect confidentiality, and be specific about how',
        paragraphs: [
          'Staff will not answer honestly about their manager if they think the answer is traceable. Saying "this is confidential" is not enough — explain what that means concretely: who sees the raw responses, what the minimum group size is before any breakdown is published, and what will be shared with managers.',
          'Then honour it. One breach, or one manager appearing to know who said what, ends the usefulness of every future survey you run.',
        ],
      },
      {
        heading: 'Feed back, including what will not change',
        paragraphs: [
          'The single biggest determinant of whether people respond next time is whether anything visibly followed last time. Tell staff what you found, what you are changing, and what you cannot change and why.',
          'Providers consistently underestimate how well the third of those lands. Staff are realistic about constraints. What they react badly to is silence.',
        ],
      },
      {
        heading: 'Re-measure, or you are guessing',
        paragraphs: [
          'A single measurement tells you where you are. Only a second one tells you whether anything you did worked. Agree the re-measurement date when you agree the first one, typically three to six months later, using identical questions so the comparison is real.',
        ],
      },
    ],
  },
];

/**
 * All articles, in one export. Split across two files purely for file length —
 * nothing should import `resourcesMore` directly.
 */
export const articles: Article[] = [...coreArticles, ...moreArticles, ...strategyArticles];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
