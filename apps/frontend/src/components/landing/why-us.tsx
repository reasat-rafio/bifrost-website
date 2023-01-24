import { Button } from 'components/ui/button'
import { Description } from 'components/ui/description'
import { Heading } from 'components/ui/heading'
import { Title } from 'components/ui/title'
import { CTAButton } from 'lib/@types/global-types'
import { Collection } from 'lib/@types/landing-types'
// import { useWindowSize } from 'lib/hooks'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'

interface WhyUsProps {
  type: string
  collection: Collection[]
  ctaButton: CTAButton
  description: string
  subtitle: string
  title: string
}

export const WhyUs: React.FC<WhyUsProps> = ({
  title,
  subtitle,
  description,
  collection,
  ctaButton,
}) => {
  // const windowWidth = useWindowSize()?.width ?? 0

  return (
    <section className="relative z-10 | container mx-auto lg:py-32 py-20 | border-b border-secondary/80">
      <div className="space-y-8 | font-light">
        <Title>{title}</Title>
        <Heading>{subtitle}</Heading>
        <Description>{description}</Description>
      </div>
      <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 | md:gap-20 sm:gap-14 gap-10 md:py-28 py-16">
        {collection.map(({ _key, description, image, title }) => (
          <article key={_key} className="space-y-5">
            <figure className="aspect-square max-h-7">
              <SanityImg
                className="h-full w-full object-contain"
                width={50}
                builder={imageUrlBuilder}
                image={image}
                alt={image.alt}
              />
            </figure>
            <h6 className="lg:text-[22px] text-xl font-bold">{title}</h6>
            <p className="lg:text-[19px] text-base opacity-80">{description}</p>
          </article>
        ))}
      </div>
      <div className="w-full h-full flex justify-center items-center">
        {!!ctaButton && (
          <Button color="green" variant="secondary" type="href" href={ctaButton?.href ?? ''}>
            {ctaButton.title}
          </Button>
        )}
      </div>
    </section>
  )
}
