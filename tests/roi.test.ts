import { describe, it, expect } from 'vitest'
import { computeRoi, RECOVERY_RATE } from '@/lib/roi'

describe('computeRoi', () => {
  it('computes the Ambliq example', () => {
    const r = computeRoi({ monthlyCalls: 500, missedRate: 30, conversionRate: 20, avgValue: 2500 })
    expect(r.missedCalls).toBe(150)
    expect(r.lostConversions).toBe(30)
    expect(r.monthlyRevenueLost).toBe(75000)
    expect(r.monthlyRevenueRecovered).toBe(60000)
    expect(r.recoveredAnnual).toBe(720000)
  })
  it('recovers the configured share of lost revenue, never more', () => {
    const r = computeRoi({ monthlyCalls: 500, missedRate: 30, conversionRate: 20, avgValue: 500 })
    expect(r.monthlyRevenueRecovered).toBe(Math.round(r.monthlyRevenueLost * RECOVERY_RATE))
    expect(r.monthlyRevenueRecovered).toBeLessThanOrEqual(r.monthlyRevenueLost)
    expect(r.recoveredAnnual).toBe(r.monthlyRevenueRecovered * 12)
  })
  it('handles zeros without NaN', () => {
    const r = computeRoi({ monthlyCalls: 0, missedRate: 0, conversionRate: 0, avgValue: 0 })
    expect(r.monthlyRevenueRecovered).toBe(0)
    expect(r.recoveredAnnual).toBe(0)
  })
})
