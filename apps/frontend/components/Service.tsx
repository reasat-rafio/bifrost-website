import { motion } from 'framer-motion'
import { marksSerializer, typesSerializer } from 'lib/blockContent'
import { animationFrameEffect, useVisibleScrollEffect } from 'lib/hooks'
import { Service as ServiceInterface } from 'lib/types'
import throttle from 'lodash.throttle'
import { Dispatch, ReactElement, RefObject, SetStateAction, useRef } from 'react'
import { useWindowSize } from 'react-use'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder, PortableText } from 'utils/sanity'
import Button from './ui/Button'

interface ServiceProps {
  item: ServiceInterface
  index: number
  rootRef: RefObject<Element>
  length: number
  setCurrent: Dispatch<SetStateAction<number>>
  current: number
  isScroll: boolean
}

export default function Service({
  item,
  index,
  rootRef,
  length,
  setCurrent,
  current,
  isScroll,
}: ServiceProps): ReactElement {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { height: windowHeight } = useWindowSize() ?? {
    width: 0,
    height: 0,
  }

  useVisibleScrollEffect(
    rootRef,
    throttle(
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

          if (isScroll) {
            if (current !== index) {
              sectionRef.current.style.transform = `translate3d(0px, -120%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`
            } else {
              sectionRef.current.style.transform = `translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`
            }
          } else if (sectionRef.current) {
            if (transitionYValue === -120) {
              sectionRef.current.style.transform = `translate3d(0px, ${transitionYValue}%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`
            } else {
              sectionRef.current.style.transform = `translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`
              if (ratio >= index + 1 || (ratio < 1 && index === 0)) {
                setCurrent(index)
              } else {
                sectionRef.current.style.transform = `translate3d(0px, -120%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`
              }
            }
          }
        }),
      500,
    ),
    [windowHeight, isScroll, current],
  )

  return (
    <motion.div
      className="w-full h-full relative flex items-center justify-center transition-all duration-500"
      ref={sectionRef}
      transition={{ ease: 'easeInOut', duration: 0.2 }}
      style={{
        zIndex: 10 - index,
        opacity: 1,
      }}
    >
      <SanityImg
        className="rounded-lg self-center"
        builder={imageUrlBuilder}
        image={item.image}
        height={550}
        alt={item.image?.alt}
      />
      <div className="absolute bottom-[-2rem] right-0 space-y-10 p-10 w-[600px] bifrost__transparent_card rounded-lg">
        <div className="flex-col space-y-10">
          <div className="text-head-2 font-[275]">{item.headline}</div>
          <div className="text-head-5 font-[300]">
            <PortableText
              blocks={item.body}
              serializers={{
                types: typesSerializer,
                marks: marksSerializer,
              }}
            />
          </div>
          <Button>
            <a href={item.ctaButton.href}>{item.ctaButton.title}</a>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
