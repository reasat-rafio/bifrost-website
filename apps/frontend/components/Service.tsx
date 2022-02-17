import clsx from 'clsx'
import { motion } from 'framer-motion'
import { marksSerializer, typesSerializer } from 'lib/blockContent'
import { animationFrameEffect, useVisibleScrollEffect } from 'lib/hooks'
import { Service as ServiceInterface } from 'lib/types'
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

  // const [transition, setTransition] = useState(0)
  const { height: windowHeight } = useWindowSize() ?? {
    width: 0,
    height: 0,
  }

  const toggleVisibility = function (visible: boolean) {
    if (visible) {
      sectionRef.current.style.transform = `translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`
      sectionRef.current.style.opacity = '1'
    } else {
      sectionRef.current.style.transform = `translate3d(0px, -120%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)`
      sectionRef.current.style.opacity = '0'
    }
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

        if (isScroll) {
          if (current !== index) {
            toggleVisibility(false)
          } else {
            toggleVisibility(true)
          }
        } else if (sectionRef.current) {
          if (transitionYValue === -120) {
            toggleVisibility(false)
          } else {
            toggleVisibility(true)
            if (ratio >= index + 1 || (ratio < 1 && index === 0)) {
              setCurrent(index)
            } else {
              toggleVisibility(false)
            }
          }
        }
      }),
    [windowHeight, isScroll, current],
  )

  return (
    <motion.div
      className={clsx(
        'w-full h-full relative flex transition-all duration-500 opacity-0',
        item.imagePosition === 'center' && 'justify-center',
        item.imagePosition === 'right' && 'justify-end',
        item.imagePosition === 'left' && 'justify-start',
      )}
      ref={sectionRef}
      style={{
        zIndex: 10 - index,
        opacity: 1,
      }}
    >
      <SanityImg
        className={clsx('rounded-lg object-contain')}
        builder={imageUrlBuilder}
        image={item.image}
        height={550}
        alt={item.image?.alt}
      />
      <div
        className={clsx(
          'absolute space-y-10 p-10 w-[600px] bifrost__transparent_card rounded-lg',
          item.cardPosition === 'bottom-right' && 'bottom-[-10rem] right-[5rem]',
          item.cardPosition === 'left' && 'top-[15%] left-[5rem]',
          item.cardPosition === 'right' && 'top-[15%] right-[5rem]',
          item.cardPosition === 'bottom-left' && 'bottom-[-10rem] left-[5rem]',
        )}
      >
        <div className="flex-col space-y-10">
          <div className="text-[55px] leading-[55px] font-[275]">{item.headline}</div>
          <div className="text-[18px] leading-[32px] font-[300]">
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
