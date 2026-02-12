import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "@/config/api.config";
import { ENDPOINTS } from "@/Constants/api.constants";
import type { CartItem, CartState } from "@/Types/cart.types";

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  cartId: null,
  loading: false,
  error: null,
};

// Async Thunks
export const getCart = createAsyncThunk(
  "cart/getCart",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(ENDPOINTS.CART.BASE, {
        headers: { token },
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch cart");
    }
  }
);

export const addToCartApi = createAsyncThunk(
  "cart/add",
  async ({ productId, token }: { productId: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        ENDPOINTS.CART.BASE,
        { productId },
        { headers: { token } }
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to add to cart");
    }
  }
);

export const updateQuantityApi = createAsyncThunk(
  "cart/updateQuantity",
  async (
    { productId, count, token }: { productId: string; count: number; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.put(
        ENDPOINTS.CART.ITEM(productId),
        { count },
        { headers: { token } }
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to update quantity");
    }
  }
);

export const removeFromCartApi = createAsyncThunk(
  "cart/remove",
  async ({ productId, token }: { productId: string; token: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(ENDPOINTS.CART.ITEM(productId), {
        headers: { token },
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to remove item");
    }
  }
);

export const clearCartApi = createAsyncThunk(
  "cart/clear",
  async (token: string, { rejectWithValue }) => {
    try {
      await apiClient.delete(ENDPOINTS.CART.BASE, {
        headers: { token },
      });
      return null;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Failed to clear cart");
    }
  }
);

const handleFulfilled = (state: CartState, action: any) => {
  state.loading = false;
  const data = action.payload?.data;
  if (data) {
    state.items = data.products.map((p: any): CartItem => ({
      id: p.product._id || p.product.id,
      title: p.product.title,
      price: p.price,
      image: p.product.imageCover,
      quantity: p.count,
    }));
    state.totalAmount = data.totalCartPrice;
    state.totalQuantity = action.payload.numOfCartItems || 0;
    state.cartId = data._id;
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
      state.cartId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => { state.loading = true; })
      .addCase(getCart.fulfilled, handleFulfilled)
      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addToCartApi.pending, (state) => { state.loading = true; })
      .addCase(addToCartApi.fulfilled, handleFulfilled)
      .addCase(updateQuantityApi.fulfilled, handleFulfilled)
      .addCase(removeFromCartApi.fulfilled, handleFulfilled)
      .addCase(clearCartApi.fulfilled, (state) => {
        state.items = [];
        state.totalAmount = 0;
        state.totalQuantity = 0;
        state.cartId = null;
        state.loading = false;
      });
  },
});

export const { resetCart } = cartSlice.actions;
export default cartSlice.reducer;
