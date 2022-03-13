import { ReactElement, useEffect, useRef, useState } from 'react'
import { SanityImg } from 'sanity-react-extra'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Mousewheel, Pagination } from 'swiper'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/mousewheel'
import 'swiper/css/pagination'
import { motion } from 'framer-motion'
import { imageUrlBuilder } from 'utils/sanity'
import { ReviewSection } from 'lib/landingTypes'
import { GradientBorder } from 'components/common/GradientBorder'

export default function HomeReview({ items }: ReviewSection): ReactElement {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null)
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null)

  const [transformWidth, setTransFromWidth] = useState(0)
  const imageBlockRef = useRef<HTMLDivElement>(null)

  console.log(transformWidth)

  useEffect(() => {
    const handleWidth = () => setTransFromWidth(imageBlockRef?.current?.offsetWidth ?? 0)

    handleWidth()
    window.addEventListener('resize', handleWidth)
    return () => {
      window.removeEventListener('resize', handleWidth)
    }
  }, [])

  return (
    <div className="max-w-7xl mx-auto">
      <div className="review-carousel">
        <Swiper
          className=""
          modules={[Autoplay, Navigation, Mousewheel, Pagination]}
          navigation={{ prevEl, nextEl }}
          slidesPerView={1}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          spaceBetween={50}
          loopedSlides={items.length}
          loop
          speed={600}
          onSwiper={(pagination) => console.log(pagination)}
          autoplay={{ disableOnInteraction: false, delay: 6000 }}
        >
          {items.map(({ name, image, description, body }) => (
            <SwiperSlide key={name}>
              <div
                className="relative grid grid-cols-12"
                style={{ padding: `${transformWidth / 2}px` }}
              >
                <div className="col-span-1 hidden lg:block" />
                <GradientBorder className="lg:col-span-11 col-span-12">
                  <div
                    className="relative grid grid-cols-12 transform justify-center items-end "
                    style={{ transform: `translate(-${transformWidth / 2}px, 0)` }}
                  >
                    <div className="col-span-3">
                      <div
                        className="flex justify-center items-center transfrom translate-y-[40%]"
                        ref={imageBlockRef}
                      >
                        <GradientBorder className="" borderRadious="100%" borderSize="10px">
                          <SanityImg
                            className="rounded-full"
                            builder={imageUrlBuilder}
                            image={image}
                            alt={name}
                            title={name}
                            height={175}
                          />
                        </GradientBorder>
                      </div>
                    </div>
                    <div className="col-span-9 pt-10 pb-16 lg:pl-10">
                      <p
                        className="md:text-head-5 text-[26px] leading-[39px] font-light mb-8"
                        style={{ textShadow: `0px 4px 40px rgba(0, 0, 0, 0.7)` }}
                      >
                        {body}
                      </p>

                      <div className="relative inline-block mb-5">
                        <span className="md:text-body-1 text-[18px] leading-[22px] uppercase w-auto text-transparent bg-clip-text bifrost__gradient_green font-light ">
                          {name}
                        </span>
                        <span className="w-full h-[0.1em] left-0 absolute bottom-[-4px] bifrost__gradient_green" />
                      </div>
                      <div className="opacity-50 md:text-body-3 text-base md:text-left text-right">
                        {description}
                      </div>
                    </div>
                  </div>
                </GradientBorder>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* <button
        ref={(node) => setPrevEl(node)}
        className="cursor-pointer absolute md:left-[5%] md:right-0 right-[15%] md:bottom-[45%] bottom-[25%] z-30 p-2"
      >
        <BsArrowLeft color="#c9ff71" size="32" />
      </button>

      <button
        ref={(node) => setNextEl(node)}
        className="cursor-pointer absolute md:right-[5%] right-0 md:bottom-[45%] bottom-[25%] z-30 p-2"
      >
        <BsArrowRight color="#c9ff71" size="32" />
      </button> */}
    </div>
  )
}
