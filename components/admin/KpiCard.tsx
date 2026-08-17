import { Card } from '@/components/ui/Card';

export function KpiCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string | number;
  helper?: string;
}) {
  return (
    <Card className="p-5 sm:p-6" tone="paper">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-ink nums">{value}</p>
      {helper ? <p className="mt-2 text-sm text-ink-soft">{helper}</p> : null}
    </Card>
  );
}
