import { About } from 'src/components/career/about'
import { Hero, HeroProps } from 'src/components/career/hero'
import { Perks } from 'src/components/career/perks'
import { siteQuery } from 'src/lib/query'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { useCallback, useState } from 'react'
import { renderObjectArray, withDimensions } from 'sanity-react-extra'
import { sanityStaticProps, useSanityQuery } from 'src/utils/sanity'
import Contact from 'src/components/Contact'

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "careerPage"][0] {
    ...,
    sections[] {
      ...,
      "image": ${withDimensions('image')},
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
    <>
      {renderObjectArray(page.sections, {
        'careerPage.hero': useCallback(
          (props: HeroProps) => <Hero {...props} setHeroSectionHeight={setHeroSectionHeight} />,
          [],
        ),
      })}

      <div className="z-20 relative bg-black" style={{ marginTop: heroSectionHeight }}>
        {renderObjectArray(page.sections, {
          'careerPage.about': About,
          'careerPage.perks': Perks,
          contact: Contact,
        })}
      </div>
    </>
  )
}

export default Career
