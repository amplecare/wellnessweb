import { Card } from '@/components/ui/Card';

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <Card className="p-8 text-center" tone="warm">
      <h3 className="text-display-md text-ink">{title}</h3>
      <p className="mt-2 text-sm text-ink-soft">{body}</p>
    </Card>
  );
}
