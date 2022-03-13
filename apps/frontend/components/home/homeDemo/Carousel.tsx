import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper'
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
  const swiperRef = useRef() as any

  const setSlideHeight = (swiper: any) => {
    document.querySelectorAll<HTMLElement>('#hero-demo-craousel .swiper-slide').forEach((el) => {
      el.style.height = 'auto'
    })

    const currentSlide = swiper.activeIndex
    const newHeight = swiper.slides[currentSlide]?.offsetHeight

    document
      .querySelectorAll<HTMLElement>(
        '#hero-demo-craousel .swiper-wrapper, #hero-demo-craousel .swiper-slide',
      )
      .forEach((el) => {
        el.style.height = `${newHeight}px`
      })

    swiper.update()
  }

  return (
    <div id="hero-demo-craousel">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay
        spaceBetween={50}
        direction={'vertical'}
        autoHeight={true}
        speed={600}
        slidesPerView={1}
        onSlideChange={(swiper) => console.log(swiper)}
        onInit={(swiper: SwiperCore) => {
          swiperRef.current = swiper
          setSlideHeight(swiper)
        }}
        onSlideNextTransitionEnd={(swiper) => setSlideHeight(swiper)}
        onResize={(swiper) => {
          setSlideHeight(swiper)
        }}
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
