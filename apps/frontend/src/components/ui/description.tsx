import { VFadeInOut } from 'animations/fade-in-out'
import { motion, AnimatePresence } from 'framer-motion'
import React, { ReactNode } from 'react'

interface DescriptionProps {
  className?: string
  children: ReactNode
  textBig?: boolean
  animate?: {
    show?: boolean
    delay?: number
  }
}

export const Description: React.FC<DescriptionProps> = ({
  children,
  className,
  textBig = false,
  animate = {
    delay: 0,
    show: false,
  },
}) => {
  const props = {
    className: `${className} ${
      textBig ? 'lg:text-[36px] sm:text-3xl text-2xl' : 'lg:text-[24px] sm:text-xl text-lg'
    }`,
  }
  return (
    <>
      {!!animate ? (
        <AnimatePresence>
          {animate.show && (
            <motion.p
              initial="from"
              animate="to"
              exit="exit"
              variants={VFadeInOut({ delay: animate.delay })}
              {...props}
            >
              {children as any}
            </motion.p>
          )}
        </AnimatePresence>
      ) : (
        <p {...props}>{children}</p>
      )}
    </>
  )
}
