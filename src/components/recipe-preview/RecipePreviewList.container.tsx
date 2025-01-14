import { getMainCategoryByMainId, getSubCategoryById } from '@/lib/const';
import { getRecipes } from '@/lib/micro-cms';
import { Menu } from '@/types/types';
import { RecipePreviewProps } from './RecipePreview';
import { RecipePreviewList } from './RecipePreviewList';

type MainCategoryProps = {
  mainCategory: Menu;
  subCategory?: never;
};

type SubCategoryProps = {
  mainCategory?: never;
  subCategory: Menu;
};

type RecipePreviewListContainerProps = MainCategoryProps | SubCategoryProps;

export const RecipePreviewListContainer = async ({
  mainCategory,
  subCategory,
}: RecipePreviewListContainerProps) => {
  const filter = mainCategory
    ? `mainCategory[contains]${mainCategory.id}`
    : `subCategory[contains]${subCategory.id}`;

  const { contents } = await getRecipes({
    filters: filter,
  });
  const recipePreviewList: RecipePreviewProps[] = contents.map((content) => {
    const {
      image,
      name,
      cookingTime,
      ingredients,
      id,
      subCategory,
      mainCategory,
    } = content;
    return {
      image: {
        src: image.url,
        alt: name,
      },
      recipeName: name,
      recipeId: id,
      cookingTime: cookingTime,
      ingredientsCount: ingredients.length,
      mainCategory: getMainCategoryByMainId(mainCategory[0])!,
      subCategory: getSubCategoryById(subCategory[0])!,
    };
  });

  return (
    <RecipePreviewList
      recipePreviews={recipePreviewList}
      category={mainCategory || subCategory}
    />
  );
};
