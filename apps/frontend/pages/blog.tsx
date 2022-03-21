// import BlogArticles from 'components/blog/BlogArticles'
import BlogHome from 'components/blog/BlogHome'
import Blogs from 'components/blog/Blogs'
import { Page } from 'components/common/Page'
import Contact from 'components/Contact'
import Data from 'components/Data'
import Ellipse from 'components/Ellipse'
import { BlogPage, HomeSection, IBlog } from 'lib/@types/blogTypes'
import { siteQuery } from 'lib/query'
import { Site } from 'lib/@types/types'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { useCallback, useState } from 'react'
import { renderObjectArray, withDimensions } from 'sanity-react-extra'
import { sanityStaticProps, useSanityQuery } from 'utils/sanity'

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "blogPage"][0] {
    ...,
  },
  "blogs": *[_type== "blog"] | order(order asc) [0...5] {
    _id,
    heading,
    slug,
    detetime,
    subHeading,
    "image": ${withDimensions('image')},
  },
  "totalBlogs": length(*[_type== "blog"]),
}`

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
})

export default function Blog(
  props: SanityProps<{ site: Site; page: BlogPage; blogs: IBlog[]; totalBlogs: number }>,
) {
  const {
    data: {
      page: { sections },
      blogs,
      totalBlogs,
    },
  } = useSanityQuery(query, props)

  const [heroSectionHeight, setHeroSectionHeight] = useState(0)

  return (
    <>
      <Ellipse className="z-10 absolute top-[20vh] right-[15vw] w-[153px] h-[391px]" />
      <Page>
        {/* {renderObjectArray(sections, {
          'blog.home': useCallback(
            (p: HomeSection) => <BlogHome setHeroSectionHeight={setHeroSectionHeight} {...p} />,
            [],
          ),
        })} */}
      </Page>
      <div
        className="bg-black"
        style={{
          transform: `translate(0, ${heroSectionHeight}px)`,
          paddingBottom: `${heroSectionHeight}px`,
        }}
      >
        <Page>
          <Ellipse className="z-10 absolute top-[20vh] right-[15vw] w-[153px] h-[391px]" />
          <Blogs blogs={blogs} totalBlogs={totalBlogs} />
          <Ellipse className="z-10 absolute top-[0vh] right-[40vw] w-[353px] h-[391px]" />
          {renderObjectArray(sections, {
            data: Data,
            contact: Contact,
          })}
        </Page>
      </div>
    </>
  )
}
