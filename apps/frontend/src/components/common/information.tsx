import { Button } from 'components/ui/button'
import { CTAButton } from 'lib/@types/global-types'
import { useWindowSize } from 'lib/hooks'
import { SanityImage, SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'
import { motion } from 'framer-motion'
import { useMemo, useRef } from 'react'
import { useIntersection } from 'lib/hooks'
import clsx from 'clsx'
import { GradientTitle } from './GradientTitle'

interface InformationProps {
  type: string
  heading?: string
  title: string
  subtitle: string
  image: SanityImage
  cta?: CTAButton
}

export const Information: React.FC<InformationProps> = ({
  image,
  subtitle,
  title,
  heading,
  cta,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0
  const sectionRef = useRef<HTMLElement>(null)
  const intersecting = useIntersection(sectionRef, { threshold: 0.5 })?.isIntersecting
  const imageWidth = useMemo(
    () => (windowWidth >= 1280 ? 1200 : windowWidth > 768 ? 700 : 400),
    [windowWidth],
  )

  return (
    <section ref={sectionRef} className="container | pt-10 ">
      <motion.figure className="w-full overflow-hidden rounded-2xl">
        <SanityImg
          className={clsx(
            'w-full h-full max-h-[590px] | object-cover | transition-transform duration-700 ease-in-out',
            intersecting ? 'scale-110' : 'scale-100',
          )}
          builder={imageUrlBuilder}
          width={imageWidth}
          image={image}
          alt={image?.alt}
        />
      </motion.figure>

      <section className="flex justify-end">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: intersecting ? 1 : 0 }}
          viewport={{ once: true }}
          transition={{ type: 'tween', duration: 0.7, ease: 'easeInOut' }}
          className="max-w-lg | flex flex-col xl:space-y-6 md:space-y-4 space-y-3 | xl:p-7 md:p-5 p-3 | border-gray/10 border | lg:-translate-y-1/2 sm:-translate-y-[30%] -translate-y-[20%]  | lg:mr-[5%] lg:ml-0 mr-[2.5%] ml-[2.5%] | background__blur rounded-primary | transition-transform duration-700 ease-in-out"
        >
          {!!heading && <GradientTitle>{heading}</GradientTitle>}
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
        </motion.div>
      </section>
    </section>
  )
}
