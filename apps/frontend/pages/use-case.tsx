import { PrimaryWrapper } from 'components/common/PrimaryWapper'
import Contact from 'components/Contact'
import Ellipse from 'components/Ellipse'
import UseCaseAssurance from 'components/useCase/UseCaseAssurance'
import UseCaseEnterprise from 'components/useCase/UseCaseEnterprise'
import UseCaseFeatures from 'components/useCase/UseCaseFeatures'
import UseCaseHome from 'components/useCase/UseCaseHome'
import UseCaseImages from 'components/useCase/UseCaseImages'
import { ContactUsPage } from 'lib/@types/contactUsTypes'
import { siteQuery } from 'lib/query'
import { Site } from 'lib/@types/types'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { renderObjectArray } from 'sanity-react-extra'
import { sanityStaticProps, useSanityQuery } from 'utils/sanity'
import { useCallback, useState } from 'react'
import { HomeSection } from 'lib/@types/useCaseTypes'

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "useCasePage"][0] {
    ...,
  },
}`

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
})

export default function UseCase(props: SanityProps<{ site: Site; page: ContactUsPage }>) {
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
          'useCase.home': useCallback(
            (p: HomeSection) => <UseCaseHome setHeroSectionHeight={setHeroSectionHeight} {...p} />,
            [],
          ),
        })}
      </PrimaryWrapper>

      <div
        className="bg-black relative h-full"
        style={{
          marginTop: `${heroSectionHeight}px`,
        }}
      >
        <PrimaryWrapper>
          {renderObjectArray(sections, {
            'useCase.example': UseCaseImages,
            'useCase.feature': UseCaseFeatures,
            'useCase.assurance': UseCaseAssurance,
            'useCase.enterprise': UseCaseEnterprise,
            contact: Contact,
          })}
        </PrimaryWrapper>
      </div>

      <>
        <Ellipse className="z-10 absolute top-[40vh] left-[15vw] w-[253px] h-[391px]" />
        <Ellipse className="z-10 absolute top-[30vh] right-[5vw] w-[253px] h-[391px]" />
        <Ellipse className="z-10 absolute top-[140vh] left-[5vw] w-[253px] h-[391px]" />
        <Ellipse className="z-10 absolute top-[20vh] right-[15vw] w-[153px] h-[391px]" />
      </>
    </div>
  )
}
