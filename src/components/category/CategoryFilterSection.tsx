'use client';

import { Clock, Utensils, ShoppingBag } from 'lucide-react';
import { useRecipeFilters } from '@/hooks/useRecipeFilters';
import type {
  TimeRange,
  IngredientRange,
  RecipeMetadata,
} from '@/lib/filters/filterTypes';

interface CategoryFilterSectionProps {
  recipes: RecipeMetadata[];
  onFilterChange?: () => void;
}

const timeOptions: { value: TimeRange; label: string; icon: string }[] = [
  { value: '0-15', label: '15分以内', icon: '⚡' },
  { value: '15-30', label: '15〜30分', icon: '🕐' },
  { value: '30-45', label: '30〜45分', icon: '🕑' },
  { value: '45-60', label: '45〜60分', icon: '🕒' },
  { value: '60+', label: '60分以上', icon: '🍲' },
];

const genreOptions = [
  { value: 'japanese-rice-dishes', label: 'ご飯もの', icon: '🍚' },
  { value: 'japanese-fried-dishes', label: '揚げ物', icon: '🍤' },
  { value: 'japanese-grilled-dishes', label: '焼き物', icon: '🔥' },
  {
    value: 'japanese-side-dishes-and-salads',
    label: '和物・サラダ',
    icon: '🥗',
  },
  { value: 'japanese-simmered-dishes', label: '煮物', icon: '🍲' },
  { value: 'japanese-steamed-dishes', label: '蒸し物', icon: '🥘' },
];

const ingredientOptions: { value: IngredientRange; label: string }[] = [
  { value: '0-5', label: '✨ 5個以下' },
  { value: '6-10', label: '6〜10個' },
  { value: '11-15', label: '11〜15個' },
  { value: '16-20', label: '16〜20個' },
  { value: '20+', label: '20個以上' },
];

export function CategoryFilterSection({
  recipes,
  onFilterChange,
}: CategoryFilterSectionProps) {
  const { filters, updateFilters, clearAllFilters } = useRecipeFilters(recipes);

  const handleTimeClick = (value: TimeRange) => {
    updateFilters({
      timeRange: filters.timeRange === value ? undefined : value,
    });
    onFilterChange?.();
  };

  const handleGenreClick = (value: string) => {
    const newGenres = filters.genres.includes(value)
      ? filters.genres.filter((g) => g !== value)
      : [...filters.genres, value];
    updateFilters({ genres: newGenres });
    onFilterChange?.();
  };

  const handleIngredientClick = (value: IngredientRange) => {
    updateFilters({
      ingredientRange: filters.ingredientRange === value ? undefined : value,
    });
    onFilterChange?.();
  };

  const handleClearAll = () => {
    clearAllFilters();
    onFilterChange?.();
  };

  return (
    <section className='px-5 py-5 border-b border-md-outline'>
      <header className='flex justify-between items-center mb-4'>
        <h2 className='text-[14px] font-semibold text-md-on-surface flex items-center gap-1.5'>
          <span className='text-sm'>🔍</span>
          絞り込み
        </h2>
        <button
          onClick={handleClearAll}
          className='text-xs font-medium text-muted-foreground hover:text-md-on-surface transition-colors'
          type='button'
        >
          クリア
        </button>
      </header>

      {/* 調理時間 */}
      <div className='mb-5'>
        <p className='text-xs font-medium text-muted-foreground mb-2.5 flex items-center gap-1'>
          <Clock className='w-3 h-3' />
          調理時間
        </p>
        <div className='flex gap-2 overflow-x-auto scrollbar-hide pb-2'>
          {timeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleTimeClick(option.value)}
              className={`flex items-center gap-1 px-3.5 py-2.5 rounded-[10px] text-xs font-medium whitespace-nowrap transition-all duration-200 border-[1.5px] ${
                filters.timeRange === option.value
                  ? 'bg-md-on-surface text-md-surface border-md-on-surface'
                  : 'bg-md-surface-variant text-md-on-surface-variant border-transparent hover:bg-md-outline'
              }`}
              type='button'
            >
              <span className='text-[13px]'>{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* ジャンル */}
      <div className='mb-5'>
        <p className='text-xs font-medium text-muted-foreground mb-2.5 flex items-center gap-1'>
          <Utensils className='w-3 h-3' />
          ジャンル
        </p>
        <div className='flex gap-2 overflow-x-auto scrollbar-hide pb-2'>
          {genreOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleGenreClick(option.value)}
              className={`flex items-center gap-1 px-3.5 py-2.5 rounded-[10px] text-xs font-medium whitespace-nowrap transition-all duration-200 border-[1.5px] ${
                filters.genres.includes(option.value)
                  ? 'bg-md-on-surface text-md-surface border-md-on-surface'
                  : 'bg-md-surface-variant text-md-on-surface-variant border-transparent hover:bg-md-outline'
              }`}
              type='button'
            >
              <span className='text-[13px]'>{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* 材料数 */}
      <div>
        <p className='text-xs font-medium text-muted-foreground mb-2.5 flex items-center gap-1'>
          <ShoppingBag className='w-3 h-3' />
          材料数
        </p>
        <div className='flex gap-2 overflow-x-auto scrollbar-hide pb-2'>
          {ingredientOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleIngredientClick(option.value)}
              className={`px-3.5 py-2.5 rounded-[10px] text-xs font-medium whitespace-nowrap transition-all duration-200 border-[1.5px] ${
                filters.ingredientRange === option.value
                  ? 'bg-md-on-surface text-md-surface border-md-on-surface'
                  : 'bg-md-surface-variant text-md-on-surface-variant border-transparent hover:bg-md-outline'
              }`}
              type='button'
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
