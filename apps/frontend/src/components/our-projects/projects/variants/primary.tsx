import { Button } from 'components/ui/button'
import { ProjectProps } from '..'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'

export const Primary: React.FC<ProjectProps> = ({
  title,
  subtitle,
  ctaButton,
  description,
  image,
}) => {
  return (
    <article className="relative flex flex-col justify-end">
      <figure className="lg:absolute top-1/2 lg:-translate-y-1/2 left-0 | xl:w-[55%] lg:w-[70%] w-full | max-h-[450px] rounded-2xl | overflow-hidden">
        <SanityImg
          className="h-full w-full | object-cover"
          image={image}
          builder={imageUrlBuilder}
          width={1000}
          alt={image?.alt}
        />
      </figure>
      <section className="ml-auto | lg:translate-y-0 -translate-y-[5%] | px-2 lg:px-0">
        <div className="xl:max-w-2xl lg:max-w-xl w-full | flex flex-col xl:space-y-6 md:space-y-4 space-y-3 | xl:p-7 md:p-5 p-3 | border-gray/10 border | background__blur rounded-primary | transition-transform duration-300 ease-in-out">
          <h6 className="xl:text-head-4 md:text-head-md text-head-4-mobile | leading-none | font-primary">
            {title}
          </h6>
          {!!subtitle && (
            <h6 className="xl:text-[30px] md:text-[24px] text-[22px] font-light | leading-none">
              {subtitle}
            </h6>
          )}
          <p className="md:text-body-1 text-body-1-mobile | font-light">{description}</p>
          {!!ctaButton && (
            <div className="z-20 relative">
              <Button
                className="!w-fit md:px-10 md:py-2 px-8 py-2"
                variant="secondary"
                type="href"
                href={ctaButton?.href ?? ''}
              >
                {ctaButton.title}
              </Button>
            </div>
          )}
        </div>
      </section>
    </article>
  )
}
