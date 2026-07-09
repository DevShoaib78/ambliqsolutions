# CLAUDE.md — Ambliq Solutions Website

Guidance for any AI/dev session working in this repo. Keep this file updated as the project evolves.

## What this is
Marketing website for **Ambliq Solutions**, an AI Automation Agency (founder: Umar Shoaib). Flagship product = **AI Voice Agents** (AI receptionists that answer calls 24/7, qualify leads, book appointments, integrate with business systems). The site's single job is conversion: get service-business owners to **book a call**.

Core message: *Every missed call is a missed opportunity. Every fast response is a chance to win a customer.*

- **Domain:** https://www.ambliqsolutions.com (canonical, with `www`)
- **Design anchor:** mirror https://www.futureflowai.co.uk/ (recolored to Ambliq's brand). ROI calculator + Results blocks adapted from https://www.ambotix.com/.
- **Full design spec:** `docs/superpowers/specs/2026-06-30-ambliq-website-design.md`. Reference screenshots in `docs/references/futureflow/`.

## Repo & git
- **GitHub (primary):** https://github.com/DevShoaib78/ambliqsolutions (default branch `main`). Remote: `origin`.
- **GitHub (mirror):** https://github.com/umarshoaibdev-cloud/ambliq_solutions_website (branch `main`, note the underscores). Remote: `umar`.
- **Active dev branch:** `feat/website-build`.
- **COMMIT RULE (important):** every commit must show **only `DevShoaib78` — Mohammed Shoaib Choudry `<mohammedshoaibchy78@gmail.com>`** as **both author and committer**. **NEVER add a `Co-Authored-By:` trailer or any Claude/AI/other-person attribution.** Just his name, always. Plain commit messages only.
- **PUSH RULE (important):** when asked to "push the codebase" (as DevShoaib78), push to **BOTH** repos' `main`:
  - `git push origin HEAD:main` → `DevShoaib78/ambliqsolutions.git`
  - `git push umar HEAD:main` → `umarshoaibdev-cloud/ambliq_solutions_website.git`
  Both authored solely by DevShoaib78, no co-author. If the `umar` remote is missing: `git remote add umar https://github.com/umarshoaibdev-cloud/ambliq_solutions_website.git`.
- **UMAR-REPO RULE (important):** the `umar` repo is the one wired to Vercel, and Vercel only deploys pushes from the repo **owner** (DevShoaib78 is a collaborator, so his commits do not trigger a deploy). So commits that must reach the live domain have to be authored **and** committed as `umarshoaibdev-cloud <umarshoaibdev@gmail.com>`:
  `git -c user.name="umarshoaibdev-cloud" -c user.email="umarshoaibdev@gmail.com" commit -m "<plain message>"` — still **no `Co-Authored-By:` trailer, no AI attribution**.
- **NEVER ship these to the `umar` repo:** `CLAUDE.md`, `AGENTS.md`, `.mcp.json`, `docs/superpowers/`. They were deleted from `umar/main` in `aeccdff`. A plain `git push umar HEAD:main` from `feat/website-build` would re-add them, so build the commit from a tree with those paths removed (e.g. a temp `GIT_INDEX_FILE` + `git rm --cached` + `git commit-tree`).

## Status (current)
Built, functional, and mobile-polished. Landing page (10 sections: Hero, Problem, Features, ROI calculator, Results, Services, Integrations, Process, Final CTA, FAQ) + `/book` (with the **live Calendly calendar**) + SEO. Fully responsive (mobile verified at 360/390/414 plus 768/1024/1440), reduced-motion aware, production build green, pages static (SSG). Em dashes stay out of all user-facing copy.

The whole design was pulled closer to the FutureFlow anchor (recolored to Ambliq brand: navy/electric-blue, our own copy/icons). Current-build highlights:
- **Navbar:** plain custom `Navbar.tsx` (React Bits PillNav removed) — floating white pill, logo left, **plain-text centered links**, gradient CTA right; subtly narrows on scroll; clean white mobile dropdown. Full AS-mark **+ AMBLIQ wordmark** on all sizes.
- **Hero:** **pure-CSS** electric-blue radial background (`.hero-radial` = `radial-gradient(120% 120% at 50% 100%, #fff 34%, #0c60fc 100%)`) plus a drifting `.hero-shimmer` light layer. No WebGL. Both layers are built from white/blue only, so **no dark or black tones are possible** (a hard requirement from Umar). Intro uses `gsap.fromTo` + `gsap.context().revert()` so text is **never left hidden** on client-side back-nav.
- **Problem:** two **light** comparison cards (FutureFlow style) — a tinted panel of white icon-cards (rose for Traditional, blue for The Ambliq System) + an icon/title list below. Icons are large and bold (`strokeWidth 2.25`, no badge); Traditional cards get a slight per-card tilt (`TILT`). **No floating/animated icons** and **no star badge** on the heading (both explicitly rejected).
- **Features ("What It Does"):** desktop = **pinned horizontal scroll** (heading pinned left, cards flow right→left, ScrollTrigger pin+scrub); mobile/tablet/reduced-motion = stacked grid. Mockup illustration panels are **light** (`white→#dbeafe`, matching the hero) and every mockup element is dark/blue so it stays readable.
- **Services ("What Else We Automate"):** white cards with a **bespoke illustration** per service (`components/services/ServiceArt.tsx` — voice waveform, workflow flow-nodes, lead-qualification list, calendar, CRM sync) on a light frame, then **centered** title/description.
- **Results:** **capability benchmarks + a value/promise card** — deliberately NO client/testimonial claims (no clients yet).
- **Integrations:** **real platform logos** on **brand-tinted tiles** (each card is a pale wash of that brand's colour). Six come from `simple-icons` (HubSpot, Calendly, Make, Zapier, Notion, **n8n**); Salesforce, Twilio and GoHighLevel are official logo files in `public/brand/logos/` (they're not in simple-icons). CTA is **"Book a Call" → `/book`** (`integrationsHeader.ctaHref`).
- **Footer:** dark footer with the **white full logo** (`logo-full.webp` + `brightness-0 invert`); centered on mobile.
- **Scroll-to-top:** floating lower-right button (`common/ScrollToTop.tsx`) → smooth-scrolls to hero (uses the Lenis instance exposed on `window.lenis`).
- **Mobile:** `overflow-x-clip` on the content wrapper kills any decorative-blur horizontal overflow (no more zoom-out / white right bar). Verified no overflow at 360/390/414.
- **SEO/AEO:** canonical host is **`https://www.ambliqsolutions.com`** (note the `www`). Full metadata (canonical, robots, keywords, OG + Twitter), a **static** `public/og-image.png` (1200x630, white logo on brand navy) so WhatsApp/LinkedIn previews show the logo + description, and JSON-LD for **Organization + WebSite + Service + FAQPage**. Site is now **100% static** (the dynamic `opengraph-image` route was removed).
- **React Bits MCP** is still wired up (shadcn MCP + `@react-bits` registry) — see below — but **no React Bits component remains in the codebase**. PillNav, Aurora, BorderGlow and SpotlightCard were all removed; `ogl` was uninstalled with the WebGL aurora.
- `origin/main` is the deploy branch; the `umar` mirror is a separate single-author history (see PUSH RULE).

## Tech stack
Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui (base-ui) · Lenis (smooth scroll) · GSAP + ScrollTrigger · Manrope (`next/font`) · **simple-icons** (integration logos) · sharp (asset + OG-image pipeline) · Vitest · Playwright. No WebGL (the hero is pure CSS). Fully static (SSG). Deploy target: Vercel.

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
- Respect `prefers-reduced-motion` for all animation (incl. the hero radial/shimmer drift).
- Static output, SEO + performance are priorities (`metadataBase` = the domain, JSON-LD, sitemap, robots).
- **No em dashes** in user-facing copy (keep it this way).

## Structure & conventions
- **All copy/content lives in `src/content/site.ts`** (typed `Site`). Swapping real content must need NO layout change. The Calendly URL is `site.bookPage.calendlyUrl` (currently `calendly.com/umarshoaibdev/30min`, live), overridable via `NEXT_PUBLIC_CALENDLY_URL`.
- Sections in `src/components/sections/*`, assembled in `src/app/page.tsx`. Feature visuals are SVG/CSS in `src/components/mockups/*` (not images).
- **Navbar:** `src/components/layout/Navbar.tsx` is a **self-contained** floating pill (no React Bits) — logo left, plain-text centered links from `site.nav`, gradient CTA, scroll-narrowing, animated mobile hamburger + white dropdown. Logo lockup = `public/brand/logo-mini.webp` (AS mark) + `logo-text.webp` (wordmark), both shown on all sizes.
- **`src/components/ui/`** holds shadcn primitives plus `AuroraBackground.tsx`, which is now just two divs (`.hero-radial` + `.hero-shimmer`, styled in `globals.css`). No React Bits code left anywhere.
- **Integrations logos:** two sources. (1) `simple-icons` for freely-licensed marks — set `site.integrations[].slug` and import the `si<Name>` export in `Integrations.tsx`. (2) For brands NOT in simple-icons (Salesforce, Twilio, GoHighLevel), an official logo file in `public/brand/logos/` mapped via `LOGO_IMG` in `Integrations.tsx`. Each tile is tinted with the brand colour (`NAME_COLOR` / the icon's `hex`).
- **Mobile overflow guard:** the content wrapper in `layout.tsx` has `overflow-x-clip` — keep decorative blurs/glows from creating a horizontal scrollbar. Don't remove it.
- **Scroll-to-top:** `ScrollToTop.tsx` uses `window.lenis` (exposed by `LenisProvider`) for smooth scroll, falling back to native.
- **Calendly:** `src/components/book/CalendlyEmbed.tsx` explicitly calls `Calendly.initInlineWidget` on mount (do NOT rely on the widget's one-time auto-scan — it breaks on client-side navigation).
- **Hero background:** `AuroraBackground.tsx` renders `.hero-radial` (electric-blue radial) + `.hero-shimmer` (drifting light), both defined in `globals.css` and reduced-motion aware. **Never introduce a dark/black tone here** — Umar rejected that repeatedly; only white/blue stops.
- **Text colour rule:** body/subtext on white/light backgrounds must be `text-ink` (near-black `#0B1B33`), NOT the grey `text-ink-muted`. `SectionHeading`'s `sub` already uses `text-ink`. Dark sections keep `text-white`/`text-white/80`.
- **Favicon:** `src/app/icon.png` (the AS mark), generated by the asset script.
- **Assets (all WebP):** `scripts/convert-assets.mjs` **trims transparent padding** from the source logos, emits WebP into `public/brand/`, and builds the favicon. Source PNGs live in `Ambliq Solutions Assets/` (keep them — the script reads them). Regenerate with `npm run assets`.
  - **Only two rasters are intentionally NOT WebP:** `src/app/icon.png` (favicon) and `public/og-image.png` (social preview). Link-preview crawlers (WhatsApp/iMessage/LinkedIn) do not reliably render WebP `og:image`s. Don't "optimise" these to WebP.
- **Social preview:** `scripts/make-og.mjs` builds `public/og-image.png` (white logo silhouette on the brand navy gradient + headline). Regenerate with `npm run og`; it is referenced from `defaultMetadata.openGraph.images`.
- ROI logic: pure, unit-tested fn in `src/lib/roi.ts` (default `avgValue` is **500**). SEO helpers in `src/lib/seo.ts`; `src/app/{sitemap,robots}` (the dynamic `opengraph-image` route was removed in favour of the static PNG).
- Shared UI: `src/components/common/{Container,CtaButton,SectionHeading,Logo}`; motion: `src/components/motion/{LenisProvider,Reveal,CountUp}`.

## Env vars
- `NEXT_PUBLIC_SITE_URL` — defaults to `https://www.ambliqsolutions.com`. It drives `metadataBase`, canonical, OG url, sitemap and robots, so it must match the live host exactly.
- `NEXT_PUBLIC_CALENDLY_URL` — optional override for the booking calendar (a working default lives in `site.ts`).

## Commands
- `npm run dev` — local dev server (http://localhost:3000)
- `npm run build` / `npm start` — production build / serve
- `npm test` — Vitest (ROI + content tests)
- `npm run assets` — regenerate brand logos (WebP) + favicon
- `npm run og` — regenerate `public/og-image.png` (social/WhatsApp preview image)
- `npm run shoot -- <route> <label>` — Playwright screenshots → `docs/verify/` (**run from PowerShell on Windows, not Git Bash** — bash mangles the `/` route arg)

## Pending from Umar (all swap in via `site.ts`, no layout change)
- **Salesforce / Twilio / GoHighLevel** render as name tiles (not in `simple-icons`). Provide their SVGs → drop into `public/brand/logos/` and render via `<img>` in `Integrations.tsx` if real marks are wanted.
- Optional: real **result metrics** if/when there's data (Results uses honest *capability benchmarks*, not client claims — fine pre-launch).
- **401 console error (reported by Umar):** could NOT be reproduced locally — the site is fully static with no `fetch`/API calls. Almost certainly environment-specific (Vercel **Deployment Protection** returning 401 on a protected/preview URL, or a browser extension, or the benign Calendly `requestStorageAccess` warning). Check Vercel → Settings → Deployment Protection.

## Notes for future sessions
- `docs/verify/` (QA screenshots) and any `.superpowers/` (build-process scratch) are gitignored throwaways — safe to delete/regenerate.
- The design mirrors the FutureFlow anchor recolored to Ambliq's brand: reimplement its **layout patterns** with our own copy/icons/brand colours — do not copy its assets or text.
- React Bits is now down to Aurora only; if you add more, they're MIT-licensed copies sourced from the `DavidHDev/react-bits` GitHub registry (or via the shadcn `@react-bits` MCP).
