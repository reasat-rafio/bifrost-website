import { useState } from 'react'
import { SanityImg } from 'sanity-react-extra'
import { Swiper, SwiperSlide } from 'swiper/react'
import { imageUrlBuilder } from 'src/utils/sanity'
import { Autoplay, Navigation, Mousewheel } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import 'swiper/css/mousewheel'
import { ProjectSection } from 'lib/@types/landing-types'
import { ArrowRight } from 'src/components/icons/ArrowRight'
import { ArrowLeft } from 'src/components/icons/ArrowLeft'
import { Header } from 'src/components/ui/Header'
import { Description } from 'src/components/ui/Description'
import { useWindowSize } from 'lib/hooks'
import clsx from 'clsx'
import { motion } from 'framer-motion'

export const Project: React.FC<ProjectSection> = ({ projects, subtitle, title }) => {
  const windowWidth = useWindowSize()?.width ?? 0
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null)
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null)

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ type: 'tween', duration: 1 }}
      viewport={{ once: true }}
      className={clsx(
        'z-10  | grid grid-cols-12 | md:gap-12 ml-auto pl-6 xl:my-36 lg:my-20 my-16',
        windowWidth >= 1024
          ? '3xl:max-w-screen-3xl xl:max-w-screen-xl lg:max-w-screen-lg'
          : 'container',
      )}
    >
      <motion.div className="z-10 | flex flex-col justify-center | lg:col-span-4 col-span-12 | 2xl:gap-y-10 gap-y-5">
        <Header>{title}</Header>
        <Description>{subtitle}</Description>
        <div className="gap-x-4 2xl:mt-5 mt-3 lg:flex hidden">
          <button ref={(node) => setPrevEl(node)} className="cursor-pointer">
            <ArrowLeft />
          </button>
          <button ref={(node) => setNextEl(node)} className="cursor-pointer">
            <ArrowRight />
          </button>
        </div>
      </motion.div>
      <div className="lg:col-span-8 col-span-12 | md:mt-0 mt-10">
        <Swiper
          modules={[Autoplay, Navigation, Mousewheel]}
          navigation={{ prevEl, nextEl }}
          centeredSlides
          breakpoints={{
            200: {
              slidesPerView: 1.1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 1.7,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 30,
            },

            1024: {
              slidesPerView: 2.5,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1440: {
              slidesPerView: 3.4,
              spaceBetween: 30,
            },
          }}
          loopedSlides={projects.length}
          loop
          grabCursor
          speed={500}
          autoplay={{ disableOnInteraction: false, delay: 2000 }}
        >
          {projects.map((item) => (
            <SwiperSlide
              key={item._key}
              className="background__dark rounded-[8px] p-3 border border-[#4e6181]/20"
            >
              <figure className="h-full w-full rounded-[8px] overflow-hidden">
                <SanityImg
                  className="mt-auto z-10 object-cover xl:h-[300px] md:h-[250px] h-[300px] w-full"
                  builder={imageUrlBuilder}
                  image={item.image}
                  alt={item.image.alt}
                  title={item.name}
                  height={windowWidth >= 1280 ? 400 : windowWidth >= 640 ? 300 : 220}
                />
              </figure>
              <h6 className="text-center my-5">{item.name}</h6>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="lg:hidden flex justify-center | gap-x-4 mt-5">
          <button ref={(node) => setPrevEl(node)} className="cursor-pointer">
            <ArrowLeft />
          </button>
          <button ref={(node) => setNextEl(node)} className="cursor-pointer">
            <ArrowRight />
          </button>
        </div>
      </div>
    </motion.section>
  )
}
