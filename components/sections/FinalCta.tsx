import { Icon } from '@/components/Icons';
import { ButtonLink } from '@/components/ui/Button';
import { ArcField } from '@/components/ui/Decor';
import { Container, Section } from '@/components/ui/Section';
import { cta, site } from '@/content/site';

/**
 * Closing band. The one place the headline is allowed to be a question, and the
 * only section with no competing content — a single idea at maximum scale.
 */
export function FinalCta() {
  return (
    <Section tone="dark" labelledBy="final-cta-heading" size="roomy" className="overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0" />
      <div aria-hidden="true" className="absolute inset-0 text-lumen/[0.04]" />
      <ArcField
                className="absolute left-1/2 top-0 h-[52rem] w-[52rem] -translate-x-1/2 opacity-50"
      />

      <Container width="default" className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 id="final-cta-heading" className="text-display-2xl text-lumen">
            Your staff care for others every day.{' '}
            <span className="text-aurora text-mint-300">Who is caring for them?</span>
          </h2>

          <p className="mt-8 max-w-xl text-lead text-lumen-soft">
            Book a free, no-obligation consultation. Thirty minutes, no sales pressure — just an
            honest conversation about what your staff are carrying and what would help.
          </p>

          <div className="mt-11 w-full sm:w-auto">
            <ButtonLink
              href="/book-consultation"
              variant="mint"
              size="lg"
              withArrow
              className="w-full sm:w-auto"
            >
              {cta.final}
            </ButtonLink>
          </div>

          <ul className="mt-12 flex flex-col items-center gap-4 border-t border-violet-400/25 pt-9 text-[0.9375rem] text-lumen-soft sm:flex-row sm:gap-9">
            {[
              'Free 30-minute consultation',
              'No obligation',
              `From £${site.priceFrom} per staff member`,
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Icon name="check" className="size-4 shrink-0 text-mint-300" />
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-9 text-sm text-lumen-soft">
            Prefer to talk now?{' '}
            <a
              href={`tel:${site.phone.replace(/\s/g, '')}`}
              className="link-draw font-medium text-mint-300"
            >
              Call {site.phoneDisplay}
            </a>
          </p>
        </div>
      </Container>
    </Section>
  );
}
