import { ICategory } from 'lib/@types/datasetTypes'
import React from 'react'
import { SearchAndFiltering } from './search-filtering/SearchAndFiltering'

interface DatasetsProps {
  className?: string
  taskTypes: ICategory[]
  labelFormat: ICategory[]
}

export const Datasets: React.FC<DatasetsProps> = ({ className, taskTypes, labelFormat }) => {
  return (
    <div className={className}>
      <SearchAndFiltering labelFormat={labelFormat} taskTypes={taskTypes} />
    </div>
  )
}
