import clsx from 'clsx'
import React, {
  ReactElement,
  useRef,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react'
import { motion } from 'framer-motion'
import { HomeSection } from 'src/lib/@types/landingTypes'
import { imageUrlBuilder, PortableText } from 'src/utils/sanity'
import { SanityImg } from 'sanity-react-extra'
import { useWindowSize } from 'src/lib/hooks'
import { scrollPassedFromTop } from 'src/lib/helpers'
import { BackgroundNoise } from 'components/ui/background-noise'
import { Button } from 'components/ui/button'
import { WaveScene } from 'components/common/wave-scene'

interface IHomeSection extends HomeSection {
  setHeroSectionHeight: Dispatch<SetStateAction<number>>
}

const movingBorderObjWidth = 9
const transition = { repeat: Infinity, duration: 4, velocity: 50, ease: 'easeInOut' }

export default function Hero({
  title,
  subtitle,
  ctaButton,
  image,
  setHeroSectionHeight,
}: IHomeSection): ReactElement {
  const { height: windowHeight, width: windowWidth } = useWindowSize() ?? { height: 0, width: 0 }
  const movingBorderDecorationBlockRef = useRef<null | HTMLDivElement>(null)

  const [sectionScrollPassed, setSectionSrollPassed] = useState(false)
  const [decorationBlockWidth, setDecorationBlockWidth] = useState(
    movingBorderDecorationBlockRef?.current?.clientWidth ?? 0,
  )

  const subtitleRef = useCallback(
    (node) => {
      if (node !== null) setDecorationBlockWidth(node.clientWidth)
    },
    [windowWidth],
  )

  const sectionRef = useCallback(
    (node) => {
      if (node !== null) setHeroSectionHeight(node.clientHeight)
    },
    [windowWidth],
  )

  // useEffect(() => {
  //   const checkscrollPosition = () => {
  //     const elHeight = document
  //       .querySelector('[data-type="home-hero"]')
  //       .getBoundingClientRect().height

  //     elHeight * 2 < scrollPassedFromTop()
  //       ? setSectionSrollPassed(true)
  //       : setSectionSrollPassed(false)
  //   }

  //   window.addEventListener('scroll', checkscrollPosition)
  //   return () => window.removeEventListener('scroll', checkscrollPosition)
  // }, [windowHeight, windowWidth])

  return (
    <section
      ref={sectionRef}
      className={clsx(
        'w-full | top-0 left-0 | overflow-y-clip bg-black fixed',
        // sectionScrollPassed ? ' absolute' : 'fixed',
      )}
    >
      <BackgroundNoise />
      <WaveScene />

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
