import React from 'react'
import { Categories } from './categories'
import { Datasets } from './datasets'

interface DatasetListProps {
  notFound: any
}

export const DatasetList: React.FC<DatasetListProps> = ({ notFound }) => {
  return (
    <section className="container grid grid-cols-12 xl:gap-20 pt-12">
      <Categories className="xl:col-span-3 hidden xl:block" />
      <Datasets className="xl:col-span-9 col-span-12" notFound={notFound} />
    </section>
  )
}
