'use client';
import { useEffect, useState } from 'react';

type FavoriteRecipe = {
  recipeId: string;
  savedAt: string;
};

type UseFavoriteRecipeReturn = {
  isFavorite: boolean;
  toggleFavorite: () => void;
};

export const useFavoriteRecipe = (
  recipeId: string
): UseFavoriteRecipeReturn => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(
      localStorage.getItem('favoriteRecipes') || '[]'
    ) as FavoriteRecipe[];
    setIsFavorite(favorites.some((fav) => fav.recipeId === recipeId));
  }, [recipeId]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(
      localStorage.getItem('favoriteRecipes') || '[]'
    ) as FavoriteRecipe[];

    if (isFavorite) {
      const newFavorites = favorites.filter((fav) => fav.recipeId !== recipeId);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    } else {
      const newFavorite: FavoriteRecipe = {
        recipeId,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([...favorites, newFavorite])
      );
    }

    setIsFavorite(!isFavorite);
  };

  return { isFavorite, toggleFavorite };
};
