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
    window.addEventListener('scroll', () => isOpen && setOpen(false))
    return window.removeEventListener('scroll', () => isOpen && setOpen(false))
  }, [])

  return (
    <div className={`relative z-20  ${isOpen ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}>
      <motion.div
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={transition}
        className={clsx(
          'fixed top-0 left-0 right-0 bottom-0 bg-[#000000ed]',
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setOpen(false)}
      />

      <motion.div
        layout
        transition={transition}
        onClick={() => setOpen(!isOpen)}
        className={clsx(containerClassName, isOpen ? 'fixed w-auto h-auto m-auto' : '')}
      >
        <SanityImg
          className={clsx(className)}
          height={isOpen ? height : height + height / 20}
          image={image}
          builder={imageUrlBuilder}
        />
      </motion.div>
    </div>
  )
}
