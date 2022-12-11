import { SanityImage, SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'src/utils/sanity'
import { MouseEvent } from 'react'
import clsx from 'clsx'

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
  const onMouseMoveAction = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    const cards = document.getElementsByClassName('card') as HTMLCollectionOf<HTMLDivElement>

    for (const card of Array.from(cards)) {
      const rect = card.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top

      card.style.setProperty('--mouse-x', `${x}px`)
      card.style.setProperty('--mouse-y', `${y}px`)
    }
  }

  return (
    <section className="container | pb-16">
      <h3 className="max-w-4xl | xl:text-head-2 md:text-head-md text-head-4-mobile | leading-none | font-primary text-center | mx-auto mb-14">
        {header}
      </h3>

      <div onMouseMove={onMouseMoveAction} className={clsx('cards | grid grid-cols-12 gap-5')}>
        {perks.map((data) => (
          <Perk key={data._key} {...data} />
        ))}
      </div>
    </section>
  )
}

const Perk: React.FC<Perk> = ({ image, subtitle, title }) => {
  // const windowWidth = useWindowSize()?.width ?? 0

  return (
    <article className={clsx('card | xl:col-span-4 md:col-span-6 col-span-12 | h-[400px]')}>
      <div className="card-content | space-y-3 | p-3 | font-light">
        <figure className="h-[220px]">
          <SanityImg
            className="h-full w-full object-cover rounded"
            image={image}
            builder={imageUrlBuilder}
            alt={image.alt}
            width={400}
          />
        </figure>
        <h6 className="text-body-2">{title}</h6>
        <p className="text-body-1-mobile opacity-70">{subtitle}</p>
      </div>
    </article>
  )
}
