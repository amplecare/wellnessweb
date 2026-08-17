import { cn } from '@/lib/cn';

/**
 * The Aurora signature motif: a prism.
 *
 * The old identity was two arcs leaning on one another. It was a fine mark and it
 * belonged to a flat, printed design language — a line drawing, only ever readable
 * as an outline.
 *
 * A prism is the right motif for this system because it *is* the system: a single
 * beam enters, and light comes out separated into a spectrum. That is literally what
 * the aurora canvas does, and it carries the business idea too — one workforce goes
 * in, and what comes back is the pressure broken out into its parts.
 *
 * Everything here is decorative and always aria-hidden.
 */
export function PrismMark({
  className,
  tone = 'brand',
  strokeWidth = 1.6,
}: {
  className?: string;
  tone?: 'brand' | 'mono';
  strokeWidth?: number;
}) {
  const brand = tone === 'brand';

  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="prism-beam" x1="0" y1="0.5" x2="1" y2="0.5">
          <stop offset="0%" stopColor="var(--color-lumen)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--color-lumen)" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Incoming beam */}
      <path
        d="M2 16h9"
        stroke={brand ? 'url(#prism-beam)' : 'currentColor'}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />

      {/* The prism body */}
      <path
        d="M16 6.5 26 25.5H6z"
        stroke={brand ? 'var(--color-violet-300)' : 'currentColor'}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fill={brand ? 'rgb(130 87 254 / 0.16)' : 'none'}
      />

      {/* Refracted spectrum — three rays fanning out. */}
      <path
        d="M20.5 14.5 30 11"
        stroke={brand ? 'var(--color-mint-300)' : 'currentColor'}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M21.5 17.5 30.5 17"
        stroke={brand ? 'var(--color-violet-300)' : 'currentColor'}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity={0.85}
      />
      <path
        d="M22 20.5 30 23.5"
        stroke={brand ? 'var(--color-mint-400)' : 'currentColor'}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity={0.7}
      />
    </svg>
  );
}

/**
 * Large-scale refraction field, used behind hero and CTA bands.
 *
 * The same gesture at architectural scale — a beam entering and separating — so the
 * motif is felt as structure rather than noticed as a logo repeat.
 */
export function PrismField({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 600"
      className={cn('pointer-events-none', className)}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="pf-ray-a" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0%" stopColor="var(--color-mint-300)" stopOpacity="0" />
          <stop offset="55%" stopColor="var(--color-mint-300)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--color-mint-300)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="pf-ray-b" x1="0" y1="0" x2="1" y2="-0.2">
          <stop offset="0%" stopColor="var(--color-violet-400)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--color-violet-400)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--color-violet-400)" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="pf-core" cx="0.32" cy="0.5" r="0.4">
          <stop offset="0%" stopColor="var(--color-violet-400)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--color-violet-400)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="256" cy="300" rx="300" ry="240" fill="url(#pf-core)" />

      {/* Refracted rays fanning from the same origin. */}
      <path d="M256 300 900 96" stroke="url(#pf-ray-a)" strokeWidth="52" />
      <path d="M256 300 900 250" stroke="url(#pf-ray-b)" strokeWidth="70" />
      <path d="M256 300 900 430" stroke="url(#pf-ray-a)" strokeWidth="40" opacity="0.7" />
      <path d="M256 300 900 600" stroke="url(#pf-ray-b)" strokeWidth="30" opacity="0.5" />
    </svg>
  );
}

/**
 * A luminous hairline. Replaces the old arc divider.
 *
 * Fades at both ends so it reads as light catching an edge rather than a drawn rule
 * that stops abruptly.
 */
export function LightDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent',
        className
      )}
    />
  );
}

/** Short accent underline beneath a heading. */
export function GlowUnderline({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'block h-0.5 w-16 rounded-full bg-gradient-to-r from-mint-300 to-violet-400',
        'shadow-[0_0_14px_2px_rgb(111_233_193/0.45)]',
        className
      )}
    />
  );
}

/* --------------------------------------------------------------------------
   Compatibility aliases.

   The previous motif is referenced from six files. Rather than a risky sweeping
   rename mid-phase, the old names now resolve to the new marks — so every call
   site renders Aurora immediately and the names get tidied in the page rebuild.
   -------------------------------------------------------------------------- */
export const ArcMark = PrismMark;
export const ArcField = PrismField;
export const ArcDivider = LightDivider;
export const ArcUnderline = GlowUnderline;
