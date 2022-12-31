import React, { ReactElement, useCallback, useState } from 'react'
import { SanityImg } from 'sanity-react-extra'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Mousewheel, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/mousewheel'
import 'swiper/css/pagination'
import { imageUrlBuilder } from 'src/utils/sanity'
import { ReviewSection } from 'lib/@types/landing-types'
import { GradientBorder } from 'src/components/common/GradientBorder'
import { ArrowRight } from 'src/components/icons/ArrowRight'
import { ArrowLeft } from 'src/components/icons/ArrowLeft'
import { useWindowSize } from 'src/lib/hooks'

export const Reviews: React.FC<ReviewSection> = ({ reviews }) => {
  const windowWidth = useWindowSize()?.width ?? 0
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null)
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null)
  const [transformWidth, setTransformWidth] = useState(0)

  const measuredRef = useCallback(
    (node) => {
      if (node !== null) setTransformWidth(node.clientWidth)
    },
    [windowWidth],
  )

  return (
    <div className="max-w-screen-2xl relative md:mx-auto lg:!px-14 px-6 pb-16">
      <div className="review-carousel">
        <Swiper
          className="md:!pb-0 !pb-24"
          modules={[Autoplay, Navigation, Mousewheel, Pagination]}
          navigation={{ prevEl, nextEl }}
          slidesPerView={1}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          spaceBetween={50}
          loopedSlides={reviews.length}
          loop
          speed={600}
          grabCursor
          autoplay={{ disableOnInteraction: false, delay: 6000 }}
        >
          {reviews.map(({ _key, name, image, role, review }) => (
            <SwiperSlide key={_key}>
              <article
                className="relative grid grid-cols-12 md:mr-10 "
                style={{
                  paddingBottom: windowWidth >= 768 ? transformWidth / 2 : 0,
                  marginLeft: windowWidth >= 768 ? transformWidth / 2 : 0,
                }}
              >
                <span className="col-span-1 hidden md:block " />
                <GradientBorder className="md:col-span-12 col-span-12">
                  <div
                    className="relative grid grid-cols-12 transform justify-center items-end md:px-0 px-3"
                    style={{
                      transform:
                        windowWidth >= 768 ? `translate(-${transformWidth / 2}px, 0)` : undefined,
                    }}
                  >
                    <div className="col-span-3 md:inline-block hidden">
                      <div
                        className="flex justify-center items-center transfrom translate-y-[40%]"
                        ref={measuredRef}
                      >
                        <GradientBorder className="" borderRadious="100%" borderSize="10px">
                          <figure className="xl:h-[200px] xl:w-[200px] lg:w-[150px] lg:h-[150px] md:w-[120px] md:h-[120px]">
                            <SanityImg
                              className="rounded-full | h-full w-full object-cover"
                              builder={imageUrlBuilder}
                              image={image}
                              alt={image.alt}
                              title={name}
                              width={windowWidth >= 1280 ? 250 : 200}
                            />
                          </figure>
                        </GradientBorder>
                      </div>
                    </div>
                    <section className="md:col-span-9 col-span-12 md:pt-10 md:pb-16 md:pl-10 transform md:translate-y-0 translate-y-[15%] px-3 md:px-0">
                      <p
                        className="md:text-head-5 text-body-2 font-light md:mb-8"
                        style={{ textShadow: `0px 4px 40px rgba(0, 0, 0, 0.7)` }}
                      >
                        {review}
                      </p>

                      <div className="relative  mb-5 hidden md:inline-block">
                        <span className="sm:text-body-1 text-body-3 | uppercase w-auto text-transparent bg-clip-text gradient__white__to__green font-light ">
                          {name}
                        </span>
                        <span className="w-full h-[0.1em] left-0 absolute bottom-[-4px] gradient__white__to__green" />
                      </div>
                      <span className="opacity-50 sm:text-body-3 text-body-1-mobile text-left hidden md:block">
                        {role}
                      </span>
                    </section>
                    <div className="col-span-12 md:hidden flex space-x-2 transform translate-y-[38%] pb-5">
                      <GradientBorder borderRadious="100%" borderSize="6px">
                        <figure className="sm:w-[100px] sm:h-[100px] w-[70px] h-[70px]">
                          <SanityImg
                            className="rounded-full | h-full w-full object-cover"
                            builder={imageUrlBuilder}
                            image={image}
                            alt={image.alt}
                            title={name}
                            width={150}
                          />
                        </figure>
                      </GradientBorder>
                      <div>
                        <div className="relative mb-2 ">
                          <span className="text-[18px] leading-[22px] uppercase w-auto text-transparent bg-clip-text gradient__white__to__green font-light ">
                            {name}
                          </span>
                          <span className="w-full h-[0.1em] left-0 absolute bottom-[-4px] gradient__white__to__green" />
                        </div>
                        <div className="opacity-50 md:text-body-3 text-base md:text-left text-right">
                          {role}
                        </div>
                      </div>
                    </div>
                  </div>
                </GradientBorder>
              </article>
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
