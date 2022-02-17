import { motion } from 'framer-motion'
import { useVisibleScrollEffect } from 'lib/hooks'
import { ReactElement, RefObject, useState } from 'react'
import { useWindowSize } from 'react-use'

interface PurpleEllipseProps {
  className?: string
  rootRef: RefObject<Element>
}

export default function PurpleEllipse(props: PurpleEllipseProps): ReactElement {
  const { height: windowHeight } = useWindowSize() ?? {
    width: 0,
    height: 0,
  }
  const [ratio, setRatio] = useState(0.5)
  useVisibleScrollEffect(
    props.rootRef,
    (offsetBoundingRect, _, y) => () => {
      const yDelta = y + windowHeight - offsetBoundingRect.top
      const ratio = yDelta / windowHeight
      console.log({ yDelta, ratio, windowHeight, offsetBoundingRect, y })
      if (
        y > offsetBoundingRect.bottom - windowHeight / 2 ||
        y < offsetBoundingRect.top - windowHeight / 3
      ) {
        setRatio(0.5)
      } else {
        setRatio(1.3)
      }
    },
    [ratio],
  )
  return (
    <div className="absolute top-0 h-[100%]">
      <div className="sticky top-0 w-[90vw] h-[100vh]">
        <motion.div
          className="z-0 absolute top-[30vh] left-[5vw] w-[475px] h-[435px] bg-gradient-to-r from-[#594CA6] via-[#5F4C9D] to-[#3E2F5E]"
          style={{ filter: 'blur(88px)' }}
          animate={{
            scale: ratio,
            translateX: ratio * 200 - 200 * 1.3,
            translateY: ratio * 150 - 150 * 1.3,
            transition: {
              ease: 'easeInOut',
              delay: 0.5,
              duration: 1,
            },
          }}
        />
        <motion.div
          className="z-10 absolute top-[10vh] right-[1vw] w-[250px] h-[250px] bg-gradient-to-r from-[#594CA6] via-[#5F4C9D] to-[#3E2F5E]"
          style={{ filter: 'blur(58px)' }}
          animate={{
            scale: ratio,
            translateX: -ratio * 200 + 200 * 1.3,
            translateY: ratio * 150 - 150 * 1.3,
            transition: {
              ease: 'easeIn',
              delay: 0.5,
              duration: 1,
            },
          }}
        />
        <motion.div
          className="z-10 absolute top-[80vh] right-[5vw] w-[250px] h-[250px] bg-gradient-to-r from-[#594CA6] via-[#5F4C9D] to-[#3E2F5E]"
          style={{ filter: 'blur(58px)' }}
          animate={{
            scale: ratio,
            translateX: -ratio * 100 + 100 * 1.3,
            translateY: ratio * 150 - 150 * 1.3,
            transition: {
              ease: 'easeIn',
              delay: 0.5,
              duration: 1,
            },
          }}
        />
      </div>
    </div>
  )
}
