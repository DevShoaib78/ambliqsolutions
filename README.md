# Ambliq Solutions

Marketing website for **Ambliq Solutions**, an AI automation agency. Its AI Voice Agents answer calls 24/7, qualify leads, and book appointments so service businesses never miss an opportunity.

🔗 **[ambliqsolutions.com](https://ambliqsolutions.com)**

## Tech stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · Lenis · GSAP · Manrope. Statically generated for performance and SEO.

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
| `npm run assets` | Regenerate brand logos + favicon from source art |

## Project structure

```
src/
  app/                 Routes (/, /book), layout, SEO (sitemap, robots, OG image)
  components/
    sections/          Landing-page sections
    layout/            Navbar (pill nav) + footer
    common/            Shared UI (container, CTA, headings, logo)
    motion/            Smooth scroll + scroll animations
    mockups/           SVG/CSS feature illustrations
  content/site.ts      All site copy and content (single source of truth)
  lib/                 ROI calculator + SEO helpers
public/brand/          Logos (WebP)
```

## Configuration

Optional environment variables:

- `NEXT_PUBLIC_SITE_URL` — canonical site URL (defaults to `https://ambliqsolutions.com`)
- `NEXT_PUBLIC_CALENDLY_URL` — booking calendar URL (a default is set in `src/content/site.ts`)

## Editing content

All headlines, copy, services, FAQs, stats, and the booking link live in **`src/content/site.ts`** — update that one file to change site content without touching layout.

## Deployment

Optimized for [Vercel](https://vercel.com) (zero-config Next.js). Connect the repo and deploy; set the environment variables above in the project settings.
