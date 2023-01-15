import { useEffect, useLayoutEffect, useState } from 'react'
import { AnimatePresence, motion, useSpring } from 'framer-motion'
import { useWindowSize } from 'lib/hooks'

interface ScrollDetectiveProps {
  ratio: number
  intersecting: boolean
}

export const ScrollDetective: React.FC<ScrollDetectiveProps> = ({ ratio, intersecting }) => {
  const windowWidth = useWindowSize()?.width ?? 0
  const [navHeight, setNavbarHeight] = useState(0)
  const width = useSpring(0, { damping: 50, mass: 0.4, stiffness: 300 })

  useEffect(() => {
    width.set((ratio / 2) * windowWidth)
  }, [ratio, windowWidth])

  useLayoutEffect(() => {
    const getNavbarHeight = () => {
      const height = document.querySelector('#navbar').clientHeight
      setNavbarHeight(height - 3)
    }

    window.addEventListener('scroll', getNavbarHeight)
    window.addEventListener('load', getNavbarHeight)
    return () => {
      window.removeEventListener('scroll', getNavbarHeight)
      window.removeEventListener('load', getNavbarHeight)
    }
  }, [])

  return (
    <AnimatePresence>
      {intersecting && (
        <motion.span
          style={{ top: navHeight, width }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: 'easeInOut', duration: 0.7 }}
          className="fixed left-0 h-2 bg-gradient-to-r from-pinkSugar  to-neonBlue z-20 shadow"
        />
      )}
    </AnimatePresence>
  )
}
