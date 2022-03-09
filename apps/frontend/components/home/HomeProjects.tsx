import clsx from 'clsx'
import { motion } from 'framer-motion'
import { ReactElement, useRef } from 'react'
import { SanityImg } from 'sanity-react-extra'
import { Swiper, SwiperSlide } from 'swiper/react'
import { imageUrlBuilder } from 'utils/sanity'
import { Autoplay, Navigation, Mousewheel } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import 'swiper/css/mousewheel'
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs'
import { ProjectSection } from 'lib/landingTypes'

export default function HomeProjects(data: ProjectSection): ReactElement {
  const navigationPrevRef = useRef<HTMLSpanElement>(null)
  const navigationNextRef = useRef<HTMLSpanElement>(null)

  return (
    <div
      className={clsx(
        'container grid grid-cols-10 items-center z-10 relative gap-x-5',
        'text-white',
      )}
    >
      <div className="flex flex-col lg:col-span-3 col-span-10  gap-y-4 z-10 justify-center">
        <div className="md:text-head-4 text-[28px] leading-[28px] font-[275]">{data.headline}</div>
        <div className="md:text-body-1 text-[14px] leading-[21px] font-[300]">{data.body}</div>
        <div className="flex gap-x-4">
          <span ref={navigationPrevRef} className="cursor-pointer">
            <BsArrowLeft color="#c9ff71" size="32" />
          </span>
          <span ref={navigationNextRef} className="cursor-pointer">
            <BsArrowRight color="#c9ff71" size="32" />
          </span>
        </div>
      </div>
      <div className="overflow-hidden border-[#1E2531] border-l-2 lg:col-span-7 col-span-10">
        <Swiper
          modules={[Autoplay, Navigation, Mousewheel]}
          breakpoints={{
            400: {
              slidesPerView: 1.1,
              spaceBetween: 20,
            },
            560: {
              slidesPerView: 1.5,
              spaceBetween: 20,
            },
            800: {
              slidesPerView: 2,
              spaceBetween: 30,
            },

            1280: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1536: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          loopedSlides={data.items.length}
          mousewheel={{ forceToAxis: true }}
          loop
          autoplay={{ disableOnInteraction: false, delay: 6000 }}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          onInit={(swiper: any) => {
            swiper.params.navigation.prevEl = navigationPrevRef.current
            swiper.params.navigation.nextEl = navigationNextRef.current
            swiper.init()
            swiper.navigation.update()
          }}
        >
          {data.items.map((item) => (
            <SwiperSlide key={item.name} className="h-full">
              <motion.div
                variants={{
                  visible: {
                    opacity: 1,
                    scale: 1,
                  },
                  hidden: {
                    opacity: 0,
                    scale: 0,
                  },
                }}
                className="grid px-1 rounded-2xl project__item py-5"
              >
                <div className="h-full w-full flex justify-center ">
                  <SanityImg
                    className="mt-auto z-10 rounded-md object-cover"
                    builder={imageUrlBuilder}
                    image={item.image}
                    alt={item.name}
                    title={item.name}
                    height={220}
                  />
                </div>
                <div className="text-center">{item.name}</div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
