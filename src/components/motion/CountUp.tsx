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

    gsap.registerPlugin(ScrollTrigger)

    const obj = { v: 0 }
    el.textContent = format(0)

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        v: end,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          if (el) el.textContent = format(obj.v)
        },
        onComplete: () => {
          if (el) el.textContent = format(end)
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
