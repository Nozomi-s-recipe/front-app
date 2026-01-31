/**
 * Adapter to convert microCMS Recipe to RecipeMetadata format
 * for use with the filter library
 */

import type { Recipe } from '@/utils/micro-cms/types';
import type { RecipeMetadata } from './filterTypes';

/**
 * Convert a microCMS Recipe to RecipeMetadata format
 * @param recipe - microCMS Recipe object
 * @returns RecipeMetadata for filtering
 */
export function recipeToMetadata(recipe: Recipe): RecipeMetadata {
  return {
    id: recipe.id,
    cookingTime: recipe.cookingTime,
    genres: [...recipe.mainCategory, ...recipe.subCategory],
    ingredientCount: recipe.ingredients.length + recipe.seasonings.length,
  };
}

/**
 * Convert an array of microCMS Recipes to RecipeMetadata format
 * @param recipes - Array of microCMS Recipe objects
 * @returns Array of RecipeMetadata for filtering
 */
export function recipesToMetadata(recipes: Recipe[]): RecipeMetadata[] {
  return recipes.map(recipeToMetadata);
}
