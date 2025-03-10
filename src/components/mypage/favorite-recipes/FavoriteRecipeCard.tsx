import { Recipe } from '@/utils/micro-cms/types';

interface FavoriteRecipeCardProps {
  recipe: Recipe;
}

export function FavoriteRecipeCard({ recipe }: FavoriteRecipeCardProps) {
  return (
    <div className='border rounded-lg p-4'>
      <h3 className='font-medium'>{recipe.name}</h3>
      {/* レシピカードの詳細を追加 */}
    </div>
  );
}
