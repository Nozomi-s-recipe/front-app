// import { Breadcrumbs } from '@/components/BreadCrumbs';
import { BreadcrumbsContainer } from '@/components/BreadCrumbs.container';
import { CookingStepSectionContainer } from '@/components/recipe-detail/cooking-step-section/CookingStepSection.container';
import { IngredientSectionContainer } from '@/components/recipe-detail/ingredient-section/IngredientSection.container';
import { RecipeOverviewContainer } from '@/components/recipe-detail/recipe-overview/RecipeOverview.container';
import { RecommendedRecipesSection } from '@/components/recipe-detail/recipe-recommend/RecomendedRecipesSection';
import { UserFeedback } from '@/components/recipe-detail/user-feedback/UserFeedback';
import { getRecipeById, getRecipes } from '@/utils/micro-cms/micro-cms';
import { Metadata } from 'next';
// import { getRecipeById } from '@/lib/micro-cms/micro-cms';

// https://zenn.dev/akfm/books/nextjs-basic-principle/viewer/part_3_static_rendering_full_route_cache#%E6%99%82%E9%96%93%E3%83%99%E3%83%BC%E3%82%B9revalidate
export const revalidate = 60;

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
  const res = await getRecipes();

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
