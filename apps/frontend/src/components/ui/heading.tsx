import { VFadeInOut } from 'animations/fade-in-out'
import { AnimatePresence, motion } from 'framer-motion'
import React, { ReactNode } from 'react'

interface HeadingProps {
  className?: string
  children: ReactNode
  animate?: {
    show?: boolean
    delay?: number
  }
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  className,
  animate = {
    delay: 0,
    show: false,
  },
}) => {
  const props = { className: `${className} xl:text-[48px] lg:text-5xl md:text-5xl text-3xl` }

  return (
    <>
      {animate ? (
        <AnimatePresence>
          {animate.show && (
            <motion.h4
              initial="from"
              animate="to"
              exit="exit"
              variants={VFadeInOut({ delay: animate.delay })}
              {...props}
            >
              {children as any}
            </motion.h4>
          )}
        </AnimatePresence>
      ) : (
        <h4 {...props}>{children}</h4>
      )}
    </>
  )
}
