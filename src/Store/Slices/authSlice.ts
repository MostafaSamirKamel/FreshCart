import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "@/config/api.config";
import { ENDPOINTS } from "@/Constants/api.constants";
import { setCookie, deleteCookie } from "@/Utils/cookie.util";
import type { User, AuthState } from "@/Types/auth.types";

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const verifyToken = createAsyncThunk(
  "auth/verifyToken",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(ENDPOINTS.AUTH.VERIFY_TOKEN, {
        headers: { token },
      });
      return { user: response.data.decoded, token };
    } catch (error: any) {
      deleteCookie("token");
      return rejectWithValue(error.response?.data?.message || "Invalid Token");
    }
  }
);

export const updateUserData = createAsyncThunk(
  "auth/updateUser",
  async (
    { name, email, phone, token }: { name: string; email: string; phone: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.put(
        ENDPOINTS.USERS.UPDATE_ME,
        { name, email, phone },
        { headers: { token } }
      );
      return response.data.user;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update profile");
    }
  }
);

export const changeUserPassword = createAsyncThunk(
  "auth/changePassword",
  async (
    { currentPassword, password, rePassword, token }: any,
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.put(
        ENDPOINTS.USERS.CHANGE_PASSWORD,
        { currentPassword, password, rePassword },
        { headers: { token } }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to change password");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      setCookie("token", action.payload.token);
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      deleteCookie("token");
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.isLoading = false;
        // Merge decoded JWT data with saved user data from localStorage
        // so fields like email (not in JWT) are preserved
        let savedUser: Partial<User> = {};
        if (typeof window !== "undefined") {
          try {
            const stored = localStorage.getItem("user");
            if (stored) savedUser = JSON.parse(stored);
          } catch {}
        }
        state.user = { ...savedUser, ...action.payload.user } as User;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = { ...state.user, ...action.payload };
        state.error = null;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setAuth, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
