import clsx from 'clsx'
import Button from 'components/ui/Button'
import { marksSerializer, typesSerializer } from 'lib/blockContent'
import { showHero } from 'lib/showHero'
import { HeroData, HomeSection } from 'lib/types'
import { ReactElement } from 'react'
import { PortableText } from 'utils/sanity'
import { motion } from 'framer-motion'
import ThreeJSWaves from 'components/ThreeJSWaves'

export default function HomeHero(data: HomeSection): ReactElement {
  const heroData: HeroData = { type: 'image', image: data.image }

  console.log({ heroData })

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
            className={clsx(
              'text-body-2 text-[20px] leading-[30px] relative overflow-hidden border-[#2D3746] border p-3 opacity-70',
            )}
          >
            <motion.div
              className="absolute top-0 w-[9px] left-0 h-[1px] bg-white"
              animate={{
                x: [0, 300, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                velocity: 50,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-[9px] h-[1px] bg-white"
              animate={{
                x: [300, 0, 300],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                velocity: 50,
                ease: 'easeInOut',
              }}
            />
            <PortableText
              blocks={data.body}
              serializers={{
                types: typesSerializer,
                marks: marksSerializer,
              }}
            />
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
