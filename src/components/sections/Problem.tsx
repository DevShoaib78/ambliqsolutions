import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import Reveal from '@/components/motion/Reveal'
import { site } from '@/content/site'
import {
  PhoneMissed, Snail, Users, Filter,
  PhoneCall, Timer, BadgeCheck, Clock,
  CheckCircle, XCircle,
} from 'lucide-react'

// Bold icons for the traditional "pain" cards + the Ambliq System cards
const PAIN_ICONS   = [PhoneMissed, Snail, Users, Filter]
const SYSTEM_ICONS = [PhoneCall, Timer, BadgeCheck, Clock]

// Slight per-card tilt for the Traditional side (non-uniform, layered look)
const TILT = [-6, 5, -4, 6]

export default function Problem() {
  const { heading, accent, painList, benefitList, traditionalTiles, systemTiles } = site.problem

  return (
    <section id="problem" className="overflow-hidden bg-surface py-20 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading heading={heading} accent={accent} />
        </Reveal>

        <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2">
          {/* ── Left: Traditional ─────────────────────────────────────── */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-3xl border border-bordersoft bg-white p-6 shadow-sm sm:p-8">
              <h3 className="mb-6 text-center text-xl font-bold text-ink">Traditional</h3>

              {/* Tinted panel with problem icon-cards */}
              <div className="mb-8 rounded-2xl bg-rose-50/70 p-4 sm:p-5">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {traditionalTiles.slice(0, 4).map((tile, i) => {
                    const Icon = PAIN_ICONS[i] ?? PhoneMissed
                    return (
                      <div
                        key={i}
                        className="flex flex-col items-center gap-3 rounded-2xl bg-white p-5 text-center shadow-md"
                        style={{ transform: `rotate(${TILT[i] ?? 0}deg)` }}
                      >
                        <Icon className="h-11 w-11 text-rose-500" strokeWidth={2.25} />
                        <span className="text-[15px] font-bold leading-tight text-ink">{tile}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Pain list */}
              <ul className="mt-auto space-y-4">
                {painList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-ink">
                    <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* ── Right: The Ambliq System ──────────────────────────────── */}
          <Reveal delay={0.2}>
            <div className="flex h-full flex-col rounded-3xl border border-blue-200/70 bg-white p-6 shadow-md sm:p-8">
              <h3 className="mb-6 text-center text-xl font-bold text-ink">The Ambliq System</h3>

              {/* Tinted panel with animated solution icon-cards */}
              <div className="mb-8 rounded-2xl bg-blue-50 p-4 sm:p-5">
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {systemTiles.slice(0, 4).map((tile, i) => {
                    const Icon = SYSTEM_ICONS[i] ?? PhoneCall
                    return (
                      <div
                        key={i}
                        className="flex flex-col items-center gap-3 rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-blue-100"
                      >
                        <Icon className="h-11 w-11 text-blue-600" strokeWidth={2.25} />
                        <span className="text-[15px] font-bold leading-tight text-ink">{tile}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Benefit list */}
              <ul className="mt-auto space-y-4">
                {benefitList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-ink">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
