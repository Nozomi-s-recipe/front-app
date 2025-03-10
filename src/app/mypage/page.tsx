'use client';

import { Button } from '@/components/ui/button';
import { FavoriteRecipe, useLocalStorage } from '@/hooks/useLocalStorage';
import { Recipe } from '@/utils/micro-cms/types';
import { useEffect, useState } from 'react';

export default function MyPage() {
  const [favoriteRecipes] = useLocalStorage<FavoriteRecipe[]>(
    'favoriteRecipes',
    []
  );
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchFavoriteRecipes = async () => {
      try {
        const fetchedRecipes = await Promise.all(
          favoriteRecipes.map(async ({ recipeId }) => {
            const response = await fetch(`/api/recipes/${recipeId}`);
            if (!response.ok) throw new Error('レシピの取得に失敗しました');
            return response.json();
          })
        );
        setRecipes(fetchedRecipes);
      } catch (error) {
        console.error('お気に入りレシピの取得に失敗しました:', error);
      }
    };

    if (favoriteRecipes.length > 0) {
      fetchFavoriteRecipes();
    }
  }, [favoriteRecipes]);

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold mb-4'>マイページ</h1>
        <p className='text-lg mb-4'>こんにちは、ゲストさん</p>
        <Button variant='default'>ログイン</Button>
      </div>

      <div>
        <h2 className='text-xl font-semibold mb-4'>お気に入りレシピ</h2>
        {recipes.length === 0 ? (
          <p className='text-gray-500'>お気に入りのレシピはまだありません</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {recipes.map((recipe) => (
              <div key={recipe.id} className='border rounded-lg p-4'>
                <h3 className='font-medium'>{recipe.name}</h3>
                {/* レシピカードの詳細を追加 */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
