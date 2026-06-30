# Ambliq Solutions — Website Design Spec

**Date:** 2026-06-30
**Status:** Approved (design), pending implementation plan
**Owner:** built for Umar Shoaib (founder, Ambliq Solutions)

---

## 1. Overview

Build a high-performance marketing website for **Ambliq Solutions**, an AI Automation Agency whose flagship product is **AI Voice Agents** — human-like AI receptionists that answer calls 24/7, qualify leads, book appointments, and integrate with existing business systems. The site's job is conversion: get qualified service-business owners to **book a call**.

**Core message:** *Every missed call is a missed opportunity. Every fast response is a chance to win a customer.*

### Design anchor & references
- **Primary visual reference:** https://www.futureflowai.co.uk/ — the site should look maximally like this, recolored to Ambliq's brand. Its real design system was decoded with Playwright (screenshots + computed styles): Next.js + Tailwind + shadcn/ui + **Manrope** font + Lenis/GSAP; light theme; **violet** accent over slate-black, with one dark section + dark footer.
- **ROI Calculator + Results blocks:** taken from https://www.ambotix.com/.
- **The recolor IS the brand transformation:** FutureFlow's violet `#7C3AED` → Ambliq electric blue `#0C60FC`; FutureFlow's slate-black `#0F172A` → Ambliq navy `#00183C`.

### Goals
- Visually beautiful, faithful to the FutureFlow reference, branded to Ambliq's logo.
- Excellent performance + SEO (static, fast, semantic, structured data).
- Fully responsive on all screen sizes.
- Ready for future backend integration (lead forms, CRM webhooks) without rework.

### Non-goals (YAGNI)
- No CMS yet (content lives in a typed file; revisit if Umar needs self-editing).
- No backend / API routes / database in this build (booking handled by Calendly).
- No blog, no auth, no live chat widget.
- No real client data — placeholders only until Umar provides real results/testimonials/logos.

---

## 2. Design System (derived from the logo)

Colors sampled directly from `Ambliq Solutions Assets/Logo with white BG.png`.

### Color tokens
| Token | Hex | Use |
|---|---|---|
| `navy-950` | `#000C24` | Deepest footer / overlays |
| `navy-900` | `#00183C` | **Primary navy** — headings, dark sections, footer |
| `navy-700` | `#0A356E` | Dark-section gradient stop |
| `blue-700` | `#0C3C9C` | Brand gradient end |
| `blue-600` | `#0C48B4` | Brand gradient mid |
| `blue-500` | `#0C60FC` | **Primary accent** — CTAs, gradient words, icons, glows |
| `blue-400` | `#3B82F6` | Hover / soft glow |
| `surface` | `#F4F7FC` | Light-grey alternating sections (blue-tinted) |
| `border` | `#E3E9F2` | Card borders |
| `text` | `#0B1B33` | Body text (navy-black) |
| `text-muted` | `#5A6B85` | Subtext |

- **Brand gradient:** `linear-gradient(135deg, #0C60FC 0%, #0C3C9C 100%)` (the logo's "S" gradient) — used for accent words, primary CTA, and glows.
- **Dark-section gradient:** `linear-gradient(120deg, #00183C 0%, #0A356E 60%, #0C3C9C 100%)`.

### Typography — Manrope (via `next/font`)
- Hero H1: `clamp(2.75rem, 6vw, 4.5rem)`, weight 800, letter-spacing −2%, line-height 1.05.
- Section H2: `clamp(2rem, 4vw, 3rem)`, weight 700–800.
- Card H3: 1.25–1.5rem, weight 700.
- Body: 1rem–1.25rem, weight 400–500, `text-muted`.
- Eyebrow label: 0.875rem, uppercase, `blue-500`, letter-spaced.

### Component conventions
- **Floating pill navbar** (white, rounded ~24px, soft shadow, fixed). Mobile → logo + hamburger → slide/fade menu.
- **Primary CTA**: electric-blue gradient pill, white text, ~12px radius, generous padding, hover-lift + glow.
- **Secondary CTA**: solid `navy-900`, white text (used in dark sections).
- **Cards**: white, `border`, soft shadow, rounded ~16px, hover-lift.
- **List rows**: red-✗ for pain points, `blue-500`-✓ for benefits.
- **Step numbers**: large `blue-500` gradient numerals.

---

## 3. Information Architecture

### `/` — single-scroll landing page
Sections in order:

1. **Navbar** — floating pill, fixed. Mini logo + "Ambliq Solutions"; anchor links (How it works, Results, FAQ); **"Book a Call"** CTA → `/book`. Mobile: hamburger.
2. **Hero** — voice-agent headline with one electric-blue gradient word, subhead (from brand brief), primary CTA → `/book`. Soft blue radial glow + subtle light streaks background.
3. **Problem** — "Every Missed Call Is a Missed Opportunity." Two-column comparison: *Traditional* (scattered/tilted pain icons: missed calls, slow response, after-hours, lost revenue) vs **The Ambliq System** (neat 2×2 benefits grid). Below: red-✗ pain checklist vs blue-✓ benefit checklist.
4. **Voice Agent Features** — "What Your AI Receptionist Does." 3×2 card grid; each card has a **code-built UI mockup** (SVG/CSS, not images): Answers 24/7, Qualifies Leads, Books Appointments, CRM Integration, Multi-Call Handling, Natural & Multilingual.
5. **ROI Calculator** *(from Ambotix)* — interactive, client-side. Inputs: Monthly Calls, Missed-Call %, Conversion %, Avg Customer Value ($). Outputs: Calls Missed/mo, Lost Conversions/mo, Monthly Revenue Lost, **Recovered Revenue/year**. Animated count-up on change and on scroll-in. Formula in §5.
6. **Results** *(from Ambotix)* — big stat numbers (e.g. Hours Saved/Week, % Automated, Client Rating) + testimonial. Placeholder content wired to content file.
7. **What Else We Automate** — secondary service cards: Workflow Automation, Lead Qualification, Appointment Booking, CRM Integration, Customer Follow-up. Keeps Voice Agents primary while showing range.
8. **Integrations** *(dark navy-gradient section)* — floating CRM/tool logos (HubSpot, GoHighLevel, Salesforce, etc.), white headline, secondary CTA.
9. **How It Works** — 3 steps with big blue numerals: Audit → Build & Integrate → Launch & Optimize.
10. **Final CTA** — "Book Your Free AI Audit Call" → `/book`.
11. **FAQ** — shadcn accordion (objection-handling Q&A).
12. **Footer** *(dark navy)* — logo, tagline, anchor links, LinkedIn (company + Umar), copyright.

### `/book` — booking page (minimal)
Navbar + footer; short headline ("Book your free AI audit call") + one line of context; **Calendly embed** using `NEXT_PUBLIC_CALENDLY_URL` (placeholder until Umar provides his link); back-to-home link. Falls back to a tasteful "booking coming soon / email us" card if the env var is unset.

---

## 4. Tech Architecture

- **Framework:** Next.js 15 (App Router) + **TypeScript**.
- **Styling:** Tailwind CSS + **shadcn/ui** primitives (Button, Accordion for FAQ, Input/Label for calculator).
- **Motion:** **Lenis** smooth scroll (site-wide) + **GSAP + ScrollTrigger** for reveals/counters. All motion gated behind `prefers-reduced-motion`.
- **Fonts:** Manrope via `next/font/google` (self-hosted, no layout shift).
- **Content model:** one typed file `src/content/site.ts` holds ALL copy, stats, testimonials, features, services, integration logos, FAQ, ROI defaults, and reads `NEXT_PUBLIC_CALENDLY_URL`. Real content swaps in here with zero layout changes.
- **Feature visuals:** built as SVG/CSS components (`src/components/mockups/*`), recolorable to brand, near-zero weight.
- **Assets pipeline:** copy used logos (prefer transparent `Without BGs/*`) into `public/brand/`; a `scripts/convert-assets.mjs` (sharp) converts to **WebP** (keep PNG fallback for the logo); generate an OG image. Run as a one-off / prebuild step.
- **Project structure (target):**
  ```
  src/
    app/            layout.tsx, page.tsx, book/page.tsx, sitemap.ts, robots.ts, opengraph-image
    components/     navbar, footer, sections/*, mockups/*, ui/* (shadcn), motion/* (Lenis+GSAP wrappers)
    content/        site.ts
    lib/            roi.ts (calc), utils.ts
    styles/         globals.css (tokens, hidden-scrollbar)
  public/brand/     logos (webp + png fallback), og image
  scripts/          convert-assets.mjs
  ```

### Hidden scrollbar (hard requirement)
Scrollbar visually hidden site-wide while remaining fully scrollable: `html{ scrollbar-width:none; -ms-overflow-style:none } html::-webkit-scrollbar{ display:none }`, complemented by Lenis. Keyboard and wheel scrolling unaffected.

### Responsive (hard requirement)
Mobile-first. Tested breakpoints ≈ **390 / 768 / 1024 / 1440px**. Fluid `clamp()` typography, hamburger nav on mobile, grids collapse (3-col → 1-col), comparison columns stack, calculator stacks inputs/outputs. **Verified with Playwright screenshots at each width before sign-off** — not assumed.

### SEO
Next Metadata API (title/description/canonical), OpenGraph + Twitter cards, **JSON-LD** (`Organization` + `Service`), `sitemap.ts`, `robots.ts`, semantic landmarks, descriptive alt text, sensible heading order.

### Performance
Fully static (SSG). No heavy raster images (visuals are SVG/CSS). `next/font` for Manrope. GSAP/Lenis lazy-loaded client-side. Target Lighthouse: Performance ≥ 90, SEO/Best-Practices/Accessibility ≥ 95.

### Backend-readiness
Clean separation so future API routes (lead capture, CRM webhooks) can be added under `src/app/api/*` without restructuring. Calendly handles booking for now.

---

## 5. ROI Calculator logic (`src/lib/roi.ts`)
Given inputs `monthlyCalls`, `missedRate` (%), `conversionRate` (%), `avgValue` ($):
- `missedCalls = monthlyCalls * missedRate/100`
- `lostConversions = missedCalls * conversionRate/100`
- `monthlyRevenueLost = lostConversions * avgValue`
- `recoveredAnnual = monthlyRevenueLost * 12` (assumes the voice agent recovers the missed calls)
Outputs are formatted as currency/integers and animate via count-up. Pure, unit-testable function.

---

## 6. Acceptance Criteria
- [ ] Landing page matches the FutureFlow reference structure/feel, recolored to Ambliq navy + electric blue, Manrope throughout.
- [ ] All 12 landing sections present and populated from `site.ts`.
- [ ] ROI calculator computes correctly and animates; logic unit-tested.
- [ ] `/book` page renders Calendly from env var, with graceful fallback when unset.
- [ ] Scrollbar hidden everywhere; page fully scrollable; Lenis smooth scroll works.
- [ ] Responsive and correct at 390 / 768 / 1024 / 1440px (Playwright-verified).
- [ ] `prefers-reduced-motion` respected.
- [ ] Logo assets copied to `public/brand/` and converted to WebP.
- [ ] SEO metadata, JSON-LD, sitemap, robots present.
- [ ] Lighthouse targets met.
- [ ] All placeholder content clearly swappable via `site.ts`.
