import Link from 'next/link';
import { Icon } from '@/components/Icons';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { services } from '@/content/services';

/**
 * Services as an editorial index rather than a grid of eight identical cards.
 *
 * A consultancy's service list should read like a contents page — numbered, typographic,
 * scannable in one vertical pass. It also gives each row far more room for the summary
 * than a four-across card, and stays a plain list of real links for crawlability.
 */
export function ServicesGrid() {
  return (
    <Section tone="paper" labelledBy="services-heading">
      <Container width="wide">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="services-heading"
            eyebrow="What we do"
            title="Eight Services, One Understanding of Care Work"
            lead="Take them individually or combine them into a single programme. Each is shaped by how care actually runs — shifts, handovers, lone working and all."
          />
          <ButtonLink
            href="/services"
            variant="ghost"
            size="md"
            withArrow
            className="shrink-0 sm:mb-2"
          >
            All services in detail
          </ButtonLink>
        </div>

        <ol className="mt-14 border-t border-white/10">
          {services.map((service, i) => (
            <li key={service.slug}>
              <Reveal delay={Math.min(i, 5) * 55}>
                <Link
                  href={`/services#${service.slug}`}
                  className="group relative grid items-start gap-x-6 gap-y-2.5 border-b border-white/10 py-6 transition-colors duration-300 hover:bg-white/[0.06] sm:grid-cols-[3.5rem_1fr_auto] sm:gap-x-8 sm:py-7 lg:grid-cols-[4rem_0.9fr_1.1fr_auto]"
                >
                  {/* Index number — the typographic anchor of the row. */}
                  <span
                    aria-hidden="true"
                    className="nums font-display text-[1.375rem] font-semibold leading-none tabular-nums text-lumen-soft transition-colors duration-300 group-hover:text-mint-300 sm:pt-1"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <h3 className="flex items-start gap-3 text-display-md sm:pt-0.5 lg:pr-6">
                    <Icon
                      name={service.icon}
                      className="mt-1 size-5 shrink-0 text-violet-500 transition-colors duration-300 group-hover:text-mint-300 lg:hidden"
                    />
                    <span className="transition-colors duration-300 group-hover:text-mint-300">
                      {service.title}
                    </span>
                  </h3>

                  <p className="text-[0.9375rem] leading-relaxed text-lumen-soft sm:col-span-2 lg:col-span-1 lg:col-start-3 lg:pt-1">
                    {service.summary}
                  </p>

                  <span
                    aria-hidden="true"
                    className="hidden size-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-mint-300 transition-all duration-300 group-hover:border-violet-700 group-hover:bg-violet-600 group-hover:text-lumen sm:flex lg:mt-0.5"
                  >
                    <Icon
                      name="arrowRight"
                      className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5"
                    />
                  </span>

                  {/* Green accent rule that draws in from the left on hover. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-mint-400 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-x-100"
                  />
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
