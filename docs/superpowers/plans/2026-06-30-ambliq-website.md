# Ambliq Solutions Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a high-performance, fully-responsive marketing website for Ambliq Solutions — a single-scroll landing page modeled on futureflowai.co.uk (recolored to Ambliq's brand) plus a separate Calendly booking page — that converts service-business owners into booked calls.

**Architecture:** Next.js 15 App Router, statically rendered. All content lives in one typed file (`src/content/site.ts`). Sections are isolated components assembled in `app/page.tsx`. Smooth scroll via Lenis; scroll-reveal/counter animation via GSAP+ScrollTrigger, all gated by `prefers-reduced-motion`. Feature visuals are SVG/CSS (no raster). Booking is a Calendly embed driven by an env var.

**Tech Stack:** Next.js 15 · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui · Lenis · GSAP/ScrollTrigger · Manrope (`next/font`) · Vitest (logic tests) · Playwright (visual/responsive verification) · sharp (WebP conversion).

## Global Constraints

Every task implicitly inherits these (verbatim from the spec):

- **Brand Navy `#00183C`**; **Electric Blue `#0C60FC`**; brand gradient `linear-gradient(135deg,#0C60FC,#0C3C9C)`. Full token table in spec §2. Font: **Manrope**.
- **Fully responsive**, mobile-first. Verified with Playwright at **390 / 768 / 1024 / 1440px** before any task is "done". Don't assume — screenshot it.
- **Scrollbar hidden site-wide** (`scrollbar-width:none` + `::-webkit-scrollbar{display:none}`), page stays fully scrollable.
- **`prefers-reduced-motion` respected** for all animation.
- **All copy/content from `src/content/site.ts`** — no hard-coded strings in components. Placeholders OK; swapping real content must need no layout change.
- **Canonical domain** `https://ambliqsolutions.com` via `NEXT_PUBLIC_SITE_URL` (default) → `metadataBase`.
- **Calendly** via `NEXT_PUBLIC_CALENDLY_URL` (unset for now → graceful fallback). All "Book a Call" CTAs → `/book`.
- Static output (SSG). No heavy raster images — visuals are SVG/CSS. Lighthouse targets: Perf ≥ 90, SEO/A11y/Best-Practices ≥ 95.
- Visual reference screenshots live in `docs/references/futureflow/shots/` and computed tokens in `docs/references/futureflow/tokens.json`. **Match the reference's layout/feel, recolored to brand.**

## UI verification methodology (read once)

Pure logic (ROI calc, content schema, sitemap) uses **TDD**: failing Vitest test → implement → pass → commit.

UI/section tasks use **build-and-verify** (frontend has no meaningful unit test before pixels exist):
1. Build the component, wired to `site.ts`, using the brand tokens.
2. Run the dev server and capture it with `scripts/shoot.mjs <route> <label>` at 390/768/1024/1440px.
3. **Read the screenshots** and compare against the matching reference shot in `docs/references/futureflow/shots/` (recolored). Fix until it matches and is responsive.
4. Commit.

---

## File Structure

```
src/
  app/
    layout.tsx              Root layout: metadata, metadataBase, Manrope font, Lenis provider, Organization JSON-LD
    page.tsx                Landing page: assembles all sections in order
    globals.css             Tailwind v4 import, @theme tokens, base styles, hidden-scrollbar
    book/page.tsx           Booking page: Calendly embed + fallback
    sitemap.ts              SEO sitemap
    robots.ts               SEO robots
    opengraph-image.tsx     OG image (static generation)
  components/
    layout/Navbar.tsx       Floating pill nav, responsive hamburger
    layout/Footer.tsx       Dark navy footer
    layout/MobileMenu.tsx   Hamburger drawer
    motion/LenisProvider.tsx  Client: Lenis init + reduced-motion
    motion/Reveal.tsx       Client: GSAP ScrollTrigger fade-up wrapper
    motion/CountUp.tsx      Client: GSAP number count-up
    sections/Hero.tsx
    sections/Problem.tsx
    sections/Features.tsx
    sections/RoiCalculator.tsx
    sections/Results.tsx
    sections/Services.tsx        ("What else we automate")
    sections/Integrations.tsx
    sections/Process.tsx
    sections/FinalCta.tsx
    sections/Faq.tsx
    mockups/*.tsx           SVG/CSS feature visuals (one per feature)
    ui/*                    shadcn primitives (button, accordion, input, label)
    common/Container.tsx    Max-width wrapper
    common/SectionHeading.tsx  Eyebrow + H2 + subhead
    common/CtaButton.tsx    Brand gradient / navy CTA → /book
    common/Logo.tsx         Renders public/brand logo (picture: webp + png)
  content/site.ts           ALL site content (typed)
  lib/roi.ts                Pure ROI calculation
  lib/utils.ts              cn() helper (shadcn)
  lib/seo.ts                Shared metadata + JSON-LD builders
scripts/
  convert-assets.mjs        Copy logos → public/brand + WebP (sharp)
  shoot.mjs                 Playwright multi-width screenshots of a route
public/brand/               Generated logos (webp + png fallback) + og
tests/
  roi.test.ts               Vitest: ROI logic
  content.test.ts           Vitest: content schema validity
vitest.config.ts
```

---

## Task 1: Scaffold Next.js app and dependencies

**Files:**
- Create (generated): `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `src/app/{layout,page}.tsx`, `src/app/globals.css`
- Test: dev server + production build succeed

The project root is **non-empty** (`.git`, `CLAUDE.md`, `docs/`, `Ambliq Solutions Assets/`, `.gitignore`), so `create-next-app` can't run in place. Scaffold into a temp dir and merge up.

- [ ] **Step 1: Scaffold into temp dir (non-interactive)**

```bash
cd "C:/Devspace/webprojects/Ambliq Solutions"
npx --yes create-next-app@latest .scaffold-tmp \
  --ts --tailwind --app --src-dir --eslint \
  --import-alias "@/*" --use-npm --turbopack --no-git --yes
```
Expected: `Success! Created ... .scaffold-tmp`.

- [ ] **Step 2: Merge scaffold into root, then remove temp**

```bash
cd "C:/Devspace/webprojects/Ambliq Solutions"
shopt -s dotglob
# don't clobber our own files
mv .scaffold-tmp/* . 2>/dev/null
mv .scaffold-tmp/.* . 2>/dev/null
rm -rf .scaffold-tmp
# keep our richer .gitignore if create-next-app overwrote it (re-add our extras if missing)
git checkout -- .gitignore 2>/dev/null || true
ls package.json next.config.ts src/app/layout.tsx
```
Expected: the three paths listed exist.

- [ ] **Step 3: Install runtime + dev dependencies**

```bash
cd "C:/Devspace/webprojects/Ambliq Solutions"
npm install lenis gsap clsx tailwind-merge class-variance-authority lucide-react
npm install -D sharp vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom playwright
npx playwright install chromium
```
Expected: installs succeed, `node_modules/lenis` and `node_modules/gsap` exist.

- [ ] **Step 4: Initialize shadcn/ui and add primitives**

```bash
cd "C:/Devspace/webprojects/Ambliq Solutions"
npx --yes shadcn@latest init -d
npx --yes shadcn@latest add button accordion input label -y
```
Expected: `src/components/ui/button.tsx` etc. created, `src/lib/utils.ts` created.

- [ ] **Step 5: Add scripts to package.json**

Add to the `"scripts"` block:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "assets": "node scripts/convert-assets.mjs",
    "shoot": "node scripts/shoot.mjs"
  }
}
```

- [ ] **Step 6: Create `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  test: { environment: 'jsdom', globals: true, include: ['tests/**/*.test.ts?(x)'] },
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
})
```

- [ ] **Step 7: Verify build + dev boot**

```bash
cd "C:/Devspace/webprojects/Ambliq Solutions"
npm run build
```
Expected: `✓ Compiled successfully`, a static `/` route in the build output.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 15 app with Tailwind v4, shadcn, Lenis, GSAP"
```

---

## Task 2: Brand design tokens, fonts, globals, hidden scrollbar

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx` (Manrope font wiring)

**Interfaces:**
- Produces: Tailwind utility classes for brand colors (`bg-navy-900`, `text-blue-500`, etc.), the `font-sans` = Manrope, `.text-gradient` and `.bg-brand-gradient` helpers, and global hidden-scrollbar behavior. All later tasks consume these.

- [ ] **Step 1: Replace `src/app/globals.css` with brand tokens (Tailwind v4 `@theme`)**

```css
@import "tailwindcss";

@theme {
  --color-navy-950: #000C24;
  --color-navy-900: #00183C;
  --color-navy-800: #052450;
  --color-navy-700: #0A356E;
  --color-blue-700: #0C3C9C;
  --color-blue-600: #0C48B4;
  --color-blue-500: #0C60FC;
  --color-blue-400: #3B82F6;
  --color-surface: #F4F7FC;
  --color-bordersoft: #E3E9F2;
  --color-ink: #0B1B33;
  --color-ink-muted: #5A6B85;
  --font-sans: var(--font-manrope), ui-sans-serif, system-ui, sans-serif;
  --radius-pill: 9999px;
}

:root { color-scheme: light; }

html {
  scrollbar-width: none;          /* Firefox */
  -ms-overflow-style: none;       /* IE/old Edge */
}
html::-webkit-scrollbar { display: none; }  /* Chrome/Safari */

body {
  background: #ffffff;
  color: var(--color-ink);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}

.text-gradient {
  background: linear-gradient(135deg, #0C60FC 0%, #0C3C9C 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.bg-brand-gradient { background: linear-gradient(135deg, #0C60FC 0%, #0C3C9C 100%); }
.bg-navy-gradient { background: linear-gradient(120deg, #00183C 0%, #0A356E 60%, #0C3C9C 100%); }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .001ms !important; transition-duration: .001ms !important; }
}
```

- [ ] **Step 2: Wire Manrope in `src/app/layout.tsx`**

```tsx
import { Manrope } from 'next/font/google'
const manrope = Manrope({ subsets: ['latin'], weight: ['400','500','600','700','800'], variable: '--font-manrope', display: 'swap' })
// on <html>: className={manrope.variable}
```

- [ ] **Step 3: Verify tokens render** — temporarily put `<h1 className="text-gradient text-6xl font-extrabold">Ambliq</h1>` on the page, run `npm run shoot -- / tokens-check` (after Task 5 adds shoot; if not yet, run `npm run dev` and open). Confirm Manrope + blue gradient. Remove the temp markup.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: brand design tokens, Manrope font, hidden scrollbar"
```

---

## Task 3: Asset pipeline — copy logos to public/brand + convert to WebP

**Files:**
- Create: `scripts/convert-assets.mjs`
- Generates: `public/brand/*.webp` (+ `logo.png` fallback)

**Interfaces:**
- Produces: `public/brand/logo-full.webp`, `public/brand/logo-mini.webp`, `public/brand/logo-mini.png` consumed by `Logo.tsx`.

- [ ] **Step 1: Write `scripts/convert-assets.mjs`**

```js
import sharp from 'sharp'
import { mkdirSync, copyFileSync } from 'node:fs'

const SRC = 'Ambliq Solutions Assets'
const OUT = 'public/brand'
mkdirSync(OUT, { recursive: true })

const jobs = [
  // [source png, output base]
  [`${SRC}/Without BGs/Mini Logo-Photoroom.png`, 'logo-mini'],
  [`${SRC}/Without BGs/Logo with white BG-Photoroom.png`, 'logo-full'],
  [`${SRC}/Without BGs/Text Logo only-Photoroom.png`, 'logo-text'],
]

for (const [src, base] of jobs) {
  await sharp(src).webp({ quality: 90 }).toFile(`${OUT}/${base}.webp`)
  console.log('webp:', `${OUT}/${base}.webp`)
}
// PNG fallback for the mini logo (used in navbar)
copyFileSync(`${SRC}/Without BGs/Mini Logo-Photoroom.png`, `${OUT}/logo-mini.png`)
console.log('done')
```

- [ ] **Step 2: Run it**

```bash
cd "C:/Devspace/webprojects/Ambliq Solutions" && npm run assets && ls public/brand
```
Expected: `logo-full.webp logo-mini.png logo-mini.webp logo-text.webp`.

- [ ] **Step 3: Commit**

```bash
git add scripts/convert-assets.mjs public/brand
git commit -m "feat: asset pipeline — logos to public/brand as WebP"
```

---

## Task 4: Content model (`src/content/site.ts`) + schema test

**Files:**
- Create: `src/content/site.ts`
- Test: `tests/content.test.ts`

**Interfaces:**
- Produces: a typed default export `site` consumed by EVERY section. Key shapes below — later tasks rely on these exact field names.

```ts
export interface Feature { id: string; title: string; body: string; mockup: 'always-on'|'qualify'|'booking'|'crm'|'multicall'|'natural' }
export interface Service { id: string; title: string; body: string; icon: string }
export interface Stat { value: number; suffix?: string; prefix?: string; label: string }
export interface Faq { q: string; a: string }
export interface Integration { name: string; abbr: string }  // abbr → drawn as a styled token (no external logos yet)
export interface RoiDefaults { monthlyCalls: number; missedRate: number; conversionRate: number; avgValue: number }
```

- [ ] **Step 1: Write `tests/content.test.ts` (failing)**

```ts
import { describe, it, expect } from 'vitest'
import { site } from '@/content/site'

describe('site content', () => {
  it('has required top-level sections', () => {
    expect(site.hero.headline).toBeTruthy()
    expect(site.features.length).toBe(6)
    expect(site.services.length).toBeGreaterThanOrEqual(4)
    expect(site.faq.length).toBeGreaterThanOrEqual(4)
    expect(site.roiDefaults.monthlyCalls).toBeGreaterThan(0)
  })
  it('every CTA points to /book', () => {
    expect(site.cta.href).toBe('/book')
  })
})
```

- [ ] **Step 2: Run → FAIL** (`cannot find module '@/content/site'`)

```bash
npx vitest run tests/content.test.ts
```

- [ ] **Step 3: Write `src/content/site.ts`** — full typed content in Ambliq's voice (placeholders where real data is pending). Include: `hero` (headline with `{gradient}` word marker, subhead, cta), `problem` (traditional[] + system[] + painList[] + benefitList[]), 6 `features`, `roiDefaults`, `roi` labels, `results.stats[]` + `results.testimonial`, 5 `services`, `integrations[]` (HubSpot, GoHighLevel, Salesforce, Calendly, Twilio, Make, Zapier, Notion), 3 `process` steps, `finalCta`, `faq[]` (≥4), `cta = { label:'Book a Call', href:'/book' }`, `footer`, `meta` (title/description). Copy should be original (run through humanizer later), not copied from FutureFlow.

- [ ] **Step 4: Run → PASS**

```bash
npx vitest run tests/content.test.ts
```

- [ ] **Step 5: Commit**

```bash
git add src/content/site.ts tests/content.test.ts
git commit -m "feat: typed site content model + schema test"
```

---

## Task 5: Motion primitives — Lenis provider, Reveal, CountUp, shoot script

**Files:**
- Create: `src/components/motion/LenisProvider.tsx`, `Reveal.tsx`, `CountUp.tsx`, `scripts/shoot.mjs`
- Modify: `src/app/layout.tsx` (wrap children in LenisProvider)

**Interfaces:**
- Produces: `<LenisProvider>` (wraps app, smooth scroll, disabled under reduced-motion), `<Reveal>` (fade-up on scroll), `<CountUp end={number} prefix suffix />` (animated number). Consumed by sections.

- [ ] **Step 1: `LenisProvider.tsx`** — `'use client'`; init Lenis in `useEffect`, `requestAnimationFrame` loop, register `gsap` ScrollTrigger and `lenis.on('scroll', ScrollTrigger.update)`; bail out (no smooth) if `matchMedia('(prefers-reduced-motion: reduce)').matches`; cleanup on unmount. Render `{children}`.

```tsx
'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    gsap.registerPlugin(ScrollTrigger)
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    let id: number
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy() }
  }, [])
  return <>{children}</>
}
```

- [ ] **Step 2: `Reveal.tsx`** — `'use client'`; wraps children in a div; on mount, if not reduced-motion, `gsap.from(el, { y: 32, opacity: 0, duration: .7, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } })`. Accept `as`, `className`, `delay` props.

- [ ] **Step 3: `CountUp.tsx`** — `'use client'`; renders a `<span>`; ScrollTrigger on enter tweens an object `{v:0}` to `end`, formatting with `prefix`/`suffix` + `toLocaleString()`. Under reduced-motion, render the final value immediately.

- [ ] **Step 4: `scripts/shoot.mjs`** — Playwright: `node scripts/shoot.mjs <route> <label>` opens `http://localhost:3000<route>`, scrolls through, screenshots at widths `[390,768,1024,1440]` into `docs/verify/<label>-<width>.png`. (Reuse the capture pattern; assumes `npm run dev` is running.)

```js
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'
const route = process.argv[2] || '/'
const label = process.argv[3] || 'page'
const widths = [390, 768, 1024, 1440]
mkdirSync('docs/verify', { recursive: true })
const b = await chromium.launch()
for (const w of widths) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 }, deviceScaleFactor: 1 })
  const p = await ctx.newPage()
  await p.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle' }).catch(()=>{})
  await p.waitForTimeout(1500)
  // trigger scroll animations
  const h = await p.evaluate(() => document.body.scrollHeight)
  for (let y=0; y<h; y+=700){ await p.evaluate(yy=>scrollTo(0,yy), y); await p.waitForTimeout(250) }
  await p.evaluate(()=>scrollTo(0,0)); await p.waitForTimeout(400)
  await p.screenshot({ path: `docs/verify/${label}-${w}.png`, fullPage: true })
  await ctx.close()
}
await b.close()
console.log('shot', label, widths.join(','))
```

- [ ] **Step 5: Wrap app** — in `layout.tsx`, wrap `{children}` with `<LenisProvider>`.

- [ ] **Step 6: Add `docs/verify/` to `.gitignore`** (throwaway QA shots).

- [ ] **Step 7: Verify** — `npm run dev` (background) then `npm run shoot -- / smoke`. Confirm a screenshot is produced and the page scrolls smoothly.

- [ ] **Step 8: Commit**

```bash
git add src/components/motion scripts/shoot.mjs src/app/layout.tsx .gitignore
git commit -m "feat: Lenis smooth scroll, Reveal/CountUp motion primitives, shoot script"
```

---

## Task 6: Layout shell — Navbar + Footer + common components

**Files:**
- Create: `src/components/common/{Container,CtaButton,Logo,SectionHeading}.tsx`, `src/components/layout/{Navbar,MobileMenu,Footer}.tsx`
- Modify: `src/app/layout.tsx` (render Navbar + Footer), `src/app/page.tsx` (empty shell for now)

**Interfaces:**
- Produces: `<Container>`, `<CtaButton variant="gradient"|"navy" href>`, `<Logo variant="mini"|"full">`, `<SectionHeading eyebrow heading sub align>`, `<Navbar>`, `<Footer>`.
- Reference shots: navbar/hero `desktop-sec-00.png` + `mobile-sec-00.png`; footer `desktop-sec-07.png`.

- [ ] **Step 1: `Container.tsx`** — `max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8`.

- [ ] **Step 2: `CtaButton.tsx`** — Link to `href` (default `site.cta.href`). `gradient` variant = `.bg-brand-gradient text-white rounded-pill px-7 py-3.5 font-bold text-sm shadow-lg hover:-translate-y-0.5 hover:shadow-blue-500/30 transition`. `navy` variant = `bg-navy-900 text-white`. Accept children.

- [ ] **Step 3: `Logo.tsx`** — `<picture>` with `logo-mini.webp` + `logo-mini.png` fallback (mini), or `logo-full.webp` (full); next/image where possible; alt "Ambliq Solutions". Mini variant shown beside the wordmark text in navbar.

- [ ] **Step 4: `SectionHeading.tsx`** — eyebrow (uppercase blue, tracked), H2 (`text-gradient` on a marked word), optional subhead in `text-ink-muted`. Center or left align.

- [ ] **Step 5: `Navbar.tsx`** — floating fixed pill: `fixed top-4 inset-x-4 z-50`, inner `Container`, white `bg-white/90 backdrop-blur rounded-3xl shadow-md`. Left: `<Logo mini>` + "Ambliq Solutions" bold. Center (md+): anchor links from `site.nav`. Right: `<CtaButton>`. Mobile (<md): hamburger button toggling `<MobileMenu>`. Add scroll-shrink/shadow on scroll (optional). All from `site`.

- [ ] **Step 6: `MobileMenu.tsx`** — `'use client'`; full-width dropdown/drawer under the pill with the nav links + CTA; closes on link click; locks body scroll while open.

- [ ] **Step 7: `Footer.tsx`** — `.bg-navy-gradient text-white`; `<Logo full>` or mini+wordmark + tagline "AI Automation that Captures. Qualifies. Converts."; columns of links; LinkedIn (company + Umar from `site.footer.socials`); copyright `© {year} Ambliq Solutions`.

- [ ] **Step 8: Render in `layout.tsx`** — `<LenisProvider><Navbar/>{children}<Footer/></LenisProvider>`. Add top padding offset on `<main>` so content clears the fixed navbar.

- [ ] **Step 9: Verify** — `npm run shoot -- / shell` at all widths. Read shots: pill navbar correct, hamburger appears <768px, footer navy. Compare to reference. Fix.

- [ ] **Step 10: Commit**

```bash
git add src/components/common src/components/layout src/app/layout.tsx src/app/page.tsx
git commit -m "feat: layout shell — floating navbar, mobile menu, navy footer, common components"
```

---

## Task 7: Hero section

**Files:** Create `src/components/sections/Hero.tsx`; Modify `src/app/page.tsx` (add Hero).
**Interfaces:** Consumes `site.hero`, `<Container>`, `<CtaButton>`, `<Reveal>`. Reference: `desktop-sec-00.png`, `mobile-sec-00.png`.

- [ ] **Step 1: Build Hero** — full-height-ish centered section; soft blue radial glow background (`radial-gradient` with `blue-500` at low opacity, top), subtle light streaks. Eyebrow optional, giant H1 (`clamp` per tokens, weight 800) with the marked word wrapped in `.text-gradient`, subhead `text-ink-muted` max-w-2xl, centered `<CtaButton>`. Staggered `gsap.from` fade-up on load (respect reduced-motion). Headline/subhead/CTA from `site.hero`.

- [ ] **Step 2: Verify** — `npm run shoot -- / hero` at 4 widths; read; match reference (recolored to blue); ensure H1 scales down cleanly on mobile, no overflow. Fix.

- [ ] **Step 3: Commit** — `git add ... && git commit -m "feat: hero section"`.

---

## Task 8: Problem / comparison section

**Files:** Create `src/components/sections/Problem.tsx`; Modify `page.tsx`.
**Interfaces:** Consumes `site.problem`, `<SectionHeading>`, `<Reveal>`. Reference: `desktop-sec-01.png`, `desktop-sec-02.png`, `mobile-sec-02.png`.

- [ ] **Step 1: Build** — heading "Every Missed Call Is a Missed Opportunity" (marked word gradient). Two cards in a responsive grid (`md:grid-cols-2`, stack on mobile): left **Traditional** with scattered/tilted pain tiles (missed calls, slow response, after-hours, lost revenue) on a soft tinted bg + a red-✗ list below; right **The Ambliq System** with a neat 2×2 benefit grid (Never Miss a Lead, Qualified Leads, 24/7, Instant Response) + a blue-✓ list. Icons via `lucide-react`, tinted brand blue. Subtle float/tilt on the scattered tiles (reduced-motion safe).

- [ ] **Step 2: Verify** at 4 widths; the two columns must stack cleanly on mobile and the ✗/✓ lists stay readable. Match reference recolored. Fix.

- [ ] **Step 3: Commit.**

---

## Task 9: Voice Agent Features + SVG/CSS mockups

**Files:** Create `src/components/sections/Features.tsx` + `src/components/mockups/{AlwaysOn,Qualify,Booking,Crm,MultiCall,Natural}.tsx`; Modify `page.tsx`.
**Interfaces:** Consumes `site.features` (6, each with a `mockup` key mapping to a component). Reference: `desktop-sec-03.png`, `desktop-sec-04.png`.

- [ ] **Step 1: Build 6 mockup components** — each a small self-contained SVG/CSS illustration (no images) themed in navy/blue: `AlwaysOn` (24/7 clock), `Qualify` (qualified ✓ / unqualified ✗ lead cards), `Booking` (calendar tiles), `Crm` (node→record→nodes diagram), `MultiCall` (stacked call cards), `Natural` (chat/waveform or flag grid). Keep each <60 lines.

- [ ] **Step 2: Build `Features.tsx`** — `<SectionHeading>` ("What Your AI Receptionist Does") + responsive card grid (`lg:grid-cols-3 md:grid-cols-2 grid-cols-1`). Each card = mockup on top + H3 + body, from `site.features`, wrapped in `<Reveal>` with stagger by index. Map `feature.mockup` → component via a lookup object.

- [ ] **Step 3: Verify** at 4 widths — 3→2→1 columns; mockups don't overflow; crisp on mobile. Fix.

- [ ] **Step 4: Commit.**

---

## Task 10: ROI calculator — logic (TDD)

**Files:** Create `src/lib/roi.ts`; Test `tests/roi.test.ts`.
**Interfaces:** Produces `computeRoi(inputs: RoiInputs): RoiResult`. Consumed by Task 11 UI.

```ts
export interface RoiInputs { monthlyCalls: number; missedRate: number; conversionRate: number; avgValue: number }
export interface RoiResult { missedCalls: number; lostConversions: number; monthlyRevenueLost: number; recoveredAnnual: number }
```

- [ ] **Step 1: Write `tests/roi.test.ts` (failing)**

```ts
import { describe, it, expect } from 'vitest'
import { computeRoi } from '@/lib/roi'

describe('computeRoi', () => {
  it('computes the Ambotix example', () => {
    const r = computeRoi({ monthlyCalls: 500, missedRate: 30, conversionRate: 20, avgValue: 2500 })
    expect(r.missedCalls).toBe(150)
    expect(r.lostConversions).toBe(30)
    expect(r.monthlyRevenueLost).toBe(75000)
    expect(r.recoveredAnnual).toBe(900000)
  })
  it('handles zeros without NaN', () => {
    const r = computeRoi({ monthlyCalls: 0, missedRate: 0, conversionRate: 0, avgValue: 0 })
    expect(r.recoveredAnnual).toBe(0)
  })
})
```

- [ ] **Step 2: Run → FAIL.** `npx vitest run tests/roi.test.ts`

- [ ] **Step 3: Implement `src/lib/roi.ts`**

```ts
import type { RoiInputs, RoiResult } from './roi-types' // or inline the interfaces above
export function computeRoi({ monthlyCalls, missedRate, conversionRate, avgValue }: RoiInputs): RoiResult {
  const missedCalls = Math.round(monthlyCalls * (missedRate / 100))
  const lostConversions = Math.round(missedCalls * (conversionRate / 100))
  const monthlyRevenueLost = lostConversions * avgValue
  return { missedCalls, lostConversions, monthlyRevenueLost, recoveredAnnual: monthlyRevenueLost * 12 }
}
```

- [ ] **Step 4: Run → PASS.**

- [ ] **Step 5: Commit** — `git commit -m "feat: ROI calculation logic + tests"`.

---

## Task 11: ROI calculator UI

**Files:** Create `src/components/sections/RoiCalculator.tsx`; Modify `page.tsx`.
**Interfaces:** Consumes `computeRoi`, `site.roi`, `site.roiDefaults`, shadcn `Input`/`Label`, `<CountUp>`. Reference: Ambotix ROI calculator (inputs → recovered revenue/year).

- [ ] **Step 1: Build** — `'use client'`. `useState` over the 4 inputs (init from `site.roiDefaults`), `const result = computeRoi(inputs)`. Left: labeled inputs (sliders or number inputs) for Monthly Calls / Missed-Call % / Conversion % / Avg Customer Value. Right: result card on `.bg-navy-gradient text-white` showing Calls Missed/mo, Lost Conversions/mo, Monthly Revenue Lost, and a big **Recovered Revenue / year** via `<CountUp prefix="$" end={result.recoveredAnnual} />`. Responsive: two columns on `md+`, stacked on mobile. CTA → `/book` below.

- [ ] **Step 2: Verify** at 4 widths; numbers update live; count-up animates; stacks on mobile; currency formatted. Fix.

- [ ] **Step 3: Commit.**

---

## Task 12: Results section

**Files:** Create `src/components/sections/Results.tsx`; Modify `page.tsx`.
**Interfaces:** Consumes `site.results.stats` (uses `<CountUp>`), `site.results.testimonial`. Reference: Ambotix Results.

- [ ] **Step 1: Build** — `<SectionHeading>` + a row of big stat numbers (`<CountUp>` with suffix like `+`, `%`, `/10`) each with a label, + a testimonial card (quote, name, role) — placeholder content flagged as such in `site.ts`. Responsive: stats wrap/stack on mobile.

- [ ] **Step 2: Verify** 4 widths; stats animate on scroll-in; stack on mobile. Fix.

- [ ] **Step 3: Commit.**

---

## Task 13: "What Else We Automate" services section

**Files:** Create `src/components/sections/Services.tsx`; Modify `page.tsx`.
**Interfaces:** Consumes `site.services` (5), `lucide-react` icons, `<SectionHeading>`, `<Reveal>`.

- [ ] **Step 1: Build** — heading + compact card grid (`md:grid-cols-2 lg:grid-cols-3`, stack mobile). Each card: brand-tinted icon, title, short body, from `site.services`. Keeps Voice Agents primary (smaller/secondary visual weight than Features).

- [ ] **Step 2: Verify** 4 widths. Fix.

- [ ] **Step 3: Commit.**

---

## Task 14: Integrations (dark) section

**Files:** Create `src/components/sections/Integrations.tsx`; Modify `page.tsx`.
**Interfaces:** Consumes `site.integrations` (name+abbr). Reference: `desktop-sec-02.png` (dark band with floating logos).

- [ ] **Step 1: Build** — `.bg-navy-gradient text-white` band. Left: white headline "Plugs into the tools you already use" + subtext + secondary `<CtaButton variant="navy">` (or white). Right: floating circular tokens rendered from `site.integrations` (styled monogram circles using `abbr`, since we have no real logo files yet) with a gentle float animation (reduced-motion safe). When real logos arrive, swap tokens for `<img>` — note this in a code comment.

- [ ] **Step 2: Verify** 4 widths; on mobile the logo cluster sits below the text; contrast OK. Fix.

- [ ] **Step 3: Commit.**

---

## Task 15: How It Works (process) section

**Files:** Create `src/components/sections/Process.tsx`; Modify `page.tsx`.
**Interfaces:** Consumes `site.process` (3 steps). Reference: `desktop-sec-05.png`.

- [ ] **Step 1: Build** — eyebrow "Process" + H2 "How It Works", then 3 columns (stack on mobile) each with a giant `.text-gradient` numeral (1/2/3), title, body. `<Reveal>` staggered.

- [ ] **Step 2: Verify** 4 widths. Fix.

- [ ] **Step 3: Commit.**

---

## Task 16: Final CTA + FAQ sections

**Files:** Create `src/components/sections/FinalCta.tsx`, `src/components/sections/Faq.tsx`; Modify `page.tsx`.
**Interfaces:** FinalCta consumes `site.finalCta` + `<CtaButton>`. Faq consumes `site.faq` + shadcn `Accordion`. Reference: `desktop-sec-06.png` (CTA).

- [ ] **Step 1: Build FinalCta** — centered big headline "Book Your Free AI Audit Call" + subtext + `<CtaButton>` → `/book`, optional soft blue glow.

- [ ] **Step 2: Build Faq** — `<SectionHeading>` + shadcn `<Accordion type="single" collapsible>` mapping `site.faq`. Responsive, readable on mobile.

- [ ] **Step 3: Verify** both at 4 widths. Fix.

- [ ] **Step 4: Commit.**

---

## Task 17: Booking page (`/book`)

**Files:** Create `src/app/book/page.tsx`.
**Interfaces:** Reads `process.env.NEXT_PUBLIC_CALENDLY_URL`. Reference: `desktop-sec-06.png` (FutureFlow inline calendar) — but minimal per spec.

- [ ] **Step 1: Build** — `'use client'` (or server with a small client embed). Short headline "Book your free AI audit call" + one line of context. If `NEXT_PUBLIC_CALENDLY_URL` set, render the Calendly inline embed (`<div className="calendly-inline-widget" data-url=...>` + load `https://assets.calendly.com/assets/external/widget.js` via `next/script`). If unset, render a tasteful fallback card ("Booking opens soon — email us at hello@ambliqsolutions.com") so the page never looks broken. Back-to-home link. Navbar/Footer come from the root layout.

- [ ] **Step 2: Add page metadata** (title/description, canonical `/book`).

- [ ] **Step 3: Verify** at 4 widths with the env var unset (fallback) — looks intentional; responsive. Fix.

- [ ] **Step 4: Commit** — `git commit -m "feat: /book page with Calendly embed + fallback"`.

---

## Task 18: SEO — metadata, JSON-LD, sitemap, robots, OG image

**Files:** Create `src/lib/seo.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/opengraph-image.tsx`; Modify `src/app/layout.tsx` (metadataBase + default metadata + Organization JSON-LD).
**Interfaces:** `seo.ts` exports `SITE_URL`, `defaultMetadata`, `organizationJsonLd()`, `serviceJsonLd()`.

- [ ] **Step 1: `seo.ts`** — `export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ambliqsolutions.com'`; `defaultMetadata` (title template, description, openGraph, twitter, `metadataBase: new URL(SITE_URL)`); `organizationJsonLd()` returns `{ '@context':'https://schema.org','@type':'Organization', name:'Ambliq Solutions', url:SITE_URL, logo:`${SITE_URL}/brand/logo-mini.png`, sameAs:[linkedin company, linkedin umar] }`; `serviceJsonLd()` for AI Voice Agents.

- [ ] **Step 2: Wire into `layout.tsx`** — `export const metadata = defaultMetadata`; inject `<script type="application/ld+json">` with org JSON-LD.

- [ ] **Step 3: `sitemap.ts`** — return `/` and `/book` with `SITE_URL`. **`robots.ts`** — allow all, point `sitemap` to `${SITE_URL}/sitemap.xml`.

- [ ] **Step 4: `opengraph-image.tsx`** — `ImageResponse` 1200×630, navy gradient bg, "Ambliq Solutions" + tagline in white/electric-blue.

- [ ] **Step 5: Verify** — `npm run build`; confirm `/sitemap.xml`, `/robots.txt`, `/opengraph-image` routes build; view OG image. `curl` `localhost:3000/sitemap.xml` after `npm start`.

- [ ] **Step 6: Commit** — `git commit -m "feat: SEO metadata, JSON-LD, sitemap, robots, OG image"`.

---

## Task 19: Full responsive + hidden-scrollbar + reduced-motion QA pass

**Files:** Fixes across components as needed.

- [ ] **Step 1: Whole-page capture** — `npm run dev` then `npm run shoot -- / full` and `npm run shoot -- /book bookpage`. Read every `docs/verify/full-{390,768,1024,1440}.png`.
- [ ] **Step 2: Check each section** for: overflow/clipping, text wrap, tap target sizes, image scaling, section padding rhythm, navbar/menu behavior. Fix issues at the responsible component.
- [ ] **Step 3: Confirm no scrollbar** is visible in any shot; page still scrolls.
- [ ] **Step 4: Reduced-motion** — re-run shoot with an emulated `prefers-reduced-motion` context (add a flag to `shoot.mjs` using `reducedMotion: 'reduce'`); confirm content is fully visible (no stuck opacity:0) and no smooth-scroll jank.
- [ ] **Step 5: Commit** — `git commit -m "fix: responsive, hidden-scrollbar, reduced-motion QA across all sections"`.

---

## Task 20: Performance/SEO audit + final pass + CLAUDE.md status update

**Files:** Possible perf fixes; `CLAUDE.md` status update.

- [ ] **Step 1:** `npm run build` — confirm all routes static, no errors, reasonable JS bundle. Address any large client bundles (ensure only motion/calc components are `'use client'`).
- [ ] **Step 2:** Run Lighthouse against `npm start` (`npx lighthouse http://localhost:3000 --quiet --chrome-flags="--headless"` or manual). Record scores; fix regressions to hit Perf ≥ 90, others ≥ 95.
- [ ] **Step 3:** Update `CLAUDE.md` **Status** section to "Built — pending Calendly link + real content from Umar".
- [ ] **Step 4: Commit** — `git commit -m "chore: perf/SEO audit pass + CLAUDE.md status"`.
- [ ] **Step 5:** Invoke `superpowers:finishing-a-development-branch` to decide integration.

---

## Self-Review (completed by author)

**Spec coverage:** Hero/Problem/Features/ROI/Results/Services/Integrations/Process/FinalCta/FAQ/Footer/Navbar → Tasks 6–16 ✓. `/book` → Task 17 ✓. ROI logic+formula (§5) → Task 10 ✓. Content model → Task 4 ✓. Hidden scrollbar → Task 2 + 19 ✓. Responsive → every UI task + Task 19 ✓. Reduced-motion → Task 5 + 19 ✓. WebP assets → Task 3 ✓. SEO/domain/JSON-LD/sitemap/robots → Task 18 ✓. Manrope/tokens → Task 2 ✓. Lenis/GSAP → Task 5 ✓. Perf targets → Task 20 ✓.

**Placeholder scan:** Content placeholders are intentional (spec decision), wired through `site.ts` and clearly swappable; no unresolved TODOs in build steps.

**Type consistency:** `RoiInputs`/`RoiResult` defined in Task 10 and consumed in Task 11; `computeRoi` name consistent; content interfaces (Task 4) reused by sections; `site.cta.href === '/book'` enforced by content test and used by `CtaButton`.

**Note on methodology:** UI tasks intentionally use build-and-verify (Playwright screenshots vs. reference) rather than pre-pixel unit tests; pure logic (ROI, content schema) uses strict TDD. This is the appropriate testing altitude for a visual marketing site.
