import type { IconName } from '@/components/Icons';

export type Service = {
  slug: string;
  title: string;
  /** One sentence — used on the home page card grid. */
  summary: string;
  icon: IconName;
  /** Expanded copy for the Services page. */
  detail: string;
  /** What the provider actually receives. Concrete, not aspirational. */
  includes: readonly string[];
  /** Typical engagement shape — helps managers picture the commitment. */
  format: string;
  bestFor: string;
};

export const services: readonly Service[] = [
  {
    slug: 'staff-wellbeing-assessments',
    title: 'Staff Wellbeing Assessments',
    summary:
      'A structured, confidential measure of how your team is actually coping — across every shift, not just the ones that speak up.',
    icon: 'clipboard',
    detail:
      'We assess wellbeing across your whole workforce using indicators chosen for care settings: workload and shift recovery, emotional demand, feeling supported by seniors, physical strain, and confidence raising concerns. Responses are confidential and reported in aggregate, so night staff, bank staff and long-serving carers all get a voice without anyone feeling exposed.',
    includes: [
      'Confidential staff survey, tailored to your service type',
      'Coverage designed to reach night, bank and part-time staff',
      'Aggregate reporting by team, site or role — never individually identifiable',
      'Benchmark of your results against your own baseline over time',
    ],
    format: 'Typically 2–3 weeks from launch to report',
    bestFor: 'Providers who suspect a problem but need evidence before acting',
  },
  {
    slug: 'care-worker-burnout-reviews',
    title: 'Care Worker Burnout Reviews',
    summary:
      'A focused review of compassion fatigue and exhaustion risk, and the shift-level factors driving it.',
    icon: 'battery',
    detail:
      'Burnout in care work rarely announces itself. It shows up as short-notice absence, a rise in errors, quieter handovers, and good people handing in notice with no explanation. This review identifies where exhaustion and compassion fatigue are concentrated, what is driving it operationally — rota patterns, lone working, unsupported end-of-life care, insufficient handover time — and which changes would relieve pressure fastest.',
    includes: [
      'Burnout and compassion fatigue risk indicators by team and shift pattern',
      'Review of rota, handover and break practices as contributing factors',
      'Identification of the highest-risk roles and locations',
      'Prioritised actions ranked by effort against likely impact',
    ],
    format: 'Typically 3–4 weeks, including manager interviews',
    bestFor: 'Services seeing rising absence, notice periods or incident rates',
  },
  {
    slug: 'workplace-health-promotion',
    title: 'Workplace Health Promotion Programmes',
    summary:
      'Practical health promotion built around shift work — not lunchtime seminars nobody on shift can attend.',
    icon: 'heart',
    detail:
      'Health promotion fails in care settings when it assumes an office day. Our programmes are built for shift reality: short, repeatable interventions that work at handover, on nights, and across sites. We focus on the things that measurably affect care staff — sleep and shift recovery, musculoskeletal strain from moving and handling, hydration and eating on shift, and knowing where to go for help early.',
    includes: [
      'Programme designed around your actual rota patterns',
      'Short-format sessions that fit into handover or shift overlap',
      'Printed and digital resources for staff rooms and bank staff',
      'Simple measures so you can show what changed',
    ],
    format: 'Rolling programme, typically 3–12 months',
    bestFor: 'Providers wanting sustained change rather than a one-off event',
  },
  {
    slug: 'mental-health-awareness',
    title: 'Mental Health Awareness Sessions',
    summary:
      'Sessions that help care teams recognise pressure early — in residents, in colleagues, and in themselves.',
    icon: 'brain',
    detail:
      'Care staff are often the first to notice when a colleague is struggling and the least sure what to do about it. These sessions build practical confidence: spotting early warning signs, starting a supportive conversation without overstepping, understanding what your organisation can and cannot offer, and knowing the escalation route. Delivered in plain English, grounded in situations care staff actually encounter.',
    includes: [
      'Awareness sessions for frontline staff',
      'Separate sessions for seniors and team leaders on supporting others',
      'Clear, printed escalation guidance for your service',
      'Optional refresher sessions to keep it live',
    ],
    format: 'Half-day or two short sessions per cohort',
    bestFor: 'Teams where support depends on individual goodwill, not a process',
  },
  {
    slug: 'stress-management-support',
    title: 'Stress Management Support',
    summary:
      'Realistic techniques for high-pressure shifts, plus the organisational changes that reduce the pressure itself.',
    icon: 'shield',
    detail:
      'Teaching individuals to cope better while leaving the causes untouched does not work, and staff can tell. We work at both levels: giving staff usable techniques for recovering between demanding shifts, and helping managers identify the organisational stressors — chronic short-staffing on particular shifts, unclear responsibilities, unsupported difficult conversations with families — that individual resilience cannot fix.',
    includes: [
      'Practical techniques staff can use during and after a shift',
      'Identification of organisational stressors, not just individual coping',
      'Manager guidance on reducing avoidable pressure',
      'Follow-up to check whether pressure has actually reduced',
    ],
    format: 'Typically delivered alongside an assessment or review',
    bestFor: 'Services under sustained operational pressure',
  },
  {
    slug: 'employee-engagement-plans',
    title: 'Employee Engagement Improvement Plans',
    summary:
      'A specific, owned plan for lifting morale and retention — with named actions and dates, not themes.',
    icon: 'users',
    detail:
      'An engagement plan is only useful if someone can pick it up on a Monday and act on it. Ours name the action, the owner, the date and the measure. They start from what your own staff told us matters, distinguish quick wins from structural changes, and stay within what your service can realistically resource.',
    includes: [
      'Prioritised action plan with named owners and target dates',
      'Separation of quick wins from longer structural changes',
      'Measures agreed up front, so progress is provable',
      'Review points to keep the plan alive',
    ],
    format: 'Plan delivered within 2 weeks of assessment findings',
    bestFor: 'Providers who already have findings but need a way forward',
  },
  {
    slug: 'healthy-lifestyle-education',
    title: 'Healthy Lifestyle Education',
    summary:
      'Straightforward guidance on sleep, nutrition and movement that survives a 12-hour shift and a night rota.',
    icon: 'leaf',
    detail:
      'Generic lifestyle advice assumes regular hours and regular meals. Care staff have neither. This is education built for rotating shifts and nights: protecting sleep when the rota fights you, eating properly when breaks are short and unpredictable, and looking after your back when moving and handling is a daily reality. Delivered without lecturing, because care staff already know the theory.',
    includes: [
      'Sleep and shift-recovery guidance for rotating and night rotas',
      'Realistic nutrition and hydration guidance for short breaks',
      'Movement and musculoskeletal care for physically demanding roles',
      'Take-home resources for staff and their families',
    ],
    format: 'Short sessions, repeated across shift patterns',
    bestFor: 'Services with significant night or rotating shift cover',
  },
  {
    slug: 'care-team-resilience',
    title: 'Care Team Resilience Programmes',
    summary:
      'Building the team habits that hold up under pressure — so resilience is structural, not left to individuals.',
    icon: 'link',
    detail:
      'Resilient teams are not made of unusually tough individuals; they have habits that spread load. We help embed the practices that actually protect teams: proper handovers, structured debriefs after difficult events such as a resident death, peer support that does not depend on one kind senior, and honest routes to raise concerns. These are the same behaviours CQC looks for under "well-led".',
    includes: [
      'Structured debrief practice after difficult events',
      'Peer support arrangements that survive staff changes',
      'Handover and communication practices that reduce load',
      'Support embedding changes so they outlast the programme',
    ],
    format: 'Rolling programme with periodic check-ins',
    bestFor: 'Providers wanting change that holds after we leave',
  },
] as const;

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
