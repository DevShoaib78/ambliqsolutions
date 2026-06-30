import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: ReactNode
  className?: string
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8', className)}>
      {children}
    </div>
  )
}
