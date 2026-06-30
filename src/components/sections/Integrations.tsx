import { site } from '@/content/site'
import Container from '@/components/common/Container'
import CtaButton from '@/components/common/CtaButton'
import Reveal from '@/components/motion/Reveal'

// TODO: swap monogram tokens for real <img> logos when provided

// Stagger base durations so each token floats at a slightly different speed
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
              <CtaButton variant="gradient">
                {site.integrationsHeader.cta}
              </CtaButton>
            </Reveal>
          </div>

          {/* ── Right: floating monogram token cluster ─────────────── */}
          <div
            aria-hidden="true"
            className="flex-1 flex flex-wrap justify-center gap-4 sm:gap-5 lg:gap-6"
          >
            {site.integrations.map((integration, i) => (
              <div
                key={integration.name}
                title={integration.name}
                className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full
                           bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg
                           text-white font-bold text-sm sm:text-base select-none"
                style={{
                  animation: `float ${FLOAT_DURATIONS[i % FLOAT_DURATIONS.length]}s ease-in-out ${i * 0.3}s infinite alternate`,
                }}
              >
                {integration.abbr}
              </div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  )
}
