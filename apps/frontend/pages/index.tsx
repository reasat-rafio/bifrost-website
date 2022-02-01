import { sanityStaticProps, useSanityQuery } from 'utils/sanity'
import Navbar from 'components/Navbar'
import { siteQuery } from 'lib/query'
import type { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { useMap } from 'react-use'
import { Section } from 'components/ui/Section'

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "landingPage"][0] {
    ...,
  },
}`

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
})

export default function Home(props: SanityProps<{ site: Site; page: LandingPage }>) {
  const {
    data: { site },
  } = useSanityQuery(query, props)

  const [activeSection, { set: setActive }] = useMap<{ home?: boolean; datasets?: boolean }>({})

  return (
    <div>
      <Navbar logo={site.logos.logo} menu={site.nav.menu} activeSection={activeSection} />
      <Section
        name="home"
        className="bifrost__background_noise bg-black h-[100vh]"
        setActive={setActive}
      >
        Lorem Ipsum
      </Section>
      <Section name="products" setActive={setActive} className=" bg-black h-[100vh]">
        Lorem Ipsum
      </Section>
      <Section name="home" setActive={setActive} className="bg-white h-[100vh]">
        Lorem Ipsum
      </Section>
    </div>
  )
}
