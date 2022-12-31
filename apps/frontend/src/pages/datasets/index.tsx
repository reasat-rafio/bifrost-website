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
import Home from 'src/components/dataset-list/Home'
import { ICategory, IDatasetCard } from 'lib/@types/dataset-types'
import { DatasetList } from 'src/components/dataset-list/list/DatasetList'
import { useCtx } from 'src/context/global'
import { Contact } from 'components/common/contact'

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
      page: { sections, notFound },
      categories,
      labelFormat,
      datasets,
    },
  } = useSanityQuery(query, props)
  const {
    action: { setAllDataSets },
  } = useCtx()

  const [heroSectionHeight, setHeroSectionHeight] = useState(0)
  const [_datasets, setDatasets] = useState(datasets)

  useEffect(() => {
    setAllDataSets(datasets)
  }, [])

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
          <DatasetList
            datasets={_datasets}
            setDatasets={setDatasets}
            categories={categories}
            labelFormat={labelFormat}
            notFound={notFound}
          />
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
