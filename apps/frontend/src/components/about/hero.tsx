import { GradientTitle } from 'src/components/common/GradientTitle'
import { BackgroundNoise } from 'components/ui/background-noise'
import { HomeProps } from 'lib/@types/about-us-types'
import { Dispatch, SetStateAction, useCallback } from 'react'
import { useWindowSize } from 'lib/hooks'
import { WaveScene } from 'components/common/wave-scene'
import { PortableText } from 'utils/sanity'
import { Button } from 'components/ui/button'

interface IHomeSection extends HomeProps {
  setHeroSectionHeight: Dispatch<SetStateAction<number>>
}

const Hero: React.FC<IHomeSection> = ({
  ctaButton,
  heading,
  subtitle,
  title,
  setHeroSectionHeight,
}) => {
  const { width: windowWidth } = useWindowSize() ?? { height: 0, width: 0 }
  const sectionRef = useCallback(
    (node) => {
      if (node !== null) setHeroSectionHeight(node.clientHeight)
    },
    [windowWidth],
  )
  return (
    <section className="fixed top-0 left-0 w-full overflow-y-clip bg-black" ref={sectionRef}>
      <BackgroundNoise />
      <WaveScene />

      <div className="relative z-10 | container min-h-screen | flex flex-col justify-center items-center | lg:py-[5%] py-[30%] | overflow-y-clip">
        <div className="max-w-2xl flex flex-col | text-center | lg:space-y-12 space-y-5 ">
          <GradientTitle className="mx-auto">{heading}</GradientTitle>
          <h1 className="lg:text-head-1 text-head-2-mobile leading-none font-primary text-center">
            <PortableText
              blocks={title}
              serializers={{
                marks: {
                  pop: ({ children }: any) => (
                    <span className="text-transparent bg-clip-text gradient__white__to__green">
                      {children}
                    </span>
                  ),
                },
              }}
            />
          </h1>
          <p className="lg:text-body-2 text-body-2-mobile font-light | text-center | opacity-70 ">
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
