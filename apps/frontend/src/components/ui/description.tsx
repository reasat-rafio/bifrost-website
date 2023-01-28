import { VFadeInOut } from 'animations/fade-in-out'
import { motion, AnimatePresence } from 'framer-motion'
import React, { ReactNode } from 'react'

interface DescriptionProps {
  className?: string
  children: ReactNode
  textBig?: boolean
  type?: 'div' | 'p'
  animate?: {
    show?: boolean
    delay?: number
  }
}

export const Description: React.FC<DescriptionProps> = ({
  children,
  className,
  textBig = false,
  animate,
  type = 'p',
}) => {
  const props = {
    className: `${className} ${
      textBig ? 'lg:text-[36px] sm:text-3xl text-2xl' : 'lg:text-[24px] sm:text-xl text-lg'
    }`,
  }
  return (
    <>
      {type === 'p' ? (
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
      ) : (
        <>
          {!!animate ? (
            <AnimatePresence>
              {animate.show && (
                <motion.div
                  initial="from"
                  animate="to"
                  exit="exit"
                  variants={VFadeInOut({ delay: animate.delay })}
                  {...props}
                >
                  {children as any}
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            <div {...props}>{children}</div>
          )}
        </>
      )}
    </>
  )
}
