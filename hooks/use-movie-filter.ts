"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useMovieFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilters = useCallback((filters: Record<string, string>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    });

    router.push(`/explore?${newSearchParams.toString()}`, {
      scroll: false,
    });
  }, [router, searchParams]);

  return {
    query: searchParams.get('query') || '',
    genre: searchParams.get('genre') || '',
    sort_by: searchParams.get('sort_by') || '',
    year: searchParams.get('year') || '',
    page: Number.parseInt(searchParams.get('page') || '1', 10),
    updateFilters,
  };
};
