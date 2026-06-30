'use client'

import PillNav from './PillNav'
import { site } from '@/content/site'

/**
 * Navbar — thin wrapper that wires Ambliq brand config into PillNav.
 * PillNav handles desktop pills, CTA, and mobile hamburger/dropdown.
 */
export default function Navbar() {
  return (
    <PillNav
      items={site.nav}
      baseColor="#ffffff"
      pillColor="#00183C"
      pillTextColor="#ffffff"
      hoveredPillTextColor="#00183C"
    />
  )
}
