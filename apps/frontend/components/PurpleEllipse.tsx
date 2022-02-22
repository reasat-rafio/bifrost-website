import { motion } from 'framer-motion'
import { animationFrameEffect, useVisibleScrollEffect } from 'lib/hooks'
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
  const [ratio, setRatio] = useState(0.3)

  useVisibleScrollEffect(
    props.rootRef,
    (offsetBoundingRect, _, y) =>
      animationFrameEffect(() => {
        const yDelta = y + windowHeight - offsetBoundingRect.top
        console.log({ yDelta, windowHeight, offsetBoundingRect, y })
        if (yDelta < windowHeight) {
          setRatio(yDelta / windowHeight)
        } else if (yDelta > offsetBoundingRect.height) {
          setRatio(1 - (yDelta - offsetBoundingRect.height) / windowHeight)
        } else {
          setRatio(1)
        }
        console.log({ ratio })
      }),
    [ratio],
  )
  return (
    <div className="absolute top-0 h-[100%]">
      <div className="sticky top-0 w-[100vw] h-[100vh]">
        <motion.div
          className="z-10 absolute rounded-full md:w-[40vw] md:h-[40vw] w-[50vw] h-[50vw] top-[30vh] left-[0vw] bg-gradient-to-r from-[#594CA6] via-[#5F4C9D] to-[#3E2F5E]"
          animate={{
            filter: 'blur(98px)',
            scale: ratio,
            translateX: `${10 * ratio}%`,
            translateY: (windowHeight / 10) * ratio,
          }}
        />
        <motion.div
          className="z-10 absolute rounded-full md:w-[36vw] md:h-[36vw] w-[30vw] h-[30vw] right-[0vw] bg-gradient-to-r from-[#594CA6] via-[#5F4C9D] to-[#3E2F5E]"
          animate={{
            filter: 'blur(58px)',
            scale: ratio,
            translateX: `-${20 * ratio}%`,
            translateY: (windowHeight / 10) * ratio,
          }}
        />
        <motion.div
          className="z-10 absolute top-[80vh] rounded-full md:w-[26vw] md:h-[26vw] w-[30vw] h-[30vw] right-[0vw] bg-gradient-to-r from-[#594CA6] via-[#5F4C9D] to-[#3E2F5E]"
          animate={{
            filter: 'blur(58px)',
            scale: ratio,
            translateX: `-${70 * ratio}%`,
            translateY: -(windowHeight / 10) * ratio,
          }}
        />
      </div>
    </div>
  )
}
