import { Idataset } from 'lib/@types/dataset-types'
import { siteQuery } from 'src/lib/query'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { renderObjectArray, withDimensions } from 'sanity-react-extra'
import { sanityClient, sanityStaticProps, useSanityQuery } from 'utils/sanity'
import { Gallery } from 'components/[dataset]/gallery'
import { Body } from 'components/[dataset]/body'
import { Attributes } from 'components/[dataset]/attributes'
import { Classes } from 'components/[dataset]/classes'
import { Contact } from 'components/common/contact'

const query = groq`{
  "site": ${siteQuery},
  "dataset": *[_type== "dataset" && slug.current == $dataset] [0] {
    ...,
    attributes[]{
        ...,
        "icon": ${withDimensions('icon')},
    },
    images[]{
      ...,
      asset-> {
        ...,
        metadata {
          dimensions
        }
      }
    },
    body[]{
      ...,
      asset->{
        ...,
        metadata {
          dimensions
        }
      }
    }
  },
  "page": *[_id == "datasetDetailsPage"][0] {
    ...,
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
      page: { sections },
    },
  }: { data: { dataset: Idataset; page: any } } = useSanityQuery(query, props)

  // TODO add the related datasets section
  return (
    <div>
      <article className="container">
        <Gallery images={images} />
        <Body body={body} heading={heading} subHeading={subHeading} license={license} />
        <Attributes attributes={attributes} />
        {/* TODO Fix the responiveness on the mobile  */}
        <Classes classes={classes} />
      </article>

      {renderObjectArray(sections, {
        contact: Contact,
      })}
    </div>
  )
}
