import clsx from 'clsx'
import { ReviewSection } from 'lib/types'
import { ReactElement, useRef } from 'react'
import { SanityImg } from 'sanity-react-extra'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, Navigation, Mousewheel } from 'swiper'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import 'swiper/swiper.min.css'
import { motion } from 'framer-motion'
import { imageUrlBuilder, PortableText } from 'utils/sanity'
import { marksSerializer, typesSerializer } from 'lib/blockContent'

SwiperCore.use([Autoplay, Navigation, Mousewheel])

export default function HomeReview(data: ReviewSection): ReactElement {
  const navigationPrevRef = useRef<HTMLSpanElement>(null)
  const navigationNextRef = useRef<HTMLSpanElement>(null)
  return (
    <div
      className={clsx(
        'container flex items-center z-10 relative w-full overflow-hidden gap-x-5 min-h-[100vh]',
        'text-white',
      )}
    >
      <div className="w-full">
        <div className="relative">
          <Swiper
            slidesPerView={1}
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
                <div className="xl:p-[10rem] md:p-[5rem] py-[5rem]">
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
                    className="grid rounded-2xl relative bifrost__gradient_green p-[0.5px]"
                  >
                    <div
                      className="rounded-2xl h-full xl:py-20 xl:pl-40 xl:pr-36 lg:pl-36 md:pl-32 px-5 py-5 text-left gap-y-5 flex flex-col"
                      style={{
                        background:
                          'linear-gradient(138.39deg, rgba(18, 23, 35, 1) -7.57%, rgba(7, 13, 23, 1) 107.25%)',
                      }}
                    >
                      <div className="md:text-head-5 text-[22px] leading-[33px] font-[300]">
                        <PortableText
                          blocks={item.body}
                          serializers={{
                            types: typesSerializer,
                            marks: marksSerializer,
                          }}
                        />
                      </div>
                      <div className="grid-cols-2">
                        <div className="col-span-1 space-y-2">
                          <div className="relative flex md:justify-start justify-end">
                            <div className="relative">
                              <div className="md:text-body-1 text-[16px] leading-[20px] uppercase w-auto text-transparent bg-clip-text bifrost__gradient_green">
                                {item.name}
                              </div>
                              <motion.div
                                layout
                                className={clsx(
                                  'w-full h-[0.1em] left-0 absolute bottom-[-4px]',
                                  'bifrost__gradient_green',
                                )}
                                layoutId="underline"
                                initial={false}
                                transition={{ duration: 0.2 }}
                              />
                            </div>
                          </div>
                          <div className="opacity-50 md:text-body-3 text-[14px] leading-[21px] md:text-left text-right">
                            {item.description}
                          </div>
                        </div>
                      </div>
                      <div className="absolute bottom-[-20%] md:left-[-5%] left-[-1%] bifrost__gradient_green p-[4px] rounded-full">
                        <div>
                          <SanityImg
                            className="z-10 md:w-[15vw] w-[25vw] rounded-full object-contain"
                            builder={imageUrlBuilder}
                            image={item.image}
                            alt={item.name}
                            title={item.name}
                            height={175}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <span
          ref={navigationPrevRef}
          className="cursor-pointer absolute md:left-[5%] md:right-0 right-[15%] md:bottom-[45%] bottom-[20%] z-30 p-2"
        >
          <BsArrowLeft color="#c9ff71" size="32" />
        </span>

        <span
          ref={navigationNextRef}
          className="cursor-pointer absolute md:right-[5%] right-0 md:bottom-[45%] bottom-[20%] z-30 p-2"
        >
          <BsArrowRight color="#c9ff71" size="32" />
        </span>
      </div>
    </div>
  )
}
