import {
  CategoriesProps,
  IDatasetListPreview,
  ISortingType,
  VenueProps,
} from 'lib/@types/dataset-types'
import create from 'zustand'
import { devtools } from 'zustand/middleware'

interface IDatasetStore {
  page: number
  cardsPerPage: number
  selectedCategory: CategoriesProps | null
  selectedVenue: VenueProps | null
  selectedSortingType: ISortingType
  allDatasets: IDatasetListPreview[]
  sortedDatasets: IDatasetListPreview[]
  setPage: (data: number) => void
  setSortedDatasets: (data: IDatasetListPreview[]) => void
  setAllDatasets: (data: IDatasetListPreview[]) => void
  setSelectedSortingType: (data: ISortingType) => void
}

const useDatasetStore = create(
  devtools<IDatasetStore>((set) => ({
    page: 1,
    cardsPerPage: 6,
    selectedCategory: null,
    selectedVenue: null,
    selectedSortingType: 'most-recent',
    allDatasets: [],
    sortedDatasets: [],
    setPage: (page) => set((state) => ({ ...state, page })),
    setSortedDatasets: (sortedDatasets) => set((state) => ({ ...state, sortedDatasets })),
    setAllDatasets: (allDatasets) => set((state) => ({ ...state, allDatasets })),
    setSelectedSortingType: (selectedSortingType) =>
      set((state) => ({ ...state, selectedSortingType })),
  })),
)

export default useDatasetStore
