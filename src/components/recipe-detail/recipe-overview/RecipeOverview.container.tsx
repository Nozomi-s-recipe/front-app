import { getRecipeById } from '@/utils/micro-cms/micro-cms';
import { RecipeOverview } from './RecipeOverview';

type RecipeOverviewContainerProps = {
  recipeId: string;
};

// 型定義をより明確に
type RecipeMetaInfo = {
  recipeId: string;
  image: {
    src: string;
  };
  recipeName: string;
  recipeDescription: string;
  recipeTags: Array<{
    id: string;
    name: string;
  }>;
  // deliciousCount?: number;
  // totalView?: number;
};

export const RecipeOverviewContainer = async ({
  recipeId,
}: RecipeOverviewContainerProps) => {
  const microCmsResponse = await getRecipeById(recipeId);

  const recipeMetaInfo: RecipeMetaInfo = {
    image: {
      src: microCmsResponse.image.url,
    },
    recipeName: microCmsResponse.name,
    recipeDescription: microCmsResponse.description,
    recipeTags: microCmsResponse.tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
    })),
    recipeId: microCmsResponse.id,
  };

  return (
    <RecipeOverview
      image={{
        src: microCmsResponse.image.url,
        alt: microCmsResponse.name,
      }}
      recipeMetaInfo={recipeMetaInfo}
      recipeId={recipeId}
    />
  );
};
