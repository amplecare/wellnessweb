# Ample Care Ltd — website

Health promotion and workplace wellbeing consultancy for UK care providers.

Marketing and lead-generation site targeting registered managers, operations directors and
HR leads at care homes, nursing homes, domiciliary care agencies and supported living
providers. One conversion goal: **book a free wellbeing consultation.**

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # strict TypeScript
npm run contrast   # WCAG 2.2 AA verification of the palette
```

> **Before launch, work through [`PLACEHOLDERS.md`](./PLACEHOLDERS.md).** It lists every
> unfinished item — company details, the unwired contact form, the unreviewed privacy
> policy, illustrative pricing and testimonials, and the photography still to commission.

## Stack

- **Next.js 15** (App Router) — per-page metadata, semantic prerendered HTML, `next/image`
- **React 19**
- **Tailwind CSS v4** — CSS-first tokens in `app/globals.css`, no JS config file
- **TypeScript**, strict

All routes prerender to static HTML, so the site can deploy anywhere with no server runtime.

## Structure

```
app/
  layout.tsx              Root layout, site-wide metadata, ProfessionalService + WebSite schema
  globals.css             Design tokens (@theme), base styles, reveal + brand-wash utilities
  page.tsx                Home — hero, problem, solution, services, why us, pricing, trust,
                          testimonials, final CTA
  about/ services/ pricing/ contact/ privacy/
  sitemap.ts  robots.ts  not-found.tsx

components/
  Icons.tsx               Hand-built 24px line icon set (no icon-library dependency)
  layout/                 Header (sticky, mobile nav), Footer, PageHeader + BreadcrumbSchema
  sections/               One file per home page band; several are reused on inner pages
  forms/                  ConsultationForm, PackageCalculator
  ui/                     Button, Card, Section/Container/Eyebrow/SectionHeading,
                          ImageFrame, Reveal, PlaceholderNotice

content/                  All editable copy and data, typed
  site.ts                 Company details, navigation, CTA wording
  services.ts             The eight services
  pricing.ts              Tiers, volume bands, estimate()
  testimonials.ts         Illustrative quotes, each flagged isPlaceholder
  stats.ts                Sourced sector statistics with citations

lib/cn.ts                 Class joiner
scripts/check-contrast.mjs  WCAG AA verification
```

Copy changes should almost always happen in `content/` rather than in JSX.

## Design system

**Palette** — purple primary (deep aubergine, `purple-700` `#5B2A66`), green secondary
(sage/emerald, `green-600` `#316B52`), white and warm off-white dominant. Tokens live in the
`@theme` block of `app/globals.css`.

`npm run contrast` verifies every foreground/background pairing the components actually
ship — 29 pairings, all passing AA. **Do not change a hex value without re-running it.**

Two border tokens exist on purpose: `line` is decorative only (card edges, section rules)
and is intentionally low-contrast; `line-strong` is used wherever a user must be able to
locate a control, and clears 3:1.

**Type** — self-hosted **Fraunces Variable** (display) and **Inter Variable** (body/UI),
bundled from npm, no runtime third-party requests. Fraunces is tuned via its variable
axes in `globals.css`: `SOFT 40` for warmth, `WONK 0` to keep it dignified, `opsz` 144 on
the hero stepping down to 32 on small headings.

The scale is deliberately dramatic — `text-hero` reaches 6.25rem with −0.042em tracking
against an 11px tracked-out eyebrow. Confidence comes from that *contrast*, not from
everything being medium-sized. `.nums` applies tabular figures to aligned columns only;
large standalone figures keep proportional figures.

**Motif** — two arcs leaning on each other, one carrying the other. Taken from the logo
mark and recurring as `ArcMark` / `ArcField` / `ArcUnderline` (`components/ui/Decor.tsx`)
at every scale from the 8px eyebrow dot to 52rem background fields.

**Motion** — `Reveal` / `RevealProvider` do fade-and-rise on scroll via
`IntersectionObserver`. Progressive enhancement: the CSS that hides elements is scoped to
`[data-reveal-ready="true"]`, set only after JS confirms support and that the visitor has
not requested reduced motion. If JS fails, nothing is ever hidden.

**CTAs** — purple primary, green secondary, never more than one primary per screen. All
wording is centralised in `content/site.ts` → `cta`.

## SEO

- Per-page `title` / `description` / canonical; Open Graph and Twitter cards
- `ProfessionalService` + `WebSite` schema site-wide; `BreadcrumbList` on every inner page;
  `ItemList` of services; `FAQPage` on pricing; `ContactPage` on contact
- No `Review` or `aggregateRating` markup while testimonials are placeholders — see
  `PLACEHOLDERS.md` §4
- Services are real anchored sections with crawlable URLs, not modals
- `sitemap.xml` and `robots.txt` generated from `content/site.ts`

Target keywords: care home wellbeing support UK · staff wellbeing assessments for care
homes · healthcare workplace wellbeing consultancy UK · care worker burnout support ·
employee wellbeing programme UK · CQC staff wellbeing support.

## Content principles

Three rules held throughout this build, because the sector is unforgiving about credibility:

1. **No invented facts.** No fabricated credentials, client counts, years in business or
   logos. Where information was missing, the site omits the claim.
2. **Every statistic is sourced.** `content/stats.ts` carries the publisher, the reporting
   period and a link for each figure. A figure that cannot be sourced does not ship.
3. **Placeholders are visible.** Illustrative content renders a flag in production, not
   hidden behind a dev-only toggle, so nothing invented can quietly go live.

## Deployment

Static export-friendly — any host works. On Vercel it deploys as-is. Set `site.url` in
`content/site.ts` to the production domain first, or canonicals, Open Graph URLs and the
sitemap will all point at the wrong host.
