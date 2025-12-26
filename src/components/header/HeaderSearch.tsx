'use client';

import { SearchSuggestions } from '@/components/header/SearchSuggestions';
import { Input } from '@/components/ui/input';
import { useSearchSuggestions } from '@/hooks/useSearchSuggestions';
import type { SearchSuggestion } from '@/hooks/useSearchSuggestions';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

export const HeaderSearch = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [composing, setComposition] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const defaultQuery = searchParams.get('q') ?? '';

  const { suggestions, isLoading, error } = useSearchSuggestions(query);

  const startComposition = () => setComposition(true);
  const endComposition = () => setComposition(false);

  const handleSearch = useCallback(() => {
    const searchQuery = inputRef.current?.value?.trim() ?? '';
    if (searchQuery) {
      const queryString = `?q=${encodeURIComponent(searchQuery)}`;
      router.push(`/search${queryString}`);
      setShowSuggestions(false);
    }
  }, [router]);

  const handleSuggestionSelect = useCallback(
    (suggestion: SearchSuggestion) => {
      const categoryPath = `/${suggestion.mainCategory[0]}/${suggestion.subCategory[0]}`;
      const recipePath = `${categoryPath}/${suggestion.id}`;
      router.push(recipePath);
      setShowSuggestions(false);
      if (inputRef.current) {
        inputRef.current.value = suggestion.name;
      }
    },
    [router]
  );

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> =
    useCallback(
      (e) => {
        if (composing) return;

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            if (showSuggestions && suggestions.length > 0) {
              setSelectedIndex((prev) =>
                prev < suggestions.length - 1 ? prev + 1 : prev
              );
            }
            break;
          case 'ArrowUp':
            e.preventDefault();
            if (showSuggestions && suggestions.length > 0) {
              setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
            }
            break;
          case 'Enter':
            e.preventDefault();
            if (
              showSuggestions &&
              selectedIndex >= 0 &&
              suggestions[selectedIndex]
            ) {
              handleSuggestionSelect(suggestions[selectedIndex]);
            } else {
              handleSearch();
            }
            break;
          case 'Escape':
            setShowSuggestions(false);
            setSelectedIndex(-1);
            break;
        }
      },
      [
        composing,
        showSuggestions,
        suggestions,
        selectedIndex,
        handleSuggestionSelect,
        handleSearch,
      ]
    );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      setSelectedIndex(-1);
      setShowSuggestions(value.trim().length >= 2);
    },
    []
  );

  const handleInputFocus = useCallback(() => {
    if (query.trim().length >= 2) {
      setShowSuggestions(true);
    }
  }, [query]);

  const handleCloseSuggestions = useCallback(() => {
    setShowSuggestions(false);
    setSelectedIndex(-1);
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative flex-1 max-w-md mx-4'>
      <div className='relative'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10' />
        <Input
          type='search'
          ref={inputRef}
          placeholder='レシピを検索...'
          defaultValue={defaultQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleInputFocus}
          onCompositionStart={startComposition}
          onCompositionEnd={endComposition}
          className='pl-9 h-9 w-full bg-white border-gray-300 focus-visible:ring-1'
          aria-label='レシピを検索'
          aria-autocomplete='list'
          aria-controls='search-suggestions'
          aria-expanded={showSuggestions}
          autoComplete='off'
        />
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
  );
};
