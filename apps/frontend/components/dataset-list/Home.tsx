import ThreeJSWaves from 'components/ThreeJSWaves'
import { HomeSection } from 'lib/@types/blogTypes'
import { Dispatch, ReactElement, SetStateAction, useCallback } from 'react'

interface IHomeSection extends HomeSection {
  setHeroSectionHeight: Dispatch<SetStateAction<number>>
}

export default function Home({
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
    <section className="fixed top-0 left-0 overflow-y-clip w-full" ref={measuredRef}>
      <div className="absolute left-0 bottom-0 w-full h-full flex items-end">
        <div className="relative translate-y-[25vh]">
          <ThreeJSWaves />
        </div>
      </div>
      <div className="container min-h-[75vh] overflow-y-clip lg:py-[5%] py-[30%] flex flex-col justify-center items-start">
        <h1 className="lg:text-head-1 text-[54px] leading-snug lg:leading-[82px] font-[275] bifrost__gradient__green text-transparent bg-clip-text mb-10">
          {headline}
        </h1>
        <h2 className="text-head-5 bg-clip-text uppercase opacity-70">{subHeadline}</h2>
      </div>
      <div
        className="z-10 absolute bottom-0 left-0 h-[30%] w-full"
        style={{ background: 'linear-gradient(180deg, rgba(1, 7, 17, 0) 0%, #010711 100%)' }}
      ></div>
    </section>
  )
}
