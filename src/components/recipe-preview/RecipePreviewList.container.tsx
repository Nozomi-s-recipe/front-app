import { Menu } from '@/types/types';
import { getRecipes } from '@/utils/micro-cms/micro-cms';
import { formatRecipePreview } from '@/utils/recipe/formatRecipePreview';
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
  const recipePreviewList = contents.map(formatRecipePreview);

  return <RecipePreviewList recipePreviews={recipePreviewList} />;
};
