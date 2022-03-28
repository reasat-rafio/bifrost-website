import clsx from 'clsx'
import Button from 'components/ui/Button'
import { showHero } from 'lib/showHero'
import { HeroData } from 'lib/@types/types'
import { ReactElement, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import ThreeJSWaves from 'components/ThreeJSWaves'
import { HomeSection } from 'lib/@types/landingTypes'
import { PortableText } from 'utils/sanity'

const movingBorderObjWidth = 9
const transition = { repeat: Infinity, duration: 4, velocity: 50, ease: 'easeInOut' }

export default function HomeHero(data: HomeSection): ReactElement {
  const heroData: HeroData = { type: 'image', image: data.image }

  const movingBorderDecorationBlockRef = useRef<null | HTMLDivElement>(null)

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

  return (
    <div className="relative overflow-y-clip">
      <div className="absolute left-0 bottom-0 w-full h-full flex items-end">
        <div className="relative translate-y-[25vh]">
          <ThreeJSWaves />
        </div>
      </div>
      <div className="container lg:pt-16 pt-24 relative w-screen overflow-y-clip min-h-screen grid grid-cols-12 z-10 ">
        <div className="lg:col-span-7 xl:col-span-8 col-span-12 flex flex-col items-start space-y-10 self-center">
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
          <div
            ref={measuredRef}
            className={clsx(
              'text-body-2 text-[20px] leading-[30px] relative overflow-hidden border-[#2D3746] border p-3 opacity-70',
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
          <div>
            <Button>
              <a href={data.ctaButton.href}>{data.ctaButton.title}</a>
            </Button>
          </div>
        </div>
        <div className="lg:col-span-5 xl:col-span-4 col-span-12 z-10 mt-[10%] hidden lg:block">
          {showHero(heroData)}
        </div>
        <div className="col-span-12 lg:hidden">
          <div className="sm:w-[30%] w-[50%] bottom-0 right-0 block ml-auto scale-[1.25] origin-bottom">
            <div className="h-full">{showHero(heroData, 'object-cover ')}</div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 h-[30vh] w-full"
        style={{ background: 'linear-gradient(180deg, rgba(1, 7, 17, 0) 0%, #010711 100%)' }}
      ></div>
    </div>
  )
}
