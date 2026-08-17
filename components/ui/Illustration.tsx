import { cn } from '@/lib/cn';

/**
 * Brand illustration slot.
 *
 * These are hand-drawn SVGs in the brand palette, shipped from /public/images —
 * deliberately abstract, with no fabricated faces or invented care settings. They
 * exist so text-heavy bands have something to breathe against without waiting on a
 * photography commission, and they are not a stand-in for the photography briefed
 * in PLACEHOLDERS.md §7.
 *
 * Rendered as a plain <img>, not next/image: SVG gains nothing from raster
 * optimisation, and routing it through /_next/image would require enabling
 * `dangerouslyAllowSVG`, which turns on SVG for every remote source too.
 *
 * Pass `alt` when the drawing carries meaning; leave it out and the illustration is
 * marked decorative, which is correct when adjacent copy already says the same thing.
 */
export function Illustration({
  src,
  alt,
  aspect = '4/3',
  className,
  rounded = 'panel',
  priority = false,
}: {
  src: string;
  alt?: string;
  aspect?: '4/3' | '3/2' | '1/1' | '16/9';
  className?: string;
  rounded?: 'panel' | 'card' | 'none';
  priority?: boolean;
}) {
  const aspects = {
    '4/3': 'aspect-4/3',
    '3/2': 'aspect-3/2',
    '1/1': 'aspect-square',
    '16/9': 'aspect-video',
  } as const;

  const roundings = {
    panel: 'rounded-lg',
    card: 'rounded-md',
    none: '',
  } as const;

  const decorative = !alt;

  return (
    <div className={cn('relative overflow-hidden', aspects[aspect], roundings[rounded], className)}>
      <img
        src={src}
        alt={alt ?? ''}
        aria-hidden={decorative || undefined}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className="absolute inset-0 size-full object-cover"
      />
    </div>
  );
}
