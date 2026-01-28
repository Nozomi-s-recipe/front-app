/**
 * Simple recipe list without filters
 */

'use client';

import { RecipePreviewProps, RecipePreview } from './RecipePreview';

interface SimpleRecipeListProps {
  recipes: RecipePreviewProps[];
}

export function SimpleRecipeList({ recipes }: SimpleRecipeListProps) {
  return (
    <div className='w-full max-w-7xl mx-auto'>
      {/* Recipe grid */}
      {recipes.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {recipes.map((recipe) => (
            <RecipePreview key={recipe.recipeId} {...recipe} />
          ))}
        </div>
      ) : (
        <div className='text-center py-12'>
          <p className='text-muted-foreground'>レシピが見つかりませんでした</p>
        </div>
      )}
    </div>
  );
}
