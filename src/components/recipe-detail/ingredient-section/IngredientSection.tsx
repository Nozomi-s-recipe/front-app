import { getRecipeById } from '@/lib/micro-cms';
import { IngredientList } from './ingredient-list/IngredientList';
import { RecipeStats } from './recipe-stats/RecipeStats';
import { ServingsProvider } from './recipe-stats/servings.context';

type IngredientSectionProps = {
  recipeId: string;
};

export const IngredientSection = async ({
  recipeId,
}: IngredientSectionProps) => {
  const { ingredients, seasonings, cookingTime, nutrient } =
    await getRecipeById(recipeId);

  return (
    <ServingsProvider>
      <RecipeStats cookingTime={cookingTime} calories={nutrient.calories} />
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
