import { getRecipes } from '@/utils/micro-cms/micro-cms';
import { formatRecipePreview } from '@/utils/recipe/formatRecipePreview';
import { RecipePreviewCarousel } from './RecipePreviewCarousel';

export const NewRecipePreviewCarouselContainer = async () => {
  const { contents } = await getRecipes({ orders: '-createdAt', limit: 5 });
  const recipePreviewList = contents.map(formatRecipePreview);

  return (
    <RecipePreviewCarousel
      recipePreviews={recipePreviewList}
      title='新着レシピ'
    />
  );
};
