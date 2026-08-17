/**
 * Sample dataset for the admin dashboard.
 *
 * Every company, person, figure and quote below is invented for demonstration. None
 * of it describes a real Ample Care client, and it must be deleted — not edited —
 * when a real backend is connected. See PLACEHOLDERS.md.
 */
import type {
  ActivityLogItem,
  ClientReport,
  Company,
  CompanyNote,
  Employee,
  Enquiry,
  EnquiryTimelineEvent,
} from '@/lib/admin/types';

export const companies: Company[] = [
  {
    id: 'harbour-oaks',
    name: 'Harbour Oaks Care Home',
    type: 'care_home',
    status: 'at_risk',
    priorityScore: 92,
    accountOwner: 'Naomi Price',
    primaryContact: {
      name: 'Leanne Cooper',
      role: 'Registered Manager',
      email: 'l.cooper@harbouroaks.co.uk',
      phone: '0333 577 2070',
    },
    staffCount: 148,
    joinedAt: '2026-02-14T09:00:00.000Z',
    tags: ['high absence', 'night shift pressure'],
  },
  {
    id: 'meadow-bridge',
    name: 'Meadow Bridge Domiciliary',
    type: 'domiciliary',
    status: 'active',
    priorityScore: 68,
    accountOwner: 'Zara Ahmed',
    primaryContact: {
      name: 'Oliver Payne',
      role: 'Operations Director',
      email: 'o.payne@meadowbridgecare.co.uk',
      phone: '0333 577 2070',
    },
    staffCount: 96,
    joinedAt: '2025-11-03T10:30:00.000Z',
    tags: ['engagement plan', 'stable retention'],
  },
  {
    id: 'cedar-view',
    name: 'Cedar View Supported Living',
    type: 'supported_living',
    status: 'onboarding',
    priorityScore: 54,
    accountOwner: 'Naomi Price',
    primaryContact: {
      name: 'Megan Fielding',
      role: 'People Lead',
      email: 'm.fielding@cedarviewsl.co.uk',
      phone: '0333 577 2070',
    },
    staffCount: 62,
    joinedAt: '2026-07-01T08:15:00.000Z',
    tags: ['new client', 'baseline survey'],
  },
  {
    id: 'willow-ward',
    name: 'Willow Ward Nursing Centre',
    type: 'nursing_home',
    status: 'archived',
    priorityScore: 0,
    accountOwner: 'Zara Ahmed',
    primaryContact: {
      name: 'Jules Raman',
      role: 'Service Manager',
      email: 'j.raman@willowward.co.uk',
      phone: '0333 577 2070',
    },
    staffCount: 81,
    joinedAt: '2024-06-12T11:00:00.000Z',
    tags: ['completed programme'],
  },
];

export const employees: Employee[] = [
  {
    id: 'e-101',
    companyId: 'harbour-oaks',
    name: 'Grace Martin',
    role: 'Senior Care Assistant',
    department: 'Residential Unit A',
    manager: 'Leanne Cooper',
    lastCheckIn: '2026-08-08T13:10:00.000Z',
    openEnquiries: 1,
  },
  {
    id: 'e-102',
    companyId: 'harbour-oaks',
    name: 'Imran Khalid',
    role: 'Care Assistant',
    department: 'Dementia Unit',
    manager: 'Sarah Moss',
    lastCheckIn: '2026-08-06T16:45:00.000Z',
    openEnquiries: 0,
  },
  {
    id: 'e-201',
    companyId: 'meadow-bridge',
    name: 'Beth Shaw',
    role: 'Field Care Worker',
    department: 'North Patch',
    manager: 'Oliver Payne',
    lastCheckIn: '2026-08-09T09:20:00.000Z',
    openEnquiries: 2,
  },
  {
    id: 'e-202',
    companyId: 'meadow-bridge',
    name: 'Nina Rowe',
    role: 'Coordinator',
    department: 'Scheduling',
    manager: 'Oliver Payne',
    lastCheckIn: '2026-08-07T11:35:00.000Z',
    openEnquiries: 0,
  },
  {
    id: 'e-301',
    companyId: 'cedar-view',
    name: 'Tom Armitage',
    role: 'Support Worker',
    department: 'Community Team',
    manager: 'Megan Fielding',
    lastCheckIn: '2026-08-10T08:50:00.000Z',
    openEnquiries: 1,
  },
];

export const enquiries: Enquiry[] = [
  {
    id: 'enq-9001',
    companyId: 'harbour-oaks',
    employeeId: 'e-101',
    submittedAt: '2026-08-09T07:45:00.000Z',
    concernType: 'burnout',
    urgency: 'high',
    preferredContact: 'phone',
    status: 'in_progress',
    assignee: 'Naomi Price',
    summary: 'Exhaustion after repeated double shifts and short notice cover.',
    notes:
      'Employee reports poor sleep and reduced confidence on medication rounds. Wants manager aware but asks for supportive framing.',
    aiSummary:
      'Pattern suggests sustained workload pressure with immediate fatigue risk. Recommend rota review in 72 hours, wellbeing check-in this week, and micro-break protocol reinforcement.',
    riskScore: 88,
  },
  {
    id: 'enq-9002',
    companyId: 'harbour-oaks',
    employeeId: 'e-102',
    submittedAt: '2026-08-03T12:05:00.000Z',
    concernType: 'stress',
    urgency: 'medium',
    preferredContact: 'email',
    status: 'resolved',
    assignee: 'Support Desk',
    summary: 'Stress linked to handover clarity across agency and permanent staff.',
    notes:
      'Provided handover template and manager facilitated debrief. Employee reported improvement after one week.',
    aiSummary:
      'Local process issue rather than individual capability. Reinforce standard handover checklist in late shifts.',
    riskScore: 42,
  },
  {
    id: 'enq-9003',
    companyId: 'meadow-bridge',
    employeeId: 'e-201',
    submittedAt: '2026-08-10T18:20:00.000Z',
    concernType: 'absence',
    urgency: 'critical',
    preferredContact: 'sms',
    status: 'new',
    assignee: 'Unassigned',
    summary: 'Repeated sickness in one patch causing unsafe travel handovers.',
    notes:
      'Reporter indicates missed meal breaks and delayed visits. Requests urgent management response before next rota publish.',
    aiSummary:
      'Clustered absence risk in North Patch. Trigger urgent triage, review coverage matrix, and issue interim wellbeing support plan.',
    riskScore: 95,
  },
  {
    id: 'enq-9004',
    companyId: 'meadow-bridge',
    employeeId: 'e-201',
    submittedAt: '2026-08-01T10:45:00.000Z',
    concernType: 'engagement',
    urgency: 'medium',
    preferredContact: 'email',
    status: 'triaged',
    assignee: 'Zara Ahmed',
    summary: 'Team feels updates are one-way and feedback loop is weak.',
    notes: 'Plan monthly listening huddle and anonymised pulse check.',
    aiSummary:
      'Engagement friction appears communication-led. Add structured feedback cadence and publish action tracker to team.',
    riskScore: 51,
  },
  {
    id: 'enq-9005',
    companyId: 'cedar-view',
    employeeId: 'e-301',
    submittedAt: '2026-08-07T15:10:00.000Z',
    concernType: 'workload',
    urgency: 'high',
    preferredContact: 'phone',
    status: 'waiting_on_manager',
    assignee: 'Naomi Price',
    summary: 'High travel burden and late documentation after community visits.',
    notes: 'Pending manager sign-off for route redesign pilot.',
    aiSummary:
      'Workload imbalance likely route-design related. Prioritise caseload balancing and admin block protection.',
    riskScore: 76,
  },
];

export const enquiryTimeline: EnquiryTimelineEvent[] = [
  {
    id: 'evt-1',
    enquiryId: 'enq-9003',
    at: '2026-08-10T18:20:00.000Z',
    actor: 'Beth Shaw',
    action: 'Submitted enquiry',
    detail: 'Reported repeated sickness pressure and travel handover risk.',
  },
  {
    id: 'evt-2',
    enquiryId: 'enq-9003',
    at: '2026-08-10T18:24:00.000Z',
    actor: 'System',
    action: 'Urgency auto-flag',
    detail: 'Marked as critical based on concern type + language signals.',
  },
  {
    id: 'evt-3',
    enquiryId: 'enq-9001',
    at: '2026-08-09T08:05:00.000Z',
    actor: 'System',
    action: 'AI summary generated',
    detail: 'Produced burnout risk summary and three suggested actions.',
  },
  {
    id: 'evt-4',
    enquiryId: 'enq-9001',
    at: '2026-08-09T09:00:00.000Z',
    actor: 'Naomi Price',
    action: 'Status changed',
    detail: 'Moved from new to in progress.',
  },
];

export const reports: ClientReport[] = [
  {
    id: 'rpt-aug-harbour-oaks',
    companyId: 'harbour-oaks',
    periodLabel: 'July 2026',
    createdAt: '2026-08-02T08:45:00.000Z',
    status: 'ready',
    headline: 'Burnout pressure has eased slightly but remains elevated in night teams.',
    keyRisks: ['fatigue in medication rounds', 'unscheduled shift extensions'],
    recommendations: [
      'Protect two micro-break windows per long shift.',
      'Pilot predictable late-shift handover roster for four weeks.',
      'Manager wellbeing check-ins every 14 days.',
    ],
    burnoutRisk: 72,
    absenceRisk: 61,
    engagementScore: 58,
    basedOnResponses: 119,
    themes: [
      {
        concern: 'burnout',
        score: 72,
        changeFromPrevious: -4,
        summary:
          'Night staff report finishing shifts without a full break more often than day staff. Improving, but still the highest-scoring theme.',
      },
      {
        concern: 'absence',
        score: 61,
        changeFromPrevious: 3,
        summary:
          'Short-notice absence concentrated on weekend lates, with the same small group covering repeatedly.',
      },
      {
        concern: 'workload',
        score: 58,
        changeFromPrevious: -2,
        summary: 'Medication rounds are the most frequently named pressure point.',
      },
      {
        concern: 'engagement',
        score: 42,
        changeFromPrevious: -9,
        summary:
          'Staff who joined in the last year feel notably more positive than those with five or more years of service.',
      },
    ],
    consultantNotes:
      'Leanne already suspects the night-team picture, so lead with it rather than building up to it. The engagement gap by length of service is the finding she will not expect — handle it carefully, it reads as a criticism of long-serving staff if framed badly.',
    reviewedBy: 'Naomi Price',
    reviewedAt: '2026-08-04T16:20:00.000Z',
    followUpRecommendations: [
      'Two protected micro-break windows per long shift, starting with nights.',
      'Four-week predictable late-shift handover pilot on one unit only.',
      'Re-measure in October to test whether the engagement gap narrows.',
    ],
  },
  {
    id: 'rpt-aug-meadow-bridge',
    companyId: 'meadow-bridge',
    periodLabel: 'July 2026',
    createdAt: '2026-08-03T09:20:00.000Z',
    status: 'processing',
    headline: 'Absence variability rising in North Patch and impacting continuity.',
    keyRisks: ['missed meal breaks', 'late travel handovers'],
    recommendations: ['Enable temporary relief pool for North Patch.'],
    burnoutRisk: 67,
    absenceRisk: 79,
    engagementScore: 64,
  },
  {
    id: 'rpt-aug-cedar-view',
    companyId: 'cedar-view',
    periodLabel: 'July 2026',
    createdAt: '2026-08-05T11:40:00.000Z',
    status: 'queued',
    headline: 'Onboarding baseline under review.',
    keyRisks: ['insufficient trend window'],
    recommendations: ['Complete baseline pulse survey this month.'],
    burnoutRisk: 49,
    absenceRisk: 43,
    engagementScore: 66,
  },
];

export const companyNotes: CompanyNote[] = [
  {
    id: 'note-1',
    companyId: 'harbour-oaks',
    createdAt: '2026-08-08T10:00:00.000Z',
    author: 'Naomi Price',
    content: 'Director open to trialling resilience huddles for team leaders.',
  },
  {
    id: 'note-2',
    companyId: 'meadow-bridge',
    createdAt: '2026-08-09T15:15:00.000Z',
    author: 'Zara Ahmed',
    content: 'Needs clearer escalation pathway for urgent patch shortages.',
  },
];

export const activityLog: ActivityLogItem[] = [
  {
    id: 'act-1',
    companyId: 'harbour-oaks',
    at: '2026-08-09T09:00:00.000Z',
    actor: 'Naomi Price',
    type: 'enquiry_status_changed',
    detail: 'enq-9001 moved to in progress.',
  },
  {
    id: 'act-2',
    companyId: 'meadow-bridge',
    at: '2026-08-10T18:24:00.000Z',
    actor: 'System',
    type: 'enquiry_created',
    detail: 'enq-9003 created and auto-flagged critical.',
  },
  {
    id: 'act-3',
    companyId: 'cedar-view',
    at: '2026-08-07T16:10:00.000Z',
    actor: 'Naomi Price',
    type: 'note_added',
    detail: 'Added manager follow-up note on route redesign.',
  },
  {
    id: 'act-4',
    companyId: 'harbour-oaks',
    at: '2026-08-02T08:45:00.000Z',
    actor: 'System',
    type: 'report_generated',
    detail: 'July report marked ready.',
  },
];
