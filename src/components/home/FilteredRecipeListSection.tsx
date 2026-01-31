'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { RecipePreview } from '@/components/recipe-preview/RecipePreview';
import type { Recipe } from '@/utils/micro-cms/types';
import { getMainCategoryByMainId, getSubCategoryById } from '@/utils/const';
import { recipesToMetadata } from '@/lib/filters/recipeAdapter';
import { filterRecipes } from '@/lib/filters/filterRecipes';
import { decodeFilters } from '@/lib/filters/filterUrlParams';

interface FilteredRecipeListSectionProps {
  recipes: Recipe[];
  totalCount: number;
}

export const FilteredRecipeListSection = ({
  recipes,
  totalCount,
}: FilteredRecipeListSectionProps) => {
  const searchParams = useSearchParams();

  // Parse filters from URL
  const filters = useMemo(() => decodeFilters(searchParams), [searchParams]);

  // Convert recipes to metadata format
  const recipeMetadata = useMemo(() => recipesToMetadata(recipes), [recipes]);

  // Apply filters
  const filteredMetadata = useMemo(
    () => filterRecipes(recipeMetadata, filters),
    [recipeMetadata, filters],
  );

  // Get filtered recipe IDs
  const filteredIds = useMemo(
    () => new Set(filteredMetadata.map((m) => m.id)),
    [filteredMetadata],
  );

  // Filter the actual recipes
  const filteredRecipes = useMemo(
    () => recipes.filter((recipe) => filteredIds.has(recipe.id)),
    [recipes, filteredIds],
  );

  // Check if any filters are active
  const hasActiveFilters =
    filters.timeRange !== undefined ||
    filters.genres.length > 0 ||
    filters.ingredientRange !== undefined;

  return (
    <section className='px-5 py-5'>
      <header className='flex justify-between items-center mb-4'>
        <h2 className='text-[15px] font-semibold text-text-primary'>
          {hasActiveFilters ? '絞り込み結果' : '新着レシピ'}
        </h2>
        <span className='text-xs text-text-muted'>
          <strong className='text-text-primary'>
            {hasActiveFilters ? filteredRecipes.length : totalCount}
          </strong>
          件
        </span>
      </header>

      {filteredRecipes.length === 0 ? (
        <div className='text-center py-8 text-text-muted'>
          <p className='text-sm'>条件に合うレシピが見つかりませんでした</p>
        </div>
      ) : (
        <div className='flex flex-col gap-4'>
          {filteredRecipes.map((recipe, index) => (
            <RecipePreview
              key={recipe.id}
              image={{
                src: recipe.image.url,
                alt: recipe.name,
              }}
              recipeName={recipe.name}
              recipeId={recipe.id}
              cookingTime={recipe.cookingTime}
              ingredientsCount={
                recipe.ingredients.length + recipe.seasonings.length
              }
              mainCategory={
                getMainCategoryByMainId(recipe.mainCategory[0]) || {
                  id: recipe.mainCategory[0],
                  name: recipe.mainCategory[0],
                }
              }
              subCategory={
                getSubCategoryById(recipe.subCategory[0]) || {
                  id: recipe.subCategory[0],
                  name: recipe.subCategory[0],
                }
              }
              isPriority={index < 3}
              createdAt={recipe.createdAt}
              isPopular={recipe.isPopular}
              description={recipe.description}
            />
          ))}
        </div>
      )}
    </section>
  );
};
