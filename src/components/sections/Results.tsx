import { site } from '@/content/site'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import CountUp from '@/components/motion/CountUp'
import Reveal from '@/components/motion/Reveal'

export default function Results() {
  const { stats, testimonial } = site.results

  return (
    <section id="results" className="py-20 sm:py-28 bg-white">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Results"
            heading="Numbers That Speak for Themselves"
            accent="Speak for Themselves"
            sub="Early client results and system benchmarks — real data from businesses using AI voice automation."
            className="mb-14"
          />
        </Reveal>

        {/* ── Stats row ────────────────────────────────────────────── */}
        <div className="mb-14 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-extrabold text-ink leading-none mb-2">
                  <CountUp
                    end={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="text-sm text-ink-muted font-medium leading-snug">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Testimonial ──────────────────────────────────────────── */}
        <Reveal>
          <div className="mx-auto max-w-2xl rounded-2xl border border-bordersoft bg-surface p-8 sm:p-10">
            <blockquote className="text-base sm:text-lg text-ink-muted leading-relaxed italic">
              <p className="mb-4">{testimonial.quote}</p>
              <footer className="flex items-center gap-3 not-italic">
                <div className="h-10 w-10 rounded-full bg-brand-gradient flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {testimonial.name.charAt(0)}
                </div>
                <cite className="not-italic">
                  <p className="font-semibold text-ink text-sm">{testimonial.name}</p>
                  <p className="text-xs text-ink-muted">
                    {testimonial.role} · {testimonial.company}
                  </p>
                </cite>
              </footer>
            </blockquote>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
