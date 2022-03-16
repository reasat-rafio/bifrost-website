import Contact from 'components/Contact'
import Ellipse from 'components/Ellipse'
import UseCaseAssurance from 'components/useCase/UseCaseAssurance'
// import UseCaseEnterprise from 'components/useCase/UseCaseEnterprise'
import UseCaseFeatures from 'components/useCase/UseCaseFeatures'
import UseCaseHome from 'components/useCase/UseCaseHome'
import UseCaseImages from 'components/useCase/UseCaseImages'
import { motion } from 'framer-motion'
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

  return (
    <motion.div>
      {renderObjectArray(sections, {
        'useCase.home': UseCaseHome,
        'useCase.example': UseCaseImages,
        'useCase.feature': UseCaseFeatures,
      })}

      <Ellipse className="z-10 absolute top-[40vh] left-[15vw] w-[253px] h-[391px]" />
      {renderObjectArray(sections, {
        'useCase.assurance': UseCaseAssurance,
      })}

      <Ellipse className="z-10 absolute top-[30vh] right-[5vw] w-[253px] h-[391px]" />
      <Ellipse className="z-10 absolute top-[140vh] left-[5vw] w-[253px] h-[391px]" />

      {/* {renderObjectArray(sections, {
        'useCase.enterprise': UseCaseEnterprise,
      })} */}
      <Ellipse className="z-10 absolute top-[20vh] right-[15vw] w-[153px] h-[391px]" />

      {renderObjectArray(sections, {
        contact: Contact,
      })}
    </motion.div>
  )
}
