import { Description } from 'components/ui/description'
import { Heading } from 'components/ui/heading'
import { ExampleProps, ExamplesProps } from 'lib/@types/use-case-types'
import { useWindowSize } from 'react-use'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'
import { MouseEvent, useMemo } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { ScaleUpChild, ScaleUpParent } from 'animations/scale-up'

const Examples: React.FC<ExamplesProps> = ({ examples, description, title }) => {
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
    <section className="z-10 relative xl:py-40 lg:py-20 py-16">
      <div className="container md:space-y-12 space-y-6">
        <header className="grid lg:grid-cols-2 gap-5 grid-cols-1">
          <Heading>{title}</Heading>
          <Description>{description}</Description>
        </header>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={ScaleUpParent}
          onMouseMove={onMouseMoveAction}
          className={clsx('cards | grid grid-cols-12 gap-5')}
        >
          {examples.map((data) => (
            <Example key={data._key} imageWidth={imageWidth} {...data} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Examples

interface PerkProps extends ExampleProps {
  imageWidth: number
}
const Example: React.FC<PerkProps> = ({ image, description, title, imageWidth }) => {
  return (
    <motion.article
      variants={ScaleUpChild}
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
        <p className="text-body-1-mobile opacity-70">{description}</p>
      </div>
    </motion.article>
  )
}
