'use client';

import { Users, Minus, Plus } from 'lucide-react';
import { useServings } from '@/components/recipe-detail/ingredient-section/recipe-stats/servings.context';

export const ServingAdjuster = () => {
  const { servings, incrementServings, decrementServings } = useServings();

  return (
    <div className='flex items-center justify-center gap-6 py-5 my-6 border-t border-b border-[#e8edeb]'>
      <button
        onClick={decrementServings}
        disabled={servings <= 1}
        className='w-10 h-10 bg-[#f5f7f6] border-none rounded-full text-xl text-[#5a6e68] cursor-pointer transition-all duration-200 flex items-center justify-center hover:bg-[#e8edeb] hover:text-[#1a2e28] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed'
        aria-label='人数を減らす'
      >
        <Minus className='w-5 h-5' />
      </button>

      <div className='flex items-center gap-3'>
        <Users className='w-8 h-8 stroke-[#8a9e98]' strokeWidth={1.5} />
        <span className='text-[15px] font-medium text-[#1a2e28]'>
          {servings}人分
        </span>
      </div>

      <button
        onClick={incrementServings}
        disabled={servings >= 10}
        className='w-10 h-10 bg-[#f5f7f6] border-none rounded-full text-xl text-[#5a6e68] cursor-pointer transition-all duration-200 flex items-center justify-center hover:bg-[#e8edeb] hover:text-[#1a2e28] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed'
        aria-label='人数を増やす'
      >
        <Plus className='w-5 h-5' />
      </button>
    </div>
  );
};
