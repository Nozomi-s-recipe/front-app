import {
  DEFAULT_TOP_PAGE_RECIPES,
  getMainCategoryByMainId,
  getSubCategoryById,
} from '@/utils/const';
import { getRecipes } from '@/utils/micro-cms/micro-cms';
import { RecipePreviewProps } from './RecipePreview';
import { RecipePreviewList } from './RecipePreviewList';

export const AllRecipePreviewListContainer = async () => {
  const { contents } = await getRecipes({
    limit: DEFAULT_TOP_PAGE_RECIPES,
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

  return <RecipePreviewList recipePreviews={recipePreviewList} />;
};
