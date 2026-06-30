import type { ComponentType } from 'react'
import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import Reveal from '@/components/motion/Reveal'
import { site } from '@/content/site'
import AlwaysOn  from '@/components/mockups/AlwaysOn'
import Qualify   from '@/components/mockups/Qualify'
import Booking   from '@/components/mockups/Booking'
import Crm       from '@/components/mockups/Crm'
import MultiCall from '@/components/mockups/MultiCall'
import Natural   from '@/components/mockups/Natural'
import type { Feature } from '@/content/site'

const MOCKUP_MAP: Record<Feature['mockup'], ComponentType> = {
  'always-on': AlwaysOn,
  'qualify':   Qualify,
  'booking':   Booking,
  'crm':       Crm,
  'multicall': MultiCall,
  'natural':   Natural,
}

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="What It Does"
            heading="What Your AI Receptionist Does"
            sub="Six core capabilities that work together to capture every lead and never let an enquiry fall through the cracks."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {site.features.map((feature, i) => {
            const Mockup = MOCKUP_MAP[feature.mockup]
            return (
              <Reveal key={feature.id} delay={i * 0.08}>
                <div className="flex flex-col rounded-2xl border border-bordersoft bg-white shadow-sm overflow-hidden">
                  <div className="p-4 bg-navy-900">
                    <Mockup />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-base font-bold text-ink">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-ink-muted">{feature.body}</p>
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
