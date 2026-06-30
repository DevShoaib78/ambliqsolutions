# CLAUDE.md — Ambliq Solutions Website

Guidance for any AI/dev session working in this repo. Keep this file updated as the project evolves.

## What this is
Marketing website for **Ambliq Solutions**, an AI Automation Agency (founder: Umar Shoaib). Flagship product = **AI Voice Agents** (AI receptionists that answer calls 24/7, qualify leads, book appointments, integrate with business systems). The site's single job is conversion: get service-business owners to **book a call**.

Core message: *Every missed call is a missed opportunity. Every fast response is a chance to win a customer.*

- **Domain:** https://ambliqsolutions.com
- **Design anchor:** mirror https://www.futureflowai.co.uk/ (recolored to Ambliq's brand). ROI calculator + Results blocks adapted from https://www.ambotix.com/.
- **Full design spec:** `docs/superpowers/specs/2026-06-30-ambliq-website-design.md` — read this first.

## Status
Pre-scaffold → implementation. Design approved; spec committed. The Next.js app is being built per the spec/plan. Update this section as milestones land.

## Tech stack
Next.js 15 (App Router) · TypeScript · Tailwind CSS · shadcn/ui · Lenis (smooth scroll) · GSAP + ScrollTrigger (animation) · Manrope font (`next/font`). Fully static (SSG). Deploy target: Vercel.

## Brand (sampled from `Ambliq Solutions Assets/Logo with white BG.png`)
- **Navy `#00183C`** — headings, dark sections, footer, text base.
- **Electric Blue `#0C60FC`** — primary accent: CTAs, gradient words, icons, glows.
- **Brand gradient** `linear-gradient(135deg,#0C60FC,#0C3C9C)` (the logo's "S" gradient).
- Font: **Manrope**. Full token table in the spec §2.
- Recolor mapping from FutureFlow: their violet `#7C3AED` → our `#0C60FC`; their slate `#0F172A` → our `#00183C`.

## Hard requirements (do not regress)
- **Fully responsive** on mobile/tablet/desktop. Mobile-first. Verify with Playwright screenshots at **390 / 768 / 1024 / 1440px** before claiming done — don't assume.
- **Scrollbar hidden site-wide** while staying fully scrollable (`scrollbar-width:none` + `::-webkit-scrollbar{display:none}` + Lenis).
- Respect `prefers-reduced-motion` for all animation.
- Performance + SEO are priorities: static output, no heavy raster images (visuals are SVG/CSS), `metadataBase` = the domain, JSON-LD, sitemap, robots.

## Conventions
- **All copy/content lives in `src/content/site.ts`** (typed) — headlines, stats, testimonials, features, services, integration logos, FAQ, ROI defaults. Currently placeholders (no real client data yet); swapping in real content must require NO layout changes.
- **Feature visuals are code** (SVG/CSS in `src/components/mockups/*`), not images — recolorable to brand, near-zero weight.
- **Booking** is a separate `/book` page with a Calendly embed driven by `NEXT_PUBLIC_CALENDLY_URL` (placeholder until Umar provides his link); graceful fallback if unset. All "Book a Call" CTAs link to `/book`.
- **Assets:** used logos copied into `public/brand/` and converted to **WebP** (PNG fallback for the logo) via `scripts/convert-assets.mjs`. Source assets stay in `Ambliq Solutions Assets/`.
- ROI calc logic is a pure, unit-tested function in `src/lib/roi.ts` (formula in spec §5).

## Env vars
- `NEXT_PUBLIC_SITE_URL` — defaults to `https://ambliqsolutions.com`.
- `NEXT_PUBLIC_CALENDLY_URL` — Umar's Calendly link (unset for now).

## Commands (once scaffolded)
- `npm run dev` — local dev server
- `npm run build` / `npm start` — production build
- `node scripts/convert-assets.mjs` — regenerate WebP assets

## Pending from Umar
- Calendly link + event details (see spec / project notes).
- Real testimonials, results/numbers, client & integration logos.
