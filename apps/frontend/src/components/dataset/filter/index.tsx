import { useEffect } from 'react'
import useDatasetStore from 'store/dataset.store'

interface FilteringLogicProps {
  children: React.ReactNode
}

export const FilteringLogic: React.FC<FilteringLogicProps> = ({ children }) => {
  const {
    page,
    cardsPerPage,
    allDatasets,
    selectedCategory,
    selectedSortingType,
    selectedTaskType,
    selectedLabelFormat,
    setSortedDatasets,
  } = useDatasetStore()

  useEffect(() => {
    let filteredDatasets = allDatasets
    if (selectedSortingType || selectedTaskType || selectedCategory || selectedLabelFormat) {
      filteredDatasets = allDatasets
        .filter((dataset) => {
          if (selectedCategory && dataset?.categories) {
            const [matchedCategory] = dataset?.categories.filter(
              ({ _id }) => _id === selectedCategory._id,
            )
            return matchedCategory
          } else {
            return dataset
          }
        })
        .filter((dataset) => {
          if (selectedTaskType && dataset?.taskTypes) {
            const [matchedTaskType] = dataset?.taskTypes.filter(({ _id }) => {
              return _id === selectedTaskType._id
            })

            return matchedTaskType
          } else {
            return dataset
          }
        })
      // .filter((dataset) => {
      //   if (selectedLabelFormat) {
      //     const [matchedVanue] = dataset..filter(({ _id }) => {
      //       return _id === selectedTaskType._id
      //     })

      //     return matchedVanue
      //   } else {
      //     return dataset
      //   }
      // })

      //   if (selectedSorting === 'alphabet') {
      //     filteredEvents.sort((a, b) => (a.title > b.title ? 1 : -1))
      //   } else if (selectedSorting === 'date') {
      //     filteredEvents.sort((a, b) => (a.startAt > b.startAt ? 1 : -1))
      //   }
      setSortedDatasets(filteredDatasets.slice(0, cardsPerPage * page))
    }
    // Show More Filtering
    setSortedDatasets(filteredDatasets.slice(0, cardsPerPage * page))
  }, [page, selectedCategory])

  return <>{children}</>
}
