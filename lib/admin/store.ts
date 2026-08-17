import { cache } from 'react';
import { newId, query, transaction } from '@/lib/admin/db';
import type {
  ActivityLogItem,
  CallOutcome,
  CallStatus,
  ClientReport,
  Company,
  CompanyNote,
  ConsultantCall,
  Consultation,
  ConsultationEvent,
  Employee,
  EngagementStage,
  Enquiry,
  EnquiryNote,
  EnquiryStatus,
  EnquiryTimelineEvent,
  SurveyLink,
  SurveyResponse,
} from '@/lib/admin/types';

/**
 * The single data-access boundary for the admin area. Postgres is the source of
 * truth; nothing is invented and nothing is held only in memory.
 *
 * ## Why there is still a cache
 *
 * Every read function here is synchronous, and roughly forty derived queries in
 * `insights.ts` plus every dashboard page depend on that. Making the whole chain
 * async would have meant rewriting all of it at once.
 *
 * Instead a page calls `await loadWorkspace()` once, which fetches the whole dataset
 * in a single round of parallel queries and holds it for the remainder of that
 * request. React's `cache()` scopes it per request, so two components asking for the
 * same data in one render share one fetch, and a later request always sees fresh
 * rows. Writes update Postgres first, then the in-request copy, so anything read
 * after a write in the same request is already correct.
 *
 * This is viable because the dataset is small — a handful of client organisations.
 * If it grows into thousands of rows, replace the whole-dataset load with targeted
 * queries and make the readers async; the function signatures in `insights.ts` are
 * what would change, and nothing above them.
 */

interface Workspace {
  companies: Company[];
  employees: Employee[];
  enquiries: Enquiry[];
  enquiryTimeline: EnquiryTimelineEvent[];
  enquiryNotes: EnquiryNote[];
  reports: ClientReport[];
  companyNotes: CompanyNote[];
  activity: ActivityLogItem[];
  consultations: Consultation[];
  consultationEvents: ConsultationEvent[];
  surveyLinks: SurveyLink[];
  surveyResponses: SurveyResponse[];
  calls: ConsultantCall[];
}

const empty = (): Workspace => ({
  companies: [],
  employees: [],
  enquiries: [],
  enquiryTimeline: [],
  enquiryNotes: [],
  reports: [],
  companyNotes: [],
  activity: [],
  consultations: [],
  consultationEvents: [],
  surveyLinks: [],
  surveyResponses: [],
  calls: [],
});

/* --------------------------------------------------------------------------- *
 * Row mapping. Postgres is snake_case; the domain types are camelCase.
 * --------------------------------------------------------------------------- */

const iso = (value: Date | string | null | undefined): string | undefined =>
  value ? new Date(value).toISOString() : undefined;

/**
 * Normalises a Postgres array column into a JS array.
 *
 * `node-postgres` parses built-in array types (text[], int[]) but has no parser
 * registered for arrays of *user-defined enums*, so `concern_type[]` comes back as
 * the raw literal string `{burnout,absence}` instead of an array. Calling .join() on
 * that throws, which is exactly how this surfaced: the row was written successfully
 * and then the response blew up.
 *
 * Handles both shapes so it stays correct whichever type a column later becomes.
 */
function pgArray<T extends string>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (typeof value !== 'string') return [];
  const inner = value.replace(/^\{|\}$/g, '').trim();
  if (!inner) return [];
  return inner.split(',').map((v) => v.replace(/^"|"$/g, '').trim()) as T[];
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const toCompany = (r: any): Company => ({
  id: r.id,
  name: r.name,
  type: r.type,
  status: r.status,
  priorityScore: r.priority_score,
  accountOwner: r.account_owner,
  primaryContact: {
    name: r.contact_name,
    role: r.contact_role,
    email: r.contact_email,
    phone: r.contact_phone,
  },
  staffCount: r.staff_count,
  joinedAt: iso(r.joined_at) ?? new Date().toISOString(),
  tags: pgArray(r.tags),
});

const toEmployee = (r: any): Employee => ({
  id: r.id,
  companyId: r.company_id,
  name: r.name,
  role: r.role,
  department: r.department,
  manager: r.manager,
  lastCheckIn: iso(r.last_check_in) ?? '',
  openEnquiries: r.open_enquiries,
});

const toEnquiry = (r: any): Enquiry => ({
  id: r.id,
  companyId: r.company_id,
  employeeId: r.employee_id ?? '',
  submittedAt: iso(r.submitted_at) ?? '',
  concernType: r.concern_type,
  urgency: r.urgency,
  preferredContact: r.preferred_contact,
  status: r.status,
  assignee: r.assignee,
  summary: r.summary,
  notes: r.notes,
  aiSummary: r.ai_summary,
  riskScore: r.risk_score,
});

const toReport = (r: any): ClientReport => ({
  id: r.id,
  companyId: r.company_id,
  periodLabel: r.period_label,
  createdAt: iso(r.created_at) ?? '',
  status: r.status,
  headline: r.headline,
  keyRisks: pgArray(r.key_risks),
  recommendations: pgArray(r.recommendations),
  burnoutRisk: r.burnout_risk,
  absenceRisk: r.absence_risk,
  engagementScore: r.engagement_score,
  themes: r.themes ?? [],
  basedOnResponses: r.based_on_responses ?? undefined,
  consultantNotes: r.consultant_notes ?? undefined,
  reviewedBy: r.reviewed_by ?? undefined,
  reviewedAt: iso(r.reviewed_at),
  followUpRecommendations: pgArray(r.follow_up_recommendations),
});

const toConsultation = (r: any): Consultation => ({
  id: r.id,
  organisationName: r.organisation_name,
  organisationType: r.organisation_type,
  staffCount: r.staff_count,
  enquirerName: r.enquirer_name,
  enquirerRole: r.enquirer_role,
  email: r.email,
  phone: r.phone,
  challenges: pgArray<Consultation['challenges'][number]>(r.challenges),
  preferredContact: r.preferred_contact,
  availability: r.availability,
  notes: r.notes,
  stage: r.stage,
  owner: r.owner,
  submittedAt: iso(r.submitted_at) ?? '',
  consultationAt: iso(r.consultation_at),
  nextActionAt: iso(r.next_action_at),
  nextAction: r.next_action ?? undefined,
  packageInterest: r.package_interest,
  companyId: r.company_id ?? undefined,
  lostReason: r.lost_reason ?? undefined,
});

const toSurveyLink = (r: any): SurveyLink => ({
  id: r.id,
  companyId: r.company_id,
  url: r.url,
  status: r.status,
  createdAt: iso(r.created_at) ?? '',
  sentAt: iso(r.sent_at),
  lastRemindedAt: iso(r.last_reminded_at),
  closesAt: iso(r.closes_at),
  invitedCount: r.invited_count,
  responseCount: r.response_count,
  issuedBy: r.issued_by,
});

const toSurveyResponse = (r: any): SurveyResponse => ({
  id: r.id,
  surveyId: r.survey_id,
  companyId: r.company_id,
  employeeId: r.employee_id ?? '',
  status: r.status,
  startedAt: iso(r.started_at),
  completedAt: iso(r.completed_at),
});

const toCall = (r: any): ConsultantCall => ({
  id: r.id,
  companyId: r.company_id,
  reportId: r.report_id ?? undefined,
  consultant: r.consultant,
  status: r.status,
  scheduledFor: iso(r.scheduled_for),
  completedAt: iso(r.completed_at),
  outcome: r.outcome ?? undefined,
  notes: r.notes ?? undefined,
  agreedNextStep: r.agreed_next_step ?? undefined,
});
/* eslint-enable @typescript-eslint/no-explicit-any */

/* --------------------------------------------------------------------------- *
 * Loading
 * --------------------------------------------------------------------------- */

const globalRef = globalThis as typeof globalThis & { __ampleWorkspace?: Workspace };

/**
 * Fetches the whole workspace in one round of parallel queries.
 *
 * `cache()` memoises this for the lifetime of a single request, so a page that
 * renders twelve components asking for data performs one fetch, not twelve.
 */
export const loadWorkspace = cache(async (): Promise<Workspace> => {
  const [
    companies,
    employees,
    enquiries,
    timeline,
    enquiryNotes,
    reports,
    companyNotes,
    activity,
    consultations,
    consultationEvents,
    surveyLinks,
    surveyResponses,
    calls,
  ] = await Promise.all([
    query('select * from company order by priority_score desc, name'),
    query('select * from employee order by name'),
    query('select * from enquiry order by submitted_at desc'),
    query('select * from enquiry_timeline order by at desc'),
    query('select * from enquiry_note order by created_at desc'),
    query('select * from client_report order by created_at desc'),
    query('select * from company_note order by created_at desc'),
    query('select * from activity_log order by at desc limit 500'),
    query('select * from consultation order by submitted_at desc'),
    query('select * from consultation_event order by at desc'),
    query('select * from survey_link order by created_at desc'),
    query('select * from survey_response'),
    query('select * from consultant_call order by scheduled_for desc nulls last'),
  ]);

  const workspace: Workspace = {
    companies: companies.map(toCompany),
    employees: employees.map(toEmployee),
    enquiries: enquiries.map(toEnquiry),
    enquiryTimeline: timeline.map((r) => ({
      id: r.id,
      enquiryId: r.enquiry_id,
      at: iso(r.at) ?? '',
      actor: r.actor,
      action: r.action,
      detail: r.detail,
    })),
    enquiryNotes: enquiryNotes.map((r) => ({
      id: r.id,
      enquiryId: r.enquiry_id,
      createdAt: iso(r.created_at) ?? '',
      author: r.author,
      content: r.content,
    })),
    reports: reports.map(toReport),
    companyNotes: companyNotes.map((r) => ({
      id: r.id,
      companyId: r.company_id,
      createdAt: iso(r.created_at) ?? '',
      author: r.author,
      content: r.content,
    })),
    activity: activity.map((r) => ({
      id: r.id,
      companyId: r.company_id ?? '',
      at: iso(r.at) ?? '',
      actor: r.actor,
      type: r.type,
      detail: r.detail,
    })),
    consultations: consultations.map(toConsultation),
    consultationEvents: consultationEvents.map((r) => ({
      id: r.id,
      consultationId: r.consultation_id,
      at: iso(r.at) ?? '',
      actor: r.actor,
      action: r.action,
      detail: r.detail,
    })),
    surveyLinks: surveyLinks.map(toSurveyLink),
    surveyResponses: surveyResponses.map(toSurveyResponse),
    calls: calls.map(toCall),
  };

  globalRef.__ampleWorkspace = workspace;
  return workspace;
});

/**
 * The data for the current request.
 *
 * Returns an empty workspace rather than throwing if a caller somehow reads before
 * `loadWorkspace()` has run. An empty dashboard renders its (already built) empty
 * states; a thrown error would blank the whole page.
 */
function ws(): Workspace {
  return globalRef.__ampleWorkspace ?? empty();
}

/* --------------------------------------------------------------------------- *
 * Reads
 * --------------------------------------------------------------------------- */

export const listCompanies = (): Company[] => [...ws().companies];
export const listEmployees = (): Employee[] => [...ws().employees];
export const listEnquiries = (): Enquiry[] => [...ws().enquiries];
export const listReports = (): ClientReport[] => [...ws().reports];
export const listCompanyNotes = (): CompanyNote[] => [...ws().companyNotes];
export const listActivity = (): ActivityLogItem[] => [...ws().activity];
export const listConsultations = (): Consultation[] => [...ws().consultations];
export const listSurveyLinks = (): SurveyLink[] => [...ws().surveyLinks];
export const listCalls = (): ConsultantCall[] => [...ws().calls];

export const getCompany = (id: string) => ws().companies.find((c) => c.id === id);
export const getEnquiry = (id: string) => ws().enquiries.find((e) => e.id === id);
export const getReport = (id: string) => ws().reports.find((r) => r.id === id);
export const getConsultation = (id: string) => ws().consultations.find((c) => c.id === id);

export const getEnquiryTimeline = (enquiryId: string) =>
  ws()
    .enquiryTimeline.filter((t) => t.enquiryId === enquiryId)
    .sort((a, b) => b.at.localeCompare(a.at));

export const getEnquiryNotes = (enquiryId: string) =>
  ws()
    .enquiryNotes.filter((n) => n.enquiryId === enquiryId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

export const getConsultationEvents = (consultationId: string) =>
  ws()
    .consultationEvents.filter((e) => e.consultationId === consultationId)
    .sort((a, b) => b.at.localeCompare(a.at));

export const getSurveyForCompany = (companyId: string) =>
  ws()
    .surveyLinks.filter((s) => s.companyId === companyId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];

export const getSurveyResponses = (surveyId: string) =>
  ws().surveyResponses.filter((r) => r.surveyId === surveyId);

export const getCallForCompany = (companyId: string) =>
  ws()
    .calls.filter((c) => c.companyId === companyId)
    .sort((a, b) => (b.scheduledFor ?? '').localeCompare(a.scheduledFor ?? ''))[0];

export const getEngagementForCompany = (companyId: string) =>
  ws().consultations.find((c) => c.companyId === companyId);

/* --------------------------------------------------------------------------- *
 * Writes. Postgres first, then the in-request copy.
 *
 * Each write and its audit entry go in one transaction: a status change that
 * succeeded while its activity entry failed would leave the log quietly lying
 * about what happened, which is worse than the write failing outright.
 * --------------------------------------------------------------------------- */

function label(value: string): string {
  return value
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export async function updateEnquiryStatus(
  enquiryId: string,
  status: EnquiryStatus,
  actor: string
): Promise<Enquiry | undefined> {
  const current = getEnquiry(enquiryId);
  if (!current || current.status === status) return current;

  await transaction(async (run) => {
    await run('update enquiry set status = $2 where id = $1', [enquiryId, status]);
    await run(
      'insert into enquiry_timeline(id, enquiry_id, actor, action, detail) values ($1,$2,$3,$4,$5)',
      [newId('tl'), enquiryId, actor, 'Status changed', `Moved from ${label(current.status)} to ${label(status)}.`]
    );
    await run('insert into activity_log(id, company_id, actor, type, detail) values ($1,$2,$3,$4,$5)', [
      newId('act'),
      current.companyId,
      actor,
      'enquiry_status_changed',
      `${enquiryId} moved to ${label(status)}.`,
    ]);
  });

  current.status = status;
  return current;
}

export async function assignEnquiry(
  enquiryId: string,
  assignee: string,
  actor: string
): Promise<Enquiry | undefined> {
  const current = getEnquiry(enquiryId);
  if (!current || current.assignee === assignee) return current;
  const previous = current.assignee;

  await transaction(async (run) => {
    await run('update enquiry set assignee = $2 where id = $1', [enquiryId, assignee]);
    await run(
      'insert into enquiry_timeline(id, enquiry_id, actor, action, detail) values ($1,$2,$3,$4,$5)',
      [newId('tl'), enquiryId, actor, 'Case reassigned', `Reassigned from ${previous} to ${assignee}.`]
    );
    await run('insert into activity_log(id, company_id, actor, type, detail) values ($1,$2,$3,$4,$5)', [
      newId('act'),
      current.companyId,
      actor,
      'enquiry_assigned',
      `${enquiryId} assigned to ${assignee}.`,
    ]);
  });

  current.assignee = assignee;
  return current;
}

export async function addEnquiryNote(
  enquiryId: string,
  content: string,
  author: string
): Promise<EnquiryNote | undefined> {
  const enquiry = getEnquiry(enquiryId);
  if (!enquiry) return undefined;

  const note: EnquiryNote = {
    id: newId('en'),
    enquiryId,
    createdAt: new Date().toISOString(),
    author,
    content,
  };

  await transaction(async (run) => {
    await run('insert into enquiry_note(id, enquiry_id, author, content) values ($1,$2,$3,$4)', [
      note.id,
      enquiryId,
      author,
      content,
    ]);
    await run('insert into activity_log(id, company_id, actor, type, detail) values ($1,$2,$3,$4,$5)', [
      newId('act'),
      enquiry.companyId,
      author,
      'note_added',
      `Note added to ${enquiryId}.`,
    ]);
  });

  ws().enquiryNotes.unshift(note);
  return note;
}

export async function addCompanyNote(
  companyId: string,
  content: string,
  author: string
): Promise<CompanyNote | undefined> {
  if (!getCompany(companyId)) return undefined;

  const note: CompanyNote = {
    id: newId('cn'),
    companyId,
    createdAt: new Date().toISOString(),
    author,
    content,
  };

  await transaction(async (run) => {
    await run('insert into company_note(id, company_id, author, content) values ($1,$2,$3,$4)', [
      note.id,
      companyId,
      author,
      content,
    ]);
    await run('insert into activity_log(id, company_id, actor, type, detail) values ($1,$2,$3,$4,$5)', [
      newId('act'),
      companyId,
      author,
      'note_added',
      'Account note added.',
    ]);
  });

  ws().companyNotes.unshift(note);
  return note;
}

export async function updateConsultationStage(
  consultationId: string,
  stage: EngagementStage,
  actor: string,
  detail?: string
): Promise<Consultation | undefined> {
  const lead = getConsultation(consultationId);
  if (!lead || lead.stage === stage) return lead;
  const previous = lead.stage;

  await transaction(async (run) => {
    await run('update consultation set stage = $2 where id = $1', [consultationId, stage]);
    await run(
      'insert into consultation_event(id, consultation_id, actor, action, detail) values ($1,$2,$3,$4,$5)',
      [
        newId('lev'),
        consultationId,
        actor,
        `Moved to ${label(stage)}`,
        detail?.trim() || `Stage changed from ${label(previous)}.`,
      ]
    );
    if (lead.companyId) {
      await run('insert into activity_log(id, company_id, actor, type, detail) values ($1,$2,$3,$4,$5)', [
        newId('act'),
        lead.companyId,
        actor,
        'lead_stage_changed',
        `${lead.organisationName} moved to ${label(stage)}.`,
      ]);
    }
  });

  lead.stage = stage;
  return lead;
}

export async function updateConsultationNextAction(
  consultationId: string,
  nextAction: string,
  nextActionAt: string | undefined,
  actor: string
): Promise<Consultation | undefined> {
  const lead = getConsultation(consultationId);
  if (!lead) return undefined;

  await transaction(async (run) => {
    await run('update consultation set next_action = $2, next_action_at = $3 where id = $1', [
      consultationId,
      nextAction || null,
      nextActionAt ?? null,
    ]);
    await run(
      'insert into consultation_event(id, consultation_id, actor, action, detail) values ($1,$2,$3,$4,$5)',
      [
        newId('lev'),
        consultationId,
        actor,
        'Next action updated',
        nextAction ? `Next action: ${nextAction}` : 'Next action cleared.',
      ]
    );
  });

  lead.nextAction = nextAction || undefined;
  lead.nextActionAt = nextActionAt;
  return lead;
}

export async function markSurveySent(
  companyId: string,
  actor: string
): Promise<SurveyLink | undefined> {
  const survey = getSurveyForCompany(companyId);
  if (!survey) return undefined;

  const now = new Date().toISOString();
  const firstSend = survey.status === 'created';

  await transaction(async (run) => {
    if (firstSend) {
      await run("update survey_link set status = 'sent', sent_at = $2 where id = $1", [survey.id, now]);
    } else {
      await run('update survey_link set last_reminded_at = $2 where id = $1', [survey.id, now]);
    }
    await run('insert into activity_log(id, company_id, actor, type, detail) values ($1,$2,$3,$4,$5)', [
      newId('act'),
      companyId,
      actor,
      'survey_sent',
      firstSend ? 'Survey link sent to the provider.' : 'Reminder sent to the provider.',
    ]);
  });

  if (firstSend) {
    survey.status = 'sent';
    survey.sentAt = now;
  } else {
    survey.lastRemindedAt = now;
  }
  return survey;
}

export async function recordConsultantCall(
  companyId: string,
  input: {
    consultant: string;
    status: CallStatus;
    outcome?: CallOutcome;
    scheduledFor?: string;
    notes?: string;
    agreedNextStep?: string;
  },
  actor: string
): Promise<ConsultantCall | undefined> {
  if (!getCompany(companyId)) return undefined;

  const existing = getCallForCompany(companyId);
  const now = new Date().toISOString();
  const id = existing?.id ?? newId('call');
  const completedAt = input.status === 'completed' ? now : existing?.completedAt;

  await transaction(async (run) => {
    await run(
      `insert into consultant_call
         (id, company_id, consultant, status, scheduled_for, completed_at, outcome, notes, agreed_next_step)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       on conflict (id) do update set
         consultant = excluded.consultant,
         status = excluded.status,
         scheduled_for = coalesce(excluded.scheduled_for, consultant_call.scheduled_for),
         completed_at = coalesce(excluded.completed_at, consultant_call.completed_at),
         outcome = excluded.outcome,
         notes = coalesce(nullif(excluded.notes, ''), consultant_call.notes),
         agreed_next_step = coalesce(nullif(excluded.agreed_next_step, ''), consultant_call.agreed_next_step)`,
      [
        id,
        companyId,
        input.consultant,
        input.status,
        input.scheduledFor ?? existing?.scheduledFor ?? null,
        completedAt ?? null,
        input.outcome ?? null,
        input.notes?.trim() ?? '',
        input.agreedNextStep?.trim() ?? '',
      ]
    );
    await run('insert into activity_log(id, company_id, actor, type, detail) values ($1,$2,$3,$4,$5)', [
      newId('act'),
      companyId,
      actor,
      'call_logged',
      input.status === 'completed'
        ? `Follow-up call completed by ${input.consultant}.`
        : `Follow-up call marked ${label(input.status)}.`,
    ]);
  });

  // A completed call is what moves the engagement on, so the stage can never
  // silently disagree with the call record.
  if (input.status === 'completed') {
    const engagement = getEngagementForCompany(companyId);
    if (engagement?.stage === 'report_reviewed') {
      await updateConsultationStage(engagement.id, 'follow_up_completed', actor, 'Follow-up call completed.');
    }
  }

  const call: ConsultantCall = {
    id,
    companyId,
    reportId: existing?.reportId,
    consultant: input.consultant,
    status: input.status,
    scheduledFor: input.scheduledFor ?? existing?.scheduledFor,
    completedAt,
    outcome: input.outcome,
    notes: input.notes?.trim() || existing?.notes,
    agreedNextStep: input.agreedNextStep?.trim() || existing?.agreedNextStep,
  };

  const list = ws().calls;
  const index = list.findIndex((c) => c.id === id);
  if (index >= 0) list[index] = call;
  else list.unshift(call);

  return call;
}

export async function reviewReport(
  reportId: string,
  consultantNotes: string,
  actor: string
): Promise<ClientReport | undefined> {
  const report = getReport(reportId);
  if (!report) return undefined;

  const now = new Date().toISOString();

  await transaction(async (run) => {
    await run(
      'update client_report set consultant_notes = $2, reviewed_by = $3, reviewed_at = $4 where id = $1',
      [reportId, consultantNotes.trim(), actor, now]
    );
    await run('insert into activity_log(id, company_id, actor, type, detail) values ($1,$2,$3,$4,$5)', [
      newId('act'),
      report.companyId,
      actor,
      'report_reviewed',
      `${report.periodLabel} report reviewed and cleared for the client call.`,
    ]);
  });

  report.consultantNotes = consultantNotes.trim();
  report.reviewedBy = actor;
  report.reviewedAt = now;

  const engagement = getEngagementForCompany(report.companyId);
  if (engagement?.stage === 'report_ready') {
    await updateConsultationStage(engagement.id, 'report_reviewed', actor, 'Report reviewed internally.');
  }

  return report;
}

/**
 * Records the agreed consultation call date on a lead.
 *
 * Separate from `updateConsultationNextAction` because a booked call is a commitment
 * to the provider, whereas a next action is our own reminder. Conflating them meant a
 * cleared reminder silently wiped a booked appointment.
 */
export async function updateConsultationCallAt(
  consultationId: string,
  consultationAt: string | undefined,
  actor: string
): Promise<Consultation | undefined> {
  const lead = getConsultation(consultationId);
  if (!lead) return undefined;

  await transaction(async (run) => {
    await run('update consultation set consultation_at = $2 where id = $1', [
      consultationId,
      consultationAt ?? null,
    ]);
    await run(
      'insert into consultation_event(id, consultation_id, actor, action, detail) values ($1,$2,$3,$4,$5)',
      [
        newId('lev'),
        consultationId,
        actor,
        consultationAt ? 'Consultation booked' : 'Consultation date cleared',
        consultationAt
          ? `Call set for ${new Date(consultationAt).toLocaleString('en-GB')}.`
          : 'The booked consultation date was removed.',
      ]
    );
    if (lead.companyId) {
      await run('insert into activity_log(id, company_id, actor, type, detail) values ($1,$2,$3,$4,$5)', [
        newId('act'),
        lead.companyId,
        actor,
        'consultation_scheduled',
        consultationAt ? 'Consultation call booked.' : 'Consultation call date cleared.',
      ]);
    }
  });

  lead.consultationAt = consultationAt;
  return lead;
}

/**
 * Creates a consultation from the public website form.
 *
 * The stage always starts at `new_enquiry` and the caller cannot override it — a
 * public endpoint must never be able to inject a lead directly into a later stage.
 */
export async function createConsultationRequest(
  input: {
    organisationName: string;
    organisationType: Company['type'];
    staffCount: number;
    enquirerName: string;
    enquirerRole: string;
    email: string;
    phone: string;
    challenges: Consultation['challenges'];
    preferredContact: Consultation['preferredContact'];
    availability: string;
    notes: string;
    packageInterest: Consultation['packageInterest'];
  },
  owner = 'Unassigned'
): Promise<Consultation> {
  const id = newId('lead');

  await transaction(async (run) => {
    await run(
      `insert into consultation
         (id, organisation_name, organisation_type, staff_count, enquirer_name, enquirer_role,
          email, phone, challenges, preferred_contact, availability, notes, stage, owner,
          package_interest)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,'new_enquiry',$13,$14)`,
      [
        id,
        input.organisationName,
        input.organisationType,
        input.staffCount,
        input.enquirerName,
        input.enquirerRole,
        input.email,
        input.phone,
        input.challenges,
        input.preferredContact,
        input.availability,
        input.notes,
        owner,
        input.packageInterest,
      ]
    );
    await run(
      'insert into consultation_event(id, consultation_id, actor, action, detail) values ($1,$2,$3,$4,$5)',
      [newId('lev'), id, 'Website', 'Enquiry received', 'Consultation request submitted through the website form.']
    );
    await run('insert into activity_log(id, actor, type, detail) values ($1,$2,$3,$4)', [
      newId('act'),
      'Website',
      'lead_created',
      `New consultation request from ${input.organisationName}.`,
    ]);
  });

  return (await findConsultationById(id))!;
}

/** Duplicate guard for the public form: same organisation and same contact. */
export async function findDuplicateConsultation(
  organisationName: string,
  email: string
): Promise<Consultation | undefined> {
  const rows = await query(
    `select * from consultation
      where lower(organisation_name) = lower($1) and lower(email) = lower($2)
      order by submitted_at desc limit 1`,
    [organisationName, email]
  );
  return rows[0] ? toConsultation(rows[0]) : undefined;
}

async function findConsultationById(id: string): Promise<Consultation | undefined> {
  const rows = await query('select * from consultation where id = $1', [id]);
  return rows[0] ? toConsultation(rows[0]) : undefined;
}
