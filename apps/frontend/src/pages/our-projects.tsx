import { Contact } from 'components/common/contact'
import Newsletter from 'components/newsletter'
import { Hero, HeroProps } from 'components/our-projects/hero'
import { siteQuery } from 'lib/query'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { useCallback, useState } from 'react'
import { renderObjectArray, withDimensions } from 'sanity-react-extra'
import { useSanityQuery, sanityStaticProps } from 'utils/sanity'

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "ourProjectsPage"][0] {
    ...,
    sections[] {
      ...,
      "image": ${withDimensions('image')},
      projects[]{
        ...,
      "image": ${withDimensions('image')},
      }
    },
  }
}`

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
})

const OurProjects = (props: SanityProps<any>) => {
  const {
    data: { page },
  } = useSanityQuery(query, props)
  const [heroSectionHeight, setHeroSectionHeight] = useState(0)

  return (
    <>
      {renderObjectArray(page.sections, {
        'ourProjectsPage.hero': useCallback(
          (props: HeroProps) => <Hero {...props} setHeroSectionHeight={setHeroSectionHeight} />,
          [],
        ),
      })}

      <div className="z-20 relative bg-black" style={{ marginTop: heroSectionHeight }}>
        {renderObjectArray(page.sections, {
          newsletter: Newsletter,
          contact: Contact,
        })}
      </div>
    </>
  )
}

export default OurProjects
