import { SIDE_MENUS } from '@/utils/const';
import { RecommendedRecipesContainer } from './RecommendedRecipes.container';

export const RecommendedRecipesSection = () => {
  return (
    <section className='flex flex-col space-y-2'>
      {SIDE_MENUS.map((menu, i) => {
        return (
          <RecommendedRecipesContainer
            key={`RecommendedRecipesSection-${i}`}
            mainCategory={menu.mainCategory}
          />
        );
      })}
    </section>
  );
};
