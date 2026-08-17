'use client';

import { useEffect } from 'react';

/**
 * Scroll-reveal controller. Mounted once in the root layout.
 *
 * Progressive enhancement, deliberately: the CSS that hides `.reveal` elements is
 * scoped to `[data-reveal-ready="true"]`, which only this component sets — and
 * only after confirming IntersectionObserver exists and the visitor has not asked
 * for reduced motion. If JS never runs, nothing is ever hidden.
 */
export function RevealProvider() {
  useEffect(() => {
    const root = document.documentElement;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !('IntersectionObserver' in window)) return;

    root.dataset.revealReady = 'true';

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );

    const seen = new WeakSet<Element>();
    const scan = () => {
      // `.reveal` fades a block in; `.reveal-lines` staggers its direct children
      // (used on multi-line headlines). Both share the same observer.
      for (const el of document.querySelectorAll('.reveal, .reveal-lines')) {
        if (seen.has(el)) continue;
        seen.add(el);

        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
          // Already in view on load. Flip on the *next* frame rather than this
          // tick — the browser has to paint the hidden state first, or the
          // transition is skipped and the entrance never plays.
          requestAnimationFrame(() => {
            requestAnimationFrame(() => el.classList.add('is-visible'));
          });
        } else {
          observer.observe(el);
        }
      }
    };

    scan();

    // Re-scan after client navigation adds new .reveal nodes.
    const mutation = new MutationObserver(scan);
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
      delete root.dataset.revealReady;
    };
  }, []);

  return null;
}

/**
 * Marks a subtree for scroll reveal. `delay` staggers items in a grid.
 * Renders a plain <div>, so it stays a server component.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={className ? `reveal ${className}` : 'reveal'}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
