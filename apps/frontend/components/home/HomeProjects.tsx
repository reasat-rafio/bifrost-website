import clsx from 'clsx'
import { useCtx } from 'contexts/global'
import { motion } from 'framer-motion'
import { marksSerializer, typesSerializer } from 'lib/blockContent'
import { ProjectSection } from 'lib/types'
import { ReactElement, useRef } from 'react'
import { SanityImg } from 'sanity-react-extra'
import { Swiper, SwiperSlide } from 'swiper/react'
import { imageUrlBuilder, PortableText } from 'utils/sanity'
import SwiperCore, { Autoplay, Navigation, Mousewheel } from 'swiper'
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs'
import 'swiper/swiper.min.css'

SwiperCore.use([Autoplay, Navigation, Mousewheel])

export default function HomeProjects(data: ProjectSection): ReactElement {
  const { isWhite } = useCtx()
  const navigationPrevRef = useRef<HTMLSpanElement>(null)
  const navigationNextRef = useRef<HTMLSpanElement>(null)

  return (
    <div
      className={clsx(
        'container grid grid-cols-10 items-center z-10 relative gap-x-5 h-[100vh]',
        isWhite ? 'text-black' : 'text-white',
      )}
    >
      <div className="flex flex-col col-span-3  gap-y-4 z-10 justify-center">
        <div className="text-[55px] leading-[55px] font-[275]">{data.headline}</div>
        <div className="text-[18px] leading-[32px] font-[300]">
          <PortableText
            blocks={data.body}
            serializers={{
              types: typesSerializer,
              marks: marksSerializer,
            }}
          />
        </div>
        <div className="flex gap-x-4">
          <span ref={navigationPrevRef} className="cursor-pointer">
            <BsArrowLeft color="#c9ff71" size="32" />
          </span>
          <span ref={navigationNextRef} className="cursor-pointer">
            <BsArrowRight color="#c9ff71" size="32" />
          </span>
        </div>
      </div>
      <div className="overflow-hidden border-[#1E2531] border-l-2 col-span-7">
        <Swiper
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
                {/* <a className="h-full"> */}
                {/*   <SanityImg */}
                {/*     className="my-auto p-3 object-cover" */}
                {/*     builder={imageUrlBuilder} */}
                {/*     image={item.image} */}
                {/*     alt={item.name} */}
                {/*     title={item.name} */}
                {/*     width={windowWidth < 960 ? 345 : 200} */}
                {/*   /> */}
                {/* </a> */}
                <div className="text-center">{item.name}</div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
