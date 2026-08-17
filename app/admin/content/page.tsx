import type { Metadata } from 'next';
import { AdminShell } from '@/components/admin/AdminShell';
import { EmptyState } from '@/components/admin/EmptyState';
import { KpiCard } from '@/components/admin/KpiCard';
import { SimpleTable, Row, Cell } from '@/components/admin/SimpleTable';
import { StatusPill } from '@/components/admin/StatusPill';
import { Card } from '@/components/ui/Card';
import { contentModules } from '@/content/admin/contentModules';
import { toTitleCase } from '@/lib/admin/insights';
import { readRole } from '@/lib/admin/query';
import type { ContentModuleStatus } from '@/lib/admin/types';

export const metadata: Metadata = {
  title: 'Site content',
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const statusTone: Record<ContentModuleStatus, 'good' | 'warn' | 'neutral'> = {
  live_in_code: 'good',
  needs_input: 'warn',
  planned: 'neutral',
};

const statusLabel: Record<ContentModuleStatus, string> = {
  live_in_code: 'Live (in code)',
  needs_input: 'Needs input',
  planned: 'Planned',
};

/**
 * Content management foundation.
 *
 * This screen is a map, not an editor. It shows every piece of site content, where it
 * currently lives and what is blocking it from being editable here — which is the
 * honest state of play, and is genuinely useful to the team today because it doubles
 * as the pre-launch content checklist.
 */
export default async function ContentPage({ searchParams }: PageProps) {
  const query = await searchParams;
  const role = readRole();

  // Content controls the public website. Only full admins should see this map.
  if (role !== 'admin') {
    return (
      <AdminShell
        role={role}
        title="Site content"
        description="Content modules for the public website."
      >
        <EmptyState
          title="Not available for your role"
          body="Site content is limited to full administrators, because changes here affect the public website."
        />
      </AdminShell>
    );
  }

  const live = contentModules.filter((item) => item.status === 'live_in_code');
  const needsInput = contentModules.filter((item) => item.status === 'needs_input');
  const planned = contentModules.filter((item) => item.status === 'planned');

  return (
    <AdminShell
      role={role}
      title="Site content"
      description="Every piece of copy on the public website, where it lives today, and what stands between it and being editable here."
    >
      <Card className="border-violet-200 bg-violet-50/60 p-5">
        <h2 className="text-display-md text-ink">Editing is not wired up yet</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Content is currently held in typed modules and changed by a developer. This page is the
          structure that a real editor will slot into — it is listed deliberately rather than shown
          as a working form, because an editor that silently discards changes is worse than no
          editor. Someone would update the pricing, see a success message, and believe the site had
          changed.
        </p>
      </Card>

      <section aria-labelledby="content-kpis">
        <h2 id="content-kpis" className="sr-only">
          Content summary
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <KpiCard label="Live modules" value={live.length} helper="Shipping on the site now" />
          <KpiCard
            label="Needs input"
            value={needsInput.length}
            helper="Blocked on a business decision"
          />
          <KpiCard label="Planned" value={planned.length} helper="Not built yet" />
        </div>
      </section>

      <SimpleTable headers={['Module', 'What it controls', 'Items', 'Status', 'Source']}>
        {contentModules.map((module) => (
          <Row key={module.id}>
            <Cell className="font-semibold text-ink">{module.label}</Cell>
            <Cell>
              {module.description}
              {module.blocker ? (
                <span className="mt-1.5 block text-xs italic text-ink-muted">{module.blocker}</span>
              ) : null}
            </Cell>
            <Cell className="nums">{module.itemCount ?? '—'}</Cell>
            <Cell>
              <StatusPill label={statusLabel[module.status]} tone={statusTone[module.status]} />
            </Cell>
            <Cell>
              <code className="rounded bg-paper-lumen px-1.5 py-0.5 text-xs text-ink-soft">
                {module.source}
              </code>
            </Cell>
          </Row>
        ))}
      </SimpleTable>

      <Card className="p-5">
        <h2 className="text-display-md text-ink">What making this editable requires</h2>
        <ol className="mt-3 space-y-2 text-sm text-ink-soft">
          {[
            'A database to hold the content, replacing the typed modules under content/.',
            'A draft and publish step, so a half-finished edit never appears on the live site.',
            'Per-module forms with validation — pricing is numeric, testimonials need attribution.',
            'An audit trail of who changed what, matching the one the CRM already keeps.',
            'A revalidation hook, so a published change refreshes the static pages.',
          ].map((step, index) => (
            <li
              key={step}
              className="flex gap-3 rounded-lg border border-line bg-paper-lumen px-3 py-2.5"
            >
              <span className="font-semibold text-violet-800 nums">{index + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-ink-muted">
          The information architecture above does not need to change for any of that — modules are
          already typed as {toTitleCase('content_module')} records with a status and a source.
        </p>
      </Card>
    </AdminShell>
  );
}
