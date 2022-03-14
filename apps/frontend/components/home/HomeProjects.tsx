import { ReactElement, useState } from 'react'
import { SanityImg } from 'sanity-react-extra'
import { Swiper, SwiperSlide } from 'swiper/react'
import { imageUrlBuilder } from 'utils/sanity'
import { Autoplay, Navigation, Mousewheel } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import 'swiper/css/mousewheel'
import { ProjectSection } from 'lib/landingTypes'
import { ArrowRight } from 'components/icons/ArrowRight'
import { ArrowLeft } from 'components/icons/ArrowLeft'
import { GradientBorder } from 'components/common/GradientBorder'

export default function HomeProjects(data: ProjectSection): ReactElement {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null)
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null)

  return (
    <div className="grid grid-cols-12 z-10 md:gap-12 max-w-screen-2xl ml-auto pl-6 xl:my-36 lg:my-20 my-16">
      <div className="flex flex-col lg:col-span-4 col-span-12 2xl:gap-y-10 gap-y-6 z-10 justify-center">
        <h4 className="md:text-head-4 text-[28px] leading-[28px] font-[275] mt-5">
          {data.headline}
        </h4>
        <p className="md:text-body-1 text-base font-light opacity-70">{data.body}</p>
        <div className="flex gap-x-4 2xl:mt-5 mt-3">
          <button ref={(node) => setPrevEl(node)} className="cursor-pointer">
            <ArrowLeft />
          </button>
          <button ref={(node) => setNextEl(node)} className="cursor-pointer">
            <ArrowRight />
          </button>
        </div>
      </div>
      <div className="lg:col-span-8 col-span-12 md:mt-0 mt-10">
        <Swiper
          modules={[Autoplay, Navigation, Mousewheel]}
          navigation={{ prevEl, nextEl }}
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
              slidesPerView: 2.9,
              spaceBetween: 30,
            },
            1440: {
              slidesPerView: 3.2,
              spaceBetween: 30,
            },
          }}
          loopedSlides={data.items.length}
          mousewheel={{ forceToAxis: true }}
          loop
          grabCursor
          speed={600}
          autoplay={{ disableOnInteraction: false, delay: 6000 }}
        >
          {data.items.map((item) => (
            <SwiperSlide key={item.name}>
              <GradientBorder
                gradient="bg-gradient-to-r from-[#F8E9FF]/30 via-[#E4ACFF]/200 to-[#7187FF]/30"
                borderRadious="10px"
                borderSize="0.85px"
                innerClass="h-full p-3 rounded-[8px]"
              >
                <div className="h-full w-full ">
                  <SanityImg
                    className="mt-auto z-10 rounded-[20px] object-cover xl:h-[300px] md:h-[250px] h-[300px] w-full"
                    builder={imageUrlBuilder}
                    image={item.image}
                    alt={item.name}
                    title={item.name}
                    height={220}
                  />
                </div>
                <h6 className="text-center my-5">{item.name}</h6>
              </GradientBorder>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
