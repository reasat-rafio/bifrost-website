import { ClientsSection } from 'lib/@types/aboutUsTypes'
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
import { GradientTitle } from 'components/common/GradientTitle'
import { Header } from 'components/ui/Header'

export default function AboutClients({
  clients,
  headline,
  subHeadline,
}: ClientsSection): ReactElement {
  const { width: windowWidth } = useWindowSize() ?? {
    width: 0,
    height: 0,
  }

  return (
    <section className="container text-center !z-40 relative">
      <header className="max-w-2xl mx-auto mb-5">
        <GradientTitle className="mx-auto mb-5">{subHeadline}</GradientTitle>
        <Header>{headline}</Header>
      </header>
      <div className="">
        {windowWidth >= 1024 ? (
          <div className="grid grid-cols-12 gap-16 py-5">
            {clients.map((team) => (
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
              loopedSlides={clients.length}
              mousewheel={{ forceToAxis: true }}
              autoplay={{ delay: 0 }}
              speed={windowWidth * 5}
              pagination={{
                dynamicBullets: true,
                clickable: true,
              }}
            >
              {clients.map((team) => (
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
