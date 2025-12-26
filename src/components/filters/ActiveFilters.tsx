/**
 * Active filters display component with individual remove buttons
 * Implementation for T035, T036, T037
 *
 * @see specs/001-recipe-filter/quickstart.md
 */

'use client';

import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type {
  FilterState,
  TimeRange,
  IngredientRange,
  Genre,
} from '@/lib/filters/filterTypes';
import {
  TIME_FILTER_OPTIONS,
  INGREDIENT_FILTER_OPTIONS,
} from '@/lib/filters/filterTypes';

interface ActiveFiltersProps {
  filters: FilterState;
  availableGenres: Genre[];
  onClearFilter: (filterType: keyof FilterState) => void;
  onClearAllFilters: () => void;
  onRemoveGenre: (genreId: string) => void;
}

/**
 * Display active filters as removable pills/badges
 * Shows individual filters with X buttons and "Clear all" option
 */
export function ActiveFilters({
  filters,
  availableGenres,
  onClearFilter,
  onClearAllFilters,
  onRemoveGenre,
}: ActiveFiltersProps) {
  // Check if any filters are active
  const hasActiveFilters =
    filters.timeRange !== undefined ||
    filters.genres.length > 0 ||
    filters.ingredientRange !== undefined;

  if (!hasActiveFilters) {
    return null;
  }

  // Get label for time range
  const getTimeLabel = (range: TimeRange): string => {
    const option = TIME_FILTER_OPTIONS.find((opt) => opt.value === range);
    return option ? option.label : range;
  };

  // Get label for ingredient range
  const getIngredientLabel = (range: IngredientRange): string => {
    const option = INGREDIENT_FILTER_OPTIONS.find((opt) => opt.value === range);
    return option ? option.label : range;
  };

  // Get label for genre
  const getGenreLabel = (genreId: string): string => {
    const genre = availableGenres.find((g) => g.id === genreId);
    return genre ? genre.name : genreId;
  };

  return (
    <div
      className='flex flex-wrap items-center gap-2 mb-4'
      role='region'
      aria-label='アクティブフィルター'
    >
      <span className='text-sm font-medium text-muted-foreground'>
        フィルター:
      </span>

      {/* Time range filter pill */}
      {filters.timeRange && (
        <Badge
          variant='secondary'
          className='pl-3 pr-2 py-1 gap-1 hover:bg-secondary/80 transition-colors'
        >
          <span>{getTimeLabel(filters.timeRange)}</span>
          <button
            onClick={() => onClearFilter('timeRange')}
            className='ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5 transition-colors'
            aria-label={`${getTimeLabel(filters.timeRange)}フィルターを削除`}
          >
            <X className='h-3 w-3' />
          </button>
        </Badge>
      )}

      {/* Genre filter pills */}
      {filters.genres.map((genreId) => (
        <Badge
          key={genreId}
          variant='secondary'
          className='pl-3 pr-2 py-1 gap-1 hover:bg-secondary/80 transition-colors'
        >
          <span>{getGenreLabel(genreId)}</span>
          <button
            onClick={() => onRemoveGenre(genreId)}
            className='ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5 transition-colors'
            aria-label={`${getGenreLabel(genreId)}フィルターを削除`}
          >
            <X className='h-3 w-3' />
          </button>
        </Badge>
      ))}

      {/* Ingredient count filter pill */}
      {filters.ingredientRange && (
        <Badge
          variant='secondary'
          className='pl-3 pr-2 py-1 gap-1 hover:bg-secondary/80 transition-colors'
        >
          <span>{getIngredientLabel(filters.ingredientRange)}</span>
          <button
            onClick={() => onClearFilter('ingredientRange')}
            className='ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5 transition-colors'
            aria-label={`${getIngredientLabel(
              filters.ingredientRange
            )}フィルターを削除`}
          >
            <X className='h-3 w-3' />
          </button>
        </Badge>
      )}

      {/* Clear all button */}
      <button
        onClick={onClearAllFilters}
        className='text-sm text-primary hover:underline ml-2'
        aria-label='すべてのフィルターをクリア'
      >
        すべてクリア
      </button>
    </div>
  );
}
