import { useWindowSize } from 'src/lib/hooks'
import { SanityImage, SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'src/utils/sanity'

interface Perk {
  _key: string
  _type: string
  image: SanityImage
  subtitle: string
  title: string
}
interface PerksProps {
  type: string
  header: string
  perks: Perk[]
}

export const Perks: React.FC<PerksProps> = ({ header, perks }) => {
  return (
    <section className="container | pb-16">
      <h3 className="lg:text-head-2 text-[40px] leading-[40px] font-[275] text-center max-w-4xl mx-auto | mb-14">
        {header}
      </h3>

      <div className="grid grid-cols-12 gap-5">
        {perks.map((data) => (
          <Perk key={data._key} {...data} />
        ))}
      </div>
    </section>
  )
}

const Perk: React.FC<Perk> = ({ image, subtitle, title }) => {
  const windowWidth = useWindowSize()?.width ?? 0

  return (
    <article className="xl:col-span-4 md:col-span-6 col-span-12 group bifrost__transparent__card border border-[#4e6181]/30 p-3 rounded-[8px] lg:space-y-4 space-y-2">
      <figure className="w-full flex justify-center h-[230px] overflow-hidden rounded-[14px]">
        <SanityImg
          className="object-cover w-full h-full group-hover:scale-110 transition-all duration-300"
          builder={imageUrlBuilder}
          image={image}
          alt={image?.alt || 'image'}
          height={windowWidth >= 768 ? 250 : 150}
        />
      </figure>
      <h6 className="lg:text-body-2">{title}</h6>
      <p className="lg:text-[14px] lg:leading-[24px]">{subtitle} </p>
    </article>
  )
}
