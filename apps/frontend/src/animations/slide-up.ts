import { Variants } from 'framer-motion'

export function SlideUpParent(duration = 0.3) {
  return {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: duration,
      },
    },
  }
}

export function SlideUpChild(duration = 0.7): Variants {
  return {
    initial: { opacity: 0, y: 100 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { type: 'tween', duration },
    },
  }
}
