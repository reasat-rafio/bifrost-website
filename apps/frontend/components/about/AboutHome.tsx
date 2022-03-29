import { GradientTitle } from 'components/common/GradientTitle'
import ThreeJSWaves from 'components/ThreeJSWaves'
import Button from 'components/ui/Button'
import { NoiseBackground } from 'components/ui/NoiseBackground'
import { HomeSection } from 'lib/@types/aboutUsTypes'
import { Dispatch, ReactElement, SetStateAction, useCallback } from 'react'

interface IHomeSection extends HomeSection {
  setHeroSectionHeight: Dispatch<SetStateAction<number>>
}

export default function AboutHome({
  body,
  ctaButton,
  headline,
  subHeadline,
  setHeroSectionHeight,
}: IHomeSection): ReactElement {
  const measuredRef = useCallback((node) => {
    if (node !== null) {
      const handleWidth = () => setHeroSectionHeight(node.clientHeight)
      handleWidth()
      window.addEventListener('resize', handleWidth)
      window.addEventListener('load', handleWidth)
    }
  }, [])
  return (
    <div className="fixed top-0 left-0 w-full overflow-y-clip bg-black" ref={measuredRef}>
      <NoiseBackground />
      <div className="absolute z-0 left-0 bottom-0 w-full h-full flex items-end">
        <div className="relative translate-y-[25vh]">
          <ThreeJSWaves />
        </div>
      </div>

      <div className="container min-h-screen overflow-y-clip lg:py-[5%] py-[30%] flex flex-col justify-center items-center relative z-10">
        <div className="text-center max-w-2xl flex flex-col lg:space-y-12 space-y-5 ">
          <GradientTitle className="mx-auto">{subHeadline}</GradientTitle>
          <h1 className="lg:text-head-1 text-[54px] lg:leading-[82px] leading-tight font-[275]">
            {headline}
          </h1>
          <p className="lg:text-body-2 text-body-2 font-[300] opacity-70">{body}</p>
          <div className="flex mx-auto hover:cursor-pointer">
            <Button className="">
              <a href={ctaButton.href}>{ctaButton.title}</a>
            </Button>
          </div>
        </div>
      </div>
      <div
        className="absolute pointer-events-none bottom-0 left-0 h-[30vh] w-full"
        style={{ background: 'linear-gradient(180deg, rgba(1, 7, 17, 0) 0%, #010711 100%)' }}
      />
    </div>
  )
}
