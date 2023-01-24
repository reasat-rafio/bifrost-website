import clsx from 'clsx'
import React, { useRef, Dispatch, SetStateAction, useEffect } from 'react'
import { HomeSection } from 'lib/@types/landing-types'
import { imageUrlBuilder, PortableText } from 'utils/sanity'
import { SanityImg } from 'sanity-react-extra'
import { useVisibleScroll, useWindowSize } from 'src/lib/hooks'
import { BackgroundNoise } from 'components/ui/background-noise'
import { Button } from 'components/ui/button'
import { WaveScene } from 'components/common/wave-scene'
import { OnScrollBackdropEffect } from 'components/ui/on-scroll-backdrop-effect'

interface IHomeSection extends HomeSection {
  setHeroSectionHeight: Dispatch<SetStateAction<number>>
}

export const Hero: React.FC<IHomeSection> = ({
  title,
  subtitle,
  ctaButton,
  image,
  setHeroSectionHeight,
}) => {
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
      className={clsx('w-full | top-0 left-0 | overflow-y-clip bg-black fixed')}
    >
      <BackgroundNoise />
      <WaveScene play={ratio < 0.7} />
      <OnScrollBackdropEffect ratio={ratio} />

      <div className="container z-10 | relative | w-screen h-screen | flex lg:flex-row flex-col | lg:pt-16 pt-24 | overflow-y-clip">
        <section className="flex-1 flex flex-col justify-center sm:space-y-10 space-y-5">
          <h1 className="font-primary lg:text-head-1 md:text-head-2 sm:text-head-4 text-head-3 | leading-none">
            <PortableText
              blocks={title}
              serializers={{
                marks: {
                  pop: ({ children }: any) => (
                    <span className="text-transparent bg-clip-text primary__gradient">
                      {children}
                    </span>
                  ),
                },
              }}
            />
          </h1>
          <h4 className="max-w-2xl | p-3 | sm:text-body-2 text-[20px] | overflow-hidden opacity-70">
            {subtitle}
          </h4>
          {!!ctaButton && (
            <Button variant="secondary" type="href" href={ctaButton.href}>
              {ctaButton.title}
            </Button>
          )}
        </section>
        <figure className="flex lg:items-end">
          <SanityImg
            className="mx-auto sm:w-[50vh] drop-shadow"
            builder={imageUrlBuilder}
            width={windowWidth >= 1024 ? 600 : windowWidth >= 640 ? 350 : 250}
            image={image}
            alt={image.alt}
          />
        </figure>
      </div>

      <div
        className="z-10 pointer-events-none absolute bottom-0 left-0 h-[30vh] w-full"
        style={{ background: 'linear-gradient(180deg, rgba(1, 7, 17, 0) 0%, #010711 100%)' }}
      />
    </section>
  )
}
