import { getRecipeById as HasuraGetRecipeById } from '@/lib/graph-ql/GetRecipeById';
import { getRecipeById } from '@/lib/micro-cms/micro-cms';
import { RecipeOverview } from './RecipeOverview';

type RecipeOverviewContainerProps = {
  recipeId: string;
};

export const RecipeOverviewContainer = async ({
  recipeId,
}: RecipeOverviewContainerProps) => {
  const res = await getRecipeById(recipeId);
  const { data } = await HasuraGetRecipeById({
    recipeId,
  });

  return (
    <RecipeOverview
      image={{
        src: res.image.url,
        alt: res.name,
      }}
      recipeMetaInfo={{
        recipeName: res.name,
        deliciousCount: data.nozomis_recipes_schema_recipes[0].delicious_count,
        totalView: data.nozomis_recipes_schema_recipes[0].total_view,
        recipeDescription: res.description,
        recipeTags: res.tags.map((tag) => {
          return {
            id: tag.id,
            name: tag.name,
          };
        }),
      }}
    />
  );
};
