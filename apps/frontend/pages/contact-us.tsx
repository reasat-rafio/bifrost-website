import { Page } from 'components/common/Page'
import Contact from 'components/Contact'
import ContactHome from 'components/contact/ContactHome'
import Ellipse from 'components/Ellipse'
import { ContactUsPage } from 'lib/@types/contactUsTypes'
import { siteQuery } from 'lib/query'
import { Site } from 'lib/@types/types'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { renderObjectArray } from 'sanity-react-extra'
import { sanityStaticProps, useSanityQuery } from 'utils/sanity'

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "contactUsPage"][0] {
    ...,
  },
}`

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
})

export default function ContactUs(props: SanityProps<{ site: Site; page: ContactUsPage }>) {
  const {
    data: {
      page: { sections },
    },
  } = useSanityQuery(query, props)

  return (
    <Page>
      <Ellipse className="z-10 absolute top-[20vh] right-[15vw] w-[153px] h-[391px]" />
      {renderObjectArray(sections, {
        'contact.home': ContactHome,
        contact: Contact,
      })}
    </Page>
  )
}
