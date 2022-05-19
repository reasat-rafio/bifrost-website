import { PrimaryWrapper } from 'components/common/PrimaryWapper'
import Contact from 'components/Contact'
import Ellipse from 'components/Ellipse'
import { HomeSection } from 'lib/@types/blogTypes'
import { siteQuery } from 'lib/query'
import { Site } from 'lib/@types/types'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { useCallback, useState } from 'react'
import { renderObjectArray, withDimensions } from 'sanity-react-extra'
import { sanityStaticProps, useSanityQuery } from 'utils/sanity'
import Home from 'components/dataset-list/Home'
import { ICategory, IDatasetCard } from 'lib/@types/datasetTypes'
import { DatasetList } from 'components/dataset-list/list/DatasetList'

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "datasetListPage"][0] {
    ...,
  },
  "datasets": *[_type == "dataset"][]{
    _id,
    heading,
    slug,
    subHeading,
    taskTypes,
    "image": ${withDimensions('images[0]')},
   categories[]->,
   tasks[]-> 
  },
  "categories": *[_type == "taskType"][] ,
  "labelFormat": *[_type == "labelFormat"][]
}`

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
})

export default function Dataset(
  props: SanityProps<{
    site: Site
    page: any
    categories: ICategory[]
    labelFormat: ICategory[]
    datasets: IDatasetCard[]
  }>,
) {
  const {
    data: {
      page: { sections },
      categories,
      labelFormat,
      datasets,
    },
  } = useSanityQuery(query, props)

  const [heroSectionHeight, setHeroSectionHeight] = useState(0)

  return (
    <div>
      <PrimaryWrapper>
        {renderObjectArray(sections, {
          'blog.home': useCallback(
            (p: HomeSection) => <Home setHeroSectionHeight={setHeroSectionHeight} {...p} />,
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
          <DatasetList datasets={datasets} categories={categories} labelFormat={labelFormat} />
          {renderObjectArray(sections, {
            contact: Contact,
          })}
        </PrimaryWrapper>
      </div>
      <>
        <Ellipse className="z-10 absolute top-[20vh] right-[15vw] w-[153px] h-[391px]" />
        <Ellipse className="z-10 absolute top-[0vh] right-[40vw] w-[353px] h-[391px]" />
        <Ellipse className="z-10 absolute top-[20vh] right-[15vw] w-[153px] h-[391px]" />
      </>
    </div>
  )
}
