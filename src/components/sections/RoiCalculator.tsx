'use client'

import { useState } from 'react'
import { site } from '@/content/site'
import { computeRoi } from '@/lib/roi'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import CountUp from '@/components/motion/CountUp'
import CtaButton from '@/components/common/CtaButton'
import Reveal from '@/components/motion/Reveal'

export default function RoiCalculator() {
  const [inputs, setInputs] = useState(site.roiDefaults)
  const result = computeRoi(inputs)

  const set =
    (key: keyof typeof inputs) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setInputs((prev) => ({ ...prev, [key]: Number(e.target.value) }))

  return (
    <section id="roi" className="py-20 sm:py-28 bg-surface">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="ROI Calculator"
            heading="See What You're Losing to Missed Calls"
            accent="What You're Losing"
            sub="Adjust the sliders to estimate the revenue your business could recover by answering every call."
            className="mb-12"
          />
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* ── Input panel ─────────────────────────────────────────── */}
          <div className="space-y-7 rounded-2xl border border-bordersoft bg-white p-6 sm:p-8 shadow-sm">
            <SliderField
              id="slider-monthly-calls"
              label={site.roi.inputs.monthlyCalls}
              value={inputs.monthlyCalls}
              min={50}
              max={5000}
              step={50}
              display={inputs.monthlyCalls.toLocaleString()}
              onChange={set('monthlyCalls')}
            />
            <SliderField
              id="slider-missed-rate"
              label={site.roi.inputs.missedRate}
              value={inputs.missedRate}
              min={0}
              max={100}
              step={1}
              display={`${inputs.missedRate}%`}
              onChange={set('missedRate')}
            />
            <SliderField
              id="slider-conversion-rate"
              label={site.roi.inputs.conversionRate}
              value={inputs.conversionRate}
              min={0}
              max={100}
              step={1}
              display={`${inputs.conversionRate}%`}
              onChange={set('conversionRate')}
            />
            <SliderField
              id="slider-avg-value"
              label={site.roi.inputs.avgValue}
              value={inputs.avgValue}
              min={100}
              max={50000}
              step={100}
              display={`$${inputs.avgValue.toLocaleString()}`}
              onChange={set('avgValue')}
            />
          </div>

          {/* ── Result card ─────────────────────────────────────────── */}
          <div className="bg-navy-gradient flex flex-col rounded-2xl p-6 sm:p-8 text-white">
            <div className="grid grid-cols-2 gap-x-6 gap-y-5 mb-6">
              <ResultItem
                label="Calls missed / mo"
                value={result.missedCalls.toLocaleString()}
              />
              <ResultItem
                label="Lost conversions / mo"
                value={result.lostConversions.toLocaleString()}
              />
              <ResultItem
                label="Monthly revenue lost"
                value={`$${result.monthlyRevenueLost.toLocaleString()}`}
                wide
              />
            </div>

            <div className="mt-auto border-t border-white/20 pt-6 space-y-6" aria-live="polite">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-2">
                  {site.roi.outputs.annualRevenue}
                </p>
                <CountUp
                  prefix="$"
                  end={result.recoveredAnnual}
                  className="text-5xl sm:text-6xl font-extrabold leading-none"
                />
              </div>

              <CtaButton className="w-full">{site.cta.label}</CtaButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ── Sub-components ─────────────────────────────────────────────────── */

function SliderField({
  id,
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  id: string
  label: string
  value: number
  min: number
  max: number
  step: number
  display: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-semibold text-ink">{label}</label>
        <span className="text-sm font-bold text-blue-500 tabular-nums">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="h-2 w-full cursor-pointer rounded-full accent-blue-500"
      />
    </div>
  )
}

function ResultItem({
  label,
  value,
  wide = false,
}: {
  label: string
  value: string
  wide?: boolean
}) {
  return (
    <div className={wide ? 'col-span-2' : ''}>
      <p className="mb-1 text-xs font-medium uppercase tracking-wide text-white/60">{label}</p>
      <p className="text-2xl font-bold tabular-nums">{value}</p>
    </div>
  )
}
