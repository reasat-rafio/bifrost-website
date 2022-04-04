import clsx from 'clsx'
import Button from 'components/ui/Button'
import {
  ReactElement,
  useRef,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react'
import { motion } from 'framer-motion'
import ThreeJSWaves from 'components/ThreeJSWaves'
import { HomeSection } from 'lib/@types/landingTypes'
import { imageUrlBuilder, PortableText } from 'utils/sanity'
import { SanityImg } from 'sanity-react-extra'
import { useWindowSize } from 'lib/hooks'
import { scrollPassedFromTop } from 'lib/helpers'
import { NoiseBackground } from 'components/ui/NoiseBackground'

interface IHomeSection extends HomeSection {
  setHeroSectionHeight: Dispatch<SetStateAction<number>>
}

const movingBorderObjWidth = 9
const transition = { repeat: Infinity, duration: 4, velocity: 50, ease: 'easeInOut' }

export default function HomeHero(data: IHomeSection): ReactElement {
  const windowWidth = useWindowSize()?.width ?? 0
  const windowHeight = useWindowSize()?.height ?? 0

  const movingBorderDecorationBlockRef = useRef<null | HTMLDivElement>(null)

  const [sectionScrollPassed, setSectionSrollPassed] = useState(false)
  const [decorationBlockWidth, setDecorationBlockWidth] = useState(
    movingBorderDecorationBlockRef?.current?.clientWidth ?? 0,
  )

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      const handleWidth = () => setDecorationBlockWidth(node.clientWidth)
      handleWidth()
      window.addEventListener('resize', handleWidth)
      window.addEventListener('load', handleWidth)
    }
  }, [])

  const sectionMeasuredRef = useCallback((node) => {
    if (node !== null) {
      const handleWidth = () => data.setHeroSectionHeight(node.clientHeight)
      handleWidth()
      window.addEventListener('resize', handleWidth)
      window.addEventListener('load', handleWidth)
    }
  }, [])

  useEffect(() => {
    const checkscrollPosition = () => {
      const elHeight = document
        .querySelector('[data-type="home-hero"]')
        .getBoundingClientRect().height

      elHeight * 2 < scrollPassedFromTop()
        ? setSectionSrollPassed(true)
        : setSectionSrollPassed(false)
    }

    window.addEventListener('scroll', checkscrollPosition)
    return () => window.removeEventListener('scroll', checkscrollPosition)
  }, [windowHeight, windowWidth])

  return (
    <div
      className={clsx(
        'top-0 left-0 w-full overflow-y-clip bg-black',
        sectionScrollPassed ? ' absolute' : 'fixed',
      )}
      data-type="home-hero"
      ref={sectionMeasuredRef}
    >
      <NoiseBackground />
      <div className="absolute left-0 bottom-0 w-full h-full flex items-end">
        <div className="relative translate-y-[25vh]">
          <ThreeJSWaves />
        </div>
      </div>
      <div className="container lg:pt-16 pt-24 relative w-screen overflow-y-clip min-h-screen flex lg:flex-row flex-col z-10">
        <div className="flex-1 flex flex-col justify-center space-y-10 ">
          <h1 className="font-[275] lg:text-head-1 text-[82px] leading-[82px]">
            <PortableText
              blocks={data.headline}
              serializers={{
                marks: {
                  pop: ({ children }: any) => (
                    <span className="text-transparent bg-clip-text bifrost__gradient__green">
                      {children}
                    </span>
                  ),
                },
              }}
            />
          </h1>
          <div className="flex">
            <div
              ref={measuredRef}
              className={clsx(
                'text-body-2 text-[20px] leading-[30px] relative overflow-hidden border-[#2D3746] border p-3 opacity-70 ',
              )}
            >
              <motion.div
                style={{ width: `${movingBorderObjWidth}px` }}
                className={`absolute top-0 left-0 h-[1px] bg-white `}
                animate={{
                  x: [0, decorationBlockWidth - movingBorderObjWidth, 0],
                }}
                transition={transition}
              />
              <motion.div
                style={{ width: `${movingBorderObjWidth}px` }}
                className={`absolute bottom-0 left-0 h-[1px] bg-white `}
                animate={{
                  x: [
                    decorationBlockWidth - movingBorderObjWidth,
                    0,
                    decorationBlockWidth - movingBorderObjWidth,
                  ],
                }}
                transition={transition}
              />
              {data.body}
            </div>
          </div>

          <div className="flex">
            <div>
              <Button>
                <a href={data.ctaButton.href}>{data.ctaButton.title}</a>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex lg:items-end">
          <SanityImg
            className="mx-auto"
            builder={imageUrlBuilder}
            width={
              windowWidth >= 1280 ? 500 : windowWidth >= 1024 ? 400 : windowWidth >= 720 ? 300 : 250
            }
            image={data.image}
          />
        </div>
      </div>

      <div
        className="z-10 pointer-events-none absolute bottom-0 left-0 h-[30vh] w-full"
        style={{ background: 'linear-gradient(180deg, rgba(1, 7, 17, 0) 0%, #010711 100%)' }}
      />
    </div>
  )
}
