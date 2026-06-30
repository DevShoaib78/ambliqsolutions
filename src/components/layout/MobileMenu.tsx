'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { site } from '@/content/site'
import CtaButton from '@/components/common/CtaButton'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  // Lock background scroll while menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Move focus to first menu link when opened
  useEffect(() => {
    if (isOpen && firstLinkRef.current) {
      firstLinkRef.current.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="mt-2 bg-white/95 backdrop-blur-md rounded-3xl shadow-lg overflow-hidden">
      <nav className="flex flex-col">
        {site.nav.map((link, i) => (
          <Link
            key={link.href}
            ref={i === 0 ? firstLinkRef : undefined}
            href={link.href}
            onClick={onClose}
            className={[
              'px-6 py-4 text-sm font-medium text-ink hover:text-blue-500 hover:bg-surface transition-colors',
              i < site.nav.length - 1 ? 'border-b border-bordersoft' : '',
            ].join(' ')}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="p-5 pt-3 border-t border-bordersoft">
        <CtaButton variant="gradient" className="w-full">
          {site.cta.label}
        </CtaButton>
      </div>
    </div>
  )
}
