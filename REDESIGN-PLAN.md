# Ample Care — Full Redesign Plan

Complete rebuild of the experience, marketing site through admin dashboard, in five
phases. Written before any code is changed.

Two users drive every decision:

- **The care provider** — a registered manager or director, on a phone, between shifts,
  deciding in about eight seconds whether this company understands their problem.
- **The novice admin** — an Ample Care staff member who has never used a CRM, needs to
  find what to do today without training, and must never be able to break anything by
  clicking the wrong thing.

---

## Why the current build is confusing

This is the honest diagnosis. The problems are structural, not cosmetic — which is why
restyling alone would not fix them.

### Marketing site

1. **24 public pages, no visible path through them.** A visitor landing on
   `/care-staff-morale` has no idea whether they should also read `/care-staff-absence`,
   `/care-worker-burnout` or `/care-staff-retention`. Four pages describe closely related
   problems and nothing tells the reader which one is theirs.
2. **The navigation labels are abstract.** "Who we help" points at `/care-homes`, which
   is one setting rather than a menu. "Wellbeing" means nothing on its own, and sits
   confusingly beside "Services" and "Resources".
3. **The homepage runs twelve sections.** Every one is defensible in isolation; together
   they are a long scroll with no sense of progress and no single obvious next step.
4. **Every landing page is structurally identical.** Deliberate for consistency, but the
   result is that pages feel interchangeable — the reader cannot tell where they are.

### Admin dashboard

5. **A raw role switcher sits in the sidebar** offering `admin`, `manager`, `analyst`,
   `support_admin`, `company_user`. This is a developer demo control that leaked into the
   product. A novice admin will click it, change what they can see, and have no idea why.
   **It must be removed** — role belongs to the signed-in account, not a toggle.
6. **A "Company switch" list duplicates the Companies page**, so there are two different
   ways to do the same thing sitting next to each other.
7. **The vocabulary collides.** "Enquiry" means a wellbeing case about a staff member.
   "Consultation" and "lead" mean a sales conversation with a provider. Both appear in
   the sidebar with no explanation. This is the single biggest source of confusion.
8. **Nothing tells the admin what to do first.** The overview presents data; it does not
   present a task list.

---

## What is kept, and why

Rebuilding literally everything would discard work that is verified and correct. Two
things are kept as *inputs* to the new design, not as constraints on it:

- **The accessibility floor.** `npm run contrast` verifies every colour pairing against
  WCAG 2.2 AA. The new palette can be completely different — but every new colour must
  pass that same check before it ships. Inventing colours without re-verifying would be
  a step backwards, not a redesign.
- **The data and SEO layer.** `content/seo/keywordMap.ts`, `lib/admin/store.ts` and
  `lib/admin/insights.ts` are structure, not design. Rewriting them would break the
  cannibalisation guard and the sitemap for no visual gain.

**Everything visual is rebuilt**: palette, typography scale, spacing, components,
layouts, page structures, navigation, terminology, and every screen in the dashboard.

---

## Phase 1 — Foundations ✅ COMPLETE

**Shipped and verified.** New "Aurora" design system in `app/globals.css`: deep violet-
black canvas with drifting aurora light, three glass elevations, violet/mint/amber/rose
spectrum, single-family Inter typography from weight 200–800, spring motion.

- **All 56 colour pairings pass WCAG 2.2 AA** (`npm run contrast`). Text never sits on
  blur alone — every glass surface has a solid backing colour, and those are what the
  checker verifies. Two tokens failed first run and were darkened rather than the test
  being weakened.
- Fraunces removed entirely — the serif was what made the old site read as a brochure.
  Package uninstalled.
- Brand motif rebuilt: the two-arc mark is retired, replaced by a **prism** — a beam
  enters, light leaves separated into a spectrum.
- Every component, SVG asset, app icon and admin screen migrated. Zero old tokens,
  zero dead utilities, zero grey ramps remain.
- Prettier added (the project had no formatter) and the whole codebase formatted.
- Verified: typecheck clean, build green at 53 routes, 22 marketing routes + all admin
  screens returning 200 with correct mode.

### Original Phase 1 scope


*The decisions everything else inherits. No page work until this is settled.*

**Design language**
- New palette built from scratch, then run through `npm run contrast` — nothing ships
  below AA. Purple and green are retained as brand anchors, rebuilt as a full scale with
  defined roles (surface, raised, border, text, accent, status).
- Typography scale reduced to six sizes with fixed roles. The current build has ad-hoc
  sizes like `text-[0.9375rem]` scattered through components; those go.
- One spacing scale, one radius scale, one shadow scale. No arbitrary values.
- Components rebuilt: Button, Card, Field, Table, Tabs, Pill, Banner, EmptyState, Modal.

**Information architecture**
- Public navigation reduced to five honest labels, with a real dropdown for sectors
  rather than a link to one of them.
- Landing pages regrouped so a visitor is never asked to choose between four
  near-identical topics.

**Vocabulary — the fix for problem 7**

| Old | New | Why |
|---|---|---|
| Enquiry | **Case** | A wellbeing case about a staff member |
| Consultation / lead | **Client journey** | A provider moving toward becoming a client |
| Company | **Client** | Plain English |
| Triage | **Needs attention** | Nobody outside healthcare says "triage queue" |

A short glossary ships inside the dashboard, so the vocabulary is teachable.

**Deliverable:** design tokens, rebuilt component library, IA map, vocabulary decision
recorded. **Nothing visible changes yet.**

---

## Phase 2 — Marketing site

*The provider-facing experience.*

- **Homepage cut from twelve sections to seven**, structured as one argument: the
  problem you recognise → what it costs → what we do → proof → what it costs to find out
  → common questions → book.
- **Landing pages differentiated.** Each cluster gets its own visual treatment so pages
  stop feeling interchangeable, and each opens with a "is this you?" test that routes the
  reader to the right page in one click rather than making them guess.
- **A visible journey indicator** on every commercial page, so the reader always knows
  where they are and what the next step is.
- **Mobile first, genuinely.** Designed at 390px and scaled up, not the reverse.
- Sector pages get distinct imagery and layout per setting.

**Deliverable:** every public page rebuilt. SEO metadata, schema and internal links
preserved throughout — the redesign must not cost the search architecture.

---

## Phase 3 — The booking journey

*The one thing the whole marketing site exists to produce.*

- `/book-consultation` rebuilt as a **guided three-step flow** with visible progress,
  replacing the current single long form. Step one asks two questions; the commitment
  grows only after the visitor is invested.
- Every field justified out loud — a novice visitor should never wonder why they are
  being asked something.
- Confirmation screen that sets expectations concretely: who will call, when, and what
  they will ask.
- Failure states designed, not left to the browser: what happens when the network drops
  mid-submission, or the same person submits twice.

**Deliverable:** a booking flow that a manager can complete one-handed on a phone in
under ninety seconds.

---

## Phase 4 — Admin dashboard

*The largest piece of work, and the one with the most confusion to remove.*

- **Remove the role switcher and the company switcher from the sidebar.** Role comes
  from the signed-in account. This alone removes the biggest source of admin confusion.
- **"Today" becomes the landing screen.** Not charts — a prioritised list of what needs
  doing, in order, with one action per row. A new admin should be able to work a full day
  from this screen without opening anything else.
- **Every screen answers three questions in its first line:** what is this, what should I
  do, what happens if I do it.
- **Client workspace redesigned** around the twelve-stage journey as a visible progress
  bar, so the current position is obvious at a glance.
- **Guardrails for novices:** confirmation on anything irreversible, plain-language
  explanations of what each action does, undo where possible, and empty states that teach
  rather than apologise.
- **Inline glossary** for the new vocabulary.
- Mobile layout for the dashboard — currently desktop-only in practice.

**Deliverable:** a dashboard usable without training.

---

## Phase 5 — Polish, accessibility and QA

- Full contrast re-verification on the new palette; nothing ships below WCAG 2.2 AA.
- Keyboard-only walkthrough of the booking flow and every dashboard action.
- Screen reader pass over the dashboard tables and forms.
- 200% zoom and 390px width checks on every page.
- Core Web Vitals: image strategy, font loading, JS budget.
- Route smoke test across all 34 pages, schema validation, sitemap integrity.
- Updated documentation, and removal of anything the redesign made dead.

**Deliverable:** verified, launch-ready, documented.

---

## How I will work

- **One phase at a time**, verified before the next begins. Typecheck, build and contrast
  after every phase.
- **The site stays working throughout.** No phase leaves the build broken.
- **Content is preserved.** The copy was written carefully against a strict evidence
  rule — no invented statistics, no fabricated testimonials, no unsupported causal
  claims. The redesign changes how it looks and how it is organised, not what it claims.

## What I need from you

Nothing to start — Phase 1 is self-contained. Two things worth deciding before Phase 2:

1. **Brand colours.** Purple and green are currently assumed from the original brief. If
   there is a real brand guideline, this is the moment.
2. **Photography.** Every image slot still renders a placeholder. The redesign will look
   substantially better with real photography of UK care settings, and I cannot produce
   it — it needs commissioning.
