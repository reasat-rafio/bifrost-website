import { PrimaryWrapper } from 'src/components/common/PrimaryWapper'
import Ellipse from 'src/components/Ellipse'
import { HomeSection } from 'lib/@types/blog-types'
import { siteQuery } from 'src/lib/query'
import { Site } from 'lib/@types/global-types'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { groq } from 'next-sanity'
import { SanityProps } from 'next-sanity-extra'
import { useCallback, useEffect, useState } from 'react'
import { renderObjectArray, withDimensions } from 'sanity-react-extra'
import { sanityStaticProps, useSanityQuery } from 'src/utils/sanity'
import { ICategory, IDatasetListPreview } from 'lib/@types/dataset-types'
import { DatasetList } from 'components/dataset-list/list/dataset-list'
// import { useCtx } from 'src/context/global'
import { Contact } from 'components/common/contact'
import { Hero, HeroProps } from 'components/dataset-list/home'
import useDatasetStore from 'store/dataset.store'
import { FilteringLogic } from 'components/dataset-list/filter'

const query = groq`{
  "site": ${siteQuery},
  "page": *[_id == "datasetListPage"][0] {
    ...,
    notFound {
      ...,
    "image": ${withDimensions('image')},
    }
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
  "categories": *[_type == "category"][] ,
  "taskTypes": *[_type == "taskType"][] ,
  "labelFormat": *[_type == "labelFormat"][]
}`

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => ({
  props: await sanityStaticProps({ context, query }),
  revalidate: 10,
})

export default function Dataset(props: SanityProps<any>) {
  const {
    data: {
      page: { sections, notFound },
      categories,
      labelFormat,
      datasets,
      taskTypes,
    },
  } = useSanityQuery(query, props)

  const [heroSectionHeight, setHeroSectionHeight] = useState(0)

  const {
    setAllCategories,
    setAllLabelFormat,
    setAllDatasets,
    setSortedDatasets,
    setAllTaskTypes,
  } = useDatasetStore()

  useEffect(() => {
    setAllCategories(categories)
    setAllLabelFormat(labelFormat)
    setSortedDatasets(datasets)
    setAllDatasets(datasets)
    setAllTaskTypes(taskTypes)
  }, [setAllCategories, setAllLabelFormat, setSortedDatasets, setAllDatasets, setAllTaskTypes])

  return (
    <div>
      <PrimaryWrapper>
        {renderObjectArray(sections, {
          primaryHero: useCallback(
            (p: HeroProps) => <Hero setHeroSectionHeight={setHeroSectionHeight} {...p} />,
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
          <FilteringLogic>
            <DatasetList notFound={notFound} />
          </FilteringLogic>

          {renderObjectArray(sections, {
            contact: Contact,
          })}
        </PrimaryWrapper>
      </div>
      {/* <>
        <Ellipse className="z-10 absolute top-[20vh] right-[15vw] w-[153px] h-[391px]" />
        <Ellipse className="z-10 absolute top-[0vh] right-[40vw] w-[353px] h-[391px]" />
        <Ellipse className="z-10 absolute top-[20vh] right-[15vw] w-[153px] h-[391px]" />
      </> */}
    </div>
  )
}
