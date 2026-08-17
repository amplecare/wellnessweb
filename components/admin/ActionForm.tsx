'use client';

import type { ReactNode } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import type { ActionState } from '@/app/admin/actions';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

/**
 * Wraps a workflow server action with pending state and a result message.
 *
 * Every admin mutation goes through this so staff always get the same confirmation
 * in the same place. A control that silently does nothing is worse than no control
 * at all — someone will assume the status changed and stop chasing the case.
 *
 * The server action is passed in as a prop from a server component, which is why
 * this stays generic rather than importing actions directly.
 */
export function ActionForm({
  action,
  submitLabel,
  children,
  className,
  variant = 'primary',
}: {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  submitLabel: string;
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}) {
  const [state, formAction] = useActionState<ActionState, FormData>(action, {});

  return (
    <form action={formAction} className={cn('flex flex-col gap-3', className)}>
      {children}

      <Submit label={submitLabel} variant={variant} />

      {state.error ? (
        <p
          role="alert"
          className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-800"
        >
          {state.error}
        </p>
      ) : null}

      {state.ok ? (
        // role="status" is polite — it will not interrupt someone mid-sentence.
        <p
          role="status"
          className="rounded-lg border border-mint-200 bg-mint-50 px-3 py-2 text-sm font-medium text-mint-800"
        >
          {state.ok}
        </p>
      ) : null}
    </form>
  );
}

function Submit({ label, variant }: { label: string; variant: 'primary' | 'secondary' }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="md" variant={variant} disabled={pending} className="self-start">
      {pending ? 'Saving…' : label}
    </Button>
  );
}

/** Shared field chrome, so admin forms match the public site's input styling. */
export function AdminField({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted"
      >
        {label}
      </label>
      {hint ? <p className="mt-1 text-xs text-ink-muted">{hint}</p> : null}
      <div className="mt-2">{children}</div>
    </div>
  );
}

export const adminInputClasses =
  'w-full min-h-11 rounded-lg border-2 border-line-strong bg-white px-3 py-2 text-sm text-ink transition-colors hover:border-ink-muted focus:border-violet-600 focus:outline-none';
