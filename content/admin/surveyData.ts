/**
 * Sample survey and consultant-call records.
 *
 * Invented for demonstration, like the rest of `content/admin`. Note what is
 * deliberately absent: **no survey answers**. Response records hold only whether
 * someone responded and when.
 *
 * That is a design constraint, not an oversight. Care staff will not answer honestly
 * about their manager if an admin screen could attribute answers back to them, and
 * the privacy policy commits to aggregate reporting. Findings reach the dashboard
 * only through the aggregated report.
 */
import type { ConsultantCall, SurveyLink, SurveyResponse } from '@/lib/admin/types';

export const surveyLinks: SurveyLink[] = [
  {
    id: 'srv-harbour-oaks-q3',
    companyId: 'harbour-oaks',
    url: 'https://survey.amplecare.example/s/ho-q3-2026',
    status: 'completed',
    createdAt: '2026-07-01T09:00:00.000Z',
    sentAt: '2026-07-01T10:15:00.000Z',
    lastRemindedAt: '2026-07-10T09:00:00.000Z',
    closesAt: '2026-07-21T23:59:00.000Z',
    invitedCount: 148,
    responseCount: 119,
    issuedBy: 'Naomi Price',
  },
  {
    id: 'srv-meadow-bridge-q3',
    companyId: 'meadow-bridge',
    url: 'https://survey.amplecare.example/s/mb-q3-2026',
    status: 'in_progress',
    createdAt: '2026-07-28T08:30:00.000Z',
    sentAt: '2026-07-28T11:00:00.000Z',
    lastRemindedAt: '2026-08-06T09:30:00.000Z',
    closesAt: '2026-08-18T23:59:00.000Z',
    invitedCount: 96,
    responseCount: 31,
    issuedBy: 'Elliot Mensah',
  },
  {
    id: 'srv-cedar-view-q3',
    companyId: 'cedar-view',
    url: 'https://survey.amplecare.example/s/cv-q3-2026',
    status: 'sent',
    createdAt: '2026-08-08T14:00:00.000Z',
    sentAt: '2026-08-09T09:00:00.000Z',
    closesAt: '2026-08-30T23:59:00.000Z',
    invitedCount: 62,
    responseCount: 4,
    issuedBy: 'Naomi Price',
  },
  {
    id: 'srv-willow-ward-q3',
    companyId: 'willow-ward',
    url: 'https://survey.amplecare.example/s/ww-q3-2026',
    status: 'created',
    createdAt: '2026-08-11T16:20:00.000Z',
    invitedCount: 74,
    responseCount: 0,
    issuedBy: 'Elliot Mensah',
  },
];

/**
 * Per-employee participation for the sample employees.
 *
 * Only a handful of employees exist in the sample data, so these cover those records
 * rather than all 148 staff — the aggregate counts live on the SurveyLink.
 */
export const surveyResponses: SurveyResponse[] = [
  {
    id: 'sr-1',
    surveyId: 'srv-harbour-oaks-q3',
    companyId: 'harbour-oaks',
    employeeId: 'e-101',
    status: 'completed',
    startedAt: '2026-07-03T18:40:00.000Z',
    completedAt: '2026-07-03T18:52:00.000Z',
  },
  {
    id: 'sr-2',
    surveyId: 'srv-harbour-oaks-q3',
    companyId: 'harbour-oaks',
    employeeId: 'e-102',
    status: 'completed',
    startedAt: '2026-07-05T21:05:00.000Z',
    completedAt: '2026-07-05T21:19:00.000Z',
  },
  {
    id: 'sr-3',
    surveyId: 'srv-meadow-bridge-q3',
    companyId: 'meadow-bridge',
    employeeId: 'e-201',
    status: 'completed',
    startedAt: '2026-07-30T07:15:00.000Z',
    completedAt: '2026-07-30T07:28:00.000Z',
  },
  {
    id: 'sr-4',
    surveyId: 'srv-meadow-bridge-q3',
    companyId: 'meadow-bridge',
    employeeId: 'e-202',
    status: 'started',
    startedAt: '2026-08-04T20:11:00.000Z',
  },
  {
    id: 'sr-5',
    surveyId: 'srv-cedar-view-q3',
    companyId: 'cedar-view',
    employeeId: 'e-301',
    status: 'not_started',
  },
];

export const consultantCalls: ConsultantCall[] = [
  {
    id: 'call-1',
    companyId: 'harbour-oaks',
    reportId: 'rpt-aug-harbour-oaks',
    consultant: 'Naomi Price',
    status: 'completed',
    scheduledFor: '2026-08-05T11:00:00.000Z',
    completedAt: '2026-08-05T11:47:00.000Z',
    outcome: 'proceeding',
    notes:
      'Walked Leanne through the night-team findings. She recognised the picture immediately and had already noticed the medication-round fatigue. Agreed the two micro-break windows are realistic; the predictable handover roster needs her area manager to sign off.',
    agreedNextStep: 'Leanne to take the handover roster pilot to her area manager by 19 August.',
  },
  {
    id: 'call-2',
    companyId: 'meadow-bridge',
    consultant: 'Elliot Mensah',
    status: 'scheduled',
    scheduledFor: '2026-08-20T15:30:00.000Z',
  },
];
