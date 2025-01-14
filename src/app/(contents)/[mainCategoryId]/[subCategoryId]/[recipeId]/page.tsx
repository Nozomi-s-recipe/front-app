import { Breadcrumbs } from '@/components/BreadCrumbs';
import { IngredientSection } from '@/components/recipe-detail/ingredient-section/IngredientSection';
import { RecipeOverview } from '@/components/recipe-detail/recipe-overview/RecipeOverview';
import { getRecipeById } from '@/lib/micro-cms';

export default async function RecipePage({
  params,
}: {
  params: Promise<{
    mainCategory: string;
    subCategory: string;
    recipeId: string;
  }>;
}) {
  const { recipeId } = await params;
  const res = await getRecipeById(recipeId);
  console.log(res);

  return (
    <div>
      <RecipeOverview
        image={{
          src: res.image.url,
          alt: res.name,
        }}
        recipeMetaInfo={{
          recipeName: res.name,
          deliciousCount: 10, // TODO: hasura連携
          totalView: 100, // TODO: hasura連携
          recipeDescription: res.description,
          recipeTags: res.tags.map((tag) => {
            return {
              id: tag.id,
              name: tag.name,
            };
          }),
        }}
      />
      <IngredientSection recipeId={recipeId} />
      <Breadcrumbs recipeName={res.name} />
    </div>
  );
}
