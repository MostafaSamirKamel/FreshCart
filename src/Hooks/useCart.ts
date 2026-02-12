"use client";

import { useCallback } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "./useRedux";
import {
  getCart,
  addToCartApi,
  updateQuantityApi,
  removeFromCartApi,
  clearCartApi,
} from "@/Store/Slices/cartSlice";

/**
 * Custom hook that encapsulates all cart-related state and actions.
 * Automatically injects the auth token and shows toast notifications.
 *
 * @example
 * const { items, totalAmount, addToCart, removeFromCart } = useCart();
 */
export function useCart() {
  const dispatch = useAppDispatch();

  const { items, totalQuantity, totalAmount, cartId, loading, error } =
    useAppSelector((state) => state.cart);

  const token = useAppSelector((state) => state.auth.token);

  const fetchCart = useCallback(() => {
    if (token) {
      dispatch(getCart(token));
    }
  }, [dispatch, token]);

  const addToCart = useCallback(
    async (productId: string) => {
      if (!token) {
        toast.error("Please login to add items to cart");
        return;
      }
      try {
        await dispatch(addToCartApi({ productId, token })).unwrap();
        toast.success("Added to cart!");
      } catch (err: any) {
        toast.error(err || "Failed to add to cart");
      }
    },
    [dispatch, token]
  );

  const updateQuantity = useCallback(
    async (productId: string, count: number) => {
      if (!token) return;
      try {
        await dispatch(updateQuantityApi({ productId, count, token })).unwrap();
      } catch (err: any) {
        toast.error(err || "Failed to update quantity");
      }
    },
    [dispatch, token]
  );

  const removeFromCart = useCallback(
    async (productId: string) => {
      if (!token) return;
      try {
        await dispatch(removeFromCartApi({ productId, token })).unwrap();
        toast.success("Removed from cart");
      } catch (err: any) {
        toast.error(err || "Failed to remove item");
      }
    },
    [dispatch, token]
  );

  const clearCart = useCallback(async () => {
    if (!token) return;
    try {
      await dispatch(clearCartApi(token)).unwrap();
      toast.success("Cart cleared");
    } catch (err: any) {
      toast.error(err || "Failed to clear cart");
    }
  }, [dispatch, token]);

  return {
    items,
    totalQuantity,
    totalAmount,
    cartId,
    loading,
    error,
    fetchCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };
}
