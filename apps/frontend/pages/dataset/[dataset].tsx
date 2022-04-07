import Graph from 'components/dataset/Graph'
import { Idataset } from 'lib/@types/datasetTypes'
import { siteQuery } from 'lib/query'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { withDimensions } from 'sanity-react-extra'
import { sanityClient, sanityStaticProps, useSanityQuery } from 'utils/sanity'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { Gallery } from 'components/dataset/Gallery'
import { Body } from 'components/dataset/Body'
import { Attributes } from 'components/dataset/Attributes'

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
    }
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
    },
  }: { data: { dataset: Idataset; page: any } } = useSanityQuery(query, props)

  return (
    <div className="container">
      <Gallery images={images} />
      <Body body={body} heading={heading} subHeading={subHeading} license={license} />
      <Attributes attributes={attributes} />
      <div className="">
        <ParentSize>
          {({ width, height }) => <Graph width={width} height={height} classes={classes} />}
        </ParentSize>
      </div>
    </div>
  )
}
