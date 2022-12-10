import Button from 'components/ui/Button'
import { Description } from 'components/ui/Description'
import { Header } from 'components/ui/Header'
import { CTAButton } from 'lib/@types/types'
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
  return (
    <section className="container | py-10 ">
      <figure className="w-full overflow-hidden">
        <SanityImg
          className="w-full h-full max-h-[560px] | object-cover rounded-2xl"
          builder={imageUrlBuilder}
          width={1000}
          image={image}
        />
      </figure>

      <section className="flex justify-end">
        <div className="max-w-lg | flex flex-col space-y-3 | p-5 | -translate-y-1/2 mr-[5%] | bifrost__transparent_card">
          <h6 className="xl:text-head-4">{title}</h6>
          {/* <Header>{title}</Header> */}
          {/* <Description>{subtitle}</Description> */}
          {!!cta && (
            <div className="flex">
              <Button>
                <a href={cta.href}>{cta.title}</a>
              </Button>
            </div>
          )}
        </div>
      </section>
    </section>
  )
}
