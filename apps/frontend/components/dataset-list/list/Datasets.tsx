import { ICategory, IDatasetCard } from 'lib/@types/datasetTypes'
import React from 'react'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'utils/sanity'
import { RelevanceFiltering } from './RelevanceFiltering'
import { SearchAndFiltering } from './search-filtering/SearchAndFiltering'

interface DatasetsProps {
  className?: string
  datasets: IDatasetCard[]
  taskTypes: ICategory[]
  labelFormat: ICategory[]
}

export const Datasets: React.FC<DatasetsProps> = ({
  className,
  taskTypes,
  labelFormat,
  datasets,
}) => {
  return (
    <div className={className}>
      <SearchAndFiltering labelFormat={labelFormat} taskTypes={taskTypes} />

      <RelevanceFiltering length={datasets.length} />

      <div className="grid grid-cols-12 gap-7 ">
        {datasets.map(({ image, subHeading, slug, taskTypes, _id, heading }) => (
          <div className="col-span-4 background__dark p-4 rounded-[15px]" key={_id}>
            <div>
              <SanityImg image={image} builder={imageUrlBuilder} alt={`${heading}'s image`} />
              <h6 className="truncate">{heading}</h6>
              <span>{subHeading}</span>
            </div>
            <div></div>
          </div>
        ))}
      </div>
    </div>
  )
}
