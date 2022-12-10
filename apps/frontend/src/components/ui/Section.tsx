import clsx from 'clsx'
import PurpleEllipse from 'src/components/PurpleEllipse'
import { useRef } from 'react'

interface SectionProps {
  name: string
  className?: string
  hidden?: boolean
  isWhite?: boolean
  transition?: boolean
  hasEllipse?: boolean
  enableTransition?: boolean
  children: any
}

export const Section: React.FC<SectionProps> = ({
  name,
  children,
  className,
  hidden,
  enableTransition = true,
  hasEllipse = false,
}) => {
  const ref = useRef(null)

  const rootClass = clsx('relative', className && className, hidden ? 'hidden' : 'block')

  return (
    <section className={rootClass} id={name}>
      {hasEllipse && <PurpleEllipse enableTransition={enableTransition} rootRef={ref} />}
      <div ref={ref}>{children}</div>
    </section>
  )
}
