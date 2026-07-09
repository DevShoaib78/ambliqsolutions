# Ambliq Solutions

Marketing website for **Ambliq Solutions**, an AI automation agency. Its AI Voice Agents answer calls 24/7, qualify leads, and book appointments so service businesses never miss an opportunity.

🔗 **[www.ambliqsolutions.com](https://www.ambliqsolutions.com)**

## Tech stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · Lenis (smooth scroll) · GSAP + ScrollTrigger · Manrope · simple-icons · sharp. Fully statically generated (SSG) for performance and SEO. No WebGL — the hero background is pure CSS.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Local dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm test` | Run the test suite (Vitest) |
| `npm run assets` | Regenerate brand logos (WebP) + favicon from source art |
| `npm run og` | Regenerate `public/og-image.png` (social / WhatsApp link preview) |

## Project structure

```
src/
  app/                 Routes (/, /book), layout, SEO (sitemap, robots)
  components/
    sections/          Landing-page sections
    layout/            Navbar + footer
    common/            Shared UI (container, CTA, headings, scroll-to-top)
    motion/            Smooth scroll + scroll animations
    mockups/           SVG/CSS feature illustrations ("What It Does")
    services/          Bespoke illustrations for the Services cards
  content/site.ts      All site copy and content (single source of truth)
  lib/                 ROI calculator + SEO helpers
public/brand/          Logos (WebP) + integration logos
public/og-image.png    Social preview image (PNG on purpose, see below)
```

## Images

All brand and integration logos are **WebP**. Two rasters are intentionally kept as PNG:

- `src/app/icon.png` — the favicon
- `public/og-image.png` — the social preview; WhatsApp / iMessage / LinkedIn do not reliably render WebP `og:image`s

## SEO

Canonical host is `https://www.ambliqsolutions.com` (with `www`). The site ships full Open Graph + Twitter metadata, a static 1200x630 preview image, `sitemap.xml`, `robots.txt`, and JSON-LD for `Organization`, `WebSite`, `Service` and `FAQPage`.

## Configuration

Optional environment variables:

- `NEXT_PUBLIC_SITE_URL` — canonical site URL (defaults to `https://www.ambliqsolutions.com`). Drives `metadataBase`, canonical, OG url, sitemap and robots, so it must match the live host exactly.
- `NEXT_PUBLIC_CALENDLY_URL` — booking calendar URL (a default is set in `src/content/site.ts`)

## Editing content

All headlines, copy, services, FAQs, stats, and the booking link live in **`src/content/site.ts`** — update that one file to change site content without touching layout.

## Deployment

Optimized for [Vercel](https://vercel.com) (zero-config Next.js). Connect the repo and deploy; set the environment variables above in the project settings.
