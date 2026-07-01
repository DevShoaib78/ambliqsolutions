import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  heading: string
  accent?: string
  sub?: string
  align?: 'center' | 'left'
  className?: string
  /** Override the default responsive heading size classes. */
  headingClassName?: string
}

export default function SectionHeading({
  eyebrow,
  heading,
  accent,
  sub,
  align = 'center',
  className,
  headingClassName,
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left'

  const renderHeading = () => {
    if (!accent || !heading.includes(accent)) {
      return heading
    }
    const idx = heading.indexOf(accent)
    const before = heading.slice(0, idx)
    const after = heading.slice(idx + accent.length)
    return (
      <>
        {before}
        <span className="text-gradient">{accent}</span>
        {after}
      </>
    )
  }

  return (
    <div className={cn(alignClass, className)}>
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-widest text-blue-500 mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className={cn(headingClassName ?? 'text-3xl sm:text-4xl lg:text-5xl', 'font-bold text-ink leading-tight')}>
        {renderHeading()}
      </h2>
      {sub && (
        <p
          className={cn(
            'mt-4 text-base sm:text-lg text-ink max-w-2xl',
            align === 'center' && 'mx-auto'
          )}
        >
          {sub}
        </p>
      )}
    </div>
  )
}
