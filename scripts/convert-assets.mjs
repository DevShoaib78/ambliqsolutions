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

// Favicon: 512×512 PNG with ~10% transparent padding, centred AS mark
const FAVICON_SRC = `${SRC}/Without BGs/Mini Logo-Photoroom.png`
const faviconPad  = Math.round(512 * 0.10)   // 51px each side
const faviconInner = 512 - faviconPad * 2     // 410px
mkdirSync('src/app', { recursive: true })
await sharp(FAVICON_SRC)
  .resize(faviconInner, faviconInner, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .extend({
    top:    faviconPad,
    bottom: faviconPad,
    left:   faviconPad,
    right:  faviconPad,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toFile('src/app/icon.png')
console.log('favicon: src/app/icon.png')
console.log('done')
