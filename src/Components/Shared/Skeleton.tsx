"use client";

import React from "react";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded-xl ${className}`}
      aria-hidden="true"
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="card bg-white p-5 border-0 shadow-sm space-y-4">
      <Skeleton className="aspect-square w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-2/3" />
      </div>
      <div className="flex justify-between items-center pt-4">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="card bg-white p-6 border-0 shadow-sm flex flex-col items-center gap-4">
      <Skeleton className="w-24 h-24 rounded-full" />
      <Skeleton className="h-6 w-32" />
    </div>
  );
}
