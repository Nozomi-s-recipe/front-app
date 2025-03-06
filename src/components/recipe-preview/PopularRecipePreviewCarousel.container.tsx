import { getRecipes } from '@/utils/micro-cms/micro-cms';
import { formatRecipePreview } from '@/utils/recipe/formatRecipePreview';
import { RecipePreviewCarousel } from './RecipePreviewCarousel';

export const PopularRecipePreviewCarouselContainer = async () => {
  const { contents } = await getRecipes({
    filters: 'isPopular[equals]true',
  });
  const recipePreviewList = contents.map(formatRecipePreview);

  return (
    <RecipePreviewCarousel
      recipePreviews={recipePreviewList}
      title='人気レシピ'
    />
  );
};
