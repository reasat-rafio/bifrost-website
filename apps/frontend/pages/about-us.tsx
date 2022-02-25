import AboutAbout from 'components/about/AboutAbout'
import AboutHome from 'components/about/AboutHome'
import Contact from 'components/Contact'
import Data from 'components/Data'
import Ellipse from 'components/Ellipse'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import { Section } from 'components/ui/Section'
import { motion } from 'framer-motion'
import { ContactUsPage } from 'lib/contactUsTypes'
import { siteQuery } from 'lib/query'
import { Site } from 'lib/types'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { useRef } from 'react'
import { useMap } from 'react-use'
import { renderObjectArray } from 'sanity-react-extra'
import { sanityStaticProps, useSanityQuery } from 'utils/sanity'

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "aboutUsPage"][0] {
    ...,
    sections[] {
      ...,
      previews[] {
        ...
        asset->{
          ...,
          metadata {
            dimensions
          }
        }
      },
    },
  },
}`

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
})

export default function Home(props: SanityProps<{ site: Site; page: ContactUsPage }>) {
  const {
    data: {
      site,
      page: { sections },
    },
  } = useSanityQuery(query, props)

  const mainRef = useRef(null)

  const [activeSection, { set: setActive }] = useMap<{
    home?: boolean
    datasets?: boolean
    demo?: boolean
  }>({})

  return (
    <motion.div
      animate={{
        backgroundColor: '#000',
        color: '#fff',
        transition: { ease: 'easeInOut', duration: 0.3 },
      }}
      className="relative overflow-clip"
      ref={mainRef}
    >
      <div className="absolute top-0 left-0 w-[100vw] h-[100vh]">
        <div className="bifrost__background_noise"></div>
      </div>
      <Navbar
        darkLogo={site.logos.darkLogo}
        logo={site.logos.logo}
        menu={site.nav.menu}
        activeSection={activeSection}
      />
      <Section name="home" setActive={setActive} isWhite={true} threshold={0.4}>
        {renderObjectArray(sections, {
          'aboutUs.home': AboutHome,
        })}
      </Section>
      <Section name="about" setActive={setActive} isWhite={true} threshold={0.4}>
        {renderObjectArray(sections, {
          'aboutUs.about': AboutAbout,
        })}
      </Section>
      <Ellipse className="z-10 absolute top-[40vh] right-[5vw] w-[153px] h-[391px]" />
      <Section name="data" setActive={setActive} isWhite={false}>
        {renderObjectArray(sections, {
          data: Data,
        })}
      </Section>
      <Ellipse className="z-10 absolute top-[20vh] right-[15vw] w-[153px] h-[391px]" />
      <Section
        name="contact"
        setActive={setActive}
        isWhite={true}
        threshold={0.4}
        hasEllipse={true}
        enableTransition={false}
      >
        {renderObjectArray(sections, {
          contact: Contact,
        })}
      </Section>
      <Footer logo={site.logos.logo} footer={site.nav.footer} />
    </motion.div>
  )
}
