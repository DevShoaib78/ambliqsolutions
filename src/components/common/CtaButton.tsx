import Link from 'next/link'
import { ReactNode } from 'react'
import { site } from '@/content/site'
import { cn } from '@/lib/utils'

interface CtaButtonProps {
  href?: string
  variant?: 'gradient' | 'navy'
  children?: ReactNode
  className?: string
}

export default function CtaButton({
  href = site.cta.href,
  variant = 'gradient',
  children,
  className,
}: CtaButtonProps) {
  const variants = {
    gradient: 'bg-brand-gradient hover:shadow-blue-500/30',
    navy: 'bg-navy-900',
  }

  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center justify-center rounded-full px-7 py-3.5 font-bold text-sm shadow-lg hover:-translate-y-0.5 transition text-white',
        variants[variant],
        className
      )}
    >
      {children ?? site.cta.label}
    </Link>
  )
}
