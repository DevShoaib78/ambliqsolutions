'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Container from '@/components/common/Container'
import CtaButton from '@/components/common/CtaButton'
import { site } from '@/content/site'

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef     = useRef<HTMLParagraphElement>(null)
  const ctaRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      // ensure visible
      ;[headingRef, subRef, ctaRef].forEach(r => {
        if (r.current) { r.current.style.opacity = '1'; r.current.style.transform = 'none' }
      })
      return
    }
    const tl = gsap.timeline()
    tl.from(
      [headingRef.current, subRef.current, ctaRef.current],
      { y: 32, opacity: 0, duration: 0.75, stagger: 0.18, ease: 'power3.out' },
    )
    return () => { tl.kill() }
  }, [])

  const { headline, accent, subhead } = site.hero
  const idx    = headline.indexOf(accent)
  const before = headline.slice(0, idx)
  const after  = headline.slice(idx + accent.length)

  return (
    <section
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden pt-28 pb-24"
      aria-labelledby="hero-heading"
    >
      {/* Soft electric-blue radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 85% 55% at 50% 0%, rgba(12,96,252,0.10) 0%, transparent 68%)',
        }}
      />
      {/* Subtle streak left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(12,96,252,0.25) 0%, transparent 70%)' }}
      />
      {/* Subtle streak right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(12,96,252,0.15) 0%, transparent 70%)' }}
      />

      <Container className="relative z-10 text-center">
        <h1
          id="hero-heading"
          ref={headingRef}
          className="font-extrabold text-ink leading-tight tracking-tight mb-6"
          style={{ fontSize: 'clamp(2.25rem, 4.5vw + 1rem, 5rem)' }}
        >
          {before}
          <span className="text-gradient">{accent}</span>
          {after}
        </h1>

        <p
          ref={subRef}
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-ink-muted sm:text-xl"
        >
          {subhead}
        </p>

        <div ref={ctaRef}>
          <CtaButton variant="gradient" className="px-9 py-4 text-base" />
        </div>
      </Container>
    </section>
  )
}
