import Link from 'next/link';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { whoWeHelp } from '@/content/pages/home';

/**
 * The"who we help" block on the home page.
 *
 * Doubles as the internal-linking route into the five sector pages. Without it those
 * pages would depend entirely on the footer for internal links, which is weak signal
 * and leaves them close to orphaned.
 */
export function WhoWeHelp() {
  return (
    <Section tone="warm" labelledBy="who-we-help-heading">
      <Container>
        <SectionHeading
          id="who-we-help-heading"
          eyebrow="Who we help"
          title="Care settings differ. So does the pressure."
          lead="We work across health and social care, and we do not treat a domiciliary round and a nursing unit as the same workforce problem."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {whoWeHelp.map((item, i) => (
            <li key={item.href} className="flex">
              <Reveal delay={(i % 3) * 70} className="flex w-full">
                <Link
                  href={item.href}
                  className="glass flex h-full flex-col rounded-lg p-6 transition-[transform,border-color,box-shadow] duration-400 ease-[var(--ease-out-soft)] motion-safe:hover:-translate-y-1.5 hover:border-mint-300/35 hover:shadow-glass-lg"
                >
                  <h3 className="text-display-md text-lumen">{item.label}</h3>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-lumen-soft">
                    {item.body}
                  </p>
                  <span className="mt-auto pt-5 text-sm font-semibold text-mint-300 underline decoration-violet-300 underline-offset-4">
                    How we help {item.label.toLowerCase()}
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
