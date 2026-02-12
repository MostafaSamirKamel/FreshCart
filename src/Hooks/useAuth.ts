"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { setAuth, logout as logoutAction, verifyToken } from "@/Store/Slices/authSlice";
import type { User } from "@/Types/auth.types";
import { ROUTES } from "@/Constants/app.constants";

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
