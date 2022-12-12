import { SanityImage, SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'src/utils/sanity'
import { MouseEvent, useMemo } from 'react'
import clsx from 'clsx'
import { motion, Variants } from 'framer-motion'
import { useWindowSize } from 'lib/hooks'

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

const ContainerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
}

export const Perks: React.FC<PerksProps> = ({ header, perks }) => {
  const windowWidth = useWindowSize()?.width ?? 0
  const imageWidth = useMemo(
    () => (windowWidth >= 1280 ? 400 : windowWidth > 768 ? 300 : 250),
    [windowWidth],
  )

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
    <section className="container">
      <motion.h3
        initial={{ scale: 0.7, opacity: 0, y: 100 }}
        whileInView={{
          scale: 1,
          opacity: 1,
          y: 0,
        }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, type: 'tween', ease: 'easeInOut' }}
        className="max-w-4xl | xl:text-head-2 md:text-head-md text-head-4-mobile | leading-none | font-primary text-center | mx-auto mb-14"
      >
        {header}
      </motion.h3>

      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={ContainerVariants}
        onMouseMove={onMouseMoveAction}
        className={clsx('cards | grid grid-cols-12 gap-5')}
      >
        {perks.map((data) => (
          <Perk key={data._key} imageWidth={imageWidth} {...data} />
        ))}
      </motion.div>
    </section>
  )
}

const ItemVariants: Variants = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
}
interface PerkProps extends Perk {
  imageWidth: number
}
const Perk: React.FC<PerkProps> = ({ image, subtitle, title, imageWidth }) => {
  return (
    <motion.article
      variants={ItemVariants}
      transition={{ type: 'tween', duration: 0.7 }}
      className={clsx('card | xl:col-span-4 md:col-span-6 col-span-12 | h-[400px]')}
    >
      <div className="card-content | space-y-3 | p-3 | font-light">
        <figure className="h-[220px]">
          <SanityImg
            className="h-full w-full object-cover rounded"
            image={image}
            builder={imageUrlBuilder}
            alt={image.alt}
            width={imageWidth}
          />
        </figure>
        <h6 className="text-body-2">{title}</h6>
        <p className="text-body-1-mobile opacity-70">{subtitle}</p>
      </div>
    </motion.article>
  )
}
