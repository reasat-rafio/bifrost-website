import { Preview } from 'src/components/Preview'
import SlideUp from 'src/components/SlideUpText'
import { useMotionValue } from 'framer-motion'
import {
  animationFrameEffect,
  useIntersection,
  useVisibleScrollEffect,
  useWindowSize,
} from 'src/lib/hooks'
import { DemoSection } from 'lib/@types/landing-types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Carousel } from './carousel'
import { ScrollDetective } from './scroll-detective'
import { motion } from 'framer-motion'

export const Demo: React.FC<DemoSection> = ({ title, previews }) => {
  const totalLength = previews.length + 1
  const { width: windowWidth, height: windowHeight } = useWindowSize() ?? {
    width: 0,
    height: 0,
  }
  const [imgRef, setImgRef] = useState<any>()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [ratio, setRatio] = useState(0)
  const [previewSlideHeight, setPreviewSlideHeight] = useState(0)
  // const [navbarHeight, setNavbarHeight] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const scrollYProgress = useMotionValue(ratio / totalLength)
  const sectionOnView = useIntersection(sectionRef, { threshold: 0.1 })

  useEffect(() => {
    scrollYProgress.set(ratio / totalLength)
  }, [ratio])

  // useEffect(() => {
  //   setNavbarHeight(document.querySelector('#navbar')?.clientHeight)
  // }, [])

  useVisibleScrollEffect(
    sectionRef,
    (offsetBoundingRect, _, y) =>
      animationFrameEffect(() => {
        const yDelta = y + windowHeight - offsetBoundingRect.top
        const ratio = Math.max(0, Math.min(yDelta / windowHeight, totalLength))
        setRatio(ratio)

        if (imgRef) {
          setContainerWidth(imgRef.clientWidth)
          setPreviewSlideHeight(imgRef.children[0].clientHeight)
        }
      }),
    [windowHeight, imgRef],
  )

  const scrollCarouselContainerRef = useCallback(
    (node) => {
      if (node !== null && node.children !== null) {
        setImgRef(node)
        setContainerWidth(node.clientWidth)
        setPreviewSlideHeight(node.children[0].clientHeight)
      }
    },
    [windowWidth],
  )

  return (
    <section className="pb-16" ref={sectionRef}>
      <ScrollDetective
        className="hidden lg:block"
        onView={sectionOnView?.isIntersecting}
        ratio={ratio}
        totalLength={totalLength}
        containerWidth={containerWidth}
      />

      <motion.h4
        initial={{ y: 200 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'tween', duration: 0.7, ease: 'easeInOut' }}
        className="w-full text-center 2xl:text-head-1 xl:text-head-2 lg:text-head-3 md:text-head-4 text-head-4-mobile | font-light | xl:my-32 lg:my-16 my-14  | leading-none"
      >
        {title}
      </motion.h4>
      <div
        data-element="background"
        className="relative lg:flex justify-center items-start container"
        style={{
          willChange: 'background',
          minHeight: `${windowWidth >= 1024 ? `${totalLength}00vh` : 'auto'} `,
        }}
      >
        {/* Desktop scroll carousel */}
        <div
          className="hidden lg:flex | container w-full sticky top-1/2 h-screen overflow-hidden transform items-start justify-center"
          // top: `calc(50% - ${previewSlideHeight / 2 - navbarHeight / 2 + 7}px)`,
          style={{
            top: `calc(50% - ${previewSlideHeight / 2}px)`,
          }}
          ref={scrollCarouselContainerRef}
        >
          {previews.map((previewItem, index) => (
            <Preview
              key={previewItem._key}
              item={previewItem}
              index={index}
              rootRef={sectionRef}
              length={previews.length + 1}
            />
          ))}
        </div>

        {/* Mobile regular carousel */}
        <Carousel data={previews} className="block lg:hidden" />
      </div>
    </section>
  )
}
