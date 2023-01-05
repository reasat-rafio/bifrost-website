import { WaveScene } from 'components/common/wave-scene'
import { useWindowSize } from 'src/lib/hooks'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { BackgroundNoise } from 'components/ui/background-noise'

export interface HeroProps {
  type: string
  headline: string
  subHeadline?: string
  setHeroSectionHeight: Dispatch<SetStateAction<number>>
}

export const Hero: React.FC<HeroProps> = ({ headline, subHeadline, setHeroSectionHeight }) => {
  const windowWidth = useWindowSize()?.width ?? 0
  const sectionRef = useCallback(
    (node) => {
      if (node !== null) setHeroSectionHeight(node.clientHeight)
    },
    [windowWidth],
  )

  return (
    <section
      ref={sectionRef}
      className="z-0 fixed top-0 left-0 | w-screen | bg-black overflow-hidden"
    >
      <WaveScene className="md:translate-y-[55%] translate-y-[40%]" />
      <BackgroundNoise />

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
