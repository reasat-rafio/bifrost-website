import { siteQuery } from 'lib/query'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
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
  const { data } = useSanityQuery(query, props)

  console.log(data)

  return <div></div>
}
