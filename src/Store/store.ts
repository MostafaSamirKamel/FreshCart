import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import cartReducer from "./Slices/cartSlice";
import wishlistReducer from "./Slices/wishlistSlice";
import compareReducer from "./Slices/compareSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    compare: compareReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
