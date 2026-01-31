'use client';

import { X } from 'lucide-react';
import { useRecipeFilters } from '@/hooks/useRecipeFilters';
import type {
  RecipeMetadata,
  TimeRange,
  IngredientRange,
} from '@/lib/filters/filterTypes';

interface ActiveFiltersBarProps {
  recipes: RecipeMetadata[];
}

const timeLabels: Record<TimeRange, string> = {
  '0-15': '⚡ 15分以内',
  '15-30': '🕐 15〜30分',
  '30-45': '🕑 30〜45分',
  '45-60': '🕒 45〜60分',
  '60+': '🍲 60分以上',
};

const ingredientLabels: Record<IngredientRange, string> = {
  '0-5': '✨ 5個以下',
  '6-10': '6〜10個',
  '11-15': '11〜15個',
  '16-20': '16〜20個',
  '20+': '20個以上',
};

const genreLabels: Record<string, string> = {
  'japanese-rice-dishes': '🍚 ご飯もの',
  'japanese-fried-dishes': '🍤 揚げ物',
  'japanese-grilled-dishes': '🔥 焼き物',
  'japanese-side-dishes-and-salads': '🥗 和物・サラダ',
  'japanese-simmered-dishes': '🍲 煮物',
  'japanese-steamed-dishes': '🥘 蒸し物',
};

export function ActiveFiltersBar({ recipes }: ActiveFiltersBarProps) {
  const { filters, updateFilters, clearFilter } = useRecipeFilters(recipes);

  const hasActiveFilters =
    filters.timeRange !== undefined ||
    filters.genres.length > 0 ||
    filters.ingredientRange !== undefined;

  if (!hasActiveFilters) {
    return null;
  }

  const handleRemoveTime = () => {
    updateFilters({ timeRange: undefined });
  };

  const handleRemoveGenre = (genre: string) => {
    const newGenres = filters.genres.filter((g) => g !== genre);
    updateFilters({ genres: newGenres });
  };

  const handleRemoveIngredient = () => {
    updateFilters({ ingredientRange: undefined });
  };

  return (
    <div className='flex items-center gap-2 px-5 py-3 bg-md-surface-variant overflow-x-auto scrollbar-hide'>
      <span className='text-[11px] font-medium text-muted-foreground whitespace-nowrap'>
        適用中:
      </span>

      {filters.timeRange && (
        <span className='inline-flex items-center gap-1 px-2.5 py-1.5 bg-md-surface rounded-lg text-[11px] font-medium text-md-on-surface whitespace-nowrap'>
          {timeLabels[filters.timeRange]}
          <button
            onClick={handleRemoveTime}
            className='flex items-center justify-center w-3.5 h-3.5 bg-md-surface-variant rounded-full hover:bg-md-outline transition-colors'
            aria-label='削除'
            type='button'
          >
            <X className='w-2 h-2 stroke-muted-foreground stroke-[2.5]' />
          </button>
        </span>
      )}

      {filters.genres.map((genre) => (
        <span
          key={genre}
          className='inline-flex items-center gap-1 px-2.5 py-1.5 bg-md-surface rounded-lg text-[11px] font-medium text-md-on-surface whitespace-nowrap'
        >
          {genreLabels[genre] || genre}
          <button
            onClick={() => handleRemoveGenre(genre)}
            className='flex items-center justify-center w-3.5 h-3.5 bg-md-surface-variant rounded-full hover:bg-md-outline transition-colors'
            aria-label='削除'
            type='button'
          >
            <X className='w-2 h-2 stroke-muted-foreground stroke-[2.5]' />
          </button>
        </span>
      ))}

      {filters.ingredientRange && (
        <span className='inline-flex items-center gap-1 px-2.5 py-1.5 bg-md-surface rounded-lg text-[11px] font-medium text-md-on-surface whitespace-nowrap'>
          {ingredientLabels[filters.ingredientRange]}
          <button
            onClick={handleRemoveIngredient}
            className='flex items-center justify-center w-3.5 h-3.5 bg-md-surface-variant rounded-full hover:bg-md-outline transition-colors'
            aria-label='削除'
            type='button'
          >
            <X className='w-2 h-2 stroke-muted-foreground stroke-[2.5]' />
          </button>
        </span>
      )}
    </div>
  );
}
