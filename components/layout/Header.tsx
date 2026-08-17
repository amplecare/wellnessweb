'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/Icons';
import { ButtonLink } from '@/components/ui/Button';
import { ArcMark } from '@/components/ui/Decor';
import { Container } from '@/components/ui/Section';
import { cta, primaryNav, sectorNav, site } from '@/content/site';
import { cn } from '@/lib/cn';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sectorsOpen, setSectorsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close the mobile panel on route change.
  useEffect(() => {
    setOpen(false);
    setSectorsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes the panel and returns focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        setSectorsOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    // A floating rail rather than a full-width bar. It detaches from the top edge
    // once you scroll, so the aurora stays visible above and behind it — which is
    // the whole point of a spatial interface.
    <header
      className={cn(
        'sticky z-50 transition-[top,padding] duration-500 ease-[var(--ease-out-soft)]',
        scrolled || open ? 'top-3 px-3 sm:px-5' : 'top-0 px-0'
      )}
    >
      <Container
        width="wide"
        className={cn(
          'transition-[background-color,border-color,box-shadow,border-radius] duration-500',
          scrolled || open
            ? 'glass-raised rounded-2xl border-white/12'
            : 'rounded-none border border-transparent bg-transparent'
        )}
      >
        <div className="flex h-18 items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex items-center gap-3 rounded-md"
            aria-label={`${site.name} — home`}
          >
            <Logo />
            <span className="flex flex-col leading-none">
              <span className="font-display text-[1.1875rem] font-semibold tracking-[-0.025em] text-lumen">
                Ample Care
              </span>
              <span className="mt-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-lumen-muted">
                Wellbeing Consultancy
              </span>
            </span>
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const isSectors = item.label === 'Who we help';
                const active = isSectors
                  ? sectorNav.some((s) => pathname.startsWith(s.href))
                  : isActive(item.href);

                return (
                  <li
                    key={item.href}
                    className={cn(isSectors && 'relative')}
                    onMouseEnter={isSectors ? () => setSectorsOpen(true) : undefined}
                    onMouseLeave={isSectors ? () => setSectorsOpen(false) : undefined}
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      aria-expanded={isSectors ? sectorsOpen : undefined}
                      onFocus={isSectors ? () => setSectorsOpen(true) : undefined}
                      className={cn(
                        'relative flex items-center gap-1.5 rounded-md px-3.5 py-2 text-[0.9375rem] font-medium transition-colors',
                        active ? 'text-lumen' : 'text-lumen-soft hover:text-lumen'
                      )}
                    >
                      {item.label}
                      {isSectors ? (
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          className={cn(
                            'size-3.5 transition-transform duration-300',
                            sectorsOpen && 'rotate-180'
                          )}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      ) : null}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-mint-400 transition-transform duration-300 ease-[var(--ease-out-soft)]',
                          active ? 'scale-x-100' : 'scale-x-0'
                        )}
                      />
                    </Link>

                    {/* Settings menu. Hover and focus both open it, so it is reachable
                        by keyboard — a hover-only menu is unusable without a mouse. */}
                    {isSectors ? (
                      <div
                        className={cn(
                          'absolute left-0 top-full w-64 pt-3 transition-all duration-300 ease-[var(--ease-out-soft)]',
                          sectorsOpen
                            ? 'visible translate-y-0 opacity-100'
                            : 'invisible -translate-y-1 opacity-0'
                        )}
                      >
                        <ul className="glass-raised rounded-lg p-2">
                          {sectorNav.map((sector) => (
                            <li key={sector.href}>
                              <Link
                                href={sector.href}
                                className={cn(
                                  'flex min-h-11 items-center rounded-sm px-3 text-[0.9375rem] font-medium transition-colors',
                                  pathname.startsWith(sector.href)
                                    ? 'bg-white/[0.09] text-lumen'
                                    : 'text-lumen-soft hover:bg-white/[0.07] hover:text-lumen'
                                )}
                              >
                                {sector.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${site.phone.replace(/\s/g, '')}`}
              className="hidden items-center gap-2 rounded-md px-2 py-2 text-sm font-medium text-lumen-soft transition-colors hover:text-lumen xl:flex"
            >
              <Icon name="phone" className="size-4 text-violet-300" />
              {site.phoneDisplay}
            </a>

            <ButtonLink href="/book-consultation" size="md" className="hidden sm:inline-flex">
              {/* Below `lg` the hamburger toggle sits right next to this button, so the
                  full label crowds it. Shortened here only — the mobile panel button
                  below has the room to keep the full `cta.primaryShort` wording. */}
              <span className="lg:hidden">Free Consultation</span>
              <span className="hidden lg:inline">{cta.primaryShort}</span>
            </ButtonLink>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="-mr-1.5 inline-flex size-11 items-center justify-center rounded-lg text-lumen transition-colors hover:bg-white/[0.06] lg:hidden"
            >
              <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
              <svg
                viewBox="0 0 24 24"
                className="size-6"
                aria-hidden="true"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
              >
                <path d={open ? 'M6 6l12 12' : 'M4 7h16'} className="transition-[d] duration-200" />
                <path
                  d="M4 12h16"
                  className={cn('transition-opacity duration-200', open && 'opacity-0')}
                />
                <path d={open ? 'M18 6L6 18' : 'M4 17h16'} />
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile panel. Height-animated so it feels premium without layout jank. */}
      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="border-t border-white/10 bg-white/[0.06] lg:hidden"
      >
        <Container width="wide">
          <nav aria-label="Main (mobile)" className="py-4">
            <ul className="flex flex-col">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    className={cn(
                      'flex min-h-12 items-center justify-between rounded-lg px-3 text-base font-medium',
                      isActive(item.href)
                        ? 'bg-white/[0.06] text-lumen'
                        : 'text-lumen hover:bg-white/[0.06]'
                    )}
                  >
                    {item.label}
                    {isActive(item.href) ? (
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-mint-400" />
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Sectors, expanded inline on mobile. A hover menu has no touch
                equivalent, so on a phone the five settings are simply listed —
                otherwise these pages would be unreachable from the mobile nav. */}
            <div className="mt-3 border-t border-white/10 pt-3">
              <p className="px-3 py-2 text-eyebrow uppercase text-lumen-muted">Who we help</p>
              <ul className="flex flex-col">
                {sectorNav.map((sector) => (
                  <li key={sector.href}>
                    <Link
                      href={sector.href}
                      aria-current={pathname.startsWith(sector.href) ? 'page' : undefined}
                      className={cn(
                        'flex min-h-12 items-center rounded-lg px-3 text-[0.9375rem]',
                        pathname.startsWith(sector.href)
                          ? 'bg-white/[0.09] text-lumen'
                          : 'text-lumen-soft hover:bg-white/[0.06] hover:text-lumen'
                      )}
                    >
                      {sector.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
              <ButtonLink href="/book-consultation" className="w-full">
                {cta.primaryShort}
              </ButtonLink>
              <a
                href={`tel:${site.phone.replace(/\s/g, '')}`}
                className="flex min-h-11 items-center justify-center gap-2 text-[0.9375rem] font-medium text-lumen-soft"
              >
                <Icon name="phone" className="size-4 text-violet-300" />
                Call {site.phoneDisplay}
              </a>
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}

/** Wordmark glyph: two arcs leaning on each other — the brand's signature motif. */
function Logo() {
  return (
    <span
      aria-hidden="true"
      className="flex size-11 items-center justify-center rounded-sm bg-gradient-to-br from-violet-700 via-violet-950 to-void shadow-[0_4px_18px_-4px_rgb(130_87_254/0.7)] ring-1 ring-white/12"
    >
      <ArcMark tone="brand" className="size-6" strokeWidth={2.2} />
    </span>
  );
}
