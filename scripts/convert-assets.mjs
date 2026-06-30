import sharp from 'sharp'
import { mkdirSync, copyFileSync } from 'node:fs'

const SRC = 'Ambliq Solutions Assets'
const OUT = 'public/brand'
mkdirSync(OUT, { recursive: true })

// Source PNGs are exported on a 1254x1254 square canvas with large transparent
// padding. Trim the transparent border so each logo becomes a tight, correctly
// proportioned image (otherwise the wordmark shrinks to a dot inside empty space).
const jobs = [
  [`${SRC}/Without BGs/Mini Logo-Photoroom.png`, 'logo-mini'],
  [`${SRC}/Without BGs/Logo with white BG-Photoroom.png`, 'logo-full'],
  [`${SRC}/Without BGs/Text Logo only-Photoroom.png`, 'logo-text'],
]

for (const [src, base] of jobs) {
  const info = await sharp(src)
    .trim()
    .webp({ quality: 90 })
    .toFile(`${OUT}/${base}.webp`)
  console.log(`webp: ${OUT}/${base}.webp -> ${info.width}x${info.height}`)
}

// PNG fallback for the mini logo (trimmed to match the webp)
await sharp(`${SRC}/Without BGs/Mini Logo-Photoroom.png`).trim().png().toFile(`${OUT}/logo-mini.png`)

// Favicon: trim first so the AS mark fills the icon, then 512x512 with ~8% padding.
const PAD = Math.round(512 * 0.08)
const INNER = 512 - PAD * 2
mkdirSync('src/app', { recursive: true })
await sharp(`${SRC}/Without BGs/Mini Logo-Photoroom.png`)
  .trim()
  .resize(INNER, INNER, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .extend({ top: PAD, bottom: PAD, left: PAD, right: PAD, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile('src/app/icon.png')
console.log('favicon: src/app/icon.png')
console.log('done')
