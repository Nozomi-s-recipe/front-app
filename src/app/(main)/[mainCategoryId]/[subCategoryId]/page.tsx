import { Breadcrumbs } from '@/components/BreadCrumbs';
import { RecipePreviewListContainer } from '@/components/recipe-preview/RecipePreviewList.container';
import { getSubCategoryById } from '@/utils/const';
import { getRecipes } from '@/utils/micro-cms/micro-cms';

export async function generateStaticParams() {
  const res = await getRecipes();

  return res.contents.map((recipe) => ({
    mainCategoryId: recipe.mainCategory[0],
    subCategoryId: recipe.subCategory[0],
  }));
}

export default async function SubCategoryPage({
  params,
}: {
  params: Promise<{ mainCategoryId: string; subCategoryId: string }>;
}) {
  const { subCategoryId } = await params;
  const subCategory = getSubCategoryById(subCategoryId);

  return (
    <>
      <h1 className='max-w-sm py-8 mx-auto text-2xl font-bold'>
        {subCategory?.name}
      </h1>
      <div className='flex-1'>
        <RecipePreviewListContainer
          subCategory={getSubCategoryById(subCategoryId)!}
        />
      </div>
      <Breadcrumbs />
    </>
  );
}
