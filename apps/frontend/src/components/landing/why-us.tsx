import { Button } from 'components/ui/button'
import { CTAButton } from 'lib/@types/global-types'
import { Collection } from 'lib/@types/landing-types'
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
  return (
    <section className="relative z-10 | container mx-auto py-20">
      <div className="space-y-3 | font-light">
        <h3 className="capitalize text-teal text-[24px]">{title}</h3>
        <h5 className="text-[48px]">{subtitle}</h5>
        <p className="text-[24px]">{description}</p>
      </div>
      <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 | md:gap-20 sm:gap-14 gap-10 py-16">
        {collection.map(({ _key, description, image, title }) => (
          <article key={_key} className="space-y-5">
            <figure>
              <SanityImg builder={imageUrlBuilder} image={image} alt={image.alt} />
            </figure>
            <h6 className="text-[22px] font-bold">{title}</h6>
            <p className="text-[19px] opacity-80">{description}</p>
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
