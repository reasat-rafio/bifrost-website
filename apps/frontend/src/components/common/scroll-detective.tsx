import { useEffect, useLayoutEffect, useState } from 'react'
import { AnimatePresence, MotionValue, motion, useSpring } from 'framer-motion'
import { useWindowScroll } from 'lib/hooks'

interface ScrollDetectiveProps {
  intersecting: boolean
  scrollYProgress: MotionValue<number>
}

export const ScrollDetective: React.FC<ScrollDetectiveProps> = ({
  intersecting,
  scrollYProgress,
}) => {
  const scroll = useWindowScroll()?.y ?? 0
  const scrolled = scroll > 1
  const [navHeight, setNavbarHeight] = useState(0)
  const scaleX = useSpring(scrollYProgress, { damping: 50, mass: 0.4, stiffness: 300 })

  const getNavbarHeight = () => {
    const height = document.querySelector('#navbar').clientHeight
    setNavbarHeight(height)
  }

  useLayoutEffect(() => {
    getNavbarHeight()
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', getNavbarHeight)
    window.addEventListener('load', getNavbarHeight)
    return () => {
      window.removeEventListener('scroll', getNavbarHeight)
      window.removeEventListener('load', getNavbarHeight)
    }
  }, [scrolled])

  return (
    <AnimatePresence>
      {intersecting && (
        <motion.span
          style={{ top: navHeight, scaleX }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: 'easeInOut', duration: 0.7 }}
          className="fixed left-0 h-[5px] w-full origin-left primary__gradient z-20 shadow"
        />
      )}
    </AnimatePresence>
  )
}
