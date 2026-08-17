import Link from 'next/link';
import type { Metadata } from 'next';
import { AdminShell } from '@/components/admin/AdminShell';
import { EmptyState } from '@/components/admin/EmptyState';
import { KpiCard } from '@/components/admin/KpiCard';
import { SimpleTable, Row, Cell } from '@/components/admin/SimpleTable';
import { StatusPill } from '@/components/admin/StatusPill';
import { Card } from '@/components/ui/Card';
import {
  assignableOwners,
  companyById,
  employeeName,
  filterEnquiries,
  formatDateTime,
  kpis,
  scopedCompanyId,
  statusOptions,
  toTitleCase,
} from '@/lib/admin/insights';
import { readCompany, readRole } from '@/lib/admin/query';
import { enquiryStatusTone, urgencyTone } from '@/lib/admin/tone';
import type { ConcernType, UrgencyLevel } from '@/lib/admin/types';

export const metadata: Metadata = {
  title: 'Enquiry triage',
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const concerns: ConcernType[] = [
  'burnout',
  'absence',
  'stress',
  'engagement',
  'conflict',
  'mental_health',
  'workload',
];

const urgencies: UrgencyLevel[] = ['critical', 'high', 'medium', 'low'];

const read = (value: string | string[] | undefined): string | undefined =>
  typeof value === 'string' && value.trim() ? value.trim() : undefined;

/**
 * The triage queue: every open wellbeing case across all accessible companies.
 *
 * The company workspace answers"how is this client doing". This answers the
 * different question a support admin starts the day with —"what do I work on next"
 * — which is why it is ordered by urgency and risk rather than by company.
 */
export default async function EnquiriesPage({ searchParams }: PageProps) {
  const query = await searchParams;
  const role = readRole();
  const requestedCompanyId = readCompany(read(query.company));
  const companyId = scopedCompanyId(role, requestedCompanyId);

  const filters = {
    status: read(query.status),
    urgency: read(query.urgency),
    concern: read(query.concern),
    assignee: read(query.assignee),
    view: read(query.view) ?? 'open',
  };

  const results = filterEnquiries(role, requestedCompanyId, filters);
  const stats = kpis(role, requestedCompanyId);
  const owners = assignableOwners();

  const hasFilters = Boolean(
    filters.status || filters.urgency || filters.concern || filters.assignee
  );

  return (
    <AdminShell
      role={role}
      companyId={companyId}
      title="Enquiry triage"
      description="Every open wellbeing case in one queue, ordered by urgency then risk. Filter to find what you own, then open a case to act on it."
    >
      <section aria-labelledby="triage-kpis">
        <h2 id="triage-kpis" className="sr-only">
          Triage summary
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="Unresolved"
            value={stats.unresolved}
            helper="Not yet resolved or closed"
          />
          <KpiCard label="Urgent" value={stats.urgent} helper="High or critical urgency" />
          <KpiCard label="All enquiries" value={stats.enquiries} helper="In your current scope" />
          <KpiCard label="Average risk" value={`${stats.avgRisk}%`} helper="Across scoped cases" />
        </div>
      </section>

      <Card className="p-5">
        <h2 className="text-display-md text-ink">Filter the queue</h2>

        {/* A GET form keeps every filtered view linkable and back-button friendly —
 staff share these URLs with each other. */}
        <form action="/admin/enquiries" method="get" className="mt-4">
          {requestedCompanyId ? (
            <input type="hidden" name="company" value={requestedCompanyId} />
          ) : null}

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <Field label="Status" id="f-status">
              <select
                id="f-status"
                name="status"
                defaultValue={filters.status ?? ''}
                className={selectClasses}
              >
                <option value="">Any status</option>
                {statusOptions().map((status) => (
                  <option key={status} value={status}>
                    {toTitleCase(status)}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Urgency" id="f-urgency">
              <select
                id="f-urgency"
                name="urgency"
                defaultValue={filters.urgency ?? ''}
                className={selectClasses}
              >
                <option value="">Any urgency</option>
                {urgencies.map((level) => (
                  <option key={level} value={level}>
                    {toTitleCase(level)}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Concern" id="f-concern">
              <select
                id="f-concern"
                name="concern"
                defaultValue={filters.concern ?? ''}
                className={selectClasses}
              >
                <option value="">Any concern</option>
                {concerns.map((concern) => (
                  <option key={concern} value={concern}>
                    {toTitleCase(concern)}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Assignee" id="f-assignee">
              <select
                id="f-assignee"
                name="assignee"
                defaultValue={filters.assignee ?? ''}
                className={selectClasses}
              >
                <option value="">Anyone</option>
                {owners.map((owner) => (
                  <option key={owner} value={owner}>
                    {owner}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Include" id="f-view">
              <select id="f-view" name="view" defaultValue={filters.view} className={selectClasses}>
                <option value="open">Open cases only</option>
                <option value="all">All, including closed</option>
              </select>
            </Field>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="min-h-11 rounded-lg bg-violet-600 px-4 text-sm font-semibold text-white transition hover:bg-violet-800"
            >
              Apply filters
            </button>
            {hasFilters || filters.view !== 'open' ? (
              <Link
                href={requestedCompanyId ? `/admin/enquiries?company=${requestedCompanyId}` : '/admin/enquiries'}
                className="text-sm font-semibold text-violet-700 underline decoration-violet-300 underline-offset-4"
              >
                Clear filters
              </Link>
            ) : null}
            <p className="text-sm text-ink-muted" aria-live="polite">
              {results.length} {results.length === 1 ? 'case' : 'cases'}
            </p>
          </div>
        </form>
      </Card>

      {results.length ? (
        <SimpleTable
          headers={[
            'Submitted',
            'Company',
            'Employee',
            'Concern',
            'Urgency',
            'Risk',
            'Status',
            'Assignee',
            '',
          ]}
        >
          {results.map((enquiry) => {
            const company = companyById(enquiry.companyId);
            return (
              <Row key={enquiry.id}>
                <Cell className="whitespace-nowrap">{formatDateTime(enquiry.submittedAt)}</Cell>
                <Cell>
                  <Link
                    href={`/admin/companies/${enquiry.companyId}?company=${enquiry.companyId}`}
                    className="font-semibold text-violet-800 underline decoration-violet-300 underline-offset-4"
                  >
                    {company?.name ?? enquiry.companyId}
                  </Link>
                </Cell>
                <Cell>{employeeName(enquiry.employeeId)}</Cell>
                <Cell>{toTitleCase(enquiry.concernType)}</Cell>
                <Cell>
                  <StatusPill
                    label={toTitleCase(enquiry.urgency)}
                    tone={urgencyTone(enquiry.urgency)}
                  />
                </Cell>
                <Cell className="nums">{enquiry.riskScore}%</Cell>
                <Cell>
                  <StatusPill
                    label={toTitleCase(enquiry.status)}
                    tone={enquiryStatusTone(enquiry.status)}
                  />
                </Cell>
                <Cell>{enquiry.assignee}</Cell>
                <Cell>
                  <Link
                    href={`/admin/enquiries/${enquiry.id}?company=${enquiry.companyId}`}
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
          title={hasFilters ? 'Nothing matches those filters' : 'No open cases'}
          body={
            hasFilters
              ? 'Try clearing a filter, or switch to include closed cases.'
              : 'Every wellbeing case in your scope is resolved or closed. New enquiries will appear here.'
          }
        />
      )}
    </AdminShell>
  );
}

const selectClasses =
  'w-full min-h-11 rounded-lg border-2 border-line-strong bg-white px-3 text-sm text-ink transition-colors hover:border-ink-muted focus:border-violet-600 focus:outline-none';

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted"
      >
        {label}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
