import clsx from 'clsx'
import Button from 'components/ui/Button'
import { showHero } from 'lib/showHero'
import { HeroData } from 'lib/types'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import ThreeJSWaves from 'components/ThreeJSWaves'
import { HomeSection } from 'lib/landingTypes'

const movingBorderObjWidth = 9
const transition = { repeat: Infinity, duration: 4, velocity: 50, ease: 'easeInOut' }

export default function HomeHero(data: HomeSection): ReactElement {
  const heroData: HeroData = { type: 'image', image: data.image }

  const movingBorderDecorationBlockRef = useRef<null | HTMLDivElement>(null)

  const [decorationBlockWidth, setDecorationBlockWidth] = useState(0)

  useEffect(() => {
    setDecorationBlockWidth(movingBorderDecorationBlockRef?.current?.clientWidth ?? 0)
    window.addEventListener('resize', () => {
      setDecorationBlockWidth(movingBorderDecorationBlockRef?.current?.clientWidth ?? 0)
    })
  }, [])

  return (
    <div className="relative overflow-y-clip">
      <div className="absolute z-0 left-0 bottom-0 w-full h-full flex items-end">
        <div className="relative translate-y-[25vh]">
          <ThreeJSWaves />
        </div>
      </div>
      <div
        className={clsx(
          'container items-end lg:pt-16 pt-24 grid grid-cols-12 md:flex-row z-10 md:space-y-0 relative w-[100vw] min-h-[100vh] overflow-y-clip',
          'text-white',
        )}
      >
        <div className="lg:col-span-6 xl:col-span-6 col-span-12 flex flex-col items-start space-y-5 md:flex-1 lg:space-y-10 self-center">
          <div>
            <h1 className="lg:text-head-1 text-[82px] leading-[82px] font-[275]">
              {data.headline}
            </h1>
            <h2 className="lg:text-head-1 text-[82px] leading-[82px] text-transparent font-[275] bg-clip-text bifrost__gradient_green">
              {data.subHeadline}
            </h2>
          </div>
          <div
            ref={movingBorderDecorationBlockRef}
            className={clsx(
              'text-body-2 text-[20px] leading-[30px] relative overflow-hidden border-[#2D3746] border p-3 opacity-70',
            )}
          >
            <motion.div
              className={`absolute top-0 w-[9px] left-0 h-[1px] bg-white w-[${movingBorderObjWidth}px]`}
              animate={{
                x: [0, decorationBlockWidth - movingBorderObjWidth, 0],
              }}
              transition={transition}
            />
            <motion.div
              className={`absolute bottom-0 left-0 h-[1px] bg-white w-[${movingBorderObjWidth}px]`}
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
          <Button color="secondary">
            <a href={data.ctaButton.href}>{data.ctaButton.title}</a>
          </Button>
        </div>
        <div className="lg:col-span-6 xl:col-span-6 col-span-12 z-10">{showHero(heroData)}</div>
      </div>
      <div
        className="z-10 absolute bottom-0 left-0 h-[30vh] w-full"
        style={{ background: 'linear-gradient(180deg, rgba(1, 7, 17, 0) 0%, #010711 100%)' }}
      ></div>
    </div>
  )
}
