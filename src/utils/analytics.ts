/**
 * Analytics tracking utilities
 * Implementation for T010 - Filter tracking events
 *
 * @see specs/001-recipe-filter/research.md
 */

declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Track when a filter is applied
 *
 * @param filterType - Type of filter applied (time, genre, ingredient_count)
 * @param filterValue - Value of the filter
 * @param totalActiveFilters - Total number of active filters
 * @param resultCount - Number of recipes matching the filters
 * @param userId - Optional user ID if authenticated
 */
export function trackFilterApplied(params: {
  filterType: 'time' | 'genre' | 'ingredient_count';
  filterValue: string;
  totalActiveFilters: number;
  resultCount: number;
  userId?: string;
}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'filter_applied', {
      filter_type: params.filterType,
      filter_value: params.filterValue,
      total_active_filters: params.totalActiveFilters,
      result_count: params.resultCount,
      user_id: params.userId,
    });
  }
}

/**
 * Track when a filter is cleared
 *
 * @param filterType - Type of filter cleared or 'all'
 * @param previousResultCount - Number of results before clearing
 */
export function trackFilterCleared(params: {
  filterType: 'time' | 'genre' | 'ingredient_count' | 'all';
  previousResultCount: number;
}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'filter_cleared', {
      filter_type: params.filterType,
      previous_result_count: params.previousResultCount,
    });
  }
}

/**
 * Track when filters result in no recipes
 *
 * @param activeFilters - Array of active filter descriptions
 * @param userId - Optional user ID if authenticated
 */
export function trackFilterNoResults(params: {
  activeFilters: string[];
  userId?: string;
}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'filter_no_results', {
      active_filters: params.activeFilters,
      user_id: params.userId,
    });
  }
}

/**
 * Track when mobile filter drawer is opened
 *
 * @param pageType - Type of page where drawer was opened
 */
export function trackFilterDrawerOpened(params: {
  pageType: 'category' | 'search' | 'home';
}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'filter_drawer_opened', {
      page_type: params.pageType,
    });
  }
}
