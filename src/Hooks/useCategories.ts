"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/config/api.config";
import { ENDPOINTS } from "@/Constants/api.constants";
import type { CategoriesApiResponse } from "@/Types/category.types";

/**
 * Custom hook for fetching all categories.
 */
export function useCategories() {
  const { data, isLoading, isError, error } = useQuery<CategoriesApiResponse>({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await apiClient.get(ENDPOINTS.CATEGORIES.LIST);
      return response.data;
    },
    staleTime: 1000 * 60 * 60, // 1 hour - categories don't change often
  });

  return {
    categories: data?.data ?? [],
    isLoading,
    isError,
    error,
  };
}
