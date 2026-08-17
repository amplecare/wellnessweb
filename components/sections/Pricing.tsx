import { Icon } from '@/components/Icons';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Container, Eyebrow, Section } from '@/components/ui/Section';
import { tiers } from '@/content/pricing';
import { cta, site } from '@/content/site';
import { cn } from '@/lib/cn';

export function Pricing({
  showCalculatorCta = true,
  tone = 'warm',
}: {
  showCalculatorCta?: boolean;
  tone?: 'warm' | 'paper';
}) {
  return (
    <Section id="pricing" tone={tone} labelledBy="pricing-heading" size="roomy">
      <Container width="wide">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <Eyebrow>Pricing</Eyebrow>
            <h2 id="pricing-heading" className="mt-6 text-display-2xl text-lumen">
              Wellbeing support from{' '}
              <span className="whitespace-nowrap text-mint-300">£{site.priceFrom}</span> per staff
              member
            </h2>
            <p className="mt-7 max-w-2xl text-lead text-lumen-soft">
              Every care organisation is different — team size, current pressures and priorities all
              vary. We build programmes around your workforce, not a one-size-fits-all package.
            </p>
          </div>

          {showCalculatorCta ? (
            <ButtonLink
              href="/pricing#calculator"
              variant="secondary"
              size="md"
              withArrow
              className="shrink-0 lg:mb-2"
            >
              Estimate your package
            </ButtonLink>
          ) : null}
        </div>

        <ul className="mt-16 grid items-stretch gap-6 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <li key={tier.id} className="flex">
              <Reveal delay={i * 90} className="flex w-full">
                <div
                  className={cn(
                    'relative flex h-full w-full flex-col overflow-hidden rounded-lg p-7 sm:p-9',
                    tier.featured
                      ? 'bg-deep text-lumen-soft shadow-glass-lg lg:-my-4 lg:py-12'
                      : 'border border-white/10 bg-white/[0.06] shadow-glass-sm'
                  )}
                >
                  {tier.featured ? <div aria-hidden="true" className="absolute inset-0" /> : null}

                  <div className="relative flex h-full flex-col">
                    {tier.featured ? (
                      <span className="mb-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-mint-300/25 bg-mint-300/10 px-3 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-mint-300">
                        <Icon name="spark" className="size-3" />
                        Most chosen
                      </span>
                    ) : null}

                    <h3 className={cn('text-display-lg', tier.featured && 'text-lumen')}>
                      {tier.name}
                    </h3>
                    <p
                      className={cn(
                        'mt-1.5 text-sm font-medium',
                        tier.featured ? 'text-mint-300' : 'text-mint-300'
                      )}
                    >
                      {tier.tagline}
                    </p>

                    <p className="mt-8 flex items-baseline gap-2">
                      <span
                        className={cn(
                          'text-[0.75rem] font-semibold uppercase tracking-[0.12em]',
                          tier.featured ? 'text-lumen-soft' : 'text-lumen-muted'
                        )}
                      >
                        from
                      </span>
                      <span
                        className={cn(
                          'font-display text-[3.25rem] font-semibold leading-[0.85] tracking-[-0.045em]',
                          tier.featured ? 'text-lumen' : 'text-lumen'
                        )}
                      >
                        £{tier.pricePerStaff}
                      </span>
                    </p>
                    <p
                      className={cn(
                        'mt-2.5 text-[0.8125rem]',
                        tier.featured ? 'text-lumen-soft' : 'text-lumen-muted'
                      )}
                    >
                      per staff member · final quote after consultation
                    </p>

                    <p
                      className={cn(
                        'mt-7 border-t pt-7 text-[0.9375rem] leading-relaxed',
                        tier.featured
                          ? 'border-violet-400/25 text-lumen-soft'
                          : 'border-white/10 text-lumen-soft'
                      )}
                    >
                      {tier.description}
                    </p>

                    <ul className="mt-7 flex flex-col gap-3">
                      {tier.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-[0.9375rem] leading-snug"
                        >
                          <Icon
                            name="check"
                            className={cn(
                              'mt-0.5 size-4 shrink-0',
                              tier.featured ? 'text-mint-300' : 'text-mint-300'
                            )}
                          />
                          <span className={tier.featured ? 'text-lumen-soft' : 'text-lumen-soft'}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-9 pt-2">
                      <ButtonLink
                        href={`/book-consultation?tier=${tier.id}`}
                        variant={tier.featured ? 'mint' : 'secondary'}
                        size="md"
                        className="w-full"
                      >
                        {tier.cta}
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mx-auto mt-14 flex max-w-2xl flex-col items-center gap-7 text-center">
          <p className="max-w-2xl text-[0.875rem] leading-relaxed text-lumen-muted">
            All prices are shown as &ldquo;from&rdquo; and exclude VAT. Your final quote depends
            on workforce size, number of sites and the support you need, and is confirmed in
            writing after your free consultation.
          </p>

          {showCalculatorCta ? (
            <ButtonLink href="/pricing#calculator" size="lg" withArrow>
              {cta.calculator}
            </ButtonLink>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
