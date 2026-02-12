"use client";

import { useCallback } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "./useRedux";
import { fetchWishlist, toggleWishlist } from "@/Store/Slices/wishlistSlice";

/**
 * Custom hook that encapsulates wishlist state and toggle logic.
 *
 * @example
 * const { isInWishlist, toggle } = useWishlist();
 * <button onClick={() => toggle(productId)}> ♥ </button>
 */
export function useWishlist() {
  const dispatch = useAppDispatch();

  const { items, isLoading } = useAppSelector((state) => state.wishlist);
  const token = useAppSelector((state) => state.auth.token);

  const loadWishlist = useCallback(() => {
    if (token) {
      dispatch(fetchWishlist(token));
    }
  }, [dispatch, token]);

  const isInWishlist = useCallback(
    (productId: string) => items.includes(productId),
    [items]
  );

  const toggle = useCallback(
    async (productId: string) => {
      if (!token) {
        toast.error("Please login to use your wishlist");
        return;
      }
      const wasInWishlist = items.includes(productId);
      try {
        await dispatch(toggleWishlist({ id: productId, token })).unwrap();
        toast.success(wasInWishlist ? "Removed from wishlist" : "Added to wishlist");
      } catch (err: any) {
        toast.error(err || "Failed to update wishlist");
      }
    },
    [dispatch, token, items]
  );

  return {
    wishlistItems: items,
    isLoading,
    loadWishlist,
    isInWishlist,
    toggle,
  };
}
