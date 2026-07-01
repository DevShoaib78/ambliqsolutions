'use client'

import { useEffect, useRef, useState } from 'react'
import type { ComponentType } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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

function FeatureCard({ feature, widthClass = '' }: { feature: Feature; widthClass?: string }) {
  const Mockup = MOCKUP_MAP[feature.mockup]
  return (
    <div className={`flex flex-col rounded-2xl border border-bordersoft bg-white shadow-sm overflow-hidden ${widthClass}`}>
      <div className="p-4 bg-navy-900" aria-hidden="true">
        <Mockup />
      </div>
      <div className="p-6">
        <h3 className="mb-2 text-base font-bold text-ink">{feature.title}</h3>
        <p className="text-sm leading-relaxed text-ink">{feature.body}</p>
      </div>
    </div>
  )
}

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)
  const rightRef   = useRef<HTMLDivElement>(null)
  // Pinned horizontal scroll is a desktop-only treat. On mobile/tablet (and under
  // reduced-motion) we render a plain stacked/grid layout — scroll-jacking and
  // 100vh-pinned sections behave badly on touch devices.
  const [pinned, setPinned] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const desktop = window.matchMedia('(min-width: 1024px)').matches
    if (!reduced && desktop) setPinned(true)
  }, [])

  useEffect(() => {
    if (!pinned) return
    const section = sectionRef.current
    const track   = trackRef.current
    const right   = rightRef.current
    if (!section || !track || !right) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, track.scrollWidth - right.clientWidth)
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => '+=' + distance(),
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [pinned])

  // Mobile / tablet / reduced-motion: clean stacked grid.
  if (!pinned) {
    return (
      <section id="features" className="overflow-hidden py-20 sm:py-24 bg-white">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={site.featuresHeader.eyebrow}
              heading={site.featuresHeader.heading}
              accent={site.featuresHeader.accent}
              sub={site.featuresHeader.sub}
            />
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {site.features.map(feature => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
        </Container>
      </section>
    )
  }

  // Desktop: pinned, heading on the left, cards scroll right -> left.
  return (
    <section ref={sectionRef} id="features" className="bg-white">
      <div className="flex h-screen flex-col justify-center gap-8 overflow-hidden lg:flex-row lg:items-center lg:gap-0">
        {/* Left: heading stays in place while the section is pinned */}
        <div className="shrink-0 px-5 sm:px-6 lg:w-[40%] lg:min-w-[460px] lg:max-w-[560px] lg:pr-8 lg:pl-[clamp(2rem,calc((100vw-1200px)/2+1.5rem),4rem)]">
          <SectionHeading
            align="left"
            eyebrow={site.featuresHeader.eyebrow}
            heading={site.featuresHeader.heading}
            accent={site.featuresHeader.accent}
            sub={site.featuresHeader.sub}
          />
        </div>

        {/* Right: horizontal track scrolls right -> left, tied to scroll */}
        <div ref={rightRef} className="overflow-hidden lg:flex-1">
          <div
            ref={trackRef}
            className="flex w-max gap-6 pr-8 pl-5 sm:pl-6 lg:pl-0 will-change-transform"
          >
            {site.features.map(feature => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                widthClass="w-[80vw] shrink-0 sm:w-[340px] lg:w-[360px]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
