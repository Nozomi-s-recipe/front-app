import { LIMIT } from '@/utils/const';
import { getRecipes } from '@/utils/micro-cms/micro-cms';
import { formatRecipePreview } from '@/utils/recipe/formatRecipePreview';
import { SimpleRecipeList } from './SimpleRecipeList';

type Props = {
  q?: string;
  offset?: number;
};

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const RandomRecipePreviewListContainer = async ({
  q,
  offset,
}: Props) => {
  const { contents } = await getRecipes({
    limit: LIMIT,
    q,
    offset,
  });

  // Randomize the order of recipes
  const shuffledContents = shuffleArray(contents);
  const recipePreviewList = shuffledContents.map(formatRecipePreview);

  return <SimpleRecipeList recipes={recipePreviewList} />;
};
