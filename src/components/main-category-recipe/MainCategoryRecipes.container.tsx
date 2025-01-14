import { getSubCategoryById } from '@/lib/const';
import { getRecipes } from '@/lib/micro-cms';
import { Menu } from '@/types/types';
import { MainCategoryRecipes, MainSide } from './MainCategoryRecipes';
import { ShowMoreColor } from './ShowMore';

type MainCategoryRecipesContainerProps = {
  mainCategory: Menu;
  color: ShowMoreColor;
  mainSide: MainSide;
};

export const MainCategoryRecipesContainer = async ({
  mainCategory,
  color,
  mainSide,
}: MainCategoryRecipesContainerProps) => {
  const res = await getRecipes({
    orders: '-createdAt',
    limit: 3,
    filters: `mainCategory[contains]${mainCategory.id}`,
  });
  console.log('MainCategoryRecipesContainer: ', res);

  if (res.totalCount === 0) return;

  return (
    <MainCategoryRecipes
      mainCategory={mainCategory}
      largeRecipe={{
        image: {
          src: res.contents[0].image.url,
          alt: res.contents[0].name,
        },
        recipeId: res.contents[0].id,
        recipeName: res.contents[0].name,
        mainCategory,
        subCategory: getSubCategoryById(res.contents[0].subCategory[0])!,
      }}
      smallRecipe={{
        image: {
          src: res.contents[1].image.url,
          alt: res.contents[1].name,
        },
        recipeId: res.contents[1].id,
        mainCategory,
        subCategory: getSubCategoryById(res.contents[1].subCategory[0])!,
      }}
      showMoreRecipe={{
        mainCategory,
        image: {
          src: res.contents[2].image.url,
          alt: res.contents[2].name,
        },
        color,
      }}
      mainSide={mainSide}
    />
  );
};
