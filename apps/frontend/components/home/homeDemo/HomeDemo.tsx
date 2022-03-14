import { Preview } from 'components/Preview'
import SlideUp from 'components/SlideUpText'
import { useSpring, useTransform, useMotionValue } from 'framer-motion'
import {
  animationFrameEffect,
  useIntersection,
  useVisibleScrollEffect,
  useWindowSize,
} from 'lib/hooks'
import { DemoSection } from 'lib/landingTypes'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { Carousel } from './Carousel'
import { ViewportScroll } from './ViewportScroll'

export default function HomeDemo({ headline, previews }: DemoSection): ReactElement {
  const totalLength = previews.length + 1

  const { width: windowWidth, height: windowHeight } = useWindowSize() ?? {
    width: 0,
    height: 0,
  }

  const previewRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const stickySectionRef = useRef<HTMLDivElement>(null)

  const [isComplete, setIsComplete] = useState(false)
  const [ratio, setRatio] = useState(0)

  useVisibleScrollEffect(
    previewRef,
    (offsetBoundingRect, _, y) =>
      animationFrameEffect(() => {
        const yDelta = y + windowHeight - offsetBoundingRect.top
        const ratio = Math.max(0, Math.min(yDelta / windowHeight, totalLength))
        setRatio(ratio)
        ratio === totalLength ? setIsComplete(true) : setIsComplete(false)
      }),
    [windowHeight],
  )

  const scrollYProgress = useMotionValue(ratio / totalLength)
  const yRange = useTransform(scrollYProgress, [0, 0.9], [0, 1])
  const pathLength = useSpring(yRange, { stiffness: 400, damping: 90 })

  useEffect(() => {
    scrollYProgress.set(ratio / totalLength)
  }, [ratio])

  const sectionOnView = useIntersection(previewRef, { threshold: 0.2 })

  return (
    <section ref={previewRef}>
      {windowWidth >= 1024 && (
        <ViewportScroll
          pathLength={pathLength}
          isComplete={isComplete}
          onView={sectionOnView?.isIntersecting}
          ratio={ratio}
          totalLength={totalLength}
        />
      )}

      <div className="flex justify-center items-center relative xl:my-32 lg:my-16 my-14 text-white">
        <div className="text-center md:text-head-1 text-[28px] leading-[28px] font-[275]">
          <SlideUp divRef={headingRef} text={headline} />
        </div>
      </div>
      <div
        data-element="background"
        className="relative lg:flex py-section justify-center items-start container"
        style={{
          willChange: 'background',
          minHeight: `${windowWidth >= 1024 ? `${totalLength}00vh` : 'auto'} `,
        }}
      >
        {windowWidth >= 1024 ? (
          <div
            className="container w-full sticky top-[20%] h-screen overflow-hidden transform flex items-start justify-center"
            ref={stickySectionRef}
          >
            {previews.map((previewItem, index) => (
              <Preview
                item={previewItem}
                index={index}
                key={previewItem.assetId}
                rootRef={previewRef}
                length={previews.length + 1}
              />
            ))}
          </div>
        ) : (
          <Carousel data={previews} />
        )}
      </div>
    </section>
  )
}
