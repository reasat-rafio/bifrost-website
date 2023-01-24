import clsx from 'clsx'
import { GradientTitle } from 'src/components/common/GradientTitle'
import { Header } from 'src/components/ui/Header'
import { motion } from 'framer-motion'
import { AgendaProps, ReasonSection } from 'lib/@types/about-us-types'
import { useRef, useState } from 'react'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder, PortableText } from 'utils/sanity'
import { useIntersection } from 'lib/hooks'

const Reason: React.FC<ReasonSection> = ({ agendas, subtitle, title }) => {
  const sectionRef = useRef<HTMLElement>(null)
  const intersecting = useIntersection(sectionRef, { threshold: 0.5 })?.isIntersecting
  const [active, setActive] = useState(0)

  return (
    <section ref={sectionRef} className="mx-5">
      <div className="z-10 relative | 3xl:max-w-6xl 2xl:max-w-5xl max-w-5xl | flex flex-col lg:items-start items-center | mx-auto lg:pt-16 xl:mb-40 lg:mb-20 mb-16 space-y-7">
        <GradientTitle>{title}</GradientTitle>
        <div className="grid lg:grid-cols-2 grid-cols-1 | lg:space-y-0 space-y-4">
          <Header className="lg:text-left text-center">{subtitle}</Header>
          <div className="lg:pb-0 pb-5">
            <div className="relative | flex lg:justify-end items-end justify-around | lg:w-[60%] w-full | ml-auto">
              {agendas.map((reason, index) => (
                <div key={reason._key} className="w-full">
                  <div
                    className="lg:my-0 flex w-full items-center justify-center font-bold hover:opacity-75 relative z-10 py-2 cursor-pointer"
                    onClick={(ev) => {
                      ev.preventDefault()
                      setActive(index)
                    }}
                  >
                    <span
                      className={clsx(
                        active === index && 'text-transparent bg-clip-text primary__gradient',
                      )}
                    >
                      {reason.name}
                    </span>
                    {active === index && (
                      <motion.div
                        className={clsx(
                          'w-full h-[0.2em] left-0 absolute bottom-[-4px] z-10',
                          active === index && 'primary__gradient',
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
        {!!agendas[active] && <ActiveAgenda intersecting={intersecting} {...agendas[active]} />}
      </div>
    </section>
  )
}

interface ActiveAgendaProps extends AgendaProps {
  intersecting: boolean
}
const ActiveAgenda: React.FC<ActiveAgendaProps> = ({
  title,
  description,
  _key,
  image,
  intersecting,
}) => {
  return (
    <motion.article
      key={_key}
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      className="grid grid-cols-6 md:grid-cols-12 rounded-[15px]"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: intersecting ? 1 : 0 }}
        viewport={{ once: true }}
        transition={{ type: 'tween', duration: 0.7, ease: 'easeInOut' }}
        className="bifrost__transparent__card col-span-6 lg:p-12 p-6 flex flex-col lg:space-y-7 space-y-5 sm:border-y sm:border-l rounded-l-[15px] sm:border-[#4e6181]/30 mx-1 md:mx-0 justify-center items-center"
      >
        <h5 className="lg:text-head-md text-head-4-res leading-none font-primary">{title}</h5>
        <div className="lg:text-body-1 text-body-1-mobile opacity-70">
          <PortableText blocks={description} />
        </div>
      </motion.div>
      <figure className="col-span-6 sm:relative min-h-[280px] h-full w-full md:-translate-x-5 md:-translate-y-0 -translate-y-5 | md:aspect-square aspect-video !overflow-hidden">
        <SanityImg
          className={clsx(
            'object-cover object-center sm:absolute top-0 left-0 h-full w-full rounded-[15px] | transition-opacity duration-700 ease-in-out',
            intersecting ? 'opacity-100' : 'opacity-0',
          )}
          builder={imageUrlBuilder}
          image={image}
          height={500}
          alt={image?.alt || 'image'}
        />
      </figure>
    </motion.article>
  )
}

export default Reason
