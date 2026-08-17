import type {
  CallStatus,
  CompanyStatus,
  EnquiryStatus,
  EngagementStage,
  ReportStatus,
  SurveyLinkStatus,
  UrgencyLevel,
} from '@/lib/admin/types';

/**
 * The single mapping from a workflow state to a colour tone.
 *
 * Centralised because the same status must look the same everywhere: if "At risk"
 * is rose on the company list and amber in the workspace, staff stop trusting colour
 * as a signal and start reading every label. Colour is never the only cue — every
 * pill carries its text label too, which is what keeps this usable for colour-blind
 * staff and satisfies WCAG 1.4.1.
 */
export type Tone = 'neutral' | 'good' | 'warn' | 'danger' | 'info';

export function companyTone(status: CompanyStatus): Tone {
  switch (status) {
    case 'at_risk':
      return 'danger';
    case 'active':
      return 'good';
    case 'onboarding':
      return 'info';
    case 'archived':
      return 'neutral';
  }
}

export function urgencyTone(urgency: UrgencyLevel): Tone {
  switch (urgency) {
    case 'critical':
      return 'danger';
    case 'high':
      return 'warn';
    case 'medium':
      return 'info';
    case 'low':
      return 'neutral';
  }
}

export function enquiryStatusTone(status: EnquiryStatus): Tone {
  switch (status) {
    case 'new':
      return 'info';
    case 'triaged':
    case 'in_progress':
      return 'warn';
    case 'waiting_on_manager':
      return 'danger';
    case 'resolved':
    case 'closed':
      return 'good';
  }
}

export function reportTone(status: ReportStatus): Tone {
  switch (status) {
    case 'ready':
      return 'good';
    case 'processing':
      return 'info';
    case 'error':
      return 'danger';
    case 'queued':
      return 'warn';
  }
}

/**
 * Tone follows *who we are waiting on*, which is what a manager scanning the board
 * actually needs: info = ours to action, warn = waiting on them, good = done.
 */
export function stageTone(stage: EngagementStage): Tone {
  switch (stage) {
    case 'new_enquiry':
    case 'company_registered':
    case 'survey_link_sent':
      return 'info';
    case 'survey_in_progress':
    case 'ai_analysis_running':
      return 'warn';
    case 'survey_completed':
    case 'report_ready':
      // Ready and waiting on us — the states most likely to stall unnoticed.
      return 'danger';
    case 'report_reviewed':
    case 'follow_up_completed':
    case 'proposal_sent':
      return 'warn';
    case 'confirmed_client':
      return 'good';
    case 'closed_lost':
      return 'neutral';
  }
}

export function surveyTone(status: SurveyLinkStatus): Tone {
  switch (status) {
    case 'completed':
      return 'good';
    case 'in_progress':
    case 'opened':
      return 'warn';
    case 'sent':
      return 'info';
    case 'created':
      return 'neutral';
    case 'expired':
      return 'danger';
  }
}

export function callTone(status: CallStatus): Tone {
  switch (status) {
    case 'completed':
      return 'good';
    case 'scheduled':
      return 'info';
    case 'rescheduled':
      return 'warn';
    case 'no_answer':
      return 'warn';
    case 'not_scheduled':
      return 'danger';
  }
}
