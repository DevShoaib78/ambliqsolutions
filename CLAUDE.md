# CLAUDE.md — Ambliq Solutions Website

Guidance for any AI/dev session working in this repo. Keep this file updated as the project evolves.

## What this is
Marketing website for **Ambliq Solutions**, an AI Automation Agency (founder: Umar Shoaib). Flagship product = **AI Voice Agents** (AI receptionists that answer calls 24/7, qualify leads, book appointments, integrate with business systems). The site's single job is conversion: get service-business owners to **book a call**.

Core message: *Every missed call is a missed opportunity. Every fast response is a chance to win a customer.*

- **Domain:** https://ambliqsolutions.com
- **Design anchor:** mirror https://www.futureflowai.co.uk/ (recolored to Ambliq's brand). ROI calculator + Results blocks adapted from https://www.ambotix.com/.
- **Full design spec:** `docs/superpowers/specs/2026-06-30-ambliq-website-design.md`. Reference screenshots in `docs/references/futureflow/`.

## Repo & git
- **GitHub:** https://github.com/DevShoaib78/ambliqsolutions (default branch `main`).
- **Active dev branch:** `feat/website-build`.
- **COMMIT RULE (important):** commits must show **only `DevShoaib78` (Mohammed Shoaib Choudry)** as author. **Never add a `Co-Authored-By:` trailer or any AI/Claude attribution** to commit messages in this repo. Plain commit messages only.

## Status (current)
Built, functional, and mobile-polished. Landing page (10 sections: Hero, Problem, Features, ROI calculator, Results, Services, Integrations, Process, Final CTA, FAQ) + `/book` (with the **live Calendly calendar**) + SEO. Fully responsive (mobile verified at 360/390/414 plus 768/1024/1440), reduced-motion aware, production build green, pages static (SSG). Em dashes stay out of all user-facing copy.

Current-build highlights:
- **Navbar (PillNav):** centered/contained pill that subtly *narrows on scroll* (width, not height); full AS-mark **+ AMBLIQ wordmark** logo on all sizes; clean redesigned mobile dropdown (white panel, navy text links, gradient CTA). Brand CSS vars live on the wrapper so the dropdown inherits them.
- **Hero:** Aurora WebGL background (brighter, and perf-optimised — pauses when off-screen or the tab is hidden, dpr capped) fills to the very top behind the floating navbar. Intro uses `gsap.fromTo` + `gsap.context().revert()` so text is **never left hidden** on client-side back-nav.
- **Features:** desktop = **pinned horizontal scroll** (heading pinned left, cards flow right→left via ScrollTrigger pin+scrub, releases at the end); mobile/tablet/reduced-motion = plain stacked grid (no scroll-jacking).
- **Problem / Services:** React Bits hover effects — **BorderGlow** on the two big Problem cards, **SpotlightCard** on Service cards (icons rendered as faded bg watermarks). Traditional "pain" tiles scatter on desktop, wrap into chips on mobile.
- **Results:** reworked to **capability benchmarks + a value/promise card** — deliberately NO client/testimonial claims (there are no clients yet).
- **Integrations:** floating **platform-name pills** (not monogram bubbles); CTA is **"Watch Demo"** → a Loom link (`integrationsHeader.ctaHref`).
- **Footer:** redesigned dark footer using the **white full logo** (`logo-full.webp` + `brightness-0 invert`); centered on mobile, multi-column on `md`+.
- **React Bits MCP** is wired up (shadcn MCP + `@react-bits` registry) — see "React Bits MCP" below.
- `origin/main` is the deploy branch and currently equals this branch; pushing fast-forwards `main` (Vercel production).

## Tech stack
Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui (base-ui) · Lenis (smooth scroll) · GSAP + ScrollTrigger · Manrope (`next/font`) · **React Bits** (Pill Nav, Aurora, BorderGlow, SpotlightCard — copied from github.com/DavidHDev/react-bits) · **ogl** (WebGL, for the aurora) · sharp (asset pipeline) · Vitest · Playwright. Fully static (SSG). Deploy target: Vercel.

## React Bits MCP
The official React Bits MCP path = **shadcn's MCP server + the React Bits registry** (not a standalone server). Configured in this repo:
- `components.json` → `registries: { "@react-bits": "https://reactbits.dev/r/{name}.json" }`
- `.mcp.json` → the `shadcn` MCP server (`npx shadcn@latest mcp`), created via `npx shadcn@latest mcp init --client claude`.
Project-scoped MCP servers need approval on session start (run `/mcp`). Then browse/fetch React Bits by name (e.g. "add the SpotlightCard from React Bits"). No GitHub token needed (the token-gated `reactbits-dev-mcp-server` is a *different, community* server). Guide: https://reactbits.dev/get-started/mcp

## Brand (sampled from the logo)
- **Navy `#00183C`** — headings, dark sections, footer, text base.
- **Electric Blue `#0C60FC`** — primary accent: CTAs, gradient words, icons, glows.
- **Brand gradient** `linear-gradient(135deg,#0C60FC,#0C3C9C)`. Font: **Manrope**. Full token table in the spec §2 / `src/app/globals.css`.

## Hard requirements (do not regress)
- **Fully responsive**, mobile-first. Verify with Playwright at **390 / 768 / 1024 / 1440px** — don't assume.
- **Scrollbar hidden site-wide** while scrollable (`scrollbar-width:none` + `::-webkit-scrollbar{display:none}` + Lenis).
- Respect `prefers-reduced-motion` for all animation (incl. the aurora).
- Static output, SEO + performance are priorities (`metadataBase` = the domain, JSON-LD, sitemap, robots).
- **No em dashes** in user-facing copy (keep it this way).

## Structure & conventions
- **All copy/content lives in `src/content/site.ts`** (typed `Site`). Swapping real content must need NO layout change. The Calendly URL is `site.bookPage.calendlyUrl` (currently `calendly.com/umarshoaibdev/30min`, live), overridable via `NEXT_PUBLIC_CALENDLY_URL`.
- Sections in `src/components/sections/*`, assembled in `src/app/page.tsx`. Feature visuals are SVG/CSS in `src/components/mockups/*` (not images).
- **Navbar:** `src/components/layout/Navbar.tsx` is a thin wrapper that configures `src/components/layout/PillNav.tsx` (React Bits). Logo lockup = `public/brand/logo-mini.webp` (AS mark) + `logo-text.webp` (wordmark), both shown on all sizes.
- **React Bits UI:** `src/components/ui/{Aurora,AuroraBackground,BorderGlow,SpotlightCard}.tsx`. BorderGlow needs a **solid** `backgroundColor` (its masking depends on it) — that's why the Ambliq System card is solid navy, not a gradient. SpotlightCard is a lightweight overlay (keeps the card's own bg).
- **Calendly:** `src/components/book/CalendlyEmbed.tsx` explicitly calls `Calendly.initInlineWidget` on mount (do NOT rely on the widget's one-time auto-scan — it breaks on client-side navigation).
- **Hero background:** React Bits Aurora inside `src/components/sections/Hero.tsx` (subtle, brand-tinted, reduced-motion aware).
- **Text colour rule:** body/subtext on white/light backgrounds must be `text-ink` (near-black `#0B1B33`), NOT the grey `text-ink-muted`. `SectionHeading`'s `sub` already uses `text-ink`. Dark sections keep `text-white`/`text-white/80`.
- **Favicon:** `src/app/icon.png` (the AS mark), generated by the asset script.
- **Assets:** `scripts/convert-assets.mjs` **trims transparent padding** from the source logos, emits WebP into `public/brand/`, and builds the favicon. Source PNGs live in `Ambliq Solutions Assets/`. Regenerate with `npm run assets`.
- ROI logic: pure, unit-tested fn in `src/lib/roi.ts`. SEO helpers in `src/lib/seo.ts`; `src/app/{sitemap,robots,opengraph-image}`.
- Shared UI: `src/components/common/{Container,CtaButton,SectionHeading,Logo}`; motion: `src/components/motion/{LenisProvider,Reveal,CountUp}`.

## Env vars
- `NEXT_PUBLIC_SITE_URL` — defaults to `https://ambliqsolutions.com`.
- `NEXT_PUBLIC_CALENDLY_URL` — optional override for the booking calendar (a working default lives in `site.ts`).

## Commands
- `npm run dev` — local dev server (http://localhost:3000)
- `npm run build` / `npm start` — production build / serve
- `npm test` — Vitest (ROI + content tests)
- `npm run assets` — regenerate brand logos + favicon
- `npm run shoot -- <route> <label>` — Playwright screenshots → `docs/verify/` (**run from PowerShell on Windows, not Git Bash** — bash mangles the `/` route arg)

## Pending from Umar (all swap in via `site.ts`, no layout change)
- Real **integration logos** (Integrations currently uses styled platform-name pills — swap for `<img>` logos when provided).
- Optional: real **result metrics** if/when there's data (Results now uses honest *capability benchmarks*, not client claims — fine to keep pre-launch).
- Resolved this session: the client **testimonial** was removed (no clients yet); the **white footer logo** now uses `logo-full.webp` with a `brightness-0 invert` filter.

## Notes for future sessions
- `docs/verify/` (QA screenshots) and any `.superpowers/` (build-process scratch) are gitignored throwaways — safe to delete/regenerate.
- React Bits components are MIT-licensed copies; reactbits.dev is a JS SPA, so source them from the `DavidHDev/react-bits` GitHub registry (`public/r/<Component>-TS-TW.json`) or its CLI.
