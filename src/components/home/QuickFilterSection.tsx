'use client';

import { useState } from 'react';
import Link from 'next/link';

interface QuickFilter {
  id: string;
  icon: string;
  label: string;
}

const timeFilters: QuickFilter[] = [
  { id: 'time-15', icon: '⚡', label: '15分以内' },
  { id: 'time-30', icon: '🕐', label: '30分以内' },
];

const typeFilters: QuickFilter[] = [
  { id: 'rice', icon: '🍚', label: 'ご飯もの' },
  { id: 'fried', icon: '🍤', label: '揚げ物' },
  { id: 'grilled', icon: '🔥', label: '焼き物' },
  { id: 'salad', icon: '🥗', label: '和物' },
];

export const QuickFilterSection = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId],
    );
  };

  return (
    <section className='px-5 py-5 pb-6 border-b border-border-color'>
      <header className='flex justify-between items-center mb-3'>
        <h3 className='text-[14px] font-semibold text-text-primary flex items-center gap-1.5'>
          <span className='text-[14px]'>🔍</span>
          絞り込み
          {selectedFilters.length > 0 && (
            <span className='inline-flex items-center justify-center min-w-[18px] h-[18px] px-1.5 bg-text-primary rounded-full text-[10px] font-semibold text-white ml-1.5'>
              {selectedFilters.length}
            </span>
          )}
        </h3>
        <Link
          href='/search'
          className='text-xs font-medium text-text-muted hover:text-text-secondary flex items-center gap-0.5 transition-colors'
        >
          詳細検索
          <svg
            viewBox='0 0 24 24'
            className='w-3.5 h-3.5 stroke-current stroke-2 fill-none'
          >
            <polyline
              points='9 18 15 12 9 6'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </Link>
      </header>

      <div className='flex gap-2 overflow-x-auto scrollbar-none pb-2'>
        {timeFilters.map((filter) => (
          <button
            key={filter.id}
            type='button'
            onClick={() => toggleFilter(filter.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-[10px] text-xs font-medium whitespace-nowrap transition-all duration-200 border-[1.5px] ${
              selectedFilters.includes(filter.id)
                ? 'bg-text-primary border-text-primary text-white'
                : 'bg-cream border-transparent text-text-secondary hover:bg-border-color'
            }`}
          >
            <span className='text-[13px] leading-none'>{filter.icon}</span>
            {filter.label}
          </button>
        ))}

        <div className='w-px h-5 bg-border-color flex-shrink-0 self-center' />

        {typeFilters.map((filter) => (
          <button
            key={filter.id}
            type='button'
            onClick={() => toggleFilter(filter.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-[10px] text-xs font-medium whitespace-nowrap transition-all duration-200 border-[1.5px] ${
              selectedFilters.includes(filter.id)
                ? 'bg-text-primary border-text-primary text-white'
                : 'bg-cream border-transparent text-text-secondary hover:bg-border-color'
            }`}
          >
            <span className='text-[13px] leading-none'>{filter.icon}</span>
            {filter.label}
          </button>
        ))}
      </div>
    </section>
  );
};
