import { create } from "zustand";
import axios from "axios";

const fabulasStore = create((set, get) => {
  return {
    fabulas: [],
    setFabulas: async (url) => {
      const { data } = await axios.get(url);
      console.log("busque la data")
      const invertido = data.reverse();
      set({
        fabulas: [...invertido],
      });
    },
  };
});

export default fabulasStore;
