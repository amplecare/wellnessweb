'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Icon } from '@/components/Icons';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { login, type LoginState } from './actions';

const fieldClasses = cn(
  'w-full rounded-xl border-2 border-line-strong bg-white px-4 py-3 text-[0.9375rem] text-ink',
  'transition-colors placeholder:text-ink-muted focus:border-violet-700 focus:outline-none'
);

function SubmitButton() {
  // useFormStatus must be read from inside the form it describes.
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? 'Signing in…' : 'Sign in'}
    </Button>
  );
}

export function LoginForm({ next }: { next: string }) {
  const [state, formAction] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <input type="hidden" name="next" value={next} />

      {state.error ? (
        <p
          // Announced to screen readers when it appears, and focus is not stolen.
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border-2 border-violet-700 bg-violet-50 px-4 py-3 text-sm font-medium text-ink"
        >
          <Icon name="lock" className="mt-0.5 size-4 shrink-0" />
          {state.error}
        </p>
      ) : null}

      <div>
        <label htmlFor="admin-email" className="block text-sm font-semibold text-ink">
          Email address
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          autoComplete="username"
          inputMode="email"
          required
          autoFocus
          className={cn(fieldClasses, 'mt-2')}
        />
      </div>

      <div>
        <label htmlFor="admin-password" className="block text-sm font-semibold text-ink">
          Password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={cn(fieldClasses, 'mt-2')}
        />
      </div>

      <SubmitButton />
    </form>
  );
}
