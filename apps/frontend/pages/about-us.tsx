import AboutAbout from 'components/about/AboutAbout'
import AboutClients from 'components/about/AboutClients'
import AboutHome from 'components/about/AboutHome'
import AboutReason from 'components/about/AboutReason'
import AboutTeam from 'components/about/AboutTeam'
import Contact from 'components/Contact'
import Data from 'components/Data'
import Ellipse from 'components/Ellipse'
import { ContactUsPage } from 'lib/contactUsTypes'
import { siteQuery } from 'lib/query'
import { Site } from 'lib/types'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { renderObjectArray } from 'sanity-react-extra'
import { sanityStaticProps, useSanityQuery } from 'utils/sanity'

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "aboutUsPage"][0] {
    ...,
  },
}`

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
})

export default function AboutUs(props: SanityProps<{ site: Site; page: ContactUsPage }>) {
  const {
    data: {
      page: { sections },
    },
  } = useSanityQuery(query, props)

  return (
    <div>
      <div className="absolute top-0 left-0 w-[100vw] h-[100vh]">
        <div className="bifrost__background_noise"></div>
      </div>

      {renderObjectArray(sections, {
        'aboutUs.home': AboutHome,
        'aboutUs.about': AboutAbout,
        'aboutUs.reason': AboutReason,
        'aboutUs.team': AboutTeam,
      })}

      <Ellipse className="z-10 absolute top-[10vh] right-[5vw] w-[253px] h-[391px]" />

      {renderObjectArray(sections, {
        'aboutUs.clients': AboutClients,
      })}
      <Ellipse className="z-10 absolute top-[0vh] right-[40vw] w-[353px] h-[391px]" />

      {renderObjectArray(sections, {
        data: Data,
      })}

      <Ellipse className="z-10 absolute top-[20vh] right-[15vw] w-[153px] h-[391px]" />

      {renderObjectArray(sections, {
        contact: Contact,
      })}
    </div>
  )
}
