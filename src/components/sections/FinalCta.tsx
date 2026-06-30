import { site } from '@/content/site'
import Container from '@/components/common/Container'
import CtaButton from '@/components/common/CtaButton'
import Reveal from '@/components/motion/Reveal'

function renderHeading(heading: string, accent?: string) {
  if (!accent || !heading.includes(accent)) return <>{heading}</>
  const idx = heading.indexOf(accent)
  return (
    <>
      {heading.slice(0, idx)}
      <span className="text-gradient">{accent}</span>
      {heading.slice(idx + accent.length)}
    </>
  )
}

export default function FinalCta() {
  const { heading, accent, sub } = site.finalCta

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Soft ambient blue glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[500px] w-[500px] rounded-full bg-blue-500/8 blur-3xl" />
      </div>

      <Container>
        <Reveal>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-tight mb-6">
              {renderHeading(heading, accent)}
            </h2>
            <p className="text-ink-muted text-base sm:text-lg mb-10 max-w-2xl mx-auto">
              {sub}
            </p>
            <CtaButton variant="gradient" href="/book">
              Book Your Free AI Audit Call
            </CtaButton>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
