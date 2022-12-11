import { sanityStaticProps, useSanityQuery } from 'src/utils/sanity'
import { siteQuery } from 'src/lib/query'
import type { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { renderObjectArray, withDimensions } from 'sanity-react-extra'
import { Site } from 'src/lib/@types/types'
import HomeHero from 'src/components/home/HomeHero'
import HomeProduct from 'src/components/home/HomeProduct'
import HomeDemo from 'src/components/home/homeDemo/HomeDemo'
import HomeService from 'src/components/home/HomeService/HomeService'
import HomeProjects from 'src/components/home/HomeProjects'
import Ellipse from 'src/components/Ellipse'
import HomeReview from 'src/components/home/HomeReview'
import Contact from 'src/components/Contact'
import { HomeSection, LandingPage } from 'src/lib/@types/landingTypes'
import { PrimaryWrapper } from 'src/components/common/PrimaryWapper'
import { useCallback, useState } from 'react'
import Newsletter from 'components/newsletter'

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
      <PrimaryWrapper>
        {renderObjectArray(sections, {
          'landing.home': useCallback(
            (p: HomeSection) => <HomeHero setHeroSectionHeight={setHeroSectionHeight} {...p} />,
            [],
          ),
        })}
      </PrimaryWrapper>
      <div
        className="bg-black relative h-full"
        style={{
          marginTop: `${heroSectionHeight}px`,
        }}
      >
        <PrimaryWrapper>
          {renderObjectArray(sections, {
            'landing.products': HomeProduct,
            'landing.demo': HomeDemo,
            'landing.services': HomeService,
            newsletter: Newsletter,
            'landing.projects': HomeProjects,
            'landing.reviews': HomeReview,
            contact: Contact,
          })}
        </PrimaryWrapper>
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
