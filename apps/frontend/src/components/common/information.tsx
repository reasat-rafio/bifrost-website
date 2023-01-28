import { Button } from 'components/ui/button'
import { CTAButton } from 'lib/@types/global-types'
import { useWindowSize } from 'lib/hooks'
import { SanityImage, SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'
import { useMemo, useRef } from 'react'
// import { useIntersection } from 'lib/hooks'
import { Title } from 'components/ui/title'
import { Heading } from 'components/ui/heading'
import { Description } from 'components/ui/description'
import { GradientBorder } from 'components/ui/gradient-border'
import { Section } from 'components/ui/section'

interface InformationProps {
  type: string
  heading?: string
  title: string
  description: string
  image: SanityImage
  cta?: CTAButton
}

export const Information: React.FC<InformationProps> = ({
  image,
  title,
  heading,
  cta,
  description,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0
  const sectionRef = useRef<HTMLElement>(null)
  // const intersecting = useIntersection(sectionRef, { threshold: 0.5 })?.isIntersecting
  const imageWidth = useMemo(
    () => (windowWidth >= 1280 ? 1200 : windowWidth > 768 ? 700 : 400),
    [windowWidth],
  )

  return (
    <GradientBorder innerClass="py-16" ref={sectionRef}>
      <Section
        borderBottom={false}
        padding={false}
        className="grid md:grid-cols-2 grid-cols-1 md:gap-y-0 gap-y-10"
      >
        <section className="spacing_primary my-auto md:w-[85%] w-full mr-auto ">
          <Title>{title}</Title>
          <Heading>{heading}</Heading>
          <Description>{description}</Description>
          {!!cta && (
            <div className="pt-6">
              <Button type="href" variant="outline" href={cta.href}>
                {cta.title}
              </Button>
            </div>
          )}
        </section>
        <figure className="rounded-[15px] overflow-hidden w-full">
          <SanityImg
            className="h-full w-full object-contain"
            image={image}
            alt={image.alt}
            builder={imageUrlBuilder}
            width={imageWidth}
          />
        </figure>
      </Section>
    </GradientBorder>
  )
}
