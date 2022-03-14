import React from 'react'
import { motion, MotionValue, useMotionValue, useTransform } from 'framer-motion'

interface ViewportScrollProps {
  pathLength: MotionValue<any>
  isComplete: boolean
  onView: boolean
  ratio: number
  totalLength: number
}

const ViewPortVarient = {
  show: {
    opacity: 1,
  },
  hide: {
    opacity: 0,
  },
}

export const ViewportScroll: React.FC<ViewportScrollProps> = ({
  pathLength,
  isComplete,
  onView,
  ratio,
  totalLength,
}) => {
  const xInputPosition = (ratio / totalLength) * 300

  const x = useMotionValue(0)
  const xInput = [-50, xInputPosition - 150, 100]
  const colorOutput = ['#7187FF', '#E4ACFF', '#C9FF71']

  const color = useTransform(x, xInput, colorOutput)

  return (
    <motion.div animate={onView ? 'show' : 'hide'} variants={ViewPortVarient}>
      <svg
        className="fixed top-1/2 transform -translate-y-1/2 2x:right-10 right-0 2xl:h-36 h-20 z-40"
        viewBox="0 0 60 60"
      >
        <motion.path
          fill="none"
          strokeWidth="4"
          stroke={color}
          strokeDasharray="0 1"
          d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
          style={{
            pathLength,
            rotate: 90,
            translateX: 5,
            translateY: 5,
            scaleX: -1,
          }}
        />
        <motion.path
          fill="none"
          strokeWidth="4"
          stroke="rgba(169, 151, 255, 1)"
          d="M14,26 L 22,33 L 35,16"
          initial={false}
          strokeDasharray="0 1"
          animate={{ pathLength: isComplete ? 1 : 0 }}
        />
      </svg>
    </motion.div>
  )
}
