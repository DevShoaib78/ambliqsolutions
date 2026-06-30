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
  // Tracks whether the scroll-in animation has fired at least once
  const hasEnteredRef = useRef(false)
  // Tracks the value currently shown on screen (mid-tween or settled)
  const displayedRef = useRef(end)
  // Live-update tween ref so we can kill it before starting a new one
  const liveTweenRef = useRef<gsap.core.Tween | null>(null)
  // Always-current `end` for the scroll-trigger closure (avoids stale capture)
  const endRef = useRef(end)
  endRef.current = end

  const format = (v: number) =>
    `${prefix}${v.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`

  // ── Mount-only: set up the one-time scroll-triggered count-up ────────────
  useEffect(() => {
    const el = spanRef.current
    if (!el) return

    // Under reduced-motion: show final value immediately, skip all animations
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = format(endRef.current)
      return
    }

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          hasEnteredRef.current = true
          const currentEnd = endRef.current
          const obj = { v: 0 }
          displayedRef.current = 0
          el.textContent = format(0)
          gsap.to(obj, {
            v: currentEnd,
            duration: 1.6,
            ease: 'power2.out',
            onUpdate: () => {
              displayedRef.current = obj.v
              if (el) el.textContent = format(obj.v)
            },
            onComplete: () => {
              displayedRef.current = currentEnd
              if (el) el.textContent = format(currentEnd)
            },
          })
        },
      })
    })

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // intentionally mount-only: scroll trigger fires once, never re-registers

  // ── Live updates: tween smoothly when `end` changes after scroll-in ──────
  useEffect(() => {
    const el = spanRef.current
    if (!el) return

    // Under reduced-motion: always show final value directly
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = format(end)
      displayedRef.current = end
      return
    }

    if (!hasEnteredRef.current) {
      // Not yet scrolled into view — keep placeholder text in sync
      el.textContent = format(end)
      displayedRef.current = end
      return
    }

    // Already entered view — tween from current displayed value to new end
    if (liveTweenRef.current) liveTweenRef.current.kill()
    const from = displayedRef.current
    const obj = { v: from }
    liveTweenRef.current = gsap.to(obj, {
      v: end,
      duration: 0.4,
      ease: 'power2.out',
      onUpdate: () => {
        displayedRef.current = obj.v
        if (el) el.textContent = format(obj.v)
      },
      onComplete: () => {
        displayedRef.current = end
        if (el) el.textContent = format(end)
      },
    })
    return () => { liveTweenRef.current?.kill() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end]) // only `end` drives live updates; prefix/suffix/decimals are stable props

  return (
    <span ref={spanRef} className={className}>
      {format(end)}
    </span>
  )
}
