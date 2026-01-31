'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useMemo, useCallback } from 'react';
import type { TimeRange } from '@/lib/filters/filterTypes';
import { encodeFilters, decodeFilters } from '@/lib/filters/filterUrlParams';

interface QuickFilter {
  id: string;
  icon: string;
  label: string;
  timeRange?: TimeRange;
  genre?: string;
}

const timeFilters: QuickFilter[] = [
  { id: 'time-15', icon: '⚡', label: '15分以内', timeRange: '0-15' },
  { id: 'time-30', icon: '🕐', label: '30分以内', timeRange: '15-30' },
];

const typeFilters: QuickFilter[] = [
  { id: 'rice', icon: '🍚', label: 'ご飯もの', genre: 'japanese-rice-dishes' },
  { id: 'fried', icon: '🍤', label: '揚げ物', genre: 'japanese-fried-dishes' },
  {
    id: 'grilled',
    icon: '🔥',
    label: '焼き物',
    genre: 'japanese-grilled-dishes',
  },
  {
    id: 'salad',
    icon: '🥗',
    label: '和物',
    genre: 'japanese-side-dishes-and-salads',
  },
];

export const QuickFilterSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentFilters = useMemo(
    () => decodeFilters(searchParams),
    [searchParams],
  );

  const isFilterActive = useCallback(
    (filter: QuickFilter): boolean => {
      if (filter.timeRange) {
        return currentFilters.timeRange === filter.timeRange;
      }
      if (filter.genre) {
        return currentFilters.genres.includes(filter.genre);
      }
      return false;
    },
    [currentFilters],
  );

  const toggleFilter = useCallback(
    (filter: QuickFilter) => {
      let newFilters = { ...currentFilters };

      if (filter.timeRange) {
        // Toggle time range (single select)
        newFilters.timeRange =
          newFilters.timeRange === filter.timeRange
            ? undefined
            : filter.timeRange;
      } else if (filter.genre) {
        // Toggle genre (multi-select)
        if (newFilters.genres.includes(filter.genre)) {
          newFilters.genres = newFilters.genres.filter(
            (g) => g !== filter.genre,
          );
        } else {
          newFilters.genres = [...newFilters.genres, filter.genre];
        }
      }

      const queryString = encodeFilters(newFilters);
      const newUrl = queryString ? `/?${queryString}` : '/';
      router.push(newUrl, { scroll: false });
    },
    [currentFilters, router],
  );

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (currentFilters.timeRange) count++;
    count += currentFilters.genres.length;
    return count;
  }, [currentFilters]);

  return (
    <section className='px-5 py-5 pb-6 border-b border-md-outline'>
      <header className='flex justify-between items-center mb-3'>
        <h3 className='text-[14px] font-semibold text-md-on-surface flex items-center gap-1.5'>
          <span className='text-[14px]'>🔍</span>
          絞り込み
          {activeFilterCount > 0 && (
            <span className='inline-flex items-center justify-center min-w-[18px] h-[18px] px-1.5 bg-md-primary rounded-full text-[10px] font-semibold text-md-on-primary ml-1.5'>
              {activeFilterCount}
            </span>
          )}
        </h3>
        <Link
          href='/search'
          className='text-xs font-medium text-md-on-surface-variant hover:text-md-on-surface flex items-center gap-0.5 transition-colors'
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
            onClick={() => toggleFilter(filter)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-[10px] text-xs font-medium whitespace-nowrap transition-all duration-200 border-[1.5px] ${
              isFilterActive(filter)
                ? 'bg-md-primary border-md-primary text-md-on-primary'
                : 'bg-md-surface-variant border-transparent text-md-on-surface hover:bg-md-outline'
            }`}
          >
            <span className='text-[13px] leading-none'>{filter.icon}</span>
            {filter.label}
          </button>
        ))}

        <div className='w-px h-5 bg-md-outline flex-shrink-0 self-center' />

        {typeFilters.map((filter) => (
          <button
            key={filter.id}
            type='button'
            onClick={() => toggleFilter(filter)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-[10px] text-xs font-medium whitespace-nowrap transition-all duration-200 border-[1.5px] ${
              isFilterActive(filter)
                ? 'bg-md-primary border-md-primary text-md-on-primary'
                : 'bg-md-surface-variant border-transparent text-md-on-surface hover:bg-md-outline'
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
