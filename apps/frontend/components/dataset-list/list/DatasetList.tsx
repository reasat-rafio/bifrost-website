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
    <section className="container grid grid-cols-12 gap-20 pt-12">
      <Categories className="col-span-3" categories={categories} />
      <Datasets
        className="col-span-9"
        datasets={datasets}
        taskTypes={categories}
        labelFormat={labelFormat}
      />
    </section>
  )
}
