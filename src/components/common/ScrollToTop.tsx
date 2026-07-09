'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

/**
 * Floating "back to top" button (lower-right). Appears once the user has
 * scrolled past the hero and jumps straight to the hero.
 *
 * The jump is deliberately INSTANT, not smooth: animating back up from the FAQ
 * flies the viewport through every section in between, which reads as a long
 * jittery blur on a phone. `immediate` also tells Lenis to snap its internal
 * animated position, otherwise it keeps easing toward the target afterwards.
 */
export default function ScrollToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toTop = () => {
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: number, o?: object) => void } }).lenis
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
    else window.scrollTo({ top: 0, behavior: 'auto' })
  }

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-brand-gradient text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  )
}
