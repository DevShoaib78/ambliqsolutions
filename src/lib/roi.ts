export interface RoiInputs {
  monthlyCalls: number
  missedRate: number
  conversionRate: number
  avgValue: number
}

export interface RoiResult {
  missedCalls: number
  lostConversions: number
  monthlyRevenueLost: number
  monthlyRevenueRecovered: number
  recoveredAnnual: number
}

/**
 * Share of missed-call revenue an AI receptionist realistically wins back.
 * Deliberately conservative: the agent answers every call, but not every caller
 * will engage with it. Surfaced to the user as a note under the result, so the
 * headline figure is never presented as a guarantee.
 */
export const RECOVERY_RATE = 0.8

export function computeRoi({
  monthlyCalls,
  missedRate,
  conversionRate,
  avgValue,
}: RoiInputs): RoiResult {
  const missedCalls = Math.round(monthlyCalls * (missedRate / 100))
  const lostConversions = Math.round(missedCalls * (conversionRate / 100))
  const monthlyRevenueLost = lostConversions * avgValue
  const monthlyRevenueRecovered = Math.round(monthlyRevenueLost * RECOVERY_RATE)
  return {
    missedCalls,
    lostConversions,
    monthlyRevenueLost,
    monthlyRevenueRecovered,
    recoveredAnnual: monthlyRevenueRecovered * 12,
  }
}
