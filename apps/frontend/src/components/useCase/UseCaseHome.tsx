import { GradientTitle } from 'src/components/common/GradientTitle'
import ThreeJSWaves from 'src/components/ThreeJSWaves'
import Button from 'components/ui/_Button'
import { BackgroundNoise } from 'components/ui/background-noise'
import { HomeSection } from 'lib/@types/use-case-types'
import { Dispatch, ReactElement, SetStateAction, useCallback, useEffect, useState } from 'react'
import { useWindowSize } from 'src/lib/hooks'
import clsx from 'clsx'
import { scrollPassedFromTop } from 'src/lib/helpers'
interface IHomeSection extends HomeSection {
  setHeroSectionHeight: Dispatch<SetStateAction<number>>
}

export default function UseCaseHome({
  body,
  ctaButton,
  headline,
  subHeadline,
  setHeroSectionHeight,
}: IHomeSection): ReactElement {
  const windowHeight = useWindowSize()?.height ?? 0
  const windowWidth = useWindowSize()?.width ?? 0

  const [sectionScrollPassed, setSectionSrollPassed] = useState(false)

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      const handleWidth = () => setHeroSectionHeight(node.clientHeight)
      handleWidth()
      window.addEventListener('resize', handleWidth)
      window.addEventListener('load', handleWidth)
    }
  }, [])

  useEffect(() => {
    const checkscrollPosition = () => {
      const elHeight = document
        .querySelector('[data-type="use-case-hero"]')
        .getBoundingClientRect().height

      elHeight * 2 < scrollPassedFromTop()
        ? setSectionSrollPassed(true)
        : setSectionSrollPassed(false)
    }

    window.addEventListener('scroll', checkscrollPosition)
    return () => window.removeEventListener('scroll', checkscrollPosition)
  }, [windowHeight, windowWidth])

  return (
    <div
      data-type="use-case-hero"
      className={clsx(
        'top-0 left-0 w-full overflow-y-clip bg-black',
        sectionScrollPassed ? ' absolute' : 'fixed',
      )}
      ref={measuredRef}
    >
      <BackgroundNoise />
      <div className="absolute z-0 left-0 bottom-0 w-full h-full flex items-end">
        <div className="relative translate-y-[25vh]">
          <ThreeJSWaves />
        </div>
      </div>
      <div className="container min-h-screen overflow-y-clip lg:py-[5%] py-[30%] flex flex-col justify-center items-center">
        <div className="text-center max-w-4xl flex flex-col lg:space-y-12 space-y-8 z-10">
          <GradientTitle className="mx-auto">{subHeadline}</GradientTitle>
          <h1 className="lg:text-head-1 text-[54px] leading-snug lg:leading-[82px] font-[275]">
            {headline}
          </h1>
          <p className="lg:text-body-2 text-body-2 font-[300] opacity-70">{body}</p>
          <div className="flex mx-auto">
            <Button>
              <a href={ctaButton.href}>{ctaButton.title}</a>
            </Button>
          </div>
        </div>
      </div>
      <div
        className="absolute pointer-events-none bottom-0 left-0 h-[30vh] w-full"
        style={{ background: 'linear-gradient(180deg, rgba(1, 7, 17, 0) 0%, #010711 100%)' }}
      ></div>
    </div>
  )
}
