import { Body } from 'components/blog/body/Body'
import { Heading } from 'components/blog/Heading'
import { BlogProps } from 'lib/@types/blogTypes'
import { siteQuery } from 'lib/query'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { useEffect, useState } from 'react'
import { withDimensions } from 'sanity-react-extra'
import { sanityClient, sanityStaticProps, useSanityQuery } from 'utils/sanity'

const query = groq`{
  "site": ${siteQuery},
  "page": *[_type== "blog" && slug.current == $blog] | order(order asc) [0] {
    ...,
    "image": ${withDimensions('image')},
  }
}`

const pathsQuery = groq`*[_type == 'blog'][]{slug}`

export const getStaticPaths = async () => {
  const slugs = await sanityClient('anonymous').fetch(pathsQuery)

  return {
    paths: slugs.filter((s: any) => s).map((s: any) => ({ params: { blog: s.slug.current } })),
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
      page: { heading, datetime, body },
    },
  }: { data: { page: BlogProps } } = useSanityQuery(query, props)

  const [paddingY, setPaddingY] = useState(0)

  useEffect(() => {
    const navHeight = document.querySelector('#navbar').clientHeight
    setPaddingY(navHeight * 2)
  }, [])

  return (
    <article
      className="bg-white text-[#5D6588] selection:bg-[#e4acff] px-6"
      style={{ paddingTop: `${paddingY}px`, paddingBottom: `${paddingY}px` }}
    >
      <Heading heading={heading} datetime={datetime} />
      <Body paddingY={paddingY} body={body} />
    </article>
  )
}
