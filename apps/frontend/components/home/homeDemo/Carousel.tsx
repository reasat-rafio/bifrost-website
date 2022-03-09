import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y, Autoplay } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import 'swiper/css/a11y'
import { DemoSection } from 'lib/landingTypes'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'

interface CarouselProps {
  data: DemoSection['previews']
}

export const Carousel: React.FC<CarouselProps> = ({ data }) => {
  return (
    <div>
      {/* <Swiper
        // navigation={{ prevEl, nextEl }}
        // className="xl:mt-12 my-8"
        spaceBetween={50}
        // speed={600}
        // autoplay
        slidesPerView={1}
        // pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        //   onSlideChange={(swiper) => {
        //     swiper.activeIndex === contexts.length - 1
        //       ? setDisableNextBtn(true)
        //       : setDisableNextBtn(false)
        //     swiper.activeIndex === 0 ? setDisablePrevBtn(true) : setDisablePrevBtn(false)
        //   }}
      >
        {data.map((previewItem, index) => (
          <SwiperSlide key={index}>
            <SanityImg
              className=""
              builder={imageUrlBuilder}
              image={previewItem}
              height={300}
              alt={'image'}
            />
          </SwiperSlide>
        ))}
      </Swiper> */}
    </div>
  )
}
