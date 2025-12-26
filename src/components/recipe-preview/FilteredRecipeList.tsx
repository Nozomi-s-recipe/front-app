/**
 * Client-side filtered recipe list component
 * Implementation for T017, T022, T023, T024, T030, T031, T038, T039, T040 - Integration of filters
 *
 * @see specs/001-recipe-filter/quickstart.md
 */

'use client';

import { useState, Suspense, useMemo, useEffect } from 'react';
import { RecipePreviewProps, RecipePreview } from './RecipePreview';
import { useRecipeFilters } from '@/hooks/useRecipeFilters';
import type { RecipeMetadata, Genre } from '@/lib/filters/filterTypes';
import { FilterSidebar } from '@/components/filters/FilterSidebar';
import { FilterDrawer } from '@/components/filters/FilterDrawer';
import { FilterButton } from '@/components/filters/FilterButton';
import { FilterSection } from '@/components/filters/FilterSection';
import { TimeFilter } from '@/components/filters/TimeFilter';
import { GenreFilter } from '@/components/filters/GenreFilter';
import { IngredientCountFilter } from '@/components/filters/IngredientCountFilter';
import { ActiveFilters } from '@/components/filters/ActiveFilters';
import {
  trackFilterApplied,
  trackFilterDrawerOpened,
  trackFilterCleared,
  trackFilterNoResults,
} from '@/utils/analytics';
import { SIDE_MENUS } from '@/utils/const';

interface FilteredRecipeListProps {
  recipes: RecipePreviewProps[];
  pageType?: 'category' | 'search' | 'home';
}

// Convert RecipePreviewProps to RecipeMetadata for filtering
function toRecipeMetadata(recipe: RecipePreviewProps): RecipeMetadata {
  return {
    id: recipe.recipeId,
    cookingTime: recipe.cookingTime,
    genres: [recipe.subCategory.id], // Use subCategory as genre
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
    clearFilter,
    clearAllFilters,
    hasActiveFilters,
    resultCount,
  } = useRecipeFilters(recipeMetadata);

  // Filter the original recipes based on filtered IDs
  const displayRecipes = recipes.filter((recipe) =>
    filteredRecipes.some((filtered) => filtered.id === recipe.recipeId)
  );

  // Get available genres from all recipes
  const availableGenres: Genre[] = useMemo(() => {
    // Get all unique subCategory IDs from recipes
    const uniqueSubCategoryIds = new Set(recipes.map((r) => r.subCategory.id));

    // Map to Genre objects using SIDE_MENUS
    const genres: Genre[] = [];
    SIDE_MENUS.forEach((menu) => {
      menu.subCategories.forEach((subCat) => {
        if (uniqueSubCategoryIds.has(subCat.id)) {
          genres.push({
            id: subCat.id,
            name: subCat.name,
          });
        }
      });
    });

    return genres;
  }, [recipes]);

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

  // Handle genre filter change with analytics (T026)
  const handleGenreFilterChange = (genreIds: string[]) => {
    updateFilters({ genres: genreIds });
    if (genreIds.length > 0) {
      trackFilterApplied({
        filterType: 'genre',
        filterValue: genreIds.join(','),
        totalActiveFilters: activeFilterCount + 1,
        resultCount,
      });
    }
  };

  // Handle ingredient count filter change with analytics (T033)
  const handleIngredientCountFilterChange = (
    value: typeof filters.ingredientRange
  ) => {
    updateFilters({ ingredientRange: value });
    if (value) {
      trackFilterApplied({
        filterType: 'ingredient_count',
        filterValue: value,
        totalActiveFilters: activeFilterCount + 1,
        resultCount,
      });
    }
  };

  // Handle removing individual genre (T036)
  const handleRemoveGenre = (genreId: string) => {
    const newGenres = filters.genres.filter((id) => id !== genreId);
    updateFilters({ genres: newGenres });
    trackFilterCleared({
      filterType: 'genre',
      previousResultCount: resultCount,
    });
  };

  // Handle clear all filters with analytics (T041)
  const handleClearAllFilters = () => {
    clearAllFilters();
    trackFilterCleared({
      filterType: 'all',
      previousResultCount: resultCount,
    });
  };

  // Track no results scenario (T042)
  useEffect(() => {
    if (hasActiveFilters && resultCount === 0) {
      const activeFilters: string[] = [
        filters.timeRange ? `time:${filters.timeRange}` : null,
        ...filters.genres.map((g) => `genre:${g}`),
        filters.ingredientRange
          ? `ingredients:${filters.ingredientRange}`
          : null,
      ].filter((item): item is string => item !== null);

      trackFilterNoResults({
        activeFilters,
      });
    }
  }, [hasActiveFilters, resultCount, filters]);

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
      <FilterSection>
        <GenreFilter
          genres={availableGenres}
          selectedGenres={filters.genres}
          onChange={handleGenreFilterChange}
        />
      </FilterSection>
      <FilterSection>
        <IngredientCountFilter
          value={filters.ingredientRange}
          onChange={handleIngredientCountFilterChange}
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
          {/* Active filters display (T038) */}
          <ActiveFilters
            filters={filters}
            availableGenres={availableGenres}
            onClearFilter={(filterType) => {
              clearFilter(filterType);
              trackFilterCleared({
                filterType:
                  filterType === 'genres'
                    ? 'genre'
                    : filterType === 'timeRange'
                    ? 'time'
                    : 'ingredient_count',
                previousResultCount: resultCount,
              });
            }}
            onClearAllFilters={handleClearAllFilters}
            onRemoveGenre={handleRemoveGenre}
          />

          {/* Result count (T039, T046) */}
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

          {/* Recipe grid or no results message (T040) */}
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
              <p className='text-sm text-muted-foreground mb-4'>
                フィルター条件を調整してみてください
              </p>
              {hasActiveFilters && (
                <button
                  onClick={handleClearAllFilters}
                  className='text-primary hover:underline font-medium'
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
