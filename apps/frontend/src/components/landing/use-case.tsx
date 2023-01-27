import { Description } from 'components/ui/description'
import { Heading } from 'components/ui/heading'
import { Title } from 'components/ui/title'
import { IUseCase } from 'lib/@types/landing-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'
import Link from 'next/link'
import 'swiper/css'

interface UseCaseProps {
  type: string
  description: string
  heading: string
  title: string
  useCases: IUseCase[]
}

export const UseCase: React.FC<UseCaseProps> = ({ title, heading, description, useCases }) => {
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
          {useCases.map(({ _key, image, name, url }) => (
            <SwiperSlide key={_key} className="!w-auto !h-[300px] relative">
              {!!url ? (
                <Link href={url}>
                  <a>
                    <SanityImg
                      className="object-cover rounded-[15px]"
                      height={300}
                      builder={imageUrlBuilder}
                      image={image}
                      alt={image.alt}
                    />
                  </a>
                </Link>
              ) : (
                <SanityImg
                  className="object-cover rounded-[15px]"
                  height={300}
                  builder={imageUrlBuilder}
                  image={image}
                  alt={image.alt}
                />
              )}
              <p className="absolute bottom-10 left-1/2 drop-shadow -translate-x-1/2">{name}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
