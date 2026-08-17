import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Layout primitives, rebuilt for Aurora.
 *
 * The old system alternated white and warm-paper bands to separate sections. That
 * device is gone: the canvas is continuous now, and separation comes from spacing,
 * glass elevation and light rather than from changing the background colour every
 * few hundred pixels.
 *
 * `tone` names are preserved so existing pages keep compiling, but they no longer
 * paint a background — they adjust how much light a band receives. Only `dark` and
 * `lumen` still change ground, because those are genuine mode switches.
 */
export function Container({
  children,
  className,
  width = 'default',
}: {
  children: ReactNode;
  className?: string;
  width?: 'default' | 'narrow' | 'wide' | 'full';
}) {
  const widths = {
    narrow: 'max-w-3xl',
    default: 'max-w-6xl',
    wide: 'max-w-7xl',
    full: 'max-w-none',
  } as const;

  return (
    <div className={cn('relative mx-auto w-full px-5 sm:px-7 lg:px-10', widths[width], className)}>
      {children}
    </div>
  );
}

type Tone = 'paper' | 'warm' | 'purple-tint' | 'green-tint' | 'dark' | 'lumen';

/**
 * Tones no longer paint solid bands. `glow-*` variants place a soft coloured
 * light behind the section so the canvas shifts subtly as you scroll — which is
 * what gives a long page a sense of travel without hard edges between sections.
 */
const tones: Record<Tone, string> = {
  paper: '',
  warm: 'section-glow-violet',
  'purple-tint': 'section-glow-violet',
  'green-tint': 'section-glow-mint',
  dark: 'bg-abyss/60',
  lumen: 'lumen bg-paper-lumen text-ink',
};

export function Section({
  children,
  className,
  tone = 'paper',
  id,
  as: As = 'section',
  size = 'default',
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  tone?: Tone;
  id?: string;
  as?: ElementType;
  size?: 'default' | 'compact' | 'roomy' | 'flush';
  labelledBy?: string;
}) {
  const sizes = {
    flush: 'py-0',
    compact: 'py-16 sm:py-20',
    default: 'py-24 sm:py-28 lg:py-32',
    roomy: 'py-28 sm:py-36 lg:py-44',
  } as const;

  return (
    <As
      id={id}
      aria-labelledby={labelledBy}
      className={cn('relative isolate', tones[tone], sizes[size], className)}
    >
      {children}
    </As>
  );
}

/**
 * Small uppercase kicker.
 *
 * The marker is a glowing dot rather than a filled circle — at 6px, a glow is what
 * distinguishes a deliberate accent from a rendering artefact on a dark ground.
 */
export function Eyebrow({
  children,
  tone = 'mint',
  className,
}: {
  children: ReactNode;
  tone?: 'mint' | 'violet' | 'onLight';
  className?: string;
}) {
  const colours = {
    mint: 'text-mint-300',
    violet: 'text-violet-300',
    onLight: 'text-violet-700',
  } as const;

  const dot = {
    mint: 'bg-mint-300 shadow-[0_0_10px_2px_rgb(111_233_193/0.7)]',
    violet: 'bg-violet-400 shadow-[0_0_10px_2px_rgb(161_132_255/0.7)]',
    onLight: 'bg-violet-600',
  } as const;

  return (
    <p className={cn('flex items-center gap-3 text-eyebrow uppercase', colours[tone], className)}>
      <span
        aria-hidden="true"
        className={cn('inline-block size-1.5 shrink-0 rounded-full', dot[tone])}
      />
      {children}
    </p>
  );
}

/**
 * Section heading block. `id` wires to the parent Section's `aria-labelledby`, so
 * every landmark has an accessible name.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  align = 'left',
  tone = 'dark',
  className,
  as: As = 'h2',
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  align?: 'left' | 'center';
  /** 'dark' = on the aurora canvas. 'light' = on a lumen surface. */
  tone?: 'light' | 'dark';
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
}) {
  const onCanvas = tone === 'dark';

  return (
    <div
      className={cn(
        'flex flex-col gap-6',
        align === 'center' ? 'mx-auto max-w-3xl items-center text-center' : 'max-w-3xl',
        className
      )}
    >
      {eyebrow ? <Eyebrow tone={onCanvas ? 'mint' : 'onLight'}>{eyebrow}</Eyebrow> : null}

      <As
        id={id}
        className={cn(
          As === 'h1' ? 'text-display-2xl' : 'text-display-xl',
          onCanvas ? 'text-lumen' : 'text-lumen'
        )}
      >
        {title}
      </As>

      {lead ? (
        <p className={cn('text-lead', onCanvas ? 'text-lumen-soft' : 'text-lumen-soft')}>{lead}</p>
      ) : null}
    </div>
  );
}
