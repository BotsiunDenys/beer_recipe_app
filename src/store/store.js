import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useBeerStore = create()(
  immer((set, get) => ({
    fullBeerList: [],
    renderBeerList: [],
    isLoading: false,
    error: null,
    pageLoaded: 0,
    fetchRecipes: async () => {
      set({ isLoading: true });
      const page = get().pageLoaded;
      if (page) {
        try {
          const response = await fetch(
            `https://api.punkapi.com/v2/beers?page=${page}`
          );
          const json = await response.json();
          const renderList = json.slice(0, 15);
          set({
            fullBeerList: json,
            error: null,
            renderBeerList: renderList,
          });
        } catch (error) {
          set({ error: error.message });
        } finally {
          set({ isLoading: false });
        }
      }
    },
    deleteElements: (elementsToRemove) =>
      set((state) => {
        elementsToRemove.forEach((element) => {
          const id = element.id;
          const listElement = state.fullBeerList.find(
            (element) => element.id === id
          );
          const index = state.fullBeerList.indexOf(listElement);
          state.fullBeerList.splice(index, 1);
        });
        if (state.fullBeerList.length >= 15) {
          state.renderBeerList = state.fullBeerList.slice(0, 15);
        } else {
          state.renderBeerList = state.fullBeerList;
        }
      }),
    increasePageNum: () =>
      set((state) => ({ pageLoaded: state.pageLoaded + 1 })),
  }))
);
