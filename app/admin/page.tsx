import Link from 'next/link';
import type { Metadata } from 'next';
import { AdminShell } from '@/components/admin/AdminShell';
import { KpiCard } from '@/components/admin/KpiCard';
import { StatusPill } from '@/components/admin/StatusPill';
import { TrendBars } from '@/components/admin/TrendBars';
import { Card } from '@/components/ui/Card';
import {
  atRiskCompanies,
  buildTaskList,
  companiesAwaitingCall,
  concernTrends,
  daysUntil,
  filterEnquiries,
  formatDateTime,
  getScopedCompanies,
  getScopedEnquiries,
  kpis,
  leadsNeedingAction,
  reportStatusSummary,
  reportsAwaitingReview,
  scopedCompanyId,
  surveyProgress,
  surveySummary,
  toTitleCase,
  urgencyBreakdown,
} from '@/lib/admin/insights';
// Activity comes from the store, not the seed module, so entries written by
// workflow actions show up here immediately.
import { listActivity, loadWorkspace } from '@/lib/admin/store';
import { companyTone, urgencyTone } from '@/lib/admin/tone';
import { readCompany, readRole } from '@/lib/admin/query';

/**
 * Rendered per request, never prerendered.
 *
 * This page is behind authentication and reads live data, so a build-time snapshot
 * would be both wrong and impossible — the build has no signed-in user. Next 16
 * tries to prerender it by default, which fails on the database connection. Locally
 * that was hidden because .env.local supplied DATABASE_URL and the build happily
 * baked a page nobody should ever be served.
 */
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Internal multi-tenant wellbeing CRM dashboard for Ample Care administrators.',
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminDashboardPage({ searchParams }: PageProps) {
  // Postgres is the source of truth; nothing renders from memory.
  await loadWorkspace();

  const query = await searchParams;
  const role = readRole();
  const requestedCompanyId = readCompany(
    typeof query.company === 'string' ? query.company : undefined
  );
  const companyId = scopedCompanyId(role, requestedCompanyId);

  const scopedCompanies = getScopedCompanies(role, companyId);
  const scopedEnquiries = getScopedEnquiries(role, companyId);
  const stats = kpis(role, companyId);
  const survey = surveySummary(role, companyId);
  const concerns = concernTrends(role, companyId);
  const urgency = urgencyBreakdown(role, companyId);
  const reportStatus = reportStatusSummary(role, companyId);
  const reportsToReview = reportsAwaitingReview(role, companyId);
  const companiesToCall = companiesAwaitingCall(role, companyId);
  const bookedToday = companiesToCall.filter(({ call }) => isSameLocalDay(call?.scheduledFor));
  const dueSoonCalls = companiesToCall.filter(
    ({ call }) => call?.scheduledFor && daysUntil(call.scheduledFor) <= 1
  );
  const lowParticipationCompanies = scopedCompanies.filter((company) => {
    const progress = surveyProgress(company.id);
    return Boolean(progress?.lowParticipation);
  });

  const recent = [...scopedEnquiries]
    .sort((a, b) => b.submittedAt.localeCompare(a.submittedAt))
    .slice(0, 5);
  const unresolvedCompanies = scopedCompanies.filter((company) => company.status === 'at_risk');
  const needsAttention = {
    urgentCases: filterEnquiries(role, requestedCompanyId, { urgency: 'critical', view: 'open' })
      .concat(filterEnquiries(role, requestedCompanyId, { urgency: 'high', view: 'open' }))
      .slice(0, 5),
    overdueLeads: leadsNeedingAction(role).slice(0, 5),
  };
  const riskCompanies = atRiskCompanies(role, requestedCompanyId).slice(0, 4);

  const tasks = buildTaskList(role, requestedCompanyId);

  const recentActivity = listActivity()
    .filter((item) => (companyId ? item.companyId === companyId : true))
    .sort((a, b) => b.at.localeCompare(a.at))
    .slice(0, 6);

  return (
    <AdminShell
      role={role}
      companyId={companyId}
      title="Today"
      description="Work the queue in order: urgent cases, booked calls, unresolved reports and anything else that needs action first."
    >
      {/*
        The worklist comes first.

        This screen used to open with nine KPI cards. A number tells an experienced
        manager how things are going; it tells someone new nothing about what to do,
        and "9 unresolved" is not an instruction. Tasks now lead, numbers follow.
      */}
      <section aria-labelledby="worklist-heading">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h2 id="worklist-heading" className="text-display-md text-ink">
            What needs doing
          </h2>
          <p className="text-sm text-ink-muted">
            {tasks.length === 0
              ? 'Nothing outstanding'
              : `${tasks.length} item${tasks.length === 1 ? '' : 's'}, most urgent first`}
          </p>
        </div>

        {tasks.length === 0 ? (
          <div className="mt-4 rounded-lg border border-line bg-white p-8 text-center">
            <p className="text-display-md text-ink">You are up to date.</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
              No overdue follow-ups, no reports waiting on review, and no calls outstanding. This is
              what a good day looks like — not a broken page.
            </p>
          </div>
        ) : (
          <ol className="mt-4 divide-y divide-line overflow-hidden rounded-lg border border-line bg-white">
            {tasks.slice(0, 12).map((task) => (
              <li key={task.id}>
                <Link
                  href={task.href}
                  className="flex items-center gap-4 px-4 py-4 transition-colors hover:bg-violet-50 sm:px-5"
                >
                  <span
                    aria-hidden="true"
                    className={
                      task.urgency === 'overdue'
                        ? 'mt-1 size-2 shrink-0 self-start rounded-full bg-rose-600'
                        : task.urgency === 'today'
                          ? 'mt-1 size-2 shrink-0 self-start rounded-full bg-amber-600'
                          : 'mt-1 size-2 shrink-0 self-start rounded-full bg-violet-400'
                    }
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-ink">{task.action}</span>
                    <span className="mt-0.5 block text-sm text-ink-soft">{task.because}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-sm font-semibold text-violet-700"
                  >
                    Open
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        )}

        {tasks.length > 12 ? (
          <p className="mt-3 text-sm text-ink-muted">
            Showing the first 12 of {tasks.length}. Clear these and the rest will surface.
          </p>
        ) : null}
      </section>

      {/* The numbers, demoted. Useful for a manager scanning the state of the
          business; useless as a starting point for someone new. */}
      <section aria-labelledby="numbers-heading">
        <h2 id="numbers-heading" className="sr-only">
          At a glance
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Clients" value={stats.companies} helper="Active organisations" />
          <KpiCard label="Open cases" value={stats.unresolved} helper="Not yet resolved" />
          <KpiCard
            label="Surveys running"
            value={survey.active}
            helper="Awaiting staff responses"
          />
          <KpiCard
            label="Reports ready"
            value={reportStatus.ready}
            helper="For consultant review"
          />
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card className="p-5">
          <h2 className="text-display-md text-ink">Survey participation</h2>
          <p className="mt-1 text-sm text-ink-soft">
            How many invited staff have responded so far.
          </p>
          <p className="mt-4 text-3xl font-semibold text-ink nums">{survey.overallRate}%</p>
          <p className="mt-1 text-xs text-ink-muted nums">
            {survey.totalResponses} responses from {survey.totalInvited} invited staff
          </p>
        </Card>

        <Card className="p-5">
          <h2 className="text-display-md text-ink">Reports to review</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Ready reports waiting on an internal consultant review.
          </p>
          <p className="mt-4 text-3xl font-semibold text-ink nums">{reportsToReview.length}</p>
        </Card>

        <Card className="p-5">
          <h2 className="text-display-md text-ink">Calls still pending</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Companies with a reviewed report but no completed follow-up call.
          </p>
          <p className="mt-4 text-3xl font-semibold text-ink nums">{companiesToCall.length}</p>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card className="p-5 xl:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-display-md text-ink">Morning action board</h2>
              <p className="mt-1 text-sm text-ink-soft">
                The fastest way to see what needs attention before anything else.
              </p>
            </div>
            <Link
              href="/admin/pipeline?focus=awaiting_call"
              className="text-sm font-semibold text-violet-700 underline decoration-violet-300 underline-offset-4"
            >
              Open pipeline queue
            </Link>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <ActionTile
              title="Booked today"
              value={bookedToday.length}
              helper="Consultation calls already on the calendar"
            />
            <ActionTile
              title="Due in 24 hours"
              value={dueSoonCalls.length}
              helper="Calls needing prep today"
            />
            <ActionTile
              title="Reports to review"
              value={reportsToReview.length}
              helper="Ready reports waiting on consultant review"
            />
            <ActionTile
              title="Low participation"
              value={lowParticipationCompanies.length}
              helper="Surveys that need a re-share"
            />
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-ink">
                Booked today
              </h3>
              {bookedToday.length ? (
                <ul className="mt-3 space-y-2">
                  {bookedToday.map(({ company, call, engagement }) => (
                    <li
                      key={company.id}
                      className="rounded-lg border border-line bg-white px-3 py-2.5"
                    >
                      <p className="text-sm font-semibold text-ink">{company.name}</p>
                      <p className="mt-0.5 text-xs text-ink-muted">
                        {engagement?.owner ?? company.accountOwner}
                        {call?.scheduledFor ? ` · ${formatDateTime(call.scheduledFor)}` : ''}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-ink-soft">No calls were booked today.</p>
              )}
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-ink">
                Low participation surveys
              </h3>
              {lowParticipationCompanies.length ? (
                <ul className="mt-3 space-y-2">
                  {lowParticipationCompanies.map((company) => {
                    const progress = surveyProgress(company.id);
                    return (
                      <li
                        key={company.id}
                        className="rounded-lg border border-line bg-white px-3 py-2.5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-ink">{company.name}</p>
                            <p className="mt-0.5 text-xs text-ink-muted">
                              {progress
                                ? `${progress.rate}% of ${progress.survey.invitedCount} responded`
                                : 'No survey progress'}
                            </p>
                          </div>
                          <Link
                            href={`/admin/companies/${company.id}?company=${company.id}&tab=survey`}
                            className="text-xs font-semibold text-violet-700 underline decoration-violet-300 underline-offset-4"
                          >
                            Open
                          </Link>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-ink-soft">
                  No surveys are currently under the participation threshold.
                </p>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-display-md text-ink">Today&apos;s priorities</h2>
          <ul className="mt-4 space-y-2">
            <PriorityLink
              href="/admin/enquiries?urgency=critical"
              label="Triage critical enquiries"
              count={needsAttention.urgentCases.length}
            />
            <PriorityLink
              href="/admin/pipeline?focus=awaiting_call"
              label="Call reviewed leads"
              count={companiesToCall.length}
            />
            <PriorityLink
              href="/admin/companies"
              label="Check at-risk companies"
              count={riskCompanies.length}
            />
          </ul>
        </Card>
      </section>

      {/* The first question a staff member has when they open this: what do I do now?
 Everything below is context; this band is the answer. */}
      {needsAttention.urgentCases.length || needsAttention.overdueLeads.length ? (
        <section aria-labelledby="attention-heading" className="grid gap-4 xl:grid-cols-2">
          <h2 id="attention-heading" className="sr-only">
            Needs attention now
          </h2>

          <Card className="border-rose-200 bg-rose-50/50 p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-display-md text-ink">Urgent open cases</h3>
              <Link
                href="/admin/enquiries?urgency=critical"
                className="text-sm font-semibold text-violet-700 underline decoration-violet-300 underline-offset-4"
              >
                Open triage
              </Link>
            </div>
            {needsAttention.urgentCases.length ? (
              <ul className="mt-4 space-y-2">
                {needsAttention.urgentCases.map((enquiry) => (
                  <li
                    key={enquiry.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-rose-200 bg-white px-3 py-2.5"
                  >
                    <Link
                      href={`/admin/enquiries/${enquiry.id}?company=${enquiry.companyId}`}
                      className="text-sm font-semibold text-violet-800 underline decoration-violet-300 underline-offset-4"
                    >
                      {toTitleCase(enquiry.concernType)} · {enquiry.id}
                    </Link>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-ink-muted nums">Risk {enquiry.riskScore}%</span>
                      <StatusPill
                        label={toTitleCase(enquiry.urgency)}
                        tone={urgencyTone(enquiry.urgency)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-ink-soft">No high or critical cases open.</p>
            )}
          </Card>

          <Card className="border-amber-200 bg-amber-50/50 p-5">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-display-md text-ink">Leads going cold</h3>
              <Link
                href="/admin/pipeline"
                className="text-sm font-semibold text-violet-700 underline decoration-violet-300 underline-offset-4"
              >
                Open pipeline
              </Link>
            </div>
            {needsAttention.overdueLeads.length ? (
              <ul className="mt-4 space-y-2">
                {needsAttention.overdueLeads.map((lead) => {
                  const overdueBy = lead.nextActionAt ? Math.abs(daysUntil(lead.nextActionAt)) : 0;
                  return (
                    <li
                      key={lead.id}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-amber-200 bg-white px-3 py-2.5"
                    >
                      <Link
                        href={`/admin/pipeline/${lead.id}`}
                        className="text-sm font-semibold text-violet-800 underline decoration-violet-300 underline-offset-4"
                      >
                        {lead.organisationName}
                      </Link>
                      <StatusPill
                        label={overdueBy === 0 ? 'Due today' : `${overdueBy}d overdue`}
                        tone={overdueBy > 3 ? 'danger' : 'warn'}
                      />
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-ink-soft">Every lead has a follow-up date in hand.</p>
            )}
          </Card>
        </section>
      ) : null}

      {riskCompanies.length ? (
        <Card className="p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-display-md text-ink">Accounts to watch</h2>
            <Link
              href="/admin/companies"
              className="text-sm font-semibold text-violet-700 underline decoration-violet-300 underline-offset-4"
            >
              All companies
            </Link>
          </div>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {riskCompanies.map((company) => (
              <li key={company.id}>
                <Link
                  href={`/admin/companies/${company.id}?company=${company.id}`}
                  className="flex items-center justify-between gap-3 rounded-lg border border-line bg-paper-lumen px-3 py-2.5 transition hover:border-violet-300"
                >
                  <span>
                    <span className="block text-sm font-semibold text-ink">{company.name}</span>
                    <span className="text-xs text-ink-muted">
                      {company.staffCount} staff · Priority {company.priorityScore}
                    </span>
                  </span>
                  <StatusPill
                    label={toTitleCase(company.status)}
                    tone={companyTone(company.status)}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      ) : null}

      <section className="grid gap-4 xl:grid-cols-3">
        <Card className="p-5 xl:col-span-2">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-display-md text-ink">Recurring support themes</h2>
              <p className="mt-1 text-sm text-ink-soft">
                Pattern detection across concern types, useful for monthly intervention planning.
              </p>
            </div>
            <StatusPill label={toTitleCase(role)} tone="info" />
          </div>
          <div className="mt-5">
            <TrendBars
              items={concerns.map((item) => ({
                label: toTitleCase(item.concern),
                value: item.total,
              }))}
            />
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-display-md text-ink">Urgency split</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Auto-flags critical items for immediate admin follow-up.
          </p>
          <div className="mt-4 grid gap-2">
            <div className="flex items-center justify-between rounded-lg bg-rose-50 px-3 py-2">
              <span className="text-sm text-ink-soft">Critical</span>
              <span className="font-semibold text-rose-800 nums">{urgency.critical}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-amber-50 px-3 py-2">
              <span className="text-sm text-ink-soft">High</span>
              <span className="font-semibold text-amber-800 nums">{urgency.high}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-violet-50 px-3 py-2">
              <span className="text-sm text-ink-soft">Medium</span>
              <span className="font-semibold text-ink nums">{urgency.medium}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-violet-50 px-3 py-2">
              <span className="text-sm text-ink-soft">Low</span>
              <span className="font-semibold text-ink-soft nums">{urgency.low}</span>
            </div>
          </div>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card className="p-5 xl:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-display-md text-ink">Recent enquiries</h2>
            <Link
              href={companyId ? `/admin/companies?company=${companyId}` : '/admin/companies'}
              className="text-sm font-semibold text-violet-700 underline decoration-violet-300 underline-offset-4"
            >
              Open company workspace
            </Link>
          </div>
          <ul className="mt-4 space-y-3">
            {recent.map((item) => {
              const tone =
                item.urgency === 'critical'
                  ? 'danger'
                  : item.urgency === 'high'
                    ? 'warn'
                    : 'neutral';
              return (
                <li key={item.id} className="rounded-lg border border-line bg-paper-lumen p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-ink">{item.summary}</p>
                    <StatusPill label={toTitleCase(item.urgency)} tone={tone} />
                  </div>
                  <p className="mt-1 text-sm text-ink-soft">{item.aiSummary}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.1em] text-ink-muted">
                    <span>{item.id}</span>
                    <span>{formatDateTime(item.submittedAt)}</span>
                    <span>Status: {toTitleCase(item.status)}</span>
                    <Link
                      href={`/admin/enquiries/${item.id}?company=${item.companyId}`}
                      className="normal-case tracking-normal text-violet-700 underline decoration-violet-300 underline-offset-4"
                    >
                      Open detail
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card className="p-5">
          <h2 className="text-display-md text-ink">Report generation</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Status of company-level insights report workflow.
          </p>
          <div className="mt-4 space-y-2">
            {Object.entries(reportStatus).map(([status, value]) => (
              <div
                key={status}
                className="flex items-center justify-between rounded-lg border border-line px-3 py-2"
              >
                <span className="text-sm text-ink-soft">{toTitleCase(status)}</span>
                <span className="font-semibold text-ink nums">{value}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Card className="p-5">
          <h2 className="text-display-md text-ink">High-priority accounts</h2>
          {unresolvedCompanies.length ? (
            <ul className="mt-4 space-y-2">
              {unresolvedCompanies.map((company) => (
                <li key={company.id} className="rounded-lg border border-line bg-paper-lumen p-3">
                  <p className="font-semibold text-ink">{company.name}</p>
                  <p className="mt-1 text-sm text-ink-soft">
                    Priority score: {company.priorityScore}
                  </p>
                  <Link
                    href={`/admin/companies/${company.id}?company=${company.id}&tab=overview`}
                    className="mt-2 inline-block text-sm font-semibold text-violet-700 underline decoration-violet-300 underline-offset-4"
                  >
                    Open workspace
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-ink-soft">No high-priority accounts in this scope.</p>
          )}
        </Card>

        <Card className="p-5">
          <h2 className="text-display-md text-ink">Activity log</h2>
          <ul className="mt-4 space-y-2">
            {recentActivity.map((item) => (
              <li key={item.id} className="rounded-lg border border-line px-3 py-2">
                <p className="text-sm font-semibold text-ink">{item.detail}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.1em] text-ink-muted">
                  {item.actor} · {formatDateTime(item.at)}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {!scopedCompanies.length || !scopedEnquiries.length ? (
        <Card className="p-6">
          <h2 className="text-display-md text-ink">No data in scope</h2>
          <p className="mt-2 text-sm text-ink-soft">
            This view supports loading, empty and error states for production integration. Connect
            your data source to replace mock records.
          </p>
        </Card>
      ) : null}
    </AdminShell>
  );
}

function isSameLocalDay(input?: string): boolean {
  if (!input) return false;
  const date = new Date(input);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

function ActionTile({ title, value, helper }: { title: string; value: number; helper: string }) {
  return (
    <div className="rounded-lg border border-line bg-paper-lumen px-3 py-2.5">
      <p className="text-sm font-semibold text-ink">{title}</p>
      <p className="mt-1 text-2xl font-semibold text-ink nums">{value}</p>
      <p className="mt-1 text-xs text-ink-muted">{helper}</p>
    </div>
  );
}

function PriorityLink({ href, label, count }: { href: string; label: string; count: number }) {
  return (
    <li>
      <Link
        href={href}
        className="flex items-center justify-between gap-3 rounded-lg border border-line bg-paper-lumen px-3 py-2.5 transition hover:border-violet-300"
      >
        <span className="text-sm font-semibold text-ink">{label}</span>
        <span className="text-xs text-ink-muted nums">{count}</span>
      </Link>
    </li>
  );
}
