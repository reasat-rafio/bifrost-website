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
        'w-full h-full relative flex items-center transition-all duration-500 opacity-0',
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
      <div
        className={clsx(
          'rounded-lg object-contain',
          item.imagePosition !== 'center' && 'w-[60%] lg:h-[70%] h-[50%]',
          item.imagePosition === 'center' && 'w-full',
        )}
      >
        <SanityImg
          className="w-full h-full rounded-lg md:object-contain object-cover"
          builder={imageUrlBuilder}
          image={item.image}
          alt={item.image?.alt}
        />
      </div>
      <div
        className={clsx(
          'absolute flex w-full h-full',
          item.cardPosition === 'bottom-right' &&
            'justify-end items-end xl:translate-y-[-5%] lg:translate-y-[-10%] md:translate-y-[-20%] translate-y-[-30%] xl:translate-x-[-10%] translate-x-[-5%]',
          item.cardPosition === 'bottom-left' &&
            'justify-start items-end xl:translate-y-[-5%] lg:translate-y-[-10%] md:translate-y-[-20%] translate-y-[-30%] xl:translate-x-[10%] translate-x-[5%]',
          item.cardPosition === 'left' && 'justify-start items-center',
          item.cardPosition === 'right' && 'justify-end items-center',
        )}
      >
        <div
          className={clsx(
            'xl:space-y-10 lg:p-10 p-4 bifrost__transparent_card rounded-lg w-[70vw] md:max-w-md lg:max-w-xl xl:max-w-2xl',
          )}
        >
          <div className="flex-col md:space-y-10 space-y-3">
            <div className="xl:text-head-4 text-[22px] leading-[22px] font-[275]">
              {item.headline}
            </div>
            <div className="xl:text-body-1 text-[14px] leading-[16px] font-[300]">{item.body}</div>
            <div className="flex">
              <Button>
                <a href={item.ctaButton.href}>{item.ctaButton.title}</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
