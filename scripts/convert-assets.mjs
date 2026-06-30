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
