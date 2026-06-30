'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { site } from '@/content/site'
import Container from '@/components/common/Container'
import Logo from '@/components/common/Logo'
import CtaButton from '@/components/common/CtaButton'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-4 inset-x-4 z-50">
      {/* Floating pill */}
      <nav
        className={[
          'bg-white/90 backdrop-blur-md rounded-3xl transition-shadow duration-300',
          scrolled ? 'shadow-lg' : 'shadow-md',
        ].join(' ')}
      >
        <Container className="flex items-center justify-between h-16">
          {/* Left: mini logo + wordmark */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <Logo variant="mini" />
            <span className="font-bold text-sm text-ink group-hover:text-blue-500 transition-colors">
              Ambliq Solutions
            </span>
          </Link>

          {/* Center: anchor nav links (desktop only) */}
          <div className="hidden md:flex items-center gap-6">
            {site.nav.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-ink hover:text-blue-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right: CTA (desktop) + hamburger (mobile) */}
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <CtaButton variant="gradient" />
            </div>

            <button
              onClick={() => setIsOpen(prev => !prev)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-surface transition-colors text-ink"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? (
                /* X icon */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                /* Hamburger icon */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </Container>
      </nav>

      {/* Mobile dropdown (below the pill) */}
      <div id="mobile-menu">
        <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </header>
  )
}
