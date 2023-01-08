import { motion } from 'framer-motion'

export const OnScrollBlurEffect: React.FC<{ ratio: number }> = ({ ratio }) => {
  return (
    <motion.div
      animate={{
        opacity: Math.min(ratio * 2, 1),
      }}
      className="absolute top-0 left-0 bg-black/10 h-full w-full z-20 backdrop-blur-xl pointer-events-none"
    />
  )
}
