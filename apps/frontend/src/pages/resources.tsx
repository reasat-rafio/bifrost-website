import clsx from 'clsx'
import { LightboxImage } from 'components/ui/LightboxImage'
import { Heading } from 'components/ui/heading'
import { Title } from 'components/ui/title'
import { IQuote } from 'lib/@types/blog-types'
import { useWindowSize } from 'lib/hooks'
import { siteQuery } from 'lib/query'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { useRef } from 'react'
import { withDimensions } from 'sanity-react-extra'
import { PortableText, sanityStaticProps, useSanityQuery } from 'utils/sanity'

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
  props: { darkNavbar: true, ...(await sanityStaticProps({ context, query })) },
  revalidate: 10,
})

const Resources = (props: SanityProps<any>) => {
  const {
    data: { page },
  } = useSanityQuery(query, props)
  const articleRef = useRef(null)
  console.log(page.body)

  return (
    <div className="container">
      <article ref={articleRef} className="px-6 pt-24 h-full">
        <PortableText
          blocks={page.body}
          serializers={{
            types: {
              block: (props) => {
                if (props.node.style === 'pageHeader') {
                  return <h1></h1>
                } else if (props.node.style === 'sectionTitle') {
                  return <Title>{props.children}</Title>
                } else if (props.node.style === 'sectionSubtitle') {
                  return <Heading>{props.children}</Heading>
                }
                return <p>{props.children}</p>
              },
              image({ node }: any) {
                const windowWidth = useWindowSize()?.width ?? 0
                return (
                  <>
                    {node && <LightboxImage image={node} width={windowWidth >= 1280 ? 900 : 250} />}
                  </>
                )
              },

              quote({ node: { text, author, url } }: { node: IQuote }) {
                return (
                  <div className="bifrost__gradient_pink xl:p-16 p-5 rounded-[15px] flex flex-col space-y-5 mb-6">
                    <q
                      onClick={() => {
                        if (url && typeof window !== 'undefined') {
                          window.open(url, '_blank')
                        }
                      }}
                      className={clsx(
                        'text-[#000610] xl:text-[40px] text-[25px] font-[275] transition-all duration-300',
                        !url && 'cursor-pointer',
                      )}
                    >
                      {text}
                    </q>

                    <span className="text-[#5D6588] xl:text-[20px] text-base font-light">
                      {author}
                    </span>
                  </div>
                )
              },
            },
          }}
        />
      </article>
    </div>
  )
}

export default Resources
