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
