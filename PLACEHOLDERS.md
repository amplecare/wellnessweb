# Pre-launch checklist — placeholders and unfinished items

Nothing on this site invents a fact about Ample Care Ltd. Where information was not
supplied, the site either omits the claim or renders a **visible** placeholder flag.
This file is the complete list. **Work top to bottom before going live.**

Legend: 🔴 blocks launch · 🟠 should be done before launch · 🟢 nice to have

---

## 🔴 1. Legal and company details

| Item | Where | Notes |
|---|---|---|
| Registered office address | `content/site.ts` → `site.address` | UK limited companies must show this. Also feeds `PostalAddress` in the schema.org markup — if Ample Care is remote-first, remove the postal address from both rather than inventing one. |
| Companies House number | `content/site.ts` → `site.companyNumber` | Currently `00000000`, rendered in the footer. |
| Production domain | `content/site.ts` → `site.url` | Currently `https://www.amplecare.co.uk`. Drives canonicals, Open Graph URLs, sitemap and all `@id` values in the structured data. Must be correct before the first crawl. |
| Real phone number | `content/site.ts` → `site.phone` / `phoneDisplay` | Currently `020 0000 0000`. Appears in the header, footer, contact page, final CTA and schema. |
| Real email address | `content/site.ts` → `site.email` | Currently `hello@amplecare.co.uk`. |

## 🔴 1b. Admin credentials must be set on the deployment

`/admin` is protected by a signed-session login (`middleware.ts` + `lib/auth/`). It reads
three variables from `.env.local`, which is git-ignored and therefore **will not travel to
your host**. Set all three in the hosting provider's environment settings (Vercel →
Project → Settings → Environment Variables, or equivalent) or the admin area will refuse
every login attempt.

| Variable | What it is |
|---|---|
| `ADMIN_EMAIL` | The single address allowed to sign in. |
| `ADMIN_PASSWORD_HASH` | scrypt hash. The plaintext password is stored nowhere. |
| `AUTH_SECRET` | Signs the session cookie. Changing it logs everyone out. |

Generate the last two with `node scripts/set-admin-password.mjs` (reads the password from
stdin, so it never enters your shell history). `.env.example` documents the format.

**Rotate the current password before launch.** It was set over a chat transcript, so it
should not be treated as secret. Rotating is one command plus updating the two env vars.

Known limits of this design, in case the admin area grows:

- **One shared account.** There are no per-user logins and no audit trail of who did
  what. Fine for a single administrator; if the care team needs several logins — or if you
  ever need to prove who viewed a member of staff's wellbeing data — this needs a real
  user table before that happens.
- **Rate limiting is in-memory** (`app/admin/login/actions.ts`), so it is per-process. On a
  serverless host each instance counts separately, which weakens it. Move to shared storage
  if you deploy serverless.
- **No 2FA and no password reset flow.** Resetting means changing the env var.
- The dashboard currently reads from `content/admin/mockData` — the login protects the
  route, but there is no real staff data behind it yet.

## 🔴 1c. Admin dashboard writes to memory, not a database

The CRM is functional — statuses change, cases reassign, notes save, leads move stage,
and every one of those writes an audit entry. But all of it lives in
`lib/admin/store.ts`, which holds state on `globalThis`.

Two consequences that matter before anyone relies on this:

- **Everything resets when the server restarts.** A note written on Tuesday is gone
  after a deploy.
- **It is per-process.** On a serverless host, two instances hold divergent copies.

`store.ts` is the only module that touches data, and every page reads through
`lib/admin/insights.ts`. Replacing the seed arrays with real queries is a change to
those two files — no page needs to change. Do that before any real staff wellbeing
data is entered.

Also outstanding for the dashboard:

- **Role comes from the signed-in account, not the URL.** Admin access is fixed to the
  internal account and company scoping is applied only from the company query, never from a
  fake role switcher.
- **Sample data is invented.** `content/admin/mockData.ts` and
  `content/admin/pipelineData.ts` describe no real client or lead. Lead email addresses
  use the reserved `.example` domain so nothing can reach a real inbox. Delete both
  files when a backend arrives rather than editing them.

## 🔴 1d. SEO build — launch blockers

The site now has 15 SEO landing pages, 8 service pages and a resources hub. Two things
must be resolved before anything is crawled:

- **`content/site.ts` placeholders.** The production domain drives every canonical, all
  Open Graph URLs, the sitemap and every `@id` in the structured data. Crawling before
  it is correct means re-indexing the whole site later.
- **Analytics is not configured.** `NEXT_PUBLIC_ANALYTICS_URL` is unset, so no
  conversion data is being collected. Use a **cookieless** provider (Plausible, Fathom).
  Anything setting cookies or fingerprinting — Google Analytics does both — requires a
  consent banner that does not exist, and a privacy policy update first (see §2).

Also outstanding: `public/og-image.jpg` (1200×630). The app icon now ships as
`app/icon.svg`; an `apple-icon.png` is still worth adding for iOS home screens.

Full detail, including competitor research and the next 20 recommended articles, is in
[SEO-REPORT.md](SEO-REPORT.md).

## 🔴 2. Privacy Policy — needs a solicitor

`app/privacy/page.tsx` contains a **draft, GDPR-aware policy**, not legal advice. It is
structured for a care sector consultancy acting as data processor for staff wellbeing
data, and every gap is flagged inline with a purple `PLACEHOLDER` block. A solicitor must
review the whole document and resolve at minimum:

- ICO registration number, and who is accountable for data protection
- Which analytics/cookies will run — **if anything beyond strictly necessary cookies is
  added, a cookie banner and consent mechanism are required and do not yet exist**
- The actual sub-processor list, and whether any transfer data outside the UK
- Specific retention periods (currently described qualitatively)
- Minimum reporting group size for aggregate wellbeing results
- The agreed safeguarding escalation route
- A "last updated" date

## 🟠 3. Consultation form wiring and inbox delivery

`components/forms/ConsultationForm.tsx` now posts to a Next.js route handler and the
submission is saved into the consultation pipeline. The contact page no longer shows the
old placeholder banner, and the form includes a honeypot plus IP rate limit.

Still to confirm before launch:
1. Set the SMTP environment variables on the deployment if you want automatic inbox
  delivery from the API route.
2. Test the end-to-end notification path with the real business inbox.
3. Decide whether any further spam protection is needed beyond the current honeypot and
  rate limit.

## 🟠 4. Testimonials are illustrative

`content/testimonials.ts` — all three entries have `isPlaceholder: true`, which renders a
visible **"Illustrative"** tag on each card plus a notice under the section.

Replace with real, attributable quotes and set `isPlaceholder: false`. The tags and notice
disappear automatically.

> Review markup is deliberately **not** emitted for these. Publishing fabricated
> `Review` / `aggregateRating` structured data breaches Google's policies and, for a
> healthcare service, risks a CAP Code problem. Add review markup only once the quotes
> are real and you have permission to publish them.

## 🟠 5. Sample insight report data

`content/report.ts` drives the report preview on the home page — the site's signature
section, which exists so a prospective client can see the deliverable rather than read
about it. **Every figure in it is invented for demonstration.**

It is flagged in three places that must stay in place while the data is fictional: a
"Sample data" tag in the report header, a "Sample" chip on the hero card, and a line
under the section stating the figures are sample data.

Before launch, decide one of:

- **Keep it as a clearly-labelled sample** (recommended while there are no clients) — no
  change needed, just leave the flags.
- **Replace with a real anonymised case study** — requires written client permission,
  and the aggregate figures must clear the same minimum group size the privacy policy
  promises. Then relabel from "Sample" to the real (anonymised) service.

Do not quietly swap in a real client's numbers while the sample framing stays.

## 🟠 6. Pricing tiers 2 and 3

`content/pricing.ts` — only the **£35** entry point came from the brief.

- `assessment` → £35 ✅ confirmed
- `assessment-plan` → £55 ⚠️ indicative, confirm with client
- `ongoing` → £85 ⚠️ indicative, confirm with client
- `volumeBands` (5% / 10% / 15% discounts) ⚠️ indicative, confirm with client

All figures render with a "from" qualifier and a "final quote after consultation" note,
and the pricing section carries a visible illustrative-tiers notice. Confirm the numbers,
then remove that notice from `components/sections/Pricing.tsx`.

Also confirm the VAT position — copy currently states prices exclude VAT.

## 🟠 7. Photography

There is no stock imagery in this build. Every photographic slot renders through
`components/ui/ImageFrame.tsx`, which shows a designed brand panel plus the brief for the
shot that belongs there. To ship a real photo, drop the file into `public/images/` and pass
`src` — `next/image` then handles AVIF/WebP, responsive `srcset` and lazy loading.

The site is deliberately **not dependent** on photography to look finished. The hero
leads with a live fragment of the insight report instead of an image, and the
differentiation section is a comparison table — so there is exactly one photo slot left,
and adding photography is an upgrade rather than a rescue.

| Slot | File | Shot brief |
|---|---|---|
| About | `app/about/page.tsx` | Care assistant with a resident in a communal lounge — hands, tea, daylight; attention rather than faces to camera. |

Optional additions worth commissioning once real photography exists: a warm team image in
the hero's right column *below* the report card (not replacing it — the report is doing
more persuasive work), and a supervision-conversation shot on the Services page.

Direction, per the brief: real UK social care settings, warm and unposed. No American
corporate stock, no yoga poses, no laptop-in-a-cafe. Get written consent from staff and
residents (or their representatives) before publishing any recognisable photograph.

Also still needed: `public/og-image.jpg` (1200×630) for social sharing, plus `favicon.ico`,
`icon.png` and `apple-icon.png` in `app/`. Open Graph metadata is wired up and will pick up
`opengraph-image` automatically once added.

## 🟠 7b. Home page video slot

`content/video.ts` — the home page carries a reserved video space between the report
showcase and the services index. It currently renders `provider: 'none'`, which shows a
designed placeholder plus the brief for the film, in the same spirit as `ImageFrame`.

Brief: a 60–120 second introduction from the founder — the wellbeing problem care
providers face, what the assessment involves for staff, what a registered manager
receives at the end.

To ship it, set `provider` in `content/video.ts`:

| Provider | Set | Notes |
|---|---|---|
| `'file'` | `src: '/video/intro.mp4'` | Self-hosted. **Preferred** — zero third-party requests. |
| `'youtube'` | `id` (the ID only, not the URL) | Loaded via `youtube-nocookie.com`. |
| `'vimeo'` | `id` (numeric) | Loaded with `dnt=1`. |

Two things that are **not** optional:

- **Captions.** Set `captionsSrc` to a WebVTT file for self-hosted video. Care staff
  frequently watch on shift with sound off, and WCAG 2.2 AA requires captions for
  prerecorded video (SC 1.2.2). A `transcriptHref` is also wired up if you add one.
- **Keep the click-to-play facade.** YouTube and Vimeo are only contacted after the
  visitor presses play, which is what keeps the site free of a cookie banner (see §2).
  Replacing the facade with a bare `<iframe>` sets third-party cookies on page load and
  would require consent UI that does not exist.

## 🟢 7c. Brand illustrations — shipped, replaceable

`public/images/*.svg`, rendered through `components/ui/Illustration.tsx`. Hand-drawn in
the brand palette, deliberately abstract — no fabricated faces, no invented care setting.

| File | Used in |
|---|---|
| `illustration-support.svg` | `components/sections/Problem.tsx` (large screens only) |
| `illustration-insight.svg` | `app/about/page.tsx` |
| `video-poster.svg` | Poster frame for the video slot |

These exist so text-heavy bands have something to breathe against without blocking on a
photo shoot. They are **not** a substitute for the photography in §7 — keep that
commission on the list. They cost ~2.5KB each and scale to any screen.

## ✅ 8. Fonts — done

Resolved. The site self-hosts two variable families, installed as npm packages and
bundled by Next at build time:

- **Fraunces Variable** (display) — `@fontsource-variable/fraunces/full.css`, which
  carries every axis: `opsz`, `SOFT`, `WONK`, `wght`.
- **Inter Variable** (body/UI) — `@fontsource-variable/inter/opsz.css`, with optical
  sizing so small UI text stays crisp.

There are **no third-party font requests at runtime**, which also settles the Google
Fonts / GDPR question that care providers' IG leads increasingly ask about. Subsets are
unicode-range gated, so a UK visitor downloads latin only (~194KB for both families,
covering every weight).

Brand voice is set in `app/globals.css`: `SOFT 40` warms Fraunces' terminals so it reads
human rather than institutional; `WONK 0` switches off the quirky single-storey forms
(charming on a coffee brand, wrong for healthcare); `opsz` steps from 144 on the hero
down to 32 on small headings.

**Optional refinement:** the two latin `.woff2` files are not preloaded, so the hero
headline can show a brief swap on a cold first load. Adding a `<link rel="preload">` for
them needs the build-time hashed filenames — either read the emitted CSS in a small build
step, or migrate to `next/font/local`. Low priority; `font-display: swap` and same-origin
hosting keep it short.

## 🟠 9. About page has no founder profile

`app/about/page.tsx` deliberately claims no qualifications, professional registrations,
years in business or client numbers, because none were supplied. It leans on specialism and
approach instead, and carries a visible notice saying so.

Add a real founder profile, relevant qualifications and any professional memberships. This
matters more than usual here — registered managers weigh individual credibility heavily
when the company is new.

## 🟢 10. Statistics — re-verify annually

`content/stats.ts` holds three figures, each attributed inline to Skills for Care with the
reporting period shown and a link to the source. Verified July 2026 against
*The state of the adult social care sector and workforce in England*:

- 24.7% independent-sector staff turnover (2024/25)
- 4.8 days average sickness absence per employee (2024/25)
- ~96,000 vacant posts on any given day (2025/26)

Skills for Care publishes annually, usually in October. Re-check each figure and update
`period` and `sourceUrl` together. **Do not add a statistic that cannot be sourced.**

## 🟢 11. Deferred by scope

- **Insights/Blog** — listed as optional in the brief; not built. Add as
  `app/insights/[slug]/page.tsx` with `generateStaticParams` and an `Article` schema.
- **Trust strip** — uses sector iconography and factual "who this is for" statements. Swap
  for real client logos once you have written permission to display them.
- **CMS** — content lives in typed modules under `content/`. If the client needs to edit
  copy themselves, these map cleanly onto a headless CMS later; the `isPlaceholder` flag on
  testimonials is already designed as a CMS field.
- **Analytics** — none installed. Add one that does not require a cookie banner
  (Plausible/Fathom) if you want to avoid consent UI entirely.

---

## Verification commands

```bash
npm run contrast    # WCAG 2.2 AA check on every shipped colour pairing
npm run typecheck   # strict TypeScript, no errors
npm run build       # production build, all routes prerendered static
```

## Accessibility status

Built to WCAG 2.2 AA. Verified in this build:

- All 29 shipped colour pairings pass AA (`npm run contrast`) — body text at 4.5:1,
  large text and non-text UI at 3:1
- Exactly one `<h1>` per page, no skipped heading levels
- Skip-to-content link; every section landmark has an accessible name
- Visible 2px focus ring everywhere, switching to green on dark purple surfaces
- Form fields have visible labels, hints and errors wired via `aria-describedby`,
  `aria-invalid` on error, and focus moves to the first invalid field on submit
- 44px minimum touch targets on all controls
- `prefers-reduced-motion` disables all reveal animation and smooth scrolling
- Scroll reveals are progressive enhancement — content is never hidden if JS fails

**Still to check manually before launch** (cannot be automated): keyboard-only walkthrough
of the mobile nav and the form, a screen reader pass (NVDA or VoiceOver) over the pricing
calculator's live region, and 200% browser zoom on a real phone.
