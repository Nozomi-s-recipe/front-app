'use client';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useMemo, useState } from 'react';

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
  recipeId: string
): UseFavoriteRecipeReturn => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      // ローカルストレージのチェック
      const favorites = JSON.parse(
        localStorage.getItem('favoriteRecipes') || '[]'
      ) as FavoriteRecipe[];

      // Supabaseのチェック
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log('user', user);
      if (user) {
        const { data } = await supabase
          .from('favorites')
          .select('recipe_id')
          .eq('recipe_id', recipeId)
          .eq('user_id', user.id)
          .maybeSingle();

        setIsFavorite(
          !!data || favorites.some((fav) => fav.recipeId === recipeId)
        );
      } else {
        setIsFavorite(favorites.some((fav) => fav.recipeId === recipeId));
      }
    };

    checkFavoriteStatus();
  }, [recipeId, supabase]);

  const toggleFavorite = async () => {
    setIsLoading(true);
    try {
      const favorites = JSON.parse(
        localStorage.getItem('favoriteRecipes') || '[]'
      ) as FavoriteRecipe[];

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (isFavorite) {
        // お気に入りから削除
        const newFavorites = favorites.filter(
          (fav) => fav.recipeId !== recipeId
        );
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));

        if (user) {
          await supabase
            .from('favorites')
            .delete()
            .eq('user_id', user.id)
            .eq('recipe_id', recipeId);
        }
      } else {
        // お気に入りに追加
        const newFavorite: FavoriteRecipe = {
          recipeId,
          savedAt: new Date().toISOString(),
        };
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify([...favorites, newFavorite])
        );

        if (user) {
          const { data, error } = await supabase
            .from('favorites')
            .insert({ user_id: user.id, recipe_id: recipeId })
            .select();
          console.log('data', data);
          console.log('error', error);
        }
      }

      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('お気に入りの更新に失敗しました:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isFavorite, toggleFavorite, isLoading };
};
