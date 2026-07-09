'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { site } from '@/content/site'
import CtaButton from '@/components/common/CtaButton'

type LenisLike = {
  scrollTo: (t: Element | number, o?: object) => void
  resize: () => void
}

/**
 * Navbar — a floating white "pill" bar: logo left, plain-text links centered,
 * gradient CTA right; subtly settles on scroll. Clean white dropdown on mobile.
 *
 * Nav items in `site.nav` are bare hashes ("#roi"). On a non-home route those
 * would resolve to "/book#roi", which matches nothing and silently does nothing,
 * so away from "/" we rewrite them to "/#roi" and let the router go home first.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const onHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Close the mobile menu whenever the route changes.
  useEffect(() => { setOpen(false) }, [pathname])

  const hrefFor = (hash: string) => (onHome ? hash : `/${hash}`)

  const onNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
      setOpen(false)
      if (!onHome) return // let the router navigate to "/#hash"
      const el = document.querySelector(hash)
      if (!el) return
      e.preventDefault()
      const lenis = (window as unknown as { lenis?: LenisLike }).lenis
      if (!lenis) {
        el.scrollIntoView({ behavior: 'smooth' })
        return
      }
      // Lenis caches page dimensions and clamps scroll targets to them. After a
      // trip to /book (a short page) that cached limit is far too small, so nav
      // links would barely move the page until something else triggered a resize.
      lenis.resize()
      // No manual offset: both Lenis and native scrollIntoView already subtract
      // the section's `scroll-margin-top` (globals.css), which is what keeps the
      // heading clear of the fixed pill. Passing an offset too would double it.
      lenis.scrollTo(el)
    },
    [onHome],
  )

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4" role="banner">
      <div className={`relative w-full transition-[max-width] duration-300 ease-out ${scrolled ? 'max-w-[60rem]' : 'max-w-5xl'}`}>
        <nav
          className={`flex w-full items-center justify-between gap-4 rounded-full bg-white/95 px-4 backdrop-blur transition-[height,box-shadow] duration-300 ease-out sm:px-5 ${
            scrolled ? 'shadow-lg' : 'shadow-md'
          }`}
          style={{ height: scrolled ? '62px' : '70px' }}
          aria-label="Primary navigation"
        >
          {/* Logo lockup */}
          <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Ambliq Solutions home">
            <Image src="/brand/logo-mini.webp" alt="" width={732} height={408} className="h-8 w-auto sm:h-9" priority />
            <Image src="/brand/logo-text.webp" alt="Ambliq Solutions" width={1032} height={211} className="h-5 w-auto sm:h-[23px]" priority />
          </Link>

          {/* Center links (desktop) */}
          <ul className="hidden items-center gap-7 md:flex lg:gap-9">
            {site.nav.map(item => (
              <li key={item.href}>
                <Link
                  href={hrefFor(item.href)}
                  onClick={e => onNavClick(e, item.href)}
                  className="text-sm font-semibold text-ink/75 transition-colors hover:text-blue-500"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA (desktop) */}
          <div className="hidden shrink-0 md:block">
            <CtaButton variant="gradient" className="px-6 py-2.5 text-sm" />
          </div>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy-900 md:hidden"
          >
            <span className="relative block h-4 w-5">
              <span className={`absolute left-0 block h-0.5 w-5 rounded bg-white transition-all duration-300 ${open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-1'}`} />
              <span className={`absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 rounded bg-white transition-all duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 block h-0.5 w-5 rounded bg-white transition-all duration-300 ${open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-1'}`} />
            </span>
          </button>
        </nav>

        {/* Mobile dropdown */}
        <div
          id="mobile-menu"
          className={`absolute inset-x-0 top-[calc(100%+10px)] z-[998] origin-top overflow-hidden rounded-2xl border border-bordersoft bg-white shadow-xl transition-all duration-300 ease-out md:hidden ${
            open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0'
          }`}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <ul className="m-0 flex list-none flex-col p-2">
            {site.nav.map(item => (
              <li key={item.href}>
                <Link
                  href={hrefFor(item.href)}
                  className="block rounded-xl px-4 py-3 text-[15px] font-semibold text-ink transition-colors duration-150 hover:bg-surface"
                  onClick={e => onNavClick(e, item.href)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-bordersoft p-3 pt-2">
            <CtaButton variant="gradient" className="w-full justify-center" />
          </div>
        </div>
      </div>
    </header>
  )
}
