import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { SanityImage, SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'

interface LightboxImageProps {
  variant?: 'full' | 'auto'
  image: SanityImage
  height?: number
  width: number
  style?: any
}

const transition = {
  type: 'spring',
  damping: 25,
  stiffness: 120,
}

export const LightboxImage: React.FC<LightboxImageProps> = ({
  variant = 'auto',
  image,
  width,
  ...rest
}) => {
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => setOpen(false))
    return window.removeEventListener('scroll', () => setOpen(false))
  }, [])

  return (
    <div
      style={{
        aspectRatio:
          variant === 'auto'
            ? `${image.asset.metadata.dimensions.width} / ${image.asset.metadata.dimensions.height}`
            : '16 / 9',
      }}
      className={clsx(
        'relative max-h-[500px]',
        isOpen ? 'cursor-zoom-out z-20' : 'cursor-zoom-in z-0',
        variant === 'full' ? 'w-full' : 'w-auto',
      )}
      {...rest}
    >
      <BackDrop isOpen={isOpen} setOpen={setOpen} />
      <div
        onClick={() => setOpen(!isOpen)}
        className={clsx(
          isOpen && 'fixed top-0 left-0 h-screen w-screen justify-center items-center flex',
        )}
      >
        <motion.figure
          layout
          transition={transition}
          style={{
            aspectRatio:
              variant === 'auto'
                ? `${image.asset.metadata.dimensions.width} / ${image.asset.metadata.dimensions.height}`
                : '16 / 9',
          }}
          className={clsx('rounded-2xl overflow-hidden', isOpen && 'max-h-[70vh]')}
        >
          <SanityImg
            className="h-full w-full object-cover rounded-2xl"
            width={width}
            image={image}
            builder={imageUrlBuilder}
            alt={image.alt}
          />
        </motion.figure>
      </div>
    </div>
  )
}

const BackDrop: React.FC<{ isOpen: boolean; setOpen: Dispatch<SetStateAction<boolean>> }> = ({
  isOpen,
  setOpen,
}) => {
  return (
    <motion.div
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={transition}
      className={clsx(
        'fixed top-0 left-0 right-0 bottom-0 bg-[#000000ed]',
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
      )}
      onClick={() => setOpen(false)}
    />
  )
}
