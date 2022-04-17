import { ICategory } from 'lib/@types/datasetTypes'
import React from 'react'
import { Categories } from './Categories'

interface DatasetListProps {
  categories: ICategory[]
}

export const DatasetList: React.FC<DatasetListProps> = ({ categories }) => {
  return (
    <section className="container grid grid-cols-12 gap-20 pt-12">
      <Categories className="col-span-3" categories={categories} />
      <div className="col-span-9 "></div>
    </section>
  )
}
