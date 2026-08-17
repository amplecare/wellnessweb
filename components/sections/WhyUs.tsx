import { Icon } from '@/components/Icons';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Container, Section, SectionHeading } from '@/components/ui/Section';

/**
 * Differentiation as a comparison, not a feature list.
 *
 * A card grid of six benefits invites"everyone says that." Putting the generic
 * alternative alongside our answer forces the distinction to be specific — and it
 * is the section most likely to be screenshotted and sent to a colleague.
 *
 * Rendered as a real <table> so the pairing survives screen readers and mobile,
 * where it collapses to stacked row cards.
 */
const rows: readonly { dimension: string; generic: string; ample: string }[] = [
  {
    dimension: 'Who it was designed for',
    generic: 'Office workers, then relabelled for care',
    ample: 'Care and healthcare teams from the first question onwards',
  },
  {
    dimension: 'When sessions run',
    generic: 'Weekday lunchtimes and webinars',
    ample: 'At handover, on nights, across sites — around your rota',
  },
  {
    dimension: 'Who gets reached',
    generic: 'Whoever opts in — usually day staff',
    ample: 'Night, bank and part-time staff by design',
  },
  {
    dimension: 'What you receive',
    generic: 'A dashboard and a benchmark against national averages',
    ample: 'A written finding plus named actions, owners and dates',
  },
  {
    dimension: 'What happens next',
    generic: 'Renewal conversation',
    ample: 'We help embed the changes, then re-measure to prove movement',
  },
  {
    dimension: 'How it is priced',
    generic: 'Per-seat licence or day rate',
    ample: 'From £35 per staff member, fixed after a free consultation',
  },
  {
    dimension: 'Minimum size',
    generic: 'Enterprise contracts',
    ample: 'One care home to a multi-site group',
  },
];

export function WhyUs() {
  return (
    <Section tone="dark" labelledBy="why-heading" size="roomy" className="overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0" />
      <div aria-hidden="true" className="absolute inset-0 text-lumen/[0.04]" />

      <Container width="wide" className="relative">
        <SectionHeading
          id="why-heading"
          eyebrow="Why Ample Care"
          tone="dark"
          title="The Difference Is Not Subtle"
          lead="There is no shortage of wellbeing providers. There are very few built around care work specifically — and that difference decides whether your staff engage with it at all."
          align="center"
        />

        <Reveal className="mt-14">
          {/* Desktop: a true two-column comparison. */}
          <div className="hidden overflow-hidden rounded-lg border border-violet-400/25 bg-deep/60 backdrop-blur-sm md:block">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">
                Comparison of generic corporate wellbeing providers against Ample Care
              </caption>
              <thead>
                <tr className="border-b border-violet-400/25">
                  <th
                    scope="col"
                    className="w-[26%] px-6 py-5 text-eyebrow uppercase text-lumen-soft"
                  >
                    &nbsp;
                  </th>
                  <th scope="col" className="w-[37%] px-6 py-5">
                    <span className="text-eyebrow uppercase text-lumen-soft">
                      Generic corporate wellbeing
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="w-[37%] border-l border-mint-300/25 bg-mint-300/[0.07] px-6 py-5"
                  >
                    <span className="flex items-center gap-2 text-eyebrow uppercase text-mint-300">
                      <Icon name="spark" className="size-3.5" />
                      Ample Care
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.dimension}
                    className="border-b border-violet-400/25 last:border-0"
                  >
                    <th
                      scope="row"
                      className="px-6 py-5 align-top text-[0.875rem] font-semibold text-lumen"
                    >
                      {row.dimension}
                    </th>
                    <td className="px-6 py-5 align-top">
                      <span className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-lumen-soft">
                        <svg
                          viewBox="0 0 20 20"
                          className="mt-1 size-3.5 shrink-0"
                          aria-hidden="true"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                        >
                          <path d="M5 5l10 10M15 5L5 15" />
                        </svg>
                        {row.generic}
                      </span>
                    </td>
                    <td className="border-l border-mint-300/25 bg-mint-300/[0.07] px-6 py-5 align-top">
                      <span className="flex items-start gap-2.5 text-[0.9375rem] font-medium leading-relaxed text-lumen">
                        <Icon name="check" className="mt-0.5 size-4 shrink-0 text-mint-300" />
                        {row.ample}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: the same pairs, stacked. A wide table on a phone is unreadable,
 and horizontal scroll on the primary differentiation section is worse. */}
          <ul className="flex flex-col gap-4 md:hidden">
            {rows.map((row) => (
              <li
                key={row.dimension}
                className="overflow-hidden rounded-md border border-violet-400/25 bg-deep/60"
              >
                <p className="border-b border-violet-400/25 px-5 py-3.5 text-[0.875rem] font-semibold text-lumen">
                  {row.dimension}
                </p>
                <div className="flex flex-col gap-3 px-5 py-4">
                  <p className="flex items-start gap-2.5 text-[0.875rem] leading-relaxed text-lumen-soft">
                    <svg
                      viewBox="0 0 20 20"
                      className="mt-1 size-3.5 shrink-0"
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    >
                      <path d="M5 5l10 10M15 5L5 15" />
                    </svg>
                    <span>
                      <span className="sr-only">Generic corporate wellbeing: </span>
                      {row.generic}
                    </span>
                  </p>
                  <p className="flex items-start gap-2.5 border-t border-mint-300/25 pt-3 text-[0.875rem] font-medium leading-relaxed text-lumen">
                    <Icon name="check" className="mt-0.5 size-4 shrink-0 text-mint-300" />
                    <span>
                      <span className="sr-only">Ample Care: </span>
                      {row.ample}
                    </span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-12 flex justify-center">
          <ButtonLink href="/book-consultation" variant="mint" size="lg" withArrow>
            Talk to someone who knows care work
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
