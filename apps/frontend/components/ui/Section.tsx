import clsx from 'clsx'
import PurpleEllipse from 'components/PurpleEllipse'
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
  hasEllipse?: boolean
}

export const Section: React.FC<SectionProps> = ({
  setActive,
  name,
  children,
  className,
  hidden,
  threshold = 0.33,
  hasEllipse = false,
}) => {
  const ref = useRef(null)
  const intersection = useIntersection(ref, { threshold })

  useEffect(() => {
    console.log({ intersection })
    if (['hero', 'datasets', 'demo'].includes(name)) {
      setActive(name, intersection?.isIntersecting)
    }
  }, [intersection?.isIntersecting])

  const rootClass = clsx('relative', className && className, hidden ? 'hidden' : 'block')

  return (
    <section className={rootClass} id={name}>
      {hasEllipse && <PurpleEllipse rootRef={ref} />}
      <div ref={ref}>{children}</div>
    </section>
  )
}
