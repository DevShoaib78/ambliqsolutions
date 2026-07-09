/**
 * Generates the social preview image (public/og-image.png, 1200x630).
 *
 * Kept as PNG on purpose: WhatsApp / iMessage / LinkedIn link previews do not
 * reliably render WebP `og:image`s. Everything else on the site is WebP.
 *
 * Run: node scripts/make-og.mjs   (or `npm run og`)
 */
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'

const W = 1200
const H = 630
const OUT = 'public/og-image.png'

const HEADLINE = 'Your AI Receptionist That Never Misses a Call'
const TAGLINE  = 'AI Voice Agents that answer every call 24/7, qualify leads, and book appointments.'

mkdirSync('public', { recursive: true })

// 1. Turn the navy logo into a white silhouette (same as brightness-0 invert).
const LOGO_W = 440
const logo = await sharp('public/brand/logo-full.webp')
  .resize({ width: LOGO_W })
  .ensureAlpha()
  .toBuffer({ resolveWithObject: true })

const alpha = await sharp(logo.data).extractChannel('alpha').toBuffer()
const whiteLogo = await sharp({
  create: { width: logo.info.width, height: logo.info.height, channels: 3, background: '#ffffff' },
})
  .joinChannel(alpha)
  .png()
  .toBuffer()

// 2. Brand-gradient background + copy.
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const bg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"   stop-color="#00183C"/>
      <stop offset="60%"  stop-color="#0A356E"/>
      <stop offset="100%" stop-color="#0C3C9C"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <text x="${W / 2}" y="452" text-anchor="middle"
        font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="44" font-weight="700" fill="#ffffff">
    ${esc(HEADLINE)}
  </text>
  <text x="${W / 2}" y="506" text-anchor="middle"
        font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="24" fill="#AFC6E8">
    ${esc(TAGLINE)}
  </text>
  <rect x="100" y="566" width="1000" height="4" rx="2" fill="#0C60FC"/>
</svg>`

await sharp(Buffer.from(bg))
  .composite([
    { input: whiteLogo, left: Math.round((W - logo.info.width) / 2), top: 96 },
  ])
  .png({ quality: 90, compressionLevel: 9 })
  .toFile(OUT)

console.log(`og: ${OUT} (${W}x${H})`)
