export type UserRole = 'admin' | 'manager' | 'analyst' | 'support_admin' | 'company_user';

export type CompanyStatus = 'active' | 'at_risk' | 'onboarding' | 'archived';

export type ConcernType =
  'burnout' | 'absence' | 'stress' | 'engagement' | 'conflict' | 'mental_health' | 'workload';

export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical';

export type ContactMethod = 'email' | 'phone' | 'sms';

export type EnquiryStatus =
  'new' | 'triaged' | 'in_progress' | 'waiting_on_manager' | 'resolved' | 'closed';

export type ReportStatus = 'queued' | 'processing' | 'ready' | 'error';

export type ActivityType =
  | 'company_created'
  | 'enquiry_created'
  | 'enquiry_status_changed'
  | 'enquiry_assigned'
  | 'note_added'
  | 'report_generated'
  | 'employee_added'
  | 'lead_created'
  | 'lead_stage_changed'
  | 'consultation_scheduled'
  | 'survey_sent'
  | 'survey_completed'
  | 'report_reviewed'
  | 'call_logged';

/**
 * The engagement workflow: one care provider's journey from first contact to
 * confirmed client, covering delivery as well as sales.
 *
 * Distinct from the wellbeing `EnquiryStatus` workflow and not to be merged with it:
 * an *engagement* is a care provider moving through onboarding, survey, analysis and
 * conversion. An *enquiry* is a wellbeing case raised about an individual member of
 * staff at a company that is already a client. Conflating them would put commercial
 * pipeline language in front of safeguarding-adjacent casework.
 */
export type EngagementStage =
  | 'new_enquiry'
  | 'company_registered'
  | 'survey_link_sent'
  | 'survey_in_progress'
  | 'survey_completed'
  | 'ai_analysis_running'
  | 'report_ready'
  | 'report_reviewed'
  | 'follow_up_completed'
  | 'proposal_sent'
  | 'confirmed_client'
  | 'closed_lost';

/**
 * The three phases the twelve stages group into.
 *
 * Twelve columns side by side is unreadable, and it also hides the thing a manager
 * actually needs to see: whether an account is stuck in setup, stuck waiting on
 * staff to respond, or stuck waiting on us to call them back.
 */
export type EngagementPhase = 'setup' | 'survey_analysis' | 'consultation';

/** Where a survey link has got to. Mirrors what can be observed, not assumed. */
export type SurveyLinkStatus =
  'created' | 'sent' | 'opened' | 'in_progress' | 'completed' | 'expired';

/** Whether an individual member of staff has responded. */
export type SurveyResponseStatus = 'not_started' | 'started' | 'completed';

/** The consultant call that explains the report to the provider. */
export type CallStatus = 'not_scheduled' | 'scheduled' | 'completed' | 'no_answer' | 'rescheduled';

export type CallOutcome =
  'proceeding' | 'considering' | 'needs_more_info' | 'not_proceeding' | 'no_decision_yet';

/** Which of the illustrative packages a lead is being quoted against. */
export type PackageInterest = 'assessment' | 'assessment_plan' | 'ongoing' | 'undecided';

export type Company = {
  id: string;
  name: string;
  type: 'care_home' | 'domiciliary' | 'supported_living' | 'nursing_home';
  status: CompanyStatus;
  priorityScore: number;
  accountOwner: string;
  primaryContact: {
    name: string;
    role: string;
    email: string;
    phone: string;
  };
  staffCount: number;
  joinedAt: string;
  tags: string[];
};

export type Employee = {
  id: string;
  companyId: string;
  name: string;
  role: string;
  department: string;
  manager: string;
  lastCheckIn: string;
  openEnquiries: number;
};

export type Enquiry = {
  id: string;
  companyId: string;
  employeeId: string;
  submittedAt: string;
  concernType: ConcernType;
  urgency: UrgencyLevel;
  preferredContact: ContactMethod;
  status: EnquiryStatus;
  assignee: string;
  summary: string;
  notes: string;
  aiSummary: string;
  riskScore: number;
};

export type EnquiryTimelineEvent = {
  id: string;
  enquiryId: string;
  at: string;
  actor: string;
  action: string;
  detail: string;
};

export type ClientReport = {
  id: string;
  companyId: string;
  periodLabel: string;
  createdAt: string;
  status: ReportStatus;
  headline: string;
  keyRisks: string[];
  recommendations: string[];
  burnoutRisk: number;
  absenceRisk: number;
  engagementScore: number;
  /** Per-theme breakdown from the analysis. */
  themes?: ReportTheme[];
  /** How many staff responses the findings are drawn from. */
  basedOnResponses?: number;
  /**
   * Consultant's own reading, written during internal review before the call.
   * Separate from the generated `headline` so it is always clear which is which.
   */
  consultantNotes?: string;
  /** Set once a consultant has reviewed it and it is safe to take to the provider. */
  reviewedBy?: string;
  reviewedAt?: string;
  /** What the consultant intends to recommend on the call. */
  followUpRecommendations?: string[];
};

export type CompanyNote = {
  id: string;
  companyId: string;
  createdAt: string;
  author: string;
  content: string;
};

export type ActivityLogItem = {
  id: string;
  companyId: string;
  at: string;
  actor: string;
  type: ActivityType;
  detail: string;
};

/**
 * A consultation request from the public website — the record the whole marketing
 * site exists to produce. Fields mirror `components/forms/ConsultationForm.tsx`
 * exactly, so wiring the form to a real endpoint later is a straight mapping.
 *
 * `companyId` is set only once a lead converts, which is what links the commercial
 * record to the delivery workspace.
 */
export type Consultation = {
  id: string;
  organisationName: string;
  organisationType: Company['type'];
  staffCount: number;
  /** Job title of the person enquiring, e.g. 'Registered Manager'. */
  enquirerName: string;
  enquirerRole: string;
  email: string;
  phone: string;
  /** Challenges ticked on the public form. */
  challenges: ConcernType[];
  preferredContact: ContactMethod;
  /** Free text from the form, e.g. 'Weekday mornings before 10am'. */
  availability: string;
  notes: string;
  stage: EngagementStage;
  /** The Ample Care consultant responsible for this account end to end. */
  owner: string;
  submittedAt: string;
  /** Scheduled consultation call, once booked. */
  consultationAt?: string;
  /** The next thing that must happen, and when — drives the overdue view. */
  nextActionAt?: string;
  nextAction?: string;
  packageInterest: PackageInterest;
  /** Set when the lead becomes a client, linking it to a company workspace. */
  companyId?: string;
  /** Populated on closed_lost so the team can learn from losses. */
  lostReason?: string;
};

/**
 * A staff wellbeing survey issued to one company.
 *
 * `responseCount` is stored rather than derived because in production the responses
 * themselves are confidential and aggregated — the admin area needs the count without
 * necessarily holding every individual answer.
 */
export type SurveyLink = {
  id: string;
  companyId: string;
  /** The URL shared with the registered manager to distribute to staff. */
  url: string;
  status: SurveyLinkStatus;
  createdAt: string;
  sentAt?: string;
  /** When the provider last shared or re-shared it with their team. */
  lastRemindedAt?: string;
  closesAt?: string;
  /** Headcount the survey was issued to — the denominator for participation. */
  invitedCount: number;
  responseCount: number;
  /** Who at Ample Care issued it. */
  issuedBy: string;
};

/**
 * Whether an individual member of staff has responded.
 *
 * Deliberately holds **no answers** — only whether someone responded and when. Staff
 * must be able to answer honestly, and an admin screen that could show "what did
 * Grace say about her manager" would destroy that. Findings reach the dashboard only
 * as aggregates on the report.
 */
export type SurveyResponse = {
  id: string;
  surveyId: string;
  companyId: string;
  employeeId: string;
  status: SurveyResponseStatus;
  startedAt?: string;
  completedAt?: string;
};

/**
 * The consultant call where the report is explained in plain language.
 *
 * This is the step the whole service turns on: a report nobody talks the provider
 * through is a PDF that gets filed and forgotten.
 */
export type ConsultantCall = {
  id: string;
  companyId: string;
  reportId?: string;
  /** The Ample Care person making the call. */
  consultant: string;
  status: CallStatus;
  scheduledFor?: string;
  completedAt?: string;
  outcome?: CallOutcome;
  /** What was discussed and agreed. Written up straight after the call. */
  notes?: string;
  /** What the provider agreed to do next. */
  agreedNextStep?: string;
};

/** One theme surfaced by the analysis, with its own score and evidence. */
export type ReportTheme = {
  concern: ConcernType;
  /** 0–100. Higher means more pressure reported against this theme. */
  score: number;
  /** Movement against the previous period, in points. Undefined on a first report. */
  changeFromPrevious?: number;
  /** Plain-language description of what staff reported. */
  summary: string;
};

/** A stage transition on an engagement, kept for auditability. */
export type ConsultationEvent = {
  id: string;
  consultationId: string;
  at: string;
  actor: string;
  action: string;
  detail: string;
};

/**
 * Notes on an enquiry, as append-only records rather than one editable text blob.
 *
 * Casework notes must not be silently overwritten — if a colleague's triage note can
 * be replaced by the next person to open the case, the audit trail is fiction.
 */
export type EnquiryNote = {
  id: string;
  enquiryId: string;
  createdAt: string;
  author: string;
  content: string;
};

/**
 * Content management foundation.
 *
 * The site's copy currently lives in typed modules under `content/`. This registry
 * describes those modules so the admin area can show what is editable, where it lives
 * and whether it is ready for a CMS — without pretending editing works yet.
 */
export type ContentModuleStatus = 'live_in_code' | 'planned' | 'needs_input';

export type ContentModule = {
  id: string;
  label: string;
  description: string;
  /** Source file today, so a developer can find it without searching. */
  source: string;
  status: ContentModuleStatus;
  /** Roughly how many editable records the module holds. */
  itemCount?: number;
  /** Why it is not editable yet, when it is not. */
  blocker?: string;
};
