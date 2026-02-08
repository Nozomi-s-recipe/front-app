'use client';

import { Clock, Utensils, ShoppingBag } from 'lucide-react';
import { useRecipeFilters } from '@/hooks/useRecipeFilters';
import { SIDE_MENUS } from '@/utils/const';
import type {
  TimeRange,
  IngredientRange,
  RecipeMetadata,
} from '@/lib/filters/filterTypes';

interface CategoryFilterSectionProps {
  recipes: RecipeMetadata[];
  mainCategoryId?: string;
  onFilterChange?: () => void;
}

const timeOptions: { value: TimeRange; label: string; icon: string }[] = [
  { value: '0-15', label: '15分以内', icon: '⚡' },
  { value: '15-30', label: '15〜30分', icon: '🕐' },
  { value: '30-45', label: '30〜45分', icon: '🕑' },
  { value: '45-60', label: '45〜60分', icon: '🕒' },
  { value: '60+', label: '60分以上', icon: '🍲' },
];

// Icon mapping for different subcategories
const getSubcategoryIcon = (subCategoryId: string): string => {
  // Mediterranean icons
  if (subCategoryId.includes('pasta')) return '🍝';
  if (subCategoryId.includes('gratin')) return '🧀';
  if (subCategoryId.includes('meat')) return '🥩';
  if (subCategoryId.includes('seafood')) return '🐟';
  if (subCategoryId.includes('omelette') || subCategoryId.includes('egg'))
    return '🥚';
  if (subCategoryId.includes('sandwich') || subCategoryId.includes('bread'))
    return '🥖';
  if (subCategoryId.includes('appetizers') || subCategoryId.includes('salads'))
    return '🥗';
  if (subCategoryId.includes('sauce') || subCategoryId.includes('dressing'))
    return '🧂';

  // Japanese icons
  if (subCategoryId.includes('rice')) return '🍚';
  if (subCategoryId.includes('noodles')) return '🍜';
  if (subCategoryId.includes('soups')) return '🍵';
  if (subCategoryId.includes('hot-pots')) return '🍲';
  if (subCategoryId.includes('fried')) return '🍤';
  if (subCategoryId.includes('simmered')) return '🍲';
  if (subCategoryId.includes('steamed')) return '🥘';
  if (subCategoryId.includes('grilled')) return '🔥';
  if (subCategoryId.includes('side-dishes')) return '🥗';
  if (subCategoryId.includes('pickles')) return '🥒';

  // Chinese icons
  if (subCategoryId.includes('stir-fry')) return '🥘';
  if (subCategoryId.includes('braised')) return '🍜';
  if (subCategoryId.includes('dim-sum') || subCategoryId.includes('dumplings'))
    return '🥟';
  if (subCategoryId.includes('seasonings')) return '🧂';

  // Sweets icons
  if (subCategoryId.includes('cakes')) return '🍰';
  if (subCategoryId.includes('cookies') || subCategoryId.includes('biscuits'))
    return '🍪';
  if (subCategoryId.includes('muffins')) return '🧁';
  if (subCategoryId.includes('puddings') || subCategoryId.includes('jellies'))
    return '🍮';
  if (subCategoryId.includes('ice-cream')) return '🍨';
  if (subCategoryId.includes('japanese-confections')) return '🍡';

  return '🍽️'; // Default icon
};

const ingredientOptions: { value: IngredientRange; label: string }[] = [
  { value: '0-5', label: '✨ 5個以下' },
  { value: '6-10', label: '6〜10個' },
  { value: '11-15', label: '11〜15個' },
  { value: '16-20', label: '16〜20個' },
  { value: '20+', label: '20個以上' },
];

export function CategoryFilterSection({
  recipes,
  mainCategoryId,
  onFilterChange,
}: CategoryFilterSectionProps) {
  const { filters, updateFilters, clearAllFilters } = useRecipeFilters(recipes);

  // Get subcategories for the current main category
  // If no mainCategoryId is provided (search page), show all subcategories
  const genreOptions = mainCategoryId
    ? SIDE_MENUS.find(
        (menu) => menu.mainCategory.id === mainCategoryId,
      )?.subCategories.map((subCategory) => ({
        value: subCategory.id,
        label: subCategory.name,
        icon: getSubcategoryIcon(subCategory.id),
      })) || []
    : SIDE_MENUS.flatMap((menu) =>
        menu.subCategories.map((subCategory) => ({
          value: subCategory.id,
          label: subCategory.name,
          icon: getSubcategoryIcon(subCategory.id),
        })),
      );

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
