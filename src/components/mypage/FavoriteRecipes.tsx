'use client';

import { RecipePreview } from '@/components/recipe-preview/RecipePreview';
import { FavoriteRecipe, useLocalStorage } from '@/hooks/useLocalStorage';
import { Recipe } from '@/utils/micro-cms/types';
import { formatRecipePreview } from '@/utils/recipe/formatRecipePreview';
import { useEffect, useState } from 'react';

export function FavoriteRecipes() {
  const [favoriteRecipes] = useLocalStorage<FavoriteRecipe[]>(
    'favoriteRecipes',
    []
  );
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);

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
