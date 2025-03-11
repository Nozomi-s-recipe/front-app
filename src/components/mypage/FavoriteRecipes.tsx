'use client';

import { RecipePreview } from '@/components/recipe-preview/RecipePreview';
import { FavoriteRecipe, useLocalStorage } from '@/hooks/useLocalStorage';
import { Recipe } from '@/utils/micro-cms/types';
import { formatRecipePreview } from '@/utils/recipe/formatRecipePreview';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { useEffect, useMemo, useState } from 'react';

type FavoriteRecipesProps = {
  user: User | null;
};

export function FavoriteRecipes({ user }: FavoriteRecipesProps) {
  const [favoriteRecipes, setFavoriteRecipes] = useLocalStorage<
    FavoriteRecipe[]
  >('favoriteRecipes', []);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const supabase = useMemo(() => createClient(), []);

  // Supabaseのお気に入りをローカルストレージと同期する
  useEffect(() => {
    const syncFavorites = async () => {
      try {
        if (user) {
          // Supabaseからお気に入りを取得
          const { data: supabaseFavorites } = await supabase
            .from('favorites')
            .select('recipe_id, created_at')
            .eq('user_id', user.id);

          if (supabaseFavorites) {
            // Supabaseのデータをローカルストレージの形式に変換
            const formattedFavorites: FavoriteRecipe[] = supabaseFavorites.map(
              (fav) => ({
                recipeId: fav.recipe_id,
                savedAt: fav.created_at,
              })
            );

            // ローカルストレージを更新
            setFavoriteRecipes(formattedFavorites);
          }
        }
      } catch (error) {
        console.error('お気に入りの同期に失敗しました:', error);
      }
    };

    syncFavorites();
  }, [user, supabase, setFavoriteRecipes]);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const fetchedRecipes = await Promise.all(
          favoriteRecipes.map(async ({ recipeId }) => {
            const response = await fetch(`/api/recipes/${recipeId}`);
            if (!response.ok) {
              throw new Error(`レシピID ${recipeId} の取得に失敗しました`);
            }
            return response.json();
          })
        );
        setRecipes(fetchedRecipes);
        setError(null);
      } catch (error) {
        console.error('お気に入りレシピの取得に失敗しました:', error);
        setError('レシピの読み込み中にエラーが発生しました。');
      }
    };

    if (favoriteRecipes.length > 0) {
      fetchFavoriteRecipes();
    }
  }, [favoriteRecipes]);

  return (
    <div>
      <h2 className='text-xl font-semibold mb-4'>お気に入りレシピ</h2>
      {error ? (
        <p className='text-red-500'>{error}</p>
      ) : recipes.length === 0 ? (
        <p className='text-gray-500'>お気に入りのレシピはまだありません</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {recipes.map((recipe) => (
            <RecipePreview key={recipe.id} {...formatRecipePreview(recipe)} />
          ))}
        </div>
      )}
    </div>
  );
}
