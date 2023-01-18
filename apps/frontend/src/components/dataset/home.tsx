import { WaveScene } from 'components/common/wave-scene'
import { useVisibleScroll, useWindowSize } from 'src/lib/hooks'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { BackgroundNoise } from 'components/ui/background-noise'
import { OnScrollBackdropEffect } from 'components/ui/on-scroll-backdrop-effect'

export interface HeroProps {
  type: string
  headline: string
  subHeadline?: string
  setHeroSectionHeight: Dispatch<SetStateAction<number>>
}

export const Hero: React.FC<HeroProps> = ({ headline, subHeadline, setHeroSectionHeight }) => {
  const { height: windowHeight, width: windowWidth } = useWindowSize() ?? { height: 0, width: 0 }
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
    <section
      ref={sectionRef}
      className="z-0 fixed top-0 left-0 | w-screen | bg-black overflow-hidden"
    >
      <WaveScene play={ratio < 0.7} className="md:translate-y-[55%] translate-y-[40%]" />
      <BackgroundNoise />
      <OnScrollBackdropEffect ratio={ratio} />

      <div className="container relative | xl:h-[60vh] md:h-[60vh] h-[70vh] | flex flex-col justify-center items-start">
        <h1 className="w-full | md:text-head-4 text-head-5 font-primary | mb-3 | text-transparent bg-clip-text text-left | leading-none | gradient__white__to__green">
          {headline}
        </h1>
        {!!subHeadline && (
          <p className="w-full | md:text-body-2 text-body-2-mobile text-left | bg-clip-text opacity-70 font-light">
            {subHeadline}
          </p>
        )}
      </div>

      <div
        className="z-10 absolute bottom-0 left-0 h-[30%] w-full"
        style={{ background: 'linear-gradient(180deg, rgba(1, 7, 17, 0) 0%, #010711 100%)' }}
      />
    </section>
  )
}
