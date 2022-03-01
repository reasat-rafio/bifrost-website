import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { ReasonSection } from 'lib/aboutUsTypes'
import { ReactElement, useState } from 'react'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder, PortableText } from 'utils/sanity'

export default function AboutReason(data: ReasonSection): ReactElement {
  const [active, setActive] = useState(0)

  console.log({ active, data }, data.reasons[active])

  return (
    <div className="relative overflow-y-clip">
      <div
        className={clsx(
          'container lg:pt-16 z-10 md:space-y-8 space-y-4 relative min-h-[100vh] overflow-y-clip',
          'text-white',
        )}
      >
        <div className="bg-clip-text bifrost__gradient_green text-transparent uppercase lg:text-head-6 text-head-6">
          {data.subHeadline}
        </div>
        <div className="grid lg:grid-cols-2 grid-cols-1 space-y-4">
          <div className="col-span-1 lg:text-head-4 text-[38px] lead-[43.7px] font-[275] ">
            {data.headline}
          </div>
          <div className="col-span-1">
            <div className="flex relative lg:justify-end items-end justify-around lg:w-[60%] w-full right-0 mr-0 ml-auto">
              {data.reasons.map((reason, index) => (
                <div key={reason.title} className="w-full">
                  <div
                    className="lg:my-0 flex w-full items-center justify-center font-bold hover:opacity-75 relative z-10 py-2"
                    onClick={(ev) => {
                      ev.preventDefault()
                      setActive(index)
                    }}
                  >
                    <span
                      className={clsx(
                        active === index && 'text-transparent bg-clip-text bifrost__gradient_green',
                      )}
                    >
                      {reason.title}
                    </span>
                    {active === index && (
                      <motion.div
                        layout
                        className={clsx(
                          'w-full h-[0.2em] left-0 absolute bottom-[-4px] z-10',
                          active === index && 'bifrost__gradient_green',
                        )}
                        layoutId="underline"
                        initial={false}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </div>
                  <div
                    className={clsx(
                      'w-full h-[0.2em] left-0 absolute bottom-[-4px] z-0 bg-[#1E2531]',
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <AnimatePresence>
          {data.reasons[active] && (
            <motion.div
              key={data.reasons[active].title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-12"
            >
              <div className="col-span-6 bifrost__transparent_card rounded-l-lg !rounded-r-none p-8 flex flex-col space-y-4">
                <div className="text-[42px] leading-[42px] font-[275]">
                  {data.reasons[active].headline}
                </div>
                <div className="text-body-1 opacity-70">
                  <PortableText blocks={data.reasons[active].body} />
                </div>
              </div>
              <div className="col-span-6">
                <div className="w-full">
                  <SanityImg
                    className="w-full h-full lg:object-cover object-contain rounded-r-lg"
                    builder={imageUrlBuilder}
                    image={data.reasons[active].image}
                    height={500}
                    alt={data.reasons[active].image?.alt || 'image'}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
