import { WaveScene } from 'components/common/WaveScene'
import { useWindowSize } from 'lib/hooks'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'

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
      <WaveScene />

      <div className="container | min-h-[50vh] | flex flex-col justify-center items-center">
        <h1 className="lg:text-head-1 text-[54px] leading-snug lg:leading-[82px] font-[275] bifrost__gradient__green text-transparent bg-clip-text mb-4 text-center">
          {headline}
        </h1>
        <h2 className="lg:text-head-5 text-[17px] bg-clip-text opacity-70 text-center">
          {subHeadline}
        </h2>
      </div>

      <div
        className="z-10 absolute bottom-0 left-0 h-[30%] w-full"
        style={{ background: 'linear-gradient(180deg, rgba(1, 7, 17, 0) 0%, #010711 100%)' }}
      />
    </section>
  )
}
