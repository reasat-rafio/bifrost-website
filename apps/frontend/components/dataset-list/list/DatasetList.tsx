import { ICategory } from 'lib/@types/datasetTypes'
import React from 'react'
import { Categories } from './Categories'
import { Datasets } from './Datasets'

interface DatasetListProps {
  categories: ICategory[]
  labelFormat: ICategory[]
}

export const DatasetList: React.FC<DatasetListProps> = ({ categories, labelFormat }) => {
  return (
    <section className="container grid grid-cols-12 gap-20 pt-12">
      <Categories className="col-span-3" categories={categories} />
      <Datasets className="col-span-9" taskTypes={categories} labelFormat={labelFormat} />
    </section>
  )
}
