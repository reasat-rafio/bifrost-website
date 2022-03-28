import clsx from 'clsx'
import { GradientTitle } from 'components/common/GradientTitle'
import { Header } from 'components/ui/Header'
import { motion } from 'framer-motion'
import { ReasonSection } from 'lib/@types/aboutUsTypes'
import { ReactElement, useState } from 'react'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder, PortableText } from 'utils/sanity'

export default function AboutReason({
  headline,
  reasons,
  subHeadline,
}: ReasonSection): ReactElement {
  const [active, setActive] = useState(0)

  return (
    <section className="mx-[1.6rem]">
      <div className=" 3xl:max-w-6xl 2xl:max-w-5xl max-w-5xl mx-auto lg:pt-16 z-10 relative xl:mb-40 lg:mb-20 mb-16 flex flex-col space-y-10">
        <GradientTitle>{subHeadline}</GradientTitle>
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:space-y-0 space-y-4 ">
          <Header>{headline}</Header>
          <div className="col-span-1 lg:pb-0 pb-5">
            <div className="flex relative lg:justify-end items-end justify-around lg:w-[60%] w-full right-0 mr-0 ml-auto">
              {reasons.map((reason, index) => (
                <div key={reason.title} className="w-full">
                  <div
                    className="lg:my-0 flex w-full items-center justify-center font-bold hover:opacity-75 relative z-10 py-2 cursor-pointer"
                    onClick={(ev) => {
                      ev.preventDefault()
                      setActive(index)
                    }}
                  >
                    <span
                      className={clsx(
                        active === index &&
                          'text-transparent bg-clip-text bifrost__gradient__green',
                      )}
                    >
                      {reason.title}
                    </span>
                    {active === index && (
                      <motion.div
                        layout
                        className={clsx(
                          'w-full h-[0.2em] left-0 absolute bottom-[-4px] z-10',
                          active === index && 'bifrost__gradient__green',
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
        {reasons[active] && (
          <motion.div
            key={reasons[active].title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-6 md:grid-cols-12 rounded-[15px]"
          >
            <div className="bifrost__transparent__card col-span-6 lg:p-12 p-6 flex flex-col lg:space-y-7 space-y-5 sm:border-y sm:border-l rounded-l-[15px] sm:border-[#4e6181]/30 mx-1 md:mx-0 justify-center items-center">
              <h5 className="md:text-[42px] md:leading-[42px] text-[35px] leading-[35px] font-[275]">
                {reasons[active].headline}
              </h5>
              <div className="text-body-1 opacity-70">
                <PortableText blocks={reasons[active].body} />
              </div>
            </div>
            <div className="col-span-6 sm:relative lg:h-auto h-[280px] md:h-auto md:-translate-x-5 md:-translate-y-0 -translate-y-5">
              <SanityImg
                className="object-cover object-center sm:absolute top-0 left-0 h-full w-full rounded-[15px]"
                builder={imageUrlBuilder}
                image={reasons[active].image}
                height={500}
                alt={reasons[active].image?.alt || 'image'}
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
