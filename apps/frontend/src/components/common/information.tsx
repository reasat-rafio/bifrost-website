import { Button } from 'components/ui/button'
import { CTAButton } from 'lib/@types/types'
// import { useWindowSize } from 'lib/hooks'
import { SanityImage, SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'

interface InformationProps {
  type: string
  image: SanityImage
  subtitle: string
  title: string
  cta?: CTAButton
}

export const Information: React.FC<InformationProps> = ({ image, subtitle, title, cta }) => {
  // const windowWidth = useWindowSize()?.width ?? 0

  return (
    <section className="container | pt-10 ">
      <figure className="w-full overflow-hidden">
        <SanityImg
          className="w-full h-full max-h-[560px] | object-cover rounded-2xl"
          builder={imageUrlBuilder}
          width={1000}
          image={image}
          alt={image?.alt}
        />
      </figure>

      <section className="flex justify-end">
        <div className="max-w-lg | flex flex-col xl:space-y-6 md:space-y-4 space-y-3 | xl:p-7 md:p-5 p-3 | border-gray/10 border | lg:-translate-y-1/2 sm:-translate-y-[30%] -translate-y-[20%]  | lg:mr-[5%] lg:ml-0 mr-[2.5%] ml-[2.5%] | background__blur rounded-primary | transition-transform duration-300 ease-in-out">
          <h6 className="xl:text-head-4 md:text-head-md text-head-4-mobile | leading-none | font-primary">
            {title}
          </h6>
          <p className="md:text-body-1 text-body-1-mobile | font-light">{subtitle}</p>
          {!!cta && (
            <Button
              className="!w-fit md:px-10 md:py-2 px-8 py-2"
              variant="secondary"
              type="href"
              href={cta?.href ?? ''}
            >
              {cta.title}
            </Button>
          )}
        </div>
      </section>
    </section>
  )
}
