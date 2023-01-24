import { ClientsSection } from 'lib/@types/about-us-types'
import { useWindowSize } from 'react-use'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'
import { Navigation, Autoplay, Mousewheel, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/mousewheel'
import 'swiper/css/pagination'
import { GradientTitle } from 'src/components/common/GradientTitle'
import { Header } from 'components/ui/heading'
import { motion } from 'framer-motion'
import { SlideUpChild, SlideUpParent } from 'animations/slide-up'

export const Client: React.FC<ClientsSection> = ({ clients, headline, subHeadline }) => {
  const { width: windowWidth } = useWindowSize() ?? {
    width: 0,
    height: 0,
  }

  return (
    <section className="container text-center !z-10 relative | mb-36">
      <motion.header
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ type: 'tween', duration: 1 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto mb-5"
      >
        <GradientTitle className="mx-auto mb-5">{headline}</GradientTitle>
        <Header>{subHeadline}</Header>
      </motion.header>
      <div>
        {windowWidth >= 1024 ? (
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={SlideUpParent(0.15)}
            className="grid grid-cols-12 gap-16 py-5"
          >
            {clients.map((team) => (
              <motion.div
                key={team._key}
                variants={SlideUpChild()}
                className="col-span-2 flex flex-col items-center justify-center"
              >
                <div className="w-[90%]">
                  <SanityImg
                    height={windowWidth >= 1280 ? 200 : 150}
                    className="md:object-contain object-cover lg:max-h-[110px] max-h-[35px] hover:scale-110 transition duration-300 cursor-pointer"
                    image={team.logo}
                    builder={imageUrlBuilder}
                    alt={team.logo?.alt || 'image'}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
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
                <SwiperSlide className="my-auto" key={team._key}>
                  <div className="flex justify-center items-center">
                    <SanityImg
                      builder={imageUrlBuilder}
                      image={team.logo}
                      alt={team.logo?.alt || 'image'}
                      height={windowWidth >= 640 ? 100 : 60}
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
