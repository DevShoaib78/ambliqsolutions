import { cn } from '@/lib/utils'

interface LogoProps {
  variant?: 'mini' | 'full'
  className?: string
}

export default function Logo({ variant = 'mini', className }: LogoProps) {
  if (variant === 'full') {
    return (
      <picture>
        <source srcSet="/brand/logo-full.webp" type="image/webp" />
        <img
          src="/brand/logo-full.webp"
          alt="Ambliq Solutions"
          width={160}
          height={40}
          className={cn('h-10 w-auto', className)}
        />
      </picture>
    )
  }

  return (
    <picture>
      <source srcSet="/brand/logo-mini.webp" type="image/webp" />
      <img
        src="/brand/logo-mini.png"
        alt="Ambliq Solutions"
        width={32}
        height={32}
        className={cn('h-8 w-8 object-contain', className)}
      />
    </picture>
  )
}
