import { site } from '@/content/site'
import Container from '@/components/common/Container'
import CtaButton from '@/components/common/CtaButton'
import Reveal from '@/components/motion/Reveal'
import SectionHeading from '@/components/common/SectionHeading'

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
            <SectionHeading
              heading={heading}
              accent={accent}
              sub={sub}
              align="center"
              className="mb-10"
            />
            <CtaButton variant="gradient" href="/book">
              Book Your Free AI Audit Call
            </CtaButton>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
