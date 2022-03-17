import React from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useWindowSize } from 'lib/hooks'

interface ScrollDetectiveProps {
  onView: boolean
  ratio: number
  totalLength: number
  containerWidth: number
}

const ScrollDetectiveVarient = {
  show: {
    opacity: 1,
  },
  hide: {
    opacity: 0,
  },
}

export const ScrollDetective: React.FC<ScrollDetectiveProps> = ({
  onView,
  ratio,
  totalLength,
  containerWidth,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0
  const windowHeight = useWindowSize()?.height ?? 0

  const scrollDetectivePosition = (windowWidth - containerWidth) / 2 / 2
  const scrollDetectiveHeight = windowHeight / 10

  const xInputPosition = (ratio / totalLength) * 300

  const x = useMotionValue(0)
  const xInput = [-70, xInputPosition - 100]
  const colorOutput = ['#7187FF', '#C9FF71']

  const background = useTransform(x, xInput, colorOutput)

  return (
    <motion.div
      className="fixed top-1/2 transform -translate-y-1/2 h-auto z-40 overflow-hidden rounded-2xl"
      initial="hide"
      animate={onView ? 'show' : 'hide'}
      variants={ScrollDetectiveVarient}
      style={{ right: `${scrollDetectivePosition}px` }}
    >
      <div className="h-72 w-2 bg-gradient-to-r from-[#29394A] to-[#06101B] relative rounded-2xl">
        <motion.div
          className="absolute left-0   w-full rounded-2xl"
          style={{
            top: `calc(${(ratio / totalLength) * 100}% - ${scrollDetectiveHeight}px)`,
            height: `${scrollDetectiveHeight}px`,
            background,
          }}
        />
      </div>
    </motion.div>
  )
}
// bg-gradient-to-b from-[#eeffe9] via-[#acffeb] to-[#c9ff71]
