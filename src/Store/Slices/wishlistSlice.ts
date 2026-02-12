import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/config/api.config";
import { ENDPOINTS } from "@/Constants/api.constants";

interface WishlistState {
  items: string[]; // Store only IDs for quick lookup
  isLoading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetch",
  async (token: string) => {
    const response = await apiClient.get(ENDPOINTS.WISHLIST.BASE, {
      headers: { token },
    });
    return response.data.data.map((item: any) => item.id);
  }
);

export const toggleWishlist = createAsyncThunk(
  "wishlist/toggle",
  async ({ id, token }: { id: string; token: string }) => {
    const response = await apiClient.post(
      ENDPOINTS.WISHLIST.BASE,
      { productId: id },
      { headers: { token } }
    );
    return { id, action: response.data.status };
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(toggleWishlist.fulfilled, (state, action: any) => {
        const id = action.payload.id;
        if (state.items.includes(id)) {
          state.items = state.items.filter((itemId) => itemId !== id);
        } else {
          state.items.push(id);
        }
      });
  },
});

export default wishlistSlice.reducer;
