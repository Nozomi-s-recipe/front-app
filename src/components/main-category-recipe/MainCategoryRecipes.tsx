import { Menu } from '@/types/types';
import { LargeRecipeCard, LargeRecipeCardProps } from './LargeRecipeCard';
import { ShowMore, ShowMoreProps } from './ShowMore';
import { SmallRecipeCard, SmallRecipeCardProps } from './SmallRecipeCard';

export type MainSide = 'right' | 'left';

type MainCategoryRecipesProps = {
  mainCategory: Menu;
  largeRecipe: LargeRecipeCardProps;
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
          <LargeRecipeCard {...largeRecipe} />
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
          <LargeRecipeCard {...largeRecipe} />
        </div>
      )}
    </div>
  );
};
