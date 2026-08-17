import Link from 'next/link';
import type { Metadata } from 'next';
import { reviewReportAction } from '@/app/admin/actions';
import { ActionForm, AdminField, adminInputClasses } from '@/components/admin/ActionForm';
import { AdminShell } from '@/components/admin/AdminShell';
import { EmptyState } from '@/components/admin/EmptyState';
import { ErrorState } from '@/components/admin/ErrorState';
import { StatusPill } from '@/components/admin/StatusPill';
import { TrendBars } from '@/components/admin/TrendBars';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { companyById, formatDateTime, reportById, toTitleCase } from '@/lib/admin/insights';
import { readCompany, readRole } from '@/lib/admin/query';
import { loadWorkspace } from '@/lib/admin/store';

export const metadata: Metadata = {
  title: 'Client Report',
  robots: { index: false, follow: false },
};

type PageProps = {
  params: Promise<{ reportId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ReportDetailPage({ params, searchParams }: PageProps) {
  // Postgres is the source of truth; nothing renders from memory.
  await loadWorkspace();

  const { reportId } = await params;
  const query = await searchParams;

  const role = readRole();
  const companyId = readCompany(typeof query.company === 'string' ? query.company : undefined);

  const report = reportById(reportId);

  if (!report) {
    return (
      <AdminShell
        role={role}
        companyId={companyId}
        title="Report not found"
        description="The requested report record is unavailable in the current dataset."
      >
        <ErrorState
          title="Unknown report"
          body="Check the report ID or return to the dashboard overview."
          backHref={companyId ? `/admin?company=${companyId}` : '/admin'}
        />
      </AdminShell>
    );
  }

  const company = companyById(report.companyId);

  if (role === 'company_user' && companyId && companyId !== report.companyId) {
    return (
      <AdminShell
        role={role}
        companyId={companyId}
        title="Access restricted"
        description="Company users can only open reports for their own organisation."
      >
        <ErrorState
          title="Permission boundary"
          body="Switch scope to your own company to view report outputs."
          backHref={`/admin?company=${companyId}`}
        />
      </AdminShell>
    );
  }

  return (
    <AdminShell
      role={role}
      companyId={report.companyId}
      title={`${company?.name ?? 'Company'} report`}
      description="Downloadable report view with headline trends, risk profile and recommended actions."
    >
      <Card className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
              {report.periodLabel}
            </p>
            <h2 className="mt-2 text-display-lg text-ink">{report.headline}</h2>
            <p className="mt-2 text-sm text-ink-soft">
              Generated {formatDateTime(report.createdAt)}
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="md">Download PDF</Button>
            <Button size="md" variant="secondary">
              Export CSV
            </Button>
          </div>
        </div>
      </Card>

      <section className="grid gap-4 xl:grid-cols-3">
        <Card className="p-5 xl:col-span-2">
          <h2 className="text-display-md text-ink">Risk profile</h2>
          <p className="mt-1 text-sm text-ink-soft">
            Aggregated signal scores from enquiry frequency and urgency over time.
          </p>
          <div className="mt-4">
            <TrendBars
              max={100}
              items={[
                { label: 'Burnout risk', value: report.burnoutRisk },
                { label: 'Absence risk', value: report.absenceRisk },
                { label: 'Engagement score', value: report.engagementScore },
              ]}
            />
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-display-md text-ink">Report status</h2>
          <p className="mt-2 text-sm text-ink-soft">{toTitleCase(report.status)}</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
            Report readiness
          </p>
          <div className="mt-2 h-2 rounded-full bg-violet-100">
            <div
              className="h-2 rounded-full bg-violet-600"
              style={{
                width:
                  report.status === 'ready'
                    ? '100%'
                    : report.status === 'processing'
                      ? '65%'
                      : report.status === 'queued'
                        ? '30%'
                        : '100%',
              }}
            />
          </div>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Card className="p-5">
          <h2 className="text-display-md text-ink">Key risks detected</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            {report.keyRisks.map((risk) => (
              <li key={risk} className="rounded-lg border border-line bg-paper-lumen px-3 py-2">
                {risk}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5">
          <h2 className="text-display-md text-ink">Recommended actions</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            {report.recommendations.map((action) => (
              <li key={action} className="rounded-lg border border-line bg-paper-lumen px-3 py-2">
                {action}
              </li>
            ))}
          </ul>
        </Card>
      </section>

      {report.themes?.length ? (
        <Card className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-display-md text-ink">Theme breakdown</h2>
              <p className="mt-1 text-sm text-ink-soft">
                What the analysis found against each wellbeing theme
                {report.basedOnResponses
                  ? `, drawn from ${report.basedOnResponses} staff responses`
                  : ''}
                .
              </p>
            </div>
          </div>

          <ul className="mt-4 space-y-3">
            {report.themes.map((theme) => (
              <li key={theme.concern} className="rounded-lg border border-line bg-paper-lumen p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-ink">{toTitleCase(theme.concern)}</h3>
                  <div className="flex items-center gap-2">
                    {theme.changeFromPrevious !== undefined ? (
                      // A negative change is an improvement for pressure themes, so the
                      // arrow describes direction and the label says what it means —
                      // colour alone would be ambiguous here.
                      <StatusPill
                        label={`${theme.changeFromPrevious > 0 ? '+' : ''}${theme.changeFromPrevious} vs last`}
                        tone={theme.changeFromPrevious > 0 ? 'warn' : 'good'}
                      />
                    ) : null}
                    <span className="text-sm font-semibold text-ink nums">{theme.score}</span>
                  </div>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-violet-100">
                  <div
                    className="h-full rounded-full bg-violet-600"
                    style={{ width: `${theme.score}%` }}
                  />
                </div>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{theme.summary}</p>
              </li>
            ))}
          </ul>
        </Card>
      ) : null}

      <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Card className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h2 className="text-display-md text-ink">Internal review</h2>
            <StatusPill
              label={report.reviewedBy ? 'Reviewed' : 'Not reviewed'}
              tone={report.reviewedBy ? 'good' : 'danger'}
            />
          </div>
          <p className="mt-1 text-sm text-ink-soft">
            A consultant reads the analysis before it is taken to the provider. The generated
            findings are a starting point, not something to read out unchecked.
          </p>

          {report.reviewedBy ? (
            <div className="mt-4 rounded-lg border border-mint-200 bg-mint-50 p-3">
              <p className="text-sm leading-relaxed text-mint-800">{report.consultantNotes}</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.1em] text-mint-800">
                {report.reviewedBy}
                {report.reviewedAt ? ` · ${formatDateTime(report.reviewedAt)}` : ''}
              </p>
            </div>
          ) : (
            <div className="mt-4">
              <ActionForm
                action={reviewReportAction}
                submitLabel="Mark as reviewed"
                consequence="Saves your notes against this report, records you as the reviewer, and moves the client to Report reviewed so the follow-up call shows on the worklist."
                requireConfirm
              >
                <input type="hidden" name="reportId" value={report.id} />
                <AdminField
                  label="Your reading of this report"
                  htmlFor="review-notes"
                  hint="What should the consultant lead with, and what needs handling carefully?"
                >
                  <textarea
                    id="review-notes"
                    name="consultantNotes"
                    rows={5}
                    required
                    className={adminInputClasses}
                    placeholder="e.g. Lead with the night-team finding — they already suspect it. The engagement gap by length of service will be the surprise."
                  />
                </AdminField>
              </ActionForm>
            </div>
          )}
        </Card>

        <Card className="p-5">
          <h2 className="text-display-md text-ink">To recommend on the call</h2>
          <p className="mt-1 text-sm text-ink-soft">
            What the consultant intends to propose, in the order they intend to raise it.
          </p>
          {report.followUpRecommendations?.length ? (
            <ol className="mt-4 space-y-2">
              {report.followUpRecommendations.map((item, index) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-lg border border-line bg-paper-lumen px-3 py-2.5 text-sm text-ink-soft"
                >
                  <span className="font-semibold text-violet-800 nums">{index + 1}.</span>
                  {item}
                </li>
              ))}
            </ol>
          ) : (
            <EmptyState
              title="Nothing drafted yet"
              body="Follow-up recommendations are added during internal review, before the client call."
            />
          )}

          <Link
            href={`/admin/companies/${report.companyId}?company=${report.companyId}&tab=followup`}
            className="mt-4 inline-block text-sm font-semibold text-violet-700 underline decoration-violet-300 underline-offset-4"
          >
            Go to the follow-up call
          </Link>
        </Card>
      </section>

      <Card className="p-5">
        <Link
          href={`/admin/companies/${report.companyId}?company=${report.companyId}&tab=reports`}
          className="text-sm font-semibold text-violet-700 underline decoration-violet-300 underline-offset-4"
        >
          Return to company reports
        </Link>
      </Card>
    </AdminShell>
  );
}
