'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface RevealProps {
  children: React.ReactNode
  as?: keyof React.JSX.IntrinsicElements
  className?: string
  delay?: number
}

export default function Reveal({ children, as, className, delay = 0 }: RevealProps) {
  const elRef = useRef<HTMLElement | null>(null)
  const Tag = (as ?? 'div') as React.ElementType

  useEffect(() => {
    const el = elRef.current
    if (!el) return

    // Under reduced-motion: render fully visible immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.opacity = '1'
      el.style.transform = 'none'
      return
    }

    // Defensively register: React fires child effects before parent effects,
    // so this guarantees the plugin is registered before any child uses it.
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.from(el, {
        y: 32,
        opacity: 0,
        duration: 0.7,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        // If the tween is interrupted mid-flight (e.g. component unmount while
        // the FROM opacity:0 is applied), restore visibility so the element is
        // never left stranded invisible.
        onInterrupt: () => {
          gsap.set(el, { clearProps: 'opacity,transform' })
        },
      })
    })

    return () => ctx.revert()
  }, [delay])

  return (
    <Tag ref={elRef} className={className}>
      {children}
    </Tag>
  )
}
