import { type LucideIcon, Phone, Workflow, Filter, CalendarCheck, DatabaseZap } from 'lucide-react'
import { site } from '@/content/site'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import Reveal from '@/components/motion/Reveal'
import SpotlightCard from '@/components/ui/SpotlightCard'

const iconMap: Record<string, LucideIcon> = {
  Phone,
  Workflow,
  Filter,
  CalendarCheck,
  DatabaseZap,
}

export default function Services() {
  return (
    <section id="services" className="py-20 sm:py-28 bg-surface">
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

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Phone
            return (
              <Reveal key={service.id} delay={i * 0.07}>
                <SpotlightCard
                  spotlightColor="rgba(12, 96, 252, 0.12)"
                  className="group h-full rounded-2xl border border-bordersoft bg-white p-7 transition-colors duration-300 hover:border-blue-500/40"
                >
                  {/* Oversized watermark icon bleeding off the top-right */}
                  <Icon
                    className="pointer-events-none absolute -right-5 -top-5 h-32 w-32 text-blue-500/[0.06] transition-all duration-500 group-hover:-rotate-6 group-hover:text-blue-500/[0.1]"
                    strokeWidth={1}
                    aria-hidden="true"
                  />
                  <div className="relative z-10">
                    <h3 className="mb-2 text-lg font-bold text-ink">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-ink">{service.body}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
