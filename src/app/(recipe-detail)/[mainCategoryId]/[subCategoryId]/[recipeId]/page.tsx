// import { Breadcrumbs } from '@/components/BreadCrumbs';
import { CookingStepSectionContainer } from '@/components/recipe-detail/cooking-step-section/CookingStepSection.container';
import { IngredientSectionContainer } from '@/components/recipe-detail/ingredient-section/IngredientSection.container';
import { RecipeOverviewContainer } from '@/components/recipe-detail/recipe-overview/RecipeOverview.container';
import { RecommendedRecipesSection } from '@/components/recipe-detail/recipe-recommend/RecomendedRecipesSection';
import { UserFeedback } from '@/components/recipe-detail/user-feedback/UserFeedback';
// import { getRecipeById } from '@/lib/micro-cms/micro-cms';

export const dynamic = 'error';

export default async function RecipePage({
  params,
}: {
  params: Promise<{
    mainCategoryId: string;
    subCategoryId: string;
    recipeId: string;
  }>;
}) {
  const { recipeId } = await params;
  // const res = await getRecipeById(recipeId);

  return (
    <>
      <RecipeOverviewContainer recipeId={recipeId} />
      <div className='max-w-sm mx-auto flex flex-col px-4 pt-8'>
        <div className='mb-8'>
          <IngredientSectionContainer recipeId={recipeId} />
        </div>
        <div className='mb-12'>
          <CookingStepSectionContainer recipeId={recipeId} />
        </div>
        <div className='mb-8'>
          <UserFeedback recipeId={recipeId} />
        </div>
        <RecommendedRecipesSection />
        {/* <Breadcrumbs recipeName={res.name} /> */}
      </div>
    </>
  );
}
