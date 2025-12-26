'use client';

import type { SearchSuggestion } from '@/hooks/useSearchSuggestions';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { forwardRef } from 'react';

type SearchSuggestionsProps = {
  suggestions: SearchSuggestion[];
  isLoading: boolean;
  error: string | null;
  selectedIndex: number;
  onSelect: (suggestion: SearchSuggestion) => void;
  onClose: () => void;
};

export const SearchSuggestions = forwardRef<
  HTMLDivElement,
  SearchSuggestionsProps
>(
  (
    { suggestions, isLoading, error, selectedIndex, onSelect, onClose },
    ref
  ) => {
    if (error) {
      return (
        <div
          ref={ref}
          className='absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto'
        >
          <div className='p-4 text-sm text-red-600'>
            エラーが発生しました。もう一度お試しください。
          </div>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div
          ref={ref}
          className='absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50'
        >
          <div className='p-4 flex items-center justify-center text-sm text-gray-500'>
            <Loader2 className='h-4 w-4 animate-spin mr-2' />
            検索中...
          </div>
        </div>
      );
    }

    if (suggestions.length === 0) {
      return (
        <div
          ref={ref}
          className='absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50'
        >
          <div className='p-4 text-sm text-gray-500'>
            レシピが見つかりませんでした
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className='absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto'
        role='listbox'
      >
        {suggestions.map((suggestion, index) => {
          const categoryPath = `/${suggestion.mainCategory[0]}/${suggestion.subCategory[0]}`;
          const recipePath = `${categoryPath}/${suggestion.id}`;

          return (
            <Link
              key={suggestion.id}
              href={recipePath}
              onClick={(e) => {
                e.preventDefault();
                onSelect(suggestion);
                onClose();
              }}
              className={`
              block px-4 py-3 text-sm border-b border-gray-100 last:border-b-0
              transition-colors cursor-pointer
              ${
                index === selectedIndex
                  ? 'bg-gray-100 text-gray-900'
                  : 'hover:bg-gray-50 text-gray-700'
              }
            `}
              role='option'
              aria-selected={index === selectedIndex}
            >
              <div className='flex items-center gap-2'>
                <div className='font-medium flex-1'>{suggestion.name}</div>
                {suggestion.matchType === 'ingredient' && (
                  <span className='text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full'>
                    材料
                  </span>
                )}
              </div>
              <div className='text-xs text-gray-500 mt-1'>
                {suggestion.mainCategory.join(', ')} ›{' '}
                {suggestion.subCategory.join(', ')}
              </div>
              {suggestion.matchType === 'ingredient' &&
                suggestion.matchedIngredients && (
                  <div className='text-xs text-green-600 mt-1'>
                    含まれる材料: {suggestion.matchedIngredients.join(', ')}
                  </div>
                )}
            </Link>
          );
        })}
      </div>
    );
  }
);

SearchSuggestions.displayName = 'SearchSuggestions';
