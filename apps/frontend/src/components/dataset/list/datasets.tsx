import React from 'react'
import { RelevanceFiltering } from './RelevanceFiltering'
import { SearchAndFiltering } from './search-filtering/search-and-filtering'
import { SmCategories } from './sm-categories'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { DatasetCards } from './cards'
import useDatasetStore from 'store/dataset.store'

interface DatasetsProps {
  className?: string
  notFound: any
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
  // notFound: { description, header, image },
}) => {
  const { sortedDatasets, selectedCategory } = useDatasetStore()
  console.log(selectedCategory)

  const rbAnim = useAnimation()
  const imgContainerStateOn = (e: any) => {
    const { clientX, clientY } = e
    const offsetX = clientX - window.innerWidth / 2
    const offsetY = clientY - window.innerHeight / 2

    rbAnim.start({ x: offsetX / 20, y: offsetY / 20 })
  }

  return (
    <div className={className}>
      <SmCategories className="block xl:hidden" />
      <SearchAndFiltering />
      <RelevanceFiltering length={sortedDatasets.length} />
      <motion.div className="grid grid-cols-12 xl:gap-7 gap-3 ">
        <AnimatePresence exitBeforeEnter>
          {!!sortedDatasets?.length ? (
            sortedDatasets.map((dataset, index) => (
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
              {/* <h6 className="lg:text-2xl text-xl font-medium">{header}</h6>
              <p className="text-base">{description}</p>
              <motion.div animate={rbAnim}>
                <SanityImg
                  image={image}
                  builder={imageUrlBuilder}
                  width={400}
                  alt="Search result not found"
                />
              </motion.div> */}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
