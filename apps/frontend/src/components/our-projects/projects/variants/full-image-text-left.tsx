import { Button } from 'components/ui/button'
import { motion } from 'framer-motion'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'
import { ProjectProps } from '..'

export const FullImageTextLeft: React.FC<ProjectProps> = ({
  _key,
  ctaButton,
  description,
  image,
  title,
}) => {
  return (
    <motion.article className="h-[60vh] relative" key={_key}>
      <motion.figure
        key={_key}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, type: 'tween' }}
        className="w-full h-full overflow-hidden"
      >
        <SanityImg
          className="w-full h-full | object-cover rounded-2xl"
          builder={imageUrlBuilder}
          width={1000}
          image={image}
          alt={image?.alt}
        />
      </motion.figure>

      <motion.section
        key={_key}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, type: 'tween' }}
        className="flex justify-start"
      >
        <div className="max-w-xl | flex flex-col xl:space-y-6 md:space-y-4 space-y-3 | xl:p-7 md:p-5 p-3 | border-gray/10 border | 2xl:-translate-y-1/2 lg:-translate-y-[70%] sm:-translate-y-1/2 -translate-y-[20%] | lg:ml-[5%] lg:mr-0 ml-[2.5%] mr-[2.5%] | background__blur rounded-primary | transition-transform duration-300 ease-in-out">
          <h6 className="xl:text-head-4 md:text-head-md text-head-4-mobile | leading-none | font-primary">
            {title}
          </h6>
          <p className="md:text-body-1 text-body-1-mobile | font-light">{description}</p>
          {!!ctaButton && (
            <div className="z-20 relative">
              <Button
                className="!w-fit md:px-10 md:py-2 px-8 py-2"
                variant="secondary"
                type="href"
                href={ctaButton?.href ?? ''}
              >
                {ctaButton.title}
              </Button>
            </div>
          )}
        </div>
      </motion.section>
    </motion.article>
  )
}
