import clsx from 'clsx'
import Ellipse from 'components/Ellipse'
import PurpleEllipse from 'components/PurpleEllipse'
import { useCtx } from 'contexts/global'
import { AnimateSharedLayout } from 'framer-motion'
import { animationFrameEffect, useIntersection, useVisibleScrollEffect } from 'lib/hooks'
import { useEffect, useRef } from 'react'
import { useWindowSize } from 'react-use'

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
  isWhite = true,
  threshold = 0.33,
  hasEllipse = false,
}) => {
  const ref = useRef(null)
  const intersection = useIntersection(ref, { threshold })
  const { setIsWhite } = useCtx()

  useEffect(() => {
    console.log({ intersection })
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
      {hasEllipse && <PurpleEllipse rootRef={ref} />}
      <div ref={ref}>{children}</div>
    </section>
  )
}
