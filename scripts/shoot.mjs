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
  // domcontentloaded rather than networkidle: Next.js HMR keeps a WebSocket
  // open so networkidle never resolves, which would yield blank screenshots.
  await p.goto(`http://localhost:3000${route}`, { waitUntil: 'domcontentloaded' }).catch(() => {})
  await p.waitForTimeout(3000)
  // trigger scroll animations
  const h = await p.evaluate(() => document.body.scrollHeight)
  for (let y = 0; y < h; y += 700) {
    await p.evaluate((yy) => scrollTo(0, yy), y)
    await p.waitForTimeout(250)
  }
  await p.evaluate(() => scrollTo(0, 0))
  await p.waitForTimeout(400)
  await p.screenshot({ path: `docs/verify/${label}-${w}.png`, fullPage: true })
  await ctx.close()
}
await b.close()
console.log('shot', label, widths.join(','))
