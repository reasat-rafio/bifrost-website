import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { SanityImage, SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'

interface LightboxImageProps {
  containerClassName?: string
  className?: string
  image: SanityImage
  height?: number
  wdith?: number
}

const transition = {
  type: 'spring',
  damping: 25,
  stiffness: 120,
}

export const LightboxImage: React.FC<LightboxImageProps> = ({
  className,
  containerClassName,
  image,
  height,
}) => {
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () => setOpen(false))
    return window.removeEventListener('scroll', () => setOpen(false))
  }, [])

  return (
    <div
      className={clsx(
        'relative 2xl:min-h-[485px] xl:min-h-[400px] lg:min-h-[350px] md:min-h-[380px] sm:min-h-[300px] min-h-[220px] w-full',
        isOpen ? 'cursor-zoom-out z-20' : 'cursor-zoom-in z-0',
      )}
    >
      <motion.div
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={transition}
        className={clsx(
          'fixed top-0 left-0 right-0 bottom-0 bg-[#000000ed]',
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setOpen(false)}
      />
      <div
        onClick={() => setOpen(!isOpen)}
        className={clsx(
          'flex  ',
          isOpen && 'fixed top-0 left-0 h-screen w-screen justify-center items-center ',
        )}
      >
        <motion.div
          layout
          transition={transition}
          className={clsx(
            containerClassName,
            isOpen ? 'fixed w-auto h-auto' : 'absolute h-full w-full translate-x-0 translate-y-0',
          )}
        >
          <SanityImg
            className={clsx(className, isOpen && 'w-full h-full ')}
            height={isOpen ? height : height + height / 20}
            image={image}
            builder={imageUrlBuilder}
          />
        </motion.div>
      </div>
    </div>
  )
}
