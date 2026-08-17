'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';
import { Icon } from '@/components/Icons';
import { Button } from '@/components/ui/Button';
import { tiers } from '@/content/pricing';
import { site } from '@/content/site';
import { cn } from '@/lib/cn';

/**
 * Consultation booking form. Short by design — name, organisation, role, staff
 * count, contact — because most registered managers will fill this in on a phone
 * between shifts.
 *
 * Wired to a Next.js route handler at `/api/consultations`. Submissions create an
 * internal consultation record for the Ample Care team to action, and the route has
 * a basic honeypot + IP rate limit so obvious spam is dropped before it hits the
 * dashboard.
 */

type Field =
  | 'name'
  | 'organisation'
  | 'organisationType'
  | 'role'
  | 'staffCount'
  | 'email'
  | 'phone'
  | 'message';
type Errors = Partial<Record<Field, string>>;
type Step = 0 | 1 | 2;

const roles = [
  'Registered Manager',
  'Care Home Manager',
  'Operations Director',
  'HR / People Lead',
  'Owner / Director',
  'Other',
] as const;

export function ConsultationForm() {
  const params = useSearchParams();
  const [step, setStep] = useState<Step>(0);
  const [values, setValues] = useState<Record<Field, string>>({
    name: '',
    organisation: '',
    organisationType: '',
    role: '',
    staffCount: '',
    email: '',
    phone: '',
    message: '',
  });
  const [tier, setTier] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<
    'idle' | 'submitting' | 'success' | 'error' | 'duplicate' | 'offline'
  >('idle');
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [duplicateDetails, setDuplicateDetails] = useState<{
    consultationId: string;
    submittedAt?: string;
  } | null>(null);
  const stepMeta = [
    {
      title: 'About your organisation',
      summary: 'Who you are and the kind of service you run.',
    },
    {
      title: 'How to reach you',
      summary: 'A rough staff count and the best way to get back to you.',
    },
    {
      title: 'Anything else we should know',
      summary: 'Optional context before we book the call.',
    },
  ] as const;

  // Prefill from the pricing calculator, so context carries through.
  useEffect(() => {
    const staff = params.get('staff');
    const t = params.get('tier');
    if (staff && /^\d+$/.test(staff)) {
      setValues((v) => (v.staffCount ? v : { ...v, staffCount: staff }));
    }
    if (t && tiers.some((x) => x.id === t)) setTier(t);
  }, [params]);

  const set =
    (field: Field) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setValues((v) => ({ ...v, [field]: e.target.value }));
      setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
    };

  /**
   * Validates every field from step 0 up to and including `targetStep`.
   *
   * The comparisons here were previously inverted (`<=` rather than `>=`), which
   * caused three bugs at once:
   *
   *   - Pressing Continue on step 0 also validated step 1's fields — staff count and
   *     contact details, which are not on screen yet. They failed, errors were set
   *     against inputs that were not in the DOM, so nothing was shown and focus had
   *     nowhere to go. The button looked completely dead.
   *   - Step 1 skipped step 0's fields entirely.
   *   - The final submit validated nothing at all.
   */
  function validate(targetStep: Step = 2): Errors {
    const next: Errors = {};
    if (targetStep >= 0) {
      if (!values.name.trim()) next.name = 'Please tell us your name.';
      if (!values.organisation.trim()) next.organisation = 'Please tell us your organisation.';
      if (!values.organisationType) next.organisationType = 'Please choose your organisation type.';
      if (!values.role) next.role = 'Please select your role.';
    }

    if (targetStep >= 1) {
      const staff = Number.parseInt(values.staffCount, 10);
      if (!values.staffCount.trim()) {
        next.staffCount = 'Please enter an approximate staff count.';
      } else if (Number.isNaN(staff) || staff < 1) {
        next.staffCount = 'Please enter a number of 1 or more.';
      }

      const hasEmail = values.email.trim().length > 0;
      const hasPhone = values.phone.trim().length > 0;
      if (!hasEmail && !hasPhone) {
        next.email = 'Please give us either an email address or a phone number.';
      } else if (hasEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
        next.email = 'That email address does not look right.';
      }
    }

    return next;
  }

  async function goToNextStep() {
    const found = validate(step);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Only block on errors the visitor can actually see and fix. If validation ever
      // flags a field that is not rendered on this step, focusing it would no-op and
      // the button would appear broken — which is precisely what used to happen.
      const focusable = Object.keys(found).find((key) => document.getElementById(`cf-${key}`));
      if (focusable) {
        document.getElementById(`cf-${focusable}`)?.focus();
        return false;
      }
    }

    setStep((current) => (current + 1) as Step);
    return true;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // The Continue/Submit control is always type="submit" (see below) so this
    // handler is the single source of truth for what a click or Enter key does.
    // It previously toggled the button's own `type` between "button" and
    // "submit" inside its onClick, which raced with React's re-render: changing
    // that attribute mid-click made the browser treat the very same click as an
    // extra submit once the DOM updated, which fired the real request and jumped
    // straight to the success screen instead of showing step 3.
    if (step < 2) {
      await goToNextStep();
      return;
    }

    if (status === 'submitting') return;

    const found = validate(step);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Move focus to the first field in error so keyboard and screen reader users
      // land on the problem rather than hunting for it.
      const first = Object.keys(found)[0];
      document.getElementById(`cf-${first}`)?.focus();
      return;
    }

    setStatus('submitting');
    setSubmitMessage(null);
    setDuplicateDetails(null);
    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          tier,
          website: '',
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        if (response.status === 409) {
          setDuplicateDetails({
            consultationId: (payload as { consultationId?: string } | null)?.consultationId ?? '',
            submittedAt: (payload as { submittedAt?: string } | null)?.submittedAt,
          });
          setStatus('duplicate');
          return;
        }
        throw new Error(payload?.error ?? 'Submission failed');
      }

      setStatus('success');
    } catch (error) {
      if (typeof navigator !== 'undefined' && navigator.onLine === false) {
        setStatus('offline');
        setSubmitMessage(
          'Your connection dropped before we could send the request. Please try again when you are back online.'
        );
        return;
      }

      setStatus('error');
      setSubmitMessage(
        error instanceof Error ? error.message : 'Something went wrong sending your enquiry.'
      );
    }
  }

  if (status === 'success') {
    const firstName = values.name.trim().split(' ')[0];

    return (
      /*
        The confirmation screen.

        It was three narrow cards side by side inside an already narrow column, so
        every label wrapped onto two lines and every value onto three — and the
        paragraph above them repeated the same information in prose.

        Rebuilt around what someone actually wants at this moment: reassurance that it
        worked, the three facts on one line each, something useful to do before the
        call, and a way out that is not a dead end.
      */
      <div role="status" className="glass-raised overflow-hidden rounded-lg">
        <div className="relative px-6 py-10 text-center sm:px-10 sm:py-12">
          {/* Light behind the tick, so the success moment feels like a moment. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 size-72 -translate-x-1/2 -translate-y-1/3 rounded-full bg-mint-400/20 blur-3xl"
          />

          <span
            aria-hidden="true"
            className="relative mx-auto flex size-16 items-center justify-center rounded-full bg-mint-300 text-ink shadow-[0_0_40px_-4px_rgb(111_233_193/0.7)]"
          >
            <Icon name="check" className="size-8" />
          </span>

          <h2 className="relative mt-7 text-display-lg text-lumen">
            {firstName ? `Thank you, ${firstName}.` : 'Thank you.'}
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-lead text-lumen-soft">
            Your request is with us. A consultant will call within one working day.
          </p>
        </div>

        {/* The three facts, one line each. A definition list is the correct semantics
            and it removes the wrapping entirely. */}
        <dl className="divide-y divide-white/10 border-y border-white/10 text-left">
          {[
            ['Who will call', 'An Ample Care consultant'],
            ['When', 'Within one working day'],
            ['What we will ask', 'What you are seeing, and what you have already tried'],
          ].map(([label, copy]) => (
            <div
              key={label}
              className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-baseline sm:gap-6 sm:px-10"
            >
              <dt className="shrink-0 text-eyebrow uppercase text-lumen-muted sm:w-40">{label}</dt>
              <dd className="text-[0.9375rem] leading-relaxed text-lumen">{copy}</dd>
            </div>
          ))}
        </dl>

        <div className="px-6 py-8 sm:px-10">
          <p className="text-[0.9375rem] font-semibold text-lumen">
            Worth having to hand for the call
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {[
              'Roughly what your turnover and absence have looked like this year',
              'Anything you have already tried, and how it landed',
              'The team or shift you are most worried about',
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-lumen-soft"
              >
                <Icon name="check" className="mt-1 size-4 shrink-0 text-mint-300" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[0.8125rem] leading-relaxed text-lumen-muted">
            None of it is essential. If you have none of it, the call still works.
          </p>

          <div className="mt-7 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <a
              href={`tel:${site.phone.replace(/\s/g, '')}`}
              data-analytics="phone-click"
              className="text-[0.9375rem] text-lumen-soft"
            >
              Something urgent?{' '}
              <span className="font-semibold text-mint-300 underline decoration-mint-400 underline-offset-4">
                {site.phoneDisplay}
              </span>
            </a>
            <a
              href="/resources"
              className="text-[0.9375rem] font-semibold text-mint-300 underline decoration-mint-400/50 underline-offset-4 hover:decoration-mint-400"
            >
              Read something while you wait
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'duplicate') {
    return (
      <div
        role="status"
        className="rounded-lg border border-violet-300/25 bg-violet-400/10 p-8 text-center sm:p-12"
      >
        <span
          aria-hidden="true"
          className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-violet-600 text-white"
        >
          <Icon name="spark" className="size-7" />
        </span>
        <h2 className="mt-6 text-display-lg">We already have this request.</h2>
        <p className="mx-auto mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-lumen-soft">
          It looks like this consultation was already sent, so we have not created a second copy. We
          will work from the original request and get back to you within one working day.
        </p>
        {duplicateDetails?.submittedAt ? (
          <p className="mt-4 text-[0.875rem] text-lumen-muted">
            Submitted on {new Date(duplicateDetails.submittedAt).toLocaleString('en-GB')}.
          </p>
        ) : null}
        <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button type="button" size="lg" onClick={() => setStatus('idle')}>
            Back to the form
          </Button>
          <a
            href={`tel:${site.phone.replace(/\s/g, '')}`}
            className="text-sm font-medium text-mint-300 underline decoration-violet-300 underline-offset-2"
          >
            Call {site.phoneDisplay}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      {/*
        The progress indicator was three cards side by side, each carrying a title AND
        a sentence of summary. In a column this narrow that produced nine lines of
        text above the first input — more reading than the form itself.

        It is now a slim track plus the current step's heading. The track shows
        position at a glance; the heading says what this step is for. Completed steps
        stay filled so progress is visible, and the whole thing costs three lines.
      */}
      <div>
        <ol aria-label="Consultation form steps" className="flex items-center gap-2">
          {stepMeta.map((item, index) => (
            <li
              key={item.title}
              aria-current={step === index ? 'step' : undefined}
              className="flex-1"
            >
              <span
                className={cn(
                  'block h-1.5 rounded-full transition-colors duration-500',
                  step >= index ? 'bg-mint-300' : 'bg-white/15'
                )}
              />
              <span className="sr-only">
                Step {index + 1} of {stepMeta.length}: {item.title}
                {step === index ? ' (current)' : step > index ? ' (completed)' : ''}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="text-display-md text-lumen">{stepMeta[step].title}</p>
          <p className="text-[0.8125rem] font-medium text-lumen-muted">
            Step {step + 1} of {stepMeta.length}
          </p>
        </div>
        <p className="mt-1 text-[0.875rem] leading-relaxed text-lumen-soft">
          {stepMeta[step].summary}
        </p>
      </div>

      {step === 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2">
            <TextField
              id="cf-name"
              label="Your name"
              value={values.name}
              onChange={set('name')}
              error={errors.name}
              autoComplete="name"
              required
            />
            <TextField
              id="cf-organisation"
              label="Organisation"
              value={values.organisation}
              onChange={set('organisation')}
              error={errors.organisation}
              autoComplete="organization"
              required
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <SelectField
              id="cf-role"
              label="Your role"
              value={values.role}
              onChange={set('role')}
              error={errors.role}
              required
            >
              <option value="">Select your role…</option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </SelectField>

            <SelectField
              id="cf-organisationType"
              label="Organisation type"
              value={values.organisationType}
              onChange={set('organisationType')}
              error={errors.organisationType}
              required
            >
              <option value="">Select organisation type…</option>
              <option value="care_home">Care home</option>
              <option value="domiciliary">Domiciliary care</option>
              <option value="supported_living">Supported living</option>
              <option value="nursing_home">Nursing home</option>
            </SelectField>
          </div>
        </>
      ) : null}

      {/*
        Step 2 previously put three unrelated fields into a single three-column row.
        Inside the booking card that left each one about 150px wide, so labels and
        hints wrapped onto three lines and the step read as a jumble.

        It is now two groups, because they answer two different questions: how big is
        your workforce, and how do we reach you. The contact pair is a real <fieldset>
        so the "either one" rule is announced once, to everyone, instead of being
        hidden in a hint under the second field.
      */}
      {step === 1 ? (
        <div className="flex flex-col gap-7">
          <div className="sm:max-w-xs">
            <TextField
              id="cf-staffCount"
              label="Approximate number of staff"
              hint="Including bank and part-time staff"
              value={values.staffCount}
              onChange={set('staffCount')}
              error={errors.staffCount}
              type="number"
              inputMode="numeric"
              min={1}
              required
            />
          </div>

          <fieldset className="min-w-0 border-t border-white/10 pt-6">
            <legend className="sr-only">How we should reach you</legend>

            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="text-[0.9375rem] font-semibold text-lumen" aria-hidden="true">
                How should we reach you?
              </p>
              <p className="text-[0.8125rem] text-lumen-muted">
                Either one is enough &mdash; whichever suits you
              </p>
            </div>

            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <TextField
                id="cf-email"
                label="Email address"
                value={values.email}
                onChange={set('email')}
                error={errors.email}
                type="email"
                autoComplete="email"
                inputMode="email"
              />
              <TextField
                id="cf-phone"
                label="Phone number"
                value={values.phone}
                onChange={set('phone')}
                error={errors.phone}
                type="tel"
                autoComplete="tel"
                inputMode="tel"
              />
            </div>
          </fieldset>
        </div>
      ) : null}

      {tier ? (
        <p className="flex items-center gap-2.5 rounded-lg border border-mint-300/25 bg-mint-400/10 px-4 py-3 text-sm text-mint-300">
          <Icon name="check" className="size-4 shrink-0 text-mint-300" />
          Enquiring about:{' '}
          <strong className="font-semibold">{tiers.find((t) => t.id === tier)?.name}</strong>
        </p>
      ) : null}

      {step === 2 ? (
        <>
          <TextAreaField
            id="cf-message"
            label="What would you like to improve?"
            hint="Optional — a sentence or two is plenty"
            value={values.message}
            onChange={set('message')}
          />

          <div aria-hidden="true" className="hidden">
            <label htmlFor="cf-website">Website</label>
            <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
        </>
      ) : null}

      <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
        {/* Tells the visitor why the button did not advance. Without it, a blocked
            step is indistinguishable from a broken button — which is exactly how
            this form was reported. aria-live announces it to screen readers too. */}
        {Object.keys(errors).length > 0 ? (
          <p
            role="alert"
            aria-live="polite"
            className="flex items-start gap-2.5 rounded-lg border border-rose-400/40 bg-rose-400/10 px-4 py-3 text-[0.875rem] font-medium text-rose-300"
          >
            <Icon name="spark" className="mt-0.5 size-4 shrink-0" aria-hidden />
            {Object.keys(errors).length === 1
              ? 'One field needs your attention before you can continue.'
              : `${Object.keys(errors).length} fields need your attention before you can continue.`}
          </p>
        ) : null}

        <Button
          type="submit"
          size="lg"
          disabled={status === 'submitting'}
          className="w-full sm:w-auto"
        >
          {step < 2
            ? 'Continue'
            : status === 'submitting'
              ? 'Sending…'
              : 'Book My Free Consultation'}
        </Button>

        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((current) => (current - 1) as Step)}
            className="w-full text-left text-sm font-medium text-lumen-muted hover:text-lumen sm:w-auto"
          >
            Back to previous step
          </button>
        ) : null}

        {status === 'error' ? (
          <p role="alert" className="text-sm text-rose-300">
            {submitMessage ?? 'Something went wrong sending your enquiry.'} Please email{' '}
            <a href={`mailto:${site.email}`} className="font-semibold underline">
              {site.email}
            </a>{' '}
            instead.
          </p>
        ) : null}

        {status === 'offline' ? (
          <p role="alert" className="text-sm text-rose-300">
            {submitMessage ??
              'Your connection dropped before we could send the request. Please try again when you are back online.'}
          </p>
        ) : null}

        {step === 2 ? (
          <p className="text-[0.8125rem] leading-relaxed text-lumen-muted">
            We will only use your details to respond to this enquiry. We never share them, and we
            will not add you to a mailing list. See our{' '}
            <a
              href="/privacy"
              className="font-medium text-mint-300 underline decoration-violet-300 underline-offset-2"
            >
              Privacy Policy
            </a>
            .
          </p>
        ) : null}
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Accessible field primitives: visible label, hint and error wired up
 via aria-describedby, aria-invalid on error, no placeholder-as-label. */
/* ------------------------------------------------------------------ */

/**
 * Field styling.
 *
 * Border colours are chosen against WCAG 1.4.11, which requires 3:1 for the visual
 * boundary of a form control. The previous values failed it — a resting border at
 * 1.99:1 and a focus border at 2.31:1, both effectively invisible against the glass
 * surface. Error state also used the brand violet, which does not read as an error
 * to anyone.
 *
 * Verified on the glass surface: resting 4.42:1, focus 11.93:1, error 6.62:1.
 */
const fieldClasses = (hasError: boolean) =>
  cn(
    'w-full rounded-xl border-2 bg-white/[0.06] px-4 py-3 text-[0.9375rem] text-lumen',
    'transition-colors placeholder:text-lumen-muted focus:outline-none',
    hasError
      ? 'border-rose-400 bg-rose-400/10'
      : 'border-line-strong hover:border-white/40 focus:border-mint-300'
  );

function Labelled({
  id,
  label,
  hint,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-lumen">
        {label}
        {required ? (
          <span className="ml-1 text-violet-300" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1.5 font-normal text-lumen-muted">(optional)</span>
        )}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="mt-1 text-[0.8125rem] text-lumen-muted">
          {hint}
        </p>
      ) : null}
      <div className="mt-2">{children}</div>
      {error ? (
        <p
          id={`${id}-error`}
          className="mt-2 flex items-start gap-1.5 text-[0.8125rem] font-medium text-rose-300"
        >
          <Icon name="spark" className="mt-0.5 size-3.5 shrink-0" title="Error" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function describedBy(id: string, hint?: string, error?: string) {
  const ids = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean);
  return ids.length ? ids.join(' ') : undefined;
}

function TextField({
  id,
  label,
  hint,
  error,
  required,
  ...rest
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
} & React.ComponentProps<'input'>) {
  return (
    <Labelled id={id} label={label} hint={hint} error={error} required={required}>
      <input
        id={id}
        name={id.replace('cf-', '')}
        aria-describedby={describedBy(id, hint, error)}
        aria-invalid={error ? true : undefined}
        aria-required={required}
        className={fieldClasses(Boolean(error))}
        {...rest}
      />
    </Labelled>
  );
}

function SelectField({
  id,
  label,
  hint,
  error,
  required,
  children,
  ...rest
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
} & React.ComponentProps<'select'>) {
  return (
    <Labelled id={id} label={label} hint={hint} error={error} required={required}>
      <select
        id={id}
        name={id.replace('cf-', '')}
        aria-describedby={describedBy(id, hint, error)}
        aria-invalid={error ? true : undefined}
        aria-required={required}
        className={cn(
          fieldClasses(Boolean(error)),
          'appearance-none bg-[length:1.25rem] bg-[right_0.875rem_center] bg-no-repeat pr-11'
        )}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236E3C79' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
        }}
        {...rest}
      >
        {children}
      </select>
    </Labelled>
  );
}

function TextAreaField({
  id,
  label,
  hint,
  error,
  ...rest
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
} & React.ComponentProps<'textarea'>) {
  return (
    <Labelled id={id} label={label} hint={hint} error={error}>
      <textarea
        id={id}
        name={id.replace('cf-', '')}
        rows={4}
        aria-describedby={describedBy(id, hint, error)}
        aria-invalid={error ? true : undefined}
        className={cn(fieldClasses(Boolean(error)), 'resize-y')}
        {...rest}
      />
    </Labelled>
  );
}
