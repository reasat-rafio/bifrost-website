import { sanityStaticProps, useSanityQuery } from 'utils/sanity'
import Navbar from 'components/Navbar'
import { siteQuery } from 'lib/query'
import type { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { useMap } from 'react-use'
import { Section } from 'components/ui/Section'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { renderObjectArray } from 'sanity-react-extra'
import { Site } from 'lib/types'
import HomeHero from 'components/home/HomeHero'
import HomeProduct from 'components/home/HomeProduct'
import HomeDemo from 'components/home/HomeDemo'
import HomeService from 'components/home/HomeService'
import { useRef } from 'react'
import HomeProjects from 'components/home/HomeProjects'
import Ellipse from 'components/Ellipse'
import HomeReview from 'components/home/HomeReview'
import Footer from 'components/Footer'
import SlideUp from 'components/SlideUpText'
import Contact from 'components/Contact'
import { DemoSection, LandingPage, ServiceSection } from 'lib/landingTypes'
import Data from 'components/Data'

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "landingPage"][0] {
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

export default function Home(props: SanityProps<{ site: Site; page: LandingPage }>) {
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
      <Section name="hero" setActive={setActive} className="min-h-[100vh]" isWhite={false}>
        {renderObjectArray(sections, {
          'landing.home': HomeHero,
        })}
      </Section>

      <Section name="products" setActive={setActive} className="min-h-[100vh]" isWhite={false}>
        {renderObjectArray(sections, {
          'landing.products': HomeProduct,
        })}
      </Section>
      <Section name="tech" threshold={0.2} isWhite={true} className="h-[100vh]">
        {renderObjectArray(sections, {
          'landing.demo': (data: DemoSection) => (
            <div
              className={clsx(
                'container flex justify-center items-center z-10 relative h-[100vh]',
                'text-white',
              )}
            >
              <div className="text-center md:text-head-1 text-[28px] leading-[28px] font-[275]">
                <SlideUp text={data.headline} />
              </div>
            </div>
          ),
        })}
      </Section>
      <Section name="demo" setActive={setActive} threshold={0.2} hasEllipse={true}>
        {renderObjectArray(sections, {
          'landing.demo': HomeDemo,
        })}
      </Section>
      <Section name="tech" threshold={0.2} isWhite={true} className="h-[100vh]">
        {renderObjectArray(sections, {
          'landing.services': (data: ServiceSection) => (
            <div
              className={clsx(
                'container flex justify-center items-center z-10 relative h-[100vh]',
                'text-white',
              )}
            >
              <div className="text-center md:text-head-1 text-[28px] leading-[28px]  font-[275]">
                <SlideUp text={data.headline} />
              </div>
            </div>
          ),
        })}
      </Section>
      <Ellipse className="z-10 absolute top-[140vh] right-[5vw] w-[153px] h-[391px]" />
      <Ellipse className="z-10 absolute top-[340vh] right-[5vw] w-[153px] h-[391px]" />
      <Section
        name="service"
        setActive={setActive}
        threshold={0}
        isWhite={false}
        className="relative"
      >
        {renderObjectArray(sections, {
          'landing.services': HomeService,
        })}
      </Section>
      <Ellipse className="z-10 absolute top-[40vh] right-[5vw] w-[153px] h-[391px]" />
      <Section name="data" setActive={setActive} isWhite={false}>
        {renderObjectArray(sections, {
          data: Data,
        })}
      </Section>
      <div>
        {renderObjectArray(sections, {
          'landing.projects': HomeProjects,
        })}
      </div>
      <Ellipse className="z-10 absolute top-[50vh] right-[15vw] w-[153px] h-[391px]" />
      <Section name="reviews" setActive={setActive} isWhite={false} threshold={0}>
        {renderObjectArray(sections, {
          'landing.reviews': HomeReview,
        })}
      </Section>
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
