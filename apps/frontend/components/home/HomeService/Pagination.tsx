import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'

interface PaginationProps {
  index: number
  current: number
  setItem: (index: number) => void
  isScroll: boolean
}

export const Pagination: React.FC<PaginationProps> = ({ index, current, isScroll, setItem }) => {
  return (
    <>
      {index === current ? (
        <motion.div
          whileHover={{
            scale: 1.25,
            transition: { ease: 'easeInOut', duration: 0.05 },
          }}
          style={{
            background: 'linear-gradient(90deg, #F8E9FF 0%, #E4ACFF 35.3%, #7187FF 102.69%)',
            padding: '2px',
          }}
          className="rounded-full"
        >
          <motion.div
            className="p-1 rounded-full cursor-pointer"
            style={{
              backgroundColor: '#FFF',
              border:
                '1px solid linear-gradient(90deg, #F8E9FF 0%, #E4ACFF 35.3%, #7187FF 102.69%)',
            }}
          />
        </motion.div>
      ) : (
        <motion.div
          whileHover={{
            scale: 1.25,
            transition: { ease: 'easeInOut', duration: 0.05 },
          }}
          style={{
            background: 'transparent',
            padding: '2px',
          }}
          className="rounded-full z-0 cursor-pointer"
          onClick={() => {
            if (!isScroll) setItem(index)
          }}
        >
          <motion.div
            whileHover={{
              scale: 1.25,
              transition: { ease: 'easeInOut', duration: 0.05 },
            }}
            className={clsx(current === index && 'opacity-0', 'p-1 rounded-full')}
            style={{ backgroundColor: '#757AAC' }}
            key={index}
          />
        </motion.div>
      )}
    </>
  )
}
