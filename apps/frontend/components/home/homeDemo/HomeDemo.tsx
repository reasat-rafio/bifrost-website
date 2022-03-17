import { Preview } from 'components/Preview'
import SlideUp from 'components/SlideUpText'
import { useMotionValue } from 'framer-motion'
import {
  animationFrameEffect,
  useIntersection,
  useVisibleScrollEffect,
  useWindowSize,
} from 'lib/hooks'
import { DemoSection } from 'lib/landingTypes'
import { ReactElement, useCallback, useEffect, useRef, useState } from 'react'
import { Carousel } from './Carousel'
import { ScrollDetective } from './ScrollDetective'

export default function HomeDemo({ headline, previews }: DemoSection): ReactElement {
  const totalLength = previews.length + 1

  const { width: windowWidth, height: windowHeight } = useWindowSize() ?? {
    width: 0,
    height: 0,
  }

  const previewRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  const [ratio, setRatio] = useState(0)
  const [previewSlide, setPreviewSlide] = useState(0)
  const [navbarHeight, setNavbarHeight] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const scrollYProgress = useMotionValue(ratio / totalLength)
  const sectionOnView = useIntersection(previewRef, { threshold: 0.2 })

  useEffect(() => {
    scrollYProgress.set(ratio / totalLength)
  }, [ratio])

  useEffect(() => {
    setNavbarHeight(document.querySelector('#navbar')?.clientHeight)
  }, [])

  useVisibleScrollEffect(
    previewRef,
    (offsetBoundingRect, _, y) =>
      animationFrameEffect(() => {
        const yDelta = y + windowHeight - offsetBoundingRect.top
        const ratio = Math.max(0, Math.min(yDelta / windowHeight, totalLength))
        setRatio(ratio)
      }),
    [windowHeight],
  )

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      const handleWidth = () => {
        setPreviewSlide(node.children[0].clientHeight)
        setContainerWidth(node.clientWidth)
      }
      handleWidth()
      window.addEventListener('resize', handleWidth)
    }
  }, [])

  return (
    <section ref={previewRef}>
      {windowWidth >= 1024 && (
        <ScrollDetective
          onView={sectionOnView?.isIntersecting}
          ratio={ratio}
          totalLength={totalLength}
          containerWidth={containerWidth}
        />
      )}

      <div className="flex justify-center items-center relative xl:my-32 lg:my-16 my-14 text-white">
        <div className="text-center md:text-head-1 text-[28px] leading-[28px] font-[275]">
          <SlideUp divRef={headingRef} text={headline} />
        </div>
      </div>
      <div
        data-element="background"
        className="relative lg:flex justify-center items-start container"
        style={{
          willChange: 'background',
          minHeight: `${windowWidth >= 1024 ? `${totalLength}00vh` : 'auto'} `,
        }}
      >
        {windowWidth >= 1024 ? (
          <div
            className="container w-full sticky top-1/2 h-screen overflow-hidden transform flex items-start justify-center "
            style={{
              top: `calc(50% - ${previewSlide / 2 - navbarHeight / 2 + 7}px)`,
            }}
            ref={measuredRef}
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
