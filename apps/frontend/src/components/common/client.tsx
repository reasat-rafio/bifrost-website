import { ClientsSection } from 'lib/@types/about-us-types'
import { useWindowSize } from 'react-use'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'
import { Autoplay, Mousewheel } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { motion } from 'framer-motion'
import { ScaleUpChild, ScaleUpParent } from 'animations/scale-up'
import { useRef } from 'react'
import { useIntersection } from 'lib/hooks'
import { Title } from 'components/ui/title'
import Link from 'next/link'
import { Description } from 'components/ui/description'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/mousewheel'

export const Client: React.FC<ClientsSection> = ({ clients, title, subtitle }) => {
  const containerRef = useRef(null)
  const intersection = useIntersection(containerRef, { threshold: 0.35 })
  const windowWidth = useWindowSize()?.width ?? 0

  return (
    <motion.section
      ref={containerRef}
      initial="hidden"
      animate={intersection?.isIntersecting ? 'visible' : 'hidden'}
      variants={ScaleUpParent}
      className="container mx-auto space-y-6 lg:py-32 py-20 border-b border-secondary/80"
    >
      <Title className="text-center">{title}</Title>
      {!!subtitle && (
        <Description textBig className="text-center max-w-5xl mx-auto">
          {subtitle}
        </Description>
      )}

      <Swiper
        modules={[Autoplay, Mousewheel]}
        className="!pt-10"
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
        loopedSlides={clients.length}
        mousewheel={{ forceToAxis: true }}
        autoplay
        speed={windowWidth * 10}
      >
        {clients.map(({ _key, name, url, logo }) => (
          <SwiperSlide className="my-auto" key={_key}>
            <motion.div variants={ScaleUpChild}>
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
