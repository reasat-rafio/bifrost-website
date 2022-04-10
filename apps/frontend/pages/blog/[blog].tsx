import { Body } from 'components/blog/body/Body'
import { Heading } from 'components/blog/Heading'
import { Page } from 'components/common/Page'
import Data from 'components/Data'
import { BlogProps } from 'lib/@types/blogTypes'
import { siteQuery } from 'lib/query'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { useEffect, useState } from 'react'
import { renderObjectArray, withDimensions } from 'sanity-react-extra'
import { sanityClient, sanityStaticProps, useSanityQuery } from 'utils/sanity'
import Contact from 'components/Contact'
import Ellipse from 'components/Ellipse'
import { RelatedBlogs } from 'components/blog/RelatedBlog'

const query = groq`{
  "site": ${siteQuery},
  "blog": *[_type== "blog" && slug.current == $blog] [0] {
    ...,
    "image": ${withDimensions('image')},
    tags[]->,
    "relatedBlogs" : *[_type== "blog" && slug.current != $blog && count((tags[]->name)[@ in ^.tags[]->.name]) > 0][]{
      _id,
      heading,
      slug,
      datetime,
      subHeading,
      "image": ${withDimensions('image')},
    }
  },
  "page": *[_id == "blogDetailsPage"][0] {
    ...,
  },
}`

const pathsQuery = groq`*[_type == 'blog'][]{
  slug,
  tags[]->{
    name
    }
  }`

export const getStaticPaths = async () => {
  const slugs = await sanityClient('anonymous').fetch(pathsQuery)

  return {
    paths: slugs
      .filter((s: any) => s)
      .map((s: any) => ({ params: { blog: s.slug.current, tags: s.tags } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
})

export default function Blog(props: SanityProps) {
  const {
    data: {
      blog: { heading, datetime, body, relatedBlogs },
      page: { sections },
    },
  }: { data: { blog: BlogProps; page: any } } = useSanityQuery(query, props)

  const [paddingY, setPaddingY] = useState(0)

  useEffect(() => {
    const navHeight = document.querySelector('#navbar').clientHeight
    console.log(navHeight)

    setPaddingY(navHeight * 2)
  }, [])

  return (
    <div>
      <article className="bg-white text-[#5D6588] selection:bg-[#e4acff] px-6 py-32">
        <Heading heading={heading} datetime={datetime} />
        <Body paddingY={paddingY} body={body} />
      </article>

      <Page>
        {renderObjectArray(sections, {
          data: Data,
        })}

        <RelatedBlogs relatedBlogs={relatedBlogs} />

        {renderObjectArray(sections, {
          contact: Contact,
        })}
      </Page>
      <>
        <Ellipse className="z-10 absolute top-[20vh] right-[15vw] w-[153px] h-[391px]" />
        <Ellipse className="z-10 absolute top-[0vh] right-[40vw] w-[353px] h-[391px]" />
        <Ellipse className="z-10 absolute top-[20vh] right-[15vw] w-[153px] h-[391px]" />
      </>
    </div>
  )
}
