import { Preview } from 'components/Preview'
import { motion } from 'framer-motion'
import { DemoSection } from 'lib/types'
import { ReactElement, useRef } from 'react'

export default function HomeDemo({ previews, headline }: DemoSection): ReactElement {
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
        className="container sticky top-[12%] bottom-[7%]  h-[91vh]  px-[40px] block flex-col justify-center items-center overflow-hidden"
        ref={stickySectionRef}
      >
        <div className="text-center text-head-1 pt-10">{headline}</div>

        <motion.div
          animate={{
            transition: { ease: 'easeInOut', duration: 0.05 },
          }}
          className="h-[80%] justify-around items-center"
        >
          <div
            className="z-0 overflow-hidden h-full w-full mt-[2rem]"
            style={{
              willChange: `transform`,
              transformStyle: `preserve-3d`,
            }}
          >
            {previews.map((previewItem, index) => (
              <Preview
                item={previewItem}
                index={index}
                key={previewItem._createdAt}
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
