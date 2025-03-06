import { RecipePreviewProps } from '@/components/recipe-preview/RecipePreview';
import { getMainCategoryByMainId, getSubCategoryById } from '@/utils/const';
import { Recipe } from '@/utils/micro-cms/types';

export const formatRecipePreview = (content: Recipe): RecipePreviewProps => {
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
};
