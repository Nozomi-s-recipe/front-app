// import { Breadcrumbs } from '@/components/BreadCrumbs';
import { BreadcrumbsContainer } from '@/components/BreadCrumbs.container';
import { CookingStepSectionContainer } from '@/components/recipe-detail/cooking-step-section/CookingStepSection.container';
import { IngredientSectionContainer } from '@/components/recipe-detail/ingredient-section/IngredientSection.container';
import { RecipeOverviewContainer } from '@/components/recipe-detail/recipe-overview/RecipeOverview.container';
import { RecommendedRecipesSection } from '@/components/recipe-detail/recipe-recommend/RecomendedRecipesSection';
import { UserFeedback } from '@/components/recipe-detail/user-feedback/UserFeedback';
import { DEFAULT_TOP_PAGE_RECIPES } from '@/utils/const';
import { getRecipeById, getRecipes } from '@/utils/micro-cms/micro-cms';
import { Metadata } from 'next';
// import { getRecipeById } from '@/lib/micro-cms/micro-cms';

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 3600; // invalidate every hour

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true; // or false, to 404 on unknown paths

type Props = {
  params: Promise<RecipePageProps>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const res = await getRecipeById(params.recipeId);

  return {
    title: res.name,
    description: res.description,
    openGraph: {
      title: res.name,
      description: res.description,
      images: [res?.image?.url || ''],
    },
  };
}

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const res = await getRecipes({
    limit: DEFAULT_TOP_PAGE_RECIPES,
  });

  return res.contents.map((recipe) => ({
    mainCategoryId: recipe.mainCategory[0],
    subCategoryId: recipe.subCategory[0],
    recipeId: recipe.id,
  }));
}

export type RecipePageProps = {
  mainCategoryId: string;
  subCategoryId: string;
  recipeId: string;
};

export default async function RecipePage({
  params,
}: {
  params: Promise<RecipePageProps>;
}) {
  const { recipeId } = await params;

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
        <BreadcrumbsContainer recipeId={recipeId} />
      </div>
    </>
  );
}
