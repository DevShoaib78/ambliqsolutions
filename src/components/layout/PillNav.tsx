'use client'

/**
 * PillNav — adapted from React Bits PillNav-TS-TW
 * Source: https://raw.githubusercontent.com/DavidHDev/react-bits/main/public/r/PillNav-TS-TW.json
 * Changes: react-router-dom → next/link, logo → AS mark + wordmark lockup,
 *           added CTA button, changed to fixed header, Ambliq brand colours.
 */

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { gsap } from 'gsap'
import CtaButton from '@/components/common/CtaButton'

export type PillNavItem = {
  label: string
  href: string
  ariaLabel?: string
}

export interface PillNavProps {
  items: PillNavItem[]
  ease?: string
  baseColor?: string
  pillColor?: string
  hoveredPillTextColor?: string
  pillTextColor?: string
}

const PillNav: React.FC<PillNavProps> = ({
  items,
  ease = 'power3.out',
  baseColor = '#ffffff',
  pillColor = '#00183C',
  hoveredPillTextColor = '#00183C',
  pillTextColor = '#ffffff',
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const circleRefs   = useRef<Array<HTMLSpanElement | null>>([])
  const tlRefs       = useRef<Array<gsap.core.Timeline | null>>([])
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([])
  const hamburgerRef = useRef<HTMLButtonElement | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)

  const cssVars = {
    ['--base']:       baseColor,
    ['--pill-bg']:    pillColor,
    ['--hover-text']: hoveredPillTextColor,
    ['--pill-text']:  pillTextColor,
  } as React.CSSProperties

  /* ── Build GSAP timeline for each pill on layout / resize ── */
  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach(circle => {
        if (!circle?.parentElement) return
        const pill = circle.parentElement as HTMLElement
        const rect = pill.getBoundingClientRect()
        const { width: w, height: h } = rect
        const R      = ((w * w) / 4 + h * h) / (2 * h)
        const D      = Math.ceil(2 * R) + 2
        const delta  = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1
        const originY = D - delta

        circle.style.width  = `${D}px`
        circle.style.height = `${D}px`
        circle.style.bottom = `-${delta}px`

        gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${originY}px` })

        const label = pill.querySelector<HTMLElement>('.pill-label')
        const hover = pill.querySelector<HTMLElement>('.pill-label-hover')
        if (label) gsap.set(label, { y: 0 })
        if (hover) gsap.set(hover, { y: h + 12, opacity: 0 })

        const index = circleRefs.current.indexOf(circle)
        if (index === -1) return
        tlRefs.current[index]?.kill()
        const tl = gsap.timeline({ paused: true })
        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0)
        if (label) tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0)
        if (hover) {
          gsap.set(hover, { y: Math.ceil(h + 100), opacity: 0 })
          tl.to(hover, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0)
        }
        tlRefs.current[index] = tl
      })
    }

    layout()
    window.addEventListener('resize', layout)
    document.fonts?.ready.then(layout).catch(() => {})

    // Initialise mobile menu hidden
    const menu = mobileMenuRef.current
    if (menu) gsap.set(menu, { visibility: 'hidden', opacity: 0 })

    return () => window.removeEventListener('resize', layout)
  }, [items, ease])

  /* ── Hover handlers ── */
  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i]
    if (!tl) return
    activeTweenRefs.current[i]?.kill()
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), { duration: 0.3, ease, overwrite: 'auto' })
  }

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i]
    if (!tl) return
    activeTweenRefs.current[i]?.kill()
    activeTweenRefs.current[i] = tl.tweenTo(0, { duration: 0.2, ease, overwrite: 'auto' })
  }

  /* ── Mobile menu toggle ── */
  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen
    setIsMobileMenuOpen(newState)

    const hamburger = hamburgerRef.current
    const menu      = mobileMenuRef.current

    if (hamburger) {
      const lines = hamburger.querySelectorAll<HTMLElement>('.hamburger-line')
      if (newState) {
        gsap.to(lines[0], { rotation: 45,  y:  3, duration: 0.3, ease })
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease })
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease })
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease })
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' })
        gsap.fromTo(menu, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease })
      } else {
        gsap.to(menu, {
          opacity: 0, y: 10, duration: 0.2, ease,
          onComplete: () => gsap.set(menu, { visibility: 'hidden' }),
        })
      }
    }
  }

  const closeMobileMenu = () => {
    if (!isMobileMenuOpen) return
    setIsMobileMenuOpen(false)
    const hamburger = hamburgerRef.current
    const menu      = mobileMenuRef.current
    if (hamburger) {
      const lines = hamburger.querySelectorAll<HTMLElement>('.hamburger-line')
      gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease })
      gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease })
    }
    if (menu) {
      gsap.to(menu, { opacity: 0, y: 10, duration: 0.2, ease, onComplete: () => gsap.set(menu, { visibility: 'hidden' }) })
    }
  }

  const basePillClasses =
    'relative overflow-hidden inline-flex items-center justify-center h-full no-underline rounded-full font-semibold text-[13px] leading-none uppercase tracking-[0.3px] whitespace-nowrap cursor-pointer px-[16px]'

  return (
    <header className="fixed top-4 inset-x-4 z-50" role="banner">
      <div className="relative">
        {/* ── Main pill bar ── */}
        <nav
          className="w-full flex items-center justify-between px-3 rounded-3xl shadow-md backdrop-blur-sm"
          aria-label="Primary navigation"
          style={{ ...cssVars, background: 'var(--base)', height: '64px' }}
        >
          {/* Logo lockup: AS mark + wordmark */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 min-w-0" aria-label="Ambliq Solutions home">
            <Image
              src="/brand/logo-mini.webp"
              alt=""
              width={732}
              height={408}
              className="h-9 w-auto sm:h-10 shrink-0"
              priority
            />
            {/* Wordmark: hidden on very small (< sm) to prevent overflow */}
            <Image
              src="/brand/logo-text.webp"
              alt="Ambliq Solutions"
              width={1032}
              height={211}
              className="h-[22px] w-auto sm:h-[26px] hidden sm:block"
              priority
            />
          </Link>

          {/* Desktop: nav pills + CTA */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <div
              className="relative flex items-center rounded-full"
              style={{ height: '42px', background: 'var(--base)' }}
            >
              <ul
                role="menubar"
                className="list-none flex items-stretch m-0 p-[3px] h-full gap-[3px]"
              >
                {items.map((item, i) => (
                  <li key={item.href} role="none" className="flex h-full">
                    <Link
                      role="menuitem"
                      href={item.href}
                      className={basePillClasses}
                      style={{ background: 'var(--pill-bg)', color: 'var(--pill-text)' }}
                      aria-label={item.ariaLabel || item.label}
                      onMouseEnter={() => handleEnter(i)}
                      onMouseLeave={() => handleLeave(i)}
                    >
                      {/* Animated circle that expands from bottom on hover */}
                      <span
                        className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                        style={{ background: 'var(--base)', willChange: 'transform' }}
                        aria-hidden="true"
                        ref={el => { circleRefs.current[i] = el }}
                      />
                      {/* Stacked text: original scrolls up, hover text appears */}
                      <span className="label-stack relative inline-block leading-none z-[2]">
                        <span
                          className="pill-label relative z-[2] inline-block leading-none"
                          style={{ willChange: 'transform' }}
                        >
                          {item.label}
                        </span>
                        <span
                          className="pill-label-hover absolute left-0 top-0 z-[3] inline-block leading-none"
                          style={{ color: 'var(--hover-text)', willChange: 'transform, opacity' }}
                          aria-hidden="true"
                        >
                          {item.label}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <CtaButton variant="gradient" className="px-6 py-3 text-sm" />
          </div>

          {/* Mobile: hamburger button */}
          <button
            ref={hamburgerRef}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="pill-mobile-menu"
            className="md:hidden rounded-full flex flex-col items-center justify-center gap-[5px] cursor-pointer p-0 shrink-0 border-0"
            style={{ width: '42px', height: '42px', background: 'var(--pill-bg)' }}
          >
            <span className="hamburger-line w-4 h-0.5 rounded origin-center block" style={{ background: 'var(--base)' }} />
            <span className="hamburger-line w-4 h-0.5 rounded origin-center block" style={{ background: 'var(--base)' }} />
          </button>
        </nav>

        {/* ── Mobile dropdown ── */}
        <div
          id="pill-mobile-menu"
          ref={mobileMenuRef}
          className="md:hidden absolute top-[calc(100%+8px)] left-0 right-0 rounded-3xl shadow-lg z-[998] origin-top overflow-hidden"
          style={{ background: 'var(--base)' }}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <ul className="list-none m-0 p-[6px] flex flex-col gap-[4px]">
            {items.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3.5 px-5 text-[15px] font-semibold rounded-2xl transition-colors duration-150"
                  style={{ background: 'var(--pill-bg)', color: 'var(--pill-text)' }}
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="p-[6px] pt-2 border-t border-bordersoft">
            <CtaButton variant="gradient" className="w-full justify-center" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default PillNav
