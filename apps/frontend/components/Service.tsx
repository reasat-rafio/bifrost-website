import { motion } from 'framer-motion'
import { marksSerializer, typesSerializer } from 'lib/blockContent'
import { animationFrameEffect, useVisibleScrollEffect } from 'lib/hooks'
import { Service as ServiceInterface } from 'lib/types'
import throttle from 'lodash.throttle'
import { Dispatch, ReactElement, RefObject, SetStateAction, useEffect, useRef } from 'react'
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
}

export default function Service({
  item,
  index,
  rootRef,
  length,
  setCurrent,
}: ServiceProps): ReactElement {
  const sectionRef = useRef<HTMLDivElement>(null)
  // const { height: windowHeight } = useWindowSize() ?? {
  //   width: 0,
  //   height: 0,
  // }
  useEffect(() => {
    window.addEventListener('wheel', throttle(scrolled, 1000))
    return () => window.removeEventListener('wheel', throttle(scrolled, 1000))
  }, [])

  function getDelta(event) {
    if (event.wheelDelta) {
      return event.wheelDelta
    } else {
      return -event.detail
    }
  }

  function scrolled(event) {
    console.log({ event })
    const delta = getDelta(event)
    if (delta < 0) {
      if (length - 2 !== index) {
        setCurrent(index + 1)
      }
    } else {
      if (index !== 0) setCurrent(index - 1)
    }
  }

  return (
    <motion.div
      className="w-full h-full "
      style={{
        zIndex: 10 - index,
      }}
      ref={sectionRef}
    >
      <div className="md:flex-1 lg:-mr-1/16 2xl:-mr-1/8 w-full self-end">
        <SanityImg
          className="w-full object-contain rounded-lg"
          builder={imageUrlBuilder}
          image={item.image}
          height={600}
          alt={item.image?.alt}
        />
      </div>
      <div
        className="space-y-10 bifrost__transparent_card p-10 w-[600px]"
        style={{
          zIndex: 11 - index,
        }}
      >
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
