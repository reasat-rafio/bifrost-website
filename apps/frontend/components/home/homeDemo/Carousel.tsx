import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper'
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
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay
        spaceBetween={50}
        speed={600}
        slidesPerView={1}
        onSlideChange={(swiper) => console.log(swiper)}
      >
        {data.map((previewItem, index) => (
          <SwiperSlide key={index}>
            <SanityImg
              style={{ filter: `drop-shadow(0px 14px 100px rgba(29, 49, 81, 0.4))` }}
              className="w-full object-cover rounded-2xl"
              builder={imageUrlBuilder}
              image={previewItem}
              height={300}
              alt={'image'}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
