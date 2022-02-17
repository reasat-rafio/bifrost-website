import clsx from 'clsx'
import { useCtx } from 'contexts/global'
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
      <div className="col-span-full justify-center items-center">
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
              <div className="p-[10rem]">
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
                    className="rounded-2xl w-full h-full py-20 pl-40 pr-36 text-left gap-y-5 flex flex-col"
                    style={{
                      background:
                        'linear-gradient(138.39deg, rgba(18, 23, 35, 1) -7.57%, rgba(7, 13, 23, 1) 107.25%)',
                    }}
                  >
                    <div className="text-[26px] leading-[39px] font-[300]">
                      <PortableText
                        blocks={item.body}
                        serializers={{
                          types: typesSerializer,
                          marks: marksSerializer,
                        }}
                      />
                    </div>
                    <div className="relative flex">
                      <div className="relative">
                        <div className="uppercase w-auto text-transparent bg-clip-text bifrost__gradient_green">
                          {item.name}
                        </div>
                        <motion.div
                          layout
                          className={clsx(
                            'w-full h-[0.1em] left-0 absolute bottom-[-4px]',
                            isWhite ? 'bg-neonBlue' : 'bifrost__gradient_green',
                          )}
                          layoutId="underline"
                          initial={false}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    </div>
                    <div className="opacity-50">{item.description}</div>
                    <div className="absolute bottom-[-20%] left-[-5%] bifrost__gradient_green p-[4px]  rounded-full">
                      <div>
                        <SanityImg
                          className="z-10 rounded-full object-contain"
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
        className="cursor-pointer absolute left-[10%] top-[50%] z-30 p-2"
      >
        <BsArrowLeft color="#c9ff71" size="32" />
      </span>

      <span
        ref={navigationNextRef}
        className="cursor-pointer absolute right-[10%] top-[50%] z-30 p-2"
      >
        <BsArrowRight color="#c9ff71" size="32" />
      </span>
    </div>
  )
}
