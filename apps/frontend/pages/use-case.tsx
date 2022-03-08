import clsx from 'clsx'
import Contact from 'components/Contact'
import Ellipse from 'components/Ellipse'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import SlideUp from 'components/SlideUpText'
import { Section } from 'components/ui/Section'
import UseCaseAssurance from 'components/useCase/UseCaseAssurance'
import UseCaseEnterprise from 'components/useCase/UseCaseEnterprise'
import UseCaseFeatures from 'components/useCase/UseCaseFeatures'
import UseCaseHome from 'components/useCase/UseCaseHome'
import UseCaseImages from 'components/useCase/UseCaseImages'
import { motion } from 'framer-motion'
import { ContactUsPage } from 'lib/contactUsTypes'
import { siteQuery } from 'lib/query'
import { Site } from 'lib/types'
import { EnterpriseSection } from 'lib/useCaseTypes'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { useRef } from 'react'
import { useMap } from 'react-use'
import { renderObjectArray } from 'sanity-react-extra'
import { sanityStaticProps, useSanityQuery } from 'utils/sanity'

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "useCasePage"][0] {
    ...,
  },
}`

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
})

export default function UseCase(props: SanityProps<{ site: Site; page: ContactUsPage }>) {
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
          'useCase.home': UseCaseHome,
        })}
      </Section>
      <Section name="example" setActive={setActive} isWhite={true} threshold={0.4}>
        {renderObjectArray(sections, {
          'useCase.example': UseCaseImages,
        })}
      </Section>
      <Section
        name="feature"
        setActive={setActive}
        isWhite={true}
        threshold={0.4}
        hasEllipse={true}
      >
        {renderObjectArray(sections, {
          'useCase.feature': UseCaseFeatures,
        })}
      </Section>
      <Ellipse className="z-10 absolute top-[40vh] left-[15vw] w-[253px] h-[391px]" />
      <Section name="assurance" setActive={setActive} isWhite={true} threshold={0.4}>
        {renderObjectArray(sections, {
          'useCase.assurance': UseCaseAssurance,
        })}
      </Section>
      <Section name="enterprise" threshold={0.2} isWhite={true}>
        {renderObjectArray(sections, {
          'useCase.enterprise': (data: EnterpriseSection) => (
            <div
              className={clsx(
                'container flex justify-center items-center z-10 relative min-h-[90vh]',
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
      <Ellipse className="z-10 absolute top-[30vh] right-[5vw] w-[253px] h-[391px]" />
      <Ellipse className="z-10 absolute top-[140vh] left-[5vw] w-[253px] h-[391px]" />
      <Section
        name="enterprise"
        setActive={setActive}
        threshold={0}
        isWhite={false}
        className="relative"
      >
        {renderObjectArray(sections, {
          'useCase.enterprise': UseCaseEnterprise,
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
