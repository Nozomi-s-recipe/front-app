import { Menu } from '@/types/types';
import { getRecipes } from '@/utils/micro-cms/micro-cms';
import { formatRecipePreview } from '@/utils/recipe/formatRecipePreview';
import { FilteredRecipeList } from './FilteredRecipeList';

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

  return <FilteredRecipeList recipes={recipePreviewList} pageType='category' />;
};
