'use client';

import { useEffect } from 'react';

/**
 * Conversion tracking, without a cookie banner.
 *
 * ## Why it works this way
 *
 * The privacy policy currently states that no analytics beyond strictly necessary
 * cookies are in use, and adding anything that sets a tracking cookie would legally
 * require a consent mechanism that does not exist. So this component:
 *
 * - sets **no cookies** and stores nothing in localStorage,
 * - identifies no individual and builds no cross-site profile,
 * - posts anonymous, aggregate-only events to a first-party endpoint.
 *
 * That keeps the site consent-banner-free while still answering the question the
 * brief actually cares about: which pages produce consultations.
 *
 * ## Wiring a real provider
 *
 * To use a hosted product, choose a cookieless one — Plausible and Fathom both
 * qualify — and set `NEXT_PUBLIC_ANALYTICS_URL` to its endpoint. If you ever adopt
 * something that sets cookies or fingerprints visitors (Google Analytics does both),
 * you must add a consent banner and update the privacy policy first. See
 * PLACEHOLDERS.md §2.
 */

export type AnalyticsEvent =
  'page_view' | 'cta_click' | 'consultation_submit' | 'phone_click' | 'email_click';

interface EventPayload {
  event: AnalyticsEvent;
  path: string;
  /** Which CTA or link, where the event has one. */
  label?: string;
  /** Referrer host only — never the full URL, which can carry query parameters. */
  referrerHost?: string;
}

function send(payload: EventPayload): void {
  const endpoint = process.env.NEXT_PUBLIC_ANALYTICS_URL;
  if (!endpoint) {
    // No endpoint configured. In development, log so events are still verifiable.
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.info('[analytics]', payload);
    }
    return;
  }

  try {
    const body = JSON.stringify(payload);
    // sendBeacon survives the page unloading, which a fetch on a CTA click often
    // does not — the navigation cancels it and the conversion is never recorded.
    if (navigator.sendBeacon) {
      navigator.sendBeacon(endpoint, new Blob([body], { type: 'application/json' }));
    } else {
      void fetch(endpoint, { method: 'POST', body, keepalive: true });
    }
  } catch {
    // Analytics must never break the page for a visitor.
  }
}

/** Fired from anywhere in the app, including server-rendered markup via data attributes. */
export function trackEvent(event: AnalyticsEvent, label?: string): void {
  send({ event, path: window.location.pathname, label });
}

/**
 * Mounted once in the root layout.
 *
 * Uses one delegated listener rather than props threaded through every button, so
 * server components can opt in with a `data-analytics` attribute and no component
 * needs to become a client component just to be measurable.
 */
export function Analytics() {
  useEffect(() => {
    let referrerHost: string | undefined;
    try {
      referrerHost = document.referrer ? new URL(document.referrer).host : undefined;
    } catch {
      referrerHost = undefined;
    }

    send({ event: 'page_view', path: window.location.pathname, referrerHost });

    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('a, button');
      if (!target) return;

      const explicit = target.dataset.analytics;
      if (explicit === 'phone-click') return trackEvent('phone_click');
      if (explicit === 'email-click') return trackEvent('email_click');

      const href = target.getAttribute('href') ?? '';
      if (href.startsWith('/book-consultation')) {
        // The label tells us which page and which wording produced the click,
        // which is the whole point of the exercise.
        trackEvent('cta_click', target.textContent?.trim().slice(0, 60) || 'cta');
      }
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
