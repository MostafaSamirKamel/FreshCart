"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { setAuth, logout as logoutAction, verifyToken } from "@/Store/Slices/authSlice";
import type { User, LoginPayload as LoginCredentials, SignupPayload as RegisterCredentials } from "@/Types/auth.types";
import { ROUTES } from "@/Constants/app.constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/config/api.config";
import { ENDPOINTS } from "@/Constants/api.constants";
import { toast } from "react-toastify";

/**
 * Custom hook that encapsulates all auth-related state and actions.
 *
 * @example
 * const { user, token, isAuthenticated, handleLogout } = useAuth();
 */
export function useAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { user, token, isAuthenticated, isLoading, error } = useAppSelector(
    (state) => state.auth
  );

  const handleLogin = useCallback(
    (userData: User, userToken: string) => {
      dispatch(setAuth({ user: userData, token: userToken }));
    },
    [dispatch]
  );

  const handleLogout = useCallback(() => {
    dispatch(logoutAction());
    router.push(ROUTES.LOGIN);
  }, [dispatch, router]);

  const handleVerifyToken = useCallback(
    (tokenToVerify: string) => {
      dispatch(verifyToken(tokenToVerify));
    },
    [dispatch]
  );

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    handleLogin,
    handleLogout,
    handleVerifyToken,
  };
}

/**
 * Hook for login mutation
 */
export function useLogin() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await apiClient.post(ENDPOINTS.AUTH.SIGNIN, credentials);
      return response.data;
    },
    onSuccess: (data) => {
      dispatch(setAuth({ user: data.user, token: data.token }));
      queryClient.setQueryData(["user"], data.user);
      toast.success("Welcome back! Login successful.");
      router.push(ROUTES.HOME);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    },
  });
}

/**
 * Hook for register mutation
 */
export function useRegister() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: RegisterCredentials) => {
      const response = await apiClient.post(ENDPOINTS.AUTH.SIGNUP, credentials);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Account created successfully!");
      if (data.token && data.user) {
        dispatch(setAuth({ user: data.user, token: data.token }));
        router.push(ROUTES.HOME);
      } else {
        router.push(ROUTES.LOGIN);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Registration failed.");
    },
  });
}
