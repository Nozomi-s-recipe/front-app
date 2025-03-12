'use client';

import { Label } from '@/components/ui/label';
import { Minus, Plus } from 'lucide-react';
import { useServings } from './servings.context';

export const Servings = () => {
  const { servings, incrementServings, decrementServings } = useServings();

  return (
    <div className='flex flex-col items-center space-y-2'>
      <Label htmlFor='servings-output' className='text-base'>
        人数
      </Label>
      <div
        className='flex items-center space-x-4'
        role='group'
        aria-labelledby='servings-label'
      >
        {/* clickイベントが伝搬されないのでネイティブのボタンを使用 */}
        <button
          type='button'
          onClick={decrementServings}
          aria-label='人数を減らす'
          className='w-12 h-12 rounded-full border border-input bg-background hover:bg-accent flex items-center justify-center relative'
        >
          <span className='pointer-events-none absolute inset-0 flex items-center justify-center'>
            <Minus className='h-4 w-4' />
          </span>
        </button>
        <output
          id='servings-output'
          className='text-xl font-light min-w-[2ch] text-center'
        >
          {servings}
        </output>
        <button
          type='button'
          onClick={incrementServings}
          aria-label='人数を増やす'
          className='w-12 h-12 rounded-full border border-input bg-background hover:bg-accent flex items-center justify-center relative'
        >
          <span className='pointer-events-none absolute inset-0 flex items-center justify-center'>
            <Plus className='h-4 w-4' />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Servings;
