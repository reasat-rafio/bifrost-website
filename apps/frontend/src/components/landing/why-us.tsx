import { Button } from 'components/ui/button'
import { Description } from 'components/ui/description'
import { Heading } from 'components/ui/heading'
import { Section } from 'components/ui/section'
import { Title } from 'components/ui/title'
import { CTAButton } from 'lib/@types/global-types'
import { Collection } from 'lib/@types/landing-types'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useIntersection } from 'lib/hooks'
import { VFadeInOut } from 'animations/fade-in-out'

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
  const sectionRef = useRef(null)
  const intersecting = useIntersection(sectionRef, { threshold: 0.35 })?.isIntersecting ?? false

  return (
    <Section ref={sectionRef}>
      <div className="spacing_primary | font-light">
        <Title animate={{ show: intersecting, delay: 0.1 }}>{title}</Title>
        <Heading animate={{ show: intersecting, delay: 0.15 }}>{subtitle}</Heading>
        <Description animate={{ show: intersecting, delay: 0.2 }}>{description}</Description>
      </div>
      <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 | lg:gap-20 md:gap-14 sm:gap-10 gap-4 md:py-28 sm:py-16 py-10">
        {collection.map(({ _key, description, image, title }, index) => (
          <motion.article
            initial="from"
            animate={intersecting ? 'to' : 'exit'}
            variants={VFadeInOut({ delay: 0.415 + index * 0.05 })}
            key={_key}
            className="space-y-5"
          >
            <figure className="aspect-square w-[64px] h-[64px] border p-3 rounded-[10px] border-secondary/80">
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
          </motion.article>
        ))}
      </div>
      <div className="w-full h-full flex justify-center items-center">
        {!!ctaButton && (
          <Button color="green" variant="secondary" type="href" href={ctaButton?.href ?? ''}>
            {ctaButton.title}
          </Button>
        )}
      </div>
    </Section>
  )
}
