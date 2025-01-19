import { Breadcrumbs } from '@/components/BreadCrumbs';
import { RecipePreviewListContainer } from '@/components/recipe-preview/RecipePreviewList.container';
import { getSubCategoryById } from '@/lib/const';
import { getRecipes } from '@/lib/micro-cms/micro-cms';

export async function generateStaticParams() {
  const res = await getRecipes();

  return res.contents.map((recipe) => ({
    mainCategoryId: recipe.mainCategory[0],
    subCategoryId: recipe.subCategory[0],
    // recipeId: recipe.id,
  }));
}

export default async function SubCategoryPage({
  params,
}: {
  params: Promise<{ mainCategoryId: string; subCategoryId: string }>;
}) {
  const { subCategoryId } = await params;

  return (
    <>
      <div className='flex-1'>
        <RecipePreviewListContainer
          subCategory={getSubCategoryById(subCategoryId)!}
        />
      </div>
      <Breadcrumbs />
    </>
  );
}
