import clsx from 'clsx'
import { useCtx } from 'contexts/global'
import { useIntersection } from 'lib/hooks'
import { useEffect, useRef } from 'react'

interface SectionProps {
  setActive?: <K extends 'home'>(
    key: string,
    value: {
      home?: boolean
    }[K],
  ) => void
  name: string
  className?: string
  hidden?: boolean
  isWhite?: boolean
  transition?: boolean
  threshold?: number
}

export const Section: React.FC<SectionProps> = ({
  setActive,
  name,
  children,
  className,
  hidden,
  isWhite = true,
  threshold = 0.33,
}) => {
  const ref = useRef(null)
  const intersection = useIntersection(ref, { threshold })
  const { setIsWhite } = useCtx()

  useEffect(() => {
    if (['hero', 'datasets', 'demo'].includes(name)) {
      setActive(name, intersection?.isIntersecting)
    }
    if (intersection?.isIntersecting) {
      setIsWhite(isWhite)
    }
  }, [intersection?.isIntersecting])

  const rootClass = clsx('relative', className && className, hidden ? 'hidden' : 'block')

  return (
    <section className={rootClass} id={name}>
      <div ref={ref}>{children}</div>
    </section>
  )
}
