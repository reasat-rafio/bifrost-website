import { forwardRef } from 'react'
import clsx from 'clsx'

interface SectionProps {
  className?: string
  ref?: React.ForwardedRef<HTMLElement>
  children: React.ReactNode
  isContainer?: boolean
  borderBottom?: boolean
  padding?: boolean
}

export const Section: React.FC<SectionProps> = forwardRef(
  ({ className, children, isContainer = true, borderBottom = true, padding = true }, ref) => {
    return (
      <section
        ref={ref}
        className={clsx(
          className,
          'relative z-10',
          padding && 'section_pading',
          isContainer && 'container mx-auto',
          borderBottom && 'border-b border-secondary/80',
        )}
      >
        {children}
      </section>
    )
  },
)
