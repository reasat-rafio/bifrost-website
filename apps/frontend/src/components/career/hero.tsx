import { WaveScene } from 'src/components/common/WaveScene'
import { useWindowSize } from 'src/lib/hooks'
import { Dispatch, SetStateAction, useCallback } from 'react'

export interface HeroProps {
  type: string
  headline: string
  subHeadline: string
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

      <div className="container | xl:h-[60vh] md:h-[60vh] h-[70vh] | flex flex-col justify-center items-center">
        <h1 className="w-full | xl:text-head-1 md:text-head-3 text-head-1-mobile font-primary | mb-3 | text-transparent bg-clip-text md:text-center text-left | leading-none | gradient__white__to__green">
          {headline}
        </h1>
        <p className="w-full | md:text-body-2 text-body-2-mobile md:text-center text-left | bg-clip-text opacity-70 font-light">
          {subHeadline}
        </p>
      </div>

      <div
        className="z-10 absolute bottom-0 left-0 h-[30%] w-full"
        style={{ background: 'linear-gradient(180deg, rgba(1, 7, 17, 0) 0%, #010711 100%)' }}
      />
    </section>
  )
}
