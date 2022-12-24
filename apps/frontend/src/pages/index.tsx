import { sanityStaticProps, useSanityQuery } from 'src/utils/sanity'
import { siteQuery } from 'src/lib/query'
import type { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { renderObjectArray, withDimensions } from 'sanity-react-extra'
import Hero from 'components/home/hero'
import Product from 'components/home/product'
import HomeDemo from 'src/components/home/homeDemo/HomeDemo'
import HomeService from 'src/components/home/HomeService/HomeService'
import Project from 'components/home/projects'
import Ellipse from 'src/components/Ellipse'
import HomeReview from 'src/components/home/HomeReview'
import { Contact } from 'src/components/common/contact'
import { HomeSection } from 'src/lib/@types/landingTypes'
import { PrimaryWrapper } from 'src/components/common/PrimaryWapper'
import { useCallback, useState } from 'react'
import Newsletter from 'components/common/newsletter'
import Client from 'components/common/client'

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
    images[]{
      ...,
      asset->{
        ...,
        metadata{
          dimensions
        }
      }
    },
    projects[]{
        ...,
        "image": ${withDimensions('image')},
      }
    },
    "cleint" : *[_id == "client"][0] {
        ...,
        clients[]{
         ...,
          "image": ${withDimensions('image')},
      }
    }
  },
}`

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
})

export default function Home(props: SanityProps<any>) {
  const {
    data: {
      page: { sections, cleint },
    },
  } = useSanityQuery(query, props)
  console.log(sections)

  const [heroSectionHeight, setHeroSectionHeight] = useState(0)

  return (
    <div>
      <PrimaryWrapper>
        {renderObjectArray(sections, {
          'landing.home': useCallback(
            (p: HomeSection) => <Hero setHeroSectionHeight={setHeroSectionHeight} {...p} />,
            [],
          ),
        })}
      </PrimaryWrapper>
      <div
        className="bg-black relative h-full"
        style={{
          marginTop: heroSectionHeight,
        }}
      >
        <PrimaryWrapper>
          {renderObjectArray(sections, {
            'landing.products': Product,
            // 'landing.demo': HomeDemo,
            // 'landing.services': HomeService,
            'landing.projects': Project,
            // 'landing.reviews': HomeReview,
          })}
          {/* <Client {...cleint} /> */}
          {renderObjectArray(sections, {
            newsletter: Newsletter,
            // contact: Contact,
          })}
        </PrimaryWrapper>
        {/* <>
          <Ellipse className="absolute top-[5%] left-[5%] w-[153px] h-[391px]" />
          <Ellipse className="absolute top-[18%] right-[5%] w-[153px] h-[391px]" />
          <Ellipse className="absolute top-[34%] left-[5%] w-[153px] h-[391px]" />
          <Ellipse className="absolute top-[40%] right-[5%] w-[153px] h-[391px]" />
          <Ellipse className="absolute top-[55%] right-[5%] w-[353px] h-[391px]" />
          <Ellipse className="absolute top-[80%] left-[5%] w-[353px] h-[391px]" />
          <Ellipse className="absolute top-[91%] right-[15%] w-[153px] h-[391px]" />
        </> */}
      </div>
    </div>
  )
}
