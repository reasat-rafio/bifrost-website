import { GradientTitle } from 'src/components/common/GradientTitle'
import { Description } from 'src/components/ui/Description'
import { Header } from 'src/components/ui/Header'
import { FeaturesProps } from 'lib/@types/use-case-types'
import { useWindowSize } from 'react-use'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'src/utils/sanity'
import { Button } from 'components/ui/button'

const UseCaseFeatures: React.FC<FeaturesProps> = ({
  description,
  heading,
  title,
  ctaButton,
  features,
}) => {
  const { width: windowWidth } = useWindowSize() ?? {
    width: 0,
    height: 0,
  }

  return (
    <section className="z-10 | container | grid lg:grid-cols-2 grid-cols-1 | gap-8 xl:pb-44 lg:pb-20 pb-14">
      <div className=" ifrost__transparent__card | flex flex-col justify-center | border-[#4e6181]/30 rounded-[15px] border | xl:p-14 md:p-6 p-4 md:space-y-6 space-y-2">
        <GradientTitle>{heading}</GradientTitle>
        <Header>{title}</Header>
        <Description>{description}</Description>

        {!!ctaButton && (
          <div>
            <Button type="href" href={ctaButton.href ?? '/'}>
              {ctaButton.title}
            </Button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {features.map((item) => {
          return (
            <div className="bifrost__transparent__card | border-[#4e6181]/20 border rounded-[15px] | group">
              <figure className="w-full | flex justify-center | overflow-hidden rounded-[8px]">
                <SanityImg
                  className="object-cover group-hover:scale-110 transition-all duration-300"
                  builder={imageUrlBuilder}
                  image={item.image}
                  alt={item.image?.alt || 'image'}
                  height={windowWidth >= 768 ? 250 : 150}
                />
              </figure>
              <p className="md:text-body-2 text-body-1-mobile text-center py-3">{item.title}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default UseCaseFeatures
