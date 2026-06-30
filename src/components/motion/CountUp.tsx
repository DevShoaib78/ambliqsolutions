'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface CountUpProps {
  end: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

export default function CountUp({
  end,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
}: CountUpProps) {
  const spanRef = useRef<HTMLSpanElement | null>(null)

  const format = (v: number) =>
    `${prefix}${v.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`

  useEffect(() => {
    const el = spanRef.current
    if (!el) return

    // Under reduced-motion: show final value immediately
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = format(end)
      return
    }

    // Defensively register here: React fires child effects before parent effects,
    // so this guarantees the plugin is registered before any child uses it.
    gsap.registerPlugin(ScrollTrigger)

    const obj = { v: 0 }
    // Do NOT reset textContent to 0 here — the span already SSR-renders the
    // final value. Resetting on mount would cause a visible flash (end → 0)
    // before ScrollTrigger fires. Instead, reset to 0 only inside onEnter,
    // so the count-up plays when the element actually enters the viewport.

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          obj.v = 0
          el.textContent = format(0)
          gsap.to(obj, {
            v: end,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: () => {
              if (el) el.textContent = format(obj.v)
            },
            onComplete: () => {
              if (el) el.textContent = format(end)
            },
          })
        },
      })
    })

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end, prefix, suffix, decimals])

  return (
    <span ref={spanRef} className={className}>
      {format(end)}
    </span>
  )
}
