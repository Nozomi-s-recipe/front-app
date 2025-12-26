/**
 * Mobile/tablet filter drawer component
 * Implementation for T015
 *
 * @see specs/001-recipe-filter/quickstart.md
 */

'use client';

import { ReactNode } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface FilterDrawerProps {
  children: ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger: ReactNode;
  onClearAll?: () => void;
  hasActiveFilters?: boolean;
}

export function FilterDrawer({
  children,
  open,
  onOpenChange,
  trigger,
  onClearAll,
  hasActiveFilters = false,
}: FilterDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        side='left'
        className='w-[300px] sm:w-[400px] overflow-y-auto'
        aria-label='レシピフィルター'
      >
        <SheetHeader>
          <div className='flex items-center justify-between'>
            <SheetTitle>フィルター</SheetTitle>
            {hasActiveFilters && onClearAll && (
              <button
                onClick={() => {
                  onClearAll();
                  onOpenChange(false);
                }}
                className='text-sm text-primary hover:underline'
                aria-label='すべてのフィルターをクリア'
              >
                すべてクリア
              </button>
            )}
          </div>
        </SheetHeader>
        <div className='mt-6 space-y-0'>{children}</div>
      </SheetContent>
    </Sheet>
  );
}
