import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import Reveal from '@/components/motion/Reveal'
import { site } from '@/content/site'
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
  [4,  2,  -6],
  [10, 38,  4],
  [42, 4,  -3],
  [52, 38,  5],
  [28, 20, -2],
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
            <div className="flex h-full flex-col rounded-2xl border border-bordersoft bg-white p-8 shadow-sm">
              <h3 className="mb-6 text-xl font-bold text-ink">Traditional</h3>

              {/* Scattered / tilted pain tiles */}
              <div className="relative h-56 mb-6 select-none" aria-hidden="true">
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
                  <li key={i} className="flex items-start gap-3 text-sm text-ink-muted">
                    <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* ── Right: The Ambliq System ── */}
          <Reveal delay={0.2}>
            <div
              className="flex h-full flex-col rounded-2xl p-8 shadow-lg"
              style={{
                background: 'linear-gradient(145deg, #00183C 0%, #0A356E 100%)',
                color: '#fff',
              }}
            >
              <h3 className="mb-6 text-xl font-bold">The Ambliq System</h3>

              {/* 2×2 benefit grid */}
              <div className="mb-6 grid grid-cols-2 gap-3">
                {systemTiles.slice(0, 4).map((tile, i) => {
                  const Icon = SYSTEM_ICONS[i]
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-2 rounded-xl bg-white/10 px-3 py-4 text-center"
                    >
                      <Icon className="h-7 w-7 text-blue-400" />
                      <span className="text-xs font-semibold leading-tight">{tile}</span>
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
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
