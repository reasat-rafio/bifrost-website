import { Partner } from 'lib/@types/landing-types'
import { useIntersection, useWindowSize } from 'lib/hooks'
import Link from 'next/link'
import { SanityImg } from 'sanity-react-extra'
import { Autoplay, Mousewheel } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { imageUrlBuilder } from 'utils/sanity'
import { Variants, motion } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/mousewheel'
import { useRef } from 'react'

interface PartnersProps {
  type: string
  partners: Partner[]
}

export const VContainer: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

export const VItems: Variants = {
  visible: {
    opacity: 1,
    scale: 1,
  },
  hidden: {
    opacity: 0,
    scale: 0,
  },
}

export const Partners: React.FC<PartnersProps> = ({ partners }) => {
  const containerRef = useRef(null)
  const intersection = useIntersection(containerRef, { threshold: 0.25 })
  const windowWidth = useWindowSize()?.width ?? 0

  return (
    <motion.section
      ref={containerRef}
      initial="hidden"
      animate={intersection?.isIntersecting ? 'visible' : 'hidden'}
      variants={VContainer}
      className="container mx-auto"
    >
      <Swiper
        modules={[Autoplay, Mousewheel]}
        className="!py-10 border-b border-secondary/80"
        centeredSlides
        loop
        slidesPerView={2}
        spaceBetween={50}
        breakpoints={{
          300: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          400: {
            slidesPerView: 3,
            spaceBetween: 60,
          },
          560: {
            slidesPerView: 3,
            spaceBetween: 70,
          },
          800: {
            slidesPerView: 5,
            spaceBetween: 80,
          },

          1280: {
            slidesPerView: 6,
            spaceBetween: 90,
          },
          1536: {
            slidesPerView: 6,
            spaceBetween: 100,
          },
        }}
        loopedSlides={partners.length}
        mousewheel={{ forceToAxis: true }}
        autoplay
        speed={windowWidth * 10}
      >
        {partners.map(({ _key, name, url, logo }) => (
          <SwiperSlide className="my-auto" key={_key}>
            <motion.div variants={VItems}>
              {!!url ? (
                <Link href={url}>
                  <a title={name ?? null}>
                    <SanityImg builder={imageUrlBuilder} image={logo} width={200} alt={logo.alt} />
                  </a>
                </Link>
              ) : (
                <SanityImg builder={imageUrlBuilder} image={logo} width={200} alt={logo.alt} />
              )}
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.section>
  )
}
