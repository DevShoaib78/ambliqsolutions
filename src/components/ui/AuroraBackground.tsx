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
      style={{ opacity: 0.14 }}
    >
      <Aurora
        colorStops={['#3B82F6', '#0C60FC', '#3B82F6']}
        amplitude={1.0}
        blend={0.35}
        speed={0.5}
      />
    </div>
  )
}
