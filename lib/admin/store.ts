import {
  activityLog as seedActivity,
  companies as seedCompanies,
  companyNotes as seedCompanyNotes,
  employees as seedEmployees,
  enquiries as seedEnquiries,
  enquiryTimeline as seedTimeline,
  reports as seedReports,
} from '@/content/admin/mockData';
import {
  consultationEvents as seedConsultationEvents,
  consultations as seedConsultations,
  enquiryNotes as seedEnquiryNotes,
} from '@/content/admin/pipelineData';
import {
  consultantCalls as seedCalls,
  surveyLinks as seedSurveyLinks,
  surveyResponses as seedSurveyResponses,
} from '@/content/admin/surveyData';
import type {
  ActivityLogItem,
  ClientReport,
  Company,
  CompanyNote,
  Consultation,
  ConsultationEvent,
  Employee,
  Enquiry,
  EnquiryNote,
  EnquiryStatus,
  EnquiryTimelineEvent,
  EngagementStage,
  CallOutcome,
  CallStatus,
  ConsultantCall,
  SurveyLink,
  SurveyResponse,
} from '@/lib/admin/types';

/**
 * The single data-access boundary for the admin area.
 *
 * Everything the dashboard reads or writes goes through this module, and no page
 * imports the sample data directly. That is the whole point: replacing the seed
 * arrays below with SQL queries is a change to this one file, not to twenty pages.
 *
 * ## This is in-memory, and deliberately so
 *
 * Writes mutate arrays held on `globalThis`. That means:
 *
 *   - **Data resets when the server restarts.** Nothing is durable.
 *   - **It is not safe across multiple instances.** Two serverless workers would each
 *     hold their own divergent copy.
 *
 * That is acceptable for an MVP running as one Node process with sample data, and it
 * lets the workflow be exercised for real rather than mocked with dead controls. It
 * is *not* acceptable once real staff wellbeing data exists. See PLACEHOLDERS.md.
 *
 * ## Why globalThis
 *
 * Next's dev server re-evaluates modules on hot reload, which would reset plain
 * module-level arrays on every edit and make the workflow look broken. Pinning state
 * to globalThis survives that.
 */
interface AdminStore {
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

const globalRef = globalThis as typeof globalThis & { __ampleAdminStore?: AdminStore };

function createStore(): AdminStore {
  // Structured copies, so a mutation never writes back into the seed modules.
  return {
    companies: seedCompanies.map((item) => ({ ...item })),
    employees: seedEmployees.map((item) => ({ ...item })),
    enquiries: seedEnquiries.map((item) => ({ ...item })),
    enquiryTimeline: seedTimeline.map((item) => ({ ...item })),
    enquiryNotes: seedEnquiryNotes.map((item) => ({ ...item })),
    reports: seedReports.map((item) => ({ ...item })),
    companyNotes: seedCompanyNotes.map((item) => ({ ...item })),
    activity: seedActivity.map((item) => ({ ...item })),
    consultations: seedConsultations.map((item) => ({ ...item })),
    consultationEvents: seedConsultationEvents.map((item) => ({ ...item })),
    surveyLinks: seedSurveyLinks.map((item) => ({ ...item })),
    surveyResponses: seedSurveyResponses.map((item) => ({ ...item })),
    calls: seedCalls.map((item) => ({ ...item })),
  };
}

function store(): AdminStore {
  globalRef.__ampleAdminStore ??= createStore();
  return globalRef.__ampleAdminStore;
}

function id(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

/* --------------------------------------------------------------------------- *
 * Reads. All return copies so callers cannot mutate store state by accident.
 * --------------------------------------------------------------------------- */

export const listCompanies = (): Company[] => [...store().companies];
export const listEmployees = (): Employee[] => [...store().employees];
export const listEnquiries = (): Enquiry[] => [...store().enquiries];
export const listReports = (): ClientReport[] => [...store().reports];
export const listCompanyNotes = (): CompanyNote[] => [...store().companyNotes];
export const listActivity = (): ActivityLogItem[] => [...store().activity];
export const listConsultations = (): Consultation[] => [...store().consultations];
export const listSurveyLinks = (): SurveyLink[] => [...store().surveyLinks];
export const listCalls = (): ConsultantCall[] => [...store().calls];

export const getSurveyForCompany = (companyId: string): SurveyLink | undefined =>
  store()
    .surveyLinks.filter((item) => item.companyId === companyId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))[0];

export const getSurveyResponses = (surveyId: string): SurveyResponse[] =>
  store().surveyResponses.filter((item) => item.surveyId === surveyId);

export const getCallForCompany = (companyId: string): ConsultantCall | undefined =>
  store()
    .calls.filter((item) => item.companyId === companyId)
    .sort((a, b) => (b.scheduledFor ?? '').localeCompare(a.scheduledFor ?? ''))[0];

export const getEngagementForCompany = (companyId: string): Consultation | undefined =>
  store().consultations.find((item) => item.companyId === companyId);

export const getCompany = (companyId: string): Company | undefined =>
  store().companies.find((item) => item.id === companyId);

export const getEnquiry = (enquiryId: string): Enquiry | undefined =>
  store().enquiries.find((item) => item.id === enquiryId);

export const getReport = (reportId: string): ClientReport | undefined =>
  store().reports.find((item) => item.id === reportId);

export const getConsultation = (consultationId: string): Consultation | undefined =>
  store().consultations.find((item) => item.id === consultationId);

export const getEnquiryTimeline = (enquiryId: string): EnquiryTimelineEvent[] =>
  store()
    .enquiryTimeline.filter((item) => item.enquiryId === enquiryId)
    .sort((a, b) => b.at.localeCompare(a.at));

export const getEnquiryNotes = (enquiryId: string): EnquiryNote[] =>
  store()
    .enquiryNotes.filter((item) => item.enquiryId === enquiryId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

export const getConsultationEvents = (consultationId: string): ConsultationEvent[] =>
  store()
    .consultationEvents.filter((item) => item.consultationId === consultationId)
    .sort((a, b) => b.at.localeCompare(a.at));

/* --------------------------------------------------------------------------- *
 * Writes. Every one records an audit trail — that is not optional here.
 * --------------------------------------------------------------------------- */

function recordActivity(entry: Omit<ActivityLogItem, 'id' | 'at'>): void {
  store().activity.unshift({ ...entry, id: id('act'), at: new Date().toISOString() });
}

function recordEnquiryEvent(
  enquiryId: string,
  actor: string,
  action: string,
  detail: string
): void {
  store().enquiryTimeline.unshift({
    id: id('tl'),
    enquiryId,
    at: new Date().toISOString(),
    actor,
    action,
    detail,
  });
}

export function updateEnquiryStatus(
  enquiryId: string,
  status: EnquiryStatus,
  actor: string
): Enquiry | undefined {
  const enquiry = store().enquiries.find((item) => item.id === enquiryId);
  if (!enquiry) return undefined;

  const previous = enquiry.status;
  if (previous === status) return enquiry;

  enquiry.status = status;

  recordEnquiryEvent(
    enquiryId,
    actor,
    'Status changed',
    `Moved from ${label(previous)} to ${label(status)}.`
  );
  recordActivity({
    companyId: enquiry.companyId,
    actor,
    type: 'enquiry_status_changed',
    detail: `${enquiryId} moved to ${label(status)}.`,
  });

  return enquiry;
}

export function assignEnquiry(
  enquiryId: string,
  assignee: string,
  actor: string
): Enquiry | undefined {
  const enquiry = store().enquiries.find((item) => item.id === enquiryId);
  if (!enquiry) return undefined;

  const previous = enquiry.assignee;
  if (previous === assignee) return enquiry;

  enquiry.assignee = assignee;

  recordEnquiryEvent(
    enquiryId,
    actor,
    'Case reassigned',
    `Reassigned from ${previous} to ${assignee}.`
  );
  recordActivity({
    companyId: enquiry.companyId,
    actor,
    type: 'enquiry_assigned',
    detail: `${enquiryId} assigned to ${assignee}.`,
  });

  return enquiry;
}

export function addEnquiryNote(
  enquiryId: string,
  content: string,
  author: string
): EnquiryNote | undefined {
  const enquiry = store().enquiries.find((item) => item.id === enquiryId);
  if (!enquiry) return undefined;

  const note: EnquiryNote = {
    id: id('en'),
    enquiryId,
    createdAt: new Date().toISOString(),
    author,
    content,
  };

  // Append-only: notes are never edited in place, so the trail stays truthful.
  store().enquiryNotes.unshift(note);
  recordActivity({
    companyId: enquiry.companyId,
    actor: author,
    type: 'note_added',
    detail: `Note added to ${enquiryId}.`,
  });

  return note;
}

export function addCompanyNote(
  companyId: string,
  content: string,
  author: string
): CompanyNote | undefined {
  if (!getCompany(companyId)) return undefined;

  const note: CompanyNote = {
    id: id('cn'),
    companyId,
    createdAt: new Date().toISOString(),
    author,
    content,
  };

  store().companyNotes.unshift(note);
  recordActivity({ companyId, actor: author, type: 'note_added', detail: 'Account note added.' });

  return note;
}

export function updateConsultationStage(
  consultationId: string,
  stage: EngagementStage,
  actor: string,
  detail?: string
): Consultation | undefined {
  const lead = store().consultations.find((item) => item.id === consultationId);
  if (!lead) return undefined;

  const previous = lead.stage;
  if (previous === stage) return lead;

  lead.stage = stage;

  store().consultationEvents.unshift({
    id: id('lev'),
    consultationId,
    at: new Date().toISOString(),
    actor,
    action: `Moved to ${label(stage)}`,
    detail: detail?.trim() || `Stage changed from ${label(previous)}.`,
  });

  // Only leads that have converted have a company workspace to log against.
  if (lead.companyId) {
    recordActivity({
      companyId: lead.companyId,
      actor,
      type: 'lead_stage_changed',
      detail: `${lead.organisationName} moved to ${label(stage)}.`,
    });
  }

  return lead;
}

export function updateConsultationNextAction(
  consultationId: string,
  nextAction: string,
  nextActionAt: string | undefined,
  actor: string
): Consultation | undefined {
  const lead = store().consultations.find((item) => item.id === consultationId);
  if (!lead) return undefined;

  lead.nextAction = nextAction || undefined;
  lead.nextActionAt = nextActionAt || undefined;

  store().consultationEvents.unshift({
    id: id('lev'),
    consultationId,
    at: new Date().toISOString(),
    actor,
    action: 'Next action updated',
    detail: nextAction ? `Next action: ${nextAction}` : 'Next action cleared.',
  });

  return lead;
}

export function updateConsultationCallAt(
  consultationId: string,
  consultationAt: string | undefined,
  actor: string
): Consultation | undefined {
  const lead = store().consultations.find((item) => item.id === consultationId);
  if (!lead) return undefined;

  lead.consultationAt = consultationAt;

  store().consultationEvents.unshift({
    id: id('lev'),
    consultationId,
    at: new Date().toISOString(),
    actor,
    action: consultationAt ? 'Consultation call booked' : 'Consultation call cleared',
    detail: consultationAt
      ? `Call scheduled for ${new Date(consultationAt).toLocaleString('en-GB')}.`
      : 'Consultation call date removed.',
  });

  return lead;
}

export function createConsultationRequest(
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
  actor: string
): Consultation {
  const consultation: Consultation = {
    id: id('lead'),
    organisationName: input.organisationName,
    organisationType: input.organisationType,
    staffCount: input.staffCount,
    enquirerName: input.enquirerName,
    enquirerRole: input.enquirerRole,
    email: input.email,
    phone: input.phone,
    challenges: input.challenges,
    preferredContact: input.preferredContact,
    availability: input.availability,
    notes: input.notes,
    stage: 'new_enquiry',
    owner: input.staffCount >= 100 ? 'Elliot Mensah' : 'Naomi Price',
    submittedAt: new Date().toISOString(),
    nextActionAt: new Date(Date.now() + 86_400_000).toISOString(),
    nextAction: 'Call to book the free consultation',
    packageInterest: input.packageInterest,
  };

  store().consultations.unshift(consultation);
  store().consultationEvents.unshift({
    id: id('lev'),
    consultationId: consultation.id,
    at: consultation.submittedAt,
    actor,
    action: 'Enquiry received',
    detail: 'Public consultation form submitted on the website.',
  });

  recordActivity({
    companyId: consultation.companyId ?? 'pipeline',
    actor,
    type: 'lead_created',
    detail: `${consultation.organisationName} enquiry created from the website.`,
  });

  return consultation;
}

/** Shared label helper — kept here so audit strings read the same everywhere. */
function label(value: string): string {
  return value
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

/* --------------------------------------------------------------------------- *
 * Survey and consultant-call workflow.
 * --------------------------------------------------------------------------- */

/**
 * Records that the survey link has gone to the provider.
 *
 * "Sent" here means Ample Care handed the link over — the provider then distributes
 * it to staff. We cannot observe that second step, so the wording throughout the UI
 * says "sent to the provider", never "sent to staff".
 */
export function markSurveySent(companyId: string, actor: string): SurveyLink | undefined {
  const survey = store().surveyLinks.find((item) => item.companyId === companyId);
  if (!survey) return undefined;

  const now = new Date().toISOString();
  if (survey.status === 'created') {
    survey.status = 'sent';
    survey.sentAt = now;
  } else {
    // Already out: this is a reminder, which is a different (and logged) action.
    survey.lastRemindedAt = now;
  }

  recordActivity({
    companyId,
    actor,
    type: 'survey_sent',
    detail:
      survey.sentAt === now
        ? 'Survey link sent to the provider.'
        : 'Reminder sent to the provider.',
  });

  return survey;
}

export function recordConsultantCall(
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
): ConsultantCall | undefined {
  if (!getCompany(companyId)) return undefined;

  const existing = store().calls.find((item) => item.companyId === companyId);
  const now = new Date().toISOString();

  const call: ConsultantCall = existing ?? {
    id: id('call'),
    companyId,
    consultant: input.consultant,
    status: input.status,
  };

  call.consultant = input.consultant;
  call.status = input.status;
  call.outcome = input.outcome;
  call.scheduledFor = input.scheduledFor ?? call.scheduledFor;
  call.notes = input.notes?.trim() || call.notes;
  call.agreedNextStep = input.agreedNextStep?.trim() || call.agreedNextStep;
  if (input.status === 'completed') call.completedAt = now;

  if (!existing) store().calls.unshift(call);

  recordActivity({
    companyId,
    actor,
    type: 'call_logged',
    detail:
      input.status === 'completed'
        ? `Follow-up call completed by ${input.consultant}.`
        : `Follow-up call marked ${label(input.status)}.`,
  });

  // A completed call is what moves the engagement on — doing it here means the
  // stage can never silently disagree with the call record.
  if (input.status === 'completed') {
    const engagement = getEngagementForCompany(companyId);
    if (engagement && engagement.stage === 'report_reviewed') {
      updateConsultationStage(
        engagement.id,
        'follow_up_completed',
        actor,
        'Follow-up call completed.'
      );
    }
  }

  return call;
}

/** Marks a report as reviewed by a consultant and saves their reading of it. */
export function reviewReport(
  reportId: string,
  consultantNotes: string,
  actor: string
): ClientReport | undefined {
  const report = store().reports.find((item) => item.id === reportId);
  if (!report) return undefined;

  report.consultantNotes = consultantNotes.trim() || report.consultantNotes;
  report.reviewedBy = actor;
  report.reviewedAt = new Date().toISOString();

  recordActivity({
    companyId: report.companyId,
    actor,
    type: 'report_reviewed',
    detail: `${report.periodLabel} report reviewed and cleared for the client call.`,
  });

  const engagement = getEngagementForCompany(report.companyId);
  if (engagement && engagement.stage === 'report_ready') {
    updateConsultationStage(engagement.id, 'report_reviewed', actor, 'Report reviewed internally.');
  }

  return report;
}
