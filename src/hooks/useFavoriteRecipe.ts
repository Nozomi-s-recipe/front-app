'use client';
import { FAVORITE_LIMITS } from '@/utils/const';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useMemo, useState } from 'react';
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

        setIsFavorite(false);
      } else {
        if (user) {
          // ログインユーザーの場合、DBから件数を取得
          const { count } = await supabase
            .from('favorites')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id);

          if (count !== null && count >= FAVORITE_LIMITS.USER) {
            console.log(
              'お気に入り上限に達しました。',
              count,
              FAVORITE_LIMITS.USER
            );
            toast(
              `お気に入り上限に達しました。ログイン中は${FAVORITE_LIMITS.USER}件までお気に入りに追加できます。`
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
            JSON.stringify([...favorites, newFavorite])
          );

          await supabase
            .from('favorites')
            .insert({ user_id: user.id, recipe_id: recipeId });

          setIsFavorite(true);
        } else {
          // 未ログインの場合、ローカルストレージの件数をチェック
          if (favorites.length >= FAVORITE_LIMITS.GUEST) {
            console.log(
              'お気に入り上限に達しました。',
              favorites.length,
              FAVORITE_LIMITS.GUEST
            );
            toast(
              `お気に入り上限に達しました。未ログイン時は${FAVORITE_LIMITS.GUEST}件までです。ログインすると${FAVORITE_LIMITS.USER}件まで保存できます。`
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
            JSON.stringify([...favorites, newFavorite])
          );

          setIsFavorite(true);
        }
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
