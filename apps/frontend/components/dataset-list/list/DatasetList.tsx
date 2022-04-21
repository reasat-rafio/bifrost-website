import { ICategory, IDatasetCard } from 'lib/@types/datasetTypes'
import React from 'react'
import { Categories } from './Categories'
import { Datasets } from './Datasets'

interface DatasetListProps {
  datasets: IDatasetCard[]
  categories: ICategory[]
  labelFormat: ICategory[]
}

export const DatasetList: React.FC<DatasetListProps> = ({ categories, labelFormat, datasets }) => {
  return (
    <section className="container grid grid-cols-12 xl:gap-20 pt-12">
      <Categories className="xl:col-span-3 hidden xl:block" categories={categories} />
      <Datasets
        className="xl:col-span-9 col-span-12"
        datasets={datasets}
        taskTypes={categories}
        labelFormat={labelFormat}
      />
    </section>
  )
}
