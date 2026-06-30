import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

// Parse args: route, label, and optional --reduced flag
const args = process.argv.slice(2)
const reducedIdx = args.indexOf('--reduced')
const reducedMotion = reducedIdx !== -1
if (reducedMotion) args.splice(reducedIdx, 1)

const route = args[0] || '/'
const label = args[1] || 'page'
const widths = [390, 768, 1024, 1440]

mkdirSync('docs/verify', { recursive: true })

const b = await chromium.launch()
for (const w of widths) {
  const ctxOptions = {
    viewport: { width: w, height: 900 },
    deviceScaleFactor: 1,
  }
  if (reducedMotion) ctxOptions.reducedMotion = 'reduce'

  const ctx = await b.newContext(ctxOptions)
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
  const suffix = reducedMotion ? '-reduced' : ''
  await p.screenshot({ path: `docs/verify/${label}-${w}${suffix}.png`, fullPage: true })
  await ctx.close()
}
await b.close()
console.log('shot', label, widths.join(','), reducedMotion ? '(reduced-motion)' : '')
