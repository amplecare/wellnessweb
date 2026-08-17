import Link from 'next/link';
import type { ReactNode } from 'react';
import { Icon, type IconName } from '@/components/Icons';
import { cn } from '@/lib/cn';

/**
 * Cards, rebuilt as glass.
 *
 * The `tone` names are carried over from the previous system so every existing
 * page keeps compiling, but each now resolves to an Aurora surface. `paper` and
 * `warm` are no longer paper at all — they are glass over the canvas.
 *
 * Hover lifts the card and brightens its lit edge rather than just deepening a
 * shadow. On a translucent surface a shadow change is nearly invisible; a change
 * in edge light is what reads as movement.
 */
export function Card({
  children,
  className,
  tone = 'paper',
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  tone?: 'paper' | 'warm' | 'purple' | 'dark' | 'lumen';
  interactive?: boolean;
}) {
  const tones = {
    paper: 'glass',
    warm: 'glass-subtle',
    purple: 'glass-raised',
    dark: 'glass-raised',
    lumen: 'glass-lumen',
  } as const;

  return (
    <div
      className={cn(
        'relative rounded-lg',
        tones[tone],
        interactive &&
          'transition-[transform,border-color,box-shadow,background-color] duration-400 ' +
            'ease-[var(--ease-out-soft)] motion-safe:hover:-translate-y-1.5 ' +
            'hover:border-white/25 hover:shadow-glass-lg',
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * Service card.
 *
 * The whole card is clickable via a stretched overlay, but the accessible name
 * comes from the real anchor around the title — so a screen reader announces
 *"Staff Wellbeing Assessments, link" rather than "Learn more, link".
 */
export function ServiceCard({
  icon,
  title,
  summary,
  href,
}: {
  icon: IconName;
  title: string;
  summary: string;
  href: string;
}) {
  return (
    <Card
      interactive
      className="group/card flex h-full flex-col gap-4 overflow-hidden p-6 focus-within:border-mint-300/50 sm:p-7"
    >
      {/* Light that sweeps in from the corner on hover. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-violet-500/25 opacity-0 blur-2xl transition-opacity duration-500 group-hover/card:opacity-100"
      />

      <span
        aria-hidden="true"
        className="relative flex size-12 items-center justify-center rounded-md border border-white/12 bg-white/8 text-mint-300 transition-colors duration-400 group-hover/card:border-mint-300/40 group-hover/card:text-mint-200"
      >
        <Icon name={icon} className="size-5.5" />
      </span>

      <h3 className="relative text-display-md text-lumen">
        <Link
          href={href}
          className="rounded-xs after:absolute after:inset-0 after:content-[''] hover:text-mint-200"
        >
          {title}
        </Link>
      </h3>

      <p className="relative text-[0.9375rem] leading-relaxed text-lumen-soft">{summary}</p>

      <span
        aria-hidden="true"
        className="relative mt-auto inline-flex items-center gap-2 pt-1 text-sm font-semibold text-mint-300"
      >
        Learn more
        <Icon
          name="arrowRight"
          className="size-4 transition-transform duration-300 ease-[var(--ease-spring)] motion-safe:group-hover/card:translate-x-1.5"
        />
      </span>
    </Card>
  );
}

/** Numbered step in the process flow. */
export function StepCard({
  step,
  title,
  body,
  icon,
  isLast,
}: {
  step: number;
  title: string;
  body: string;
  icon: IconName;
  isLast: boolean;
}) {
  return (
    <li className="relative flex gap-5 lg:block">
      {/* Connector: vertical on mobile, horizontal from lg. Fades out so it reads
 as light travelling between steps rather than a drawn rule. */}
      {!isLast ? (
        <span
          aria-hidden="true"
          className="absolute left-[1.4375rem] top-14 h-[calc(100%-1.5rem)] w-px bg-gradient-to-b from-violet-400/60 via-mint-300/40 to-transparent lg:left-auto lg:top-[1.4375rem] lg:h-px lg:w-full lg:translate-x-14 lg:bg-gradient-to-r"
        />
      ) : null}

      <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full glass text-mint-300">
        <Icon name={icon} className="size-5" />
      </span>

      <div className="pb-9 lg:pb-0 lg:pt-7">
        <p className="text-eyebrow uppercase text-mint-300">Step {step}</p>
        <h3 className="mt-2.5 text-display-md text-lumen">{title}</h3>
        <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-lumen-soft lg:pr-6">{body}</p>
      </div>
    </li>
  );
}
