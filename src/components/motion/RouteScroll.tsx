'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type LenisLike = {
  scrollTo: (t: Element | number, o?: object) => void
  resize: () => void
}

const getLenis = () => (window as unknown as { lenis?: LenisLike }).lenis

/** Give up waiting for a stable layout after roughly two seconds. */
const MAX_FRAMES = 120
/** Identical consecutive frames required before we treat the layout as settled. */
const STABLE_FRAMES = 3

/**
 * Owns scroll position across route changes. Three jobs:
 *
 * 1. RESIZE LENIS. Lenis caches page dimensions per route and never recomputes
 *    them on a client-side navigation. Landing on the short /book page while it
 *    still believes the page is as tall as the home page lets its virtual scroll
 *    run thousands of pixels past the real bottom, so scrolling back up does
 *    nothing until all that phantom distance unwinds. It also silently clamps
 *    later scrollTo targets to the wrong limit.
 *
 * 2. LAND ON A HASH ("/#roi"). The router jumps before the Features section's
 *    ScrollTrigger pin spacer exists, and that spacer adds over 1200px on desktop,
 *    so everything below Features ends up stale. We refresh ScrollTrigger to force
 *    the pins into existence, then wait for the target's document position and the
 *    page height to hold steady across consecutive frames before scrolling. Do not
 *    replace this with a setTimeout: a fixed delay reads a half-built layout and
 *    lands thousands of pixels off. Note we pass Lenis an ABSOLUTE pixel target,
 *    because it derives an element's target from its own stale scroll baseline.
 *
 * 3. START A NEW PAGE AT THE TOP. Forward navigations always reset to the top, so
 *    a route entered from the footer never opens part-way down. Back and forward
 *    are left alone so the browser's scroll restoration still works.
 *
 * All of it aborts on wheel/touchstart so we never fight the user for the page.
 */
export default function RouteScroll() {
  const pathname = usePathname()
  const firstRun = useRef(true)
  const poppedRef = useRef(false)

  // Mark history navigations so we do not clobber scroll restoration.
  useEffect(() => {
    const onPop = () => { poppedRef.current = true }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    const wasPop = poppedRef.current
    poppedRef.current = false
    const isFirst = firstRun.current
    firstRun.current = false

    let cancelled = false
    let raf = 0
    const cancel = () => { cancelled = true }
    window.addEventListener('wheel', cancel, { once: true, passive: true })
    window.addEventListener('touchstart', cancel, { once: true, passive: true })

    const cleanup = () => {
      cancelled = true
      cancelAnimationFrame(raf)
      window.removeEventListener('wheel', cancel)
      window.removeEventListener('touchstart', cancel)
    }

    // (1) The new route's real dimensions, now and again once layout settles.
    getLenis()?.resize()
    const resizeSoon = requestAnimationFrame(() => getLenis()?.resize())

    const hash = window.location.hash
    const target = hash.length > 1 ? document.querySelector(hash) : null

    // (2) Hash landing.
    if (target) {
      ScrollTrigger.refresh()

      let frames = 0
      let stable = 0
      let lastTop = Number.NaN
      let lastHeight = Number.NaN

      const land = () => {
        const margin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0
        const top = target.getBoundingClientRect().top + window.scrollY - margin
        const lenis = getLenis()
        if (!lenis) {
          window.scrollTo({ top, behavior: 'auto' })
          return
        }
        lenis.resize()
        lenis.scrollTo(top, { immediate: true, force: true })
      }

      const tick = () => {
        if (cancelled) return
        const top = target.getBoundingClientRect().top + window.scrollY
        const height = document.documentElement.scrollHeight

        if (top === lastTop && height === lastHeight) stable++
        else stable = 0
        lastTop = top
        lastHeight = height

        if (stable >= STABLE_FRAMES || ++frames >= MAX_FRAMES) {
          land()
          return
        }
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)

      return () => { cleanup(); cancelAnimationFrame(resizeSoon) }
    }

    // (3) Forward navigation with no hash: open the new page at the top.
    if (!isFirst && !wasPop && !cancelled) {
      const lenis = getLenis()
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
      else window.scrollTo({ top: 0, behavior: 'auto' })
    }

    return () => { cleanup(); cancelAnimationFrame(resizeSoon) }
  }, [pathname])

  return null
}
