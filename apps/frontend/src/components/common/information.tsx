import { Button } from 'components/ui/button'
import { CTAButton } from 'lib/@types/types'
import { useWindowSize } from 'lib/hooks'
import Link from 'next/link'
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
  const windowWidth = useWindowSize()?.width ?? 0

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
        <div className="max-w-lg | flex flex-col space-y-5 | p-5 | border-gray/10 border | -translate-y-1/2 mr-[5%] | background__blur rounded-primary">
          <h6 className="xl:text-head-4 md:text-head-md text-head-4-mobile | leading-none | font-primary">
            {title}
          </h6>
          <p className="md:text-body-1 text-body-1-mobile | font-light">{subtitle}</p>
          {!!cta && (
            <div className="flex">
              {/* <Button >
                <Link href={cta?.href ?? '/'}>
                  <a>{cta.title}</a>
                </Link>
              </Button> */}
              <Button type="href" href={cta?.href ?? ''}>
                {cta.title}
              </Button>
            </div>
          )}
        </div>
      </section>
    </section>
  )
}
