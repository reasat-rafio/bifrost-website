import Contact from 'src/components/Contact'
import ContactHome from 'src/components/contact/ContactHome'
import Ellipse from 'src/components/Ellipse'
import { ContactUsPage, HomeSection } from 'src/lib/@types/contactUsTypes'
import { siteQuery } from 'src/lib/query'
import { Site } from 'src/lib/@types/types'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { renderObjectArray } from 'sanity-react-extra'
import { sanityStaticProps, useSanityQuery } from 'src/utils/sanity'
import { useCallback, useState } from 'react'
import { PrimaryWrapper } from 'src/components/common/PrimaryWapper'
// import SmoothScroll from 'components/ui/SmoothScrolling'

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

  const [heroSectionHeight, setHeroSectionHeight] = useState(0)

  return (
    <div>
      <Ellipse className="z-10 absolute top-[20vh] right-[15vw] w-[153px] h-[391px]" />

      <PrimaryWrapper>
        {renderObjectArray(sections, {
          'contact.home': useCallback(
            (p: HomeSection) => <ContactHome setHeroSectionHeight={setHeroSectionHeight} {...p} />,
            [],
          ),
        })}
      </PrimaryWrapper>
      <div
        className="bg-black"
        style={{
          transform: `translate(0, ${heroSectionHeight}px)`,
          marginBottom: `${heroSectionHeight}px`,
        }}
      >
        <PrimaryWrapper>
          {renderObjectArray(sections, {
            contact: Contact,
          })}
        </PrimaryWrapper>
      </div>
    </div>
  )
}
