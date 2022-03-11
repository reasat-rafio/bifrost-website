import { sanityStaticProps, useSanityQuery } from 'utils/sanity'
import { siteQuery } from 'lib/query'
import type { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { Section } from 'components/ui/Section'
import { motion } from 'framer-motion'
import { renderObjectArray } from 'sanity-react-extra'
import { Site } from 'lib/types'
import HomeHero from 'components/home/HomeHero'
import HomeProduct from 'components/home/HomeProduct'
import HomeDemo from 'components/home/homeDemo/HomeDemo'
import HomeService from 'components/home/HomeService'
import HomeProjects from 'components/home/HomeProjects'
import Ellipse from 'components/Ellipse'
import HomeReview from 'components/home/HomeReview'
import Contact from 'components/Contact'
import { LandingPage } from 'lib/landingTypes'
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
      page: { sections },
    },
  } = useSanityQuery(query, props)

  return (
    <motion.div>
      <Section name="hero" className="min-h-[100vh]" isWhite={false}>
        {renderObjectArray(sections, {
          'landing.home': HomeHero,
        })}
      </Section>

      <Section name="products" isWhite={false}>
        {renderObjectArray(sections, {
          'landing.products': HomeProduct,
        })}
      </Section>

      <Section name="demo">
        {renderObjectArray(sections, {
          'landing.demo': HomeDemo,
        })}
      </Section>

      <Ellipse className="z-10 absolute top-[40vh] left-[5vw] w-[153px] h-[391px]" />
      <Ellipse className="z-10 absolute top-[180vh] right-[5vw] w-[153px] h-[391px]" />
      <Ellipse className="z-10 absolute top-[340vh] left-[5vw] w-[153px] h-[391px]" />
      <Ellipse className="z-10 absolute top-[440vh] right-[5vw] w-[153px] h-[391px]" />
      <Section name="service" isWhite={false} className="relative">
        {renderObjectArray(sections, {
          'landing.services': HomeService,
        })}
      </Section>
      <Ellipse className="z-10 absolute top-[20vh] right-[5vw] w-[353px] h-[391px]" />
      <Section name="data" isWhite={false}>
        {renderObjectArray(sections, {
          data: Data,
        })}
      </Section>
      <Ellipse className="z-10 absolute top-[10vh] left-[5vw] w-[353px] h-[391px]" />
      <div>
        {renderObjectArray(sections, {
          'landing.projects': HomeProjects,
        })}
      </div>
      <Ellipse className="z-10 absolute top-[50vh] right-[15vw] w-[153px] h-[391px]" />
      <Section name="reviews" isWhite={false}>
        {renderObjectArray(sections, {
          'landing.reviews': HomeReview,
        })}
      </Section>
      <Section name="contact" isWhite={true} hasEllipse={true} enableTransition={false}>
        {renderObjectArray(sections, {
          contact: Contact,
        })}
      </Section>
    </motion.div>
  )
}
