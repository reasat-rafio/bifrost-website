import { Hero, HeroProps } from 'src/components/career/hero'
import { Perks } from 'src/components/career/perks'
import { siteQuery } from 'src/lib/query'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { useCallback, useState } from 'react'
import { renderObjectArray, withDimensions } from 'sanity-react-extra'
import { sanityStaticProps, useSanityQuery } from 'utils/sanity'
import { Contact } from 'src/components/common/contact'
import { Information } from 'components/common/information'
import { Resume } from 'components/career/resume'

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "careerPage"][0] {
    ...,
    sections[] {
      ...,
      "image": ${withDimensions('image')},
      perks[]{
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

const Career = (props: SanityProps<any>) => {
  const {
    data: { page },
  } = useSanityQuery(query, props)
  const [heroSectionHeight, setHeroSectionHeight] = useState(0)

  return (
    <div className="relative">
      {renderObjectArray(page.sections, {
        'careerPage.hero': useCallback(
          (props: HeroProps) => <Hero {...props} setHeroSectionHeight={setHeroSectionHeight} />,
          [],
        ),
      })}

      <div className="relative z-10 bg-black" style={{ marginTop: heroSectionHeight }}>
        {renderObjectArray(page.sections, {
          infoBlock: Information,
          'careerPage.perks': Perks,
          'careerPage.resume': Resume,
          contact: Contact,
        })}
      </div>
    </div>
  )
}

export default Career
