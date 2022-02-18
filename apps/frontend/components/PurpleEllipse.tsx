import { motion } from 'framer-motion'
import { useVisibleScrollEffect } from 'lib/hooks'
import { ReactElement, RefObject, useState } from 'react'
import { useWindowSize } from 'react-use'

interface PurpleEllipseProps {
  className?: string
  rootRef: RefObject<Element>
}

export default function PurpleEllipse(props: PurpleEllipseProps): ReactElement {
  const { height: windowHeight, width: windowWidth } = useWindowSize() ?? {
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
          className="z-0 absolute rounded-full top-[30vh] left-[5vw] bg-gradient-to-r from-[#594CA6] via-[#5F4C9D] to-[#3E2F5E]"
          style={{ filter: 'blur(88px)', width: windowWidth / 4, height: windowWidth / 4 }}
          animate={{
            scale: ratio,
            translateX: ((ratio - 0.3) * windowWidth) / 5 - 200,
            translateY: (ratio - 0.3) * 150 - 150,
            transition: {
              ease: 'easeInOut',
              delay: 0.5,
              duration: 1,
            },
          }}
        />
        <motion.div
          className="z-10 absolute top-[10vh] rounded-full right-[1vw] bg-gradient-to-r from-[#594CA6] via-[#5F4C9D] to-[#3E2F5E]"
          style={{ filter: 'blur(58px)', width: windowWidth / 6, height: windowWidth / 6 }}
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
          className="z-10 absolute top-[80vh] rounded-full right-[5vw] bg-gradient-to-r from-[#594CA6] via-[#5F4C9D] to-[#3E2F5E]"
          style={{ filter: 'blur(58px)', width: windowWidth / 6, height: windowWidth / 6 }}
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
