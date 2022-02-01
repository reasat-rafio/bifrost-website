import clsx from 'clsx'
import { useIntersection } from 'lib/hooks'
import { useEffect, useRef } from 'react'

interface SectionProps {
  setActive: <K extends 'home'>(
    key: string,
    value: {
      home?: boolean
    }[K],
  ) => void
  name: string
  className?: string
  hidden?: boolean
}

export const Section: React.FC<SectionProps> = ({
  setActive,
  name,
  children,
  className,
  hidden,
}) => {
  const ref = useRef(null)
  const intersection = useIntersection(ref, { threshold: 0.1 })

  useEffect(() => {
    if (['home', 'datasets'].includes(name)) {
      setActive(name, intersection?.isIntersecting)
    }
  }, [intersection?.isIntersecting])

  const rootClass = clsx(
    'section overflow-hidden relative',
    className && className,
    hidden ? 'hidden' : 'block',
  )

  return (
    <section className={rootClass} id={name}>
      <div ref={ref}>{children}</div>
    </section>
  )
}
