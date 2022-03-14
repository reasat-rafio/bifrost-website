import { ClientsSection } from 'lib/aboutUsTypes'
import { ReactElement } from 'react'
import { useWindowSize } from 'react-use'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'
import { Navigation, Autoplay, Mousewheel, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/mousewheel'
import 'swiper/css/pagination'

export default function AboutClients(data: ClientsSection): ReactElement {
  const { width: windowWidth } = useWindowSize() ?? {
    width: 0,
    height: 0,
  }

  return (
    <section className="container text-center !z-40 relative">
      <div className="max-w-2xl mx-auto">
        <h6 className="text-transparent bg-clip-text bifrost__gradient_green text-[18px] leading-[22.86px]">
          {data.subHeadline}
        </h6>
        <h4 className="md:text-head-4 text-[38px] leading-[38px] font-[275] my-5">
          {data.headline}
        </h4>
      </div>
      <div>
        {windowWidth >= 1024 ? (
          <div className="grid grid-cols-12 gap-16 mt-5">
            {data.clients.map((team) => (
              <div className="col-span-2 flex flex-col items-center justify-center">
                <div className="w-[90%]">
                  <SanityImg
                    className="md:object-contain object-cover lg:max-h-[110px] max-h-[35px] hover:scale-110 transition duration-300 cursor-pointer"
                    builder={imageUrlBuilder}
                    image={team.logo}
                    alt={team.logo?.alt || 'image'}
                    height={120}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <Swiper
              className="!py-10"
              modules={[Autoplay, Mousewheel, Navigation, Pagination]}
              spaceBetween={windowWidth <= 960 ? 20 : 40}
              centeredSlides
              loop
              slidesPerView={Math.ceil(windowWidth / 250)}
              loopedSlides={data.clients.length}
              mousewheel={{ forceToAxis: true }}
              autoplay={{ delay: 0 }}
              speed={windowWidth * 5}
              pagination={{
                dynamicBullets: true,
                clickable: true,
              }}
            >
              {data.clients.map((team) => (
                <SwiperSlide key={team._key}>
                  <div className="flex justify-center items-center">
                    <SanityImg
                      className=""
                      builder={imageUrlBuilder}
                      image={team.logo}
                      alt={team.logo?.alt || 'image'}
                      height={50}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  )
}
