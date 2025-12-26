import { useCallback, useEffect, useRef, useState } from 'react';

export type SearchSuggestion = {
  id: string;
  name: string;
  mainCategory: string[];
  subCategory: string[];
  matchType: 'title' | 'ingredient';
  matchedIngredients?: string[];
};

export const useSearchSuggestions = (query: string, debounceMs = 300) => {
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchSuggestions = useCallback(async (searchQuery: string) => {
    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Don't fetch if query is too short
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    // Create new abort controller for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/search/suggestions?q=${encodeURIComponent(searchQuery)}`,
        { signal: abortController.signal }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch suggestions');
      }

      const data = await response.json();

      // Only update if this request wasn't aborted
      if (!abortController.signal.aborted) {
        setSuggestions(data);
        setIsLoading(false);
      }
    } catch (err) {
      // Ignore abort errors
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }

      if (!abortController.signal.aborted) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setSuggestions([]);
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    // Debounce the fetch
    const timeoutId = setTimeout(() => {
      fetchSuggestions(query);
    }, debounceMs);

    return () => {
      clearTimeout(timeoutId);
      // Cleanup: abort any pending requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [query, debounceMs, fetchSuggestions]);

  return { suggestions, isLoading, error };
};
