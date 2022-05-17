import { ReactElement, useCallback, useState } from 'react'
import { SanityImg } from 'sanity-react-extra'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Mousewheel, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/mousewheel'
import 'swiper/css/pagination'
import { imageUrlBuilder } from 'utils/sanity'
import { ReviewSection } from 'lib/@types/landingTypes'
import { GradientBorder } from 'components/common/GradientBorder'
import { ArrowRight } from 'components/icons/ArrowRight'
import { ArrowLeft } from 'components/icons/ArrowLeft'
import { useWindowSize } from 'lib/hooks'

export default function HomeReview({ items }: ReviewSection): ReactElement {
  const windowWidth = useWindowSize()?.width ?? 0

  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null)
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null)

  const [transformWidth, setTransFromWidth] = useState(0)

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      const handleWidth = () => setTransFromWidth(node.clientWidth)
      handleWidth()
      window.addEventListener('resize', handleWidth)
      window.addEventListener('load', handleWidth)
    }
  }, [])

  return (
    <div className="max-w-7xl relative md:mx-auto lg:!px-14 px-6 ">
      <div className="review-carousel">
        <Swiper
          className="md:!pb-0 !pb-24"
          modules={[Autoplay, Navigation, Mousewheel, Pagination]}
          navigation={{ prevEl, nextEl }}
          slidesPerView={1}
          centeredSlides
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          spaceBetween={50}
          loopedSlides={items.length}
          loop
          speed={600}
          grabCursor
          // onSwiper={(pagination) => console.log(pagination)}
          autoplay={{ disableOnInteraction: false, delay: 6000 }}
        >
          {items.map(({ name, image, description, body }) => (
            <SwiperSlide key={name}>
              <div
                className="relative grid grid-cols-12 md:mr-10 "
                style={{
                  paddingBottom: `${windowWidth >= 768 ? `${transformWidth / 2}px` : ''}`,
                  marginLeft: `${windowWidth >= 768 ? `${transformWidth / 2}px` : ''}`,
                }}
              >
                <div className="col-span-1 hidden md:block " />
                <GradientBorder className="md:col-span-12 col-span-12 ">
                  <div
                    className="relative grid grid-cols-12 transform justify-center items-end md:px-0 px-3"
                    style={{
                      transform: `${
                        windowWidth >= 768 ? `translate(-${transformWidth / 2}px, 0)` : ''
                      }`,
                    }}
                  >
                    <div className="col-span-3 md:inline-block hidden">
                      <div
                        className="flex justify-center items-center transfrom translate-y-[40%]"
                        ref={measuredRef}
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
                    <div className="md:col-span-9 col-span-12 md:pt-10 md:pb-16 md:pl-10 transform md:translate-y-0 translate-y-[15%] px-3 md:px-0">
                      <p
                        className="md:text-head-5 text-[26px] leading-[39px] font-light md:mb-8"
                        style={{ textShadow: `0px 4px 40px rgba(0, 0, 0, 0.7)` }}
                      >
                        {body}
                      </p>

                      <div className="relative  mb-5 hidden md:inline-block">
                        <span className="text-body-1  leading-[22px] uppercase w-auto text-transparent bg-clip-text bifrost__gradient__green font-light ">
                          {name}
                        </span>
                        <span className="w-full h-[0.1em] left-0 absolute bottom-[-4px] bifrost__gradient__green" />
                      </div>
                      <div className="opacity-50 text-body-3 text-left hidden md:block">
                        {description}
                      </div>
                    </div>
                    <div className="col-span-12 md:hidden flex space-x-2 transform translate-y-[38%]">
                      <GradientBorder borderRadious="100%" borderSize="8px">
                        <SanityImg
                          className="rounded-full"
                          builder={imageUrlBuilder}
                          image={image}
                          alt={name}
                          title={name}
                          height={130}
                        />
                      </GradientBorder>
                      <div>
                        <div className="relative mb-2 ">
                          <span className="text-[18px] leading-[22px] uppercase w-auto text-transparent bg-clip-text bifrost__gradient__green font-light ">
                            {name}
                          </span>
                          <span className="w-full h-[0.1em] left-0 absolute bottom-[-4px] bifrost__gradient__green" />
                        </div>
                        <div className="opacity-50 md:text-body-3 text-base md:text-left text-right">
                          {description}
                        </div>
                      </div>
                    </div>
                  </div>
                </GradientBorder>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="lg:static lg:block lg:mr-0 relative flex justify-end items-center md:mr-12 ">
        <span className="absolute lg:left-8 lg:bottom-1/2 z-30 lg:mr-0 mr-16">
          <button ref={(node) => setNextEl(node)} className="cursor-pointer">
            <ArrowLeft />
          </button>
        </span>

        <span className="absolute lg:right-8 lg:bottom-1/2 z-30 lg:ml-0 ml-16">
          <button ref={(node) => setPrevEl(node)} className="cursor-pointer ">
            <ArrowRight />
          </button>
        </span>
      </div>
    </div>
  )
}
