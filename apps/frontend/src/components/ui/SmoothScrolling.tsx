import React, { useRef, useState, useCallback, useLayoutEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'
import { useViewportScroll, useTransform, useSpring, motion } from 'framer-motion'
React.useLayoutEffect = React.useEffect

const SmoothScroll = ({ children }: { children: any }) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [pageHeight, setPageHeight] = useState<null | number>(null)

  const resizePageHeight = useCallback((entries) => {
    for (const entry of entries) {
      setPageHeight(entry.contentRect.height)
    }
  }, [])

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => resizePageHeight(entries))
    scrollRef && resizeObserver.observe(scrollRef.current as Element)
    return () => resizeObserver.disconnect()
  }, [scrollRef, resizePageHeight])

  const { scrollY } = useViewportScroll()

  const transform = useTransform(scrollY, [0, pageHeight ?? 0], [0, pageHeight ? -pageHeight : 0])
  const physics = { damping: 50, mass: 0.4, stiffness: 300 }
  const spring = useSpring(transform, physics)

  return (
    <>
      <motion.div
        ref={scrollRef}
        style={{ y: spring, willChange: 'transform' }}
        className="fixed top-0 left-0 w-full overflow-hidden"
      >
        {children}
      </motion.div>

      <div style={{ height: pageHeight ?? 0 }} />
    </>
  )
}

export default SmoothScroll
