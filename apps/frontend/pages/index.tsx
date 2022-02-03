import { sanityStaticProps, useSanityQuery } from 'utils/sanity'
import Navbar from 'components/Navbar'
import { siteQuery } from 'lib/query'
import type { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { useMap } from 'react-use'
import { Section } from 'components/ui/Section'
import { useCtx } from 'contexts/global'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { renderObjectArray } from 'sanity-react-extra'
import { LandingPage, Site } from 'lib/types'
import HomeHero from 'components/home/HomeHero'

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "landingPage"][0] {
    ...,
  },
}`

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
})

export default function Home(props: SanityProps<{ site: Site; page: LandingPage }>) {
  const {
    data: {
      site,
      page: { sections },
    },
  } = useSanityQuery(query, props)

  const [activeSection, { set: setActive }] = useMap<{ home?: boolean; datasets?: boolean }>({})

  const { isWhite } = useCtx()

  return (
    <motion.div
      animate={{
        color: isWhite ? '#000' : '#fff',
        backgroundColor: isWhite ? '#fff' : '#000',
        transition: { ease: 'easeInOut', duration: 0.3 },
      }}
      className="relative"
    >
      <div className={clsx(!isWhite ? 'bifrost__background_noise' : 'opacity-0')}></div>
      <Navbar logo={site.logos.logo} menu={site.nav.menu} activeSection={activeSection} />
      <Section name="hero" className="h-[100vh]" setActive={setActive} isWhite={false}>
        {renderObjectArray(sections, {
          home: HomeHero,
        })}
      </Section>

      <Section name="products" setActive={setActive} className="h-[100vh]" isWhite={false}>
        Lorem Ipsum
      </Section>
      <Section name="home" setActive={setActive} className="h-[100vh]">
        Lorem Ipsum
      </Section>
      <Section name="datasets" setActive={setActive} className="h-[100vh]">
        Lorem Ipsum
      </Section>
    </motion.div>
  )
}
