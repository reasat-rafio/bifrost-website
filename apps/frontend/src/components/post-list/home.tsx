import { GradientTitle } from 'src/components/common/GradientTitle'
import { HomeSection } from 'lib/@types/blog-types'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { useVisibleScroll, useWindowSize } from 'lib/hooks'
import { WaveScene } from 'components/common/wave-scene'
import { BackgroundNoise } from 'components/ui/background-noise'
import { OnScrollBlurEffect } from 'components/ui/on-scroll-blur-effect'

interface IHomeSection extends HomeSection {
  setHeroSectionHeight: Dispatch<SetStateAction<number>>
}

const Home: React.FC<IHomeSection> = ({ headline, subHeadline, setHeroSectionHeight }) => {
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
      <OnScrollBlurEffect ratio={ratio} />
      <BackgroundNoise />

      <div className="z-10 relative container | md:h-[60vh] h-[70vh] | flex flex-col justify-center items-center">
        <GradientTitle className="mx-auto">{headline}</GradientTitle>
        <h1 className="xl:text-head-1 md:text-head-3 text-head-2-mobile leading-none font-primary text-center">
          {subHeadline}
        </h1>
      </div>

      <div
        className="z-10 absolute bottom-0 left-0 h-[30%] w-full"
        style={{ background: 'linear-gradient(180deg, rgba(1, 7, 17, 0) 0%, #010711 100%)' }}
      />
    </section>
  )
}

export default Home
