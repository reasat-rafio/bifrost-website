import { Description } from 'components/ui/description'
import { Heading } from 'components/ui/heading'
import { Title } from 'components/ui/title'
import { AssetElement } from 'lib/@types/landing-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'
import 'swiper/css'
import { Video } from './video'

interface OutputsProps {
  type: string
  assets: AssetElement[]
  description: string
  heading: string
  title: string
}

export const Outputs: React.FC<OutputsProps> = ({ assets, title, heading, description }) => {
  return (
    <section className="relative z-10 | container mx-auto lg:py-32 py-20 | border-b border-secondary/80">
      <div className="space-y-8 | font-light">
        <Title>{title}</Title>
        <Heading>{heading}</Heading>
        <Description>{description}</Description>
      </div>

      <div className="mt-10">
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
        >
          {assets.map(({ _key, alt, mp4, asset, webm }) => (
            <SwiperSlide key={_key} className="!w-auto !h-[300px]">
              {!!webm || !!mp4 ? (
                <Video mp4={mp4} webm={webm} />
              ) : (
                <SanityImg
                  className="object-cover rounded-[15px]"
                  height={300}
                  builder={imageUrlBuilder}
                  image={asset}
                  alt={alt}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
