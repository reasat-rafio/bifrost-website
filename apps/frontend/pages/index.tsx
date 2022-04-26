import { sanityStaticProps, useSanityQuery } from 'utils/sanity'
import { siteQuery } from 'lib/query'
import type { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { renderObjectArray, withDimensions } from 'sanity-react-extra'
import { Site } from 'lib/@types/types'
import HomeHero from 'components/home/HomeHero'
import HomeProduct from 'components/home/HomeProduct'
import HomeDemo from 'components/home/homeDemo/HomeDemo'
import HomeService from 'components/home/HomeService/HomeService'
import HomeProjects from 'components/home/HomeProjects'
import Ellipse from 'components/Ellipse'
import HomeReview from 'components/home/HomeReview'
import Contact from 'components/Contact'
import { HomeSection, LandingPage } from 'lib/@types/landingTypes'
import Data from 'components/Data'
import { Page } from 'components/common/Page'
import { useCallback, useState } from 'react'

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

  const [heroSectionHeight, setHeroSectionHeight] = useState(0)

  return (
    <div>
      <Page>
        {renderObjectArray(sections, {
          'landing.home': useCallback(
            (p: HomeSection) => <HomeHero setHeroSectionHeight={setHeroSectionHeight} {...p} />,
            [],
          ),
        })}
      </Page>
      <div
        className="bg-black relative h-full"
        style={{
          marginTop: `${heroSectionHeight}px`,
        }}
      >
        <Page>
          {renderObjectArray(sections, {
            'landing.products': HomeProduct,
            'landing.demo': HomeDemo,
            'landing.services': HomeService,
            data: Data,
            'landing.projects': HomeProjects,
            'landing.reviews': HomeReview,
            contact: Contact,
          })}
        </Page>
        <>
          <Ellipse className="absolute top-[5%] left-[5%] w-[153px] h-[391px]" />
          <Ellipse className="absolute top-[18%] right-[5%] w-[153px] h-[391px]" />
          <Ellipse className="absolute top-[34%] left-[5%] w-[153px] h-[391px]" />
          <Ellipse className="absolute top-[40%] right-[5%] w-[153px] h-[391px]" />
          <Ellipse className="absolute top-[55%] right-[5%] w-[353px] h-[391px]" />
          <Ellipse className="absolute top-[80%] left-[5%] w-[353px] h-[391px]" />
          <Ellipse className="absolute top-[91%] right-[15%] w-[153px] h-[391px]" />
        </>
      </div>
    </div>
  )
}
