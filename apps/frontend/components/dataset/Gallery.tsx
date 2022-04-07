import React, { useState } from 'react'
import { SanityImage, SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'

interface GalleryProps {
  images: SanityImage[]
}

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const [selectedImg, setSelectedImg] = useState(images[0])

  const [highlightImageSize, setHeightlightImageSize] = useState(600)

  return (
    <section className="grid grid-cols-12 gap-4 pt-36 ">
      <div
        className="col-span-8 rounded-[10px] overflow-hidden"
        style={{ height: highlightImageSize }}
      >
        <SanityImg
          className="h-full w-full object-cover justify-center"
          builder={imageUrlBuilder}
          image={selectedImg}
          width={600}
        />
      </div>
      <div className="col-span-4 grid grid-cols-2 gap-3 h-[600px] overflow-y-auto">
        {[...images, ...images].map((img) => (
          <div
            className="overflow-hidden rounded-[10px] cursor-pointer h-full w-full"
            style={{ height: highlightImageSize / 3 - 10 }}
            onClick={() => setSelectedImg(img)}
          >
            <SanityImg
              className="h-full w-full object-cover"
              builder={imageUrlBuilder}
              image={img}
              width={200}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
