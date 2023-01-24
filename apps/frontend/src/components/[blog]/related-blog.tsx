// import { Heading } from 'components/ui/heading'
import { IBlog } from 'lib/@types/blog-types'
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Mousewheel } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/mousewheel'
import { ArrowLeft } from 'src/components/icons/ArrowLeft'
import { ArrowRight } from 'src/components/icons/ArrowRight'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'
import { formatDate, truncate } from 'src/lib/helpers'
import { Button } from 'components/ui/button'

interface RelatedBlogProps {
  relatedBlogs: IBlog[]
}

export const RelatedBlogs: React.FC<RelatedBlogProps> = ({ relatedBlogs }) => {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null)
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null)
  return (
    <section className="container space-y-10">
      {/* <HeadingclassName="mx-auto text-center">You might also like</Header> */}
      <div>
        <Swiper
          modules={[Autoplay, Navigation, Mousewheel]}
          navigation={{ prevEl, nextEl }}
          spaceBetween={20}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 20,
              centeredSlides: true,
            },
            1440: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          loopedSlides={relatedBlogs.length}
          loop
          speed={600}
          grabCursor
          // onSwiper={(pagination) => console.log(pagination)}
          autoplay={{ disableOnInteraction: false, delay: 6000 }}
        >
          {relatedBlogs.map(({ _id, datetime, heading, image, slug, shortDescription }) => (
            <SwiperSlide
              key={_id}
              className="border border-[#4e6181]/30 p-4 bifrost__transparent__card !h-[450px] sm:!h-[500px] lg:!h-[530px] 2xl:!h-[550px] "
            >
              <div className="h-[45%] overflow-hidden rounded-[14px]">
                <SanityImg
                  className="h-full w-full object-cover"
                  image={image}
                  builder={imageUrlBuilder}
                  width={340}
                />
              </div>
              <div className="h-[40%] overflow-hidden flex flex-col space-y-2 pt-5">
                <span className="text-[14px] text-[#B9B9B9] text-base">
                  {formatDate(datetime?.split('T')[0])}
                </span>
                <h4 className="text-[22px] font-light">{heading}</h4>
                <p className="font-light text-base">{truncate(shortDescription)}</p>
              </div>
              <div className="!h-[15%] flex items-center ">
                <div>
                  <Button variant="secondary" type="href" href={`/post/${slug.current}`}>
                    Read More
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="relative space-x-8 mx-auto text-center">
        <span className="">
          <button ref={(node) => setNextEl(node)} className="cursor-pointer">
            <ArrowLeft />
          </button>
        </span>

        <span className="">
          <button ref={(node) => setPrevEl(node)} className="cursor-pointer ">
            <ArrowRight />
          </button>
        </span>
      </div>
    </section>
  )
}
