import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/Types/product.types";

interface CompareState {
  items: Product[];
}

const initialState: CompareState = {
  items: [],
};

const MAX_COMPARE_ITEMS = 4;

const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    addToCompare: (state, action: PayloadAction<Product>) => {
      const exists = state.items.find((item) => item._id === action.payload._id);
      if (!exists && state.items.length < MAX_COMPARE_ITEMS) {
        state.items.push(action.payload);
      }
    },
    removeFromCompare: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    clearCompare: (state) => {
      state.items = [];
    },
  },
});

export const { addToCompare, removeFromCompare, clearCompare } = compareSlice.actions;
export default compareSlice.reducer;
