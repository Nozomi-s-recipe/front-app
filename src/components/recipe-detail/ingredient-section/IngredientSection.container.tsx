import { getRecipeById } from '@/utils/micro-cms/micro-cms';
import { Info } from 'lucide-react';
import { IngredientList } from './ingredient-list/IngredientList';
import { RecipeStats } from './recipe-stats/RecipeStats';
import { ServingsProvider } from './recipe-stats/servings.context';

type IngredientSectionContainerProps = {
  recipeId: string;
};

export const IngredientSectionContainer = async ({
  recipeId,
}: IngredientSectionContainerProps) => {
  const { ingredients, seasonings, cookingTime, nutrient, note } =
    await getRecipeById(recipeId);

  return (
    <ServingsProvider>
      <div className='pb-4'>
        <RecipeStats cookingTime={cookingTime} calories={nutrient.calories} />
      </div>
      {note && (
        <div className='pt-2 pb-6 text-sm'>
          <div className='flex items-start gap-1'>
            <Info className='h-4 w-4 mt-0.5 text-gray-600' />
            <p>補足: {note}</p>
          </div>
        </div>
      )}
      <IngredientList
        ingredients={ingredients.map((ingredient) => {
          return {
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: {
              name: ingredient.unit[0].name[0],
              position: ingredient.unit[0].position[0],
            },
          };
        })}
        seasonings={seasonings.map((seasoning) => {
          return {
            name: seasoning.name,
            quantity: seasoning.quantity,
            unit: {
              name: seasoning.unit[0].name[0],
              position: seasoning.unit[0].position[0],
            },
          };
        })}
      />
    </ServingsProvider>
  );
};
