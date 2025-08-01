import {
  addorRemoveFavoriteCamping,
  filterCamping,
  listCamping,
  listFavorites,
} from "@/api/camping";
import { create } from "zustand";

//Step1 Create Store

const CreateCampingStore = (set, get) => ({
  campings: [],
  favorites: [],
  center: null,
  actionListCamping: async (id) => {
    //code
    try {
      const res = await listCamping(id);
      // console.log('This is Zustand',res.data.result)
      set({ campings: res.data.result , center: res.data.center });
    } catch (error) {
      console.log(error);
    }
  },
  actionAddorRemoveFavorite: async (token, data) => {
    //code

    //logic
    try {
      const res = await addorRemoveFavoriteCamping(token, data);
      const camping = get().campings;
      //console.log(camping);
      const { campingId, isFavorite } = data;
      const updatedCamping = camping.map((item) => {
        return item.id === campingId
          ? { ...item, isFavorite: !isFavorite }
          : { ...item };
      });
      //   console.log("updatedCamping", updatedCamping);
      set({ campings: updatedCamping });

      //update favorite
      const favorites = get().favorites;
      const updatedFavorite = favorites.filter((item) => {
        return item.landmark.id !== campingId;
      });
      set({ favorites: updatedFavorite });

      //   console.log(res.data.message);
      return { success: true, message: res.data.message };
    } catch (error) {
      //   console.log(error?.response?.data?.message);
      const err = error?.response?.data?.message;
      return { success: false, message: err };
    }
  },
  actionListFavorite: async (token) => {
    try {
      const res = await listFavorites(token);
      // console.log(res.data.result)
      set({ favorites: res.data.result });
    } catch (error) {
      console.log(error);
    }
  },
  actionFilter: async (category = "", search = "") => {
    try {
      const res = await filterCamping(category, search);
      console.log("This is Zustand",res.data);
      set({campings:res.data.result , center: res.data.center})
    } catch (error) {
      console.log(error);
    }
  },
});

const useCampingStore = create(CreateCampingStore);

//Step2 Export Store

export default useCampingStore;
