import { ICategory, IDatasetCard } from 'src/lib/@types/datasetTypes'
import { INotFound } from 'src/lib/@types/types'
import React, { Dispatch, SetStateAction } from 'react'
import { Categories } from './Categories'
import { Datasets } from './Datasets'

interface DatasetListProps {
  categories: ICategory[]
  labelFormat: ICategory[]
  datasets: IDatasetCard[]
  setDatasets: Dispatch<SetStateAction<IDatasetCard[]>>
  notFound: INotFound
}

export const DatasetList: React.FC<DatasetListProps> = ({
  categories,
  labelFormat,
  datasets,
  setDatasets,
  notFound,
}) => {
  return (
    <section className="container grid grid-cols-12 xl:gap-20 pt-12">
      <Categories
        className="xl:col-span-3 hidden xl:block"
        setDatasets={setDatasets}
        categories={categories}
      />
      <Datasets
        className="xl:col-span-9 col-span-12"
        setDatasets={setDatasets}
        datasets={datasets}
        taskTypes={categories}
        labelFormat={labelFormat}
        notFound={notFound}
      />
    </section>
  )
}
