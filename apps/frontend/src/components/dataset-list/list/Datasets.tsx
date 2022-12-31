import { ICategory, IDatasetCard } from 'lib/@types/dataset-types'
import React, { Dispatch, SetStateAction } from 'react'
import { RelevanceFiltering } from './RelevanceFiltering'
import { SearchAndFiltering } from './search-filtering/SearchAndFiltering'
import { SmCategories } from './SmCategories'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { DatasetCards } from './DatasetCards'
import { INotFound } from 'lib/@types/global-types'
import { SanityImg } from 'sanity-react-extra'
import { imageUrlBuilder } from 'src/utils/sanity'

interface DatasetsProps {
  className?: string
  datasets: IDatasetCard[]
  taskTypes: ICategory[]
  labelFormat: ICategory[]
  notFound: INotFound
  setDatasets: Dispatch<SetStateAction<IDatasetCard[]>>
}

export const CardAnimationVariants = {
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
    },
  }),
  hidden: (i: number) => ({
    opacity: 0,
    y: -100,
    transition: {
      delay: i * 0.05,
    },
  }),
}

export const Datasets: React.FC<DatasetsProps> = ({
  className,
  taskTypes,
  labelFormat,
  datasets,
  setDatasets,
  notFound: { description, header, image },
}) => {
  const rbAnim = useAnimation()

  const imgContainerStateOn = (e: any) => {
    const { clientX, clientY } = e
    const offsetX = clientX - window.innerWidth / 2
    const offsetY = clientY - window.innerHeight / 2

    rbAnim.start({ x: offsetX / 20, y: offsetY / 20 })
  }

  return (
    <div className={className}>
      <SmCategories
        className="block xl:hidden"
        categories={taskTypes}
        setDatasets={setDatasets}
        datasets={datasets}
      />
      <SearchAndFiltering
        labelFormat={labelFormat}
        taskTypes={taskTypes}
        setDatasets={setDatasets}
        datasets={datasets}
      />
      <RelevanceFiltering length={datasets.length} />
      <motion.div className="grid grid-cols-12 xl:gap-7 gap-3 ">
        <AnimatePresence exitBeforeEnter>
          {datasets?.length ? (
            datasets.map((dataset, index) => (
              <DatasetCards key={dataset._id} index={index} {...dataset} />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onMouseMove={imgContainerStateOn}
              onMouseLeave={() => {
                rbAnim.start({ x: 0, y: 0 })
              }}
              className="col-span-12 flex flex-col space-y-2 justify-center items-center h-full w-full mt-[5%]"
            >
              <h6 className="lg:text-2xl text-xl font-medium">{header}</h6>
              <p className="text-base">{description}</p>
              <motion.div animate={rbAnim}>
                <SanityImg
                  image={image}
                  builder={imageUrlBuilder}
                  width={400}
                  alt="Search result not found"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
