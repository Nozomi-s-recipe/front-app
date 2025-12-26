/**
 * Core recipe filtering logic
 * Implementation for T004
 *
 * @see specs/001-recipe-filter/data-model.md
 */

import type { FilterState, RecipeMetadata } from './filterTypes';
import { timeRangeToMinutes, ingredientRangeToCount } from './filterTypes';

/**
 * Filter recipes based on active filter criteria
 * Uses hybrid logic: AND across filter types, OR within genre array
 *
 * @param recipes - Array of recipes to filter
 * @param filters - Active filter state
 * @returns Filtered array of recipes matching all criteria
 */
export function filterRecipes(
  recipes: RecipeMetadata[],
  filters: FilterState
): RecipeMetadata[] {
  return recipes.filter((recipe) => {
    // Time filter check (AND) - single select
    if (filters.timeRange) {
      // Exclude recipes without cooking time
      if (recipe.cookingTime === undefined) {
        return false;
      }

      const range = timeRangeToMinutes(filters.timeRange);
      const inRange =
        recipe.cookingTime >= range.min && recipe.cookingTime <= range.max;

      if (!inRange) {
        return false;
      }
    }

    // Genre filter check (OR within, AND across)
    if (filters.genres.length > 0) {
      // Exclude recipes without genres
      if (!recipe.genres || recipe.genres.length === 0) {
        return false;
      }

      // Check if recipe has at least one matching genre (OR logic)
      const hasMatchingGenre = recipe.genres.some((genre) =>
        filters.genres.includes(genre)
      );

      if (!hasMatchingGenre) {
        return false;
      }
    }

    // Ingredient count filter check (AND) - single select
    if (filters.ingredientRange) {
      // Exclude recipes without ingredient count
      if (recipe.ingredientCount === undefined) {
        return false;
      }

      const range = ingredientRangeToCount(filters.ingredientRange);
      const inRange =
        recipe.ingredientCount >= range.min &&
        recipe.ingredientCount <= range.max;

      if (!inRange) {
        return false;
      }
    }

    // Recipe passed all active filters
    return true;
  });
}
