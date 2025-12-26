/**
 * Type definitions for recipe filtering feature
 * Based on data-model.md specification
 *
 * @see specs/001-recipe-filter/data-model.md
 */

// ============================================================================
// Filter State Types
// ============================================================================

/**
 * Cooking time range filter options (single-select)
 */
export type TimeRange = '0-15' | '15-30' | '30-45' | '45-60' | '60+';

/**
 * Ingredient count range filter options (single-select)
 */
export type IngredientRange = '0-5' | '6-10' | '11-15' | '16-20' | '20+';

/**
 * Central filter state synchronized with URL parameters
 *
 * All fields are optional - undefined/empty means filter not active
 * Multiple filters use AND logic across types, OR logic within genre array
 */
export interface FilterState {
  /**
   * Selected cooking time range (single-select)
   * @example "15-30"
   */
  timeRange?: TimeRange;

  /**
   * Selected genre IDs (multi-select with OR logic)
   * Empty array = no genre filter active
   * @example ["japanese", "italian"]
   */
  genres: string[];

  /**
   * Selected ingredient count range (single-select)
   * @example "0-5"
   */
  ingredientRange?: IngredientRange;
}

/**
 * Numeric range representation for filter matching
 */
export interface NumericRange {
  min: number;
  max: number;
}

// ============================================================================
// Recipe Types
// ============================================================================

/**
 * Minimum recipe metadata required for filtering
 * Recipes with undefined filterable fields are excluded from filtered results
 */
export interface RecipeMetadata {
  /** Recipe unique identifier */
  id: string;

  /** Total cooking time in minutes (undefined = excluded from time filters) */
  cookingTime?: number;

  /** Array of genre IDs (empty/undefined = excluded from genre filters) */
  genres?: string[];

  /** Number of ingredients (undefined = excluded from ingredient count filters) */
  ingredientCount?: number;
}

/**
 * Genre/category for filtering
 * Sourced from microCMS category taxonomy
 */
export interface Genre {
  /** Unique genre identifier (used in URLs and filters) */
  id: string;

  /** Display name for the genre */
  name: string;
}

// ============================================================================
// UI Types
// ============================================================================

/**
 * Generic filter option for rendering UI controls
 */
export interface FilterOption {
  /** Filter value (stored in state and URLs) */
  value: string;

  /** Human-readable label for display */
  label: string;

  /** Optional: number of recipes matching this filter */
  count?: number;
}

/**
 * Time range filter option with display metadata
 */
export interface TimeFilterOption extends FilterOption {
  value: TimeRange;
  range: NumericRange;
}

/**
 * Ingredient count filter option with display metadata
 */
export interface IngredientFilterOption extends FilterOption {
  value: IngredientRange;
  range: NumericRange;
}

// ============================================================================
// Function Signatures
// ============================================================================

/**
 * Filter recipes based on active filter criteria
 *
 * @param recipes - Array of recipes to filter
 * @param filters - Active filter state
 * @returns Filtered array of recipes matching all criteria
 *
 * @example
 * const filtered = filterRecipes(allRecipes, {
 *   timeRange: "15-30",
 *   genres: ["japanese", "italian"],
 *   ingredientRange: "0-5"
 * });
 */
export type FilterRecipesFunction = (
  recipes: RecipeMetadata[],
  filters: FilterState
) => RecipeMetadata[];

/**
 * Convert TimeRange string to numeric range
 *
 * @param range - Time range identifier
 * @returns Numeric min/max minutes
 *
 * @example
 * timeRangeToMinutes("15-30") // { min: 15, max: 30 }
 */
export type TimeRangeConverter = (range: TimeRange) => NumericRange;

/**
 * Convert IngredientRange string to numeric range
 *
 * @param range - Ingredient range identifier
 * @returns Numeric min/max count
 *
 * @example
 * ingredientRangeToCount("0-5") // { min: 0, max: 5 }
 */
export type IngredientRangeConverter = (range: IngredientRange) => NumericRange;

/**
 * Encode filter state to URL query string
 *
 * @param filters - Active filter state
 * @returns URL query string (without leading ?)
 *
 * @example
 * encodeFilters({ timeRange: "15-30", genres: ["japanese"], ingredientRange: undefined })
 * // Returns: "time=15-30&genre=japanese"
 */
export type EncodeFiltersFunction = (filters: FilterState) => string;

/**
 * Decode URL parameters to filter state
 *
 * @param searchParams - URLSearchParams from current URL
 * @returns Parsed filter state with validation
 *
 * @example
 * const params = new URLSearchParams("?time=15-30&genre=japanese,italian");
 * decodeFilters(params)
 * // Returns: { timeRange: "15-30", genres: ["japanese", "italian"], ingredientRange: undefined }
 */
export type DecodeFiltersFunction = (
  searchParams: URLSearchParams
) => FilterState;

// ============================================================================
// Constants
// ============================================================================

/**
 * All available time range options with display metadata
 */
export const TIME_FILTER_OPTIONS: readonly TimeFilterOption[] = [
  { value: '0-15', label: '15 minutes or less', range: { min: 0, max: 15 } },
  { value: '15-30', label: '15-30 minutes', range: { min: 15, max: 30 } },
  { value: '30-45', label: '30-45 minutes', range: { min: 30, max: 45 } },
  { value: '45-60', label: '45-60 minutes', range: { min: 45, max: 60 } },
  { value: '60+', label: 'Over 60 minutes', range: { min: 60, max: Infinity } },
] as const;

/**
 * All available ingredient count range options with display metadata
 */
export const INGREDIENT_FILTER_OPTIONS: readonly IngredientFilterOption[] = [
  { value: '0-5', label: '5 or less', range: { min: 0, max: 5 } },
  { value: '6-10', label: '6-10 ingredients', range: { min: 6, max: 10 } },
  { value: '11-15', label: '11-15 ingredients', range: { min: 11, max: 15 } },
  { value: '16-20', label: '16-20 ingredients', range: { min: 16, max: 20 } },
  { value: '20+', label: 'More than 20', range: { min: 20, max: Infinity } },
] as const;

/**
 * URL parameter keys for filter state
 */
export const FILTER_URL_PARAMS = {
  TIME: 'time',
  GENRE: 'genre',
  INGREDIENTS: 'ingredients',
} as const;

/**
 * Initial/empty filter state
 */
export const EMPTY_FILTER_STATE: FilterState = {
  timeRange: undefined,
  genres: [],
  ingredientRange: undefined,
};
