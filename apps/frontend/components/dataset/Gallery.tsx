import clsx from 'clsx'
import React, { useState } from 'react'
import { SanityImage, SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'
import { AnimateSharedLayout, motion } from 'framer-motion'

interface GalleryProps {
  images: SanityImage[]
}
const spring = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
}

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [selectedImg, setSelectedImg] = useState(images[0])

  const [highlightImageSize, setHeightlightImageSize] = useState(600)

  return (
    <section className="grid grid-cols-12 gap-5 pt-36 ">
      <motion.div
        key={selectedImg._id}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        className="col-span-8 rounded-[10px] overflow-hidden"
        style={{ height: highlightImageSize }}
      >
        <SanityImg
          className="h-full w-full object-cover justify-center"
          builder={imageUrlBuilder}
          image={selectedImg}
          width={600}
        />
      </motion.div>
      <AnimateSharedLayout>
        <div
          className="col-span-4 grid grid-cols-2 gap-3 h-[600px] overflow-y-auto pr-4"
          id="gallery"
        >
          {[...images].map((img) => (
            <div
              className={clsx(
                'overflow-hidden rounded-[10px] cursor-pointer h-full w-full relative',
              )}
              style={{ height: highlightImageSize / 3 - 10 }}
              onClick={() => setSelectedImg(img)}
            >
              <SanityImg
                className="h-full w-full object-cover"
                builder={imageUrlBuilder}
                image={img}
                width={200}
              />

              {img._id === selectedImg._id && (
                <motion.div
                  layoutId="outline"
                  className="absolute top-0 left-0 right-0 bottom-0 border-4 h-full w-full rounded-[10px]"
                  initial={false}
                  animate={{ borderColor: '#7187ff' }}
                  transition={spring}
                />
              )}
            </div>
          ))}
        </div>
      </AnimateSharedLayout>
    </section>
  )
}
