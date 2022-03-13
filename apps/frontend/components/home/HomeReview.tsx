import { ReactElement, useEffect, useRef, useState } from 'react'
import { SanityImg } from 'sanity-react-extra'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Mousewheel, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/mousewheel'
import 'swiper/css/pagination'
import { imageUrlBuilder } from 'utils/sanity'
import { ReviewSection } from 'lib/landingTypes'
import { GradientBorder } from 'components/common/GradientBorder'
import { ArrowRight } from 'components/icons/ArrowRight'
import { ArrowLeft } from 'components/icons/ArrowLeft'
import { useWindowSize } from 'lib/hooks'

export default function HomeReview({ items }: ReviewSection): ReactElement {
  const windowWidth = useWindowSize()?.width ?? 0

  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null)
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null)

  const [transformWidth, setTransFromWidth] = useState(0)
  const imageBlockRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleWidth = () => setTransFromWidth(imageBlockRef?.current?.offsetWidth ?? 0)

    handleWidth()
    window.addEventListener('resize', handleWidth)
    return () => {
      window.removeEventListener('resize', handleWidth)
    }
  }, [])

  return (
    <div className="max-w-7xl relative md:mx-auto mx-6">
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
          loopedSlides={items.length}
          loop
          speed={600}
          grabCursor
          onSwiper={(pagination) => console.log(pagination)}
          autoplay={{ disableOnInteraction: false, delay: 6000 }}
        >
          {items.map(({ name, image, description, body }) => (
            <SwiperSlide key={name}>
              <div
                className="relative grid grid-cols-12"
                style={{ padding: `${windowWidth >= 768 ? `${transformWidth / 2}px` : ''}` }}
              >
                <div className="col-span-1 hidden md:block" />
                <GradientBorder className="md:col-span-11 col-span-12 ">
                  <div
                    className="relative grid grid-cols-12 transform justify-center items-end md:px-0 px-3"
                    style={{
                      transform: `${
                        windowWidth >= 768 ? `translate(-${transformWidth / 2}px, 0)` : ''
                      }`,
                    }}
                  >
                    <div className="col-span-3 md:block hidden">
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
                    <div className="md:col-span-9 col-span-12 md:pt-10 md:pb-16 md:pl-10 transform md:translate-y-0 translate-y-[15%] px-3 md:px-0">
                      <p
                        className="md:text-head-5 text-[26px] leading-[39px] font-light md:mb-8"
                        style={{ textShadow: `0px 4px 40px rgba(0, 0, 0, 0.7)` }}
                      >
                        {body}
                      </p>

                      <div className="relative  mb-5 hidden md:inline-block">
                        <span className="text-body-1  leading-[22px] uppercase w-auto text-transparent bg-clip-text bifrost__gradient_green font-light ">
                          {name}
                        </span>
                        <span className="w-full h-[0.1em] left-0 absolute bottom-[-4px] bifrost__gradient_green" />
                      </div>
                      <div className="opacity-50 text-body-3 text-left hidden md:block">
                        {description}
                      </div>
                    </div>
                    <div className="col-span-12 md:hidden flex space-x-2 transform translate-y-1/2">
                      <GradientBorder className="" borderRadious="100%" borderSize="10px">
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
                          <span className="text-[18px] leading-[22px] uppercase w-auto text-transparent bg-clip-text bifrost__gradient_green font-light ">
                            {name}
                          </span>
                          <span className="w-full h-[0.1em] left-0 absolute bottom-[-4px] bifrost__gradient_green" />
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
      <span className="absolute md:left-[5%] md:right-0 right-[15%] transform md:translate-y-1/2 md:bottom-1/2 bottom-[-5%] z-30">
        <button ref={(node) => setPrevEl(node)} className="cursor-pointer">
          <ArrowLeft />
        </button>
      </span>

      <span className="absolute md:right-[5%] right-0 md:bottom-1/2 transform md:translate-y-1/2  bottom-[-5%] z-30 ">
        <button ref={(node) => setNextEl(node)} className="cursor-pointer ">
          <ArrowRight />
        </button>
      </span>
    </div>
  )
}
