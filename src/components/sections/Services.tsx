import { type LucideIcon, Phone, Workflow, Filter, CalendarCheck, DatabaseZap } from 'lucide-react'
import { site } from '@/content/site'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import Reveal from '@/components/motion/Reveal'

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
                <div className="group flex flex-col gap-4 rounded-xl border border-bordersoft bg-white p-6 transition hover:border-blue-500/30 hover:shadow-md">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500 transition group-hover:bg-blue-500/20">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="mb-1.5 font-bold text-ink">{service.title}</h3>
                    <p className="text-sm text-ink-muted leading-relaxed">{service.body}</p>
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
