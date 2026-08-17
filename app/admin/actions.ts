'use server';

import { revalidatePath } from 'next/cache';
import { currentActorName } from '@/lib/auth/currentUser';
import {
  addCompanyNote,
  addEnquiryNote,
  assignEnquiry,
  markSurveySent,
  recordConsultantCall,
  reviewReport,
  updateConsultationNextAction,
  updateConsultationCallAt,
  updateConsultationStage,
  updateEnquiryStatus,
} from '@/lib/admin/store';
import { statusOptions, engagementStages } from '@/lib/admin/insights';
import type {
  CallOutcome,
  CallStatus,
  EnquiryStatus,
  EngagementStage,
} from '@/lib/admin/types';

/**
 * Workflow mutations for the admin area.
 *
 * Every action re-validates its own input rather than trusting the form, because a
 * server action is a public HTTP endpoint — the `<select>` in the UI constrains
 * nothing. Access itself is already guaranteed by `middleware.ts`.
 *
 * These write to the in-memory store, so changes are lost on restart. That limit is
 * documented in `lib/admin/store.ts` and PLACEHOLDERS.md.
 */

export interface ActionState {
  ok?: string;
  error?: string;
}

function isEnquiryStatus(value: string): value is EnquiryStatus {
  return (statusOptions() as string[]).includes(value);
}

function isLeadStage(value: string): value is EngagementStage {
  return (engagementStages() as string[]).includes(value);
}

export async function changeEnquiryStatus(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const enquiryId = String(formData.get('enquiryId') ?? '');
  const status = String(formData.get('status') ?? '');

  if (!enquiryId) return { error: 'Missing enquiry reference.' };
  if (!isEnquiryStatus(status)) return { error: 'That is not a valid status.' };

  const updated = updateEnquiryStatus(enquiryId, status, await currentActorName());
  if (!updated) return { error: 'That enquiry no longer exists.' };

  revalidatePath(`/admin/enquiries/${enquiryId}`);
  revalidatePath('/admin/enquiries');
  revalidatePath('/admin');

  return { ok: 'Status updated.' };
}

export async function reassignEnquiry(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const enquiryId = String(formData.get('enquiryId') ?? '');
  const assignee = String(formData.get('assignee') ?? '').trim();

  if (!enquiryId) return { error: 'Missing enquiry reference.' };
  if (!assignee) return { error: 'Choose who should own this case.' };
  if (assignee.length > 80) return { error: 'That name is too long.' };

  const updated = assignEnquiry(enquiryId, assignee, await currentActorName());
  if (!updated) return { error: 'That enquiry no longer exists.' };

  revalidatePath(`/admin/enquiries/${enquiryId}`);
  revalidatePath('/admin/enquiries');

  return { ok: `Case assigned to ${assignee}.` };
}

export async function createEnquiryNote(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const enquiryId = String(formData.get('enquiryId') ?? '');
  const content = String(formData.get('content') ?? '').trim();

  if (!enquiryId) return { error: 'Missing enquiry reference.' };
  if (!content) return { error: 'Write a note before saving.' };
  if (content.length > 4000) return { error: 'Notes are limited to 4000 characters.' };

  const note = addEnquiryNote(enquiryId, content, await currentActorName());
  if (!note) return { error: 'That enquiry no longer exists.' };

  revalidatePath(`/admin/enquiries/${enquiryId}`);

  return { ok: 'Note added.' };
}

export async function createCompanyNote(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const companyId = String(formData.get('companyId') ?? '');
  const content = String(formData.get('content') ?? '').trim();

  if (!companyId) return { error: 'Missing company reference.' };
  if (!content) return { error: 'Write a note before saving.' };
  if (content.length > 4000) return { error: 'Notes are limited to 4000 characters.' };

  const note = addCompanyNote(companyId, content, await currentActorName());
  if (!note) return { error: 'That company no longer exists.' };

  revalidatePath(`/admin/companies/${companyId}`);

  return { ok: 'Note added.' };
}

export async function changeLeadStage(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const consultationId = String(formData.get('consultationId') ?? '');
  const stage = String(formData.get('stage') ?? '');
  const detail = String(formData.get('detail') ?? '').trim();

  if (!consultationId) return { error: 'Missing lead reference.' };
  if (!isLeadStage(stage)) return { error: 'That is not a valid pipeline stage.' };
  if (detail.length > 2000) return { error: 'That note is too long.' };

  const updated = updateConsultationStage(consultationId, stage, await currentActorName(), detail);
  if (!updated) return { error: 'That lead no longer exists.' };

  revalidatePath(`/admin/pipeline/${consultationId}`);
  revalidatePath('/admin/pipeline');
  revalidatePath('/admin');

  return { ok: 'Pipeline stage updated.' };
}

export async function setLeadNextAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const consultationId = String(formData.get('consultationId') ?? '');
  const nextAction = String(formData.get('nextAction') ?? '').trim();
  const rawDate = String(formData.get('nextActionAt') ?? '').trim();

  if (!consultationId) return { error: 'Missing lead reference.' };
  if (nextAction.length > 200) return { error: 'Keep the next action under 200 characters.' };

  let nextActionAt: string | undefined;
  if (rawDate) {
    const parsed = new Date(rawDate);
    if (Number.isNaN(parsed.getTime())) return { error: 'That date could not be read.' };
    nextActionAt = parsed.toISOString();
  }

  const updated = updateConsultationNextAction(
    consultationId,
    nextAction,
    nextActionAt,
    await currentActorName()
  );
  if (!updated) return { error: 'That lead no longer exists.' };

  revalidatePath(`/admin/pipeline/${consultationId}`);
  revalidatePath('/admin/pipeline');

  return { ok: 'Next action saved.' };
}

export async function setLeadConsultationCall(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const consultationId = String(formData.get('consultationId') ?? '');
  const rawDate = String(formData.get('consultationAt') ?? '').trim();

  if (!consultationId) return { error: 'Missing lead reference.' };

  let consultationAt: string | undefined;
  if (rawDate) {
    const parsed = new Date(rawDate);
    if (Number.isNaN(parsed.getTime())) return { error: 'That consultation date could not be read.' };
    consultationAt = parsed.toISOString();
  }

  const updated = updateConsultationCallAt(
    consultationId,
    consultationAt,
    await currentActorName()
  );
  if (!updated) return { error: 'That lead no longer exists.' };

  revalidatePath(`/admin/pipeline/${consultationId}`);
  revalidatePath('/admin/pipeline');

  return { ok: consultationAt ? 'Consultation call date saved.' : 'Consultation call date cleared.' };
}

export async function markLeadBookedToday(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const consultationId = String(formData.get('consultationId') ?? '');
  if (!consultationId) return { error: 'Missing lead reference.' };

  const updated = updateConsultationCallAt(
    consultationId,
    new Date().toISOString(),
    await currentActorName()
  );
  if (!updated) return { error: 'That lead no longer exists.' };

  revalidatePath(`/admin/pipeline/${consultationId}`);
  revalidatePath('/admin/pipeline');

  return { ok: 'Consultation call marked as booked now.' };
}

/* --------------------------------------------------------------------------- *
 * Survey, report review and consultant call.
 * --------------------------------------------------------------------------- */

const CALL_STATUSES: CallStatus[] = [
  'not_scheduled',
  'scheduled',
  'completed',
  'no_answer',
  'rescheduled',
];

const CALL_OUTCOMES: CallOutcome[] = [
  'proceeding',
  'considering',
  'needs_more_info',
  'not_proceeding',
  'no_decision_yet',
];

export async function sendSurveyLink(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const companyId = String(formData.get('companyId') ?? '');
  if (!companyId) return { error: 'Missing company reference.' };

  const survey = markSurveySent(companyId, await currentActorName());
  if (!survey) return { error: 'No survey exists for this company yet.' };

  revalidatePath(`/admin/companies/${companyId}`);
  revalidatePath('/admin');

  return {
    ok:
      survey.status === 'created'
        ? 'Survey link recorded as sent.'
        : 'Reminder recorded against the survey.',
  };
}

export async function logConsultantCall(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const companyId = String(formData.get('companyId') ?? '');
  const consultant = String(formData.get('consultant') ?? '').trim();
  const status = String(formData.get('status') ?? '');
  const outcomeRaw = String(formData.get('outcome') ?? '').trim();
  const notes = String(formData.get('notes') ?? '').trim();
  const agreedNextStep = String(formData.get('agreedNextStep') ?? '').trim();
  const scheduledRaw = String(formData.get('scheduledFor') ?? '').trim();

  if (!companyId) return { error: 'Missing company reference.' };
  if (!consultant) return { error: 'Name the consultant making the call.' };
  if (!(CALL_STATUSES as string[]).includes(status)) return { error: 'That is not a valid call status.' };
  if (outcomeRaw && !(CALL_OUTCOMES as string[]).includes(outcomeRaw)) {
    return { error: 'That is not a valid call outcome.' };
  }
  if (notes.length > 4000) return { error: 'Call notes are limited to 4000 characters.' };

  // A completed call without a record of what was said is how the detail gets lost
  // between the call and the proposal.
  if (status === 'completed' && !notes) {
    return { error: 'Add a note describing what was discussed before marking the call complete.' };
  }

  let scheduledFor: string | undefined;
  if (scheduledRaw) {
    const parsed = new Date(scheduledRaw);
    if (Number.isNaN(parsed.getTime())) return { error: 'That date and time could not be read.' };
    scheduledFor = parsed.toISOString();
  }

  const call = recordConsultantCall(
    companyId,
    {
      consultant,
      status: status as CallStatus,
      outcome: outcomeRaw ? (outcomeRaw as CallOutcome) : undefined,
      scheduledFor,
      notes,
      agreedNextStep,
    },
    await currentActorName()
  );
  if (!call) return { error: 'That company no longer exists.' };

  revalidatePath(`/admin/companies/${companyId}`);
  revalidatePath('/admin/pipeline');
  revalidatePath('/admin');

  return { ok: status === 'completed' ? 'Call logged and engagement moved on.' : 'Call details saved.' };
}

export async function reviewReportAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const reportId = String(formData.get('reportId') ?? '');
  const consultantNotes = String(formData.get('consultantNotes') ?? '').trim();

  if (!reportId) return { error: 'Missing report reference.' };
  if (!consultantNotes) {
    return { error: 'Add your reading of the report before marking it reviewed.' };
  }
  if (consultantNotes.length > 4000) return { error: 'Notes are limited to 4000 characters.' };

  const report = reviewReport(reportId, consultantNotes, await currentActorName());
  if (!report) return { error: 'That report no longer exists.' };

  revalidatePath(`/admin/reports/${reportId}`);
  revalidatePath(`/admin/companies/${report.companyId}`);
  revalidatePath('/admin');

  return { ok: 'Report marked as reviewed and ready for the client call.' };
}
