import Link from 'next/link';
import type { Metadata } from 'next';
import { changeEnquiryStatus, createEnquiryNote, reassignEnquiry } from '@/app/admin/actions';
import { ActionForm, AdminField, adminInputClasses } from '@/components/admin/ActionForm';
import { AdminShell } from '@/components/admin/AdminShell';
import { EmptyState } from '@/components/admin/EmptyState';
import { ErrorState } from '@/components/admin/ErrorState';
import { StatusPill } from '@/components/admin/StatusPill';
import { Timeline } from '@/components/admin/Timeline';
import { Card } from '@/components/ui/Card';
import {
  assignableOwners,
  companyById,
  employeeName,
  enquiryById,
  formatDateTime,
  statusOptions,
  timelineByEnquiry,
  toTitleCase,
} from '@/lib/admin/insights';
import { readCompany, readRole } from '@/lib/admin/query';
import { getEnquiryNotes, loadWorkspace } from '@/lib/admin/store';
import { enquiryStatusTone, urgencyTone } from '@/lib/admin/tone';

export const metadata: Metadata = {
  title: 'Enquiry Detail',
  robots: { index: false, follow: false },
};

type PageProps = {
  params: Promise<{ enquiryId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function EnquiryDetailPage({ params, searchParams }: PageProps) {
  // Postgres is the source of truth; nothing renders from memory.
  await loadWorkspace();

  const { enquiryId } = await params;
  const query = await searchParams;

  const role = readRole();
  const companyId = readCompany(typeof query.company === 'string' ? query.company : undefined);

  const enquiry = enquiryById(enquiryId);

  if (!enquiry) {
    return (
      <AdminShell
        role={role}
        companyId={companyId}
        title="Enquiry not found"
        description="The requested enquiry was not found in the current dataset."
      >
        <ErrorState
          title="Unknown enquiry"
          body="This item may have been archived or the ID is invalid."
          backHref={companyId ? `/admin?company=${companyId}` : '/admin'}
        />
      </AdminShell>
    );
  }

  if (role === 'company_user' && companyId && companyId !== enquiry.companyId) {
    return (
      <AdminShell
        role={role}
        companyId={companyId}
        title="Access restricted"
        description="Company users can only open enquiries from their own organisation."
      >
        <ErrorState
          title="Permission boundary"
          body="Switch to your own company scope to view enquiry detail."
          backHref={`/admin?company=${companyId}`}
        />
      </AdminShell>
    );
  }

  const company = companyById(enquiry.companyId);
  const notes = getEnquiryNotes(enquiryId);
  const owners = assignableOwners();
  const timeline = timelineByEnquiry(enquiryId).map((item) => ({
    id: item.id,
    title: item.action,
    detail: item.detail,
    meta: `${item.actor} · ${formatDateTime(item.at)}`,
  }));

  return (
    <AdminShell
      role={role}
      companyId={companyId ?? enquiry.companyId}
      title={`Enquiry ${enquiry.id}`}
      description="Triage detail with timeline, AI insight summary, internal notes and action controls."
    >
      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-display-md text-ink">Case summary</h2>
            <div className="flex flex-wrap gap-2">
              <StatusPill
                label={toTitleCase(enquiry.urgency)}
                tone={urgencyTone(enquiry.urgency)}
              />
              <StatusPill
                label={toTitleCase(enquiry.status)}
                tone={enquiryStatusTone(enquiry.status)}
              />
            </div>
          </div>
          <p className="mt-3 text-sm text-ink-soft">{enquiry.summary}</p>
          <div className="mt-4 grid gap-2 text-sm text-ink-soft sm:grid-cols-2">
            <p className="rounded-lg bg-paper-lumen px-3 py-2">
              Concern: {toTitleCase(enquiry.concernType)}
            </p>
            <p className="rounded-lg bg-paper-lumen px-3 py-2">
              Status: {toTitleCase(enquiry.status)}
            </p>
            <p className="rounded-lg bg-paper-lumen px-3 py-2">Assignee: {enquiry.assignee}</p>
            <p className="rounded-lg bg-paper-lumen px-3 py-2">
              Submitted: {formatDateTime(enquiry.submittedAt)}
            </p>
            <p className="rounded-lg bg-paper-lumen px-3 py-2">
              Employee: {employeeName(enquiry.employeeId)}
            </p>
            <p className="rounded-lg bg-paper-lumen px-3 py-2">Risk score: {enquiry.riskScore}%</p>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-display-md text-ink">Admin actions</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Each action is recorded against the case with your name and the time.
          </p>

          <div className="mt-4">
            <ActionForm
              action={changeEnquiryStatus}
              submitLabel="Update status"
              consequence="Recorded against the case with your name and the time, and visible in the history below."
            >
              <input type="hidden" name="enquiryId" value={enquiry.id} />
              <AdminField label="Change status" htmlFor="enq-status">
                <select
                  id="enq-status"
                  name="status"
                  defaultValue={enquiry.status}
                  className={adminInputClasses}
                >
                  {statusOptions().map((status) => (
                    <option key={status} value={status}>
                      {toTitleCase(status)}
                    </option>
                  ))}
                </select>
              </AdminField>
            </ActionForm>
          </div>

          <div className="mt-6 border-t border-line pt-5">
            <ActionForm action={reassignEnquiry} submitLabel="Assign case" variant="secondary">
              <input type="hidden" name="enquiryId" value={enquiry.id} />
              <AdminField
                label="Assign to"
                htmlFor="enq-assignee"
                hint={`Currently ${enquiry.assignee}.`}
              >
                <select
                  id="enq-assignee"
                  name="assignee"
                  defaultValue={enquiry.assignee}
                  className={adminInputClasses}
                >
                  {owners.map((owner) => (
                    <option key={owner} value={owner}>
                      {owner}
                    </option>
                  ))}
                </select>
              </AdminField>
            </ActionForm>
          </div>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Card className="p-5">
          <h2 className="text-display-md text-ink">AI summary and suggested actions</h2>
          <p className="mt-2 text-sm text-ink-soft">{enquiry.aiSummary}</p>
          <ul className="mt-4 space-y-2 text-sm text-ink-soft">
            <li className="rounded-lg border border-line bg-paper-lumen px-3 py-2">
              Prioritise manager follow-up within 48 hours.
            </li>
            <li className="rounded-lg border border-line bg-paper-lumen px-3 py-2">
              Capture outcome notes for monthly report aggregation.
            </li>
            <li className="rounded-lg border border-line bg-paper-lumen px-3 py-2">
              Re-evaluate urgency if staffing pressure escalates.
            </li>
          </ul>
        </Card>

        <Card className="p-5">
          <h2 className="text-display-md text-ink">Status history</h2>
          <div className="mt-4">
            <Timeline items={timeline} />
          </div>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Card className="p-5">
          <h2 className="text-display-md text-ink">Internal notes</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Notes are append-only. Nothing here can be edited or removed once saved, so the record
            of who knew what, and when, stays intact.
          </p>

          <div className="mt-4">
            <ActionForm
              action={createEnquiryNote}
              submitLabel="Add note"
              consequence="Notes cannot be edited or deleted once saved. Write it as you would want it read back later."
            >
              <input type="hidden" name="enquiryId" value={enquiry.id} />
              <AdminField label="New note" htmlFor="enq-note">
                <textarea
                  id="enq-note"
                  name="content"
                  rows={3}
                  required
                  className={adminInputClasses}
                  placeholder="What did you do, and what happens next?"
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
              <EmptyState
                title="No notes yet"
                body="Add the first note when you have spoken to the manager or taken an action."
              />
            )}
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-display-md text-ink">Linked records</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Navigate without losing the case you are working on.
          </p>

          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link
                href={`/admin/companies/${enquiry.companyId}?company=${enquiry.companyId}`}
                className="block rounded-lg border border-line bg-paper-lumen px-3 py-2.5 font-semibold text-violet-800 transition hover:border-violet-300"
              >
                {company?.name ?? enquiry.companyId} — company workspace
              </Link>
            </li>
            <li>
              <Link
                href={`/admin/companies/${enquiry.companyId}?company=${enquiry.companyId}&tab=enquiries`}
                className="block rounded-lg border border-line bg-paper-lumen px-3 py-2.5 font-semibold text-violet-800 transition hover:border-violet-300"
              >
                All enquiries for this company
              </Link>
            </li>
            <li>
              <Link
                href="/admin/enquiries"
                className="block rounded-lg border border-line bg-paper-lumen px-3 py-2.5 font-semibold text-violet-800 transition hover:border-violet-300"
              >
                Back to the triage queue
              </Link>
            </li>
          </ul>

          <p className="mt-4 rounded-lg border border-line px-3 py-2 text-xs leading-relaxed text-ink-muted">
            Employee: {employeeName(enquiry.employeeId)} · Case reference {enquiry.id}
          </p>
        </Card>
      </section>
    </AdminShell>
  );
}
