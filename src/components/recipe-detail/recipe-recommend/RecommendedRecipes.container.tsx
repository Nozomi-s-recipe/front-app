import { Menu } from '@/types/types';
import { getSubCategoryById } from '@/utils/const';
import { getRecipes } from '@/utils/micro-cms/micro-cms';
import { RecommendedRecipes } from './RecommendedRecipes';

type RecommendedRecipesContainerProps = {
  mainCategory: Menu;
};

export const RecommendedRecipesContainer = async ({
  mainCategory,
}: RecommendedRecipesContainerProps) => {
  const res = await getRecipes({
    orders: '-createdAt',
    limit: 3,
    filters: `mainCategory[contains]${mainCategory.id}`,
  });

  if (res.totalCount === 0) return;

  return (
    <RecommendedRecipes
      mainCategory={mainCategory}
      recipes={res.contents.map((content) => {
        return {
          recipeId: content.id,
          image: {
            src: content.image.url,
            alt: content.name,
          },
          recipeName: content.name,
          mainCategory: mainCategory,
          subCategory: getSubCategoryById(content.subCategory[0])!,
          width: 144,
          height: 100,
          captionSize: 'sm',
        };
      })}
    />
  );
};
