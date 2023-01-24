import { GradientTitle } from 'src/components/common/GradientTitle'
import { Header } from 'components/ui/heading'
import { TeamSection } from 'lib/@types/about-us-types'
import { useWindowSize } from 'react-use'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'
import { motion } from 'framer-motion'
import { SlideUpChild, SlideUpParent } from 'animations/slide-up'

const Team: React.FC<TeamSection> = ({ title, subtitle, members }) => {
  const { width: windowWidth } = useWindowSize() ?? {
    width: 0,
    height: 0,
  }

  return (
    <section className="container text-center z-30 relative xl:mb-36 lg:mb-20 mb-16">
      <motion.header
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ type: 'tween', duration: 1 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto mb-7"
      >
        <GradientTitle className="mx-auto">{title}</GradientTitle>
        <Header>{subtitle}</Header>
      </motion.header>
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={SlideUpParent(0.15)}
        className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5 py-5"
      >
        {members.map((team) => (
          <motion.div
            key={team._key}
            variants={SlideUpChild()}
            className="flex flex-col items-center"
          >
            <figure className="rounded-xl overflow-hidden !w-full max-h-[310px] aspect-square">
              <SanityImg
                className="w-full h-full object-cover mb-5"
                builder={imageUrlBuilder}
                image={team.image}
                alt={team.image?.alt || 'image'}
                height={windowWidth >= 1280 ? 400 : windowWidth >= 640 ? 350 : 150}
              />
            </figure>
            <span className="md:text-[24px] text-body-1">{team.name}</span>
            <span className="md:text-body-1 text-[14px] ">{team.role}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default Team
