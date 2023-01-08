import { GradientTitle } from 'src/components/common/GradientTitle'
import { Description } from 'src/components/ui/Description'
import { Header } from 'src/components/ui/Header'
import { AboutSectionProps } from 'lib/@types/about-us-types'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'
import { useIntersection, useWindowSize } from 'lib/hooks'
import { useRef } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'

const About: React.FC<AboutSectionProps> = ({ description, ctaButton, heading, image, title }) => {
  const windowWidth = useWindowSize()?.width ?? 0
  const sectionRef = useRef<HTMLElement>(null)
  const intersecting = useIntersection(sectionRef, { threshold: 0.5 })?.isIntersecting

  return (
    <article ref={sectionRef} className="mx-5">
      <div className="z-10 grid md:grid-cols-2 grid-cols-1 | 3xl:container 2xl:max-w-6xl max-w-5xl | mx-auto xl:py-40 lg:py-20 py-16">
        <figure className="md:translate-x-[20%] translate-x-0 w-full md:aspect-[2.5/3] aspect-video rounded-[15px] max-h-[720px] | overflow-hidden">
          <SanityImg
            className={clsx(
              'w-full h-full | object-cover | transition-transform duration-700 ease-in-out',
              intersecting ? 'scale-110' : 'scale-100',
            )}
            builder={imageUrlBuilder}
            image={image}
            width={windowWidth >= 1024 ? 650 : windowWidth >= 768 ? 450 : 250}
            alt={image?.alt || 'image'}
          />
        </figure>
        <section className="flex items-center justify-center | md:mx-0 mx-5 transform -translate-y-[20%] md:translate-y-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: intersecting ? 1 : 0 }}
            viewport={{ once: true }}
            transition={{ type: 'tween', duration: 0.7, ease: 'easeInOut' }}
            className="lg:p-12 p-6 bifrost__transparent_card rounded-lg flex flex-col lg:space-y-6 space-y-2"
          >
            <GradientTitle>{heading}</GradientTitle>
            <Header>{title}</Header>
            <Description>{description}</Description>

            <div className="flex">
              <button className="space-x-4 py-2">
                <object
                  type="image/svg+xml"
                  height="64"
                  width="64"
                  data="play.svg"
                  className="inline-block"
                />
                <span className="underline text-[16px] leading-[16px]">{ctaButton.title}</span>
              </button>
            </div>
          </motion.div>
        </section>
      </div>
    </article>
  )
}

export default About
