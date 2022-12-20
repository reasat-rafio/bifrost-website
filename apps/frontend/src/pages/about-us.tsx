import AboutAbout from 'src/components/about/AboutAbout'
import AboutClients from 'src/components/about/AboutClients'
import AboutHome from 'src/components/about/AboutHome'
import AboutReason from 'src/components/about/AboutReason'
import AboutTeam from 'src/components/about/AboutTeam'
import Newsletter from 'components/newsletter'
import Ellipse from 'src/components/Ellipse'
import { ContactUsPage } from 'src/lib/@types/contactUsTypes'
import { siteQuery } from 'src/lib/query'
import { Site } from 'src/lib/@types/types'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { renderObjectArray } from 'sanity-react-extra'
import { sanityStaticProps, useSanityQuery } from 'src/utils/sanity'
import { PrimaryWrapper } from 'src/components/common/PrimaryWapper'
import { useCallback, useState } from 'react'
import { HomeSection } from 'src/lib/@types/aboutUsTypes'
import { Contact } from 'components/common/contact'

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

  const [heroSectionHeight, setHeroSectionHeight] = useState(0)

  return (
    <div>
      <PrimaryWrapper>
        {renderObjectArray(sections, {
          'aboutUs.home': useCallback(
            (p: HomeSection) => <AboutHome setHeroSectionHeight={setHeroSectionHeight} {...p} />,
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
            'aboutUs.about': AboutAbout,
            'aboutUs.reason': AboutReason,
            'aboutUs.team': AboutTeam,
            'aboutUs.clients': AboutClients,
            newsletter: Newsletter,
            contact: Contact,
          })}
        </PrimaryWrapper>
      </div>

      <>
        <Ellipse className="z-10 absolute top-[10vh] right-[5vw] w-[253px] h-[391px]" />
        <Ellipse className="z-10 absolute top-[0vh] right-[40vw] w-[353px] h-[391px]" />
        <Ellipse className="z-10 absolute top-[20vh] right-[15vw] w-[153px] h-[391px]" />
      </>
    </div>
  )
}
