'use client';

import { useState } from 'react';
import { Icon } from '@/components/Icons';
import { PlaceholderNotice, PlaceholderTag } from '@/components/ui/PlaceholderNotice';
import { Container, Section, SectionHeading } from '@/components/ui/Section';
import { testimonials } from '@/content/testimonials';
import { cn } from '@/lib/cn';

/**
 * One large quote at a time, with the others selectable.
 *
 * Three equal cards make every quote feel equally skippable, and forces the type
 * small. A single quote at display size reads like a pull-quote in a printed report.
 *
 * Placeholder handling is unchanged and deliberate: each illustrative quote carries a
 * visible tag, and the section keeps its notice until real quotes replace these.
 */
export function Testimonials() {
  const [active, setActive] = useState(0);
  const anyPlaceholder = testimonials.some((t) => t.isPlaceholder);

  // Nothing on the public site should either fabricate social proof or announce that
  // the business has no clients yet. While the quotes are illustrative, the whole
  // section is withheld. Set `isPlaceholder: false` on real, attributable quotes in
  // content/testimonials.ts and it appears again with no code change.
  if (testimonials.every((t) => t.isPlaceholder)) return null;
  const current = testimonials[active];

  return (
    <Section tone="purple-tint" labelledBy="testimonials-heading">
      <Container width="wide">
        <SectionHeading
          id="testimonials-heading"
          eyebrow="In their words"
          title="What Care Providers Say"
          lead={
            anyPlaceholder
              ? ''
              : undefined
          }
          align="center"
        />

        <div className="mx-auto mt-14 max-w-4xl">
          <figure className="relative overflow-hidden rounded-lg border border-violet-400/25 bg-white/[0.06] p-7 shadow-glass-sm sm:p-12">
            <Icon name="quote" className="size-10 text-lumen-soft sm:size-12" aria-hidden />

            {/* aria-live sits on the STABLE wrapper, not the swapped <p>. A live
 region announces changes to its contents; if the region itself is
 replaced (which a changing `key` does), many screen readers stay
 silent. */}
            <blockquote className="mt-6" aria-live="polite">
              <p
                key={current.id}
                className="font-display text-[clamp(1.25rem,1.05rem+0.85vw,1.75rem)] font-medium leading-[1.45] tracking-[-0.012em] text-lumen"
              >
                {current.quote}
              </p>
            </blockquote>

            <figcaption className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              <div>
                <p className="text-[0.9375rem] font-semibold text-lumen">— {current.attribution}</p>
                <p className="mt-0.5 text-[0.875rem] text-lumen-muted">{current.context}</p>
              </div>
              {current.isPlaceholder ? <PlaceholderTag /> : null}
            </figcaption>
          </figure>

          {/* Selector: plain toggle buttons in a labelled group.
 Deliberately NOT role="tablist"/"tab" — that pattern obliges a
 matching tabpanel and arrow-key roving focus, and a half-implemented
 tabs widget misleads screen reader users more than no roles at all.
 aria-pressed states which quote is showing; the live region above
 announces the new text. */}
          <div
            role="group"
            aria-label="Choose a testimonial"
            className="mt-6 grid gap-3 sm:grid-cols-3"
          >
            {testimonials.map((t, i) => {
              const selected = i === active;
              return (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActive(i)}
                  className={cn(
                    'group flex min-h-14 items-center gap-3 rounded-md border px-4 py-3 text-left transition-all duration-300',
                    selected
                      ? 'border-violet-400/25 bg-white/[0.06] shadow-glass-sm'
                      : 'border-white/10 bg-white/50 hover:border-violet-400/25 hover:bg-white/[0.06]'
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'h-9 w-0.5 shrink-0 rounded-full transition-colors duration-300',
                      selected ? 'bg-mint-400' : 'bg-violet-200 group-hover:bg-violet-300'
                    )}
                  />
                  <span>
                    <span
                      className={cn(
                        'block text-[0.875rem] font-semibold leading-snug',
                        selected ? 'text-lumen' : 'text-lumen-soft'
                      )}
                    >
                      {t.attribution}
                    </span>
                    <span className="mt-0.5 block text-[0.75rem] text-lumen-muted">
                      {t.context}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>


      </Container>
    </Section>
  );
}
