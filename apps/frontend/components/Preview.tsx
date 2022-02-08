import { animationFrameEffect, useVisibleScrollEffect, useWindowSize } from 'lib/hooks'
import React, { RefObject, useRef } from 'react'

interface PreviewProps {
  item: any
  index: number
  rootRef: RefObject<Element>
  length: number
}

export const Preview: React.FC<PreviewProps> = ({ item, index, length, rootRef }) => {
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
          transitionYValue = -120
        }

        if (sectionRef.current) {
          sectionRef.current.style.transform = `translate3d(0px, ${transitionYValue}%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`
        }
      }),
    [windowHeight],
  )

  return (
    <div
      ref={sectionRef}
      className="absolute w-full h-full bg-no-repeat bg-contain"
      style={{
        zIndex: 10 - index,
        backgroundImage: `url(${item.url})`,
        backgroundPosition: '50%, 50%',
      }}
    />
  )
}
