'use client'

import { useEffect, useRef } from 'react'

interface CalendlyEmbedProps {
  url: string
}

const CALENDLY_SRC = 'https://assets.calendly.com/assets/external/widget.js'

declare global {
  interface Window {
    Calendly?: { initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void }
  }
}

/**
 * Robust Calendly inline embed.
 *
 * We explicitly call `Calendly.initInlineWidget` on mount rather than relying on
 * the widget script's automatic DOM scan. The auto-scan only runs once when the
 * script first loads, so on a client-side navigation to /book (where the script
 * is already present) the widget would otherwise never initialise.
 */
export default function CalendlyEmbed({ url }: CalendlyEmbedProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const parent = ref.current
    if (!parent) return

    const init = () => {
      if (!ref.current || !window.Calendly) return
      ref.current.innerHTML = '' // guard against a double init leaving two iframes
      window.Calendly.initInlineWidget({ url, parentElement: ref.current })
    }

    if (window.Calendly) {
      init()
    } else {
      let script = document.querySelector<HTMLScriptElement>(`script[src="${CALENDLY_SRC}"]`)
      if (!script) {
        script = document.createElement('script')
        script.src = CALENDLY_SRC
        script.async = true
        document.body.appendChild(script)
      }
      script.addEventListener('load', init, { once: true })
    }

    return () => {
      if (ref.current) ref.current.innerHTML = ''
    }
  }, [url])

  return (
    <div
      ref={ref}
      className="w-full overflow-hidden rounded-2xl"
      style={{ minWidth: '320px', height: '700px' }}
    />
  )
}
