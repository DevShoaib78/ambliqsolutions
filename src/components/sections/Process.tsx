import { site } from '@/content/site'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import Reveal from '@/components/motion/Reveal'

export default function Process() {
  return (
    <section id="process" className="py-20 sm:py-28">
      <Container>

        <Reveal>
          <SectionHeading
            eyebrow={site.processHeader.eyebrow}
            heading={site.processHeader.heading}
            sub={site.processHeader.sub}
            className="mb-16"
          />
        </Reveal>

        <div className="grid gap-10 sm:grid-cols-3 sm:gap-8 lg:gap-12">
          {site.process.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <div className="flex flex-col items-center gap-3 text-center">
                {/* Giant gradient numeral */}
                <span
                  className="text-gradient text-8xl lg:text-9xl font-bold leading-none select-none"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <h3 className="text-xl font-bold text-ink mt-2">{step.title}</h3>
                <p className="text-ink text-sm leading-relaxed max-w-xs">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

      </Container>
    </section>
  )
}
