// import BlogArticles from 'components/blog/BlogArticles'
import { Page } from 'components/common/Page'
import Contact from 'components/Contact'
import Ellipse from 'components/Ellipse'
import { HomeSection } from 'lib/@types/blogTypes'
import { siteQuery } from 'lib/query'
import { Site } from 'lib/@types/types'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { useCallback, useState } from 'react'
import { renderObjectArray } from 'sanity-react-extra'
import { sanityStaticProps, useSanityQuery } from 'utils/sanity'
import Home from 'components/dataset-list/Home'

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "datasetListPage"][0] {
    ...,
  },
}`

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
})

export default function Dataset(props: SanityProps<{ site: Site; page: any }>) {
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
          'blog.home': useCallback(
            (p: HomeSection) => <Home setHeroSectionHeight={setHeroSectionHeight} {...p} />,
            [],
          ),
        })}
      </Page>
      <div
        className="bg-black"
        style={{
          transform: `translate(0, ${heroSectionHeight}px)`,
          marginBottom: `${heroSectionHeight}px`,
        }}
      >
        <Page>
          {renderObjectArray(sections, {
            contact: Contact,
          })}
        </Page>
      </div>
      <>
        <Ellipse className="z-10 absolute top-[20vh] right-[15vw] w-[153px] h-[391px]" />
        <Ellipse className="z-10 absolute top-[0vh] right-[40vw] w-[353px] h-[391px]" />
        <Ellipse className="z-10 absolute top-[20vh] right-[15vw] w-[153px] h-[391px]" />
      </>
    </div>
  )
}
