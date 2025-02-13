'use client';

import { Button } from '@/components/ui/button';
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
        <Button
          variant='outline'
          size='icon'
          onClick={decrementServings}
          aria-label='人数を減らす'
          className='w-12 h-12 rounded-full'
        >
          <Minus />
        </Button>
        <output
          id='servings-output'
          className='text-xl font-light min-w-[2ch] text-center'
        >
          {servings}
        </output>
        <Button
          variant='outline'
          size='icon'
          onClick={incrementServings}
          aria-label='人数を増やす'
          className='w-12 h-12 rounded-full'
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
};

export default Servings;
