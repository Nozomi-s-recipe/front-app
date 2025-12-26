/**
 * Desktop filter sidebar container component
 * Implementation for T013
 *
 * @see specs/001-recipe-filter/quickstart.md
 */

'use client';

import { ReactNode } from 'react';

interface FilterSidebarProps {
  children: ReactNode;
  onClearAll?: () => void;
  hasActiveFilters?: boolean;
}

export function FilterSidebar({
  children,
  onClearAll,
  hasActiveFilters = false,
}: FilterSidebarProps) {
  return (
    <aside
      className='hidden lg:block w-64 sticky top-20 h-fit'
      role='search'
      aria-label='レシピフィルター'
    >
      <div className='bg-card rounded-lg border p-4'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-lg font-semibold'>フィルター</h2>
          {hasActiveFilters && onClearAll && (
            <button
              onClick={onClearAll}
              className='text-sm text-primary hover:underline'
              aria-label='すべてのフィルターをクリア'
            >
              すべてクリア
            </button>
          )}
        </div>
        <div className='space-y-0'>{children}</div>
      </div>
    </aside>
  );
}
