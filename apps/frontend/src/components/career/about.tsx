import Button from 'src/components/ui/Button'
import { Description } from 'src/components/ui/Description'
import { Header } from 'src/components/ui/Header'
import { CTAButton } from 'src/lib/@types/types'
import { SanityImage, SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'src/utils/sanity'

interface AboutProps {
  type: string
  image: SanityImage
  subtitle: string
  title: string
  cta?: CTAButton
}

export const About: React.FC<AboutProps> = ({ image, subtitle, title, cta }) => {
  return (
    <section className="container | py-10 ">
      <figure className="w-full overflow-hidden">
        <SanityImg
          className="w-full h-full max-h-[70vh] | object-cover rounded-2xl"
          builder={imageUrlBuilder}
          width={1000}
          image={image}
        />
      </figure>

      <section className="flex justify-end">
        <div className="max-w-lg | flex flex-col space-y-3 | p-5 | -translate-y-1/2 mr-[5%] | bifrost__transparent_card">
          <Header>{title}</Header>
          <Description>{subtitle}</Description>
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
