import About from 'components/about/about'
import Home from 'components/about/hero'
import Reason from 'components/about/reason'
import Team from 'components/about/team'
import { siteQuery } from 'src/lib/query'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { renderObjectArray, withDimensions } from 'sanity-react-extra'
import { sanityStaticProps, useSanityQuery } from 'src/utils/sanity'
import { PrimaryWrapper } from 'src/components/common/PrimaryWapper'
import { useCallback, useState } from 'react'
import { HomeProps } from 'lib/@types/about-us-types'
import { Contact } from 'components/common/contact'
import { Client } from 'components/common/client'
import { Newsletter } from 'components/common/newsletter'

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "aboutUsPage"][0] {
    ...,
    sections[] {
      ...,
      "image": ${withDimensions('image')},
      agendas[]{
        ...,
        "image": ${withDimensions('image')},
      },
      members[]{
        ...,
        "image": ${withDimensions('image')},
      },
    },
    "cleint" : *[_id == "client"][0] {
      ...,
      clients[]{
        ...,
        "logo": ${withDimensions('logo')},
      },
    },
  },
}`

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
})

export default function AboutUs(props: SanityProps<any>) {
  const {
    data: {
      page: { sections, cleint },
    },
  } = useSanityQuery(query, props)

  const [heroSectionHeight, setHeroSectionHeight] = useState(0)
  return (
    <div>
      <PrimaryWrapper>
        {renderObjectArray(sections, {
          'aboutUs.home': useCallback(
            (p: HomeProps) => <Home setHeroSectionHeight={setHeroSectionHeight} {...p} />,
            [],
          ),
        })}
      </PrimaryWrapper>
      <div
        className="bg-black"
        style={{
          transform: `translate(0, ${heroSectionHeight}px)`,
          marginBottom: heroSectionHeight,
        }}
      >
        <PrimaryWrapper>
          {renderObjectArray(sections, {
            'aboutUs.about': About,
            // 'aboutUs.reason': Reason,
            'aboutUs.team': Team,
          })}
          <Client {...cleint} />
          {renderObjectArray(sections, {
            newsletter: Newsletter,
            contact: Contact,
          })}
        </PrimaryWrapper>
      </div>

      <>
        {/* <Ellipse className="z-10 absolute top-[10vh] right-[5vw] w-[253px] h-[391px]" /> */}
        {/* <Ellipse className="z-10 absolute top-[0vh] right-[40vw] w-[353px] h-[391px]" /> */}
        {/* <Ellipse className="z-10 absolute top-[20vh] right-[15vw] w-[153px] h-[391px]" /> */}
      </>
    </div>
  )
}
