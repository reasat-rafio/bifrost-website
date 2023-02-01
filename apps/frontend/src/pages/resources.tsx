import { siteQuery } from 'lib/query'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { withDimensions } from 'sanity-react-extra'
import { sanityStaticProps, useSanityQuery } from 'utils/sanity'

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "resourcesPage"][0] {
    ...,
    "image": ${withDimensions('image')},
    body[]{
      ...,
      asset->{
        ...,
        metadata {
          dimensions
        }
      }
    }
  }
}`

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
})

const Resources = (props: SanityProps<any>) => {
  const {
    data: { page },
  } = useSanityQuery(query, props)
}

export default Resources
