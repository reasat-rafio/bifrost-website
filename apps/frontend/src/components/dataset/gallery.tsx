import React, { useState } from 'react'
import { SanityImage, SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'src/utils/sanity'
import { motion } from 'framer-motion'
import { useWindowSize } from 'src/lib/hooks'
interface GalleryProps {
  images: SanityImage[]
}

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const windowWidth = useWindowSize()?.width ?? 0
  const [selectedImg, setSelectedImg] = useState(images[0])

  return (
    <section className="grid grid-cols-12 gap-5 pt-36">
      <motion.figure
        key={selectedImg._key}
        className="2xl:col-span-8 xl:col-span-9 col-span-12 | aspect-video max-h-[500px] | rounded-xl | overflow-hidden"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
      >
        <SanityImg
          image={selectedImg}
          className="h-full w-full object-cover"
          width={windowWidth >= 1280 ? 800 : windowWidth >= 768 ? 550 : 250}
          builder={imageUrlBuilder}
          alt={selectedImg.alt ?? 'image'}
        />
      </motion.figure>

      <motion.div className="xl:h-[500px] w-full | 2xl:col-span-4 xl:col-span-3 col-span-12 | grid 2xl:grid-cols-2 xl:grid-cols-1 grid-cols-2 | gap-3 xl:pr-4 overflow-y-auto | scrollbar-thin scrollbar-thumb-secondary">
        {images.map((image) => (
          <figure
            key={image._key}
            className="relative | cursor-pointer"
            onClick={() => setSelectedImg(image)}
          >
            <SanityImg
              className="h-full w-full object-cover rounded-xl aspect-video min-h-[100px]"
              builder={imageUrlBuilder}
              image={image}
              width={windowWidth >= 640 ? 350 : 200}
              alt={image.alt ?? 'image'}
            />
            {image._key === selectedImg._key && (
              <motion.div
                layoutId="outline"
                className="z-10 absolute top-0 left-0 border-[4px] border-neonBlue h-full w-full rounded-[10px]"
                initial={false}
                transition={{ type: 'tween', duration: 0.2, ease: 'easeInOut' }}
              />
            )}
          </figure>
        ))}
      </motion.div>
    </section>
  )
}
