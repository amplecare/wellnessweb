import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/cn';

/**
 * Buttons, rebuilt for Aurora.
 *
 * The primary button is a solid violet with a glow rather than glass — the single
 * most important control on a page should not be translucent. Glass is for surfaces
 * that hold content; solid is for things you press.
 *
 * Every variant keeps a 44px minimum height. The audience opens this on a phone
 * between shifts, and a 32px target on a moving bus is a failed interaction.
 */
type Variant = 'primary' | 'secondary' | 'glass' | 'ghost' | 'mint' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group/btn relative inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full ' +
  'font-semibold tracking-[-0.011em] text-center whitespace-nowrap ' +
  'transition-[transform,background-color,border-color,color,box-shadow,opacity] duration-300 ' +
  'ease-[var(--ease-out-soft)] active:scale-[0.97] ' +
  'disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  // Solid violet + glow. Reads as lit from within against the dark canvas.
  primary:
    'bg-violet-600 text-white shadow-[0_1px_2px_rgb(5_4_17/0.4),0_12px_36px_-10px_rgb(109_56_245/0.65)] ' +
    'hover:bg-violet-500 hover:shadow-[0_2px_4px_rgb(5_4_17/0.45),0_20px_52px_-12px_rgb(130_87_254/0.8)] ' +
    'hover:-translate-y-0.5',

  // Mint. Dark text on light mint — verified 4.5:1.
  mint:
    'bg-mint-300 text-ink shadow-[0_1px_2px_rgb(5_4_17/0.3),0_12px_36px_-10px_rgb(111_233_193/0.5)] ' +
    'hover:bg-mint-200 hover:-translate-y-0.5',

  // Glass. For secondary actions sitting on the canvas.
  glass: 'glass text-lumen hover:bg-white/[0.14] hover:border-white/25 hover:-translate-y-0.5',

  // Outlined, for light (lumen) surfaces.
  secondary:
    'border border-violet-600/30 bg-white/70 text-violet-700 backdrop-blur-sm ' +
    'hover:border-violet-600/60 hover:bg-white hover:-translate-y-0.5',

  ghost:
    'px-0 text-current underline decoration-current/30 decoration-2 underline-offset-[6px] ' +
    'hover:decoration-current',

  danger: 'bg-rose-600 text-white hover:bg-rose-600/90 hover:-translate-y-0.5',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-[0.875rem]',
  md: 'px-5 py-2.5 text-[0.9375rem]',
  lg: 'px-7 py-3.5 text-base sm:text-[1.0625rem]',
};

function inner(children: ReactNode, withArrow: boolean) {
  return (
    <>
      <span className="relative z-10">{children}</span>
      {withArrow ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="relative z-10 size-4 shrink-0 transition-transform duration-300 ease-[var(--ease-spring)] group-hover/btn:translate-x-1"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      ) : null}
    </>
  );
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  variant = 'primary',
  size = 'lg',
  withArrow = false,
  className,
  children,
  ...rest
}: CommonProps & Omit<ComponentProps<typeof Link>, 'className' | 'children'>) {
  return (
    <Link className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {inner(children, withArrow)}
    </Link>
  );
}

export function Button({
  variant = 'primary',
  size = 'lg',
  withArrow = false,
  className,
  children,
  type = 'button',
  ...rest
}: CommonProps & Omit<ComponentProps<'button'>, 'className' | 'children'>) {
  return (
    <button type={type} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {inner(children, withArrow)}
    </button>
  );
}
