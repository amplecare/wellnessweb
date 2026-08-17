import Link from 'next/link';
import type { Metadata } from 'next';
import { createCompanyNote, logConsultantCall, sendSurveyLink } from '@/app/admin/actions';
import { ActionForm, AdminField, adminInputClasses } from '@/components/admin/ActionForm';
import { AdminShell } from '@/components/admin/AdminShell';
import { EmptyState } from '@/components/admin/EmptyState';
import { ErrorState } from '@/components/admin/ErrorState';
import { SimpleTable, Row, Cell } from '@/components/admin/SimpleTable';
import { StatusPill } from '@/components/admin/StatusPill';
import { Timeline } from '@/components/admin/Timeline';
import { Card } from '@/components/ui/Card';
import {
  activityByCompany,
  callForCompany,
  consultants,
  engagementPhases,
  engagementForCompany,
  engagementStages,
  stageProgress,
  surveyProgress,
  companyById,
  employeesByCompany,
  enquiriesByCompany,
  formatDate,
  formatDateTime,
  notesByCompany,
  reportsByCompany,
  suggestActionsForCompany,
  toTitleCase,
} from '@/lib/admin/insights';
import { readRole } from '@/lib/admin/query';
import { loadWorkspace } from '@/lib/admin/store';
import { callTone, stageTone, surveyTone } from '@/lib/admin/tone';

export const metadata: Metadata = {
  title: 'Company Workspace',
  robots: { index: false, follow: false },
};

const tabs = [
  'overview',
  'survey',
  'employees',
  'enquiries',
  'reports',
  'followup',
  'notes',
  'activity',
] as const;

/** Tab labels, because toTitleCase would render 'followup' as one word. */
const tabLabels: Record<(typeof tabs)[number], string> = {
  overview: 'Overview',
  survey: 'Survey',
  employees: 'Staff',
  enquiries: 'Enquiries',
  reports: 'Reports',
  followup: 'Follow-up call',
  notes: 'Notes',
  activity: 'Activity',
};
type TabName = (typeof tabs)[number];

type PageProps = {
  params: Promise<{ companyId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CompanyWorkspacePage({ params, searchParams }: PageProps) {
  // Postgres is the source of truth; nothing renders from memory.
  await loadWorkspace();

  const { companyId } = await params;
  const query = await searchParams;
  const role = readRole();
  const requestedTab = typeof query.tab === 'string' ? query.tab : 'overview';
  const tab: TabName = tabs.includes(requestedTab as TabName)
    ? (requestedTab as TabName)
    : 'overview';

  const company = companyById(companyId);

  if (!company) {
    return (
      <AdminShell
        role={role}
        companyId={companyId}
        title="Company not found"
        description="The requested company record does not exist in the current dataset."
      >
        <ErrorState
          title="Unknown company"
          body="This workspace could not be loaded. Check the company ID or return to the account list."
          backHref="/admin/companies"
        />
      </AdminShell>
    );
  }

  if (role === 'company_user' && query.company !== companyId) {
    return (
      <AdminShell
        role={role}
        companyId={companyId}
        title="Access restricted"
        description="Company users are limited to their own organisation's records."
      >
        <ErrorState
          title="Permission boundary"
          body="Your current role can only view data for your own company workspace."
          backHref={`/admin?company=${companyId}`}
        />
      </AdminShell>
    );
  }

  const employees = employeesByCompany(companyId);
  const enquiries = enquiriesByCompany(companyId);
  const reports = reportsByCompany(companyId);
  const notes = notesByCompany(companyId);
  const activity = activityByCompany(companyId);
  const suggestedActions = suggestActionsForCompany(companyId);
  const progress = surveyProgress(companyId);
  const engagement = engagementForCompany(companyId);
  const call = callForCompany(companyId);
  const staffOwners = consultants();

  const headerTone =
    company.status === 'at_risk'
      ? 'danger'
      : company.status === 'active'
        ? 'good'
        : company.status === 'onboarding'
          ? 'info'
          : 'neutral';

  return (
    <AdminShell
      role={role}
      companyId={companyId}
      title={`${company.name} Workspace`}
      description="Single-company CRM view for people records, enquiries, report outputs, notes, and auditable activity."
    >
      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-display-md text-ink">Company profile</h2>
            <p className="mt-1 text-sm text-ink-soft">
              {toTitleCase(company.type)} · {company.staffCount} staff · Account owner:{' '}
              {company.accountOwner}
            </p>
          </div>
          <StatusPill label={toTitleCase(company.status)} tone={headerTone} />
        </div>

        <div className="mt-4 grid gap-2 text-sm text-ink-soft sm:grid-cols-2 xl:grid-cols-4">
          <p className="rounded-lg bg-paper-lumen px-3 py-2">
            Contact: {company.primaryContact.name}
          </p>
          <p className="rounded-lg bg-paper-lumen px-3 py-2">
            Email: {company.primaryContact.email}
          </p>
          <p className="rounded-lg bg-paper-lumen px-3 py-2">
            Phone: {company.primaryContact.phone}
          </p>
          <p className="rounded-lg bg-paper-lumen px-3 py-2">
            Priority score: {company.priorityScore}
          </p>
        </div>

        <nav className="mt-5 flex flex-wrap gap-2" aria-label="Company tabs">
          {tabs.map((item) => {
            const active = item === tab;
            return (
              <Link
                key={item}
                href={`/admin/companies/${companyId}?company=${companyId}&tab=${item}`}
                className={
                  active
                    ? 'rounded-full border border-violet-700 bg-violet-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-white'
                    : 'rounded-full border border-line px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-ink-soft hover:border-violet-300 hover:text-ink'
                }
              >
                {tabLabels[item]}
              </Link>
            );
          })}
        </nav>
      </Card>

      {/* Where this account sits in the twelve-stage workflow, on every tab —
 it is the first thing anyone opening a workspace needs to know. */}
      {engagement ? (
        <Card className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-display-md text-ink">Workflow stage</h2>
              <p className="mt-1 text-sm text-ink-soft">
                Owned by {engagement.owner}
                {engagement.nextAction ? ` · Next: ${engagement.nextAction}` : ''}
              </p>
            </div>
            <StatusPill label={toTitleCase(engagement.stage)} tone={stageTone(engagement.stage)} />
          </div>

          <div className="mt-4">
            <div
              className="h-2 w-full overflow-hidden rounded-full bg-violet-100"
              role="progressbar"
              aria-valuenow={stageProgress(engagement.stage)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progress through the engagement workflow"
            >
              <div
                className="h-full rounded-full bg-violet-600"
                style={{ width: `${stageProgress(engagement.stage)}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-ink-muted">
              {stageProgress(engagement.stage)}% through the workflow
              {engagement.nextActionAt ? ` · due ${formatDate(engagement.nextActionAt)}` : ''}
            </p>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {engagementPhases.map((phase) => {
              const activeIndex = phase.stages.indexOf(engagement.stage);
              const reached = activeIndex >= 0;
              return (
                <div
                  key={phase.phase}
                  className={
                    reached
                      ? 'rounded-lg border border-violet-200 bg-violet-50 p-3'
                      : 'rounded-lg border border-line bg-paper-lumen p-3'
                  }
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
                    {phase.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-ink-soft">{phase.description}</p>
                  <p className="mt-2 text-xs text-ink-muted">
                    {reached ? 'Current or completed.' : 'Not reached yet.'}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-5 overflow-hidden rounded-lg border border-line bg-paper-lumen p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
              Twelve-stage journey
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {engagementStages().map((stageName) => {
                const active = stageName === engagement.stage;
                const passed = stageProgress(stageName as typeof engagement.stage) <= stageProgress(engagement.stage);
                return (
                  <span
                    key={stageName}
                    className={
                      active
                        ? 'rounded-full border border-violet-700 bg-violet-600 px-3 py-1 text-xs font-semibold text-white'
                        : passed
                          ? 'rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-ink'
                          : 'rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold text-ink-soft'
                    }
                  >
                    {toTitleCase(stageName)}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
            <p className="rounded-lg bg-paper-lumen px-3 py-2">
              Survey:{' '}
              {progress ? `${progress.rate}% of ${progress.survey.invitedCount}` : 'Not created'}
            </p>
            <p className="rounded-lg bg-paper-lumen px-3 py-2">
              Reports ready: {reports.filter((item) => item.status === 'ready').length}
            </p>
            <p className="rounded-lg bg-paper-lumen px-3 py-2">
              Call: {call ? toTitleCase(call.status) : 'Not scheduled'}
            </p>
          </div>

          <Link
            href={`/admin/pipeline/${engagement.id}`}
            className="mt-4 inline-block text-sm font-semibold text-violet-700 underline decoration-violet-300 underline-offset-4"
          >
            Open the engagement record
          </Link>
        </Card>
      ) : null}

      <Card className="p-5">
        <h2 className="text-display-md text-ink">Glossary</h2>
        <p className="mt-1 text-sm text-ink-soft">
          The words used across the dashboard, explained in plain English.
        </p>
        <dl className="mt-4 grid gap-3 md:grid-cols-3">
          {[
            {
              term: 'Enquiry',
              definition: 'A wellbeing case about a member of staff at an existing client company.',
            },
            {
              term: 'Consultation / lead',
              definition: 'A care provider moving through the sales journey towards becoming a client.',
            },
            {
              term: 'Company',
              definition: 'The client organisation itself.',
            },
          ].map((item) => (
            <div key={item.term} className="rounded-lg border border-line bg-white p-4">
              <dt className="text-sm font-semibold text-ink">{item.term}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-soft">{item.definition}</dd>
            </div>
          ))}
        </dl>
      </Card>

      {tab === 'overview' ? (
        <section className="grid gap-4 xl:grid-cols-2">
          <Card className="p-5">
            <h3 className="text-display-md text-ink">Current risk summary</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              <li className="rounded-lg border border-line px-3 py-2">
                Open enquiries:{' '}
                {
                  enquiries.filter((item) => item.status !== 'resolved' && item.status !== 'closed')
                    .length
                }
              </li>
              <li className="rounded-lg border border-line px-3 py-2">
                High urgency items:{' '}
                {
                  enquiries.filter((item) => item.urgency === 'high' || item.urgency === 'critical')
                    .length
                }
              </li>
              <li className="rounded-lg border border-line px-3 py-2">
                Reports ready: {reports.filter((item) => item.status === 'ready').length}
              </li>
            </ul>
          </Card>

          <Card className="p-5">
            <h3 className="text-display-md text-ink">Suggested next steps</h3>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              {suggestedActions.map((action) => (
                <li key={action} className="rounded-lg border border-line bg-paper-lumen px-3 py-2">
                  {action}
                </li>
              ))}
            </ul>
          </Card>
        </section>
      ) : null}

      {tab === 'survey' ? (
        progress ? (
          <>
            <Card className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-display-md text-ink">Staff survey</h3>
                  <p className="mt-1 text-sm text-ink-soft">
                    Issued by {progress.survey.issuedBy} ·{' '}
                    {progress.survey.sentAt
                      ? `Sent ${formatDate(progress.survey.sentAt)}`
                      : 'Not yet sent'}
                    {progress.survey.closesAt
                      ? ` · Closes ${formatDate(progress.survey.closesAt)}`
                      : ''}
                  </p>
                </div>
                <StatusPill
                  label={toTitleCase(progress.survey.status)}
                  tone={surveyTone(progress.survey.status)}
                />
              </div>

              <div className="mt-5">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-3xl font-semibold text-ink nums">{progress.rate}%</p>
                  <p className="text-sm text-ink-soft nums">
                    {progress.survey.responseCount} of {progress.survey.invitedCount} staff
                  </p>
                </div>
                <div
                  className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-violet-100"
                  role="progressbar"
                  aria-valuenow={progress.rate}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Survey participation rate"
                >
                  <div
                    className={
                      progress.lowParticipation
                        ? 'h-full rounded-full bg-amber-500'
                        : 'h-full rounded-full bg-mint-600'
                    }
                    style={{ width: `${progress.rate}%` }}
                  />
                </div>
                {progress.daysLeft !== undefined ? (
                  <p className="mt-2 text-xs text-ink-muted">
                    {progress.daysLeft > 0
                      ? `${progress.daysLeft} days until the survey closes`
                      : 'Survey window has closed'}
                  </p>
                ) : null}
              </div>

              {/* Participation is what decides whether a report is defensible. A
 wellbeing report drawn from 12% of a workforce is not a picture of
 that workforce, and presenting it as one misleads the provider. */}
              {progress.lowParticipation ? (
                <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm text-amber-900">
                  <span className="font-semibold">Participation is low.</span> Below 40%, findings
                  cannot be safely generalised to the whole workforce. Ask the provider to re-share
                  the link before analysing.
                </p>
              ) : progress.readyToAnalyse ? (
                <p className="mt-4 rounded-lg border border-mint-200 bg-mint-50 px-3 py-2.5 text-sm text-mint-800">
                  Participation is high enough to analyse with the usual caveats.
                </p>
              ) : null}

              <p className="mt-4 break-all rounded-lg border border-line bg-paper-lumen px-3 py-2 text-xs text-ink-soft">
                {progress.survey.url}
              </p>

              <div className="mt-4 border-t border-line pt-4">
                <ActionForm
                  action={sendSurveyLink}
                  submitLabel={
                    progress.survey.status === 'created' ? 'Record as sent' : 'Record a reminder'
                  }
                  variant={progress.survey.status === 'created' ? 'primary' : 'secondary'}
                >
                  <input type="hidden" name="companyId" value={companyId} />
                  <p className="text-sm text-ink-soft">
                    {progress.survey.status === 'created'
                      ? 'Record that the link has been handed to the provider to share with their staff.'
                      : `Last reminder ${progress.survey.lastRemindedAt ? formatDate(progress.survey.lastRemindedAt) : 'none'}. Record another after chasing.`}
                  </p>
                </ActionForm>
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="text-display-md text-ink">Individual participation</h3>
              <p className="mt-1 text-sm text-ink-soft">
                Whether each person responded — never what they said. Answers reach the dashboard
                only as aggregates on the report, which is what lets staff answer honestly.
              </p>
              <div className="mt-4">
                {progress.responses.length ? (
                  <SimpleTable headers={['Staff member', 'Status', 'Started', 'Completed']}>
                    {progress.responses.map((response) => (
                      <Row key={response.id}>
                        <Cell className="font-semibold text-ink">
                          {employees.find((e) => e.id === response.employeeId)?.name ??
                            response.employeeId}
                        </Cell>
                        <Cell>
                          <StatusPill
                            label={toTitleCase(response.status)}
                            tone={
                              response.status === 'completed'
                                ? 'good'
                                : response.status === 'started'
                                  ? 'warn'
                                  : 'neutral'
                            }
                          />
                        </Cell>
                        <Cell>{response.startedAt ? formatDateTime(response.startedAt) : '—'}</Cell>
                        <Cell>
                          {response.completedAt ? formatDateTime(response.completedAt) : '—'}
                        </Cell>
                      </Row>
                    ))}
                  </SimpleTable>
                ) : (
                  <EmptyState
                    title="No individual records"
                    body="Per-person participation will appear here once staff begin responding."
                  />
                )}
              </div>
            </Card>
          </>
        ) : (
          <EmptyState
            title="No survey yet"
            body="No staff survey has been created for this company. Create one to begin the assessment."
          />
        )
      ) : null}

      {tab === 'followup' ? (
        <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
          <Card className="p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-display-md text-ink">Follow-up call</h3>
                <p className="mt-1 text-sm text-ink-soft">
                  The call where the report is explained in plain language.
                </p>
              </div>
              <StatusPill
                label={call ? toTitleCase(call.status) : 'Not Scheduled'}
                tone={callTone(call?.status ?? 'not_scheduled')}
              />
            </div>

            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              <div className="rounded-lg bg-paper-lumen px-3 py-2">
                <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">
                  Consultant
                </dt>
                <dd className="mt-1 text-ink-soft">{call?.consultant ?? company.accountOwner}</dd>
              </div>
              <div className="rounded-lg bg-paper-lumen px-3 py-2">
                <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">
                  Scheduled
                </dt>
                <dd className="mt-1 text-ink-soft">
                  {call?.scheduledFor ? formatDateTime(call.scheduledFor) : 'Not booked'}
                </dd>
              </div>
              <div className="rounded-lg bg-paper-lumen px-3 py-2">
                <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">
                  Completed
                </dt>
                <dd className="mt-1 text-ink-soft">
                  {call?.completedAt ? formatDateTime(call.completedAt) : 'Not yet'}
                </dd>
              </div>
              <div className="rounded-lg bg-paper-lumen px-3 py-2">
                <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">
                  Outcome
                </dt>
                <dd className="mt-1 text-ink-soft">
                  {call?.outcome ? toTitleCase(call.outcome) : 'Not recorded'}
                </dd>
              </div>
            </dl>

            {call?.notes ? (
              <div className="mt-4 rounded-lg border border-line bg-white p-3">
                <h4 className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">
                  Call notes
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{call.notes}</p>
              </div>
            ) : null}

            {call?.agreedNextStep ? (
              <p className="mt-3 rounded-lg border border-mint-200 bg-mint-50 px-3 py-2.5 text-sm text-mint-800">
                <span className="font-semibold">Agreed next step:</span> {call.agreedNextStep}
              </p>
            ) : null}
          </Card>

          <Card className="p-5">
            <h3 className="text-display-md text-ink">Log the call</h3>
            <p className="mt-1 text-sm text-ink-soft">
              Marking a call complete moves the engagement to Follow-up completed.
            </p>

            <div className="mt-4">
              <ActionForm action={logConsultantCall} submitLabel="Save call record">
                <input type="hidden" name="companyId" value={companyId} />

                <AdminField label="Consultant" htmlFor="call-consultant">
                  <select
                    id="call-consultant"
                    name="consultant"
                    defaultValue={call?.consultant ?? company.accountOwner}
                    className={adminInputClasses}
                  >
                    {staffOwners.map((owner) => (
                      <option key={owner} value={owner}>
                        {owner}
                      </option>
                    ))}
                  </select>
                </AdminField>

                <AdminField label="Call status" htmlFor="call-status">
                  <select
                    id="call-status"
                    name="status"
                    defaultValue={call?.status ?? 'not_scheduled'}
                    className={adminInputClasses}
                  >
                    {(
                      [
                        'not_scheduled',
                        'scheduled',
                        'completed',
                        'no_answer',
                        'rescheduled',
                      ] as const
                    ).map((status) => (
                      <option key={status} value={status}>
                        {toTitleCase(status)}
                      </option>
                    ))}
                  </select>
                </AdminField>

                <AdminField
                  label="Scheduled for"
                  htmlFor="call-when"
                  hint="Leave blank to keep the existing date."
                >
                  <input
                    id="call-when"
                    name="scheduledFor"
                    type="datetime-local"
                    className={adminInputClasses}
                  />
                </AdminField>

                <AdminField
                  label="Outcome"
                  htmlFor="call-outcome"
                  hint="Only once the call has happened."
                >
                  <select
                    id="call-outcome"
                    name="outcome"
                    defaultValue={call?.outcome ?? ''}
                    className={adminInputClasses}
                  >
                    <option value="">Not recorded</option>
                    {(
                      [
                        'proceeding',
                        'considering',
                        'needs_more_info',
                        'not_proceeding',
                        'no_decision_yet',
                      ] as const
                    ).map((outcome) => (
                      <option key={outcome} value={outcome}>
                        {toTitleCase(outcome)}
                      </option>
                    ))}
                  </select>
                </AdminField>

                <AdminField
                  label="Call notes"
                  htmlFor="call-notes"
                  hint="Required to mark a call complete."
                >
                  <textarea
                    id="call-notes"
                    name="notes"
                    rows={4}
                    className={adminInputClasses}
                    placeholder="What did you explain, how did they react, what did they push back on?"
                  />
                </AdminField>

                <AdminField label="Agreed next step" htmlFor="call-next">
                  <input
                    id="call-next"
                    name="agreedNextStep"
                    type="text"
                    className={adminInputClasses}
                    placeholder="e.g. Manager to take the roster pilot to their area manager"
                  />
                </AdminField>
              </ActionForm>
            </div>
          </Card>
        </section>
      ) : null}

      {tab === 'employees' ? (
        employees.length ? (
          <SimpleTable
            headers={['Name', 'Role', 'Department', 'Manager', 'Last check-in', 'Open enquiries']}
          >
            {employees.map((employee) => (
              <Row key={employee.id}>
                <Cell className="font-semibold text-ink">{employee.name}</Cell>
                <Cell>{employee.role}</Cell>
                <Cell>{employee.department}</Cell>
                <Cell>{employee.manager}</Cell>
                <Cell>{formatDate(employee.lastCheckIn)}</Cell>
                <Cell className="nums">{employee.openEnquiries}</Cell>
              </Row>
            ))}
          </SimpleTable>
        ) : (
          <EmptyState
            title="No employee records"
            body="Employee records for this company will appear here once linked."
          />
        )
      ) : null}

      {tab === 'enquiries' ? (
        enquiries.length ? (
          <SimpleTable
            headers={['Submitted', 'Concern', 'Urgency', 'Status', 'Assignee', 'Actions']}
          >
            {enquiries.map((item) => {
              const tone =
                item.urgency === 'critical'
                  ? 'danger'
                  : item.urgency === 'high'
                    ? 'warn'
                    : 'neutral';
              return (
                <Row key={item.id}>
                  <Cell>{formatDateTime(item.submittedAt)}</Cell>
                  <Cell>{toTitleCase(item.concernType)}</Cell>
                  <Cell>
                    <StatusPill label={toTitleCase(item.urgency)} tone={tone} />
                  </Cell>
                  <Cell>{toTitleCase(item.status)}</Cell>
                  <Cell>{item.assignee}</Cell>
                  <Cell>
                    <Link
                      href={`/admin/enquiries/${item.id}?company=${companyId}`}
                      className="text-sm font-semibold text-violet-700 underline decoration-violet-300 underline-offset-4"
                    >
                      Open
                    </Link>
                  </Cell>
                </Row>
              );
            })}
          </SimpleTable>
        ) : (
          <EmptyState
            title="No enquiries yet"
            body="Wellbeing enquiries from this company will appear in this table."
          />
        )
      ) : null}

      {tab === 'reports' ? (
        reports.length ? (
          <SimpleTable
            headers={['Period', 'Status', 'Burnout risk', 'Absence risk', 'Engagement', 'Actions']}
          >
            {reports.map((report) => {
              const tone =
                report.status === 'ready'
                  ? 'good'
                  : report.status === 'processing'
                    ? 'info'
                    : report.status === 'error'
                      ? 'danger'
                      : 'warn';
              return (
                <Row key={report.id}>
                  <Cell className="font-semibold text-ink">{report.periodLabel}</Cell>
                  <Cell>
                    <StatusPill label={toTitleCase(report.status)} tone={tone} />
                  </Cell>
                  <Cell className="nums">{report.burnoutRisk}%</Cell>
                  <Cell className="nums">{report.absenceRisk}%</Cell>
                  <Cell className="nums">{report.engagementScore}%</Cell>
                  <Cell>
                    <Link
                      href={`/admin/reports/${report.id}?company=${companyId}`}
                      className="text-sm font-semibold text-violet-700 underline decoration-violet-300 underline-offset-4"
                    >
                      Open report
                    </Link>
                  </Cell>
                </Row>
              );
            })}
          </SimpleTable>
        ) : (
          <EmptyState
            title="No reports yet"
            body="Generated trend and risk reports will appear here."
          />
        )
      ) : null}

      {tab === 'notes' ? (
        <Card className="p-5">
          <h3 className="text-display-md text-ink">Account notes</h3>
          <p className="mt-1 text-sm text-ink-soft">
            Append-only. Saved notes cannot be edited or deleted, so the account history stays
            reliable.
          </p>

          <div className="mt-4">
            <ActionForm action={createCompanyNote} submitLabel="Add note">
              <input type="hidden" name="companyId" value={companyId} />
              <AdminField label="New note" htmlFor="company-note">
                <textarea
                  id="company-note"
                  name="content"
                  rows={3}
                  required
                  className={adminInputClasses}
                  placeholder="What was agreed, and with whom?"
                />
              </AdminField>
            </ActionForm>
          </div>

          <div className="mt-5 border-t border-line pt-5">
            {notes.length ? (
              <ul className="space-y-3">
                {notes.map((note) => (
                  <li key={note.id} className="rounded-lg border border-line bg-paper-lumen p-3">
                    <p className="text-sm leading-relaxed text-ink-soft">{note.content}</p>
                    <p className="mt-2 text-xs font-medium uppercase tracking-[0.1em] text-ink-muted">
                      {note.author} · {formatDateTime(note.createdAt)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState title="No notes yet" body="Internal account notes will appear here." />
            )}
          </div>
        </Card>
      ) : null}

      {tab === 'activity' ? (
        activity.length ? (
          <Timeline
            items={activity
              .sort((a, b) => b.at.localeCompare(a.at))
              .map((item) => ({
                id: item.id,
                title: item.detail,
                detail: toTitleCase(item.type),
                meta: `${item.actor} · ${formatDateTime(item.at)}`,
              }))}
          />
        ) : (
          <EmptyState
            title="No activity log items"
            body="Tracked workflow activity will appear here."
          />
        )
      ) : null}
    </AdminShell>
  );
}
