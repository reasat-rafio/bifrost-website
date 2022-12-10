import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { SanityImage, SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'src/utils/sanity'
import { motion } from 'framer-motion'
import { useWindowSize } from 'src/lib/hooks'
import { LightboxImage } from 'src/components/ui/LightboxImage'

interface GalleryProps {
  images: SanityImage[]
}
const spring = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
}

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const windowHeight = useWindowSize()?.height ?? 0
  const windowWidth = useWindowSize()?.width ?? 0

  const [selectedImg, setSelectedImg] = useState(images[0])

  const [highlightImageSize, setHeightlightImageSize] = useState(0)

  useEffect(() => {
    setHeightlightImageSize((windowHeight / 100) * 65)
  }, [windowHeight])

  return (
    <section className="grid grid-cols-12 gap-5 pt-36 ">
      <motion.div
        key={selectedImg._id}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        className="2xl:col-span-8 xl:col-span-9 col-span-12 rounded-[10px] overflow-hidden"
        style={{ height: windowWidth >= 1024 ? highlightImageSize : 'auto' }}
      >
        <LightboxImage
          rootClass=""
          className="h-full w-full object-cover justify-center "
          image={selectedImg}
          wdith={600}
          style={{ height: windowWidth >= 1024 ? highlightImageSize : 'auto' }}
        />
      </motion.div>
      <motion.div
        layout
        className="2xl:col-span-4 xl:col-span-3 col-span-12 grid grid-cols-12  gap-3 overflow-y-auto xl:pr-4"
        id="gallery"
        style={{ height: windowWidth >= 1280 ? highlightImageSize : 'auto' }}
      >
        {images.map((img) => (
          <motion.div
            className={clsx(
              'overflow-hidden rounded-[10px] cursor-pointer h-full w-full relative col-span-4 xl:col-span-12 2xl:col-span-6',
            )}
            style={{ height: windowWidth >= 1024 ? highlightImageSize / 3 - 10 : 'auto' }}
            onClick={() => setSelectedImg(img)}
            transition={spring}
          >
            <motion.div className="h-full w-full overflow-hidden">
              <SanityImg
                className="h-full w-full object-cover hover:scale-110 transition-all duration-300"
                builder={imageUrlBuilder}
                image={img}
                width={200}
              />
            </motion.div>

            {img._id === selectedImg._id && (
              <motion.div
                layoutId="outline"
                className="absolute top-0 left-0 right-0 bottom-0 border-4 h-full w-full rounded-[10px]"
                initial={false}
                animate={{ borderColor: '#7187ff' }}
                transition={spring}
              />
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
