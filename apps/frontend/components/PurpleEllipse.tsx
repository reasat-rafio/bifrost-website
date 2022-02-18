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
  const [ratio, setRatio] = useState(0.3)
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
        setRatio(0.3)
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
          className="z-0 absolute rounded-full md:w-[20vw] md:h-[20vw] w-[40vw] h-[40vw] top-[30vh] left-[0vw] bg-gradient-to-r from-[#594CA6] via-[#5F4C9D] to-[#3E2F5E]"
          animate={{
            filter: 'blur(98px)',
            scale: ratio,
            translateX: (windowWidth / 10) * (ratio - 0.3),
            translateY: (windowHeight / 10) * (ratio - 0.3),
            transition: {
              ease: 'easeInOut',
              delay: 0.5,
              duration: 1,
            },
          }}
        />
        <motion.div
          className="z-10 absolute top-[10vh] rounded-full md:w-[16vw] md:h-[16vw] w-[30vw] h-[30vw] right-[0vw] bg-gradient-to-r from-[#594CA6] via-[#5F4C9D] to-[#3E2F5E]"
          animate={{
            filter: 'blur(58px)',
            scale: ratio,
            translateX: -(windowWidth / 30) * (ratio - 0.3),
            translateY: (windowHeight / 10) * (ratio - 0.3),
            transition: {
              ease: 'easeIn',
              delay: 0.5,
              duration: 1,
            },
          }}
        />
        <motion.div
          className="z-10 absolute top-[80vh]  rounded-full md:w-[16vw] md:h-[16vw] w-[30vw] h-[30vw] right-[0vw] bg-gradient-to-r from-[#594CA6] via-[#5F4C9D] to-[#3E2F5E]"
          animate={{
            filter: 'blur(58px)',
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
