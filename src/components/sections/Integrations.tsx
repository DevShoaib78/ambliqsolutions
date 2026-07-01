import { site } from '@/content/site'
import Container from '@/components/common/Container'
import CtaButton from '@/components/common/CtaButton'
import Reveal from '@/components/motion/Reveal'

// Stagger base durations so each pill floats at a slightly different speed
const FLOAT_DURATIONS = [3, 3.4, 2.8, 3.2, 3.6, 2.9, 3.1, 3.5]

export default function Integrations() {
  return (
    <section className="bg-navy-gradient text-white py-20 sm:py-28 overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* ── Left: text ────────────────────────────────────────────── */}
          <div className="flex-1 text-center lg:text-left">
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-4">
                {site.integrationsHeader.eyebrow}
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5">
                {site.integrationsHeader.heading}
              </h2>
              <p className="text-white/70 text-base sm:text-lg mb-8 max-w-md mx-auto lg:mx-0">
                {site.integrationsHeader.body}
              </p>
              <CtaButton
                variant="gradient"
                href={site.integrationsHeader.ctaHref}
                external
              >
                {site.integrationsHeader.cta}
              </CtaButton>
            </Reveal>
          </div>

          {/* ── Right: floating platform-name pills ─────────────────── */}
          <div className="flex-1 flex flex-wrap justify-center gap-3 sm:gap-4">
            {site.integrations.map((integration, i) => (
              <div
                key={integration.name}
                className="flex items-center rounded-full border border-white/15 bg-white/10 px-5 py-3
                           text-sm sm:text-base font-semibold text-white shadow-lg backdrop-blur-sm select-none"
                style={{
                  animation: `float ${FLOAT_DURATIONS[i % FLOAT_DURATIONS.length]}s ease-in-out ${i * 0.25}s infinite alternate`,
                }}
              >
                <span className="mr-2.5 h-2 w-2 shrink-0 rounded-full bg-blue-400" aria-hidden="true" />
                {integration.name}
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  )
}
