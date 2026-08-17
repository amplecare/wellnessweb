import type { ReactNode } from 'react';
import { Icon } from '@/components/Icons';
import { cn } from '@/lib/cn';

/**
 * Visible flag for content that is illustrative rather than real.
 *
 * The brief is explicit that nothing invented should end up looking like a real
 * claim at launch, so these notices are rendered in production too — not hidden
 * behind a dev flag. Remove the notice at the same time you replace the content
 * it refers to. Every one is listed in PLACEHOLDERS.md.
 */
export function PlaceholderNotice({
  children,
  tone = 'light',
  className,
}: {
  children: ReactNode;
  tone?: 'light' | 'dark';
  className?: string;
}) {
  return (
    <p
      className={cn(
        'flex items-start gap-2.5 rounded-lg border px-4 py-3 text-sm',
        tone === 'dark'
          ? 'border-mint-300/25 bg-deep/50 text-lumen-soft'
          : 'border-violet-400/25 bg-white/[0.06] text-lumen',
        className
      )}
    >
      <Icon
        name="spark"
        title="Note"
        className={cn(
          'mt-0.5 size-4 shrink-0',
          tone === 'dark' ? 'text-mint-300' : 'text-violet-300'
        )}
      />
      <span>{children}</span>
    </p>
  );
}

/** Inline pill for flagging a single item, e.g. one testimonial card. */
export function PlaceholderTag({ children = 'Illustrative' }: { children?: ReactNode }) {
  return (
    // A solid light-mint pill with dark mint text, so the same tag stays legible on
    // the dark canvas AND on the white report card. A translucent pill cannot do that:
    // it inherits whatever is behind it, and this tag appears on both.
    <span className="inline-flex items-center gap-1.5 rounded-full border border-mint-600/30 bg-mint-100 px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-mint-800">
      <span aria-hidden="true" className="size-1.5 rounded-full bg-mint-700" />
      {children}
    </span>
  );
}
