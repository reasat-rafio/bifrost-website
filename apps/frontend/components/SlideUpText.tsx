import { ReactElement, RefObject } from 'react'
import { motion } from 'framer-motion'

export default function SlideUp({
  text,
  divRef,
  rootMargin = '-20px',
}: {
  text?: string
  blocks?: any[]
  heroTitle?: boolean
  divRef: RefObject<HTMLDivElement>
  rootMargin?: string
}): ReactElement {
  const lines = text?.split(/\r\n|\n/)

  return (
    <div>
      {lines?.map((line: string) => (
        <motion.div key={line}>
          <motion.h3
            initial={{ opacity: 0, y: '150%' }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: rootMargin, once: false, root: divRef }}
            transition={{ type: 'tween', duration: 1, ease: 'easeOut' }}
          >
            {line}
          </motion.h3>
        </motion.div>
      ))}
    </div>
  )
}
