'use client';

import { useState, useEffect, useCallback } from 'react';
import { saveFavorites, loadFavorites } from '@/lib/utils/localStorage';

/**
 * Custom hook for managing favorite recipes with localStorage persistence
 * @returns Object with favorites array, helper functions, and storage availability status
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [storageAvailable, setStorageAvailable] = useState(true);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const loaded = loadFavorites();
    setFavorites(loaded);
  }, []);

  /**
   * Toggle a recipe's favorite status
   * Adds recipe if not in favorites, removes if already favorited
   */
  const toggleFavorite = useCallback((recipeId: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId];

      // Attempt to save to localStorage
      const saved = saveFavorites(updated);
      if (!saved) {
        setStorageAvailable(false);
      }

      return updated;
    });
  }, []);

  /**
   * Check if a recipe is favorited
   */
  const isFavorite = useCallback(
    (recipeId: string): boolean => favorites.includes(recipeId),
    [favorites],
  );

  /**
   * Add a recipe to favorites (if not already favorited)
   */
  const addFavorite = useCallback(
    (recipeId: string) => {
      if (!favorites.includes(recipeId)) {
        const updated = [...favorites, recipeId];
        setFavorites(updated);
        const saved = saveFavorites(updated);
        if (!saved) setStorageAvailable(false);
      }
    },
    [favorites],
  );

  /**
   * Remove a recipe from favorites
   */
  const removeFavorite = useCallback(
    (recipeId: string) => {
      const updated = favorites.filter((id) => id !== recipeId);
      setFavorites(updated);
      const saved = saveFavorites(updated);
      if (!saved) setStorageAvailable(false);
    },
    [favorites],
  );

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    addFavorite,
    removeFavorite,
    storageAvailable,
  };
};
