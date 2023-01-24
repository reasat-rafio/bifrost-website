import { Description } from 'components/ui/description'
import { Heading } from 'components/ui/heading'
import { Title } from 'components/ui/title'
import { AboutCollection } from 'lib/@types/landing-types'
import { useWindowSize } from 'lib/hooks'
import { SanityImage, SanityImg } from 'sanity-react-extra'
import { PortableText, imageUrlBuilder } from 'utils/sanity'

interface AboutUsProps {
  type: string
  collection: AboutCollection[]
}

export const AboutUs: React.FC<AboutUsProps> = ({ collection }) => {
  const windowWidth = useWindowSize()?.width ?? 0
  const LgScreen = windowWidth >= 1024

  return (
    <section className="relative z-10 | container mx-auto lg:py-32 py-20">
      <div className="space-y-20">
        {collection.map(({ _key, description, heading, image, title }, index) => (
          <article key={_key} className="grid lg:grid-cols-2 col-span-1 | lg:gap-20 gap-10">
            {LgScreen ? (
              <>
                {index % 2 === 0 ? (
                  <>
                    <DescriptionBlock description={description} heading={heading} title={title} />
                    <ImageBlock image={image} />
                  </>
                ) : (
                  <>
                    <ImageBlock image={image} />
                    <DescriptionBlock description={description} heading={heading} title={title} />
                  </>
                )}
              </>
            ) : (
              <>
                <ImageBlock image={image} />
                <DescriptionBlock description={description} heading={heading} title={title} />
              </>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

interface IDescriptionBlock {
  title?: string
  heading: string
  description: any
}
const DescriptionBlock: React.FC<IDescriptionBlock> = ({ title, description, heading }) => {
  return (
    <section className="space-y-8 | font-light">
      {!!title && <Title>{title}</Title>}
      <Heading>{heading}</Heading>
      <Description>
        <PortableText blocks={description} />
      </Description>
    </section>
  )
}

interface IImageBlock {
  image: SanityImage
}
const ImageBlock: React.FC<IImageBlock> = ({ image }) => {
  return (
    <figure>
      <SanityImg width={600} image={image} builder={imageUrlBuilder} alt={image.alt} />
    </figure>
  )
}
