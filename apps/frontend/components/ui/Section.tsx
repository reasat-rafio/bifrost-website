import clsx from 'clsx'
import { useCtx } from 'contexts/global'
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
  isWhite?: boolean
  transition?: boolean
}

export const Section: React.FC<SectionProps> = ({
  setActive,
  name,
  children,
  className,
  hidden,
  isWhite = true,
}) => {
  const ref = useRef(null)
  const intersection = useIntersection(ref, { threshold: 0.1 })
  const { setIsWhite } = useCtx()
  // console.log(intersection.offsetBoundingRect)

  useEffect(() => {
    if (['hero', 'datasets'].includes(name)) {
      setActive(name, intersection?.isIntersecting)
    }
    if (intersection?.isIntersecting) {
      setIsWhite(isWhite)
    }
  }, [intersection?.isIntersecting])

  const rootClass = clsx(
    'section overflow-hidden relative',
    className && className,
    hidden ? 'hidden' : 'block',
  )

  return (
    <section className={rootClass} id={name}>
      <div ref={ref} className="z-10">
        {children}
      </div>
    </section>
  )
}
