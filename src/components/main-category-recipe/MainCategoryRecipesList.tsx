import { SIDE_MENUS } from '@/lib/const';
import { MainCategoryRecipesContainer } from './MainCategoryRecipes.container';

export const MainCategoryRecipesList = async ({}) => {
  return (
    <div className='flex flex-col space-y-4'>
      {SIDE_MENUS.map((menu, i) => {
        return (
          <MainCategoryRecipesContainer
            key={`MainCategoryRecipesContainer-${i}`}
            mainCategory={menu.mainCategory}
            color={i % 2 === 0 ? 'secondary-A' : 'secondary-B'}
            mainSide={i % 2 === 0 ? 'left' : 'right'}
          />
        );
      })}
    </div>
  );
};
