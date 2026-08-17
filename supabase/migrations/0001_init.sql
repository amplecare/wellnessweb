-- =============================================================================
-- Ample Care — initial schema
-- =============================================================================
--
-- Replaces the in-memory store in lib/admin/store.ts. Every table maps to a type
-- in lib/admin/types.ts.
--
-- Design notes worth keeping:
--
-- * Ids are text, not uuid. They are human-meaningful ('harbour-oaks', 'enq-9001',
--   'lead-5003') and appear in URLs the team reads aloud on calls. A uuid in a
--   support conversation is unusable.
--
-- * Enums are Postgres enums so an invalid workflow state cannot be written at all,
--   rather than being caught only by TypeScript at the edge.
--
-- * survey_response holds NO answers — only whether someone responded and when.
--   Care staff will not answer honestly if an admin screen could attribute answers
--   back to them, and the privacy policy commits to aggregate-only reporting.
--   Findings reach the dashboard through client_report, already aggregated.
--
-- * RLS is enabled on every table with no permissive policy. All access goes through
--   the server using the service role, which bypasses RLS. That means a leaked anon
--   key grants nothing. When per-client logins arrive, add policies here rather than
--   loosening this.
-- =============================================================================

-- ---------- enums ------------------------------------------------------------
do $$ begin
  create type company_status as enum ('active','at_risk','onboarding','archived');
  create type company_type as enum ('care_home','domiciliary','supported_living','nursing_home');
  create type concern_type as enum ('burnout','absence','stress','engagement','conflict','mental_health','workload');
  create type urgency_level as enum ('low','medium','high','critical');
  create type contact_method as enum ('email','phone','sms');
  create type enquiry_status as enum ('new','triaged','in_progress','waiting_on_manager','resolved','closed');
  create type report_status as enum ('queued','processing','ready','error');
  create type engagement_stage as enum (
    'new_enquiry','company_registered','survey_link_sent','survey_in_progress',
    'survey_completed','ai_analysis_running','report_ready','report_reviewed',
    'follow_up_completed','proposal_sent','confirmed_client','closed_lost');
  create type package_interest as enum ('assessment','assessment_plan','ongoing','undecided');
  create type survey_link_status as enum ('created','sent','opened','in_progress','completed','expired');
  create type survey_response_status as enum ('not_started','started','completed');
  create type call_status as enum ('not_scheduled','scheduled','completed','no_answer','rescheduled');
  create type call_outcome as enum ('proceeding','considering','needs_more_info','not_proceeding','no_decision_yet');
  create type activity_type as enum (
    'company_created','enquiry_created','enquiry_status_changed','enquiry_assigned',
    'note_added','report_generated','employee_added','lead_created','lead_stage_changed',
    'consultation_scheduled','survey_sent','survey_completed','report_reviewed','call_logged');
exception when duplicate_object then null; end $$;

-- ---------- core -------------------------------------------------------------
create table if not exists company (
  id                   text primary key,
  name                 text not null,
  type                 company_type not null,
  status               company_status not null default 'onboarding',
  priority_score       int not null default 50 check (priority_score between 0 and 100),
  account_owner        text not null,
  contact_name         text not null,
  contact_role         text not null,
  contact_email        text not null,
  contact_phone        text not null,
  staff_count          int not null check (staff_count >= 0),
  joined_at            timestamptz not null default now(),
  tags                 text[] not null default '{}',
  created_at           timestamptz not null default now()
);

create table if not exists employee (
  id             text primary key,
  company_id     text not null references company(id) on delete cascade,
  name           text not null,
  role           text not null,
  department     text not null,
  manager        text not null,
  last_check_in  timestamptz,
  open_enquiries int not null default 0
);
create index if not exists employee_company_idx on employee(company_id);

create table if not exists enquiry (
  id                text primary key,
  company_id        text not null references company(id) on delete cascade,
  employee_id       text references employee(id) on delete set null,
  submitted_at      timestamptz not null default now(),
  concern_type      concern_type not null,
  urgency           urgency_level not null,
  preferred_contact contact_method not null default 'email',
  status            enquiry_status not null default 'new',
  assignee          text not null,
  summary           text not null default '',
  notes             text not null default '',
  ai_summary        text not null default '',
  risk_score        int not null default 0 check (risk_score between 0 and 100)
);
create index if not exists enquiry_company_idx on enquiry(company_id);
create index if not exists enquiry_status_idx on enquiry(status);

create table if not exists enquiry_timeline (
  id         text primary key,
  enquiry_id text not null references enquiry(id) on delete cascade,
  at         timestamptz not null default now(),
  actor      text not null,
  action     text not null,
  detail     text not null default ''
);
create index if not exists enquiry_timeline_idx on enquiry_timeline(enquiry_id, at desc);

create table if not exists enquiry_note (
  id         text primary key,
  enquiry_id text not null references enquiry(id) on delete cascade,
  created_at timestamptz not null default now(),
  author     text not null,
  content    text not null
);
create index if not exists enquiry_note_idx on enquiry_note(enquiry_id, created_at desc);

-- ---------- reporting --------------------------------------------------------
create table if not exists client_report (
  id                        text primary key,
  company_id                text not null references company(id) on delete cascade,
  period_label              text not null,
  created_at                timestamptz not null default now(),
  status                    report_status not null default 'queued',
  headline                  text not null default '',
  key_risks                 text[] not null default '{}',
  recommendations           text[] not null default '{}',
  burnout_risk              int not null default 0,
  absence_risk              int not null default 0,
  engagement_score          int not null default 0,
  -- Per-theme breakdown, stored as jsonb because the set of themes varies by report.
  themes                    jsonb not null default '[]'::jsonb,
  based_on_responses        int,
  consultant_notes          text,
  reviewed_by               text,
  reviewed_at               timestamptz,
  follow_up_recommendations text[] not null default '{}'
);
create index if not exists client_report_company_idx on client_report(company_id);

-- ---------- surveys ----------------------------------------------------------
create table if not exists survey_link (
  id               text primary key,
  company_id       text not null references company(id) on delete cascade,
  url              text not null,
  status           survey_link_status not null default 'created',
  created_at       timestamptz not null default now(),
  sent_at          timestamptz,
  last_reminded_at timestamptz,
  closes_at        timestamptz,
  invited_count    int not null default 0,
  response_count   int not null default 0,
  issued_by        text not null
);
create index if not exists survey_link_company_idx on survey_link(company_id);

-- Holds no answers. See the note at the top of this file — this is deliberate and
-- must not be "improved" by adding a responses column.
create table if not exists survey_response (
  id           text primary key,
  survey_id    text not null references survey_link(id) on delete cascade,
  company_id   text not null references company(id) on delete cascade,
  employee_id  text references employee(id) on delete set null,
  status       survey_response_status not null default 'not_started',
  started_at   timestamptz,
  completed_at timestamptz
);
create index if not exists survey_response_survey_idx on survey_response(survey_id);

-- ---------- engagement / pipeline --------------------------------------------
create table if not exists consultation (
  id                text primary key,
  organisation_name text not null,
  organisation_type company_type not null,
  staff_count       int not null default 0,
  enquirer_name     text not null,
  enquirer_role     text not null,
  email             text not null default '',
  phone             text not null default '',
  challenges        concern_type[] not null default '{}',
  preferred_contact contact_method not null default 'email',
  availability      text not null default '',
  notes             text not null default '',
  stage             engagement_stage not null default 'new_enquiry',
  owner             text not null,
  submitted_at      timestamptz not null default now(),
  consultation_at   timestamptz,
  next_action_at    timestamptz,
  next_action       text,
  package_interest  package_interest not null default 'undecided',
  company_id        text references company(id) on delete set null,
  lost_reason       text
);
create index if not exists consultation_stage_idx on consultation(stage);
-- Backs the duplicate guard in the public consultation API.
create index if not exists consultation_dedupe_idx on consultation(lower(organisation_name), lower(email));

create table if not exists consultation_event (
  id              text primary key,
  consultation_id text not null references consultation(id) on delete cascade,
  at              timestamptz not null default now(),
  actor           text not null,
  action          text not null,
  detail          text not null default ''
);
create index if not exists consultation_event_idx on consultation_event(consultation_id, at desc);

create table if not exists consultant_call (
  id               text primary key,
  company_id       text not null references company(id) on delete cascade,
  report_id        text references client_report(id) on delete set null,
  consultant       text not null,
  status           call_status not null default 'not_scheduled',
  scheduled_for    timestamptz,
  completed_at     timestamptz,
  outcome          call_outcome,
  notes            text,
  agreed_next_step text
);
create index if not exists consultant_call_company_idx on consultant_call(company_id);

-- ---------- notes and audit --------------------------------------------------
create table if not exists company_note (
  id         text primary key,
  company_id text not null references company(id) on delete cascade,
  created_at timestamptz not null default now(),
  author     text not null,
  content    text not null
);
create index if not exists company_note_idx on company_note(company_id, created_at desc);

create table if not exists activity_log (
  id         text primary key,
  company_id text references company(id) on delete cascade,
  at         timestamptz not null default now(),
  actor      text not null,
  type       activity_type not null,
  detail     text not null default ''
);
create index if not exists activity_log_idx on activity_log(at desc);

-- ---------- security ---------------------------------------------------------
-- RLS on with no permissive policy: the anon key can read nothing. All application
-- access is server-side under the service role, which bypasses RLS. Add policies
-- here (not elsewhere) when per-client logins are introduced.
do $$
declare t text;
begin
  foreach t in array array[
    'company','employee','enquiry','enquiry_timeline','enquiry_note','client_report',
    'survey_link','survey_response','consultation','consultation_event',
    'consultant_call','company_note','activity_log'
  ] loop
    execute format('alter table %I enable row level security', t);
    execute format('alter table %I force row level security', t);
  end loop;
end $$;
