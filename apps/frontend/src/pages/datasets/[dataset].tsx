import { Idataset } from 'src/lib/@types/datasetTypes'
import { siteQuery } from 'src/lib/query'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { renderObjectArray, withDimensions } from 'sanity-react-extra'
import { sanityClient, sanityStaticProps, useSanityQuery } from 'src/utils/sanity'
import { Gallery } from 'src/components/dataset/Gallery'
import { Body } from 'src/components/dataset/Body'
import { Attributes } from 'src/components/dataset/Attributes'
import Contact from 'src/components/Contact'
import { Classes } from 'src/components/dataset/Classes'

const query = groq`{
  "site": ${siteQuery},
  "dataset": *[_type== "dataset" && slug.current == $dataset] [0] {
    ...,
    attributes[]{
        ...,
        "icon": ${withDimensions('icon')},
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
    },
    "page": *[_id == "datasetDetailsPage"][0] {
      ...,
  },
}`

const pathsQuery = groq`*[_type == 'dataset'][]{
  slug,
  }`

export const getStaticPaths = async () => {
  const slugs = await sanityClient('anonymous').fetch(pathsQuery)

  return {
    paths: slugs
      .filter((s: any) => s)
      .map((s: any) => ({ params: { dataset: s.slug.current, tags: s.tags } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
})

export default function Dataset(props: SanityProps) {
  const {
    data: {
      dataset: { classes, images, body, heading, subHeading, license, attributes },
      page: { sections },
    },
  }: { data: { dataset: Idataset; page: any } } = useSanityQuery(query, props)

  return (
    <div>
      <div className="container">
        <Gallery images={images} />
        <Body body={body} heading={heading} subHeading={subHeading} license={license} />
        <Attributes attributes={attributes} />
        <Classes classes={classes} />
      </div>

      {renderObjectArray(sections, {
        contact: Contact,
      })}
    </div>
  )
}
