'use client'

/**
 * AuroraBackground — SSR-safe wrapper for the Aurora WebGL component.
 * Uses dynamic import with ssr:false so the canvas/WebGL code never runs
 * during server-side rendering.
 */

import dynamic from 'next/dynamic'

const Aurora = dynamic(() => import('./Aurora'), { ssr: false })

export default function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <Aurora
        colorStops={['#00183C', '#0C60FC', '#00183C']}
        amplitude={0.8}
        blend={0.4}
        speed={0.4}
      />
    </div>
  )
}
