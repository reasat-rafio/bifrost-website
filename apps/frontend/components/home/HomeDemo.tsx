import { Preview } from 'components/Preview'
import { motion } from 'framer-motion'
import { DemoSection } from 'lib/types'
import { ReactElement, useRef } from 'react'

export default function HomeDemo({ previews }: DemoSection): ReactElement {
  const previewRef = useRef<HTMLDivElement>(null)
  const stickySectionRef = useRef<HTMLDivElement>(null)

  return (
    <section
      data-element="background"
      className="relative top-0 flex max-h-[6000px] py-section justify-center items-start !transition duration-300 ease-in-out"
      style={{
        willChange: 'background',
        minHeight: `${previews.length + 1}00vh`,
      }}
      ref={previewRef}
    >
      <div
        className="md:container w-full px-0 sticky lg:top-[20%] top-[30%] h-[100vh] block flex-col justify-center items-center overflow-hidden"
        ref={stickySectionRef}
      >
        <motion.div
          animate={{
            transition: { ease: 'easeInOut', duration: 0.05 },
          }}
          className="h-full relative"
        >
          <div
            className="z-0 relative flex items-start justify-center overflow-hidden h-full w-full"
            style={{
              willChange: `transform`,
              transformStyle: `preserve-3d`,
            }}
          >
            {previews.map((previewItem, index) => (
              <Preview
                item={previewItem}
                index={index}
                key={previewItem.assetId}
                rootRef={previewRef}
                length={previews.length + 1}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
