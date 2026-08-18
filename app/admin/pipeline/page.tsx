import Link from 'next/link';
import type { Metadata } from 'next';
import { markLeadBookedToday } from '@/app/admin/actions';
import { ActionForm } from '@/components/admin/ActionForm';
import { AdminShell } from '@/components/admin/AdminShell';
import { EmptyState } from '@/components/admin/EmptyState';
import { KpiCard } from '@/components/admin/KpiCard';
import { StatusPill } from '@/components/admin/StatusPill';
import { Card } from '@/components/ui/Card';
import {
  companiesAwaitingCall,
  daysUntil,
  engagementPhases,
  formatDate,
  formatDateTime,
  leadsNeedingAction,
  pipelineByStage,
  pipelineSummary,
  toTitleCase,
} from '@/lib/admin/insights';
import { readRole } from '@/lib/admin/query';
import { loadWorkspace } from '@/lib/admin/store';
import { stageTone } from '@/lib/admin/tone';
import type { Consultation, EngagementStage, UserRole } from '@/lib/admin/types';

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
  title: 'Consultation pipeline',
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

type PipelineFocus = 'all' | 'awaiting_call' | 'overdue';

/** Plain-English guidance under each column, so the workflow is self-teaching. */
const stageHelp: Record<EngagementStage, string> = {
  new_enquiry: 'Came in from the website. Nobody has spoken to them yet.',
  company_registered: 'Account open. The survey still needs issuing.',
  survey_link_sent: 'Link handed to the provider to share with their staff.',
  survey_in_progress: 'Staff are responding. Watch participation.',
  survey_completed: 'Responses in. Start the analysis.',
  ai_analysis_running: 'Analysis in progress. Nothing to do but wait.',
  report_ready: 'Report generated. Needs a consultant to review it.',
  report_reviewed: 'Reviewed internally. Book and make the call.',
  follow_up_completed: 'Call done. Decide what to propose.',
  proposal_sent: 'Waiting on them. Chase if it goes quiet.',
  confirmed_client: 'Won. Delivery continues in the company workspace.',
  closed_lost: 'Not proceeding. Record why, so it can be revisited.',
};

export default async function PipelinePage({ searchParams }: PageProps) {
  // Postgres is the source of truth; nothing renders from memory.
  await loadWorkspace();

  const query = await searchParams;
  const role = readRole();
  const focus: PipelineFocus =
    query.focus === 'awaiting_call' || query.focus === 'overdue' ? query.focus : 'all';

  // Company users have no business seeing other providers' commercial records.
  if (role === 'company_user') {
    return (
      <AdminShell
        role={role}
        title="Consultation pipeline"
        description="Commercial pipeline for consultation requests from the website."
      >
        <EmptyState
          title="Not available for your role"
          body="The consultation pipeline holds commercial records across all organisations, so it is restricted to Ample Care staff. Your own organisation's wellbeing enquiries are on the overview."
        />
      </AdminShell>
    );
  }

  const summary = pipelineSummary(role);
  const columns = pipelineByStage(role);
  const needsAction = leadsNeedingAction(role);
  const awaitingCallCompanies = companiesAwaitingCall(role);
  const upcomingCalls = columns
    .flatMap((column) => column.leads)
    .filter(
      (lead) =>
        lead.consultationAt &&
        daysUntil(lead.consultationAt) >= 0 &&
        daysUntil(lead.consultationAt) <= 1
    )
    .sort((a, b) => (a.consultationAt ?? '').localeCompare(b.consultationAt ?? ''));

  const focusedColumns =
    focus === 'all'
      ? columns
      : columns
          .map((column) => ({
            ...column,
            leads:
              focus === 'awaiting_call'
                ? column.leads.filter((lead) => lead.stage === 'report_reviewed')
                : column.leads.filter(
                    (lead) => lead.nextActionAt && daysUntil(lead.nextActionAt) <= 0
                  ),
          }))
          .filter((column) => column.leads.length > 0);

  return (
    <AdminShell
      role={role}
      title="Consultation pipeline"
      description="Every consultation request from first contact through to confirmed client. This is the commercial pipeline — wellbeing casework lives under Enquiries."
    >
      <section aria-labelledby="pipeline-kpis">
        <h2 id="pipeline-kpis" className="sr-only">
          Pipeline summary
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard label="Open engagements" value={summary.open} helper="Not yet won or lost" />
          <KpiCard
            label="Waiting on us"
            value={summary.awaitingOurAction}
            helper="Survey done or report ready — nothing is moving until we act"
          />
          <KpiCard
            label="Surveys out"
            value={summary.surveysOut}
            helper="Issued, waiting on staff responses"
          />
          <KpiCard
            label="Proposals out"
            value={summary.proposalsOut}
            helper="Waiting on the provider"
          />
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card className="p-5">
          <h2 className="text-display-md text-ink">Consultations in the next 24 hours</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Booked calls due today or tomorrow, so nothing slips past the consultant.
          </p>
          <p className="mt-4 text-3xl font-semibold text-ink nums">{upcomingCalls.length}</p>
        </Card>

        <Card className="p-5 xl:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-display-md text-ink">Today&apos;s call list</h2>
              <p className="mt-1 text-sm text-ink-soft">
                The lead cards below are already booked; this queue shows what needs a human call.
              </p>
            </div>
            <Link
              href="/admin/pipeline?focus=awaiting_call"
              className="text-sm font-semibold text-violet-700 underline decoration-violet-300 underline-offset-4"
            >
              Open waiting calls
            </Link>
          </div>

          {upcomingCalls.length ? (
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {upcomingCalls.map((lead) => (
                <li
                  key={lead.id}
                  className="rounded-lg border border-line bg-paper-lumen px-3 py-2.5"
                >
                  <p className="text-sm font-semibold text-ink">{lead.organisationName}</p>
                  <p className="mt-0.5 text-xs text-ink-muted">
                    {lead.consultationAt ? formatDateTime(lead.consultationAt) : 'Not booked'} ·{' '}
                    {lead.owner}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-ink-soft">
              No consultation calls fall in the next 24 hours.
            </p>
          )}
        </Card>
      </section>

      {needsAction.length ? (
        <Card className="border-amber-200 bg-amber-50/60 p-5">
          <h2 className="text-display-md text-ink">Needs action today</h2>
          <p className="mt-1 text-sm text-ink-soft">
            These leads have a follow-up date that has passed. This is how a consultation request
            goes cold.
          </p>
          <ul className="mt-4 space-y-2">
            {needsAction.map((lead) => {
              const overdueBy = lead.nextActionAt ? Math.abs(daysUntil(lead.nextActionAt)) : 0;
              return (
                <li
                  key={lead.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-amber-200 bg-white px-3 py-2.5"
                >
                  <div>
                    <Link
                      href={`/admin/pipeline/${lead.id}`}
                      className="text-sm font-semibold text-violet-800 underline decoration-violet-300 underline-offset-4"
                    >
                      {lead.organisationName}
                    </Link>
                    <p className="mt-0.5 text-sm text-ink-soft">{lead.nextAction}</p>
                  </div>
                  <StatusPill
                    label={overdueBy === 0 ? 'Due today' : `${overdueBy}d overdue`}
                    tone={overdueBy > 3 ? 'danger' : 'warn'}
                  />
                </li>
              );
            })}
          </ul>
        </Card>
      ) : null}

      <Card className="p-5">
        <h2 className="text-display-md text-ink">Focus view</h2>
        <p className="mt-1 text-sm text-ink-soft">
          Switch the board to the exact queue you need right now.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/admin/pipeline"
            className={
              focus === 'all'
                ? 'rounded-full border border-violet-700 bg-violet-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-white'
                : 'rounded-full border border-line px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-ink-soft hover:border-violet-300 hover:text-ink'
            }
          >
            Full pipeline
          </Link>
          <Link
            href="/admin/pipeline?focus=awaiting_call"
            className={
              focus === 'awaiting_call'
                ? 'rounded-full border border-violet-700 bg-violet-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-white'
                : 'rounded-full border border-line px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-ink-soft hover:border-violet-300 hover:text-ink'
            }
          >
            Awaiting consultant call
          </Link>
          <Link
            href="/admin/pipeline?focus=overdue"
            className={
              focus === 'overdue'
                ? 'rounded-full border border-violet-700 bg-violet-600 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-white'
                : 'rounded-full border border-line px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-ink-soft hover:border-violet-300 hover:text-ink'
            }
          >
            Overdue follow-up
          </Link>
        </div>
      </Card>

      {focus === 'awaiting_call' ? (
        <Card className="p-5">
          <h2 className="text-display-md text-ink">Companies still waiting for our call</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Reports are reviewed, but the consultant call is not yet complete.
          </p>
          {awaitingCallCompanies.length ? (
            <ul className="mt-4 space-y-2">
              {awaitingCallCompanies.map(({ company, call, engagement }) => (
                <li
                  key={company.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-paper-lumen px-3 py-2.5"
                >
                  <div>
                    <p className="text-sm font-semibold text-ink">{company.name}</p>
                    <p className="text-xs text-ink-muted">
                      {engagement?.owner ?? company.accountOwner}
                      {call?.scheduledFor
                        ? ` · scheduled ${formatDateTime(call.scheduledFor)}`
                        : ' · no call date booked'}
                    </p>
                  </div>
                  <Link
                    href={`/admin/companies/${company.id}?company=${company.id}&tab=followup`}
                    className="text-sm font-semibold text-violet-700 underline decoration-violet-300 underline-offset-4"
                  >
                    Open follow-up
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-ink-soft">
              No companies are waiting for a consultant call.
            </p>
          )}
        </Card>
      ) : null}

      <section aria-labelledby="pipeline-board">
        <h2 id="pipeline-board" className="text-display-md text-ink">
          {focus === 'all'
            ? 'Pipeline board'
            : focus === 'awaiting_call'
              ? 'Pipeline board · awaiting consultant call'
              : 'Pipeline board · overdue follow-up'}
        </h2>
        <p className="mt-1 text-sm text-ink-soft">
          Twelve stages from website enquiry to confirmed client, grouped into the three phases an
          account passes through. Open any engagement to move it on.
        </p>

        {/* Grouped by phase rather than twelve columns in a row. Twelve abreast is
 unreadable, and it hides the question a manager actually has: is this
 account stuck in setup, stuck waiting on staff, or stuck waiting on us? */}
        <div className="mt-5 space-y-6">
          {engagementPhases.map((phase) => {
            const phaseColumns = focusedColumns.filter((column) =>
              phase.stages.includes(column.stage)
            );
            const phaseTotal = phaseColumns.reduce((sum, column) => sum + column.leads.length, 0);

            if (!phaseColumns.length) return null;

            return (
              <section key={phase.phase} aria-labelledby={`phase-${phase.phase}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-2">
                  <h3
                    id={`phase-${phase.phase}`}
                    className="text-sm font-semibold uppercase tracking-[0.12em] text-ink"
                  >
                    {phase.label}
                  </h3>
                  <p className="text-xs text-ink-muted">
                    {phase.description} · {phaseTotal} {phaseTotal === 1 ? 'account' : 'accounts'}
                  </p>
                </div>

                <div className="-mx-1 mt-3 overflow-x-auto px-1 pb-2">
                  <ol className="flex min-w-full gap-4">
                    {phaseColumns.map(({ stage, leads }) => (
                      <li key={stage} className="w-[16.5rem] shrink-0 lg:w-auto lg:flex-1">
                        <div className="flex h-full flex-col rounded-md border border-line bg-white">
                          <div className="border-b border-line px-4 py-3">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="text-sm font-semibold text-ink">
                                {toTitleCase(stage)}
                              </h4>
                              <StatusPill label={String(leads.length)} tone={stageTone(stage)} />
                            </div>
                            <p className="mt-1.5 text-xs leading-snug text-ink-muted">
                              {stageHelp[stage]}
                            </p>
                          </div>

                          <div className="flex flex-1 flex-col gap-2 p-3">
                            {leads.length ? (
                              leads.map((lead) => (
                                <LeadCard key={lead.id} lead={lead} role={role} />
                              ))
                            ) : (
                              <p className="rounded-lg border border-dashed border-line px-3 py-5 text-center text-xs text-ink-muted">
                                Nothing here
                              </p>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>
            );
          })}
        </div>
      </section>
    </AdminShell>
  );
}

function LeadCard({ lead, role }: { lead: Consultation; role: UserRole }) {
  const overdue = lead.nextActionAt ? daysUntil(lead.nextActionAt) <= 0 : false;
  const callDate = lead.consultationAt ? formatDateTime(lead.consultationAt) : undefined;

  return (
    <article className="rounded-lg border border-line bg-paper-lumen p-3 transition-colors hover:border-violet-300">
      <Link
        href={`/admin/pipeline/${lead.id}`}
        className="text-sm font-semibold text-ink underline decoration-transparent underline-offset-4 transition hover:decoration-violet-300"
      >
        {lead.organisationName}
      </Link>

      <p className="mt-1 text-xs text-ink-muted">
        {toTitleCase(lead.organisationType)} · {lead.staffCount} staff
      </p>

      <p className="mt-2 text-xs text-ink-soft">
        {lead.enquirerName} · {lead.enquirerRole}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <StatusPill
          label={lead.consultationAt ? 'Call booked' : 'Call not booked'}
          tone={lead.consultationAt ? 'good' : 'warn'}
        />
        {callDate ? <p className="text-xs font-medium text-violet-800">{callDate}</p> : null}
      </div>

      {lead.nextAction ? (
        <p
          className={
            overdue
              ? 'mt-2 rounded border border-amber-200 bg-amber-50 px-2 py-1 text-xs font-medium text-amber-900'
              : 'mt-2 text-xs text-ink-muted'
          }
        >
          {lead.nextAction}
          {lead.nextActionAt ? ` · ${formatDate(lead.nextActionAt)}` : ''}
        </p>
      ) : null}

      {lead.lostReason ? (
        <p className="mt-2 text-xs italic text-ink-muted">{lead.lostReason}</p>
      ) : null}

      {!lead.consultationAt && role === 'support_admin' ? (
        <div className="mt-3">
          <ActionForm action={markLeadBookedToday} submitLabel="Booked today" variant="secondary">
            <input type="hidden" name="consultationId" value={lead.id} />
          </ActionForm>
        </div>
      ) : null}

      <p className="mt-2 text-xs text-ink-muted">Owner: {lead.owner}</p>
    </article>
  );
}
