import { ButtonLink } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export function ErrorState({
  title,
  body,
  backHref,
}: {
  title: string;
  body: string;
  backHref: string;
}) {
  return (
    <Card className="p-8" tone="paper">
      <h3 className="text-display-md text-rose-800">{title}</h3>
      <p className="mt-2 text-sm text-ink-soft">{body}</p>
      <div className="mt-5">
        <ButtonLink href={backHref} size="md">
          Back to dashboard
        </ButtonLink>
      </div>
    </Card>
  );
}
