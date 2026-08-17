'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Counts a figure up when it scrolls into view.
 *
 * Progressive enhancement and honesty both matter here: the final value is
 * rendered as real text immediately, and the animation only replaces it after JS
 * confirms IntersectionObserver support and that the visitor has not asked for
 * reduced motion. With JS off, or reduced motion on, the reader simply sees the
 * correct number — never a 0 that never animates.
 */
export function Counter({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  durationMs = 1400,
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);

          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / durationMs, 1);
            // Ease-out cubic: fast start, gentle settle. Matches --ease-out-soft.
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(value * eased);
            if (t < 1) frame = requestAnimationFrame(tick);
            else setDisplay(null); // hand back to the static text
          };
          frame = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, durationMs]);

  const shown =
    display === null
      ? value.toLocaleString('en-GB', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : display.toLocaleString('en-GB', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}
