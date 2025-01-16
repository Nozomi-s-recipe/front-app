import { Menu } from '@/types/types';
import { RecipeCard, RecipeCardProps } from './RecipeCard';
import { ShowMore, ShowMoreProps } from './ShowMore';
import { SmallRecipeCard, SmallRecipeCardProps } from './SmallRecipeCard';

export type MainSide = 'right' | 'left';

type MainCategoryRecipesProps = {
  mainCategory: Menu;
  largeRecipe: RecipeCardProps;
  smallRecipe: SmallRecipeCardProps;
  showMoreRecipe: ShowMoreProps;
  mainSide?: MainSide;
};

export const MainCategoryRecipes = ({
  mainCategory,
  largeRecipe,
  smallRecipe,
  showMoreRecipe,
  mainSide = 'left',
}: MainCategoryRecipesProps) => {
  return (
    <div>
      <div className='pb-2 text-xl font-mincho'>{mainCategory.name}</div>

      {mainSide === 'left' ? (
        <div className='flex space-x-2'>
          <RecipeCard {...largeRecipe} />
          <div>
            <SmallRecipeCard {...smallRecipe} />
            <ShowMore {...showMoreRecipe} />
          </div>
        </div>
      ) : (
        <div className='flex space-x-2'>
          <div>
            <SmallRecipeCard {...smallRecipe} />
            <ShowMore {...showMoreRecipe} />
          </div>
          <RecipeCard {...largeRecipe} />
        </div>
      )}
    </div>
  );
};
