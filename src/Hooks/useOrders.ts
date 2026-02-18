"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/config/api.config";
import { ENDPOINTS } from "@/Constants/api.constants";
import { useAuth } from "./useAuth";

/**
 * Custom hook to fetch the current user's order history.
 */
export function useGetOrders() {
  const { user, isAuthenticated } = useAuth();
  const userId = user?.id || (user as any)?._id;

  return useQuery({
    queryKey: ["orders", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required to fetch orders");
      const response = await apiClient.get(ENDPOINTS.ORDERS.USER(userId));
      return response.data;
    },
    enabled: isAuthenticated && !!userId,
  });
}
