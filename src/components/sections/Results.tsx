import { site } from '@/content/site'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import CountUp from '@/components/motion/CountUp'
import Reveal from '@/components/motion/Reveal'

export default function Results() {
  const { stats, promise } = site.results

  return (
    <section id="results" className="relative overflow-hidden bg-surface py-20 sm:py-28">
      {/* Decorative brand glows */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />

      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow={site.resultsHeader.eyebrow}
            heading={site.resultsHeader.heading}
            accent={site.resultsHeader.accent}
            sub={site.resultsHeader.sub}
            className="mb-14"
          />
        </Reveal>

        {/* ── Stat cards ───────────────────────────────────────────── */}
        <div className="mb-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <div className="group h-full rounded-2xl border border-bordersoft bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:shadow-md">
                <div className="mb-2 text-4xl font-extrabold leading-none text-gradient sm:text-5xl">
                  <CountUp end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                </div>
                <p className="text-sm font-medium leading-snug text-ink">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Promise / value statement (dark card, no client claims) ── */}
        <Reveal>
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-navy-gradient p-10 text-center shadow-xl sm:p-12">
            <div aria-hidden="true" className="pointer-events-none absolute -top-1/3 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/30 blur-3xl" />
            <h3 className="relative mb-3 text-2xl font-bold text-white sm:text-3xl">{promise.heading}</h3>
            <p className="relative mx-auto max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{promise.body}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
