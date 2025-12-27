/**
 * Ingredient count filter component with radio group UI
 * Implementation for T029, optimized with React.memo for T065
 *
 * @see specs/001-recipe-filter/quickstart.md
 */

'use client';

import { memo } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { INGREDIENT_FILTER_OPTIONS } from '@/lib/filters/filterTypes';
import type { IngredientRange } from '@/lib/filters/filterTypes';

interface IngredientCountFilterProps {
  value?: IngredientRange;
  onChange: (value: IngredientRange | undefined) => void;
}

/**
 * Ingredient count filter component with radio group for single-select
 * Allows users to filter recipes by number of ingredients
 */
export const IngredientCountFilter = memo(function IngredientCountFilter({
  value,
  onChange,
}: IngredientCountFilterProps) {
  return (
    <div className='space-y-3' role='group' aria-label='材料数フィルター'>
      <h3 className='font-semibold text-sm'>材料数</h3>
      <RadioGroup
        value={value}
        onValueChange={(v) => onChange(v as IngredientRange)}
      >
        {INGREDIENT_FILTER_OPTIONS.map((option) => (
          <div key={option.value} className='flex items-center space-x-2'>
            <RadioGroupItem
              value={option.value}
              id={`ingredient-${option.value}`}
              aria-label={option.label}
            />
            <Label
              htmlFor={`ingredient-${option.value}`}
              className='cursor-pointer text-sm font-normal'
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {value && (
        <button
          onClick={() => onChange(undefined)}
          className='text-sm text-muted-foreground hover:text-foreground transition-colors'
          aria-label='材料数フィルターをクリア'
        >
          クリア
        </button>
      )}
    </div>
  );
});
