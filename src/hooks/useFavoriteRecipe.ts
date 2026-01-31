'use client';
import { FAVORITE_LIMITS } from '@/utils/const';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type FavoriteRecipe = {
  recipeId: string;
  savedAt: string;
};

type UseFavoriteRecipeReturn = {
  isFavorite: boolean;
  toggleFavorite: () => void;
  isLoading: boolean;
};

export const useFavoriteRecipe = (
  recipeId: string,
): UseFavoriteRecipeReturn => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = () => {
      // ローカルストレージのチェック
      const favorites = JSON.parse(
        localStorage.getItem('favoriteRecipes') || '[]',
      ) as FavoriteRecipe[];

      setIsFavorite(favorites.some((fav) => fav.recipeId === recipeId));
    };

    checkFavoriteStatus();
  }, [recipeId]);

  const toggleFavorite = () => {
    setIsLoading(true);
    try {
      const favorites = JSON.parse(
        localStorage.getItem('favoriteRecipes') || '[]',
      ) as FavoriteRecipe[];

      if (isFavorite) {
        // お気に入りから削除
        const newFavorites = favorites.filter(
          (fav) => fav.recipeId !== recipeId,
        );
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
        setIsFavorite(false);
      } else {
        // 未ログインの場合、ローカルストレージの件数をチェック
        if (favorites.length >= FAVORITE_LIMITS.GUEST) {
          console.log(
            'お気に入り上限に達しました。',
            favorites.length,
            FAVORITE_LIMITS.GUEST,
          );
          toast(
            `お気に入り上限に達しました。${FAVORITE_LIMITS.GUEST}件までお気に入りに追加できます。`,
          );
          setIsLoading(false);
          return;
        }

        // お気に入りに追加
        const newFavorite: FavoriteRecipe = {
          recipeId,
          savedAt: new Date().toISOString(),
        };
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify([...favorites, newFavorite]),
        );

        setIsFavorite(true);
      }
    } catch (error) {
      console.error('お気に入りの更新に失敗しました:', error);
      toast('お気に入りの更新に失敗しました。');
    } finally {
      setIsLoading(false);
    }
  };

  return { isFavorite, toggleFavorite, isLoading };
};
