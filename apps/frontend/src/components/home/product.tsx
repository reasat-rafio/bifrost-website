import { GradientTitle } from 'src/components/common/GradientTitle'
import { Description } from 'src/components/ui/Description'
import { Header } from 'src/components/ui/Header'
import { ProductSection } from 'src/lib/@types/landingTypes'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'src/utils/sanity'
import { useWindowSize } from 'lib/hooks'
import { Button } from 'components/ui/button'

export const Product: React.FC<ProductSection> = ({
  title,
  subtitle,
  description,
  ctaButton,
  images,
}) => {
  const windowWidth = useWindowSize()?.width ?? 0

  return (
    <section className="container z-10 | xl:py-40 lg:py-20 py-16 | text-white">
      <div className="relative grid lg:grid-cols-2 grid-cols-1 | space-y-5 lg:space-y-0 xl:space-x-12 lg:space-x-8 ">
        <div className="grid grid-cols-2 grid-rows-2 | xl:gap-4 gap-3">
          {images.map((image) => (
            <SanityImg
              className="w-full h-full lg:max-h-[262px] | object-cover rounded-[8px] aspect-square"
              key={image?.alt}
              builder={imageUrlBuilder}
              image={image}
              alt={image?.alt}
              height={windowWidth >= 1280 ? 550 : windowWidth >= 640 ? 400 : 200}
            />
          ))}
        </div>
        <div className="flex flex-col | 2xl:p-14 lg:p-8 p-5 2xl:space-y-6 space-y-3 | border border-[#4e6181]/30 bifrost__transparent__card">
          <header className="flex flex-col space-y-3">
            <GradientTitle>{title}</GradientTitle>
            <Header>{subtitle}</Header>
          </header>
          <Description className="!pt-3">{description}</Description>
          {!!ctaButton && (
            <Button type="href" href={ctaButton.href}>
              {ctaButton.title}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
