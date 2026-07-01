'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Container from '@/components/common/Container'
import CtaButton from '@/components/common/CtaButton'
import { site } from '@/content/site'
import AuroraBackground from '@/components/ui/AuroraBackground'

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef     = useRef<HTMLParagraphElement>(null)
  const ctaRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const targets = [headingRef.current, subRef.current, ctaRef.current]

    // Reduced motion: just make sure everything is visible.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(targets, { clearProps: 'all' })
      return
    }

    // fromTo (explicit opacity:1 end) so the text is ALWAYS animated back to
    // visible — even on a client-side remount (e.g. navigating back from /book),
    // where a plain .from() can otherwise animate 0 -> 0 and leave it hidden.
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.18, ease: 'power3.out', clearProps: 'transform' },
      )
    })
    return () => ctx.revert()
  }, [])

  const { headline, accent, subhead } = site.hero
  const hasAccent = accent && headline.includes(accent)
  const idx    = hasAccent ? headline.indexOf(accent) : -1
  const before = hasAccent ? headline.slice(0, idx) : ''
  const after  = hasAccent ? headline.slice(idx + accent.length) : ''

  return (
    <section
      className="relative -mt-24 flex min-h-screen items-center justify-center overflow-hidden pt-40 pb-24"
      aria-labelledby="hero-heading"
    >
      {/* Soft Aurora background (WebGL, client-only, reduced-motion safe) */}
      <AuroraBackground />

      <Container className="relative z-10 text-center">
        <h1
          id="hero-heading"
          ref={headingRef}
          className="font-extrabold text-ink leading-tight tracking-tight mb-6"
          style={{ fontSize: 'clamp(2.25rem, 4.5vw + 1rem, 5rem)' }}
        >
          {hasAccent ? (
            <>
              {before}
              <span className="text-gradient">{accent}</span>
              {after}
            </>
          ) : headline}
        </h1>

        <p
          ref={subRef}
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-ink sm:text-xl"
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
