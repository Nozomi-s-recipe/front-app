'use client';
import Image from 'next/image';
import { useState } from 'react';
import { IngredientRow } from './IngredientRow';

type Unit = {
  name: string;
  position: 'suffix' | 'prefix';
};

export type Ingredient = {
  name: string;
  quantity: number;
  unit: Unit;
};

type IngredientListProps = {
  ingredients: Ingredient[];
  seasonings: Ingredient[];
};

export const IngredientList = ({
  ingredients,
  seasonings,
}: IngredientListProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='min-w-80'>
      <h2
        className='flex items-center justify-between w-full pb-1 text-xl font-semibold border-b-4 cursor-pointer font-mincho border-secondary-B'
        onClick={() => setIsOpen(!isOpen)}
      >
        材料
        <div
          className={`transform transition-transform duration-200 ${
            isOpen ? '' : '-rotate-180'
          }`}
        >
          <Image
            src='/chevron-up-black.svg'
            alt='chevron up icon'
            width={24}
            height={24}
            unoptimized
          />
        </div>
      </h2>
      <div
        className={`transition-all duration-200 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <table className='w-full mt-1 font-semibold font-mincho'>
          <thead>
            <tr>
              <th className='text-left'>食材</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((ingredient, i) => (
              <IngredientRow key={`ingredient-${i}`} ingredient={ingredient} />
            ))}
          </tbody>
        </table>
        <table className='w-full font-semibold font-mincho'>
          <thead>
            <tr>
              <th className='text-left'>調味料</th>
            </tr>
          </thead>
          <tbody>
            {seasonings.map((seasoning, i) => (
              <IngredientRow key={`seasoning-${i}`} ingredient={seasoning} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
