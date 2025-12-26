/**
 * URL parameter encoding/decoding for filter state
 * Implementation for T005, T006, T007, T008
 *
 * @see specs/001-recipe-filter/data-model.md
 */

import type { FilterState, TimeRange, IngredientRange } from './filterTypes';
import { FILTER_URL_PARAMS, EMPTY_FILTER_STATE } from './filterTypes';

/**
 * Encode filter state to URL query string
 * Implementation for T005
 *
 * @param filters - Active filter state
 * @returns URL query string (without leading ?)
 *
 * @example
 * encodeFilters({ timeRange: "15-30", genres: ["japanese"], ingredientRange: undefined })
 * // Returns: "time=15-30&genre=japanese"
 */
export function encodeFilters(filters: FilterState): string {
  const params = new URLSearchParams();

  // Add time filter if active
  if (filters.timeRange) {
    params.set(FILTER_URL_PARAMS.TIME, filters.timeRange);
  }

  // Add genre filter if active (comma-separated)
  if (filters.genres.length > 0) {
    params.set(FILTER_URL_PARAMS.GENRE, filters.genres.join(','));
  }

  // Add ingredient count filter if active
  if (filters.ingredientRange) {
    params.set(FILTER_URL_PARAMS.INGREDIENTS, filters.ingredientRange);
  }

  return params.toString();
}

/**
 * Decode URL parameters to filter state
 * Implementation for T006
 *
 * @param searchParams - URLSearchParams from current URL
 * @returns Parsed filter state with validation
 *
 * @example
 * const params = new URLSearchParams("?time=15-30&genre=japanese,italian");
 * decodeFilters(params)
 * // Returns: { timeRange: "15-30", genres: ["japanese", "italian"], ingredientRange: undefined }
 */
export function decodeFilters(searchParams: URLSearchParams): FilterState {
  const timeRange = searchParams.get(FILTER_URL_PARAMS.TIME);
  const genreParam = searchParams.get(FILTER_URL_PARAMS.GENRE);
  const ingredientRange = searchParams.get(FILTER_URL_PARAMS.INGREDIENTS);

  return {
    timeRange: isValidTimeRange(timeRange) ? timeRange : undefined,
    genres: genreParam ? genreParam.split(',').filter(Boolean) : [],
    ingredientRange: isValidIngredientRange(ingredientRange)
      ? ingredientRange
      : undefined,
  };
}

/**
 * Validate time range value
 * Implementation for T007
 *
 * @param value - Value to validate
 * @returns True if valid TimeRange
 */
export function isValidTimeRange(value: string | null): value is TimeRange {
  if (value === null) return false;
  const validRanges: TimeRange[] = ['0-15', '15-30', '30-45', '45-60', '60+'];
  return validRanges.includes(value as TimeRange);
}

/**
 * Validate ingredient range value
 * Implementation for T008
 *
 * @param value - Value to validate
 * @returns True if valid IngredientRange
 */
export function isValidIngredientRange(
  value: string | null
): value is IngredientRange {
  if (value === null) return false;
  const validRanges: IngredientRange[] = [
    '0-5',
    '6-10',
    '11-15',
    '16-20',
    '20+',
  ];
  return validRanges.includes(value as IngredientRange);
}
