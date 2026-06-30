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
  recoveredAnnual: number
}

export function computeRoi({
  monthlyCalls,
  missedRate,
  conversionRate,
  avgValue,
}: RoiInputs): RoiResult {
  const missedCalls = Math.round(monthlyCalls * (missedRate / 100))
  const lostConversions = Math.round(missedCalls * (conversionRate / 100))
  const monthlyRevenueLost = lostConversions * avgValue
  return {
    missedCalls,
    lostConversions,
    monthlyRevenueLost,
    recoveredAnnual: monthlyRevenueLost * 12,
  }
}
