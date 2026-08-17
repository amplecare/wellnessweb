import { Icon } from '@/components/Icons';
import { InsightReportPreview } from '@/components/report/InsightReportPreview';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Container, Section, SectionHeading } from '@/components/ui/Section';

/**
 * The site's signature section. Most wellbeing consultancies describe their
 * deliverable; this shows it. A registered manager should be able to look at this
 * and know exactly what lands on their desk.
 */
export function ReportShowcase() {
  return (
    <Section
      id="the-report"
      tone="warm"
      labelledBy="report-heading"
      className="border-y border-white/10"
    >
      <Container width="wide">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="report-heading"
            eyebrow="The deliverable"
            title="This Is What You Actually Get"
            lead="Not a slide deck of national averages. A report on your service, your shifts and your teams — with the finding stated plainly and the actions already prioritised."
          />
          <ul className="flex shrink-0 flex-col gap-2.5 text-[0.875rem] text-lumen-soft lg:mb-2">
            {[
              'Broken down by shift, site and role',
              'Movement against your own baseline',
              'Written finding, not just charts',
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <Icon name="check" className="size-4 shrink-0 text-mint-300" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Reveal className="mt-12">
          <InsightReportPreview />
        </Reveal>

        <div className="mt-10 flex flex-col items-center gap-5 text-center">
          <p className="max-w-2xl text-[0.875rem] leading-relaxed text-lumen-muted">
            The figures above are sample data, shown so you can see the format. Your report
            follows the same structure, populated from your own confidential staff assessment.
          </p>
          <ButtonLink href="/book-consultation" size="lg" withArrow>
            Get a report like this for your service
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
