import { getRecipeById } from '@/lib/micro-cms/micro-cms';
import { IngredientList } from './IngredientList';

type IngredientListContainerProps = {
  recipeId: string;
};

export const IngredientListContainer = async ({
  recipeId,
}: IngredientListContainerProps) => {
  const { ingredients, seasonings } = await getRecipeById(recipeId);

  return (
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
  );
};
