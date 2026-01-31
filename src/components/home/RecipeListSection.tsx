'use client';

import { RecipePreview } from '@/components/recipe-preview/RecipePreview';
import type { Recipe } from '@/utils/micro-cms/types';
import { getMainCategoryByMainId, getSubCategoryById } from '@/utils/const';

interface RecipeListSectionProps {
  recipes: Recipe[];
  totalCount: number;
}

export const RecipeListSection = ({
  recipes,
  totalCount,
}: RecipeListSectionProps) => {
  return (
    <section className='px-5 py-5'>
      <header className='flex justify-between items-center mb-4'>
        <h2 className='text-[15px] font-semibold text-text-primary'>
          新着レシピ
        </h2>
        <span className='text-xs text-text-muted'>
          <strong className='text-text-primary'>{totalCount}</strong>件
        </span>
      </header>

      <div className='flex flex-col gap-4'>
        {recipes.map((recipe, index) => (
          <RecipePreview
            key={recipe.id}
            image={{
              src: recipe.image.url,
              alt: recipe.name,
            }}
            recipeName={recipe.name}
            recipeId={recipe.id}
            cookingTime={recipe.cookingTime}
            ingredientsCount={
              recipe.ingredients.length + recipe.seasonings.length
            }
            mainCategory={
              getMainCategoryByMainId(recipe.mainCategory[0]) || {
                id: recipe.mainCategory[0],
                name: recipe.mainCategory[0],
              }
            }
            subCategory={
              getSubCategoryById(recipe.subCategory[0]) || {
                id: recipe.subCategory[0],
                name: recipe.subCategory[0],
              }
            }
            isPriority={index < 3}
            createdAt={recipe.createdAt}
            isPopular={recipe.isPopular}
            description={recipe.description}
          />
        ))}
      </div>
    </section>
  );
};
