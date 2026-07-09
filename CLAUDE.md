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
- **COMMIT RULE (important):** **NEVER add a `Co-Authored-By:` trailer, a `Generated with Claude Code` line, or any Claude/AI/other-person attribution to any commit, in either repo.** Plain commit messages only. Exactly two identities are ever allowed, and each commit must use the same one for **both author and committer**:
  - `Mohammed Shoaib Choudry <mohammedshoaibchy78@gmail.com>` (DevShoaib78) — the default for everything.
  - `umarshoaibdev-cloud <umarshoaibdev@gmail.com>` — **only** for the final deploy-trigger commit on the `umar` repo (see PUSH RULE step 3).

- **PUSH RULE (important):** "push the codebase" always means push to **BOTH** repos' `main`. Never one without the other unless explicitly told otherwise.

  **1. Primary repo** — https://github.com/DevShoaib78/ambliqsolutions (remote `origin`). Push the branch as-is, **including** `CLAUDE.md`, `AGENTS.md`, `.mcp.json` and `docs/superpowers/`:
  ```
  git push origin HEAD:main
  ```
  All commits authored + committed by DevShoaib78.

  **2. Mirror repo, first push (as DevShoaib78)** — https://github.com/umarshoaibdev-cloud/ambliq_solutions_website (remote `umar`, note the underscores). This records Shoaib's contribution in the mirror. The tree must have the AI files stripped (see next rule), so build it with a temp index rather than pushing the branch directly:
  ```
  export GIT_INDEX_FILE=/tmp/umar.index && rm -f "$GIT_INDEX_FILE"
  git read-tree HEAD
  git rm --cached -r -q --ignore-unmatch CLAUDE.md AGENTS.md .mcp.json docs/superpowers
  TREE=$(git write-tree)
  C1=$(git -c user.name="Mohammed Shoaib Choudry" -c user.email="mohammedshoaibchy78@gmail.com" \
        commit-tree "$TREE" -p "$(git rev-parse umar/main)" -m "<plain message>")
  git push umar "$C1:refs/heads/main"
  ```

  **3. Mirror repo, second push (as umarshoaibdev-cloud)** — an empty commit on top, so the branch **tip** is owned by the repo owner. Vercel's free tier only deploys commits authored by the owner (DevShoaib78 is a collaborator, so his commit alone will not trigger a build); this second push is what makes the live domain update:
  ```
  C2=$(git -c user.name="umarshoaibdev-cloud" -c user.email="umarshoaibdev@gmail.com" \
        commit-tree "$TREE" -p "$C1" -m "<plain message>")
  git push umar "$C2:refs/heads/main"
  ```
  Same `$TREE`, so this commit is empty (no file changes) but produces a new SHA, which is what Vercel builds. Still **no `Co-Authored-By:`, no AI attribution**.

  If the `umar` remote is missing: `git remote add umar https://github.com/umarshoaibdev-cloud/ambliq_solutions_website.git`.

- **NEVER ship these to the `umar` repo:** `CLAUDE.md`, `AGENTS.md`, `.mcp.json`, `docs/superpowers/`. They were deleted from `umar/main` in `aeccdff`. A plain `git push umar HEAD:main` from `feat/website-build` would silently re-add them — always build the commit from a stripped tree as shown above.
- **NEVER force-push / rewrite `umar/main`.** Shoaib's earlier commits stay in that history on purpose.
- **Authentication note:** pushes authenticate with DevShoaib78's GitHub token regardless of the commit author, so GitHub records the *pusher* as DevShoaib78 on both repos. That is expected. Commit author is a plain metadata field; it is what Vercel checks.

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
- **ROI calculator:** the big highlighted figure is **"Monthly revenue recovered"** (`monthlyRevenueRecovered`), with the annual figure demoted to a supporting line under it. "Monthly revenue lost" stays in the grid above. Deliberately not called "profit" (we do not model Ambliq's price).
- **Booking:** `/book` renders the Calendly calendar as a **server-side `<iframe>` in the static HTML** (no `widget.js`), so it starts fetching during page parse instead of after hydration.
- **Footer:** dark footer with the **white full logo** (`logo-full.webp` + `brightness-0 invert`); centered on mobile.
- **Scroll-to-top:** floating lower-right button (`common/ScrollToTop.tsx`) → jumps **instantly** to the hero (`lenis.scrollTo(0, { immediate: true })`). Umar rejected the smooth version: gliding up from the FAQ flies through every section and reads as a jittery blur on a phone.
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
- **Scroll-to-top:** `ScrollToTop.tsx` uses `window.lenis` (exposed by `LenisProvider`) and scrolls with `{ immediate: true, force: true }`. Keep it instant.
- **Calendly:** `src/components/book/CalendlyEmbed.tsx` is a **server component that renders a plain `<iframe>`** (`?embed_domain=<host>&embed_type=Inline`). It no longer loads Calendly's `widget.js`: that script forced a serial hydrate → fetch script → parse → build iframe → fetch calendar chain, so the calendar visibly lagged. Emitting the iframe in the static HTML means the browser fetches Calendly while it is still parsing the page. `layout.tsx` also preconnects to `https://calendly.com`. Do not reintroduce `widget.js` (its DOM auto-scan runs only once and breaks on client-side navigation).
- **`LENIS DIMENSION TRAP` (important):** Lenis caches page dimensions **per route** and never recomputes them on a client-side navigation. Two symptoms, both real bugs we hit: (a) it **clamps every scroll target to the stale limit**, so after a trip to `/book` a deep target gets clamped down to the booking page's max scroll and the user is stranded near the top (this was the real cause of "the navbar doesn't work after visiting the booking page"); (b) on the short `/book` page it still thinks the page is home-sized, so its virtual scroll runs thousands of pixels past the real bottom and **scrolling back up does nothing until that phantom distance unwinds**. **Always call `lenis.resize()` before `lenis.scrollTo(...)`** and on every route change (see `Navbar.tsx` and `motion/RouteScroll.tsx`).
- **`motion/RouteScroll.tsx`** owns scroll across route changes and does three things: resizes Lenis; lands on a hash like `/#roi`; and resets forward navigations to the top (so `/book` entered from the footer never opens part-way down) while leaving back/forward to the browser's own scroll restoration (guarded by a `popstate` flag). The hash landing refreshes ScrollTrigger, then waits until the target's document position and page height hold steady for 3 consecutive frames. **Do not "simplify" that to a `setTimeout`** — the router jumps before the Features pin spacer exists (>1200px on desktop), so a fixed delay reads a half-built layout and lands thousands of pixels off. It also passes Lenis an **absolute pixel target**, never an element, because Lenis derives an element's target from its own stale scroll baseline. Everything aborts on `wheel`/`touchstart` so it never fights the user.
- **Anchor offset:** sections get `scroll-margin-top: 6rem` in `globals.css`. Both Lenis **and** native `scrollIntoView` subtract it, so do NOT also pass an `offset` to `lenis.scrollTo` — that double-counts and lands 192px low.
- **Hero background:** `AuroraBackground.tsx` renders `.hero-radial` (electric-blue radial) + `.hero-shimmer` (drifting light), both defined in `globals.css` and reduced-motion aware. **Never introduce a dark/black tone here** — Umar rejected that repeatedly; only white/blue stops.
- **Text colour rule:** body/subtext on white/light backgrounds must be `text-ink` (near-black `#0B1B33`), NOT the grey `text-ink-muted`. `SectionHeading`'s `sub` already uses `text-ink`. Dark sections keep `text-white`/`text-white/80`.
- **Favicon:** `src/app/icon.png` (the AS mark), generated by the asset script.
- **Assets (all WebP):** `scripts/convert-assets.mjs` **trims transparent padding** from the source logos, emits WebP into `public/brand/`, and builds the favicon. Source PNGs live in `Ambliq Solutions Assets/` (keep them — the script reads them). Regenerate with `npm run assets`.
  - **Only two rasters are intentionally NOT WebP:** `src/app/icon.png` (favicon) and `public/og-image.png` (social preview). Link-preview crawlers (WhatsApp/iMessage/LinkedIn) do not reliably render WebP `og:image`s. Don't "optimise" these to WebP.
- **Social preview:** `scripts/make-og.mjs` builds `public/og-image.png` (white logo silhouette on the brand navy gradient + headline). Regenerate with `npm run og`; it is referenced from `defaultMetadata.openGraph.images`.
- ROI logic: pure, unit-tested fn in `src/lib/roi.ts` (default `avgValue` is **500**). The result card's **big highlighted figure is `monthlyRevenueRecovered`** (not the annual number, which is now a supporting line beneath it). `RECOVERY_RATE = 0.8` in `roi.ts` is a deliberately conservative assumption (the agent answers every call, but not every caller engages), surfaced to the user as `site.roi.outputs.recoveryNote` so the headline figure is never presented as a guarantee. It is NOT called "profit": we do not model Ambliq's price, so revenue minus cost is unknown. SEO helpers in `src/lib/seo.ts`; `src/app/{sitemap,robots}` (the dynamic `opengraph-image` route was removed in favour of the static PNG).
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
- **Empty deploy-trigger commit (UNVERIFIED):** PUSH RULE step 3 pushes an empty, owner-authored commit to `umar/main` to make Vercel build. A new SHA should always create a deployment, but we have never actually watched an *empty* one deploy (the commit that proved the owner-author theory carried real file changes). If the domain does not update after a push, this is the first thing to check; the fallback is to make the owner-authored commit the one that carries the file changes.
- **"Booking page starts at the footer" (reported by Umar, NOT reproduced):** could not be reproduced at 390/1440, headless or headed, from the footer/navbar/in-page CTA, on either the local build or the live site. `/book` landed at `scrollY 0` every time. A real defect with the same symptom *was* found and fixed (the Lenis dimension trap: `lenis.limit` stayed at the home page's height, so scrolling back up had to unwind thousands of pixels of phantom distance). If it recurs, ask which browser and whether it happens on a hard load of `/book` or only when navigating from home.
- **401 console error (reported by Umar):** could NOT be reproduced locally — the site is fully static with no `fetch`/API calls. Almost certainly environment-specific (Vercel **Deployment Protection** returning 401 on a protected/preview URL, or a browser extension, or the benign Calendly `requestStorageAccess` warning). Check Vercel → Settings → Deployment Protection.

## Notes for future sessions
- `docs/verify/` (QA screenshots) and any `.superpowers/` (build-process scratch) are gitignored throwaways — safe to delete/regenerate.
- The design mirrors the FutureFlow anchor recolored to Ambliq's brand: reimplement its **layout patterns** with our own copy/icons/brand colours — do not copy its assets or text.
- React Bits is now down to Aurora only; if you add more, they're MIT-licensed copies sourced from the `DavidHDev/react-bits` GitHub registry (or via the shadcn `@react-bits` MCP).
