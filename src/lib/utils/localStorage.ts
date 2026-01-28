/**
 * localStorage utility functions for favorite recipe persistence
 * Implements defensive programming with graceful error handling
 */

const FAVORITES_KEY = 'recipe-favorites';

/**
 * Save favorite recipe IDs to localStorage
 * @param recipeIds Array of recipe IDs to save
 * @returns true if save successful, false if failed
 */
export const saveFavorites = (recipeIds: string[]): boolean => {
  try {
    const data = JSON.stringify(recipeIds);
    localStorage.setItem(FAVORITES_KEY, data);
    return true;
  } catch (error) {
    if (error instanceof DOMException) {
      if (error.name === 'QuotaExceededError') {
        console.warn(
          'LocalStorage quota exceeded. Favorites will only persist for current session.',
        );
      } else if (error.name === 'SecurityError') {
        console.warn(
          'LocalStorage access denied. Running in private mode or storage disabled.',
        );
      }
    }
    return false; // Graceful degradation to session-only
  }
};

/**
 * Load favorite recipe IDs from localStorage
 * @returns Array of recipe IDs, empty array if none found or error
 */
export const loadFavorites = (): string[] => {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    if (!data) return [];

    const parsed = JSON.parse(data);

    // Validate data structure
    if (!Array.isArray(parsed)) {
      console.warn('Invalid favorites data format, resetting to empty array');
      return [];
    }

    // Ensure all elements are strings
    return parsed.filter((id) => typeof id === 'string');
  } catch (error) {
    console.warn('Failed to load favorites from localStorage:', error);
    return []; // Return empty array on any error
  }
};

/**
 * Clear all favorites from localStorage
 * Useful for testing or user-initiated reset
 */
export const clearFavorites = (): boolean => {
  try {
    localStorage.removeItem(FAVORITES_KEY);
    return true;
  } catch {
    return false;
  }
};
