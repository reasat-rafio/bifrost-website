import { create } from "zustand";
import { devtools } from "zustand/middleware";

type INavbarDimentions = {
  width: number;
  height: number;
};
interface IGlobalStore {
  showNavDropDown: boolean;
  navbarDimentions: INavbarDimentions;
  setShowNavDropDown: (data: boolean) => void;
  setNabarDimensions: (data: INavbarDimentions) => void;
}

const useGlobalStore = create(
  devtools<IGlobalStore>((set) => ({
    showNavDropDown: false,
    navbarDimentions: { height: 0, width: 0 },
    setShowNavDropDown: (showNavDropDown) =>
      set((state) => ({
        ...state,
        showNavDropDown,
      })),
    setNabarDimensions: (navbarDimentions) =>
      set((state) => ({
        ...state,
        navbarDimentions,
      })),
  }))
);

export default useGlobalStore;
