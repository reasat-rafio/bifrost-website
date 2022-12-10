import clsx from 'clsx'
import { motion } from 'framer-motion'
import { animationFrameEffect, useVisibleScrollEffect, useWindowSize } from 'src/lib/hooks'
import React, { RefObject, useRef } from 'react'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'src/utils/sanity'

interface ActionProps {
  item: any
  index: number
  rootRef: RefObject<Element>
  length: number
}

export const Action: React.FC<ActionProps> = ({ item, index, length, rootRef }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { height: windowHeight } = useWindowSize() ?? {
    width: 0,
    height: 0,
  }

  useVisibleScrollEffect(
    rootRef,
    (offsetBoundingRect, _, y) =>
      animationFrameEffect(() => {
        const yDelta = y + windowHeight - offsetBoundingRect.top
        const ratio = Math.max(0, Math.min(yDelta / windowHeight, length))

        let transitionYValue = 0
        let sectionRatio = 0

        if (index === length - 2) {
          sectionRatio = 0
        } else if (ratio >= 0 && ratio < index + 1.5) {
          sectionRatio = 0
          transitionYValue = 0
        } else if (ratio > index + 1.5 && ratio < index + 2) {
          sectionRatio = ratio - (index + 1)
          transitionYValue = 0 + (0.5 - sectionRatio) * 200
        } else {
          sectionRatio = 1
          transitionYValue = -100
        }

        if (sectionRef.current) {
          sectionRef.current.style.transform = `translate3d(0px, ${transitionYValue}%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`
        }
      }),
    [windowHeight],
  )

  console.log({ item })

  return (
    <motion.div
      animate={{
        transition: { ease: 'easeInOut', duration: 0.1 },
      }}
      ref={sectionRef}
      className="absolute top-[-10%] w-full h-[95%] flex justify-center"
      style={{
        zIndex: 10 - index,
      }}
    >
      <SanityImg
        className={clsx('rounded-lg object-contain')}
        builder={imageUrlBuilder}
        image={item}
        height={550}
      />
    </motion.div>
  )
}
