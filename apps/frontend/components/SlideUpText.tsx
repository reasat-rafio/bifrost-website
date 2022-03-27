import { ReactElement, RefObject } from 'react'
import { motion } from 'framer-motion'

export default function SlideUp({
  text,
  divRef,
  rootMargin = '-50px',
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
            initial={{ opacity: 0, y: '250%', x: -20, skew: 20 }}
            whileInView={{ opacity: 1, y: 0, x: 0, skew: 0 }}
            viewport={{ margin: rootMargin, once: false, root: divRef }}
            transition={{ type: 'tween', duration: 3, ease: [0, 1.2, 0.1, 0.9] }}
          >
            {line}
          </motion.h3>
        </motion.div>
      ))}
    </div>
  )
}
