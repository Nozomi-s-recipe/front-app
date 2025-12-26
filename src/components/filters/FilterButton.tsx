/**
 * Mobile filter toggle button component
 * Implementation for T016
 */

'use client';

import { Button } from '@/components/ui/button';
import { SlidersHorizontal } from 'lucide-react';

interface FilterButtonProps {
  filterCount?: number;
  onClick?: () => void;
}

export function FilterButton({ filterCount = 0, onClick }: FilterButtonProps) {
  return (
    <Button
      variant='outline'
      size='sm'
      onClick={onClick}
      className='lg:hidden gap-2'
      aria-label={`フィルターを表示${
        filterCount > 0 ? ` (${filterCount}件)` : ''
      }`}
      aria-expanded='false'
    >
      <SlidersHorizontal className='h-4 w-4' />
      <span>フィルター</span>
      {filterCount > 0 && (
        <span className='ml-1 rounded-full bg-primary text-primary-foreground px-2 py-0.5 text-xs font-medium'>
          {filterCount}
        </span>
      )}
    </Button>
  );
}
