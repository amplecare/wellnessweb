import {
  getCallForCompany,
  getEngagementForCompany,
  getEnquiryTimeline,
  getSurveyForCompany,
  getSurveyResponses,
  listActivity,
  listCompanies,
  listCompanyNotes,
  listConsultations,
  listEmployees,
  listEnquiries,
  listReports,
} from '@/lib/admin/store';
import type {
  Company,
  Consultation,
  Enquiry,
  EnquiryStatus,
  EngagementPhase,
  EngagementStage,
  ReportStatus,
  UserRole,
} from '@/lib/admin/types';

/**
 * Derived views over the data in `store.ts`.
 *
 * Presentation never reaches past this module to the underlying arrays, and this
 * module never touches React. Swapping the store for a database leaves every
 * function signature here unchanged.
 */

export function toTitleCase(value: string): string {
  return value
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function formatDate(input: string): string {
  return new Date(input).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(input: string): string {
  return new Date(input).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/** Relative day count, for "chase this" style prompts. Negative means overdue. */
export function daysUntil(input: string): number {
  const then = new Date(input).getTime();
  const now = Date.now();
  return Math.round((then - now) / 86_400_000);
}

export function companyLabel(company: Company): string {
  return `${company.name} (${company.staffCount} staff)`;
}

export function isPrivileged(role: UserRole): boolean {
  return role !== 'company_user';
}

/* --------------------------------------------------------------------------- *
 * Tenant scoping. Every list view funnels through these.
 * --------------------------------------------------------------------------- */

export function scopedCompanyId(role: UserRole, requested?: string): string | undefined {
  if (role === 'company_user') {
    return requested ?? 'harbour-oaks';
  }
  return requested;
}

export function getScopedCompanies(role: UserRole, requestedCompanyId?: string): Company[] {
  const all = listCompanies();
  if (role === 'company_user') {
    const only = all.find((c) => c.id === (requestedCompanyId ?? 'harbour-oaks'));
    return only ? [only] : [];
  }
  return all;
}

export function getScopedEnquiries(role: UserRole, requestedCompanyId?: string): Enquiry[] {
  const companyId = scopedCompanyId(role, requestedCompanyId);
  const all = listEnquiries();
  if (!companyId) return all;
  return all.filter((item) => item.companyId === companyId);
}

/**
 * The commercial pipeline is internal-only.
 *
 * A company user must never see other providers' leads, pricing discussions or
 * lost-deal reasons — so this returns nothing at all for that role rather than a
 * filtered subset.
 */
export function getScopedConsultations(role: UserRole): Consultation[] {
  if (role === 'company_user') return [];
  return listConsultations();
}

/* --------------------------------------------------------------------------- *
 * Overview aggregates.
 * --------------------------------------------------------------------------- */

export function kpis(role: UserRole, requestedCompanyId?: string) {
  const scopedCompanies = getScopedCompanies(role, requestedCompanyId);
  const scopedEnquiries = getScopedEnquiries(role, requestedCompanyId);
  const scopedEmployees = listEmployees().filter((item) =>
    scopedCompanies.some((company) => company.id === item.companyId)
  );

  const urgent = scopedEnquiries.filter(
    (item) => item.urgency === 'critical' || item.urgency === 'high'
  );
  const unresolved = scopedEnquiries.filter(
    (item) => item.status !== 'resolved' && item.status !== 'closed'
  );

  return {
    companies: scopedCompanies.length,
    employees: scopedEmployees.length,
    enquiries: scopedEnquiries.length,
    urgent: urgent.length,
    unresolved: unresolved.length,
    avgRisk: scopedEnquiries.length
      ? Math.round(
          scopedEnquiries.reduce((acc, item) => acc + item.riskScore, 0) / scopedEnquiries.length
        )
      : 0,
  };
}

export function concernTrends(role: UserRole, requestedCompanyId?: string) {
  const scoped = getScopedEnquiries(role, requestedCompanyId);
  const totals = new Map<string, number>();

  for (const enquiry of scoped) {
    totals.set(enquiry.concernType, (totals.get(enquiry.concernType) ?? 0) + 1);
  }

  return [...totals.entries()]
    .map(([concern, total]) => ({ concern, total }))
    .sort((a, b) => b.total - a.total);
}

export function urgencyBreakdown(role: UserRole, requestedCompanyId?: string) {
  const scoped = getScopedEnquiries(role, requestedCompanyId);
  const levels: Record<'low' | 'medium' | 'high' | 'critical', number> = {
    low: 0,
    medium: 0,
    high: 0,
    critical: 0,
  };

  for (const enquiry of scoped) {
    levels[enquiry.urgency] += 1;
  }

  return levels;
}

export function reportStatusSummary(role: UserRole, requestedCompanyId?: string) {
  const companyId = scopedCompanyId(role, requestedCompanyId);
  const scoped = listReports().filter((report) =>
    companyId ? report.companyId === companyId : true
  );

  const status: Record<ReportStatus, number> = { queued: 0, processing: 0, ready: 0, error: 0 };
  for (const report of scoped) status[report.status] += 1;
  return status;
}

/**
 * The companies a manager should look at first.
 *
 * Ordered by status then priority score, because "at risk" is a judgement someone has
 * already made and should outrank a numeric score.
 */
export function atRiskCompanies(role: UserRole, requestedCompanyId?: string): Company[] {
  return getScopedCompanies(role, requestedCompanyId)
    .filter((company) => company.status === 'at_risk' || company.priorityScore >= 75)
    .sort((a, b) => {
      if (a.status === 'at_risk' && b.status !== 'at_risk') return -1;
      if (b.status === 'at_risk' && a.status !== 'at_risk') return 1;
      return b.priorityScore - a.priorityScore;
    });
}

/* --------------------------------------------------------------------------- *
 * Record lookups.
 * --------------------------------------------------------------------------- */

export const companyById = (companyId: string) =>
  listCompanies().find((company) => company.id === companyId);

export const employeesByCompany = (companyId: string) =>
  listEmployees().filter((item) => item.companyId === companyId);

export const employeeName = (employeeId: string): string =>
  listEmployees().find((item) => item.id === employeeId)?.name ?? 'Unknown employee';

export const enquiriesByCompany = (companyId: string) =>
  listEnquiries().filter((item) => item.companyId === companyId);

export const reportsByCompany = (companyId: string) =>
  listReports().filter((item) => item.companyId === companyId);

export const notesByCompany = (companyId: string) =>
  listCompanyNotes()
    .filter((item) => item.companyId === companyId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

export const activityByCompany = (companyId: string) =>
  listActivity().filter((item) => item.companyId === companyId);

export const enquiryById = (enquiryId: string) =>
  listEnquiries().find((item) => item.id === enquiryId);

export const reportById = (reportId: string) => listReports().find((item) => item.id === reportId);

export const timelineByEnquiry = (enquiryId: string) => getEnquiryTimeline(enquiryId);

export function statusOptions(): EnquiryStatus[] {
  return ['new', 'triaged', 'in_progress', 'waiting_on_manager', 'resolved', 'closed'];
}

/** Every stage, in workflow order. Order matters — progress is measured against it. */
export function engagementStages(): EngagementStage[] {
  return [
    'new_enquiry',
    'company_registered',
    'survey_link_sent',
    'survey_in_progress',
    'survey_completed',
    'ai_analysis_running',
    'report_ready',
    'report_reviewed',
    'follow_up_completed',
    'proposal_sent',
    'confirmed_client',
    'closed_lost',
  ];
}

/**
 * Stages grouped into the three phases a manager thinks in: are we still setting
 * them up, are we waiting on their staff, or are we waiting on ourselves to call?
 */
export const engagementPhases: {
  phase: EngagementPhase;
  label: string;
  description: string;
  stages: EngagementStage[];
}[] = [
  {
    phase: 'setup',
    label: 'Enquiry and setup',
    description: 'Getting the account open and the survey out.',
    stages: ['new_enquiry', 'company_registered', 'survey_link_sent'],
  },
  {
    phase: 'survey_analysis',
    label: 'Survey and analysis',
    description: 'Waiting on staff responses, then on the analysis.',
    stages: ['survey_in_progress', 'survey_completed', 'ai_analysis_running', 'report_ready'],
  },
  {
    phase: 'consultation',
    label: 'Consultation and conversion',
    description: 'Our turn: review, call, propose, convert.',
    stages: [
      'report_reviewed',
      'follow_up_completed',
      'proposal_sent',
      'confirmed_client',
      'closed_lost',
    ],
  },
];

/** How far through the workflow a stage sits, 0–100. Excludes the lost stage. */
export function stageProgress(stage: EngagementStage): number {
  if (stage === 'closed_lost') return 0;
  const order = engagementStages().filter((s) => s !== 'closed_lost');
  const index = order.indexOf(stage);
  return index < 0 ? 0 : Math.round(((index + 1) / order.length) * 100);
}

/** Everyone who can own a case. Replace with a real user table in phase 2. */
export function assignableOwners(): string[] {
  const fromEnquiries = listEnquiries().map((item) => item.assignee);
  const fromCompanies = listCompanies().map((item) => item.accountOwner);
  return [...new Set([...fromEnquiries, ...fromCompanies])].sort();
}

/* --------------------------------------------------------------------------- *
 * Enquiry triage queue.
 * --------------------------------------------------------------------------- */

export interface EnquiryFilters {
  status?: string;
  urgency?: string;
  concern?: string;
  assignee?: string;
  /** 'open' hides resolved and closed cases — the default working view. */
  view?: string;
}

export function filterEnquiries(
  role: UserRole,
  requestedCompanyId: string | undefined,
  filters: EnquiryFilters
): Enquiry[] {
  let list = getScopedEnquiries(role, requestedCompanyId);

  if (filters.view !== 'all') {
    list = list.filter((item) => item.status !== 'resolved' && item.status !== 'closed');
  }
  if (filters.status) list = list.filter((item) => item.status === filters.status);
  if (filters.urgency) list = list.filter((item) => item.urgency === filters.urgency);
  if (filters.concern) list = list.filter((item) => item.concernType === filters.concern);
  if (filters.assignee) list = list.filter((item) => item.assignee === filters.assignee);

  // Most urgent first, then highest risk, then oldest — the order a triager works in.
  const urgencyRank = { critical: 0, high: 1, medium: 2, low: 3 } as const;
  return list.sort(
    (a, b) =>
      urgencyRank[a.urgency] - urgencyRank[b.urgency] ||
      b.riskScore - a.riskScore ||
      a.submittedAt.localeCompare(b.submittedAt)
  );
}

/* --------------------------------------------------------------------------- *
 * Consultation pipeline.
 * --------------------------------------------------------------------------- */

export function pipelineByStage(
  role: UserRole
): { stage: EngagementStage; leads: Consultation[] }[] {
  const all = getScopedConsultations(role);
  return engagementStages().map((stage) => ({
    stage,
    leads: all
      .filter((lead) => lead.stage === stage)
      .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt)),
  }));
}

export function pipelineSummary(role: UserRole) {
  const all = getScopedConsultations(role);
  const open = all.filter(
    (lead) => lead.stage !== 'confirmed_client' && lead.stage !== 'closed_lost'
  );

  return {
    total: all.length,
    open: open.length,
    awaitingFirstContact: all.filter((lead) => lead.stage === 'new_enquiry').length,
    surveysOut: all.filter((lead) =>
      ['survey_link_sent', 'survey_in_progress'].includes(lead.stage)
    ).length,
    awaitingOurAction: all.filter((lead) =>
      ['survey_completed', 'report_ready'].includes(lead.stage)
    ).length,
    proposalsOut: all.filter((lead) => lead.stage === 'proposal_sent').length,
    confirmed: all.filter((lead) => lead.stage === 'confirmed_client').length,
    /** Staff covered by open leads — the size of the opportunity, not a revenue claim. */
    staffInPipeline: open.reduce((acc, lead) => acc + lead.staffCount, 0),
  };
}

/**
 * Leads whose next action is due or overdue.
 *
 * This is the single most operationally useful list in the pipeline: it is how a
 * consultation request stops going cold while everyone assumes someone else called.
 */
export function leadsNeedingAction(role: UserRole): Consultation[] {
  return getScopedConsultations(role)
    .filter((lead) => lead.stage !== 'confirmed_client' && lead.stage !== 'closed_lost')
    .filter((lead) => lead.nextActionAt && daysUntil(lead.nextActionAt) <= 0)
    .sort((a, b) => (a.nextActionAt ?? '').localeCompare(b.nextActionAt ?? ''));
}

export function consultationById(consultationId: string): Consultation | undefined {
  return listConsultations().find((item) => item.id === consultationId);
}

export function suggestActionsForCompany(companyId: string): string[] {
  const scoped = enquiriesByCompany(companyId);
  const highRisk = scoped.filter((item) => item.riskScore >= 80).length;
  const burnoutSignals = scoped.filter((item) => item.concernType === 'burnout').length;
  const absenceSignals = scoped.filter((item) => item.concernType === 'absence').length;

  const actions: string[] = [];

  if (highRisk > 0) actions.push('Run a 48-hour urgent case review with manager sign-off.');
  if (burnoutSignals >= 1)
    actions.push('Schedule fortnightly wellbeing check-ins for affected teams.');
  if (absenceSignals >= 1)
    actions.push('Review rota coverage and break protection in pressured shifts.');
  if (!actions.length) actions.push('Maintain current plan and monitor monthly trend shifts.');

  return actions;
}

/** Tailored prompts for the pre-consultation prep sheet. */
export function suggestActionsForLead(lead: Consultation): string[] {
  const actions: string[] = [];

  if (lead.stage === 'new_enquiry') {
    actions.push(
      `Call ${lead.enquirerName} to book the consultation — they prefer ${lead.preferredContact}.`
    );
  }
  if (lead.challenges.includes('burnout')) {
    actions.push('Lead the call with the burnout review, not the full service list.');
  }
  if (lead.challenges.includes('absence')) {
    actions.push('Bring the absence benchmark so their figure has something to sit against.');
  }
  if (lead.staffCount >= 150) {
    actions.push(`At ${lead.staffCount} staff, check the volume banding before quoting.`);
  }
  if (lead.stage === 'proposal_sent' && lead.nextActionAt && daysUntil(lead.nextActionAt) <= 0) {
    actions.push('Proposal is past its follow-up date — chase today.');
  }
  if (!actions.length) {
    actions.push('Confirm the next step and set a follow-up date so this does not go cold.');
  }

  return actions;
}

/* --------------------------------------------------------------------------- *
 * Survey participation and consultant follow-up.
 * --------------------------------------------------------------------------- */

/**
 * Participation for one company's current survey.
 *
 * Participation rate is the number that decides whether a report is worth writing.
 * A wellbeing report built on 12% of a workforce is not a picture of that workforce,
 * and presenting it as one would be misleading to the provider.
 */
export function surveyProgress(companyId: string) {
  const survey = getSurveyForCompany(companyId);
  if (!survey) return undefined;

  const rate = survey.invitedCount
    ? Math.round((survey.responseCount / survey.invitedCount) * 100)
    : 0;

  return {
    survey,
    rate,
    /** Below this, findings are not safely generalisable to the whole workforce. */
    lowParticipation: rate < 40 && survey.status !== 'created',
    /** Enough to write a report on with the usual caveats. */
    readyToAnalyse: rate >= 60,
    daysLeft: survey.closesAt ? daysUntil(survey.closesAt) : undefined,
    responses: getSurveyResponses(survey.id),
  };
}

/** Every company whose survey is out but under-subscribed. */
export function companiesWithLowParticipation(role: UserRole, requestedCompanyId?: string) {
  return getScopedCompanies(role, requestedCompanyId)
    .map((company) => ({ company, progress: surveyProgress(company.id) }))
    .filter(
      (
        item
      ): item is { company: Company; progress: NonNullable<ReturnType<typeof surveyProgress>> } =>
        Boolean(item.progress?.lowParticipation)
    );
}

export function surveySummary(role: UserRole, requestedCompanyId?: string) {
  const companies = getScopedCompanies(role, requestedCompanyId);
  const surveys = companies
    .map((company) => getSurveyForCompany(company.id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const active = surveys.filter(
    (s) => s.status === 'sent' || s.status === 'in_progress' || s.status === 'opened'
  );
  const completed = surveys.filter((s) => s.status === 'completed');
  const invited = surveys.reduce((sum, s) => sum + s.invitedCount, 0);
  const responses = surveys.reduce((sum, s) => sum + s.responseCount, 0);

  return {
    active: active.length,
    completed: completed.length,
    notYetSent: surveys.filter((s) => s.status === 'created').length,
    totalInvited: invited,
    totalResponses: responses,
    overallRate: invited ? Math.round((responses / invited) * 100) : 0,
  };
}

/** Reports that have been generated but nobody has reviewed yet. */
export function reportsAwaitingReview(role: UserRole, requestedCompanyId?: string) {
  const companyId = scopedCompanyId(role, requestedCompanyId);
  return listReports()
    .filter((report) => (companyId ? report.companyId === companyId : true))
    .filter((report) => report.status === 'ready' && !report.reviewedBy);
}

/**
 * Companies where the report is reviewed but the consultant has not called yet.
 *
 * This is the step the whole service depends on. A report nobody talks the provider
 * through is a PDF that gets filed, and the provider never sees the value.
 */
export function companiesAwaitingCall(role: UserRole, requestedCompanyId?: string) {
  return getScopedCompanies(role, requestedCompanyId)
    .map((company) => ({
      company,
      call: getCallForCompany(company.id),
      engagement: getEngagementForCompany(company.id),
    }))
    .filter(
      (item) =>
        item.engagement?.stage === 'report_reviewed' &&
        (!item.call || item.call.status !== 'completed')
    );
}

export function callForCompany(companyId: string) {
  return getCallForCompany(companyId);
}

export function engagementForCompany(companyId: string) {
  return getEngagementForCompany(companyId);
}

/** Who can be assigned as a consultant. Replace with a real user table in phase 2. */
export function consultants(): string[] {
  return [...new Set(listCompanies().map((c) => c.accountOwner))].sort();
}

/* --------------------------------------------------------------------------- *
 * The task list.
 * --------------------------------------------------------------------------- */

export type TaskUrgency = 'overdue' | 'today' | 'soon';

export interface AdminTask {
  id: string;
  /** What to do, as an instruction. Never a noun phrase like "Report review". */
  action: string;
  /** Why it is on the list, in one line. */
  because: string;
  href: string;
  urgency: TaskUrgency;
  /** Lower sorts first. */
  weight: number;
}

/**
 * What needs doing, in the order it should be done.
 *
 * The overview previously opened with nine KPI cards. A number tells an experienced
 * manager how things are going; it tells someone new nothing about what to do next,
 * and "9 unresolved" is not an instruction. This builds an actual worklist so a new
 * admin can work a whole day from one screen without being trained first.
 *
 * Order is deliberate: a person waiting on us outranks an internal task, and anything
 * already overdue outranks anything merely due.
 */
export function buildTaskList(role: UserRole, requestedCompanyId?: string): AdminTask[] {
  const tasks: AdminTask[] = [];

  // 1. Leads that have gone past their follow-up date. A provider is waiting.
  for (const lead of leadsNeedingAction(role)) {
    const days = lead.nextActionAt ? Math.abs(daysUntil(lead.nextActionAt)) : 0;
    tasks.push({
      id: `lead-${lead.id}`,
      action: lead.nextAction || `Follow up with ${lead.organisationName}`,
      because:
        days === 0
          ? `${lead.organisationName} — due today`
          : `${lead.organisationName} — ${days} day${days === 1 ? '' : 's'} overdue`,
      href: `/admin/pipeline/${lead.id}`,
      urgency: days > 0 ? 'overdue' : 'today',
      weight: days > 0 ? 0 : 10,
    });
  }

  // 2. Reports generated but not yet read by a consultant. Nothing moves until this
  //    happens, and the client is expecting a call about it.
  for (const report of reportsAwaitingReview(role, requestedCompanyId)) {
    const company = companyById(report.companyId);
    tasks.push({
      id: `report-${report.id}`,
      action: `Review the ${report.periodLabel} report`,
      because: `${company?.name ?? report.companyId} — ready, not yet reviewed`,
      href: `/admin/reports/${report.id}`,
      urgency: 'today',
      weight: 20,
    });
  }

  // 3. Reviewed reports with no completed call. The report is useless until someone
  //    talks the provider through it.
  for (const { company } of companiesAwaitingCall(role, requestedCompanyId)) {
    tasks.push({
      id: `call-${company.id}`,
      action: `Call ${company.name} about their report`,
      because: 'Report reviewed — the client has not been talked through it yet',
      href: `/admin/companies/${company.id}?tab=followup`,
      urgency: 'today',
      weight: 30,
    });
  }

  // 4. Surveys too thinly answered to draw conclusions from.
  for (const { company, progress } of companiesWithLowParticipation(role, requestedCompanyId)) {
    tasks.push({
      id: `survey-${company.id}`,
      action: `Chase survey participation at ${company.name}`,
      because: `Only ${progress.rate}% have responded — below the 40% needed to generalise`,
      href: `/admin/companies/${company.id}?tab=survey`,
      urgency: 'soon',
      weight: 40,
    });
  }

  // 5. Critical and high wellbeing cases still open.
  for (const enquiry of filterEnquiries(role, requestedCompanyId, {
    urgency: 'critical',
    view: 'open',
  })) {
    const company = companyById(enquiry.companyId);
    tasks.push({
      id: `case-${enquiry.id}`,
      action: `Act on a critical case at ${company?.name ?? enquiry.companyId}`,
      because: `${toTitleCase(enquiry.concernType)} — risk ${enquiry.riskScore}%`,
      href: `/admin/enquiries/${enquiry.id}`,
      urgency: 'overdue',
      weight: 5,
    });
  }

  // 6. New consultation requests nobody has contacted yet.
  for (const lead of getScopedConsultations(role).filter((l) => l.stage === 'new_enquiry')) {
    if (tasks.some((t) => t.id === `lead-${lead.id}`)) continue;
    tasks.push({
      id: `new-${lead.id}`,
      action: `Call ${lead.organisationName} to book their consultation`,
      because: 'New request — nobody has contacted them yet',
      href: `/admin/pipeline/${lead.id}`,
      urgency: 'today',
      weight: 15,
    });
  }

  return tasks.sort((a, b) => a.weight - b.weight || a.action.localeCompare(b.action));
}
