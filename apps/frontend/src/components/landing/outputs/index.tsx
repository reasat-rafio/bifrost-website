import { Description } from 'components/ui/description'
import { Heading } from 'components/ui/heading'
import { Title } from 'components/ui/title'
import { AssetElement } from 'lib/@types/landing-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'
import { Video } from './video'
import { Section } from 'components/ui/section'
import { useWindowSize } from 'lib/hooks'
import { Autoplay, Keyboard, Mousewheel } from 'swiper'
import 'swiper/css/autoplay'
import 'swiper/css/keyboard'
import 'swiper/css'

interface OutputsProps {
  type: string
  assets: AssetElement[]
  description: string
  heading: string
  title: string
}

export const Outputs: React.FC<OutputsProps> = ({ assets, title, heading, description }) => {
  const windowWidth = useWindowSize()?.width ?? 0

  return (
    <Section>
      <div className="spacing_primary | font-light">
        <Title>{title}</Title>
        <Heading>{heading}</Heading>
        <Description>{description}</Description>
      </div>

      <div className="mt-10">
        <Swiper
          modules={[Autoplay, Mousewheel, Keyboard]}
          speed={700}
          grabCursor
          keyboard
          autoplay
          slidesPerView={'auto'}
          spaceBetween={30}
        >
          {assets.map(({ _key, alt, mp4, asset, webm }) => (
            <SwiperSlide key={_key} className="!w-fit lg:!h-[300px] sm:!h-[250px] !h-[200px]">
              {!!asset ? (
                <SanityImg
                  className="object-cover h-full w-full rounded-[15px]"
                  height={windowWidth >= 1024 ? 300 : windowWidth >= 640 ? 250 : 220}
                  builder={imageUrlBuilder}
                  image={asset}
                  alt={alt}
                />
              ) : (
                <Video mp4={mp4} webm={webm} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Section>
  )
}
