import { Description } from 'components/ui/description'
import { Heading } from 'components/ui/heading'
import { Section } from 'components/ui/section'
import { Title } from 'components/ui/title'
import { AboutCollection } from 'lib/@types/landing-types'
import { useIntersection, useWindowSize } from 'lib/hooks'
import { useRef } from 'react'
import { SanityImage, SanityImg } from 'sanity-react-extra'
import { PortableText, imageUrlBuilder } from 'utils/sanity'
import { motion } from 'framer-motion'
import { VFadeInOut } from 'animations/fade-in-out'

interface AboutUsProps {
  type: string
  collection: AboutCollection[]
}

export const AboutUs: React.FC<AboutUsProps> = ({ collection }) => {
  const windowWidth = useWindowSize()?.width ?? 0
  const LgScreen = windowWidth >= 1024

  return (
    <Section borderBottom={false}>
      <div className="sm:space-y-20 space-y-14">
        {collection.map(({ _key, description, heading, image, title }, index) => (
          <article key={_key} className="grid lg:grid-cols-2 col-span-1 | lg:gap-20 gap-10">
            {LgScreen ? (
              <>
                {index % 2 === 0 ? (
                  <>
                    <DescriptionBlock description={description} heading={heading} title={title} />
                    <ImageBlock index={index} image={image} />
                  </>
                ) : (
                  <>
                    <ImageBlock index={index} image={image} />
                    <DescriptionBlock description={description} heading={heading} title={title} />
                  </>
                )}
              </>
            ) : (
              <>
                <ImageBlock index={index} image={image} />
                <DescriptionBlock description={description} heading={heading} title={title} />
              </>
            )}
          </article>
        ))}
      </div>
    </Section>
  )
}

interface IDescriptionBlock {
  title?: string
  heading: string
  description: any
}
const DescriptionBlock: React.FC<IDescriptionBlock> = ({ title, description, heading }) => {
  return (
    <section className="spacing_primary | font-light">
      {!!title && <Title>{title}</Title>}
      <Heading>{heading}</Heading>
      <Description className="prose max-w-none prose-ul:p-0 prose-ul:m-0">
        <PortableText
          blocks={description}
          serializers={{
            listItem: ({ children }: any) => {
              return (
                <span className="flex items-center space-x-3 mb-5">
                  <span
                    style={{ transform: `matrix(0.69, 0.72, -0.69, 0.72, 0, 0)` }}
                    className="sm:w-[15.18px] sm:h-[15.18px] h-3 w-3 bg-[#B794FF] rounded-[4px]"
                  />
                  <span>{children}</span>
                </span>
              )
            },
          }}
        />
      </Description>
    </section>
  )
}

interface IImageBlock {
  image: SanityImage
  index: number
}
const ImageBlock: React.FC<IImageBlock> = ({ image, index }) => {
  return (
    <motion.figure
      initial="from"
      whileInView="to"
      variants={VFadeInOut({ flip: !!(index % 2), duration: 0.8 })}
    >
      <SanityImg width={600} image={image} builder={imageUrlBuilder} alt={image.alt} />
    </motion.figure>
  )
}
