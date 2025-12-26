/**
 * Client-side filtered recipe list component
 * Implementation for T017 - Integration of time filter
 *
 * @see specs/001-recipe-filter/quickstart.md
 */

'use client';

import { useState, Suspense } from 'react';
import { RecipePreviewProps, RecipePreview } from './RecipePreview';
import { useRecipeFilters } from '@/hooks/useRecipeFilters';
import type { RecipeMetadata } from '@/lib/filters/filterTypes';
import { FilterSidebar } from '@/components/filters/FilterSidebar';
import { FilterDrawer } from '@/components/filters/FilterDrawer';
import { FilterButton } from '@/components/filters/FilterButton';
import { FilterSection } from '@/components/filters/FilterSection';
import { TimeFilter } from '@/components/filters/TimeFilter';
import { trackFilterApplied, trackFilterDrawerOpened } from '@/utils/analytics';

interface FilteredRecipeListProps {
  recipes: RecipePreviewProps[];
  pageType?: 'category' | 'search' | 'home';
}

// Convert RecipePreviewProps to RecipeMetadata for filtering
function toRecipeMetadata(recipe: RecipePreviewProps): RecipeMetadata {
  return {
    id: recipe.recipeId,
    cookingTime: recipe.cookingTime,
    genres: [], // Will be populated when genre filter is added
    ingredientCount: recipe.ingredientsCount,
  };
}

function FilteredRecipeListInner({
  recipes,
  pageType = 'category',
}: FilteredRecipeListProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const recipeMetadata = recipes.map(toRecipeMetadata);
  const {
    filters,
    filteredRecipes,
    updateFilters,
    clearAllFilters,
    hasActiveFilters,
    resultCount,
  } = useRecipeFilters(recipeMetadata);

  // Filter the original recipes based on filtered IDs
  const displayRecipes = recipes.filter((recipe) =>
    filteredRecipes.some((filtered) => filtered.id === recipe.recipeId)
  );

  // Count active filters
  const activeFilterCount = [
    filters.timeRange,
    filters.genres.length > 0 ? 'genres' : null,
    filters.ingredientRange,
  ].filter(Boolean).length;

  // Handle time filter change with analytics
  const handleTimeFilterChange = (value: typeof filters.timeRange) => {
    updateFilters({ timeRange: value });
    if (value) {
      trackFilterApplied({
        filterType: 'time',
        filterValue: value,
        totalActiveFilters: activeFilterCount + 1,
        resultCount,
      });
    }
  };

  // Handle drawer open with analytics
  const handleDrawerOpen = (open: boolean) => {
    if (open) {
      trackFilterDrawerOpened({ pageType });
    }
    setIsDrawerOpen(open);
  };

  // Filter content component (shared between sidebar and drawer)
  const FilterContent = () => (
    <>
      <FilterSection>
        <TimeFilter
          value={filters.timeRange}
          onChange={handleTimeFilterChange}
        />
      </FilterSection>
    </>
  );

  return (
    <div className='container mx-auto px-4'>
      {/* Mobile filter button */}
      <div className='lg:hidden mb-4'>
        <FilterButton
          filterCount={activeFilterCount}
          onClick={() => handleDrawerOpen(true)}
        />
      </div>

      {/* Mobile filter drawer */}
      <FilterDrawer
        open={isDrawerOpen}
        onOpenChange={handleDrawerOpen}
        trigger={<></>}
        onClearAll={clearAllFilters}
        hasActiveFilters={hasActiveFilters}
      >
        <FilterContent />
      </FilterDrawer>

      <div className='flex gap-8'>
        {/* Desktop filter sidebar */}
        <FilterSidebar
          onClearAll={clearAllFilters}
          hasActiveFilters={hasActiveFilters}
        >
          <FilterContent />
        </FilterSidebar>

        {/* Recipe list */}
        <main className='flex-1'>
          {/* Result count */}
          <div
            className='mb-4'
            role='status'
            aria-live='polite'
            aria-atomic='true'
          >
            <p className='text-sm text-muted-foreground'>
              {resultCount}件のレシピが見つかりました
            </p>
          </div>

          {/* Recipe grid */}
          {displayRecipes.length > 0 ? (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {displayRecipes.map((recipe) => (
                <div key={recipe.recipeId} className='w-fit mx-auto'>
                  <RecipePreview {...recipe} />
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-12'>
              <p className='text-muted-foreground mb-4'>
                フィルターに一致するレシピが見つかりませんでした
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className='text-primary hover:underline'
                >
                  すべてのフィルターをクリア
                </button>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export function FilteredRecipeList(props: FilteredRecipeListProps) {
  return (
    <Suspense
      fallback={
        <div className='container mx-auto px-4'>
          <div className='flex gap-8'>
            <div className='flex-1'>
              <p className='text-muted-foreground'>レシピを読み込み中...</p>
            </div>
          </div>
        </div>
      }
    >
      <FilteredRecipeListInner {...props} />
    </Suspense>
  );
}
