import { Menu } from '@/types/types';
import { getMainCategoryByMainId, getSubCategoryById } from '@/utils/const';
import { getRecipes } from '@/utils/micro-cms/micro-cms';
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
  console.log('contents', contents);
  const recipePreviewList: RecipePreviewProps[] = contents.map((content) => {
    const {
      image,
      name,
      cookingTime,
      ingredients,
      id,
      subCategory,
      mainCategory,
      createdAt,
      isPopular,
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
      createdAt,
      isPopular,
    };
  });
  console.log('recipePreviewList', recipePreviewList);

  return <RecipePreviewList recipePreviews={recipePreviewList} />;
};
