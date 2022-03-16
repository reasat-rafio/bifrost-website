import { sanityStaticProps, useSanityQuery } from 'utils/sanity'
import { siteQuery } from 'lib/query'
import type { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { renderObjectArray, withDimensions } from 'sanity-react-extra'
import { Site } from 'lib/types'
import HomeHero from 'components/home/HomeHero'
import HomeProduct from 'components/home/HomeProduct'
import HomeDemo from 'components/home/homeDemo/HomeDemo'
// import HomeService from 'components/home/HomeService'
import HomeProjects from 'components/home/HomeProjects'
import Ellipse from 'components/Ellipse'
import HomeReview from 'components/home/HomeReview'
import Contact from 'components/Contact'
import { LandingPage } from 'lib/landingTypes'
import Data from 'components/Data'
import { Page } from 'components/common/Page'

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "landingPage"][0] {
    ...,
    sections[] {
      ...,
      "image": ${withDimensions('image')},
      previews[] {
        ...
        asset->{
          ...,
          metadata {
            dimensions
          }
        }
      },
      images[] {
        ...
        asset->{
          ...,
          metadata {
            dimensions
          }
        }
      },
      items[]{
        ...,
        "image": ${withDimensions('image')},
      }
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
    <Page>
      {renderObjectArray(sections, {
        'landing.home': HomeHero,
        'landing.products': HomeProduct,
        'landing.demo': HomeDemo,
      })}
      <>
        <Ellipse className="z-10 absolute top-[40vh] left-[5vw] w-[153px] h-[391px]" />
        <Ellipse className="z-10 absolute top-[180vh] right-[5vw] w-[153px] h-[391px]" />
        <Ellipse className="z-10 absolute top-[340vh] left-[5vw] w-[153px] h-[391px]" />
        <Ellipse className="z-10 absolute top-[440vh] right-[5vw] w-[153px] h-[391px]" />
      </>

      {/* {renderObjectArray(sections, {
        'landing.services': HomeService,
      })} */}

      <Ellipse className="z-10 absolute top-[20vh] right-[5vw] w-[353px] h-[391px]" />

      {renderObjectArray(sections, {
        data: Data,
      })}
      <Ellipse className="z-10 absolute top-[10vh] left-[5vw] w-[353px] h-[391px]" />

      {renderObjectArray(sections, {
        'landing.projects': HomeProjects,
      })}

      <Ellipse className="z-10 absolute top-[50vh] right-[15vw] w-[153px] h-[391px]" />

      {renderObjectArray(sections, {
        'landing.reviews': HomeReview,
        contact: Contact,
      })}
    </Page>
  )
}
