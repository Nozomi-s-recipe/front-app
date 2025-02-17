import { getRecipeById } from '@/utils/micro-cms/micro-cms';
import { RecipeOverview } from './RecipeOverview';

type RecipeOverviewContainerProps = {
  recipeId: string;
};

export const RecipeOverviewContainer = async ({
  recipeId,
}: RecipeOverviewContainerProps) => {
  const [microCmsResponse] = await Promise.all([
    getRecipeById(recipeId),
    // HasuraGetRecipeById({ recipeId }),
  ]);

  return (
    <RecipeOverview
      image={{
        src: microCmsResponse.image.url,
        alt: microCmsResponse.name,
      }}
      recipeMetaInfo={{
        image: {
          src: microCmsResponse.image.url,
        },
        recipeName: microCmsResponse.name,
        // deliciousCount:
        //   hasuraResponse.data.nozomis_recipes_schema_recipes[0].delicious_count,
        // totalView:
        //   hasuraResponse.data.nozomis_recipes_schema_recipes[0].total_view,
        recipeDescription: microCmsResponse.description,
        recipeTags: microCmsResponse.tags.map((tag) => {
          return {
            id: tag.id,
            name: tag.name,
          };
        }),
      }}
    />
  );
};
