import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/Store/store";

/**
 * Typed `useDispatch` hook for the app's Redux store.
 */
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

/**
 * Typed `useSelector` hook for the app's Redux store.
 */
export const useAppSelector = useSelector.withTypes<RootState>();
