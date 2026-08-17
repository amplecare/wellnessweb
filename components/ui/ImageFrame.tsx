import Image from 'next/image';
import { Icon } from '@/components/Icons';
import { cn } from '@/lib/cn';

/**
 * Every photographic slot on the site goes through this component.
 *
 * The brief calls for authentic photography of real UK care settings, which cannot
 * be fabricated — so until real photography is commissioned, each slot renders a
 * deliberately designed brand panel plus a short brief describing the shot that
 * belongs there. It reads as an intentional graphic rather than a broken image.
 *
 * To ship a real photo: drop the file in /public/images and pass `src`. next/image
 * then handles AVIF/WebP conversion, responsive srcsets and lazy loading (set
 * `priority` only on the above-the-fold hero image).
 *
 * PLACEHOLDERS.md lists every slot and the brief for each.
 */
export function ImageFrame({
  src,
  alt,
  shotBrief,
  aspect = '4/3',
  priority = false,
  sizes = '(max-width: 1024px) 100vw, 50vw',
  className,
  rounded = 'panel',
  variant = 'purple',
}: {
  /** Path under /public once real photography exists, e.g. '/images/handover.jpg'. */
  src?: string;
  /** Required whenever `src` is set. Describe the scene, not the file. */
  alt?: string;
  /** The shot to commission. Shown in the placeholder state. */
  shotBrief: string;
  aspect?: '4/3' | '3/2' | '1/1' | '16/9' | '5/4' | '4/5';
  priority?: boolean;
  sizes?: string;
  className?: string;
  rounded?: 'panel' | 'card' | 'none';
  variant?: 'purple' | 'green' | 'mixed';
}) {
  const aspects = {
    '4/3': 'aspect-4/3',
    '3/2': 'aspect-3/2',
    '1/1': 'aspect-square',
    '16/9': 'aspect-video',
    '5/4': 'aspect-5/4',
    '4/5': 'aspect-4/5',
  } as const;

  const roundings = {
    panel: 'rounded-lg',
    card: 'rounded-md',
    none: '',
  } as const;

  const wrapper = cn('relative overflow-hidden', aspects[aspect], roundings[rounded], className);

  if (src) {
    return (
      <div className={wrapper}>
        <Image
          src={src}
          alt={alt ?? ''}
          fill
          priority={priority}
          loading={priority ? undefined : 'lazy'}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  const washes = {
    purple: 'from-violet-800 via-deep to-void',
    green: 'from-mint-700 via-mint-800 to-deep',
    mixed: 'from-violet-800 via-deep to-mint-900',
  } as const;

  return (
    <div
      className={cn(wrapper, 'bg-gradient-to-br', washes[variant])}
      // Decorative in the placeholder state — the adjacent shot brief carries the
      // meaning, so it must not be announced twice.
      role="img"
      // The brief stays as the accessible description and in
      // PLACEHOLDERS.md. It is no longer printed on the page: telling a
      // prospective client which photographs have not been taken yet
      // advertises an unfinished site.
      aria-label={shotBrief}
    >
      {/* Layered soft shapes — abstract, no fabricated people. */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 size-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="if-arc-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6FE9C1" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6FE9C1" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="if-arc-b" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#BFB0FF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#BFB0FF" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="if-glow" cx="0.28" cy="0.24" r="0.72">
            <stop offset="0%" stopColor="#DAD2FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#DAD2FF" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="400" height="300" fill="url(#if-glow)" />
        <path
          d="M-40 250 C 90 150 150 260 420 120"
          stroke="url(#if-arc-a)"
          strokeWidth="52"
          fill="none"
        />
        <path
          d="M-20 90 C 120 -10 240 160 430 40"
          stroke="url(#if-arc-b)"
          strokeWidth="34"
          fill="none"
        />
        <circle cx="322" cy="228" r="88" fill="#02A074" opacity="0.16" />
        <circle cx="76" cy="62" r="54" fill="#A184FF" opacity="0.18" />
      </svg>

      <span aria-hidden="true" className="absolute inset-0 text-lumen/[0.07]" />

    </div>
  );
}
