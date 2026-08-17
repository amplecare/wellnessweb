import Link from 'next/link';
import type { Metadata } from 'next';
import {
  changeLeadStage,
  markLeadBookedToday,
  setLeadConsultationCall,
  setLeadNextAction,
} from '@/app/admin/actions';
import { ActionForm, AdminField, adminInputClasses } from '@/components/admin/ActionForm';
import { AdminShell } from '@/components/admin/AdminShell';
import { EmptyState } from '@/components/admin/EmptyState';
import { ErrorState } from '@/components/admin/ErrorState';
import { StatusPill } from '@/components/admin/StatusPill';
import { Timeline } from '@/components/admin/Timeline';
import { Card } from '@/components/ui/Card';
import {
  consultationById,
  daysUntil,
  formatDate,
  formatDateTime,
  engagementStages,
  suggestActionsForLead,
  toTitleCase,
} from '@/lib/admin/insights';
import { readRole } from '@/lib/admin/query';
import { getConsultationEvents, loadWorkspace } from '@/lib/admin/store';
import { stageTone } from '@/lib/admin/tone';

export const metadata: Metadata = {
  title: 'Consultation record',
  robots: { index: false, follow: false },
};

type PageProps = {
  params: Promise<{ consultationId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ConsultationDetailPage({ params, searchParams }: PageProps) {
  // Postgres is the source of truth; nothing renders from memory.
  await loadWorkspace();

  const { consultationId } = await params;
  const query = await searchParams;
  const role = readRole();

  if (role === 'company_user') {
    return (
      <AdminShell
        role={role}
        title="Access restricted"
        description="Commercial records are internal."
      >
        <EmptyState
          title="Not available for your role"
          body="Consultation records hold commercial detail across organisations, so they are limited to Ample Care staff."
        />
      </AdminShell>
    );
  }

  const lead = consultationById(consultationId);

  if (!lead) {
    return (
      <AdminShell
        role={role}
        title="Consultation not found"
        description="The requested consultation record does not exist in the current dataset."
      >
        <ErrorState
          title="Unknown consultation"
          body="This record could not be loaded. It may have been removed, or the reference may be wrong."
          backHref="/admin/pipeline"
        />
      </AdminShell>
    );
  }

  const events = getConsultationEvents(consultationId);
  const suggestions = suggestActionsForLead(lead);
  const overdue = lead.nextActionAt ? daysUntil(lead.nextActionAt) <= 0 : false;

  return (
    <AdminShell
      role={role}
      companyId={lead.companyId}
      title={lead.organisationName}
      description="Consultation record: what they asked for, what to prepare, and where the conversation has got to."
    >
      <Card className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-display-md text-ink">Consultation request</h2>
            <p className="mt-1 text-sm text-ink-soft">
              {toTitleCase(lead.organisationType)} · {lead.staffCount} staff · Submitted{' '}
              {formatDateTime(lead.submittedAt)}
            </p>
          </div>
          <StatusPill label={toTitleCase(lead.stage)} tone={stageTone(lead.stage)} />
        </div>

        <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2 xl:grid-cols-3">
          <Detail term="Contact" value={`${lead.enquirerName} · ${lead.enquirerRole}`} />
          <Detail term="Email" value={lead.email} />
          <Detail term="Phone" value={lead.phone} />
          <Detail term="Prefers" value={toTitleCase(lead.preferredContact)} />
          <Detail term="Availability" value={lead.availability} />
          <Detail term="Owner" value={lead.owner} />
          <Detail
            term="Consultation call"
            value={lead.consultationAt ? formatDateTime(lead.consultationAt) : 'Not booked yet'}
          />
          <Detail term="Package interest" value={toTitleCase(lead.packageInterest)} />
          <Detail
            term="Next action"
            value={
              lead.nextAction
                ? `${lead.nextAction}${lead.nextActionAt ? ` · ${formatDate(lead.nextActionAt)}` : ''}`
                : 'None set'
            }
            tone={overdue ? 'warn' : undefined}
          />
        </dl>

        <div className="mt-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
            Challenges they reported
          </h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {lead.challenges.map((challenge) => (
              <li key={challenge}>
                <StatusPill label={toTitleCase(challenge)} tone="info" />
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 rounded-lg border border-line bg-paper-lumen p-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
            What they told us
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{lead.notes}</p>
        </div>

        {lead.lostReason ? (
          <p className="mt-4 rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink-soft">
            <span className="font-semibold text-ink">Reason not proceeding:</span> {lead.lostReason}
          </p>
        ) : null}
      </Card>

      <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Card className="p-5">
          <h2 className="text-display-md text-ink">Prepare for this call</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Derived from what they submitted — not a script, and not a promise to them.
          </p>
          <ul className="mt-4 space-y-2">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion}
                className="rounded-lg border border-line bg-paper-lumen px-3 py-2 text-sm text-ink-soft"
              >
                {suggestion}
              </li>
            ))}
          </ul>

          {lead.companyId ? (
            <Link
              href={`/admin/companies/${lead.companyId}?company=${lead.companyId}`}
              className="mt-4 inline-block text-sm font-semibold text-violet-700 underline decoration-violet-300 underline-offset-4"
            >
              Open the delivery workspace for this client
            </Link>
          ) : null}
        </Card>

        <Card className="p-5">
          <h2 className="text-display-md text-ink">Move this on</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Changing the stage writes an entry to the history below.
          </p>

          <div className="mt-4 border-b border-line pb-5">
            <ActionForm
              action={setLeadConsultationCall}
              submitLabel="Save call date"
              variant="secondary"
            >
              <input type="hidden" name="consultationId" value={lead.id} />

              <AdminField
                label="Consultation call date"
                htmlFor="lead-call-at"
                hint="Leave blank and save to clear the booking date."
              >
                <input
                  id="lead-call-at"
                  name="consultationAt"
                  type="datetime-local"
                  defaultValue={lead.consultationAt ? lead.consultationAt.slice(0, 16) : ''}
                  className={adminInputClasses}
                />
              </AdminField>
            </ActionForm>

            {!lead.consultationAt && role === 'support_admin' ? (
              <div className="mt-3">
                <ActionForm
                  action={markLeadBookedToday}
                  submitLabel="Booked today"
                  variant="secondary"
                >
                  <input type="hidden" name="consultationId" value={lead.id} />
                </ActionForm>
              </div>
            ) : null}
          </div>

          <div className="mt-4">
            <ActionForm action={changeLeadStage} submitLabel="Update stage">
              <input type="hidden" name="consultationId" value={lead.id} />

              <AdminField label="Pipeline stage" htmlFor="lead-stage">
                <select
                  id="lead-stage"
                  name="stage"
                  defaultValue={lead.stage}
                  className={adminInputClasses}
                >
                  {engagementStages().map((stage) => (
                    <option key={stage} value={stage}>
                      {toTitleCase(stage)}
                    </option>
                  ))}
                </select>
              </AdminField>

              <AdminField
                label="What happened"
                htmlFor="lead-detail"
                hint="Optional. Recorded against the stage change."
              >
                <textarea
                  id="lead-detail"
                  name="detail"
                  rows={3}
                  className={adminInputClasses}
                  placeholder="e.g. Consultation held. Sending the assessment-only quote."
                />
              </AdminField>
            </ActionForm>
          </div>

          <div className="mt-6 border-t border-line pt-5">
            <ActionForm
              action={setLeadNextAction}
              submitLabel="Save next action"
              variant="secondary"
            >
              <input type="hidden" name="consultationId" value={lead.id} />

              <AdminField label="Next action" htmlFor="lead-next">
                <input
                  id="lead-next"
                  name="nextAction"
                  type="text"
                  defaultValue={lead.nextAction ?? ''}
                  className={adminInputClasses}
                  placeholder="e.g. Chase the proposal"
                />
              </AdminField>

              <AdminField
                label="Due"
                htmlFor="lead-next-at"
                hint="Overdue items surface on the pipeline."
              >
                <input
                  id="lead-next-at"
                  name="nextActionAt"
                  type="date"
                  defaultValue={lead.nextActionAt ? lead.nextActionAt.slice(0, 10) : ''}
                  className={adminInputClasses}
                />
              </AdminField>
            </ActionForm>
          </div>
        </Card>
      </section>

      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-display-md text-ink">History</h2>
          <Link
            href="/admin/pipeline"
            className="text-sm font-semibold text-violet-700 underline decoration-violet-300 underline-offset-4"
          >
            Back to pipeline
          </Link>
        </div>

        <div className="mt-4">
          {events.length ? (
            <Timeline
              items={events.map((event) => ({
                id: event.id,
                title: event.action,
                detail: event.detail,
                meta: `${event.actor} · ${formatDateTime(event.at)}`,
              }))}
            />
          ) : (
            <EmptyState
              title="No history yet"
              body="Stage changes and follow-up updates will be recorded here as the conversation progresses."
            />
          )}
        </div>
      </Card>
    </AdminShell>
  );
}

function Detail({ term, value, tone }: { term: string; value: string; tone?: 'warn' }) {
  return (
    <div
      className={
        tone === 'warn'
          ? 'rounded-lg border border-amber-200 bg-amber-50 px-3 py-2'
          : 'rounded-lg bg-paper-lumen px-3 py-2'
      }
    >
      <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-muted">{term}</dt>
      <dd className="mt-1 text-sm text-ink-soft">{value}</dd>
    </div>
  );
}
