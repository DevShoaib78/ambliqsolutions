import { site } from '@/content/site'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import Reveal from '@/components/motion/Reveal'
import { SERVICE_ART } from '@/components/services/ServiceArt'

export default function Services() {
  return (
    <section id="services" className="overflow-hidden bg-surface py-20 sm:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={site.servicesHeader.eyebrow}
            heading={site.servicesHeader.heading}
            accent={site.servicesHeader.accent}
            sub={site.servicesHeader.sub}
            className="mb-14"
          />
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((service, i) => {
            const Art = SERVICE_ART[i] ?? SERVICE_ART[0]
            return (
              <Reveal key={service.id} delay={i * 0.07}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-bordersoft bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  {/* Illustrated top */}
                  <div className="transition-transform duration-300 group-hover:scale-[1.02]" aria-hidden="true">
                    <Art />
                  </div>
                  {/* Text */}
                  <div className="flex flex-1 flex-col p-6 text-center">
                    <h3 className="mb-2 text-lg font-bold text-ink">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-ink">{service.body}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
