import Link from 'next/link';
import type { Metadata } from 'next';
import { AdminShell } from '@/components/admin/AdminShell';
import { EmptyState } from '@/components/admin/EmptyState';
import { SimpleTable, Row, Cell } from '@/components/admin/SimpleTable';
import { StatusPill } from '@/components/admin/StatusPill';
import { Card } from '@/components/ui/Card';
import {
  engagementForCompany,
  getScopedCompanies,
  reportsByCompany,
  surveyProgress,
  toTitleCase,
} from '@/lib/admin/insights';
import { readCompany, readRole } from '@/lib/admin/query';
import { loadWorkspace } from '@/lib/admin/store';
import { reportTone, stageTone, surveyTone } from '@/lib/admin/tone';

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
  title: 'Company Accounts',
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CompaniesPage({ searchParams }: PageProps) {
  // Postgres is the source of truth; nothing renders from memory.
  await loadWorkspace();

  const query = await searchParams;
  const role = readRole();
  const requestedCompanyId = readCompany(
    typeof query.company === 'string' ? query.company : undefined
  );
  const q = typeof query.q === 'string' ? query.q.toLowerCase().trim() : '';

  const scopedCompanies = getScopedCompanies(role, requestedCompanyId);
  const filtered = q
    ? scopedCompanies.filter((company) => {
        const haystack =
          `${company.name} ${company.primaryContact.name} ${company.tags.join(' ')}`.toLowerCase();
        return haystack.includes(q);
      })
    : scopedCompanies;

  return (
    <AdminShell
      role={role}
      companyId={requestedCompanyId}
      title="Company Account Management"
      description="Create, edit, archive and search company records with clear tenant boundaries and instant context switching."
    >
      <Card className="p-5">
        <form className="grid gap-3 sm:grid-cols-[1fr_auto]" action="/admin/companies" method="get">
          {requestedCompanyId ? (
            <input type="hidden" name="company" value={requestedCompanyId} />
          ) : null}
          <input
            name="q"
            defaultValue={q}
            placeholder="Search company, contact or tag"
            className="min-h-11 rounded-lg border border-line bg-white px-3 text-sm text-ink focus:border-violet-400 focus:outline-none"
          />
          <button
            type="submit"
            className="min-h-11 rounded-full bg-violet-600 px-5 text-sm font-semibold text-white hover:bg-violet-800"
          >
            Search
          </button>
        </form>

        <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink-muted">
          <span className="rounded-full border border-line px-3 py-1">Workflow: Create</span>
          <span className="rounded-full border border-line px-3 py-1">Edit</span>
          <span className="rounded-full border border-line px-3 py-1">Archive</span>
          <span className="rounded-full border border-line px-3 py-1">Tenant isolation</span>
        </div>
      </Card>

      {filtered.length ? (
        <SimpleTable
          headers={[
            'Company',
            'Status',
            'Owner',
            'Workflow stage',
            'Survey',
            'Latest report',
            'Priority',
            'Employees',
            'Primary contact',
            'Actions',
          ]}
        >
          {filtered.map((company) => {
            const tone =
              company.status === 'active'
                ? 'good'
                : company.status === 'at_risk'
                  ? 'danger'
                  : company.status === 'onboarding'
                    ? 'info'
                    : 'neutral';
            const engagement = engagementForCompany(company.id);
            const survey = surveyProgress(company.id)?.survey;
            const latestReport = [...reportsByCompany(company.id)].sort((a, b) =>
              b.createdAt.localeCompare(a.createdAt)
            )[0];

            return (
              <Row key={company.id}>
                <Cell className="font-semibold text-ink">{company.name}</Cell>
                <Cell>
                  <StatusPill label={toTitleCase(company.status)} tone={tone} />
                </Cell>
                <Cell>{company.accountOwner}</Cell>
                <Cell>
                  {engagement ? (
                    <StatusPill
                      label={toTitleCase(engagement.stage)}
                      tone={stageTone(engagement.stage)}
                    />
                  ) : (
                    <span className="text-xs text-ink-muted">Not set</span>
                  )}
                </Cell>
                <Cell>
                  {survey ? (
                    <StatusPill
                      label={toTitleCase(survey.status)}
                      tone={surveyTone(survey.status)}
                    />
                  ) : (
                    <span className="text-xs text-ink-muted">No survey</span>
                  )}
                </Cell>
                <Cell>
                  {latestReport ? (
                    <StatusPill
                      label={toTitleCase(latestReport.status)}
                      tone={reportTone(latestReport.status)}
                    />
                  ) : (
                    <span className="text-xs text-ink-muted">No report</span>
                  )}
                </Cell>
                <Cell className="nums">{company.priorityScore}</Cell>
                <Cell className="nums">{company.staffCount}</Cell>
                <Cell>
                  <p>{company.primaryContact.name}</p>
                  <p className="text-xs uppercase tracking-[0.1em] text-ink-muted">
                    {company.primaryContact.role}
                  </p>
                </Cell>
                <Cell>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/admin/companies/${company.id}?company=${company.id}&tab=overview`}
                      className="rounded-full border border-violet-300 px-3 py-1 text-xs font-semibold text-violet-700 hover:bg-violet-50"
                    >
                      Open
                    </Link>
                    <button
                      type="button"
                      className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-ink-soft"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-ink-soft"
                    >
                      {company.status === 'archived' ? 'Restore' : 'Archive'}
                    </button>
                  </div>
                </Cell>
              </Row>
            );
          })}
        </SimpleTable>
      ) : (
        <EmptyState
          title="No company accounts found"
          body="Try removing filters or searching by organisation name, manager, or service tag."
        />
      )}
    </AdminShell>
  );
}
