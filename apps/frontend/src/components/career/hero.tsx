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
      <WaveScene className="xl:translate-y-[55%] md:translate-y-[45%] translate-y-[20%]" />

      <div className="container | xl:h-[60vh] md:h-[60vh] h-screen | flex flex-col justify-center items-center">
        <h1 className="xl:text-head-1 md:text-head-3 text-head-mobile font-[275] | mb-3 | text-transparent bg-clip-text text-center | leading-none | gradient__white__to__green">
          {headline}
        </h1>
        <p className="md:text-body-2 text-body-mobile bg-clip-text opacity-70 text-center">
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
