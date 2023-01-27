import { Variants } from 'framer-motion'

export const ScaleUpParent: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

export const ScaleUpChild: Variants = {
  visible: {
    opacity: 1,
    scale: 1,
  },
  hidden: {
    opacity: 0,
    scale: 0,
  },
}
