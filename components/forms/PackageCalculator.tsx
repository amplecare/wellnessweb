'use client';

import { useId, useMemo, useState } from 'react';
import { Icon } from '@/components/Icons';
import { ButtonLink } from '@/components/ui/Button';
import { estimate, tiers } from '@/content/pricing';
import { cn } from '@/lib/cn';

const MIN_STAFF = 1;
const MAX_STAFF = 2000;

/**
 * Staff-count calculator. Produces an indicative figure and routes the chosen
 * inputs into the consultation booking flow via query params, so the enquiry
 * arrives with context already attached.
 */
export function PackageCalculator() {
  const [staffRaw, setStaffRaw] = useState('60');
  const [tierId, setTierId] = useState(tiers.find((t) => t.featured)?.id ?? tiers[0].id);

  const sliderId = useId();
  const inputId = useId();
  const resultId = useId();

  const staffCount = useMemo(() => {
    const n = Number.parseInt(staffRaw, 10);
    if (Number.isNaN(n)) return 0;
    return Math.min(Math.max(n, 0), MAX_STAFF);
  }, [staffRaw]);

  const tier = tiers.find((t) => t.id === tierId) ?? tiers[0];
  const isValid = staffCount >= MIN_STAFF;
  const { gross, discount, total, band } = estimate(staffCount, tier);

  const gbp = (n: number) => `£${n.toLocaleString('en-GB')}`;

  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.06] shadow-glass-sm lg:grid lg:grid-cols-[1.15fr_0.85fr]">
      {/* ---- Inputs ---- */}
      <div className="p-6 sm:p-8 lg:p-10">
        <h3 className="text-display-md">Build your indicative package</h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-lumen-soft">
          Two questions. You will get an indicative total straight away — no email required to see
          the figure.
        </p>

        <div className="mt-8">
          <label htmlFor={inputId} className="block text-sm font-semibold text-lumen">
            How many staff do you employ?
          </label>
          <p id={`${inputId}-hint`} className="mt-1.5 text-[0.8125rem] text-lumen-muted">
            Include bank and part-time staff — wellbeing programmes cover everyone on your payroll.
          </p>

          <div className="mt-4 flex items-center gap-4">
            <div className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-lumen-muted"
              >
                <Icon name="users" className="size-4" />
              </span>
              <input
                id={inputId}
                type="number"
                inputMode="numeric"
                min={MIN_STAFF}
                max={MAX_STAFF}
                value={staffRaw}
                onChange={(e) => setStaffRaw(e.target.value)}
                aria-describedby={`${inputId}-hint`}
                aria-invalid={!isValid}
                className={cn(
                  'nums w-36 rounded-xl border-2 bg-white/[0.06] py-3 pl-11 pr-3 text-lg font-semibold text-lumen',
                  'transition-colors focus:border-mint-300 focus:outline-none',
                  isValid ? 'border-white/25' : 'border-violet-700'
                )}
              />
            </div>

            <input
              id={sliderId}
              type="range"
              min={MIN_STAFF}
              max={500}
              step={5}
              value={Math.min(Math.max(staffCount, MIN_STAFF), 500)}
              onChange={(e) => setStaffRaw(e.target.value)}
              aria-label="Number of staff (slider)"
              className="h-2 grow cursor-pointer appearance-none rounded-full bg-white/[0.06] accent-violet-700"
            />
          </div>

          {!isValid ? (
            <p role="alert" className="mt-3 flex items-center gap-2 text-sm text-lumen">
              <Icon name="spark" className="size-4 shrink-0" title="Error" />
              Enter at least one staff member to see an estimate.
            </p>
          ) : null}
        </div>

        <fieldset className="mt-9">
          <legend className="text-sm font-semibold text-lumen">
            What level of support are you considering?
          </legend>
          <div className="mt-4 flex flex-col gap-3">
            {tiers.map((t) => {
              const checked = t.id === tierId;
              return (
                <label
                  key={t.id}
                  className={cn(
                    'flex cursor-pointer items-start gap-3.5 rounded-xl border-2 p-4 transition-colors',
                    checked
                      ? 'border-violet-700 bg-white/[0.06]'
                      : 'border-line-strong bg-white/[0.06] hover:border-violet-400/25'
                  )}
                >
                  <input
                    type="radio"
                    name="tier"
                    value={t.id}
                    checked={checked}
                    onChange={() => setTierId(t.id)}
                    className="mt-1 size-4 shrink-0 accent-violet-700"
                  />
                  <span>
                    <span className="block text-[0.9375rem] font-semibold text-lumen">
                      {t.name}
                    </span>
                    <span className="mt-0.5 block text-[0.8125rem] text-lumen-soft">
                      {t.tagline} · from{' '}
                      <span className="nums font-semibold">£{t.pricePerStaff}</span> per staff
                      member
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      {/* ---- Result ---- */}
      <div className="relative overflow-hidden bg-deep p-6 text-lumen-soft sm:p-8 lg:p-10">
        <div aria-hidden="true" className="absolute inset-0 opacity-90" />
        <div aria-hidden="true" className="absolute inset-0 text-lumen/[0.05]" />

        <div className="relative flex h-full flex-col">
          <p className="text-eyebrow uppercase text-mint-300">Indicative total</p>

          <div id={resultId} aria-live="polite" aria-atomic="true" className="mt-4">
            {isValid ? (
              <>
                <p className="nums font-display text-[clamp(2.5rem,2rem+3vw,3.5rem)] font-semibold leading-none tracking-tight text-lumen">
                  {gbp(total)}
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-lumen-soft">
                  <span className="nums">{staffCount.toLocaleString('en-GB')}</span> staff ·{' '}
                  {tier.name}
                </p>

                <dl className="mt-7 flex flex-col gap-3 border-t border-violet-400/25 pt-6 text-[0.9375rem]">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-lumen-soft">
                      <span className="nums">{staffCount.toLocaleString('en-GB')}</span> ×{' '}
                      <span className="nums">£{tier.pricePerStaff}</span>
                    </dt>
                    <dd className="nums font-medium text-lumen">{gbp(gross)}</dd>
                  </div>
                  {discount > 0 ? (
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-mint-300">{band.label}</dt>
                      <dd className="nums font-medium text-mint-300">−{gbp(discount)}</dd>
                    </div>
                  ) : null}
                  <div className="flex items-baseline justify-between gap-4 border-t border-violet-400/25 pt-3">
                    <dt className="font-semibold text-lumen">Indicative total</dt>
                    <dd className="nums font-semibold text-lumen">{gbp(total)}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="text-lumen-soft">Per staff member</dt>
                    <dd className="nums text-lumen-soft">£{(total / staffCount).toFixed(2)}</dd>
                  </div>
                </dl>
              </>
            ) : (
              <p className="text-lead text-lumen-soft">
                Enter your staff count to see an indicative total.
              </p>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-violet-400/25 pt-6">
            <p className="flex items-start gap-2.5 text-[0.8125rem] leading-relaxed text-lumen-soft">
              <Icon name="spark" className="mt-0.5 size-3.5 shrink-0 text-mint-300" />
              Indicative only, excluding VAT. Your final quote follows a free consultation and
              reflects your sites, shift patterns and priorities.
            </p>

            <ButtonLink
              href={isValid ? `/contact?staff=${staffCount}&tier=${tier.id}` : '/contact'}
              variant="mint"
              size="lg"
              withArrow
              className="w-full"
            >
              Book a free consultation
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
