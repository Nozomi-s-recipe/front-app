import { LIMIT } from '@/utils/const';
import { getRecipes } from '@/utils/micro-cms/micro-cms';
import { formatRecipePreview } from '@/utils/recipe/formatRecipePreview';
import { RecipePreviewList } from './RecipePreviewList';

type Props = {
  q?: string;
  offset?: number;
};

export const AllRecipePreviewListContainer = async ({ q, offset }: Props) => {
  const { contents } = await getRecipes({
    limit: LIMIT,
    q,
    offset,
  });
  const recipePreviewList = contents.map(formatRecipePreview);

  return <RecipePreviewList recipePreviews={recipePreviewList} />;
};
