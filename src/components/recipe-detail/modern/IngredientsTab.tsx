'use client';

import { useState } from 'react';
import { useServings } from '@/components/recipe-detail/ingredient-section/recipe-stats/servings.context';

type Unit = {
  name: string;
  position: 'suffix' | 'prefix';
};

type Ingredient = {
  name: string;
  quantity: number;
  unit: Unit;
};

type IngredientsTabProps = {
  ingredients: Ingredient[];
  seasonings: Ingredient[];
  defaultServings?: number;
};

export const IngredientsTab = ({
  ingredients,
  seasonings,
  defaultServings = 1, // レシピデータは1人前がデフォルト
}: IngredientsTabProps) => {
  const { servings } = useServings();
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const calculateQuantity = (quantity: number) => {
    // レシピデータが1人前なので、選択された人数分を掛ける
    return (quantity * servings).toFixed(1).replace(/\.0$/, '');
  };

  const formatIngredient = (ingredient: Ingredient) => {
    const adjustedQuantity = calculateQuantity(ingredient.quantity);
    const { name: unitName, position } = ingredient.unit;

    // 単位が空の場合
    if (!unitName || unitName === '') {
      return `${ingredient.name} ${adjustedQuantity}`;
    }

    if (position === 'prefix') {
      return `${unitName}${adjustedQuantity}の${ingredient.name}`;
    }
    return `${ingredient.name} ${adjustedQuantity}${unitName}`;
  };

  const renderIngredientGroup = (
    title: string,
    items: Ingredient[],
    prefix: string,
  ) => (
    <div className='mb-7'>
      <h3 className='text-[15px] font-crimson font-semibold text-[#1a2e28] mb-4'>
        {title}
      </h3>
      <ul className='list-none'>
        {items.map((item, index) => {
          const id = `${prefix}-${index}`;
          const isChecked = checkedItems.has(id);

          return (
            <li
              key={id}
              onClick={() => toggleCheck(id)}
              className={`flex items-start gap-3 py-3 border-b border-[#e8edeb] last:border-b-0 cursor-pointer transition-all duration-200 hover:bg-[#f5f7f6] hover:-mx-3 hover:px-3 hover:rounded-xl ${
                isChecked ? 'opacity-60' : ''
              }`}
            >
              <div
                className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 transition-all duration-200 ${
                  isChecked ? 'bg-[#8a9e98]' : 'bg-[#5b7e6f]'
                }`}
              />
              <span
                className={`flex-1 text-[15px] leading-relaxed transition-all duration-200 ${
                  isChecked ? 'line-through text-[#8a9e98]' : 'text-[#5a6e68]'
                }`}
              >
                {formatIngredient(item)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <div>
      {renderIngredientGroup('食材', ingredients, 'ingredient')}
      {renderIngredientGroup('調味料', seasonings, 'seasoning')}
    </div>
  );
};
