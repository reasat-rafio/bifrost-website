import {
  CategoriesProps,
  IDatasetListPreview,
  ISortingType,
  LabelFormatProps,
  TaskTypeProps,
} from "lib/@types/dataset-types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface IDatasetStore {
  page: number;
  cardsPerPage: number;
  selectedCategory: CategoriesProps | null;
  selectedTaskType: TaskTypeProps | null;
  selectedLabelFormat: LabelFormatProps | null;
  allCategories: CategoriesProps[];
  allLabelFormat: LabelFormatProps[];
  allTaskTypes: LabelFormatProps[];
  selectedSortingType: ISortingType;
  allDatasets: IDatasetListPreview[];
  sortedDatasets: IDatasetListPreview[];
  setPage: (data: number) => void;
  setSortedDatasets: (data: IDatasetListPreview[]) => void;
  setSelectedTaskType: (data: TaskTypeProps) => void;
  setSelectedLabelFormat: (data: CategoriesProps) => void;
  setSelectedCatagory: (data: LabelFormatProps) => void;
  setAllDatasets: (data: IDatasetListPreview[]) => void;
  setSelectedSortingType: (data: ISortingType) => void;
  setAllCategories: (data: CategoriesProps[]) => void;
  setAllTaskTypes: (data: CategoriesProps[]) => void;
  setAllLabelFormat: (data: LabelFormatProps[]) => void;
}

const useDatasetStore = create(
  devtools<IDatasetStore>((set) => ({
    page: 1,
    cardsPerPage: 12,
    selectedCategory: null,
    selectedTaskType: null,
    selectedLabelFormat: null,
    selectedSortingType: "most-recent",
    allCategories: [],
    allLabelFormat: [],
    allTaskTypes: [],
    allDatasets: [],
    sortedDatasets: [],
    setPage: (page) => set((state) => ({ ...state, page })),
    setSelectedTaskType: (selectedTaskType) =>
      set((state) => ({ ...state, selectedTaskType })),
    setSelectedCatagory: (selectedCategory) =>
      set((state) => ({ ...state, selectedCategory })),
    setSelectedLabelFormat: (selectedLabelFormat) =>
      set((state) => ({ ...state, selectedLabelFormat })),
    setSortedDatasets: (sortedDatasets) =>
      set((state) => ({ ...state, sortedDatasets })),
    setAllDatasets: (allDatasets) =>
      set((state) => ({ ...state, allDatasets })),
    setSelectedSortingType: (selectedSortingType) =>
      set((state) => ({ ...state, selectedSortingType })),
    setAllCategories: (allCategories) =>
      set((state) => ({ ...state, allCategories })),
    setAllLabelFormat: (allLabelFormat) =>
      set((state) => ({ ...state, allLabelFormat })),
    setAllTaskTypes: (allTaskTypes) =>
      set((state) => ({ ...state, allTaskTypes })),
  }))
);

export default useDatasetStore;
