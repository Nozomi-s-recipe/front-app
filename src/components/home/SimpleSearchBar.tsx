'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useSearchSuggestions } from '@/hooks/useSearchSuggestions';
import { SearchSuggestions } from '@/components/header/SearchSuggestions';
import type { SearchSuggestion } from '@/hooks/useSearchSuggestions';

export const SimpleSearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const { suggestions, isLoading, error } = useSearchSuggestions(query);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset selected index when suggestions change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [suggestions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowSuggestions(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.trim().length >= 2);
  };

  const handleSuggestionSelect = useCallback(
    (suggestion: SearchSuggestion) => {
      const categoryPath = `/${suggestion.mainCategory[0]}/${suggestion.subCategory[0]}`;
      const recipePath = `${categoryPath}/${suggestion.id}`;
      router.push(recipePath);
      setQuery('');
      setShowSuggestions(false);
    },
    [router],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev,
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSuggestionSelect(suggestions[selectedIndex]);
        } else {
          handleSubmit(e);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleCloseSuggestions = useCallback(() => {
    setShowSuggestions(false);
  }, []);

  return (
    <section className='px-5 py-4'>
      <form onSubmit={handleSubmit}>
        <div ref={wrapperRef} className='relative'>
          <div className='flex items-center gap-3 bg-cream border border-border-color rounded-[14px] px-4 py-3.5 transition-all duration-200 focus-within:border-text-muted focus-within:bg-white'>
            <input
              ref={inputRef}
              type='text'
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() =>
                query.trim().length >= 2 && setShowSuggestions(true)
              }
              placeholder='探しているレシピを入力...'
              className='flex-1 bg-transparent border-none outline-none text-sm text-text-primary placeholder:text-text-muted'
              autoComplete='off'
            />
            <Search className='w-[18px] h-[18px] text-text-muted stroke-2 flex-shrink-0' />
          </div>
          {showSuggestions && (query.trim().length >= 2 || isLoading) && (
            <SearchSuggestions
              ref={suggestionsRef}
              suggestions={suggestions}
              isLoading={isLoading}
              error={error}
              selectedIndex={selectedIndex}
              onSelect={handleSuggestionSelect}
              onClose={handleCloseSuggestions}
            />
          )}
        </div>
      </form>
    </section>
  );
};
