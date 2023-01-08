import clsx from 'clsx'
import React, { useRef, useState, useCallback, Dispatch, SetStateAction, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HomeSection } from 'lib/@types/landing-types'
import { imageUrlBuilder, PortableText } from 'src/utils/sanity'
import { SanityImg } from 'sanity-react-extra'
import { useVisibleScroll, useWindowSize } from 'src/lib/hooks'
import { BackgroundNoise } from 'components/ui/background-noise'
import { Button } from 'components/ui/button'
import { WaveScene } from 'components/common/wave-scene'

interface IHomeSection extends HomeSection {
  setHeroSectionHeight: Dispatch<SetStateAction<number>>
}

const movingBorderObjWidth = 9
const transition = { repeat: Infinity, duration: 4, velocity: 50, ease: 'easeInOut' }

export const Hero: React.FC<IHomeSection> = ({
  title,
  subtitle,
  ctaButton,
  image,
  setHeroSectionHeight,
}) => {
  const { height: windowHeight, width: windowWidth } = useWindowSize() ?? { height: 0, width: 0 }
  const movingBorderDecorationBlockRef = useRef<null | HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [decorationBlockWidth, setDecorationBlockWidth] = useState(
    movingBorderDecorationBlockRef?.current?.clientWidth ?? 0,
  )
  const visibleScroll = useVisibleScroll(sectionRef)
  const ratio = visibleScroll
    ? Math.min(
        1,
        Math.max(0, (visibleScroll.y - visibleScroll.offsetBoundingRect.top) / windowHeight),
      )
    : 0

  const subtitleRef = useCallback(
    (node) => {
      if (node !== null) setDecorationBlockWidth(node.clientWidth)
    },
    [windowWidth],
  )
  useEffect(() => {
    if (sectionRef?.current) setHeroSectionHeight(sectionRef.current.clientHeight)
  }, [windowWidth, sectionRef])

  return (
    <section
      ref={sectionRef}
      className={clsx('w-full | top-0 left-0 | overflow-y-clip bg-black fixed')}
    >
      <BackgroundNoise />
      <WaveScene play={ratio < 0.7} />
      <motion.div
        animate={{
          opacity: ratio * 5,
          display: ratio ? 'block' : 'none',
        }}
        className="absolute top-0 left-0 bg-black/10 h-full w-full z-20 backdrop-blur-lg"
      />

      <section className="container z-10 | relative | w-screen h-screen | flex lg:flex-row flex-col | lg:pt-16 pt-24 | overflow-y-clip">
        <div className="flex-1 flex flex-col justify-center space-y-10 ">
          <h1 className="font-primary lg:text-head-1 sm:text-head-4 text-head-3 | leading-none">
            <PortableText
              blocks={title}
              serializers={{
                marks: {
                  pop: ({ children }: any) => (
                    <span className="text-transparent bg-clip-text gradient__white__to__green">
                      {children}
                    </span>
                  ),
                },
              }}
            />
          </h1>
          <h4
            ref={subtitleRef}
            className="relative w-fit | p-3 | sm:text-body-2 text-[20px] | border border-[#2D3746] | overflow-hidden opacity-70"
          >
            <MovingBorder decorationBlockWidth={decorationBlockWidth} />
            {subtitle}
          </h4>
          {!!ctaButton && (
            <Button type="href" href={ctaButton.href}>
              {ctaButton.title}
            </Button>
          )}
        </div>
        <figure className="flex lg:items-end">
          <SanityImg
            className="mx-auto sm:w-[50vh] drop-shadow"
            builder={imageUrlBuilder}
            width={windowWidth >= 1024 ? 600 : windowWidth >= 640 ? 350 : 250}
            image={image}
            alt={image.alt}
          />
        </figure>
      </section>

      <div
        className="z-10 pointer-events-none absolute bottom-0 left-0 h-[30vh] w-full"
        style={{ background: 'linear-gradient(180deg, rgba(1, 7, 17, 0) 0%, #010711 100%)' }}
      />
    </section>
  )
}

const MovingBorder: React.FC<{ decorationBlockWidth: number }> = ({ decorationBlockWidth }) => (
  <>
    <motion.span
      style={{ width: movingBorderObjWidth }}
      className="absolute top-0 left-0 h-[1px] bg-white"
      animate={{
        x: [0, decorationBlockWidth - movingBorderObjWidth, 0],
      }}
      transition={transition}
    />
    <motion.span
      style={{ width: movingBorderObjWidth }}
      className="absolute bottom-0 left-0 h-[1px] bg-white"
      animate={{
        x: [
          decorationBlockWidth - movingBorderObjWidth,
          0,
          decorationBlockWidth - movingBorderObjWidth,
        ],
      }}
      transition={transition}
    />
  </>
)
