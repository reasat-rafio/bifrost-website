// import { GradientTitle } from 'src/components/common/GradientTitle'
import { BackgroundNoise } from 'components/ui/background-noise'
import { HomeProps } from 'lib/@types/about-us-types'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { useVisibleScroll, useWindowSize } from 'lib/hooks'
import { WaveScene } from 'components/common/wave-scene'
import { PortableText } from 'utils/sanity'
import { Button } from 'components/ui/button'
import { OnScrollBackdropEffect } from 'components/ui/on-scroll-backdrop-effect'

interface IHomeSection extends HomeProps {
  setHeroSectionHeight: Dispatch<SetStateAction<number>>
}

const Hero: React.FC<IHomeSection> = ({ ctaButton, subtitle, title, setHeroSectionHeight }) => {
  const { width: windowWidth, height: windowHeight } = useWindowSize() ?? { height: 0, width: 0 }
  const sectionRef = useRef<HTMLElement>(null)

  const visibleScroll = useVisibleScroll(sectionRef)
  const ratio = visibleScroll
    ? Math.min(
        1,
        Math.max(0, (visibleScroll.y - visibleScroll.offsetBoundingRect.top) / windowHeight),
      )
    : 0

  useEffect(() => {
    if (sectionRef?.current) setHeroSectionHeight(sectionRef.current.clientHeight)
  }, [windowWidth, sectionRef])

  return (
    <section className="fixed top-0 left-0 w-full overflow-y-clip bg-black" ref={sectionRef}>
      <BackgroundNoise />
      <WaveScene play={ratio < 0.7} />
      <OnScrollBackdropEffect ratio={ratio} />

      <div className="relative z-10 | container min-h-screen | flex flex-col justify-center items-center | lg:py-[5%] py-[30%] | overflow-y-clip">
        <div className="flex flex-col | text-center | lg:space-y-12 space-y-5 ">
          {/* <GradientTitle className="mx-auto">{heading}</GradientTitle> */}
          <h1 className="lg:text-head-1 text-head-2-mobile leading-none font-primary text-center">
            <PortableText
              blocks={title}
              serializers={{
                marks: {
                  pop: ({ children }: any) => (
                    <span className="text-transparent bg-clip-text primary__gradient">
                      {children}
                    </span>
                  ),
                },
              }}
            />
          </h1>
          <p className="max-w-3xl | lg:text-body-2 text-body-2-mobile font-light | text-center | opacity-70 ">
            {subtitle}
          </p>
          {!!ctaButton && (
            <div>
              <Button type="href" href={ctaButton.href ?? '/'}>
                {ctaButton.title}
              </Button>
            </div>
          )}
        </div>
      </div>

      <div
        className="absolute pointer-events-none bottom-0 left-0 h-[30vh] w-full"
        style={{ background: 'linear-gradient(180deg, rgba(1, 7, 17, 0) 0%, #010711 100%)' }}
      />
    </section>
  )
}

export default Hero
