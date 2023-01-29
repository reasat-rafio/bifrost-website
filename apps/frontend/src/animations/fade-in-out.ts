import { Variants } from 'framer-motion'

// const EASE = [0.16, 1, 0.3, 1]

export function VFadeInOut({
  duration = 0.5,
  delay = 0,
  flip = false,
}: {
  duration?: number
  delay?: number
  flip?: boolean
} = {}): Variants {
  return {
    from: {
      opacity: 0,
      x: flip ? 15 : -15,
      transition: {
        duration: duration,
        type: 'tween',
        ease: 'anticipate',
      },
    },
    to: {
      opacity: 1,
      x: 0,
      transition: {
        delay: delay,
        duration: duration,
        type: 'tween',
        ease: 'anticipate',
      },
    },
    exit: {
      opacity: 0,
      x: flip ? 10 : -10,
      transition: {
        duration: duration,
        type: 'tween',
        ease: 'anticipate',
        delay: delay,
      },
    },
  }
}

export function VFadeInOutContainer(duration = 0.05): Variants {
  return {
    to: {
      transition: {
        staggerChildren: duration,
      },
    },
  }
}
