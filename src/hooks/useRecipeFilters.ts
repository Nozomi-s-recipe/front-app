/**
 * Custom hook for recipe filter state management
 * Implementation for T009
 *
 * @see specs/001-recipe-filter/data-model.md
 */

'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo, useCallback } from 'react';
import type { FilterState, RecipeMetadata } from '@/lib/filters/filterTypes';
import { EMPTY_FILTER_STATE } from '@/lib/filters/filterTypes';
import { encodeFilters, decodeFilters } from '@/lib/filters/filterUrlParams';
import { filterRecipes } from '@/lib/filters/filterRecipes';

/**
 * Hook for managing recipe filters with URL synchronization
 *
 * @param recipes - Array of recipes to filter
 * @returns Filter state and control functions
 */
export function useRecipeFilters(recipes: RecipeMetadata[]) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Parse current filters from URL parameters
  const filters = useMemo(() => decodeFilters(searchParams), [searchParams]);

  // Filter recipes based on current filter state
  const filteredRecipes = useMemo(
    () => filterRecipes(recipes, filters),
    [recipes, filters]
  );

  // Update filters (updates URL)
  const updateFilters = useCallback(
    (newFilters: Partial<FilterState>) => {
      const updatedFilters: FilterState = {
        ...filters,
        ...newFilters,
      };
      const queryString = encodeFilters(updatedFilters);
      const newUrl = queryString ? `?${queryString}` : window.location.pathname;
      router.push(newUrl, { scroll: false });
    },
    [filters, router]
  );

  // Clear specific filter type
  const clearFilter = useCallback(
    (filterType: keyof FilterState) => {
      const clearedFilters = { ...filters };
      if (filterType === 'genres') {
        clearedFilters.genres = [];
      } else {
        clearedFilters[filterType] = undefined;
      }
      const queryString = encodeFilters(clearedFilters);
      const newUrl = queryString ? `?${queryString}` : window.location.pathname;
      router.push(newUrl, { scroll: false });
    },
    [filters, router]
  );

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    router.push(window.location.pathname, { scroll: false });
  }, [router]);

  // Check if any filters are active
  const hasActiveFilters =
    filters.timeRange !== undefined ||
    filters.genres.length > 0 ||
    filters.ingredientRange !== undefined;

  return {
    filters,
    filteredRecipes,
    updateFilters,
    clearFilter,
    clearAllFilters,
    hasActiveFilters,
    resultCount: filteredRecipes.length,
  };
}
