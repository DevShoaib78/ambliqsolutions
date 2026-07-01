import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import Reveal from '@/components/motion/Reveal'
import BorderGlow from '@/components/ui/BorderGlow'
import { site } from '@/content/site'

// Brand-blue palette + glow for the BorderGlow card hover effect
const GLOW_COLORS = ['#0C60FC', '#3B82F6', '#60A5FA']
const GLOW_HSL = '219 97 60'
import {
  PhoneOff,
  Clock,
  Filter,
  Users,
  TrendingDown,
  Phone,
  CheckCircle,
  Zap,
  CalendarCheck,
  XCircle,
} from 'lucide-react'

// Icons paired to the 4 systemTiles shown in the 2×2 grid
const SYSTEM_ICONS = [Phone, CheckCircle, CalendarCheck, Zap]

// Icons for each pain tile chip
const PAIN_ICONS = [PhoneOff, Clock, Filter, TrendingDown, Users]

// Rough layout for the scattered pain tiles: [top%, left%, rotate(deg)]
const TILE_POSES: [number, number, number][] = [
  [4,  14, -6],
  [10, 42,  4],
  [42, 14, -3],
  [52, 40,  5],
  [28, 28, -2],
]

export default function Problem() {
  const { heading, accent, painList, benefitList, traditionalTiles, systemTiles } = site.problem

  return (
    <section id="problem" className="py-24 bg-surface">
      <Container>
        <Reveal>
          <SectionHeading heading={heading} accent={accent} />
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {/* ── Left: Traditional ── */}
          <Reveal delay={0.1}>
            <BorderGlow
              backgroundColor="#ffffff"
              colors={GLOW_COLORS}
              glowColor={GLOW_HSL}
              borderRadius={16}
              edgeSensitivity={22}
              glowIntensity={1.1}
              className="h-full"
            >
            <div className="flex h-full flex-col p-8">
              <h3 className="mb-6 text-center text-xl font-bold text-ink">Traditional</h3>

              {/* Mobile: simple wrapped chips (no overlap/clipping) */}
              <div className="mb-6 flex flex-wrap gap-2 sm:hidden">
                {traditionalTiles.map((tile, i) => {
                  const Icon = PAIN_ICONS[i] ?? PhoneOff
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3.5 py-2 text-sm font-semibold text-ink shadow-sm"
                    >
                      <Icon className="h-4 w-4 text-red-400 shrink-0" />
                      {tile}
                    </div>
                  )
                })}
              </div>

              {/* Desktop: scattered / tilted pain tiles */}
              <div className="relative mb-6 hidden h-56 select-none sm:block" aria-hidden="true">
                {traditionalTiles.map((tile, i) => {
                  const Icon = PAIN_ICONS[i] ?? PhoneOff
                  const [top, left, rot] = TILE_POSES[i]
                  return (
                    <div
                      key={i}
                      className="absolute flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-semibold text-ink shadow-sm"
                      style={{ top: `${top}%`, left: `${left}%`, transform: `rotate(${rot}deg)` }}
                    >
                      <Icon className="h-4 w-4 text-red-400 shrink-0" />
                      {tile}
                    </div>
                  )
                })}
              </div>

              {/* Pain list */}
              <ul className="mt-auto space-y-3">
                {painList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-ink">
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            </BorderGlow>
          </Reveal>

          {/* ── Right: The Ambliq System ── */}
          <Reveal delay={0.2}>
            <BorderGlow
              backgroundColor="#00183C"
              colors={GLOW_COLORS}
              glowColor={GLOW_HSL}
              borderRadius={16}
              edgeSensitivity={26}
              glowIntensity={1.2}
              className="h-full text-white"
            >
            <div className="flex h-full flex-col p-8">
              <h3 className="mb-6 text-center text-xl font-bold">The Ambliq System</h3>

              {/* 2×2 benefit grid */}
              <div className="mb-6 grid grid-cols-2 gap-3">
                {systemTiles.slice(0, 4).map((tile, i) => {
                  const Icon = SYSTEM_ICONS[i]
                  return (
                    <div
                      key={i}
                      className="relative flex min-h-[92px] items-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-4"
                    >
                      {/* Large watermark icon bleeding off the right edge */}
                      <Icon
                        className="pointer-events-none absolute -right-3 top-1/2 h-24 w-24 -translate-y-1/2 text-blue-400/20"
                        strokeWidth={1.25}
                        aria-hidden="true"
                      />
                      {/* Label on the left */}
                      <span className="relative z-10 max-w-[68%] text-sm font-semibold leading-snug text-white">
                        {tile}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Benefit list */}
              <ul className="mt-auto space-y-3">
                {benefitList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            </BorderGlow>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
