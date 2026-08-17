'use client';

import type { ReactNode } from 'react';
import { useActionState, useState } from 'react';
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
  consequence,
  requireConfirm = false,
}: {
  action: (prev: ActionState, formData: FormData) => Promise<ActionState>;
  submitLabel: string;
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  /**
   * Plain-language description of what pressing the button will do, shown before
   * it is pressed. A novice admin should never have to click something to find out
   * what it does.
   */
  consequence?: string;
  /**
   * Adds a confirm step. Use only for actions that cannot be undone — marking a
   * report reviewed, logging a call as completed. Putting this on everything just
   * trains people to click through it.
   */
  requireConfirm?: boolean;
}) {
  const [state, formAction] = useActionState<ActionState, FormData>(action, {});
  const [confirming, setConfirming] = useState(false);

  // Any successful action resets the confirm step, so a second edit starts clean.
  if (state.ok && confirming) setConfirming(false);

  return (
    <form action={formAction} className={cn('flex flex-col gap-3', className)}>
      {children}

      {consequence ? (
        <p className="flex items-start gap-2 rounded-lg bg-violet-50 px-3 py-2.5 text-[0.8125rem] leading-relaxed text-ink-soft">
          <span
            aria-hidden="true"
            className="mt-1.5 size-1.5 shrink-0 rounded-full bg-violet-600"
          />
          {consequence}
        </p>
      ) : null}

      {requireConfirm && !confirming ? (
        <Button
          type="button"
          size="md"
          variant={variant}
          className="self-start"
          onClick={() => setConfirming(true)}
        >
          {submitLabel}
        </Button>
      ) : requireConfirm ? (
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-amber-600/30 bg-amber-100 px-3 py-2.5">
          <p className="text-[0.8125rem] font-medium text-amber-800">
            This cannot be undone. Go ahead?
          </p>
          <Submit label={`Yes — ${submitLabel.toLowerCase()}`} variant={variant} />
          <button
            type="button"
            onClick={() => setConfirming(false)}
            className="text-[0.8125rem] font-semibold text-ink-soft underline underline-offset-4"
          >
            Cancel
          </button>
        </div>
      ) : (
        <Submit label={submitLabel} variant={variant} />
      )}

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
