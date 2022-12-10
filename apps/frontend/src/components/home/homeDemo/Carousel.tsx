import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination, Autoplay, A11y } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'
import 'swiper/css/a11y'
import { DemoSection } from 'src/lib/@types/landingTypes'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'src/utils/sanity'

interface CarouselProps {
  data: DemoSection['previews']
}

export const Carousel: React.FC<CarouselProps> = ({ data }) => {
  const setSlideHeight = (swiper: any) => {
    document.querySelectorAll<HTMLElement>('#landing-demo-craousel .swiper-slide').forEach((el) => {
      el.style.height = 'auto'
    })

    const currentSlide = swiper.activeIndex
    const newHeight = swiper.slides[currentSlide]?.offsetHeight

    document
      .querySelectorAll<HTMLElement>(
        '#landing-demo-craousel .swiper-wrapper, #landing-demo-craousel .swiper-slide',
      )
      .forEach((el) => {
        el.style.height = `${newHeight}px`
      })

    swiper.update()
  }

  useEffect(() => {
    window.dispatchEvent(new Event('resize'))
  }, [])

  return (
    <div id="landing-demo-craousel">
      <Swiper
        modules={[Autoplay, Pagination, A11y, Navigation]}
        autoplay
        spaceBetween={50}
        direction={'vertical'}
        // autoHeight={true}
        pagination
        speed={600}
        slidesPerView={1}
        onInit={(swiper: SwiperCore) => {
          setSlideHeight(swiper)
        }}
        onSlideNextTransitionEnd={(swiper) => setSlideHeight(swiper)}
        onResize={(swiper) => setSlideHeight(swiper)}
      >
        {data.map((previewItem, index) => (
          <SwiperSlide key={index} className="">
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